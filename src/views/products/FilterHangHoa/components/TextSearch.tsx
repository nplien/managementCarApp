import React, {PureComponent} from 'react';

import {MyInput, MyView} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {setKeywordSearch} from '../redux';
import {IFilterHangHoaState} from '../redux/FilterHangHoa.Type';
import {FilterHangHoaStyle} from '../styles/FilterHangHoa.style';

interface IProps extends IFilterHangHoaState {
  setKeywordSearch: typeof setKeywordSearch;
}

class TextSearch extends PureComponent<IProps> {
  setKeyword = (text: string) => {
    this.props.setKeywordSearch(text);
  };

  render() {
    const {keyword} = this.props;

    return (
      <MyView style={FilterHangHoaStyle.viewTextSearch2}>
        <MyInput
          defaultValue={keyword}
          placeholder={'Tên hàng hóa/mã hàng hóa'}
          placeholderTextColor={COLOR.TEXT.SECONDARY}
          style={FilterHangHoaStyle.textSearch2}
          onChangeText={this.setKeyword}
        />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  let {keyword} = state.FilterHangHoaReducer;
  return {keyword};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setKeywordSearch}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TextSearch);
