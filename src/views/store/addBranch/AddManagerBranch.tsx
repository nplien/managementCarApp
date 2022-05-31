/* eslint-disable react/no-did-mount-set-state */
import * as React from 'react';
import {ScrollView, KeyboardAvoidingView, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {MyText, MyLoading, MyInput, MyView, MyButton, MyImage} from 'bases/components';
import {addBranchStyles} from './styles/addABranch.Style';
import MyNavigator from 'utils/MyNavigator';
import Utilities from 'utils/Utilities';
import {GetManagerBranch, showRefresh} from '../managerBranch/redux';
import {ISuppliers} from 'models/Suppliers.Model';
import {IMAGE_SIZE, LOCATION} from 'common/Constants';
import {setRadius, MY_SIZE, COLOR} from 'bases/styles/Core';
import {IChooseStoreState} from 'views/menuLeft/redux';
import ButtonToolbarRouter from 'bases/components/button/ButtonToolbarRouter';
import {ManagerAPI} from 'services/Manager.Api';
import ViewLocationBrands from './components/ViewLocationBrands';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IBrandsModel} from 'models/Brands.Model';
import {IProvince} from 'models/ModelBase';
import {IAppNavigateProps} from 'views/app';
import {API_END_POINT} from 'env';

type IProps = IAppNavigateProps<'AddManagerBranch'> &
  ISuppliers &
  IChooseStoreState & {
    GetManagerBranch: typeof GetManagerBranch;
    showRefresh: typeof showRefresh;
  };

