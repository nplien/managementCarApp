import {MyButton, MyInput, MyLoading, MyText, MyView} from 'bases/components';
import {COLOR, MY_SIZE} from 'bases/styles/Core';
import {KHACH_LE, LOCATION} from 'common/Constants';
import {IAddressModel} from 'models/Customer.Model';
import React, {createRef, PureComponent} from 'react';
import {KeyboardAvoidingView, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import Utilities, {getTongTienHang} from 'utils/Utilities';
import {RootState} from 'views/app/redux/App.Reducer';
import {ICreateSaleState} from 'views/banhang/createSale/redux';
import ViewLocationInfor from './components/ViewLocationInfor';
import {inforShipStyles} from './style/InforShipping.Styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import ViewStoreShip from './components/ViewStoreShip';
import {bindActionCreators} from 'redux';
import ViewInforCustomerShip from './components/ViewInforCustomerShip';
import {
  IInforShippingState,
  IRequestShip,
  setInforCustomerShip,
  setObjectInforShip,
  setObjectDTGH
} from './redux';
import MyNavigator from 'utils/MyNavigator';
import {getApiAddressCustomer} from 'services';
import {ILocation} from 'models/Localtion.Model';
import ViewSelecteOptions from './components/ViewSelecteOptions';
import {IProductBanHangState} from '../ProductBanHang/redux';
import {resetThanhToan, addFormPayment} from 'views/banhang/formPayment/redux';
import {IThanhToanState} from '../thanhToanBanHang/redux';
import {SO_QUY_TYPE} from 'models/SoQuy.Model';
import {PAYMENT_METHOD} from 'configs/FilterConfig';

interface IProps
  extends IThanhToanState,
    IInforShippingState,
    ICreateSaleState,
    IProductBanHangState {
  setObjectInforShip: typeof setObjectInforShip;
  setInforCustomerShip: typeof setInforCustomerShip;
  setObjectDTGH: typeof setObjectDTGH;

  resetThanhToan: typeof resetThanhToan;
  addFormPayment: typeof addFormPayment;
}
interface IAppSate {
  arrAddress: IAddressModel[];
  address: string;
  isFirstLoading: boolean;
}

class InforShipping extends PureComponent<IProps, IAppSate> {
  mapValueCustomer: IRequestShip;

  // Ref
  namelRef: any = createRef();
  phoneRef: any = createRef();
  addressRef: any = createRef();
  trongLuongRef: any = createRef();
  chieuDaiRef: any = createRef();
  chieuRongRef: any = createRef();
  chieuCaoRef: any = createRef();
  viewLocationInforRef: any = createRef();
  viewSelecteOptionsRef: any = createRef();
  timeOut: any = null;
  constructor(props: IProps) {
    super(props);
    this.state = {
      isFirstLoading: true,

      arrAddress: [],
      address: ''
    };
    this.mapValueCustomer = {};
  }
  async componentDidMount() {
    this.timeOut = setTimeout(() => {
      this.setState({
        isFirstLoading: false
      });
    }, 300);
    const {objInforShip} = this.props;
    if (objInforShip && Object.keys(objInforShip).length > 1 && objInforShip.receiver_name) {
      let addressModel: IRequestShip = {
        receiver_address: objInforShip.receiver_address,
        receiver_province: objInforShip.receiver_province,
        receiver_district: objInforShip.receiver_district,
        receiver_ward: objInforShip.receiver_ward,
        receiver_name: objInforShip.receiver_name,
        receiver_phone: objInforShip.receiver_phone
      };
      this.onChangeValue('weight', objInforShip.weight);
      this.onChangeValue('is_has_cod', objInforShip.is_has_cod);
      this.onChangeValue('height', objInforShip.height);
      this.onChangeValue('width', objInforShip.width);
      this.onChangeValue('length', objInforShip.length);
      this.onChangeValue('receiver_note', objInforShip.receiver_note);
      this.onChangeValue('payment_by', objInforShip.payment_by);
      this.checkAddressWithCustomer(addressModel, true);
    } else {
      this.checkAddressWithCustomer();
    }
  }
  componentWillUnmount() {
    if (this.timeOut) {
      clearTimeout(this.timeOut);
    }
  }
  async checkAddressWithCustomer(address?: IRequestShip, isCallbackAddress?: boolean) {
    try {
      const {currentKhachHang} = this.props;
      let response: any;
      if (currentKhachHang && currentKhachHang.id && currentKhachHang.id !== KHACH_LE.id) {
        response = await getApiAddressCustomer(currentKhachHang?.id.toString());
      }
      if (isCallbackAddress && address) {
        this.setState(
          {
            arrAddress: response?.data || [],
            address: address?.receiver_address || ''
          },
          () => {
            this.onChangeValue('receiver_name', address?.receiver_name);
            this.onChangeValue('receiver_phone', address?.receiver_phone);
            this.onChangeValue('receiver_address', address?.receiver_address);
            this.onChangeValue('receiver_province', address?.receiver_province);
            this.onChangeValue('receiver_district', address?.receiver_district);
            this.onChangeValue('receiver_ward', address?.receiver_ward);
          }
        );
      } else {
        if (response && !response?.code && response?.data && response?.data.length > 0) {
          const currentDC: IAddressModel =
            response?.data.find((k: any) => k.is_default === true) || response?.data[0];
          this.props.setInforCustomerShip(currentDC || response?.data[0]);
          this.setState(
            {
              arrAddress: response?.data,
              address: currentDC?.address || ''
            },
            () => {
              this.onChangeValue('receiver_name', currentDC?.name);
              this.onChangeValue('receiver_phone', currentDC?.phone);
              this.onChangeValue('receiver_address', currentDC?.address);
              this.onChangeValue('receiver_district', currentDC?.district);
              this.onChangeValue('receiver_province', currentDC?.province);
              this.onChangeValue('receiver_ward', currentDC?.ward);
              this.props.setObjectInforShip(this.mapValueCustomer);
            }
          );
        } else {
          this.setState(
            {
              arrAddress: response?.data ? response?.data : [],
              address: currentKhachHang?.address || ''
            },
            () => {
              this.onChangeValue('receiver_name', currentKhachHang?.name);
              this.onChangeValue('receiver_phone', currentKhachHang?.phone);
              this.onChangeValue('receiver_address', currentKhachHang?.address);
              this.onChangeValue('receiver_district', currentKhachHang?.district);
              this.onChangeValue('receiver_province', currentKhachHang?.province);
              this.onChangeValue('receiver_ward', currentKhachHang?.ward);
              this.props.setObjectInforShip(this.mapValueCustomer);
            }
          );
        }
      }
    } catch (error) {
      Utilities.showToast('Thất bại', '', 'danger');
      Utilities.logException('CustomersAddress', error);
    }
  }
  onChangeValue = (key: keyof IRequestShip, value: any) => {
    this.mapValueCustomer[key] = value;
  };
  valueSelecteOptions = (
    is_has_insurrance?: boolean,
    payment_by?: string,
    receiver_note?: string,
    is_has_cod?: boolean,
    total_insurrance_price?: number
  ) => {
    this.onChangeValue('is_has_insurrance', is_has_insurrance);
    if (is_has_insurrance) {
      this.onChangeValue('total_insurrance_price', total_insurrance_price);
    } else {
      this.onChangeValue('total_insurrance_price', 0);
    }
    if (payment_by) {
      this.onChangeValue('payment_by', payment_by);
    }
    if (receiver_note) {
      this.onChangeValue('receiver_note', receiver_note);
    }
    this.onChangeValue('is_has_cod', is_has_cod);
    if (is_has_cod) {
      this.onChangeValue('total_shipping_cod', this.tinhLaiTienKhachTra());
    } else {
      this.onChangeValue('total_shipping_cod', 0);
    }
  };

  changeLocation = (nameLocation: string, providers: ILocation, codeChange?: string) => {
    switch (nameLocation) {
      case LOCATION.CITY:
        if (providers.code !== codeChange) {
          this.onChangeValue('receiver_province', providers);
          delete this.mapValueCustomer?.receiver_district;
          delete this.mapValueCustomer?.receiver_ward;
          // this.setState({
          //   // district: '',
          //   // ward: '',
          //   cityCode: providers
          // });
        } else {
          this.onChangeValue('receiver_province', providers);
        }
        break;
      case LOCATION.DISTRICT:
        if (providers.code !== codeChange) {
          this.onChangeValue('receiver_district', providers);
          delete this.mapValueCustomer?.receiver_ward;
          // this.setState({
          //   // ward: '',
          //   wardCode: providers
          // });
        } else {
          this.onChangeValue('receiver_district', providers);
        }
        break;
      case LOCATION.WARD:
        this.onChangeValue('receiver_ward', providers);
        break;
      default:
        break;
    }
  };

  pressApDung = () => {
    if (!this.mapValueCustomer.receiver_name) {
      Utilities.showToast(
        'Vui lòng nhập đầy đủ dữ liệu !',
        'Bạn chưa nhập Tên nguời nhận ',
        'warning'
      );
      this.namelRef?.current?.focus();
    } else if (!this.mapValueCustomer.receiver_phone) {
      Utilities.showToast(
        'Vui lòng nhập đầy đủ dữ liệu !',
        'Bạn chưa nhập số điện thoại người nhận ',
        'warning'
      );
      this.phoneRef?.current?.focus();
    } else if (!this.mapValueCustomer.receiver_address) {
      Utilities.showToast(
        'Vui lòng nhập đầy đủ dữ liệu !',
        'Bạn chưa nhập địa chỉ nguời nhận ',
        'warning'
      );
      this.addressRef?.current?.focus();
    } else if (!this.mapValueCustomer.receiver_province) {
      Utilities.showToast(
        'Vui lòng nhập đầy đủ dữ liệu !',
        'Bạn chưa nhập Tỉnh/Thành nguời nhận ',
        'warning'
      );
    } else if (!this.mapValueCustomer.receiver_district) {
      Utilities.showToast(
        'Vui lòng nhập đầy đủ dữ liệu !',
        'Bạn chưa nhập Quận/Huyện nguời nhận ',
        'warning'
      );
    } else if (!this.mapValueCustomer.receiver_ward) {
      Utilities.showToast(
        'Vui lòng nhập đầy đủ dữ liệu !',
        'Bạn chưa nhập Phường/Xã nguời nhận ',
        'warning'
      );
    } else if (!this.mapValueCustomer.weight) {
      Utilities.showToast(
        'Vui lòng nhập đầy đủ dữ liệu !',
        'Bạn chưa nhập trọng lượng ',
        'warning'
      );
      this.trongLuongRef?.current?.focus();
    } else {
      this.props.setObjectInforShip(this.mapValueCustomer);
      this.props.setObjectDTGH(undefined);
      this.tinhLaiTienKhachTra();
      MyNavigator.goBack();
    }
  };

  tinhLaiTienKhachTra = () => {
    this.props.resetThanhToan();
    const {tienGiamGia, arrProductSale} = this.props;
    const tongTienTmp = getTongTienHang(arrProductSale) || 0;
    const giamGiaTmp = tienGiamGia || 0;

    this.props.addFormPayment({
      random_id: Utilities.randomNumber(),
      value: tongTienTmp - giamGiaTmp,
      type: SO_QUY_TYPE.THU,
      method: PAYMENT_METHOD.TIEN_MAT
    });
  };

  pressResetValue = () => {
    this.namelRef?.current?.clear();
    this.phoneRef?.current?.clear();
    this.addressRef?.current?.clear();
    this.trongLuongRef?.current?.clear();
    this.chieuDaiRef?.current?.clear();
    this.chieuRongRef?.current?.clear();
    this.chieuCaoRef?.current?.clear();
    this.mapValueCustomer = {};
    this.viewLocationInforRef?.current?.resetLocation();
    this.viewSelecteOptionsRef?.current?.handleReset();
    this.props.setObjectInforShip(undefined);
    this.props.setObjectDTGH(undefined);
    this.tinhLaiTienKhachTra();
  };
  onSelectData = (data: any) => {
    this.onChangeValue('provider_code', data.provider_code);
    this.onChangeValue('provider_name', data.provider_name);
    this.onChangeValue('service_id', data.service_id);
    this.onChangeValue('service_name', data.service_name);
    this.onChangeValue('total_shipping_fee', data.total_shipping_fee);
  };

  render() {
    const {arrAddress, isFirstLoading} = this.state;
    const {currentKhachHang, objInforShip} = this.props;
    let viewInforCustomerShip = null;

    if (isFirstLoading) {
      return (
        <MyView transparent style={[inforShipStyles.container, {marginTop: MY_SIZE.s_16}]}>
          <MyLoading />
        </MyView>
      );
    }
    if (currentKhachHang && currentKhachHang.id !== KHACH_LE.id && arrAddress.length > 1) {
      viewInforCustomerShip = (
        <ViewInforCustomerShip
          onSelectAddress={(address: any) => {
            this.checkAddressWithCustomer(address, true);
            this.viewLocationInforRef?.current?.checkAddressWithCustomer(address, true);
          }}
          arrAddress={arrAddress}
        />
      );
    }
    return (
      <MyView style={inforShipStyles.container}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={60}
          style={inforShipStyles.container}
          behavior={Utilities.isAndroid() ? undefined : 'padding'}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={inforShipStyles.container}>
            <ViewStoreShip />
            <MyText myFontStyle={'Medium'} style={inforShipStyles.headerTitle}>
              Thông tin người nhận
            </MyText>
            {/* Danh sách người nhận */}
            {viewInforCustomerShip}
            {/* Tên */}
            <MyView
              style={[
                inforShipStyles.containerChild,
                {borderTopLeftRadius: MY_SIZE.s_16, borderTopRightRadius: MY_SIZE.s_16}
              ]}>
              <MyText style={inforShipStyles.txtTitle} myFontStyle="Regular">
                Tên người nhận
              </MyText>
              <MyInput
                inputRef={this.namelRef}
                onSubmitEditing={() => {
                  this.phoneRef.current.focus();
                }}
                textAlign={'right'}
                containerStyle={inforShipStyles.input}
                returnKeyType="done"
                defaultValue={objInforShip?.receiver_name || currentKhachHang?.name || ''}
                onChangeText={text => this.onChangeValue('receiver_name', text)}
              />
            </MyView>
            <MyView style={inforShipStyles.line} />
            {/* Số điện thoại */}
            <MyView style={inforShipStyles.containerChild}>
              <MyText style={inforShipStyles.txtTitle} myFontStyle="Regular">
                Điện thoại
              </MyText>
              <MyInput
                inputRef={this.phoneRef}
                onSubmitEditing={() => {
                  this.addressRef.current.focus();
                }}
                textAlign={'right'}
                keyboardType="number-pad"
                containerStyle={inforShipStyles.input}
                returnKeyType="done"
                defaultValue={objInforShip?.receiver_phone || currentKhachHang?.phone || ''}
                onChangeText={text => this.onChangeValue('receiver_phone', text)}
              />
            </MyView>
            <MyView style={inforShipStyles.line} />

            {/* Địa chỉ */}
            <MyView style={inforShipStyles.containerChild}>
              <MyText style={inforShipStyles.txtTitle} myFontStyle="Regular">
                Địa chỉ
              </MyText>
              <MyInput
                inputRef={this.addressRef}
                textAlign={'right'}
                containerStyle={inforShipStyles.input}
                returnKeyType="done"
                defaultValue={this.state.address}
                onChangeText={text => this.onChangeValue('receiver_address', text)}
              />
            </MyView>
            <MyView style={inforShipStyles.line} />
            {/* View địa chỉ */}
            <ViewLocationInfor
              ref={this.viewLocationInforRef}
              onChangeLocation={this.changeLocation}
            />

            <MyText myFontStyle={'Medium'} style={inforShipStyles.headerTitle}>
              Thông tin gói hàng
            </MyText>
            {/* Trọng lượng */}
            <MyView
              style={[
                inforShipStyles.containerChild,
                {borderTopLeftRadius: MY_SIZE.s_16, borderTopRightRadius: MY_SIZE.s_16}
              ]}>
              <MyText style={inforShipStyles.txtTitle} myFontStyle="Regular">
                Trọng lượng
              </MyText>
              <MyInput
                inputRef={this.trongLuongRef}
                onSubmitEditing={() => {
                  this.chieuDaiRef.current.focus();
                }}
                defaultValue={objInforShip?.weight?.toString()}
                placeholder="gram"
                textAlign={'right'}
                keyboardType="number-pad"
                containerStyle={inforShipStyles.input}
                returnKeyType="done"
                onChangeText={text => this.onChangeValue('weight', text)}
              />
            </MyView>
            <MyView style={inforShipStyles.line} />

            {/* Kích thước */}
            <MyView style={inforShipStyles.containerChild}>
              <MyText style={inforShipStyles.txtTitle} myFontStyle="Regular">
                Dài
              </MyText>
              <MyView style={inforShipStyles.viewInput}>
                <MyInput
                  onSubmitEditing={() => {
                    this.chieuRongRef.current.focus();
                  }}
                  inputRef={this.chieuDaiRef}
                  defaultValue={objInforShip?.length?.toString()}
                  placeholder="cm"
                  textAlign={'right'}
                  keyboardType="number-pad"
                  containerStyle={inforShipStyles.input}
                  returnKeyType="done"
                  onChangeText={text => this.onChangeValue('length', text)}
                />
              </MyView>
            </MyView>
            <MyView style={inforShipStyles.line} />
            <MyView style={inforShipStyles.containerChild}>
              <MyText style={inforShipStyles.txtTitle} myFontStyle="Regular">
                Rộng
              </MyText>
              <MyView style={inforShipStyles.viewInput}>
                <MyInput
                  onSubmitEditing={() => {
                    this.chieuCaoRef.current.focus();
                  }}
                  inputRef={this.chieuRongRef}
                  defaultValue={objInforShip?.width?.toString()}
                  placeholder="cm"
                  textAlign={'right'}
                  keyboardType="number-pad"
                  containerStyle={inforShipStyles.input}
                  returnKeyType="done"
                  onChangeText={text => this.onChangeValue('width', text)}
                />
              </MyView>
            </MyView>
            <MyView style={inforShipStyles.line} />
            <MyView
              style={[
                inforShipStyles.containerChild,
                {
                  borderBottomLeftRadius: MY_SIZE.s_16,
                  borderBottomRightRadius: MY_SIZE.s_16,
                  paddingBottom: MY_SIZE.s_12
                }
              ]}>
              <MyText style={inforShipStyles.txtTitle} myFontStyle="Regular">
                Cao
              </MyText>
              <MyView style={inforShipStyles.viewInput}>
                <MyInput
                  inputRef={this.chieuCaoRef}
                  placeholder="cm"
                  defaultValue={objInforShip?.height?.toString()}
                  textAlign={'right'}
                  keyboardType="number-pad"
                  containerStyle={inforShipStyles.input}
                  returnKeyType="done"
                  onChangeText={text => this.onChangeValue('height', text)}
                />
              </MyView>
            </MyView>

            <ViewSelecteOptions
              ref={this.viewSelecteOptionsRef}
              onChangeValue={this.valueSelecteOptions}
            />
          </ScrollView>
        </KeyboardAvoidingView>
        <MyView style={inforShipStyles.viewFlex}>
          <MyButton onPress={this.pressResetValue} style={inforShipStyles.btnRefresh}>
            <MyText style={{color: COLOR.TEXT.WHITE}}>Làm mới</MyText>
          </MyButton>
          <MyButton onPress={this.pressApDung} style={inforShipStyles.btnDone}>
            <MyText style={{color: COLOR.TEXT.WHITE}}>Cập nhật</MyText>
          </MyButton>
        </MyView>
        <SafeAreaView
          edges={['left', 'bottom', 'right']}
          style={{backgroundColor: COLOR.BG.WHITE}}
        />
      </MyView>
    );
  }
}
const mapStateToProps = (state: RootState) => {
  const {arrProductSale} = state.CreateSaleReducer;
  const {currentKhachHang} = state.ProductBanHangReducer;
  const {tienGiamGia} = state.ThanhToanReducer;
  const {inforCustomerShip, objInforShip, objDoiTacGiaoHang} = state.InforShippingReducer;
  return {
    arrProductSale,
    currentKhachHang,
    tienGiamGia,

    inforCustomerShip,
    objInforShip,
    objDoiTacGiaoHang
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      setObjectInforShip,
      setInforCustomerShip,
      setObjectDTGH,

      addFormPayment,
      resetThanhToan
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(InforShipping);
