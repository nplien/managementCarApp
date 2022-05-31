import * as React from 'react';
import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {bindActionCreators} from 'redux';

import {MyView, MyButton, MyIcon, MyText} from 'bases/components';
import {FilterCustomerStyle} from '../styles/FilterCustomer.style';
import {COLOR, MY_SIZE, setRadius} from 'bases/styles/Core';
import {ItemLineIndicator} from 'views/app/components/items';
import {setStatus, IFilterCustomerState} from 'views/customers/manager/redux';

interface IProps extends IFilterCustomerState {
  setStatus: typeof setStatus;
}
class ViewGender extends React.Component<IProps, any> {
  render() {
    const {status} = this.props;
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
            this.props.setStatus(null);
          }}>
          {/* <MyIcon
            iconFontType="MaterialIcons"
            name={!status ? 'radio-button-checked' : 'radio-button-unchecked'}
            size={20}
          /> */}
          <MyText
            myFontStyle="Regular"
            style={[
              FilterCustomerStyle.myText,
              {
                color: !status ? COLOR.TEXT.BLACK : COLOR.TEXT.SECONDARY
              }
            ]}>
            {' '}
            Tất cả
          </MyText>
          {!status ? (
            <MyIcon iconFontType="AntDesign" name={'check'} size={20} color={COLOR.TEXT.BLUE} />
          ) : (
            <MyIcon iconFontType="AntDesign" name={'check'} size={20} color={COLOR.TEXT.WHITE} />
          )}
        </MyButton>
        <ItemLineIndicator />
        <MyButton
          style={[FilterCustomerStyle.myButton, FilterCustomerStyle.borderBottom]}
          onPress={() => {
            this.props.setStatus('active');
          }}>
          {/* <MyIcon
            iconFontType="MaterialIcons"
            name={status === 'active' ? 'radio-button-checked' : 'radio-button-unchecked'}
            size={20}
          /> */}
          <MyText
            myFontStyle="Regular"
            style={[
              FilterCustomerStyle.myText,
              {color: status === 'active' ? COLOR.TEXT.BLACK : COLOR.TEXT.SECONDARY}
            ]}>
            {' '}
            Đang hoạt động
          </MyText>
          {status === 'active' ? (
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
            this.props.setStatus('inactive');
          }}>
          {/* <MyIcon
            iconFontType="MaterialIcons"
            name={status === 'inactive' ? 'radio-button-checked' : 'radio-button-unchecked'}
            size={20}
          /> */}
          <MyText
            myFontStyle="Regular"
            style={[
              FilterCustomerStyle.myText,
              {color: status === 'inactive' ? COLOR.TEXT.BLACK : COLOR.TEXT.SECONDARY}
            ]}>
            {' '}
            Ngừng hoạt động
          </MyText>
          {status === 'inactive' ? (
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
  let {status} = state.CustomerReducer;
  return {status};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setStatus}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(ViewGender);
