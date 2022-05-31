/* eslint-disable react/no-did-mount-set-state */
import * as React from 'react';
import {ScrollView, KeyboardAvoidingView, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {bindActionCreators} from 'redux';
import {
  MyText,
  MyLoading,
  MyInput,
  MyView,
  MyButton,
  MyImage,
  MyIcon,
  MyButtonIcon
} from 'bases/components';
import {SuppliersStyle} from '../style/suppliers.Style';
import MyNavigator from 'utils/MyNavigator';
import {ICustomersRequest, postApiCustomer, putApiCustomer} from 'services';
import Utilities from 'utils/Utilities';
import {GetSuppliers} from '../redux';
import {ISuppliers} from 'models/Suppliers.Model';
import {LOCATION} from 'common/Constants';
import {setRadius, MY_SIZE, COLOR, setPadding} from 'bases/styles/Core';
import ViewLocation from 'views/customers/manager/components/ViewLocation';
import ModalNCC from './ModalNCC';
import {IChooseStoreState} from 'views/menuLeft/redux';
import {CustomerModel} from 'models/Customer.Model';
import {IProvince} from 'models/ModelBase';
import {IAppNavigateProps} from 'views/app';

type IProps = IAppNavigateProps<'AddSuppliers'> &
  ISuppliers &
  IChooseStoreState & {
    GetSuppliers: typeof GetSuppliers;
  };

interface IAppState {
  isLoadHoder: boolean;
  nameGroup?: string;
  city?: IProvince;
  district?: IProvince;
  ward?: IProvince;
}
const windowWidth = Dimensions.get('screen').width;
const skip = 0;
const limit = 10;
class AddSuppliers extends React.Component<IProps, IAppState> {
  ClearTime: any;
  refInputNote: any = React.createRef();
  mapSuppliers: any;
  refInputTNCC: any = React.createRef();
  refInputSDT: any = React.createRef();
  refInputEmail: any = React.createRef();
  refInputAddress: any = React.createRef();
  refInputCompany: any = React.createRef();
  refInputTaxCode: any = React.createRef();
  modalNCCRef: any = React.createRef();

  constructor(props: IProps) {
    super(props);
    this.state = {
      isLoadHoder: false,
      nameGroup: '',
      city: undefined,
      district: undefined,
      ward: undefined
    };
    this.ClearTime = null;
    this.mapSuppliers = {};
  }
  onchangeValue = (type: keyof ICustomersRequest, text: any) => {
    this.mapSuppliers[type] = text;
  };

  changeLocation = (location: IProvince, nameLocation: string) => {
    switch (nameLocation) {
      case LOCATION.CITY:
        this.onchangeValue('province', location);

        break;
      case LOCATION.DISTRICT:
        this.onchangeValue('district', location);

        break;
      case LOCATION.WARD:
        this.onchangeValue('ward', location);
        break;
      default:
        break;
    }
  };
  checkLocation = async (InfoCustomerUpdate: CustomerModel) => {
    this.setState({
      city: InfoCustomerUpdate.province,
      district: InfoCustomerUpdate.district,
      ward: InfoCustomerUpdate.ward
    });
  };

  componentDidMount() {
    const {route} = this.props;
    this.props.navigation.setOptions({
      headerTitle:
        route?.params && route?.params?.type === 'UPDATE'
          ? 'Sửa nhà cung cấp'
          : 'Thêm nhà cung cấp',
      headerRight: () => (
        <MyButtonIcon
          style={{...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)}}
          iconFontType="MaterialCommunityIcons"
          iconProps={{name: 'content-save', size: 20, color: COLOR.TEXT.BLACK}}
          onPress={() => {
            if (route?.params && route?.params?.type === 'UPDATE') {
              this.updateSuppliers(String(route?.params.InfoSupplierUpdate?.id || ''));
            } else {
              this.FnAddSuppliers();
            }
          }}
        />
      )
    });
    if (route?.params && route?.params?.type === 'UPDATE') {
      const {InfoSupplierUpdate} = route?.params;
      this.setState({
        nameGroup:
          InfoSupplierUpdate.group && InfoSupplierUpdate.group?.name
            ? InfoSupplierUpdate.group?.name
            : ''
      });
      this.checkLocation(InfoSupplierUpdate);
    }
    this.setState({isLoadHoder: true});
    this.ClearTime = setTimeout(() => {
      this.setState({isLoadHoder: false});
      clearTimeout(this.ClearTime);
    }, 500);
  }

  async updateSuppliers(id: string) {
    try {
      const response = await putApiCustomer(id, this.mapSuppliers);
      if (response && response.code === 0) {
        Utilities.showToast(response.message, '', 'success');
        this.props.GetSuppliers(skip, limit, true);
        MyNavigator.popToTop();
      } else {
        Utilities.showToast(response.message, '', 'warning');
      }
    } catch (error) {
      Utilities.showToast('Tải lên nội dung thất bại!', '', 'danger');
    }
  }

  componentWillUnmount() {
    clearTimeout(this.ClearTime);
  }

  async FnAddSuppliers() {
    const {cuaHangDangChon} = this.props;
    this.onchangeValue('type', 'supplier');
    if (cuaHangDangChon) {
      this.onchangeValue('stores', [cuaHangDangChon]);
    }
    if (!this.mapSuppliers.name) {
      Utilities.showToast('Chưa nhập tên khách hàng', '', 'warning');
      return;
    }
    if (!this.mapSuppliers.phone) {
      Utilities.showToast('Chưa nhập số điện thoại', '', 'warning');
      return;
    }
    try {
      const response = await postApiCustomer(this.mapSuppliers);
      if (response && response.code === 0) {
        Utilities.showToast(response.message, '', 'success');
        this.props.GetSuppliers(skip, limit, true);
        MyNavigator.goBack();
      } else {
        Utilities.showToast(response.message, '', 'warning');
      }
    } catch (error) {
      Utilities.showToast('Tải lên nội dung thất bại!', '', 'danger');
    }
  }
  render() {
    const {isLoadHoder, city, district, ward, nameGroup} = this.state;
    const {cuaHangDangChon, route} = this.props;
    return (
      <MyView style={SuppliersStyle.container}>
        {isLoadHoder ? (
          <MyView style={{paddingTop: MY_SIZE.s_16}}>
            <MyLoading />
          </MyView>
        ) : (
          <KeyboardAvoidingView
            style={SuppliersStyle.container}
            keyboardVerticalOffset={100}
            behavior={Utilities.isAndroid() ? undefined : 'padding'}>
            <ScrollView
              style={{backgroundColor: 'white'}}
              showsHorizontalScrollIndicator
              showsVerticalScrollIndicator={false}>
              <MyView style={SuppliersStyle.containerADD}>
                <MyButton
                  onPress={() => {
                    //   this.openImage();
                  }}
                  style={SuppliersStyle.btnImageAdd}>
                  <MyImage
                    style={{...setRadius(MY_SIZE.s_50, MY_SIZE.s_50, MY_SIZE.s_50, MY_SIZE.s_50)}}
                    height={windowWidth / 4.5}
                    width={windowWidth / 4.5}
                    source={Utilities.convertLinkImage('')}
                  />
                </MyButton>
                <MyView style={SuppliersStyle.container} transparent>
                  {/* <MyInput
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      this.refInputTNCC.current.focus();
                    }}
                    style={SuppliersStyle.inputNameADD}
                    blurOnSubmit={false}
                    onChangeText={(v) => {
                      this.onchangeValue('id', v);
                    }}
                    placeholder={'Mã nhà NCC'}
                  /> */}
                  <MyInput
                    inputRef={this.refInputTNCC}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      this.refInputSDT.current.focus();
                    }}
                    style={SuppliersStyle.inputNameADD}
                    blurOnSubmit={false}
                    onChangeText={v => {
                      this.onchangeValue('name', v);
                    }}
                    placeholder={'Tên nhà NCC'}>
                    {route?.params ? route?.params?.InfoSupplierUpdate.name : ''}
                  </MyInput>
                </MyView>
              </MyView>
              <MyText style={SuppliersStyle.textInfoADD}>Thông tin khách NCC</MyText>
              <MyView style={SuppliersStyle.containerChildADD}>
                <MyText style={SuppliersStyle.textPhoneAdd}>Số điện thoại:</MyText>
                <MyView style={SuppliersStyle.viewInputPhoneAdd}>
                  <MyInput
                    inputRef={this.refInputSDT}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      this.refInputEmail.current.focus();
                    }}
                    onChangeText={v => {
                      this.onchangeValue('phone', v);
                    }}
                    blurOnSubmit={false}>
                    {route?.params ? route?.params?.InfoSupplierUpdate?.phone : ''}
                  </MyInput>
                </MyView>
              </MyView>
              <MyView style={SuppliersStyle.containerChildADD}>
                <MyText style={SuppliersStyle.textPhoneAdd}>Email:</MyText>
                <MyView style={SuppliersStyle.viewInputPhoneAdd}>
                  <MyInput
                    inputRef={this.refInputEmail}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      this.refInputAddress.current.focus();
                    }}
                    onChangeText={v => {
                      this.onchangeValue('email', v);
                    }}
                    blurOnSubmit={false}>
                    {route?.params ? route?.params?.InfoSupplierUpdate?.email : ''}
                  </MyInput>
                </MyView>
              </MyView>
              <MyView style={SuppliersStyle.containerChildADD}>
                <MyText style={SuppliersStyle.textPhoneAdd}>Địa chỉ:</MyText>
                <MyView style={SuppliersStyle.viewInputPhoneAdd}>
                  <MyInput
                    inputRef={this.refInputAddress}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      this.refInputCompany.current.focus();
                    }}
                    onChangeText={v => {
                      this.onchangeValue('address', v);
                    }}
                    blurOnSubmit={false}>
                    {route?.params ? route?.params?.InfoSupplierUpdate?.address : ''}
                  </MyInput>
                </MyView>
              </MyView>
              <ViewLocation
                currentCity={city}
                currentdistrict={district}
                currentWard={ward}
                onChangeLocation={this.changeLocation}
              />
              {route?.params && route?.params?.type === 'UPDATE' ? null : (
                <MyView style={SuppliersStyle.containerChildADD}>
                  <MyText style={SuppliersStyle.textPhoneAdd}>Chi nhánh tạo:</MyText>
                  <MyView
                    style={[SuppliersStyle.viewInputPhoneAdd, SuppliersStyle.viewBirthdayAdd]}>
                    <MyText style={[SuppliersStyle.contentBirthDay, SuppliersStyle.textPhoneAdd]}>
                      {cuaHangDangChon?.name}
                    </MyText>
                  </MyView>
                </MyView>
              )}
              <MyView style={SuppliersStyle.containerChildADD}>
                <MyText style={SuppliersStyle.textPhoneAdd}>Nhóm:</MyText>
                <MyButton
                  onPress={() => {
                    this.modalNCCRef.current?.showModal();
                  }}
                  style={[SuppliersStyle.viewInput]}>
                  <MyText style={[SuppliersStyle.contentBirthDay, SuppliersStyle.textPhoneAdd]}>
                    {nameGroup}
                  </MyText>
                  <MyIcon
                    style={SuppliersStyle.contentBirthDay}
                    iconFontType="MaterialIcons"
                    name="keyboard-arrow-right"
                    size={24}
                  />
                </MyButton>
              </MyView>

              <MyView>
                <MyView style={SuppliersStyle.containerChildADD}>
                  <MyText style={SuppliersStyle.textPhoneAdd}>Tên công ty:</MyText>
                  <MyView style={SuppliersStyle.viewInputPhoneAdd}>
                    <MyInput
                      inputRef={this.refInputCompany}
                      returnKeyType="next"
                      onSubmitEditing={() => {
                        this.refInputTaxCode.current.focus();
                      }}
                      onChangeText={v => {
                        this.onchangeValue('company', v);
                      }}
                      blurOnSubmit={false}>
                      {route?.params ? route?.params?.InfoSupplierUpdate?.company : ''}
                    </MyInput>
                  </MyView>
                </MyView>
                <MyView style={SuppliersStyle.containerChildADD}>
                  <MyText style={SuppliersStyle.textPhoneAdd}>Mã số thuế:</MyText>
                  <MyView style={SuppliersStyle.viewInputPhoneAdd}>
                    <MyInput
                      inputRef={this.refInputTaxCode}
                      returnKeyType="next"
                      onSubmitEditing={() => {
                        this.refInputNote.current.focus();
                      }}
                      onChangeText={v => {
                        this.onchangeValue('tax_code', v);
                      }}
                      blurOnSubmit={false}>
                      {route?.params ? route?.params?.InfoSupplierUpdate?.tax_code : ''}
                    </MyInput>
                  </MyView>
                </MyView>
              </MyView>

              <MyInput
                inputRef={this.refInputNote}
                onChangeText={v => {
                  this.onchangeValue('note', v);
                }}
                containerStyle={SuppliersStyle.inputNoteAdd}
                placeholder="Nhập ghi chú">
                {route?.params ? route?.params?.InfoSupplierUpdate?.note : ''}
              </MyInput>
            </ScrollView>
          </KeyboardAvoidingView>
        )}
        <ModalNCC
          ref={this.modalNCCRef}
          checkGroup={nameGroup || ''}
          valueModal={valueGroup => {
            this.setState({
              nameGroup: valueGroup.name
            });
            this.onchangeValue('group', valueGroup);
          }}
        />
      </MyView>
    );
  }
}
const mapStateToProps = (state: RootState) => {
  const {cuaHangDangChon} = state.ChooseStoreReducer;
  return {cuaHangDangChon};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({GetSuppliers}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSuppliers);
