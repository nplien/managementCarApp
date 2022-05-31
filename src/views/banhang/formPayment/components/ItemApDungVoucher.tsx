import {MyButton, MyIcon, MyInput, MyText, MyTextPriceMask, MyView} from 'bases/components';
import {COLOR, MY_SIZE, setMargin, setPadding} from 'bases/styles/Core';
import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';
import {RootState} from 'views/app/redux/App.Reducer';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addFormPayment, deleteAllItem, editItemPayment, IFormPaymentState} from '../redux';
import {IPaymentOrderModel} from 'models/Payment.Model';
import Utilities, {getTongTienHang} from 'utils/Utilities';
import {KieuKhuyenMai, NGUOI_TRA_TIEN} from 'configs/ProductConfig';
import {SO_QUY_TYPE} from 'models/SoQuy.Model';
import {BANG_GIA_CHUNG} from 'common/Constants';
import {VoucherAPI} from 'services/Voucher.Api';
import {PAYMENT_METHOD} from 'configs/FilterConfig';
import {IThanhToanState} from 'views/banhang/thanhToanBanHang/redux';
import {IInforShippingState} from 'views/banhang/inforShipping/redux';
import {ICreateSaleState} from 'views/banhang/createSale/redux';

interface IProps extends IFormPaymentState, IThanhToanState, ICreateSaleState, IInforShippingState {
  addFormPayment: typeof addFormPayment;
  deleteAllItem: typeof deleteAllItem;
  editItemPayment: typeof editItemPayment;
}

interface IStates {
  isSuccess: boolean;
  notiVoucher: string;
  colorNoti: string;
  soTienKhuyenMai: number;
}

class ItemApDungVoucher extends PureComponent<IProps, IStates> {
  codeVoucher: string = '';
  inputRef: any = React.createRef();

  constructor(props: IProps) {
    super(props);

    const {arrFormPayment} = this.props;
    let chuyenKhoan: IPaymentOrderModel[] = [];
    if (arrFormPayment) {
      chuyenKhoan = arrFormPayment.filter(payment => {
        return payment.method === PAYMENT_METHOD.VOUCHER;
      });
    }

    if (chuyenKhoan?.length > 0) {
      this.codeVoucher = chuyenKhoan[0].name || '';

      this.state = {
        isSuccess: true,
        notiVoucher: 'Khách được khuyến mại',
        colorNoti: COLOR.TEXT.BLACK,
        soTienKhuyenMai: chuyenKhoan[0].value || 0
      };
    } else {
      this.state = {
        isSuccess: false,
        notiVoucher: 'Nhập mã voucher!',
        colorNoti: COLOR.TEXT.BLACK,
        soTienKhuyenMai: 0
      };
    }
  }

  setCheck = () => {
    const {arrFormPayment} = this.props;

    let chuyenKhoan: IPaymentOrderModel[] = [];
    if (arrFormPayment) {
      chuyenKhoan = arrFormPayment.filter(payment => {
        return payment.method === PAYMENT_METHOD.VOUCHER;
      });
    }

    if (chuyenKhoan?.length > 0) {
      this.setState(
        {
          isSuccess: false,
          notiVoucher: 'Nhập mã voucher!',
          colorNoti: COLOR.TEXT.BLACK,
          soTienKhuyenMai: 0
        },
        () => {
          if (this.inputRef) {
            this.inputRef.current.clear();
          }

          this.props.deleteAllItem(PAYMENT_METHOD.VOUCHER);
        }
      );
    } else {
      this.props.addFormPayment({
        random_id: Utilities.randomNumber(),
        value: 0,
        type: SO_QUY_TYPE.THU,
        method: PAYMENT_METHOD.VOUCHER
      });
    }
  };

