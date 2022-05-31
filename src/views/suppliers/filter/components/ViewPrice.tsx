import * as React from 'react';
import {connect} from 'react-redux';
import {MyView, MyText, MyInput} from 'bases/components';

import {COLOR} from 'bases/styles/Core';
import {RootState} from 'views/app/redux/App.Reducer';
import {FilterSupplierStyle} from '../styles/FilterSupplier.style';
import {ISuppliersState} from 'views/suppliers/manager/redux';

interface IProps extends ISuppliersState {
  onChangeTextView: (key: string, value: string) => void;
}

class ViewPrice extends React.Component<IProps, any> {
  maxTotalDebt: any;
  maxTotalPrice: any;
  constructor(props: IProps) {
    super(props);

    this.state = {
      min_total_price: this.props.param?.min_total_price || '',
      max_total_price: this.props.param?.max_total_price || ''
    };
  }
  render() {
    const {min_total_price, max_total_price} = this.state;
    return (
      <MyView style={FilterSupplierStyle.myView}>
        <MyView style={[FilterSupplierStyle.myButton, FilterSupplierStyle.borderDebt]}>
          <MyText>Từ:</MyText>
          <MyView style={FilterSupplierStyle.viewDebtInput}>
            <MyInput
              value={min_total_price}
              returnKeyType="next"
              onSubmitEditing={() => {
                this.maxTotalPrice.focus();
              }}
              onChangeText={v => {
                this.props.onChangeTextView('min_total_price', v);
                this.setState({
                  min_total_price: v
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
              value={max_total_price}
              inputRef={input => {
                this.maxTotalPrice = input;
              }}
              onChangeText={v => {
                this.props.onChangeTextView('max_total_price', v);
                this.setState({
                  max_total_price: v
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

export default connect(mapStateToProps, null)(ViewPrice);
