import {MyView, MyText, MyButton, MyIcon} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import React, {PureComponent} from 'react';
import MyNavigator from 'utils/MyNavigator';
import {styles} from '../styles/filterOrder.styles';
interface IProps {
  title: string;
  typeOfList: string;
  isSelected?: boolean;
  value?: string;
  onPress?: () => void;
}
export default class StatusOrderItem extends PureComponent<IProps> {
  render() {
    const {title, typeOfList, isSelected, value, onPress} = this.props;
    return (
      <MyView>
        <MyText style={styles.titleContainer}>{title}</MyText>
        <MyButton
          onPress={() => MyNavigator.push('FilterList', {kind: typeOfList})}
          style={styles.statusContainer}>
          <MyView style={styles.mycontentViewDM}>
            <MyButton
              onPress={onPress}
              style={[
                styles.btnLH,
                {backgroundColor: isSelected ? COLOR.TEXT.BLUE : COLOR.BG.WHITE}
              ]}>
              <MyText
                myFontStyle="Regular"
                style={[
                  styles.titleStatus,
                  {color: isSelected ? COLOR.TEXT.WHITE : COLOR.TEXT.BLACK}
                ]}>
                {value}
              </MyText>
            </MyButton>
          </MyView>
          <MyIcon
            name={'right'}
            size={22}
            color={COLOR.BG.BLACK}
            iconFontType="AntDesign"
            style={styles.myIconDM}
          />
        </MyButton>
      </MyView>
    );
  }
}
