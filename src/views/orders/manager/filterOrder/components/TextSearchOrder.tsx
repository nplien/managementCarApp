import {MyInput, MyView} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {
  setKeywordCodeDH,
  setKeywordNoteDH,
  setKeywordCustomerDH,
  setKeywordReceiverDG,
  setKeywordpPoductSkuDH,
  setKeywordProductNameDH,
  IOrderState
} from '../../redux';

import {styles} from '../styles/filterOrder.styles';

interface IProps extends IOrderState {
  setKeywordCodeDH: typeof setKeywordCodeDH;
  setKeywordNoteDH: typeof setKeywordNoteDH;
  setKeywordCustomerDH: typeof setKeywordCustomerDH;
  setKeywordReceiverDG: typeof setKeywordReceiverDG;
  setKeywordpPoductSkuDH: typeof setKeywordpPoductSkuDH;
  setKeywordProductNameDH: typeof setKeywordProductNameDH;
}

interface IState {}

class TextSearchOrder extends Component<IProps, IState> {
  render() {
    let {code, note, customer, receiver, product_sku, product_name} = this.props;
    return (
      <MyView style={[styles.statusContainerChild]}>
        <MyInput
          defaultValue={code}
          placeholder={'Theo mã hoá đơn'}
          placeholderTextColor={COLOR.TEXT.SECONDARY}
          style={[styles.textInput2]}
          onChangeText={text => this.props.setKeywordCodeDH(text)}
        />
        <MyInput
          defaultValue={note}
          placeholder={'Theo ghi chú'}
          placeholderTextColor={COLOR.TEXT.SECONDARY}
          style={[styles.textInput2]}
          onChangeText={text => this.props.setKeywordNoteDH(text)}
        />
        <MyInput
          defaultValue={product_sku}
          placeholder={'Theo mã hàng'}
          placeholderTextColor={COLOR.TEXT.SECONDARY}
          style={[styles.textInput2]}
          onChangeText={text => this.props.setKeywordpPoductSkuDH(text)}
        />
        <MyInput
          defaultValue={product_name}
          placeholder={'Theo tên hàng'}
          placeholderTextColor={COLOR.TEXT.SECONDARY}
          style={[styles.textInput2]}
          onChangeText={text => this.props.setKeywordProductNameDH(text)}
        />
        <MyInput
          defaultValue={customer}
          placeholder={'Theo khách hàng'}
          placeholderTextColor={COLOR.TEXT.SECONDARY}
          style={[styles.textInput2]}
          onChangeText={text => this.props.setKeywordCustomerDH(text)}
        />
        <MyInput
          defaultValue={receiver}
          placeholder={'Theo khách nhận hàng'}
          placeholderTextColor={COLOR.TEXT.SECONDARY}
          style={[styles.textInput2]}
          onChangeText={text => this.props.setKeywordReceiverDG(text)}
        />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  let {code, note, customer, receiver, product_sku, product_name} = state.OrderReducer;
  return {code, note, customer, receiver, product_sku, product_name};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      setKeywordCodeDH,
      setKeywordNoteDH,
      setKeywordCustomerDH,
      setKeywordReceiverDG,
      setKeywordpPoductSkuDH,
      setKeywordProductNameDH
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(TextSearchOrder);
