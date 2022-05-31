/* eslint-disable react/no-did-mount-set-state */
import * as React from 'react';
import {ScrollView, KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
import {
  MyView,
  MyText,
  MyInput,
  MyButton,
  MyImage,
  MyIcon,
  MyLoading,
  MyButtonIcon
} from 'bases/components';
import Utilities from 'utils/Utilities';
import {CustomerStyle} from '../style/Customer.Style';
import {setRadius, MY_SIZE, COLOR, setPadding} from 'bases/styles/Core';
import {RootState} from 'views/app/redux/App.Reducer';
import {
  LOCATION,
  LIST_TYPES,
  LIST_GENDER,
  IMAGE_SIZE,
  CODE_LIST_GENDER,
  CODE_LIST_TYPES
} from 'common/Constants';
import {ICustomersRequest, postApiCustomer, putApiCustomer} from 'services/Customers.Api';
import {GetCustomer} from '../redux';
import ModalTypeAndGender from './ModalTypeAndGender';
import ImagePicker from 'react-native-image-crop-picker';
import ViewLocation from './ViewLocation';
import {IChooseStoreState} from 'views/menuLeft/redux';
import ModalNKH from './ModalNKH';
import MyNavigator from 'utils/MyNavigator';
import {bindActionCreators} from 'redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomerModel} from 'models/Customer.Model';
import {IProvince} from 'models/ModelBase';
import {IAppNavigateProps} from 'views/app';

type IProps = IAppNavigateProps<'AddCustomer'> &
  IChooseStoreState & {
    GetCustomer: typeof GetCustomer;
  };

type TypeAndGender = {
  code: CODE_LIST_GENDER | CODE_LIST_TYPES;
  name: string;
};
interface IAppState {
  isLoadHoder: boolean;
  birthday: Date;
  types: TypeAndGender;
  gender: TypeAndGender;
  nameGroup?: string;
  city?: IProvince;
  district?: IProvince;
  ward?: IProvince;
  pathImage: {
    path: string;
    mine: string;
  };
}

class AddCustomer extends React.Component<IProps, IAppState> {
  refInputTNCC: any = React.createRef();
  refInputSDT: any = React.createRef();
  refInputDC: any = React.createRef();
  refInputEmail: any = React.createRef();
  refInputCompany: any = React.createRef();
  refInputMST: any = React.createRef();
  refInputGroup: any = React.createRef();
  refInputNote: any = React.createRef();
  mapValueCustomer: any;
  refInputCNT: any = React.createRef();
  modalRef: any = React.createRef();
  ClearTime: any;
  TypeAndGenderRef: any = React.createRef();
  modalNKHRef: any = React.createRef();

  refInputTaxCode: any = React.createRef();

  skip = 0;
  limit = 10;

  constructor(props: IProps) {
    super(props);
    this.state = {
      isLoadHoder: false,
      birthday: new Date(),
      types: LIST_TYPES[0],
      gender: LIST_GENDER[0],
      nameGroup: '',
      city: undefined,
      district: undefined,
      ward: undefined,
      pathImage: {path: '', mine: ''}
    };
    this.mapValueCustomer = {};
    this.ClearTime = null;
  }

  componentDidMount() {
    const {route} = this.props;
    this.props.navigation.setOptions({
      headerTitle:
        route?.params && route?.params?.type === 'UPDATE' ? 'Sửa khách hàng' : 'Thêm khách hàng',
      headerRight: () => (
        <MyButtonIcon
          style={{...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)}}
          iconFontType="MaterialCommunityIcons"
          iconProps={{name: 'content-save', size: 24, color: COLOR.TEXT.BLACK}}
          onPress={() => {
            if (route?.params && route?.params?.type === 'UPDATE') {
              this.updateCustomer(String(route?.params.InfoCustomerUpdate.id || ''));
            } else {
              this.FnAddCustomer();
            }
          }}
        />
      )
    });
    if (route?.params && route?.params?.type === 'UPDATE') {
      const {InfoCustomerUpdate} = route?.params;
      this.setState({
        birthday: InfoCustomerUpdate.birthday
          ? new Date(InfoCustomerUpdate.birthday * 1000)
          : new Date(),
        types:
          InfoCustomerUpdate.type === LIST_TYPES[0].code
            ? LIST_TYPES[0]
            : InfoCustomerUpdate.type === LIST_TYPES[1].code
            ? LIST_TYPES[1]
            : LIST_TYPES[2],
        gender: InfoCustomerUpdate.gender === LIST_GENDER[0].code ? LIST_GENDER[0] : LIST_GENDER[1],
        nameGroup:
          InfoCustomerUpdate.group && InfoCustomerUpdate.group?.name
            ? InfoCustomerUpdate.group?.name
            : ''
      });
      this.checkLocation(InfoCustomerUpdate);
    }
    this.setState({isLoadHoder: true});
    this.ClearTime = setTimeout(() => {
      this.setState({isLoadHoder: false});
      clearTimeout(this.ClearTime);
    }, 500);
  }

  async updateCustomer(id: string) {
    try {
      Utilities.showHideRootLoading(true, '');
      const response = await putApiCustomer(id, this.mapValueCustomer);
      if (response && !response?.code) {
        Utilities.showHideRootLoading(false, '');
        Utilities.showToast(response?.message, '', 'success');
        this.props.GetCustomer(this.skip, this.limit);
        MyNavigator.popToTop();
      } else {
        Utilities.showToast(response?.message, '', 'danger');
        Utilities.showHideRootLoading(false, '');
      }
    } catch (error) {
      Utilities.showToast('Tải lên nội dung thất bại!', '', 'danger');
      Utilities.showHideRootLoading(false, '');
    }
  }

  checkLocation = async (InfoCustomerUpdate: CustomerModel) => {
    this.setState({
      city: InfoCustomerUpdate.province,
      district: InfoCustomerUpdate.district,
      ward: InfoCustomerUpdate.ward
    });
  };

  componentWillUnmount() {
    clearTimeout(this.ClearTime);
  }

  onchangeValue = (key: keyof ICustomersRequest, text: any) => {
    this.mapValueCustomer[key] = text;
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

  async FnAddCustomer() {
    const {types} = this.state;
    const {cuaHangDangChon} = this.props;
    if (types.code === LIST_TYPES[0].code) {
      this.onchangeValue('type', LIST_TYPES[0].code);
    }
    if (cuaHangDangChon) {
      this.onchangeValue('stores', [cuaHangDangChon]);
    }
    if (!this.mapValueCustomer.name) {
      Utilities.showToast('Chưa nhập tên khách hàng', '', 'warning');
      return;
    }
    if (!this.mapValueCustomer.phone) {
      Utilities.showToast('Chưa nhập số điện thoại', '', 'warning');
      return;
    }
    // if (pathImage.path.length > 0) {
    //   const formdata = new FormData();
    //   formdata.append('file', {
    //     uri: pathImage.path,
    //     name: 'image.jpg',
    //     type: pathImage.mine
    //   });
    //   const res = await Axios({
    //     url: `${API_END_POINT}/v1/images/upload-single?group=customers`,
    //     method: 'POST',
    //     data: formdata,
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   });
    //   if (res && res.data) {
    //     this.onchangeValue('groups', idGroup);
    //   } else {
    //     Utilities.logException('postAvatarCustomer', res);
    //   }
    // }
    try {
      Utilities.showHideRootLoading(true, '');
      const response = await postApiCustomer(this.mapValueCustomer);
      if (response && !response?.code) {
        Utilities.showHideRootLoading(false, '');
        Utilities.showToast(response?.message, '', 'success');
        this.props.GetCustomer(this.skip, this.limit);
        MyNavigator.goBack();
      } else {
        Utilities.showToast(response?.message, '', 'danger');
        Utilities.showHideRootLoading(false, '');
      }
    } catch (error) {
      Utilities.showToast('Tải lên nội dung thất bại!', '', 'danger');
      Utilities.showHideRootLoading(false, '');
    }
  }

  openImage() {
    ImagePicker.openPicker({
      cropping: false
    }).then(image => {
      const pathImage = {
        path: image.path,
        mine: image.mime
      };
      this.setState({
        pathImage
      });
    });
  }

  onPressBirthDay = () => {
    MyNavigator.pushModal('MyDatePickerModal', {
      title: 'Ngày sinh',
      titleButtonCancel: 'Huỷ',
      titleButtonChange: 'Chọn',
      value: this.state.birthday,
      onChange: this.handleToSelectedDate
    });
  };

  handleToSelectedDate = (value: any) => {
    this.setState({birthday: value});
    this.onchangeValue('birthday', value);
  };
  render() {
    const {isLoadHoder, birthday, types, nameGroup, gender, city, district, ward, pathImage} =
      this.state;
    const {cuaHangDangChon, route} = this.props;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: COLOR.BG.WHITE}} edges={['bottom']}>
        <MyView style={CustomerStyle.container}>
          {isLoadHoder ? (
            <MyView style={{paddingTop: 16}}>
              <MyLoading />
            </MyView>
          ) : (
            <KeyboardAvoidingView
              style={CustomerStyle.container}
              keyboardVerticalOffset={60}
              behavior={Utilities.isAndroid() ? undefined : 'padding'}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <MyView style={CustomerStyle.containerADD}>
                  <MyButton
                    onPress={() => {
                      //   this.openImage();
                    }}
                    style={CustomerStyle.btnImageAdd}>
                    <MyImage
                      style={{...setRadius(MY_SIZE.s_50, MY_SIZE.s_50, MY_SIZE.s_50, MY_SIZE.s_50)}}
                      height={Utilities.getWidthScreen() / 4.5}
                      width={Utilities.getWidthScreen() / 4.5}
                      source={Utilities.convertLinkImage(pathImage.path, IMAGE_SIZE.EPIC)}
                    />
                  </MyButton>
                  <MyView style={CustomerStyle.container}>
                    <MyButton
                      onPress={() => {
                        this.TypeAndGenderRef.current?.showHideModal(
                          'type',
                          LIST_TYPES,
                          types.code
                        );
                      }}
                      style={CustomerStyle.viewAvatarAdd}>
                      <MyText style={[CustomerStyle.contentBirthDay, CustomerStyle.textPhoneAdd]}>
                        {'Khách hàng ' + types.name}
                      </MyText>
                      <MyIcon
                        style={CustomerStyle.contentBirthDay}
                        iconFontType="MaterialIcons"
                        name="keyboard-arrow-right"
                        size={24}
                      />
                    </MyButton>
                    <MyInput
                      inputRef={this.refInputTNCC}
                      returnKeyType="next"
                      onSubmitEditing={() => {
                        this.refInputSDT.current.focus();
                      }}
                      containerStyle={CustomerStyle.inputNameADD}
                      blurOnSubmit={false}
                      onChangeText={v => {
                        this.onchangeValue('name', v);
                      }}
                      placeholder="Nhập tên khách hàng...">
                      {route?.params ? route?.params?.InfoCustomerUpdate.name : ''}
                    </MyInput>
                  </MyView>
                </MyView>
                <MyText style={CustomerStyle.textInfoADD}>Thông tin khách hàng</MyText>
                <MyView style={CustomerStyle.containerChildADD}>
                  <MyText style={CustomerStyle.textPhoneAdd}>Số điện thoại:</MyText>
                  <MyView style={CustomerStyle.viewInputPhoneAdd}>
                    <MyInput
                      inputRef={this.refInputSDT}
                      returnKeyType="done"
                      onSubmitEditing={() => {
                        this.refInputDC.current.focus();
                      }}
                      onChangeText={v => {
                        this.onchangeValue('phone', v);
                      }}
                      blurOnSubmit={false}
                      keyboardType={'number-pad'}>
                      {route?.params ? route?.params?.InfoCustomerUpdate.phone : ''}
                    </MyInput>
                  </MyView>
                </MyView>
                <MyView style={CustomerStyle.containerChildADD}>
                  <MyText style={CustomerStyle.textPhoneAdd}>Ngày sinh:</MyText>
                  <MyButton
                    onPress={() => {
                      this.onPressBirthDay();
                    }}
                    style={[CustomerStyle.viewInput]}>
                    <MyText style={[CustomerStyle.contentBirthDay, CustomerStyle.textPhoneAdd]}>
                      {Utilities.convertTimeByFormat(birthday, 'DD/MM/YYYY')}
                    </MyText>
                    <MyIcon
                      style={CustomerStyle.contentBirthDay}
                      iconFontType="MaterialIcons"
                      name="keyboard-arrow-right"
                      size={24}
                    />
                  </MyButton>
                </MyView>
                <MyView style={CustomerStyle.containerChildADD}>
                  <MyText style={CustomerStyle.textPhoneAdd}>Giới tính:</MyText>
                  <MyButton
                    onPress={() => {
                      this.TypeAndGenderRef.current?.showHideModal(
                        'gender',
                        LIST_GENDER,
                        gender.code
                      );
                    }}
                    style={[CustomerStyle.viewInput]}>
                    <MyText style={[CustomerStyle.contentBirthDay, CustomerStyle.textPhoneAdd]}>
                      {gender.name}
                    </MyText>
                    <MyIcon
                      style={CustomerStyle.contentBirthDay}
                      iconFontType="MaterialIcons"
                      name="keyboard-arrow-right"
                      size={24}
                    />
                  </MyButton>
                </MyView>
                <MyView style={CustomerStyle.containerChildADD}>
                  <MyText style={CustomerStyle.textPhoneAdd}>Địa chỉ:</MyText>
                  <MyView style={CustomerStyle.viewInputPhoneAdd}>
                    <MyInput
                      inputRef={this.refInputDC}
                      returnKeyType="next"
                      onSubmitEditing={() => {
                        this.refInputEmail.current.focus();
                      }}
                      blurOnSubmit={false}
                      onChangeText={v => {
                        this.onchangeValue('address', v);
                      }}>
                      {route?.params ? route?.params?.InfoCustomerUpdate.address : ''}
                    </MyInput>
                  </MyView>
                </MyView>
                <ViewLocation
                  currentCity={city}
                  currentdistrict={district}
                  currentWard={ward}
                  onChangeLocation={this.changeLocation}
                />
                <MyView style={CustomerStyle.containerChildADD}>
                  <MyText style={CustomerStyle.textPhoneAdd}>Email:</MyText>
                  <MyView style={CustomerStyle.viewInputPhoneAdd}>
                    <MyInput
                      inputRef={this.refInputEmail}
                      returnKeyType="next"
                      onSubmitEditing={() => {
                        this.refInputNote.current.focus();
                      }}
                      blurOnSubmit={false}
                      onChangeText={v => {
                        this.onchangeValue('email', v);
                      }}>
                      {route?.params ? route?.params?.InfoCustomerUpdate.email : ''}
                    </MyInput>
                  </MyView>
                </MyView>
                {route?.params && route?.params?.type === 'UPDATE' ? null : (
                  <MyView style={CustomerStyle.containerChildADD}>
                    <MyText style={CustomerStyle.textPhoneAdd}>Chi nhánh:</MyText>
                    <MyView
                      style={[CustomerStyle.viewInputPhoneAdd, CustomerStyle.viewBirthdayAdd]}>
                      <MyText style={[CustomerStyle.contentBirthDay, CustomerStyle.textPhoneAdd]}>
                        {cuaHangDangChon?.name}
                      </MyText>
                    </MyView>
                  </MyView>
                )}

                <MyView style={CustomerStyle.containerChildADD}>
                  <MyText style={CustomerStyle.textPhoneAdd}>Nhóm:</MyText>
                  <MyButton
                    onPress={() => {
                      this.modalNKHRef.current?.showModal();
                    }}
                    style={[CustomerStyle.viewInput]}>
                    <MyText style={[CustomerStyle.contentBirthDay, CustomerStyle.textPhoneAdd]}>
                      {nameGroup}
                    </MyText>
                    <MyIcon
                      style={CustomerStyle.contentBirthDay}
                      iconFontType="MaterialIcons"
                      name="keyboard-arrow-right"
                      size={24}
                    />
                  </MyButton>
                </MyView>

                {/* <MyView style={CustomerStyle.containerChildADD}>
                  <MyText style={CustomerStyle.textPhoneAdd}>Tên công ty:</MyText>
                  <MyView style={CustomerStyle.viewInputPhoneAdd}>
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
                      {route?.params ? route?.params?.InfoCustomerUpdate.company : ''}
                    </MyInput>
                  </MyView>
                </MyView>
                <MyView style={CustomerStyle.containerChildADD}>
                  <MyText style={CustomerStyle.textPhoneAdd}>Mã số thuế:</MyText>
                  <MyView style={CustomerStyle.viewInputPhoneAdd}>
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
                      {route?.params ? route?.params?.InfoCustomerUpdate.tax_code : ''}
                    </MyInput>
                  </MyView>
                </MyView> */}

                <MyInput
                  inputRef={this.refInputNote}
                  onChangeText={v => {
                    this.onchangeValue('note', v);
                  }}
                  containerStyle={CustomerStyle.inputNoteAdd}
                  placeholder="Nhập ghi chú">
                  {route?.params ? route?.params?.InfoCustomerUpdate.note : ''}
                </MyInput>
              </ScrollView>
            </KeyboardAvoidingView>
          )}
          <ModalTypeAndGender
            ref={this.TypeAndGenderRef}
            valueModal={(selectedType, code, name) => {
              if (selectedType === 'type') {
                this.setState({types: {name, code}});
                this.onchangeValue(selectedType, code);
              } else if (selectedType === 'gender') {
                this.setState({gender: {name, code}});
                this.onchangeValue(selectedType, code);
              }
            }}
          />
          <ModalNKH
            ref={this.modalNKHRef}
            checkGroup={nameGroup || ''}
            valueModal={valueGroup => {
              this.setState({
                nameGroup: valueGroup.name
              });
              this.onchangeValue('group', valueGroup);
            }}
          />
        </MyView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {cuaHangDangChon} = state.ChooseStoreReducer;
  return {cuaHangDangChon};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({GetCustomer}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCustomer);
