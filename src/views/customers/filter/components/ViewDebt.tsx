import * as React from 'react';
import {connect} from 'react-redux';
import {MyView, MyText, MyInput} from 'bases/components';
import {FilterCustomerStyle} from '../styles/FilterCustomer.style';
import {COLOR, MY_SIZE, setRadius} from 'bases/styles/Core';
import {RootState} from 'views/app/redux/App.Reducer';
import {bindActionCreators} from 'redux';
import {setMinDebt, setMaxDebt, IFilterCustomerState} from 'views/customers/manager/redux';

interface IProps extends IFilterCustomerState {
  setMinDebt: typeof setMinDebt;
  setMaxDebt: typeof setMaxDebt;
}

class ViewDebt extends React.Component<IProps, any> {
  maxTotalDebt: any;
  render() {
    const {min_total_debt, max_total_debt} = this.props;
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
              value={min_total_debt}
              returnKeyType="done"
              onSubmitEditing={() => {
                this.maxTotalDebt.focus();
              }}
              onChangeText={v => {
                this.props.setMinDebt(v);
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
              value={max_total_debt}
              returnKeyType="done"
              inputRef={input => {
                this.maxTotalDebt = input;
              }}
              onChangeText={v => {
                this.props.setMaxDebt(v);
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
  let {min_total_debt, max_total_debt} = state.CustomerReducer;
  return {min_total_debt, max_total_debt};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setMinDebt, setMaxDebt}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(ViewDebt);
