import {MyInput, MyView} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {
  IReturnOrderState,
  setCodeTraHang,
  setNoteTraHang,
  setProductNameTraHang,
  setProductSkuTraHang,
  setCustomerTraHang,
  setReceiverTraHang
} from '../../redux';

import {filterTraHang} from '../styles/filterTraHang.styles';

interface IProps extends IReturnOrderState {
  setCodeTraHang: typeof setCodeTraHang;
  setNoteTraHang: typeof setNoteTraHang;
  setProductNameTraHang: typeof setProductNameTraHang;
  setProductSkuTraHang: typeof setProductSkuTraHang;
  setCustomerTraHang: typeof setCustomerTraHang;
  setReceiverTraHang: typeof setReceiverTraHang;
}

interface IState {}

class TextSearchTrahang extends Component<IProps, IState> {
  render() {
    let {code, note, customer, product_sku, product_name, receiver} = this.props;
    return (
      <MyView style={filterTraHang.statusContainerChild}>
        <MyInput
          defaultValue={code}
          placeholder={'Mã hoá đơn'}
          placeholderTextColor={COLOR.TEXT.SECONDARY}
          style={[filterTraHang.textInput2]}
          onChangeText={text => this.props.setCodeTraHang(text)}
        />
        <MyInput
          defaultValue={note}
          placeholder={'Theo ghi chú'}
          placeholderTextColor={COLOR.TEXT.SECONDARY}
          style={[filterTraHang.textInput2]}
          onChangeText={text => this.props.setNoteTraHang(text)}
        />
        <MyInput
          defaultValue={product_sku}
          placeholder={'Theo mã hàng'}
          placeholderTextColor={COLOR.TEXT.SECONDARY}
          style={[filterTraHang.textInput2]}
          onChangeText={text => this.props.setProductSkuTraHang(text)}
        />
        <MyInput
          defaultValue={product_name}
          placeholder={'Theo tên hàng'}
          placeholderTextColor={COLOR.TEXT.SECONDARY}
          style={[filterTraHang.textInput2]}
          onChangeText={text => this.props.setProductNameTraHang(text)}
        />
        <MyInput
          defaultValue={customer}
          placeholder={'Theo khách hàng'}
          placeholderTextColor={COLOR.TEXT.SECONDARY}
          style={[filterTraHang.textInput2]}
          onChangeText={text => this.props.setCustomerTraHang(text)}
        />
        <MyInput
          defaultValue={receiver}
          placeholder={'Theo khách nhận hàng'}
          placeholderTextColor={COLOR.TEXT.SECONDARY}
          style={[filterTraHang.textInput2]}
          onChangeText={text => this.props.setReceiverTraHang(text)}
        />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  let {code, note, customer, product_sku, product_name, receiver} = state.ReturnOrderReducer;
  return {code, note, customer, product_sku, product_name, receiver};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      setCodeTraHang,
      setNoteTraHang,
      setProductNameTraHang,
      setProductSkuTraHang,
      setCustomerTraHang,
      setReceiverTraHang
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(TextSearchTrahang);
