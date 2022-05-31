import {
  MyButton,
  MyButtonIcon,
  MyIcon,
  MyInputPriceMask,
  MyText,
  MyTextPriceMask,
  MyView
} from 'bases/components';
import {COLOR, MY_SIZE} from 'bases/styles/Core';
import {ARR_PAYMENT_BY, HINH_THUC_NHAN_HANG} from 'configs/ProductConfig';
import React, {PureComponent} from 'react';
import {Modal} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import Utilities, {getTongTienHang} from 'utils/Utilities';
import {RootState} from 'views/app/redux/App.Reducer';
import {ICreateSaleState} from 'views/banhang/createSale/redux';
import {IThanhToanState} from 'views/banhang/thanhToanBanHang/redux';
import {IInforShippingState} from '../redux';
import {selectOptions} from '../style/InforShipping.Styles';

interface IProps extends IThanhToanState, IInforShippingState, ICreateSaleState {
  onChangeValue: (
    is_has_insurrance: boolean,
    payment_by: string,
    receiver_note: string,
    is_has_cod: boolean,
    total_insurrance_price: number
  ) => void;
}
interface IState {
  isInsurrance: boolean;
  isVisible: boolean;
  isPayment: any;
  hinhThuc: any;
  isCheckCOD: boolean;
  khaiGia: number;
}
class ViewSelecteOptions extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const {objInforShip, tienGiamGia, arrProductSale} = this.props;
    const tongTienTmp = getTongTienHang(arrProductSale) || 0;
    const giamGiaTmp = tienGiamGia || 0;
    const tienCanTra = tongTienTmp - giamGiaTmp;
    this.state = {
      isInsurrance: objInforShip?.is_has_insurrance || false,
      isVisible: false,
      isPayment: {id: objInforShip?.payment_by || ARR_PAYMENT_BY[0].id, name: ''},
      hinhThuc: {id: objInforShip?.receiver_note || HINH_THUC_NHAN_HANG[0].id, name: ''},
      isCheckCOD: objInforShip?.is_has_cod || false,
      khaiGia: objInforShip?.total_insurrance_price || tienCanTra || 0
    };
  }

  componentDidMount() {
    this.props.onChangeValue(
      this.state.isInsurrance,
      this.state.isPayment?.id,
      this.state.hinhThuc?.id,
      this.state.isCheckCOD,
      this.state?.khaiGia
    );
  }
  Insurrance = () => {
    this.setState(
      {
        isInsurrance: !this.state.isInsurrance
      },
      () => {
        this.props.onChangeValue(
          this.state.isInsurrance,
          this.state.isPayment?.id,
          this.state.hinhThuc?.id,
          this.state.isCheckCOD,
          this.state?.khaiGia
        );
      }
    );
  };
  onShow = () => {
    this.setState({
      isVisible: true
    });
  };

  onHide = () => {
    this.setState({
      isVisible: false
    });
  };

  handleSelected = (item: any) => {
    this.setState(
      {
        isPayment: item
      },
      () => {
        this.props.onChangeValue(
          this.state.isInsurrance,
          this.state.isPayment?.id,
          this.state.hinhThuc?.id,
          this.state.isCheckCOD,
          this.state?.khaiGia
        );
      }
    );
  };
  handleSelectedHinhThuc = (item: any) => {
    this.setState(
      {
        hinhThuc: item
      },
      () => {
        this.props.onChangeValue(
          this.state.isInsurrance,
          this.state.isPayment?.id,
          this.state.hinhThuc?.id,
          this.state.isCheckCOD,
          this.state?.khaiGia
        );
      }
    );
  };
  checkCOD = () => {
    this.setState(
      {
        isCheckCOD: !this.state.isCheckCOD
      },
      () => {
        this.props.onChangeValue(
          this.state.isInsurrance,
          ARR_PAYMENT_BY[0].id,
          HINH_THUC_NHAN_HANG[0].id,
          this.state.isCheckCOD,
          this.state?.khaiGia
        );
      }
    );
  };
  nhapSoTien = (text: string) => {
    this.setState(
      {
        khaiGia: Number(text)
      },
      () => {
        this.props.onChangeValue(
          this.state.isInsurrance,
          ARR_PAYMENT_BY[0].id,
          HINH_THUC_NHAN_HANG[0].id,
          this.state.isCheckCOD,
          this.state?.khaiGia
        );
      }
    );
  };

  handleReset = () => {
    this.setState(
      {
        isInsurrance: false,
        isPayment: ARR_PAYMENT_BY[0],
        hinhThuc: HINH_THUC_NHAN_HANG[0]
      },
      () => {
        this.props.onChangeValue(
          this.state.isInsurrance,
          ARR_PAYMENT_BY[0].id,
          HINH_THUC_NHAN_HANG[0].id,
          this.state.isCheckCOD,
          this.state?.khaiGia
        );
      }
    );
  };
  render() {
    const {isInsurrance, isVisible, isPayment, hinhThuc, isCheckCOD, khaiGia} = this.state;
    const {tienGiamGia, arrProductSale} = this.props;
    const tongTienTmp = getTongTienHang(arrProductSale) || 0;
    const giamGiaTmp = tienGiamGia || 0;

    return (
      <MyView transparent style={selectOptions.container2}>
        {/* thu hộ COD */}
        <MyButton onPress={this.checkCOD} style={selectOptions.btnSelected}>
          <MyView transparent style={selectOptions.viewKhaigia}>
            <MyIcon
              name={isCheckCOD ? 'checkbox-marked' : 'checkbox-blank-outline'}
              color={COLOR.TEXT.GREEN}
              iconFontType="MaterialCommunityIcons"
              size={20}
            />
            <MyText style={selectOptions.btnIcon}>Thu hộ tiền (COD)</MyText>
          </MyView>
          {isCheckCOD ? (
            <MyTextPriceMask
              text={Utilities.convertCount(tongTienTmp - giamGiaTmp)}
              style={selectOptions.btnIcon}
            />
          ) : null}
        </MyButton>
        <MyButton onPress={this.Insurrance} style={selectOptions.btnSelected}>
          <MyView transparent style={selectOptions.viewKhaigia}>
            <MyIcon
              name={isInsurrance ? 'checkbox-marked' : 'checkbox-blank-outline'}
              color={COLOR.TEXT.GREEN}
              iconFontType="MaterialCommunityIcons"
              size={20}
            />
            <MyText style={selectOptions.txtKhaiGia}>Khai giá</MyText>
          </MyView>
          {isInsurrance ? (
            <MyInputPriceMask
              numberOfLines={1}
              containerStyle={selectOptions.contentInput}
              style={selectOptions.inputSoluong}
              placeholder={'VNĐ'}
              keyboardType={'number-pad'}
              value={Utilities.convertCount(khaiGia).toString()}
              onTextCallback={this.nhapSoTien}
              returnKeyType="done"
            />
          ) : null}
          <MyButtonIcon
            style={selectOptions.btnIcon}
            onPress={this.onShow}
            iconProps={{
              name: 'info',
              color: COLOR.TEXT.BLACK,
              size: 20
            }}
            iconFontType="MaterialIcons"
          />
        </MyButton>
        <MyText myFontStyle={'Medium'} style={selectOptions.headerTitle}>
          Bên trả phí ship
        </MyText>
        <MyView style={selectOptions.viewPaymentContainer}>
          {ARR_PAYMENT_BY.map(k => {
            return (
              <MyButton
                onPress={() => this.handleSelected(k)}
                key={k.id}
                transparent
                style={selectOptions.viewPayment}>
                <MyIcon
                  name={isPayment?.id === k.id ? 'checkbox-marked' : 'checkbox-blank-outline'}
                  color={COLOR.TEXT.GREEN}
                  iconFontType="MaterialCommunityIcons"
                  size={20}
                />
                <MyText style={selectOptions.txtSearch}>{k.name}</MyText>
              </MyButton>
            );
          })}
        </MyView>
        <MyText
          myFontStyle={'Medium'}
          style={[selectOptions.headerTitle, {marginTop: MY_SIZE.s_20}]}>
          Chọn hình thức
        </MyText>
        <MyView style={selectOptions.viewPaymentContainer}>
          {HINH_THUC_NHAN_HANG.map(k => {
            return (
              <MyButton
                onPress={() => this.handleSelectedHinhThuc(k)}
                key={k.id}
                transparent
                style={selectOptions.viewPayment}>
                <MyIcon
                  name={hinhThuc?.id === k.id ? 'checkbox-marked' : 'checkbox-blank-outline'}
                  color={COLOR.TEXT.GREEN}
                  iconFontType="MaterialCommunityIcons"
                  size={20}
                />
                <MyText style={selectOptions.txtSearch}>{k.name}</MyText>
              </MyButton>
            );
          })}
        </MyView>
        <Modal
          visible={isVisible}
          animationType="slide"
          transparent
          hardwareAccelerated
          onRequestClose={this.onHide}>
          <SafeAreaView edges={['left', 'bottom', 'right', 'top']} style={selectOptions.container}>
            <MyView style={selectOptions.modalContent}>
              <MyText style={selectOptions.txtNote}>
                {
                  'Dịch vụ khai giá là dịch vụ bảo hiểm hàng. Nếu xảy ra trường hợp thất lạc, mất mát hàng hóa, Hãng vận chuyển sẽ dựa vào khai giá và hóa đơn VAT của hàng hóa để bồi thường cho cửa hàng'
                }
              </MyText>
              <MyButton onPress={this.onHide} style={selectOptions.btnCancel}>
                <MyText myFontStyle={'Bold'} style={selectOptions.textCancel}>
                  Huỷ
                </MyText>
              </MyButton>
            </MyView>
          </SafeAreaView>
        </Modal>
      </MyView>
    );
  }
}
const mapStateToProps = (state: RootState) => {
  const {objInforShip} = state.InforShippingReducer;
  const {arrProductSale} = state.CreateSaleReducer;
  const {tienGiamGia} = state.ThanhToanReducer;

  return {
    objInforShip,

    arrProductSale,
    tienGiamGia
  };
};
export default connect(mapStateToProps, null, null, {forwardRef: true})(ViewSelecteOptions);
