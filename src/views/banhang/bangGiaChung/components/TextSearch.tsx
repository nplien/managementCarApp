import React, {PureComponent} from 'react';

import {MyButton, MyIcon, MyInput, MyView} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {IBangGiaState, setKeywordBangGia, getBangGia, showRefreshBangGia} from '../redux';
import {BangGiaChungStyles} from '../styles/BangGiaChung.Style';

interface IProps extends IBangGiaState {
  setKeywordBangGia: typeof setKeywordBangGia;
  getBangGia: typeof getBangGia;
  showRefreshBangGia: typeof showRefreshBangGia;
}

class TextSearch extends PureComponent<IProps> {
  setKeyword = (text: string) => {
    this.props.setKeywordBangGia(text);
  };

  onSubmit = () => {
    this.props.showRefreshBangGia(true);
    this.props.getBangGia();
  };

  render() {
    const {keyword} = this.props;

    return (
      <MyView style={BangGiaChungStyles.viewTextSearch}>
        <MyInput
          defaultValue={keyword}
          placeholder={'Tên bảng giá'}
          placeholderTextColor={COLOR.TEXT.SECONDARY}
          containerStyle={BangGiaChungStyles.textSearch}
          onChangeText={this.setKeyword}
          onSubmitEditing={this.onSubmit}
          returnKeyType="search"
        />
        <MyButton style={BangGiaChungStyles.btnSearch} onPress={this.onSubmit}>
          <MyIcon color={COLOR.BG.WHITE} iconFontType="MaterialIcons" name="search" size={24} />
        </MyButton>
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  let {keyword} = state.BangGiaReducer;
  return {keyword};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setKeywordBangGia, getBangGia, showRefreshBangGia}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TextSearch);
