import * as React from 'react';
import {connect} from 'react-redux';
import {MyView, MyText, MyInput} from 'bases/components';
import {FilterCustomerStyle} from '../styles/FilterCustomer.style';
import {COLOR, MY_SIZE, setRadius} from 'bases/styles/Core';
import {RootState} from 'views/app/redux/App.Reducer';
import {bindActionCreators} from 'redux';
import {setMinPoint, setMaxPoint, IFilterCustomerState} from 'views/customers/manager/redux';

interface IProps extends IFilterCustomerState {
  setMinPoint: typeof setMinPoint;
  setMaxPoint: typeof setMaxPoint;
}

class ViewPoint extends React.Component<IProps, any> {
  maxTotalPoint: any;
  render() {
    const {min_total_point, max_total_point} = this.props;
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
              value={min_total_point}
              returnKeyType="done"
              onSubmitEditing={() => {
                this.maxTotalPoint.focus();
              }}
              onChangeText={v => {
                this.props.setMinPoint(v);
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
              value={max_total_point}
              returnKeyType="done"
              inputRef={input => {
                this.maxTotalPoint = input;
              }}
              onChangeText={v => {
                this.props.setMaxPoint(v);
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
  let {min_total_point, max_total_point} = state.CustomerReducer;
  return {min_total_point, max_total_point};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setMinPoint, setMaxPoint}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(ViewPoint);
