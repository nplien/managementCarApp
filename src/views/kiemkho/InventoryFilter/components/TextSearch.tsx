import React, {PureComponent} from 'react';

import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {bindActionCreators} from 'redux';
import {MyInput, MyView} from 'bases/components';
import {COLOR} from 'bases/styles/Core';

import {FilterInventoryStyle} from '../styles/InventoryMH.Style';
import {IIventoryState, setSearchFilterKK} from 'views/kiemkho/Inventory/redux';

interface IProps extends IIventoryState {
  setSearchFilterKK: typeof setSearchFilterKK;
}

class TextSearch extends PureComponent<IProps> {
  setKeyword = (text: string) => {
    this.props.setSearchFilterKK(text);
  };

  render() {
    const {keyword} = this.props;

    return (
      <MyView style={FilterInventoryStyle.viewTextSearch}>
        <MyInput
          defaultValue={keyword}
          placeholder={'Mã phiếu kiểm'}
          placeholderTextColor={COLOR.TEXT.SECONDARY}
          style={FilterInventoryStyle.textSearch}
          onChangeText={this.setKeyword}
        />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  let {keyword} = state.InventoryReducer;
  return {keyword};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setSearchFilterKK}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TextSearch);
