import {MyButton, MyIcon, MyLoading, MyText, MyTextPriceMask, MyView} from 'bases/components';
import {COLOR, MY_SIZE, setMargin, setPadding, setRadius} from 'bases/styles/Core';
import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PhiShipAPI} from 'services/PhiShip.Api';
import MyNavigator from 'utils/MyNavigator';
import {RootState} from 'views/app/redux/App.Reducer';
import {resetThanhToan, addFormPayment} from 'views/banhang/formPayment/redux';
import {IDoiTacGiaoHang, IInforShippingState, IRequestShip, setObjectDTGH} from '../redux';
import {PAYMENT_METHOD} from 'configs/FilterConfig';
import Utilities, {getTongTienHang} from 'utils/Utilities';
import {IThanhToanState} from 'views/banhang/thanhToanBanHang/redux';
import {ICreateSaleState} from 'views/banhang/createSale/redux';
import {IProductBanHangState} from 'views/banhang/ProductBanHang/redux';
import {SO_QUY_TYPE} from 'models/SoQuy.Model';
import {BANG_GIA_CHUNG, STORE_DEFAULT} from 'common/Constants';
import {NGUOI_TRA_TIEN} from 'configs/ProductConfig';
import {IChooseStoreState} from 'views/menuLeft/redux';
import {IStorePerson} from 'models/ModelBase';

interface IPropsItem {
  isCheckSelect: boolean;
  handleSelected: () => void;
  title: string;
  price: string | number;
}

const ItemDoiTacGiaoHang = (props: IPropsItem) => {
  const {isCheckSelect, handleSelected, title, price} = props;
  return (
    <MyButton onPress={handleSelected} transparent style={styles.viewPayment}>
      <MyView transparent style={styles.viewLeft}>
        <MyIcon
          name={isCheckSelect ? 'radio-button-checked' : 'radio-button-unchecked'}
          color={COLOR.TEXT.GREEN}
          iconFontType="MaterialIcons"
          size={20}
        />
        <MyText style={styles.txtTitle} numberOfLines={2}>
          {title}
        </MyText>
      </MyView>
      <MyTextPriceMask myFontStyle="Medium" style={styles.txtPrice} text={price} />
    </MyButton>
  );
};

interface IProps
  extends IThanhToanState,
    IInforShippingState,
    ICreateSaleState,
    IProductBanHangState,
    IChooseStoreState {
  setObjectDTGH: typeof setObjectDTGH;
  resetThanhToan: typeof resetThanhToan;
  addFormPayment: typeof addFormPayment;
}

interface IState {
  arrDTGH: IDoiTacGiaoHang[];
  isFullData: boolean;
  isFirstLoading: boolean;
}

class ListDoiTacGiaoHang extends Component<IProps, IState> {
  state: IState = {arrDTGH: [], isFullData: false, isFirstLoading: true};

  receiver: IRequestShip;

  objDoiTacGiaoHangOld: any = null;
  isBack: boolean = true;

  constructor(props: IProps) {
    super(props);

    if (this.props.objDoiTacGiaoHang) {
      let oldReducer = JSON.stringify(this.props.objDoiTacGiaoHang);
      this.objDoiTacGiaoHangOld = JSON.parse(oldReducer);
    }

    const {
      cuaHangDangChon,
      currentKhachHang,
      tienGiamGia,
      storeInforShip,
      objInforShip,
      arrProductSale
    } = this.props;
    const tongTienTmp = getTongTienHang(arrProductSale) || 0;
    const giamGiaTmp = tienGiamGia || 0;

    let store: IStorePerson = STORE_DEFAULT;
    if (cuaHangDangChon) {
      store = cuaHangDangChon;
    }
    if (storeInforShip && storeInforShip.id) {
      store = storeInforShip;
    }
    this.receiver = {
      customer: currentKhachHang,

      sender_address: store.address,
      sender_province: store.province,
      sender_district: store.district,
      sender_ward: store.ward,

      sender_name: store.name,
      sender_phone: store.phone,

      receiver_address: objInforShip?.receiver_address,
      receiver_province: objInforShip?.receiver_province,
      receiver_district: objInforShip?.receiver_district,
      receiver_ward: objInforShip?.receiver_ward,

      receiver_name: objInforShip?.receiver_name,
      receiver_note: objInforShip?.receiver_note,
      receiver_phone: objInforShip?.receiver_phone,

      is_has_cod: objInforShip?.is_has_cod,
      total_shipping_cod: objInforShip?.total_shipping_cod,

      is_has_insurrance: objInforShip?.is_has_insurrance,
      total_insurrance_price: objInforShip?.total_insurrance_price,

      weight: objInforShip?.weight,
      height: objInforShip?.height,
      width: objInforShip?.width,
      length: objInforShip?.length,
      total_order_price: tongTienTmp - giamGiaTmp,

      payment_by: objInforShip?.payment_by
    };
    if (
      this.receiver.receiver_province &&
      this.receiver.receiver_district &&
      this.receiver.receiver_ward &&
      this.receiver.weight
    ) {
      this.state = {
        arrDTGH: [],
        isFullData: true,
        isFirstLoading: true
      };
    } else {
      this.state = {
        arrDTGH: [],
        isFullData: false,
        isFirstLoading: true
      };
    }
  }

