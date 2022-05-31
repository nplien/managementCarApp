import React, {PureComponent} from 'react';

import {MyInput, MyView} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {setKeywordSearch} from '../redux';
import {IFilterBanHangState} from '../redux/FilterBanHang.Type';
import {FilterBanHangStyle} from '../styles/FilterBanHang.style';

interface IProps extends IFilterBanHangState {
  setKeywordSearch: typeof setKeywordSearch;
}

class TextSearch extends PureComponent<IProps> {
  setKeyword = (text: string) => {
    this.props.setKeywordSearch(text);
  };

  render() {
    const {keyword} = this.props;

    return (
      <MyView style={FilterBanHangStyle.viewTextSearch2}>
        <MyInput
          defaultValue={keyword}
          placeholder={'Tên hàng hóa/mã hàng hóa'}
          placeholderTextColor={COLOR.TEXT.SECONDARY}
          style={FilterBanHangStyle.textSearch2}
          onChangeText={this.setKeyword}
        />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  let {keyword} = state.FilterBanHangReducer;
  return {keyword};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setKeywordSearch}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TextSearch);
