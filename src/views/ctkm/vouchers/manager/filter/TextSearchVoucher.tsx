import {MyInput, MyView} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {IVoucherState, setKeywordCode, setKeywordName} from '../redux';
import {styles} from './style/filterVoucher.styles';

interface IProps extends IVoucherState {
  setKeywordCode: typeof setKeywordCode;
  setKeywordName: typeof setKeywordName;
}

interface IState {
  arrStatus: any;
  arrCurrentStatusTmp: any;
}

class TextSearchVoucher extends Component<IProps, IState> {
  render() {
    let {code, name} = this.props;
    return (
      <MyView style={styles.statusContainerChild}>
        <MyInput
          defaultValue={code}
          placeholder={'Mã hoá đơn/mã phiếu'}
          placeholderTextColor={COLOR.TEXT.SECONDARY}
          style={[styles.textInput2]}
          onChangeText={text => this.props.setKeywordCode(text)}
        />
        <MyInput
          defaultValue={name}
          placeholder={'Theo khách hàng'}
          placeholderTextColor={COLOR.TEXT.SECONDARY}
          style={[styles.textInput2]}
          onChangeText={text => this.props.setKeywordName(text)}
        />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  let {code, name} = state.VoucherReducer;
  return {code, name};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setKeywordCode, setKeywordName}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(TextSearchVoucher);
