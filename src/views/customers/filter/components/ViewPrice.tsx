import * as React from 'react';
import {connect} from 'react-redux';
import {MyView, MyText, MyInput} from 'bases/components';

import {COLOR, MY_SIZE, setRadius} from 'bases/styles/Core';
import {RootState} from 'views/app/redux/App.Reducer';
import {FilterCustomerStyle} from '../styles/FilterCustomer.style';
import {setMinPrice, setMaxPrice, IFilterCustomerState} from 'views/customers/manager/redux';
import {bindActionCreators} from 'redux';
interface IProps extends IFilterCustomerState {
  setMinPrice: typeof setMinPrice;
  setMaxPrice: typeof setMaxPrice;
}

class ViewPrice extends React.Component<IProps, any> {
  maxTotalDebt: any;
  maxTotalPrice: any;
  render() {
    const {min_total_price, max_total_price} = this.props;
    return (
      <MyView
        style={[
          FilterCustomerStyle.myView,
          {
            backgroundColor: COLOR.BG.WHITE,
            ...setRadius(MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_12)
          }
        ]}>
        <MyView style={[FilterCustomerStyle.myButton, FilterCustomerStyle.borderDebt]}>
          <MyText>Từ:</MyText>
          <MyView style={FilterCustomerStyle.viewDebtInput}>
            <MyInput
              value={min_total_price}
              returnKeyType="done"
              onSubmitEditing={() => {
                this.maxTotalPrice.focus();
              }}
              onChangeText={v => {
                this.props.setMinPrice(v);
              }}
              placeholderTextColor={COLOR.TEXT.BLACK}
              style={FilterCustomerStyle.inputDebt}
              placeholder="Giá trị"
              keyboardType={'number-pad'}
            />
          </MyView>
        </MyView>
        <MyView style={FilterCustomerStyle.myButton}>
          <MyText>Đến:</MyText>
          <MyView style={FilterCustomerStyle.viewDebtInput}>
            <MyInput
              value={max_total_price}
              returnKeyType="done"
              inputRef={input => {
                this.maxTotalPrice = input;
              }}
              onChangeText={v => {
                this.props.setMaxPrice(v);
              }}
              placeholderTextColor={COLOR.TEXT.BLACK}
              style={FilterCustomerStyle.inputDebt}
              placeholder="Giá trị"
              keyboardType={'number-pad'}
            />
          </MyView>
        </MyView>
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  let {min_total_price, max_total_price} = state.CustomerReducer;
  return {min_total_price, max_total_price};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setMinPrice, setMaxPrice}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(ViewPrice);
