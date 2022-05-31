/* eslint-disable react/no-did-mount-set-state */
import * as React from 'react';
import {ScrollView, Linking} from 'react-native';
import HeaderDetails from './HeaderDetails';
import {SuppliersDetailStyle} from '../style/SuppliersDetail.Style';
import {MyLoading, MyView, MyButton, MyText, MyIcon, MyImage, MyButtonIcon} from 'bases/components';
import {COLOR, MY_SIZE, setPadding} from 'bases/styles/Core';
import Utilities from 'utils/Utilities';
import {CustomerModel} from 'models/Customer.Model';
import {IMAGE_SIZE} from 'common/Constants';
import {putApiCustomer, getApiDetailCustomer} from 'services';
import MyNavigator from 'utils/MyNavigator';

interface IProps {
  id: string;
  navigation: any;
}

interface IAppState {
  supplierDetail: CustomerModel;
  isLoadHoder: boolean;
  status: string;
}
export default class InfoSupplier extends React.Component<IProps, IAppState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      supplierDetail: {} as CustomerModel,
      isLoadHoder: true,
      status: 'active'
    };
  }

  async componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <MyButtonIcon
          style={{...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)}}
          iconFontType="FontAwesome5"
          iconProps={{name: 'edit', size: 20, color: COLOR.TEXT.BLACK}}
          onPress={() => {
            MyNavigator.push('AddSuppliers', {
              type: 'UPDATE',
              InfoSupplierUpdate: this.state.supplierDetail
            });
          }}
        />
      )
    });
    try {
      const response = await getApiDetailCustomer(this.props.id);
      if (response && !response.code) {
        this.setState({
          supplierDetail: response.data ? response.data : ({} as CustomerModel),
          isLoadHoder: false
        });
      } else {
        Utilities.showToast(response?.message);
        this.setState({
          isLoadHoder: false
        });
      }
    } catch (error) {
      this.setState({
        isLoadHoder: false
      });
      Utilities.logException('InfoWhosale', error);
    }
  }

  async fnPutStatus(status: string) {
    try {
      const idCustomer = this.props.id;
      const response = await putApiCustomer(idCustomer, {status: status});
      if (response && response.code === 0) {
        Utilities.showToast(response.message);
        this.setState({
          status: status
        });
      } else {
        Utilities.showToast(response.message);
      }
    } catch (error) {
      Utilities.logException('SuppliersStatus', error);
    }
  }
  render() {
    const {
      id,
      address,
      name,
      phone,
      email,
      province,
      district,
      ward,
      note,
      tax_code,
      avatar,
      company,
      group,
      stores
    } = this.state.supplierDetail;
    const {isLoadHoder} = this.state;
    if (isLoadHoder) {
      return (
        <MyView style={SuppliersDetailStyle.myLoading}>
          <MyLoading />
        </MyView>
      );
    }
    return (
      <ScrollView style={SuppliersDetailStyle.container}>
        <MyView style={SuppliersDetailStyle.content1}>
          <MyView style={SuppliersDetailStyle.MvAvatar}>
            <MyImage
              style={SuppliersDetailStyle.MvAvatarChild}
              height={84}
              width={84}
              source={Utilities.convertLinkImage(avatar, IMAGE_SIZE.EPIC)}
            />
          </MyView>
          <MyView style={SuppliersDetailStyle.MvInfoCustomers}>
            <MyText style={SuppliersDetailStyle.title} myFontStyle="Bold" numberOfLines={2}>
              {name ? name : ''}
            </MyText>
            <MyView style={SuppliersDetailStyle.MvInfo}>
              <MyIcon iconFontType="FontAwesome" name="user" size={16} />
              <MyText style={SuppliersDetailStyle.secondTitle} numberOfLines={1}>
                {id}
              </MyText>
            </MyView>
            <MyView style={SuppliersDetailStyle.MvInfo}>
              <MyIcon iconFontType="FontAwesome" name="phone" size={16} />
              <MyButton
                onPress={() => {
                  Linking.openURL(`tel:${phone}`);
                }}>
                <MyText
                  style={[
                    SuppliersDetailStyle.secondTitle,
                    {
                      color: COLOR.TEXT.BLUE,
                      ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_6, MY_SIZE.s_0)
                    }
                  ]}
                  numberOfLines={1}>
                  {phone ? phone : ''}
                </MyText>
              </MyButton>
            </MyView>
          </MyView>
        </MyView>
        <HeaderDetails name={'Email'} content={email} />
        <HeaderDetails name={'Dịa chỉ'} content={address} />
        <HeaderDetails name={'Tỉnh thành'} content={province?.name} />
        <HeaderDetails name={'Quận huyện'} content={district?.name} />
        <HeaderDetails name={'Phường xã'} content={ward?.name} />
        <HeaderDetails name={'Chi nhánh'} content={stores ? stores[0]?.name : ''} />
        <HeaderDetails name={'Nhóm'} content={group?.name} />
        <HeaderDetails name={'Công ty'} content={company} />
        <HeaderDetails name={'Mã số thuế'} content={tax_code} />
        <HeaderDetails name={'Ghi chú:'} content={note} />
        {/* <MyView style={SuppliersDetailStyle.myView}>
          <MyButton
            style={[SuppliersDetailStyle.myView, {backgroundColor: COLOR.BUTTON.RED}]}
            onPress={() => {
              if (status === 'active') {
                this.fnPutStatus('inactive');
              } else {
                this.fnPutStatus('active');
              }
            }}>
            {status === 'active' ? (
              <MyIcon
                iconFontType="FontAwesome5"
                name="lock"
                size={18}
                style={SuppliersDetailStyle.myText}
              />
            ) : (
              <MyIcon
                iconFontType="FontAwesome5"
                name="lock-open"
                size={18}
                style={SuppliersDetailStyle.myIcon}
              />
            )}
            <MyText style={SuppliersDetailStyle.myText}>
              {'   '}
              {status === 'active' ? 'Ngừng hoạt động' : 'Hoạt động'}
            </MyText>
          </MyButton>
          <MyButton
            style={[SuppliersDetailStyle.myView, {backgroundColor: COLOR.TEXT.GREEN}]}
            onPress={() => {
              //   MyNavigator.push('AddSuppliers', {isAddOrUpdate: false, idSupplier: id});
            }}>
            <MyText style={SuppliersDetailStyle.myText}> Cập nhật </MyText>
          </MyButton>
        </MyView> */}
      </ScrollView>
    );
  }
}
