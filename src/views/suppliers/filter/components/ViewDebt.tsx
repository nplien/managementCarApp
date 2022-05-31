import * as React from 'react';
import {connect} from 'react-redux';
import {MyView, MyText, MyInput} from 'bases/components';
import {FilterSupplierStyle} from '../styles/FilterSupplier.style';
import {COLOR} from 'bases/styles/Core';
import {RootState} from 'views/app/redux/App.Reducer';
import {ISuppliersState} from 'views/suppliers/manager/redux';

interface IProps extends ISuppliersState {
  onChangeTextView: (key: string, value: string) => void;
}

class ViewDebt extends React.Component<IProps, any> {
  maxTotalDebt: any;
  constructor(props: IProps) {
    super(props);

    this.state = {
      min_total_debt: this.props.param?.min_total_debt || '',
      max_total_debt: this.props.param?.max_total_debt || ''
    };
  }
  render() {
    const {min_total_debt, max_total_debt} = this.state;
    return (
      <MyView style={FilterSupplierStyle.myView}>
        <MyView style={[FilterSupplierStyle.myButton, FilterSupplierStyle.borderDebt]}>
          <MyText>Từ:</MyText>
          <MyView style={FilterSupplierStyle.viewDebtInput}>
            <MyInput
              value={min_total_debt}
              returnKeyType="next"
              onSubmitEditing={() => {
                this.maxTotalDebt.focus();
              }}
              onChangeText={v => {
                this.props.onChangeTextView('min_total_debt', v);
                this.setState({
                  min_total_debt: v
                });
              }}
              placeholderTextColor={COLOR.TEXT.BLACK}
              style={FilterSupplierStyle.inputDebt}
              placeholder="Giá trị"
              keyboardType={'number-pad'}
            />
          </MyView>
        </MyView>
        <MyView style={FilterSupplierStyle.myButton}>
          <MyText>Đến:</MyText>
          <MyView style={FilterSupplierStyle.viewDebtInput}>
            <MyInput
              value={max_total_debt}
              inputRef={input => {
                this.maxTotalDebt = input;
              }}
              onChangeText={v => {
                this.props.onChangeTextView('max_total_debt', v);
                this.setState({
                  max_total_debt: v
                });
              }}
              placeholderTextColor={COLOR.TEXT.BLACK}
              style={FilterSupplierStyle.inputDebt}
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
  let {param} = state.SuppliersReducer;
  return {param};
};

export default connect(mapStateToProps, null)(ViewDebt);
