import * as React from 'react';
import {MyView, MyText, MyButton, MyIcon} from 'bases/components';
import {inforShipStyles, locationStyle} from '../style/InforShipping.Styles';
import {KHACH_LE, LOCATION} from 'common/Constants';
import Utilities from 'utils/Utilities';
import {ILocation} from 'models/Localtion.Model';
import {IAddressModel} from 'models/Customer.Model';
import {
  IInforShippingState,
  IRequestShip,
  setInforCustomerShip,
  setObjectInforShip
} from '../redux';
import {LocationApi} from 'services/LocationApi';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {connect} from 'react-redux';
import {getApiAddressCustomer} from 'services';
import {IProductBanHangState} from 'views/banhang/ProductBanHang/redux';
import {MyLocation} from 'views/app/components/customs';
import {IProvince} from 'models/ModelBase';

interface IProps extends IInforShippingState, IProductBanHangState {
  onChangeLocation: (nameLocation: string, providers: IProvince, codeChange?: string) => void;
  setObjectInforShip: typeof setObjectInforShip;
  setInforCustomerShip: typeof setInforCustomerShip;
}

interface IAppState {
  city: Partial<ILocation>;
  district: Partial<ILocation>;
  ward: Partial<ILocation>;
  cityId?: string;
  districtId?: string;
  wardId?: string;
}