  componentDidMount() {
    const {isFirstLoading, isFullData} = this.state;
    if (isFirstLoading && isFullData) {
      Promise.all([
        PhiShipAPI.postCaculateFees({...this.receiver, type: 'giao_nhanh'}),
        PhiShipAPI.postCaculateFees({...this.receiver, type: 'giao_thuong'})
      ])
        .then((result: any[]) => {
          if (result[0]?.code || result[1]?.code) {
            this.setState({
              isFirstLoading: false
            });
          } else {
            const dataTmp: IDoiTacGiaoHang[] = result[0].data;
            this.setState({
              arrDTGH: dataTmp.concat(result[1].data),
              isFirstLoading: false
            });
          }
        })
        .catch(() => {
          this.setState({
            isFirstLoading: false
          });
        });
    }
  }

  componentWillUnmount() {
    if (this.isBack) {
      this.props.setObjectDTGH(this.objDoiTacGiaoHangOld);
    }
  }

  handleSelected = (item: IDoiTacGiaoHang) => {
    const {objDoiTacGiaoHang} = this.props;

    if (item.code !== objDoiTacGiaoHang?.service_id) {
      this.props.setObjectDTGH({
        ...this.receiver,
        service_id: item.code,
        service_name: item.name,
        type: item.type,
        total_shipping_fee: item.service_price,
        provider_code: item.provider_code,
        provider_name: item.provider_name,

        service_price: item.service_price //  bien dung de ve view
      });
    }
  };

  getTongTienHang = () => {
    const {arrProductSale} = this.props;

    let tongGia = 0;

    if (arrProductSale) {
      for (let index = 0; index < arrProductSale.length; index++) {
        const item = arrProductSale[index];

        const {price_books} = item.product;
        let price = item.product.price || 0;
        if (price_books) {
          let found = price_books.findIndex(x => x.id === item.price_books.id);
          if (found > -1) {
            price = price_books[found].price;
          }
        }
        if (
          item.price_books.id === BANG_GIA_CHUNG.id &&
          item.product.discount &&
          item.product.price
        ) {
          price = item.product.price;
        }

        tongGia = tongGia + price * item.totalQty;
      }
    }

    return tongGia;
  };

  nhapSoTien = () => {
    const {tienGiamGia, isGiaoHang, objDoiTacGiaoHang, objInforShip, arrProductSale} = this.props;
    const tongTienTmp = getTongTienHang(arrProductSale) || 0;
    const giamGiaTmp = tienGiamGia || 0;

    let phiShip = 0;
    if (
      isGiaoHang &&
      objInforShip &&
      objInforShip.payment_by === NGUOI_TRA_TIEN.NGUOI_NHAN &&
      objDoiTacGiaoHang &&
      objDoiTacGiaoHang.service_price
    ) {
      phiShip = objDoiTacGiaoHang.service_price;

      this.props.resetThanhToan();

      this.props.addFormPayment({
        random_id: Utilities.randomNumber(),
        value: tongTienTmp - giamGiaTmp + phiShip,
        type: SO_QUY_TYPE.THU,
        method: PAYMENT_METHOD.TIEN_MAT
      });
    }
  };

  handleXacNhan = () => {
    const {objDoiTacGiaoHang} = this.props;
    if (objDoiTacGiaoHang) {
      this.nhapSoTien();
      this.isBack = false;
      MyNavigator.goBack();
    } else {
      Utilities.showToast('Bạn chưa chọn dịch vụ nào', '', 'warning');
    }
  };

