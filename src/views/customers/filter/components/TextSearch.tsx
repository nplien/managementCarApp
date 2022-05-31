import {MyInput, MyView} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {RootState} from 'views/app/redux/App.Reducer';

import {FilterCustomerStyle} from '../styles/FilterCustomer.style';
import {setkeyWord, IFilterCustomerState} from 'views/customers/manager/redux';

interface IProps extends IFilterCustomerState {
  setkeyWord: typeof setkeyWord;
}

interface IState {
  arrStatus: any;
  arrCurrentStatusTmp: any;
}

class TextSearch extends Component<IProps, IState> {
  setKeyword = (text: string) => {
    this.props.setkeyWord(text);
  };

  render() {
    let {keyword} = this.props;
    return (
      <MyView style={FilterCustomerStyle.viewTextSearch2}>
        <MyInput
          style={FilterCustomerStyle.inputSearch}
          placeholderTextColor={COLOR.TEXT.SECONDARY}
          placeholder="Tên, mã, số điện thoại"
          defaultValue={keyword}
          onChangeText={v => {
            this.setKeyword(v);
          }}
        />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  let {keyword} = state.CustomerReducer;
  return {keyword};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setkeyWord}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(TextSearch);
