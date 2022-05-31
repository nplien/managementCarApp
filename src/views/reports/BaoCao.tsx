import {MyButton, MyIcon, MyText, MyView} from 'bases/components';
import {COLOR, MY_SIZE, setMargin, setPadding} from 'bases/styles/Core';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import MyNavigator from 'utils/MyNavigator';
import {ItemLineIndicatorCustom} from 'views/app/components/items';

export default class BaoCao extends Component {
  render() {
    return (
      <MyView style={styles.container}>
        <ItemLineIndicatorCustom />
        <MyButton
          onPress={() => {
            MyNavigator.navigate('BaoCaoCuoiNgay');
          }}
          style={styles.viewSheetScrollView}>
          <MyIcon
            name="chart-line"
            size={24}
            color={COLOR.TEXT.BLUE}
            style={styles.icon}
            iconFontType="FontAwesome5"
          />
          <MyText style={styles.textItemDrawer}>Báo cáo cuối ngày</MyText>
        </MyButton>
        <MyButton
          onPress={() => {
            MyNavigator.navigate('BCHangHoa');
          }}
          style={styles.viewSheetScrollView}>
          <MyIcon
            name="gift-outline"
            size={24}
            color={COLOR.TEXT.BLUE}
            style={styles.icon}
            iconFontType="MaterialCommunityIcons"
          />
          <MyText style={styles.textItemDrawer}>Báo cáo hàng hóa</MyText>
        </MyButton>
        <MyButton
          onPress={() => {
            MyNavigator.navigate('BCBanHang');
          }}
          style={styles.viewSheetScrollView}>
          <MyIcon
            iconFontType="MaterialCommunityIcons"
            name={'cart-outline'}
            size={24}
            color={COLOR.TEXT.BLUE}
            style={styles.icon}
          />
          <MyText style={styles.textItemDrawer}>Báo cáo bán hàng</MyText>
        </MyButton>
      </MyView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  icon: {
    alignSelf: 'center'
  },
  textItemDrawer: {
    flex: 1,
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  viewSheetScrollView: {
    flexDirection: 'row',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0),
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_0),
    borderBottomColor: COLOR.BG.BLACK_30,
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});
