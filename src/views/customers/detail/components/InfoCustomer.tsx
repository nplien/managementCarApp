/* eslint-disable react/no-did-mount-set-state */
import * as React from 'react';
import {CustomerModel} from 'models/Customer.Model';
import {MyView, MyLoading, MyText, MyIcon, MyImage, MyButton, MyButtonIcon} from 'bases/components';
import {CustomersDetailStyle} from '../style/CustomersDetail.Style';
import HeaderDetails from './HeaderDetails';
import Utilities from 'utils/Utilities';
import {ScrollView, Linking} from 'react-native';
import {COLOR, MY_SIZE, setPadding} from 'bases/styles/Core';
import {IMAGE_SIZE} from 'common/Constants';
import {getApiDetailCustomer} from 'services';
import MyNavigator from 'utils/MyNavigator';
interface IProps {
  id: string;
  navigation: any;
}
interface IAppState {
  isPlaceholder: boolean;
  customerDetail: CustomerModel;
}
export default class InfoCustomer extends React.Component<IProps, IAppState> {
  constructor(props: IProps | Readonly<IProps>) {
    super(props);
    this.state = {
      isPlaceholder: true,
      customerDetail: {} as CustomerModel
    };
  }

  async componentDidMount() {
    try {
      const response = await getApiDetailCustomer(this.props.id);
      if (response && !response.code) {
        this.setState({
          customerDetail: response.data ? response.data : ({} as CustomerModel),
          isPlaceholder: false
        });
      } else {
        this.setState({
          isPlaceholder: false
        });
      }
    } catch (error) {
      this.setState({
        isPlaceholder: false
      });
      Utilities.logException('InfoWhosale', error);
    }
    this.props.navigation.setOptions({
      headerRight: () => (
        <MyButtonIcon
          style={{...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)}}
          iconFontType="FontAwesome5"
          iconProps={{name: 'edit', size: 20, color: COLOR.TEXT.BLACK}}
          onPress={() => {
            MyNavigator.push('AddCustomer', {
              type: 'UPDATE',
              InfoCustomerUpdate: this.state.customerDetail
            });
          }}
        />
      )
    });
  }

  render() {
    const {isPlaceholder} = this.state;
    if (isPlaceholder) {
      return (
        <MyView style={CustomersDetailStyle.myLoading}>
          <MyLoading />
        </MyView>
      );
    }
    const {
      id,
      birthday,
      group,
      address,
      note,
      province,
      district,
      ward,
      avatar,
      name,
      phone,
      email,
      // tax_code,
      stores
    } = this.state.customerDetail;
    return (
      <ScrollView>
        <MyView style={CustomersDetailStyle.content1}>
          <MyView style={CustomersDetailStyle.MvAvatar}>
            <MyImage
              style={CustomersDetailStyle.MvAvatarChild}
              height={84}
              width={84}
              source={Utilities.convertLinkImage(avatar, IMAGE_SIZE.EPIC)}
            />
          </MyView>
          <MyView style={CustomersDetailStyle.MvInfoCustomers}>
            <MyText style={CustomersDetailStyle.title} myFontStyle="Bold" numberOfLines={2}>
              {name ? name : ''}
            </MyText>
            <MyView style={CustomersDetailStyle.MvInfo}>
              <MyIcon iconFontType="MaterialIcons" name="phone" size={20} />
              <MyButton
                onPress={() => {
                  Linking.openURL(`tel:${phone}`);
                }}>
                <MyText
                  style={[CustomersDetailStyle.secondTitle, {color: COLOR.TEXT.BLUE}]}
                  numberOfLines={1}>
                  {phone ? phone : ''}
                </MyText>
              </MyButton>
            </MyView>
            <MyView style={CustomersDetailStyle.MvInfo}>
              <MyIcon iconFontType="MaterialCommunityIcons" name="email" size={20} />
              <MyText style={CustomersDetailStyle.secondTitle} numberOfLines={1}>
                {email ? email : ''}
              </MyText>
            </MyView>
            <MyView style={CustomersDetailStyle.MvLinking}>
              <MyButton
                style={CustomersDetailStyle.btnIconPhone}
                onPress={() => {
                  Linking.openURL(`tel:${phone}`);
                }}>
                <MyIcon
                  iconFontType="MaterialCommunityIcons"
                  name="phone"
                  size={22}
                  color={COLOR.BG.WHITE}
                />
              </MyButton>
              <MyButton
                style={[CustomersDetailStyle.btnIconPhone, CustomersDetailStyle.btnIconSMS]}
                onPress={() => {
                  Linking.openURL(`sms:${phone}`);
                }}>
                <MyIcon iconFontType="FontAwesome5" name="sms" size={20} color={COLOR.BG.WHITE} />
              </MyButton>
            </MyView>
          </MyView>
        </MyView>
        <HeaderDetails name={'Mã KH:'} content={id} />
        <HeaderDetails
          name={'Ngày sinh:'}
          content={Utilities.convertTimeByFormat(
            birthday ? birthday * 1000 : new Date(),
            'DD/MM/YYYY'
          )}
        />
        <HeaderDetails name={'Nhóm:'} content={group?.name} />
        <HeaderDetails name={'Địa chỉ:'} content={address} />
        <HeaderDetails name={'Tỉnh, thành:'} content={province?.name} />
        <HeaderDetails name={'Quận, huyện:'} content={district?.name} />
        <HeaderDetails name={'Phường, xã:'} content={ward?.name} />
        <HeaderDetails name={'Chi nhánh:'} content={stores ? stores[0]?.name : ''} />
        {/* <HeaderDetails name={'Mã số thuế:'} content={tax_code} /> */}
        <HeaderDetails name={'Ghi chú:'} content={note} />
      </ScrollView>
    );
  }
}