  groupBy = (list: IDoiTacGiaoHang[], keyGetter: (item: IDoiTacGiaoHang) => {}) => {
    const map = new Map();
    list.forEach((item: any) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  };

  renderList() {
    const _view = [];
    const {objDoiTacGiaoHang} = this.props;
    const {arrDTGH} = this.state;
    for (const [key, value] of this.groupBy(arrDTGH, item => item.provider_name)) {
      _view.push(
        <MyView key={key}>
          <MyText style={styles.txtTitle2} myFontStyle={'Bold'}>
            {key}
          </MyText>
          {value.map((k: any) => {
            const isCheck = objDoiTacGiaoHang?.service_id === k.code;
            return (
              <ItemDoiTacGiaoHang
                key={k.id}
                isCheckSelect={isCheck}
                handleSelected={() => this.handleSelected(k)}
                title={k.name}
                price={k.service_price}
              />
            );
          })}
        </MyView>
      );
    }
    return _view;
  }

  render() {
    const {arrDTGH, isFullData, isFirstLoading} = this.state;
    if (isFullData) {
      if (isFirstLoading) {
        return (
          <MyView style={[styles.container, {paddingTop: MY_SIZE.s_16}]}>
            <MyLoading />
          </MyView>
        );
      }

      if (arrDTGH?.length === 0) {
        return (
          <MyView style={styles.container}>
            <MyText style={styles.txtThongBao} myFontStyle={'Bold'}>
              Không có đối tác phù hợp
            </MyText>
            <SafeAreaView edges={['left', 'bottom', 'right']}>
              <MyButton onPress={() => MyNavigator.goBack()} style={styles.btnDone}>
                <MyText style={styles.txtDone} myFontStyle={'Bold'}>
                  Quay lại
                </MyText>
              </MyButton>
            </SafeAreaView>
          </MyView>
        );
      }

      return (
        <MyView style={styles.container}>
          <ScrollView showsHorizontalScrollIndicator={false} style={styles.container}>
            {this.renderList()}
          </ScrollView>
          <SafeAreaView edges={['left', 'bottom', 'right']}>
            <MyButton onPress={this.handleXacNhan} style={styles.btnDone}>
              <MyText style={styles.txtDone} myFontStyle={'Bold'}>
                Đồng ý
              </MyText>
            </MyButton>
          </SafeAreaView>
        </MyView>
      );
    } else {
      return (
        <MyView style={styles.container}>
          <MyText style={styles.txtThongBao} myFontStyle={'Bold'}>
            Vui lòng nhập đầy đủ dữ liệu chi tiết đơn hàng
          </MyText>
          <SafeAreaView edges={['left', 'bottom', 'right']}>
            <MyButton onPress={() => MyNavigator.goBack()} style={styles.btnDone}>
              <MyText style={styles.txtDone} myFontStyle={'Bold'}>
                Quay lại
              </MyText>
            </MyButton>
          </SafeAreaView>
        </MyView>
      );
    }
  }
}

const mapStateToProps = (state: RootState) => {
  const {arrProductSale} = state.CreateSaleReducer;
  const {currentKhachHang} = state.ProductBanHangReducer;
  const {tienGiamGia, isGiaoHang} = state.ThanhToanReducer;
  const {cuaHangDangChon} = state.ChooseStoreReducer;
  const {storeInforShip, objInforShip, objDoiTacGiaoHang} = state.InforShippingReducer;
  return {
    arrProductSale,
    currentKhachHang,

    tienGiamGia,
    isGiaoHang,

    cuaHangDangChon,
    storeInforShip,
    objInforShip,
    objDoiTacGiaoHang
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      addFormPayment,
      resetThanhToan,
      setObjectDTGH
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(ListDoiTacGiaoHang);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.BG.WHITE
  },
  txtTitle: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_0),
    flex: 1,
    textAlign: 'left',
    fontSize: MY_SIZE.s_14
  },
  txtTitle2: {
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_4, MY_SIZE.s_16, MY_SIZE.s_16),
    color: COLOR.BG.BLACK,
    fontSize: MY_SIZE.s_16
  },
  txtPrice: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_0),
    flex: 1,
    textAlign: 'right',
    fontSize: MY_SIZE.s_16
  },
  viewPayment: {
    flexDirection: 'row',
    ...setPadding(MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_12),
    justifyContent: 'space-between'
  },
  viewLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2
  },
  btnDone: {
    backgroundColor: COLOR.TEXT.GREEN,
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16),
    justifyContent: 'center',
    alignItems: 'center',
    ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  txtThongBao: {
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16),
    color: COLOR.BG.BLACK,
    fontSize: MY_SIZE.s_16,
    flex: 1
  },
  txtDone: {
    color: COLOR.BG.WHITE,
    fontSize: MY_SIZE.s_14
  }
});
