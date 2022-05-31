import {MyButton, MyIcon, MyText, MyView} from 'bases/components';
import React, {PureComponent} from 'react';
import {Alert} from 'react-native';
import MenuContentStyle from '../styles/MenuContent.style';

interface IStates {
  isExpanse: boolean;
}

export default class ItemBaoCao extends PureComponent<{}, IStates> {
  state = {isExpanse: false};

  expanseItem = () => {
    this.setState({
      isExpanse: !this.state.isExpanse
    });
  };

  render() {
    const {isExpanse} = this.state;

    return (
      <MyView>
        <MyButton style={MenuContentStyle.touchItemDrawer} onPress={this.expanseItem}>
          <MyIcon
            iconFontType="MaterialIcons"
            name={'bar-chart'}
            size={22}
            style={MenuContentStyle.icon}
          />
          <MyText style={MenuContentStyle.textItemDrawer}>Báo cáo</MyText>
          <MyIcon
            iconFontType="MaterialCommunityIcons"
            name={isExpanse ? 'chevron-up' : 'chevron-down'}
            size={22}
            style={MenuContentStyle.icon}
          />
        </MyButton>

        {isExpanse ? (
          <MyView style={MenuContentStyle.viewItemBaoCao}>
            <MyButton
              style={MenuContentStyle.touchItemDrawer}
              onPress={() => {
                Alert.alert('Cuối ngày', 'Xem doanh thu cuối ngày');
              }}>
              <MyIcon
                iconFontType="MaterialIcons"
                name={'today'}
                size={22}
                style={MenuContentStyle.icon}
              />
              <MyText style={MenuContentStyle.textItemDrawer}>Cuối ngày</MyText>
            </MyButton>
            <MyButton
              style={MenuContentStyle.touchItemDrawer}
              onPress={() => {
                Alert.alert('Bán hàng', 'Doanh thu bán hàng');
              }}>
              <MyIcon
                iconFontType="MaterialCommunityIcons"
                name={'file-document'}
                size={22}
                style={MenuContentStyle.icon}
              />
              <MyText style={MenuContentStyle.textItemDrawer}>Bán hàng</MyText>
            </MyButton>
            <MyButton
              style={MenuContentStyle.touchItemDrawer}
              onPress={() => {
                Alert.alert('Hàng hoá', 'Doanh thu top hàng hoá');
              }}>
              <MyIcon
                iconFontType="MaterialIcons"
                name={'all-inbox'}
                size={22}
                style={MenuContentStyle.icon}
              />
              <MyText style={MenuContentStyle.textItemDrawer}>Hàng hoá</MyText>
            </MyButton>
          </MyView>
        ) : null}
      </MyView>
    );
  }
}
