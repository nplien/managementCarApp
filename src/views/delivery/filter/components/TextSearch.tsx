import {MyInput, MyView} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {
  IFilterDeliveryState,
  setKeywordCode,
  setKeywordCustomer,
  setKeywordOrderCode,
  setKeywordNote
} from '../redux';
import {styles} from '../styles/FilterDelivery.styles';

interface IProps extends IFilterDeliveryState {
  setKeywordCode: typeof setKeywordCode;
  setKeywordCustomer: typeof setKeywordCustomer;
  setKeywordOrderCode: typeof setKeywordOrderCode;
  setKeywordNote: typeof setKeywordNote;
}

interface IState {
  arrStatus: any;
  arrCurrentStatusTmp: any;
}

class TextSearch extends Component<IProps, IState> {
  setKeywordCode = (text: string) => {
    this.props.setKeywordCode(text);
  };
  setKeywordCustomer = (text: string) => {
    this.props.setKeywordCustomer(text);
  };
  setKeywordOrderCode = (text: string) => {
    this.props.setKeywordOrderCode(text);
  };
  setKeywordNote = (text: string) => {
    this.props.setKeywordNote(text);
  };

  render() {
    let {code, customer, order_code, note} = this.props;
    return (
      <MyView style={styles.statusContainerChild}>
        <MyInput
          defaultValue={code}
          value={code}
          placeholder={'Mã mã vận đơn'}
          placeholderTextColor={COLOR.TEXT.SECONDARY}
          style={[styles.textInput2]}
          onChangeText={this.setKeywordCode}
        />
        <MyInput
          defaultValue={customer}
          value={customer}
          placeholder={'Khách Hàng'}
          placeholderTextColor={COLOR.TEXT.SECONDARY}
          style={[styles.textInput2]}
          onChangeText={this.setKeywordCustomer}
        />
        <MyInput
          defaultValue={order_code}
          value={order_code}
          placeholder={'Mã hoá đơn'}
          placeholderTextColor={COLOR.TEXT.SECONDARY}
          style={[styles.textInput2]}
          onChangeText={this.setKeywordOrderCode}
        />
        <MyInput
          defaultValue={note}
          value={note}
          placeholder={'Ghi chú giao hàng'}
          placeholderTextColor={COLOR.TEXT.SECONDARY}
          style={[styles.textInput2]}
          onChangeText={this.setKeywordNote}
        />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  let {code, customer, order_code, note} = state.FilterDeliveryReducer;
  return {code, customer, order_code, note};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {setKeywordCode, setKeywordCustomer, setKeywordOrderCode, setKeywordNote},
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(TextSearch);