  nhapSoTien = (soTien: number, nameVoucher: string) => {
    const {arrFormPayment} = this.props;

    let chuyenKhoan: IPaymentOrderModel[] = [];
    if (arrFormPayment) {
      chuyenKhoan = arrFormPayment.filter(payment => {
        return payment.method === PAYMENT_METHOD.VOUCHER;
      });
    }
    if (chuyenKhoan.length > 0) {
      this.props.editItemPayment({
        ...chuyenKhoan[0],
        value: soTien,

        name: nameVoucher
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

  onSubmit = () => {
    if (this.codeVoucher.trim()) {
      VoucherAPI.getDetailVouchers(this.codeVoucher.trim())
        .then(res => {
          if (res.code) {
            this.setState({
              isSuccess: false,
              notiVoucher: 'Mã voucher không hợp lệ!',
              colorNoti: COLOR.TEXT.RED,
              soTienKhuyenMai: 0
            });
          } else {
            const {tienGiamGia, isGiaoHang, objDoiTacGiaoHang, objInforShip, arrProductSale} =
              this.props;
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
            }

            const khachCanTraTmp = tongTienTmp - giamGiaTmp + phiShip;
            let soTienDuocGiam = 0;

            const voucher = res.data;

            if (
              voucher?.discount_value &&
              voucher?.discount_type === KieuKhuyenMai.GIAM_PHAN_TRAM
            ) {
              soTienDuocGiam = (khachCanTraTmp * voucher.discount_value) / 100;
            }

            if (
              voucher?.discount_value &&
              voucher?.discount_type === KieuKhuyenMai.GIAM_THANG_TIEN
            ) {
              soTienDuocGiam = voucher.discount_value;
            }

            if (voucher?.max_discount_value && soTienDuocGiam > voucher?.max_discount_value) {
              soTienDuocGiam = voucher?.max_discount_value;
            }

            this.setState(
              {
                isSuccess: true,
                notiVoucher: 'Khách được khuyến mại',
                colorNoti: COLOR.TEXT.BLACK,
                soTienKhuyenMai: soTienDuocGiam
              },
              () => {
                this.nhapSoTien(soTienDuocGiam, voucher?.name || '');
              }
            );
          }
        })
        .catch(() => {
          this.setState({
            isSuccess: false,
            notiVoucher: 'Mã voucher không hợp lệ!',
            colorNoti: COLOR.TEXT.RED,
            soTienKhuyenMai: 0
          });
        });
    } else {
      this.setState({
        isSuccess: false,
        notiVoucher: 'Nhập mã voucher!',
        colorNoti: COLOR.TEXT.BLACK,
        soTienKhuyenMai: 0
      });
    }
  };

  render() {
    const {arrFormPayment} = this.props;

    let chuyenKhoan: IPaymentOrderModel[] = [];
    if (arrFormPayment) {
      chuyenKhoan = arrFormPayment.filter(payment => {
        return payment.method === PAYMENT_METHOD.VOUCHER;
      });
    }

    const {notiVoucher, colorNoti, isSuccess, soTienKhuyenMai} = this.state;

    return (
      <MyView>
        <MyButton style={styles.container} onPress={this.setCheck}>
          <MyView style={styles.content}>
            <MyIcon
              name={chuyenKhoan.length > 0 ? 'checkcircle' : 'checkcircleo'}
              color={COLOR.TEXT.GREEN}
              iconFontType="AntDesign"
              size={20}
            />
            <MyText style={styles.title}>Voucher</MyText>
          </MyView>
          <MyInput
            inputRef={this.inputRef}
            editable={chuyenKhoan.length > 0}
            numberOfLines={1}
            containerStyle={styles.contentInput}
            style={styles.inputSoluong}
            placeholder={'Nhập mã voucher'}
            defaultValue={chuyenKhoan[0]?.name}
            onChangeText={text => (this.codeVoucher = text)}
            returnKeyType="done"
            onSubmitEditing={this.onSubmit}
          />
        </MyButton>
        {chuyenKhoan.length > 0 ? (
          <MyView style={styles.viewItem}>
            <MyText myFontStyle="Regular" style={[styles.txtTitle, {color: colorNoti}]}>
              {notiVoucher}
            </MyText>
            {isSuccess ? (
              <MyTextPriceMask
                myFontStyle="Medium"
                text={Utilities.convertCount(soTienKhuyenMai)}
                numberOfLines={1}
                style={[styles.textRight, {color: COLOR.TEXT.GREEN}]}
              />
            ) : null}
          </MyView>
        ) : null}
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {arrProductSale} = state.CreateSaleReducer;

  const {tienGiamGia, isGiaoHang} = state.ThanhToanReducer;
  const {objDoiTacGiaoHang, objInforShip} = state.InforShippingReducer;

  const {arrFormPayment} = state.FormPaymentReducer;
  const {currentKhachHang} = state.ProductBanHangReducer;

  return {
    arrProductSale,

    tienGiamGia,
    isGiaoHang,
    objDoiTacGiaoHang,
    objInforShip,

    arrFormPayment,
    currentKhachHang
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      editItemPayment,
      addFormPayment,
      deleteAllItem
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemApDungVoucher);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  container2: {
    backgroundColor: COLOR.BG.SECONDARY,
    flexDirection: 'row',
    ...setPadding(MY_SIZE.s_4, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16),
    justifyContent: 'flex-end'
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: MY_SIZE.s_16,
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  contentInput: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  inputSoluong: {
    borderWidth: 1,
    borderColor: COLOR.TEXT.SECONDARY,
    textAlign: 'right',
    height: MY_SIZE.s_34,
    minHeight: MY_SIZE.s_34
  },
  textRight: {
    flex: 1,
    textAlign: 'right',
    fontSize: MY_SIZE.s_16,
    ...setMargin(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  viewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  txtTitle: {
    fontSize: MY_SIZE.s_16,
    ...setMargin(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0)
  }
});
