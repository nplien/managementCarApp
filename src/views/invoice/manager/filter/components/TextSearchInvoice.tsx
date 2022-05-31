import {MyInput, MyView} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {
  setCodeInvoice,
  setNoteInvoice,
  setProductNameInvoice,
  setProductSkuInvoice,
  setCustomerInvoice,
  setReceiverInvoice,
  IInvoiceOrderState
} from 'views/invoice/manager/redux';

import {styles} from '../styles/filterInvoice.styles';

interface IProps extends IInvoiceOrderState {
  setCodeInvoice: typeof setCodeInvoice;
  setNoteInvoice: typeof setNoteInvoice;
  setProductNameInvoice: typeof setProductNameInvoice;
  setProductSkuInvoice: typeof setProductSkuInvoice;
  setCustomerInvoice: typeof setCustomerInvoice;
  setReceiverInvoice: typeof setReceiverInvoice;
}

interface IState {}

class TextSearchOrder extends Component<IProps, IState> {
  render() {
    let {code, note, customer, product_sku, product_name, receiver} = this.props;
    return (
      <MyView style={styles.statusContainerChild}>
        <MyInput
          defaultValue={code}
          placeholder={'Mã hoá đơn'}
          placeholderTextColor={COLOR.TEXT.SECONDARY}
          style={[styles.textInput2]}
          onChangeText={text => this.props.setCodeInvoice(text)}
        />
        <MyInput
          defaultValue={note}
          placeholder={'Theo ghi chú'}
          placeholderTextColor={COLOR.TEXT.SECONDARY}
          style={[styles.textInput2]}
          onChangeText={text => this.props.setNoteInvoice(text)}
        />
        <MyInput
          defaultValue={product_sku}
          placeholder={'Theo mã hàng'}
          placeholderTextColor={COLOR.TEXT.SECONDARY}
          style={[styles.textInput2]}
          onChangeText={text => this.props.setProductSkuInvoice(text)}
        />
        <MyInput
          defaultValue={product_name}
          placeholder={'Theo tên hàng'}
          placeholderTextColor={COLOR.TEXT.SECONDARY}
          style={[styles.textInput2]}
          onChangeText={text => this.props.setProductNameInvoice(text)}
        />
        <MyInput
          defaultValue={customer}
          placeholder={'Theo khách hàng'}
          placeholderTextColor={COLOR.TEXT.SECONDARY}
          style={[styles.textInput2]}
          onChangeText={text => this.props.setCustomerInvoice(text)}
        />
        <MyInput
          defaultValue={receiver}
          placeholder={'Theo khách nhận hàng'}
          placeholderTextColor={COLOR.TEXT.SECONDARY}
          style={[styles.textInput2]}
          onChangeText={text => this.props.setReceiverInvoice(text)}
        />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  let {code, note, customer, product_sku, product_name, receiver} = state.InvoiceOrderReducer;
  return {code, note, customer, product_sku, product_name, receiver};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      setCodeInvoice,
      setNoteInvoice,
      setProductNameInvoice,
      setProductSkuInvoice,
      setCustomerInvoice,
      setReceiverInvoice
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(TextSearchOrder);
