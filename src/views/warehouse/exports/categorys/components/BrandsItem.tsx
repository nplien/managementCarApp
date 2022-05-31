import {MyView, MyText, MyButton, MyIcon} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import React, {PureComponent} from 'react';
import MyNavigator from 'utils/MyNavigator';
import {cateAndBrandsStyle} from '../styles/ExportCate.styles';
interface IProps {
  title: string;
  typeOfList: string;
  isSelected?: boolean;
  value?: string;
  onPress?: () => void;
}
export default class BrandsItem extends PureComponent<IProps> {
  render() {
    const {title, typeOfList, isSelected, value, onPress} = this.props;
    return (
      <MyView>
        <MyText style={cateAndBrandsStyle.titleContainer}>{title}</MyText>
        <MyButton
          onPress={() => MyNavigator.push('ExportBrands', {kind: typeOfList})}
          style={cateAndBrandsStyle.myviewDM}>
          <MyView style={cateAndBrandsStyle.mycontentViewDM}>
            <MyButton
              onPress={onPress}
              style={[
                cateAndBrandsStyle.btnLH,
                {backgroundColor: isSelected ? COLOR.TEXT.BLUE : COLOR.BG.WHITE}
              ]}>
              <MyText
                myFontStyle="Regular"
                style={[
                  cateAndBrandsStyle.myText,
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
            style={cateAndBrandsStyle.myIconDM}
          />
        </MyButton>
      </MyView>
    );
  }
}
