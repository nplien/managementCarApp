import {FontType, MyButton, MyIcon, MyText, MyView} from 'bases/components';
import React, {PureComponent} from 'react';
import {Alert} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MyNavigator from 'utils/MyNavigator';
// import MyStaticLocal from 'utils/MyStaticLocal';
import {initUser, IPersonalState} from 'views/personals/redux';
import MenuContentStyle from '../styles/MenuContent.style';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {RouterParamsList} from 'views/router/type';
import {COLOR} from 'bases/styles/Core';
import Utilities from 'utils/Utilities';
// import {checkUpdateCodepush} from 'utils/MyCodePush';
// import Utilities from 'utils/Utilities';

interface IProps extends Partial<IPersonalState> {
  initUser: typeof initUser;
}

type IMenuItem = {
  screen: keyof RouterParamsList | string;
  name: string;
  icon: string;
  font: FontType;
  empty?: boolean;
};

class MenuComponent extends PureComponent<IProps> {
  arrMenuItems: IMenuItem[] = [
    {
      screen: 'ProductBanHang',
      name: 'Tạo hoá đơn',
      font: 'MaterialCommunityIcons',
      icon: 'cart-outline'
    },
    {
      screen: 'Invoice',
      name: 'Lịch sử hoá đơn',
      font: 'MaterialCommunityIcons',
      icon: 'clipboard-list-outline'
    },
    // {
    //   screen: 'Order',
    //   name: 'Đặt hàng',
    //   font: 'MaterialIcons',
    //   icon: 'inbox'
    // },
    // {
    //   screen: 'ReturnOrder',
    //   name: 'Trả hàng',
    //   font: 'MaterialCommunityIcons',
    //   icon: 'cart-arrow-up'
    // },
    {
      screen: 'Customer',
      name: 'Khách hàng',
      font: 'MaterialCommunityIcons',
      icon: 'account-group'
    },
    // {
    //   screen: 'Suppliers',
    //   name: 'Nhà cung cấp',
    //   font: 'MaterialCommunityIcons',
    //   icon: 'home-group'
    // },
    // {
    //   screen: 'DeliveryOrder',
    //   name: 'Vận đơn',
    //   font: 'MaterialIcons',
    //   icon: 'label-important'
    // },
    // {
    //   screen: 'Inventory',
    //   name: 'Kiểm kho',
    //   font: 'MaterialCommunityIcons',
    //   icon: 'warehouse'
    // },
    // {
    //   screen: 'ExportOrder',
    //   name: 'Chuyển hàng',
    //   font: 'MaterialIcons',
    //   icon: 'local-shipping'
    // },
    {
      screen: 'ImportOrder',
      name: 'Nhập hàng',
      font: 'MaterialCommunityIcons',
      icon: 'home-import-outline'
    },
    {
      screen: 'ManagerBranch',
      name: 'Chi nhánh',
      font: 'MaterialCommunityIcons',
      icon: 'storefront'
    },
    // {
    //   screen: 'VoucherList',
    //   name: 'Voucher',
    //   font: 'MaterialCommunityIcons',
    //   icon: 'gift-outline'
    // },
    {
      screen: 'QLNhanVien',
      name: 'Nhân viên',
      font: 'MaterialIcons',
      icon: 'person-search'
    }
    // {
    //   screen: 'PaymentHome',
    //   name: 'Sổ Quỹ',
    //   font: 'MaterialIcons',
    //   icon: 'attach-money'
    // }
  ];

  formatDataOfListForColumn = (data: IMenuItem[], numColumns: number) => {
    try {
      if (data.length % 2 === 0) return data;
      const numberOfFullRows = Math.floor(data.length / numColumns);
      let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
      while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
        data.push({
          screen: `blank-${numberOfElementsLastRow}`,
          empty: true,
          font: 'AntDesign',
          icon: '',
          name: ''
        });
        numberOfElementsLastRow += 1;
      }
      return data;
    } catch (error) {
      return data;
    }
  };

  onNextScreen = (menu: IMenuItem) => {
    switch (menu.screen) {
      case 'Customer':
        MyNavigator.navigate('Customer', {type: 'KHACH_HANG'});
        break;

      default:
        MyNavigator.navigate(menu.screen as keyof RouterParamsList);
        break;
    }
  };

  checkUpdateApp = () => {
    Utilities.showHideRootLoading(true, 'Đang kiểm tra...');
  };

  handleToLogout = () => {
    Alert.alert(
      'Đăng xuất',
      'Bạn có chắc chắn muốn đăng xuất không ?',
      [
        {
          text: 'Huỷ',
          style: 'cancel'
        },
        {text: 'OK', onPress: this.resetData}
      ],
      {cancelable: false}
    );
  };

  resetData = () => {
    MyNavigator.reset('Login');
  };

  render() {
    let arr = this.formatDataOfListForColumn(this.arrMenuItems, 2);
    return (
      <MyView transparent>
        <MyView style={MenuContentStyle.containerMenuItem} transparent>
          {arr.map(x => {
            if (x.empty)
              return <MyView key={x.screen} style={MenuContentStyle.contentMenuItem} transparent />;
            return (
              <MyButton
                key={x.screen}
                style={MenuContentStyle.contentMenuItem}
                onPress={() => {
                  this.onNextScreen(x);
                }}>
                <MyIcon
                  iconFontType={x.font}
                  name={x.icon}
                  size={22}
                  color={'gray'}
                  style={MenuContentStyle.icon}
                />
                <MyText style={MenuContentStyle.titleMenu} myFontStyle="Medium">
                  {x.name}
                </MyText>
              </MyButton>
            );
          })}
        </MyView>

        <MyButton
          style={MenuContentStyle.buttomLogout}
          onPress={() => {
            this.checkUpdateApp();
          }}
          transparent>
          <MyIcon
            iconFontType="MaterialIcons"
            name={'cloud-download'}
            size={22}
            color="black"
            style={MenuContentStyle.icon}
          />
          <MyView style={MenuContentStyle.viewCapNhap} transparent>
            <MyText>Cập nhật ứng dụng</MyText>
          </MyView>
        </MyButton>
        <MyButton
          style={MenuContentStyle.buttomLogout}
          onPress={() => {
            this.handleToLogout();
          }}
          transparent>
          <MyIcon
            iconFontType="MaterialIcons"
            name={'logout'}
            size={22}
            color="red"
            style={MenuContentStyle.icon}
          />
          <MyText style={[MenuContentStyle.marginText, {color: COLOR.TEXT.RED}]}>Đăng xuất</MyText>
        </MyButton>
      </MyView>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      initUser
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(MenuComponent);
