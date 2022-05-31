import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {register} from 'react-native-bundle-splitter';
import {COLOR} from 'bases/styles/Core';
import DashBoard from 'views/dashboard/DashBoard';
import {MyIcon} from 'bases/components';

// const BaoCao = register({
//   loader: () => import('views/reports/BaoCao')
// });
// import ProductHangHoa from 'views/products/ProductHangHoa/ProductHangHoa';
const ProductHangHoa = register({
  loader: () => import('views/products/ProductHangHoa/ProductHangHoa')
});
// import MenuContent from 'views/menuLeft/MenuContent';
const MenuContent = register({
  loader: () => import('views/menuLeft/MenuContent')
});
// import Notification from 'views/notification/Notification';
// const Notification = register({
//   loader: () => import('views/notification/Notification')
// });

const BottomStack = createBottomTabNavigator();

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    backgroundColor: COLOR.BG.WHITE,
    // paddingHorizontal: 8,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16
  }
});

export default class RouteBottomBar extends Component {
  render() {
    return (
      <BottomStack.Navigator
        initialRouteName="DashBoard"
        screenOptions={{
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: styles.container,
          headerShown: false
        }}>
        <BottomStack.Screen
          name="DashBoard"
          component={DashBoard}
          options={props => {
            let isFocused = props.navigation.isFocused();
            return {
              tabBarLabel: 'Tổng quan',
              tabBarIcon: () => (
                <MyIcon
                  name="chart-bar-stacked"
                  size={24}
                  color={isFocused ? 'black' : 'silver'}
                  iconFontType="MaterialCommunityIcons"
                />
              )
            };
          }}
        />
        {/* <BottomStack.Screen
          name="BaoCao"
          component={BaoCao}
          options={props => {
            let isFocused = props.navigation.isFocused();
            return {
              tabBarLabel: 'Báo cáo',
              tabBarIcon: () => (
                <MyIcon
                  name="chart-areaspline-variant"
                  size={24}
                  color={isFocused ? 'black' : 'silver'}
                  iconFontType="MaterialCommunityIcons"
                />
              )
            };
          }}
        /> */}
        <BottomStack.Screen
          name="ProductHangHoa"
          component={ProductHangHoa}
          options={props => {
            let isFocused = props.navigation.isFocused();
            return {
              tabBarLabel: 'Hàng hóa',
              tabBarIcon: () => (
                <MyIcon
                  name="social-dropbox"
                  size={24}
                  color={isFocused ? 'black' : 'silver'}
                  iconFontType="SimpleLineIcons"
                />
              )
            };
          }}
        />
        {/* <BottomStack.Screen
          name="Notification"
          component={Notification}
          options={props => {
            let isFocused = props.navigation.isFocused();
            return {
              tabBarLabel: 'Thông báo',
              tabBarIcon: () => (
                <MyIcon
                  name="bell-outline"
                  size={24}
                  color={isFocused ? 'black' : 'silver'}
                  iconFontType="MaterialCommunityIcons"
                />
              )
            };
          }}
        /> */}
        <BottomStack.Screen
          name="Menu"
          component={MenuContent}
          options={props => {
            let isFocused = props.navigation.isFocused();
            return {
              tabBarLabel: 'Menu',
              tabBarIcon: () => (
                <MyIcon
                  name="menu"
                  size={24}
                  color={isFocused ? 'black' : 'silver'}
                  iconFontType="MaterialCommunityIcons"
                />
              )
            };
          }}
        />
      </BottomStack.Navigator>
    );
  }
}