interface IAppState {
  isLoadHoder: boolean;
  nameGroup?: string;
  city?: IProvince;
  district?: IProvince;
  ward?: IProvince;
  address: string;
  pathImage: {
    path: string;
    mine: string;
  };
}
const windowWidth = Dimensions.get('screen').width;
class AddManagerBranch extends React.Component<IProps, IAppState> {
  ClearTime: any;
  refInputNote: any = React.createRef();
  mapBrands: Partial<IBrandsModel>;
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
      ward: undefined,
      address: '',
      pathImage: {path: '', mine: ''}
    };
    this.ClearTime = null;
    this.mapBrands = {};
  }
  componentDidMount() {
    if (this.props.route?.params?.isUpdateBrands) {
      this.props.navigation.setOptions({
        headerTitle: 'Chỉnh sửa chi nhánh',
        headerRight: () => <ButtonToolbarRouter isShowBtnLeft={false} isShowBtnRight={false} />
      });
    } else {
      this.props.navigation.setOptions({
        headerTitle: 'Thêm chi nhánh',
        headerRight: () => (
          <ButtonToolbarRouter
            isShowBtnLeft={false}
            isShowBtnRight
            iconRightFontType="MaterialCommunityIcons"
            iconRightProps={{name: 'content-save', size: 24, color: COLOR.TEXT.BLACK}}
            onPressRight={() => {
              this.FnAddSuppliers();
            }}
          />
        )
      });
    }
    this.checkLocation();
    this.setState({isLoadHoder: true});
    this.ClearTime = setTimeout(() => {
      this.setState({isLoadHoder: false});
      clearTimeout(this.ClearTime);
    }, 500);
  }

  onchangeValue = (type: keyof IBrandsModel, text: any) => {
    this.mapBrands[type] = text;
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

  checkLocation = async () => {
    const itemUpdate = this.props.route?.params?.itemUpdate;
    this.setState({
      city: itemUpdate?.province || {},
      district: itemUpdate?.district || {},
      ward: itemUpdate?.ward || {}
    });
  };
  componentWillUnmount() {
    clearTimeout(this.ClearTime);
  }
  async FnAddSuppliers() {
    const {pathImage} = this.state;
    this.onchangeValue('status', 'active');
    if (!this.mapBrands.name) {
      Utilities.showToast('Chưa nhập tên chi nhánh', '', 'warning');
      return;
    }
    if (!this.mapBrands.phone) {
      Utilities.showToast('Chưa nhập số điện thoại', '', 'warning');
      return;
    } else if (this.mapBrands.phone.length < 10) {
      Utilities.showToast('Số điện thoại không đúng', '', 'warning');
      return;
    }
    if (pathImage.path.length > 0) {
      const formdata = new FormData();
      formdata.append('file', {
        uri: pathImage.path,
        name: 'image.jpg',
        type: pathImage.mine
      });
      const res = await axios({
        url: `${API_END_POINT}/v1/images/upload-single?group=customers`,
        method: 'POST',
        data: formdata,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (res && res.data) {
        this.onchangeValue('logo', res.data.url);
      } else {
        Utilities.logException('postAvatarChiNhanh', res);
      }
    }
    try {
      const response = await ManagerAPI.addBrands(this.mapBrands);
      if (response && response.code === 0) {
        Utilities.showToast(response.message, '', 'success');
        this.props.showRefresh(true);
        this.props.GetManagerBranch();
        MyNavigator.goBack();
      } else {
        Utilities.showToast(response.message, '', 'warning');
      }
    } catch (error) {
      Utilities.showToast('Tải lên nội dung thất bại!', '', 'danger');
    }
  }
  async handleBlockandActive(isActive?: 'block' | 'active') {
    const itemUpdate = this.props.route?.params?.itemUpdate;
    try {
      if (itemUpdate && isActive) {
        this.onchangeValue('status', isActive);
        const response = await ManagerAPI.blockandActiveBrands(
          itemUpdate.id ? itemUpdate?.id.toString() : '',
          isActive
        );
        if (response && response.code === 0) {
          Utilities.showToast(response.message, '', 'success');
          this.props.showRefresh(true);
          this.props.GetManagerBranch();
          MyNavigator.goBack();
          this.props.route?.params?.onSelect({selected: true});
        } else {
          Utilities.showToast(response.message, '', 'warning');
        }
      }
    } catch (error) {
      Utilities.showToast('Tải lên nội dung thất bại!', '', 'danger');
    }
  }
  async handleUpdate() {
    const itemUpdate = this.props.route?.params?.itemUpdate;
    const {pathImage} = this.state;

    if (pathImage.path.length > 0) {
      const formdata = new FormData();
      formdata.append('file', {
        uri: pathImage.path,
        name: 'image.jpg',
        type: pathImage.mine
      });
      const res = await axios({
        url: `${API_END_POINT}/v1/images/upload-single?group=customers`,
        method: 'POST',
        data: formdata,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (res && res.data) {
        this.onchangeValue('logo', res.data.url);
      } else {
        Utilities.logException('postAvatarChiNhanhUpdate', res);
      }
    }
    try {
      if (itemUpdate) {
        const response = await ManagerAPI.updateBrands(
          itemUpdate.id ? itemUpdate?.id.toString() : '',
          this.mapBrands
        );
        if (response && response.code === 0) {
          Utilities.showToast(response.message, '', 'success');
          this.props.showRefresh(true);
          this.props.GetManagerBranch();
          MyNavigator.goBack();
          this.props.route?.params?.onSelect({selected: true});
        } else {
          Utilities.showToast(response.message, '', 'warning');
        }
      }
    } catch (error) {
      Utilities.showToast('Tải lên nội dung thất bại!', '', 'danger');
    }
  }
  openImage() {
    ImagePicker.openPicker({
      cropping: false,
      mediaType: 'photo'
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
  render() {
    const {city, district, ward, isLoadHoder, pathImage} = this.state;
    const itemUpdate = this.props.route?.params?.itemUpdate;
    let viewUpdate = null;
    if (this.props.route?.params?.isUpdateBrands) {
      viewUpdate = (
        <MyView style={addBranchStyles.viewUpdateBrands}>
          {itemUpdate?.status === 'active' ? (
            <MyButton
              onPress={() => this.handleBlockandActive('block')}
              style={addBranchStyles.BtnInactive}>
              <MyText myFontStyle="Bold" style={addBranchStyles.titleBottom}>
                Ngừng hoạt động
              </MyText>
            </MyButton>
          ) : (
            <MyButton
              onPress={() => this.handleBlockandActive('active')}
              style={[addBranchStyles.BtnInactive, {backgroundColor: COLOR.TEXT.POSITIVE_BTN}]}>
              <MyText myFontStyle="Bold" style={addBranchStyles.titleBottom}>
                Hoạt động
              </MyText>
            </MyButton>
          )}
          <MyButton onPress={() => this.handleUpdate()} style={addBranchStyles.BtnActive}>
            <MyText myFontStyle="Bold" style={addBranchStyles.titleBottom}>
              Cập nhật
            </MyText>
          </MyButton>
        </MyView>
      );
    }
    const image = pathImage?.path || itemUpdate?.logo || '';
    return (
      <MyView style={addBranchStyles.container}>
        {isLoadHoder ? (
          <MyView style={{paddingTop: 16}}>
            <MyLoading />
          </MyView>
        ) : (
          <KeyboardAvoidingView
            style={addBranchStyles.container}
            keyboardVerticalOffset={100}
            behavior={Utilities.isAndroid() ? undefined : 'padding'}>
            <SafeAreaView style={addBranchStyles.container} edges={['bottom']}>
              <ScrollView showsHorizontalScrollIndicator showsVerticalScrollIndicator={false}>
                <MyView style={addBranchStyles.containerADD}>
                  <MyButton
                    onPress={() => {
                      this.openImage();
                    }}
                    style={addBranchStyles.btnImageAdd}>
                    <MyImage
                      style={{...setRadius(MY_SIZE.s_50, MY_SIZE.s_50, MY_SIZE.s_50, MY_SIZE.s_50)}}
                      height={windowWidth / 4.5}
                      width={windowWidth / 4.5}
                      source={Utilities.convertLinkImage(image, IMAGE_SIZE.MEDIUM)}
                    />
                  </MyButton>
                  <MyView style={addBranchStyles.container}>
                    <MyInput
                      inputRef={this.refInputTNCC}
                      returnKeyType="next"
                      onSubmitEditing={() => {
                        this.refInputSDT.current.focus();
                      }}
                      style={addBranchStyles.inputNameADD}
                      blurOnSubmit={false}
                      onChangeText={v => {
                        this.onchangeValue('name', v);
                      }}
                      placeholder={'Tên chi nhánh'}
                      defaultValue={itemUpdate?.name || ''}
                    />
                  </MyView>
                </MyView>
                <MyText style={addBranchStyles.textInfoADD}>Thông tin chi nhánh </MyText>
                <MyView style={addBranchStyles.containerChildADD}>
                  <MyText style={addBranchStyles.textPhoneAdd}>Số điện thoại:</MyText>
                  <MyView style={addBranchStyles.viewInputPhoneAdd}>
                    <MyInput
                      inputRef={this.refInputSDT}
                      returnKeyType="next"
                      keyboardType="phone-pad"
                      onSubmitEditing={() => {
                        this.refInputEmail.current.focus();
                      }}
                      onChangeText={v => {
                        this.onchangeValue('phone', v);
                      }}
                      blurOnSubmit={false}
                      defaultValue={itemUpdate?.phone || ''}
                    />
                  </MyView>
                </MyView>
                <MyView style={addBranchStyles.containerChildADD}>
                  <MyText style={addBranchStyles.textPhoneAdd}>Email:</MyText>
                  <MyView style={addBranchStyles.viewInputPhoneAdd}>
                    <MyInput
                      inputRef={this.refInputEmail}
                      returnKeyType="next"
                      onSubmitEditing={() => {
                        this.refInputAddress.current.focus();
                      }}
                      onChangeText={v => {
                        this.onchangeValue('email', v);
                      }}
                      blurOnSubmit={false}
                      defaultValue={itemUpdate?.email || ''}
                    />
                  </MyView>
                </MyView>
                <MyView style={addBranchStyles.containerChildADD}>
                  <MyText style={addBranchStyles.textPhoneAdd}>Địa chỉ:</MyText>
                  <MyView style={addBranchStyles.viewInputPhoneAdd}>
                    <MyInput
                      inputRef={this.refInputAddress}
                      returnKeyType="next"
                      onSubmitEditing={() => {
                        this.refInputCompany.current.focus();
                      }}
                      onChangeText={v => {
                        this.onchangeValue('address', v);
                      }}
                      blurOnSubmit={false}
                      defaultValue={itemUpdate?.address || ''}
                    />
                  </MyView>
                </MyView>
                <ViewLocationBrands
                  onChangeLocation={this.changeLocation}
                  currentCity={city}
                  currentdistrict={district}
                  currentWard={ward}
                />
              </ScrollView>
              {viewUpdate}
            </SafeAreaView>
          </KeyboardAvoidingView>
        )}
      </MyView>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({GetManagerBranch, showRefresh}, dispatch);
};

export default connect(null, mapDispatchToProps)(AddManagerBranch);
