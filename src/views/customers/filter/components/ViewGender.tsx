import * as React from 'react';
import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {bindActionCreators} from 'redux';
import {MyView, MyButton, MyText, MyIcon} from 'bases/components';
import {FilterCustomerStyle} from '../styles/FilterCustomer.style';
import {COLOR, MY_SIZE, setRadius} from 'bases/styles/Core';
import {ItemLineIndicator} from 'views/app/components/items';
import {setGenders, IFilterCustomerState} from 'views/customers/manager/redux';
interface IProps extends IFilterCustomerState {
  setGenders: typeof setGenders;
}
class ViewGender extends React.Component<IProps, any> {
  render() {
    const {genders} = this.props;
    return (
      <MyView
        style={{
          backgroundColor: COLOR.BG.WHITE,
          ...setRadius(MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_12)
        }}>
        <MyButton
          transparent
          style={[FilterCustomerStyle.myButton, FilterCustomerStyle.borderBottom]}
          onPress={() => {
            this.props.setGenders(null);
          }}>
          <MyText
            myFontStyle="Regular"
            style={[
              FilterCustomerStyle.myText,
              {color: !genders ? COLOR.TEXT.BLACK : COLOR.TEXT.SECONDARY}
            ]}>
            Tất cả
          </MyText>
          {!genders ? (
            <MyIcon iconFontType="AntDesign" name={'check'} size={20} color={COLOR.TEXT.BLUE} />
          ) : (
            <MyIcon iconFontType="AntDesign" name={'check'} size={20} color={COLOR.TEXT.WHITE} />
          )}
        </MyButton>
        <ItemLineIndicator />
        <MyButton
          style={[FilterCustomerStyle.myButton, FilterCustomerStyle.borderBottom]}
          onPress={() => {
            this.props.setGenders('male');
          }}>
          <MyText
            myFontStyle="Regular"
            style={[
              FilterCustomerStyle.myText,
              {color: genders === 'male' ? COLOR.TEXT.BLACK : COLOR.TEXT.SECONDARY}
            ]}>
            Nam
          </MyText>
          {genders === 'male' ? (
            <MyIcon iconFontType="AntDesign" name={'check'} size={20} color={COLOR.TEXT.BLUE} />
          ) : (
            <MyIcon iconFontType="AntDesign" name={'check'} size={20} color={COLOR.TEXT.WHITE} />
          )}
        </MyButton>
        <ItemLineIndicator />
        <MyButton
          transparent
          style={[FilterCustomerStyle.myButton, FilterCustomerStyle.borderBottom]}
          onPress={() => {
            this.props.setGenders('female');
          }}>
          <MyText
            myFontStyle="Regular"
            style={[
              FilterCustomerStyle.myText,
              {color: genders === 'female' ? COLOR.TEXT.BLACK : COLOR.TEXT.SECONDARY}
            ]}>
            Nữ
          </MyText>
          {genders === 'female' ? (
            <MyIcon iconFontType="AntDesign" name={'check'} size={20} color={COLOR.TEXT.BLUE} />
          ) : (
            <MyIcon iconFontType="AntDesign" name={'check'} size={20} color={COLOR.TEXT.WHITE} />
          )}
        </MyButton>
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  let {genders} = state.CustomerReducer;
  return {genders};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setGenders}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(ViewGender);