class ViewLocationInfor extends React.Component<IProps, IAppState> {
  modalRef: any;
  constructor(props: IProps) {
    super(props);
    this.state = {
      city: {},
      district: {},
      ward: {},
      cityId: '',
      districtId: '',
      wardId: ''
    };
  }
  async componentDidMount() {
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
      this.checkAddressWithCustomer(addressModel, true);
    } else {
      this.checkAddressWithCustomer();
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
        let cityId: any;
        let districtId: any;
        let wardId: any;
        let cityCode: any;
        let districtCode: any;
        let wardCode: any;
        if (address.receiver_province?.id) {
          let resCity = await LocationApi.getDetail(address.receiver_province.id);
          if (resCity && resCity.data) {
            cityId = resCity.data.code;
            cityCode = resCity.data;
          }
        }
        if (address.receiver_district?.id) {
          let resDistrict = await LocationApi.getDetailDistrict(address.receiver_district.id);
          if (resDistrict && resDistrict.data) {
            districtId = resDistrict?.data.code;
            districtCode = resDistrict?.data;
          }
        }
        if (address.receiver_ward?.id) {
          let resWard = await LocationApi.getDetailWard(address.receiver_ward.id);
          if (resWard && resWard.data) {
            wardId = resWard?.data.code;
            wardCode = resWard?.data;
          }
        }
        this.setState({
          cityId: cityId,
          districtId: districtId,
          wardId: wardId,
          city: cityCode,
          district: districtCode,
          ward: wardCode
        });
      } else {
        if (response && !response?.code && response?.data && response?.data.length > 0) {
          const currentDC: IAddressModel =
            response?.data.find((k: any) => k.is_default === true) || response?.data[0];
          this.props.setInforCustomerShip(currentDC || response?.data[0]);

          let cityId: any;
          let districtId: any;
          let wardId: any;
          let cityCode: any;
          let districtCode: any;
          let wardCode: any;
          if (currentDC.province?.id) {
            let resCity = await LocationApi.getDetail(currentDC.province?.id.toString());
            if (resCity && resCity.data) {
              cityId = resCity.data.code;
              cityCode = resCity.data;
            }
          }
          if (currentDC.district?.id) {
            let resDistrict = await LocationApi.getDetailDistrict(currentDC.district?.id);
            if (resDistrict && resDistrict.data) {
              districtId = resDistrict?.data.code;
              districtCode = resDistrict?.data;
            }
          }
          if (currentDC.ward?.id) {
            let resWard = await LocationApi.getDetailWard(currentDC.ward?.id);
            if (resWard && resWard.data) {
              wardId = resWard?.data.code;
              wardCode = resWard?.data;
            }
          }
          this.setState(
            {
              cityId: cityId,
              districtId: districtId,
              wardId: wardId,
              city: cityCode,
              district: districtCode,
              ward: wardCode
            },
            () => {
              // this.onChangeValue('receiver_name', currentDC?.name);
              // this.onChangeValue('receiver_phone', currentDC?.phone);
              // this.onChangeValue('receiver_address', currentDC?.address);
              // this.onChangeValue('receiver_district', currentKhachHang?.district);
              // this.onChangeValue('receiver_province', currentKhachHang?.province);
              // this.onChangeValue('receiver_ward', currentKhachHang?.ward);
            }
          );
        } else {
          // Utilities.showToast('Không tìm thấy địa chỉ', '', 'warning');
          let cityId: any;
          let districtId: any;
          let wardId: any;
          let cityCode: any;
          let districtCode: any;
          let wardCode: any;
          if (currentKhachHang?.province?.id) {
            let resCity = await LocationApi.getDetail(currentKhachHang?.province?.id.toString());
            if (resCity && resCity.data) {
              cityId = resCity.data.code;
              cityCode = resCity.data;
            }
          }
          if (currentKhachHang?.district?.id) {
            let resDistrict = await LocationApi.getDetailDistrict(currentKhachHang?.district?.id);
            if (resDistrict && resDistrict.data) {
              districtId = resDistrict?.data.code;
              districtCode = resDistrict?.data;
            }
          }
          if (currentKhachHang?.ward?.id) {
            let resWard = await LocationApi.getDetailWard(currentKhachHang?.ward?.id);
            if (resWard && resWard.data) {
              wardId = resWard?.data.code;
              wardCode = resWard?.data;
            }
          }
          this.setState(
            {
              cityId: cityId,
              districtId: districtId,
              wardId: wardId,
              city: cityCode,
              district: districtCode,
              ward: wardCode
            }
            // () => {
            //   this.onChangeValue('receiver_name', currentKhachHang?.name);
            //   this.onChangeValue('receiver_phone', currentKhachHang?.phone);
            //   this.onChangeValue('receiver_address', currentKhachHang?.address);
            //   this.onChangeValue('receiver_district', currentKhachHang?.district);
            //   this.onChangeValue('receiver_province', currentKhachHang?.province);
            //   this.onChangeValue('receiver_ward', currentKhachHang?.ward);
            // }
          );
        }
      }
      // }
    } catch (error) {
      Utilities.showToast('Thất bại', '', 'danger');
      Utilities.logException('CustomersAddress', error);
    }
  }

  modalLocation = (providers: IProvince, nameLocation: string) => {
    const {city, district} = this.state;
    switch (nameLocation) {
      case LOCATION.CITY:
        if (providers.code !== city?.code) {
          this.props.onChangeLocation(nameLocation, providers, city?.code);
          this.setState({
            city: providers,
            cityId: providers?.code,
            district: {name: '', code: '', id: 0},
            ward: {name: '', code: '', id: 0}
          });
        } else {
          this.props.onChangeLocation(nameLocation, providers, city?.code);
          this.setState({
            city: providers,
            cityId: providers.code
          });
        }
        break;
      case LOCATION.DISTRICT:
        if (providers.code !== district.code) {
          this.props.onChangeLocation(nameLocation, providers, district?.code);
          this.setState({
            district: providers,
            districtId: providers.code,
            ward: {name: '', code: '', id: 0}
          });
        } else {
          this.props.onChangeLocation(nameLocation, providers, district?.code);
          this.setState({
            district: providers,
            districtId: providers.code
          });
        }
        break;
      case LOCATION.WARD:
        this.props.onChangeLocation(nameLocation, providers);
        this.setState({
          ward: providers,
          wardId: providers.code
        });
        break;
      default:
        break;
    }
  };

  resetLocation = () => {
    this.setState({
      city: {},
      district: {},
      ward: {},
      cityId: '',
      districtId: '',
      wardId: ''
    });
  };
  render() {
    const {city, district, ward, districtId, cityId} = this.state;

    return (
      <MyView style={locationStyle.container}>
        <MyView style={locationStyle.containerChildADD}>
          <MyText myFontStyle="Regular" style={locationStyle.textPhoneAdd}>
            Tỉnh, thành
          </MyText>
          <MyButton
            onPress={() => {
              this.modalRef?.showHideModal(LOCATION.CITY, [city?.id]);
            }}
            style={[locationStyle.viewInputPhoneAdd, locationStyle.viewBirthdayAdd]}>
            <MyText
              myFontStyle="Regular"
              style={[locationStyle.contentBirthDay, locationStyle.textPhoneAdd]}>
              {city?.name || ''}
            </MyText>
            <MyIcon
              style={locationStyle.contentBirthDay}
              iconFontType="MaterialIcons"
              name="keyboard-arrow-right"
              size={24}
            />
          </MyButton>
        </MyView>
        <MyView style={inforShipStyles.line} />
        <MyView style={locationStyle.containerChildADD}>
          <MyText myFontStyle="Regular" style={locationStyle.textPhoneAdd}>
            Quận, huyện
          </MyText>
          <MyButton
            onPress={() => {
              if (city?.name && city?.name.length > 0) {
                this.modalRef?.showHideModal(LOCATION.DISTRICT, [district?.id], cityId);
              } else {
                Utilities.showToast('Bạn chưa nhập Thành phố', '', 'warning');
              }
            }}
            style={[locationStyle.viewInputPhoneAdd, locationStyle.viewBirthdayAdd]}>
            <MyText
              myFontStyle="Regular"
              style={[locationStyle.contentBirthDay, locationStyle.textPhoneAdd]}>
              {district?.name || ''}
            </MyText>
            <MyIcon
              style={locationStyle.contentBirthDay}
              iconFontType="MaterialIcons"
              name="keyboard-arrow-right"
              size={24}
            />
          </MyButton>
        </MyView>
        <MyView style={inforShipStyles.line} />
        <MyView style={locationStyle.containerChildADD}>
          <MyText myFontStyle="Regular" style={locationStyle.textPhoneAdd}>
            Phường, xã
          </MyText>
          <MyButton
            onPress={() => {
              // if (currentWard.length > 0) {
              //   this.modalRef?.showHideModal(LOCATION.WARD, wardId, district.id);
              // } else
              if (district?.name && district?.name.length > 0) {
                this.modalRef?.showHideModal(LOCATION.WARD, [ward?.id], districtId);
              } else {
                Utilities.showToast('Bạn chưa nhập Quận/huyện', '', 'warning');
              }
            }}
            style={[locationStyle.viewInputPhoneAdd, locationStyle.viewBirthdayAdd]}>
            <MyText
              myFontStyle="Regular"
              style={[locationStyle.contentBirthDay, locationStyle.textPhoneAdd]}>
              {ward?.name || ''}
            </MyText>
            <MyIcon
              style={locationStyle.contentBirthDay}
              iconFontType="MaterialIcons"
              name="keyboard-arrow-right"
              size={24}
            />
          </MyButton>
        </MyView>
        <MyView style={inforShipStyles.line} />
        <MyLocation
          ref={node => {
            this.modalRef = node;
          }}
          valueModal={this.modalLocation}
        />
      </MyView>
    );
  }
}
const mapStateToProps = (state: RootState) => {
  const {currentKhachHang} = state.ProductBanHangReducer;
  const {arrProductSale} = state.CreateSaleReducer;
  const {inforCustomerShip, objInforShip} = state.InforShippingReducer;
  return {
    currentKhachHang,
    arrProductSale,
    inforCustomerShip,
    objInforShip
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setObjectInforShip, setInforCustomerShip}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(
  ViewLocationInfor
);
