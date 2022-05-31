import React, {Component} from 'react';

import {MyButton, MyIcon, MyInput, MyView} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {ICategoryState, setKeywordSearchCate, GetCateGory, showRefreshCate} from '../redux';
import {CategoryStyles} from '../styles/Category.styles';

interface IProps extends ICategoryState {
  setKeywordSearchCate: typeof setKeywordSearchCate;
  GetCateGory: typeof GetCateGory;
  showRefreshCate: typeof showRefreshCate;
}

class TextSearch extends Component<IProps> {
  setKeyword = (text: string) => {
    this.props.setKeywordSearchCate(text);
  };

  onSubmit = () => {
    this.props.showRefreshCate(true);
    this.props.GetCateGory();
  };

  render() {
    const {keyword} = this.props;

    return (
      <MyView style={CategoryStyles.viewTextSearch}>
        <MyInput
          defaultValue={keyword}
          placeholder={'Tên danh mục'}
          placeholderTextColor={COLOR.TEXT.SECONDARY}
          containerStyle={CategoryStyles.textSearch}
          style={CategoryStyles.textHeight}
          onChangeText={this.setKeyword}
          onSubmitEditing={this.onSubmit}
          returnKeyType="search"
        />
        <MyButton style={CategoryStyles.btnSearch} onPress={this.onSubmit}>
          <MyIcon color={COLOR.BG.WHITE} iconFontType="MaterialIcons" name="search" size={24} />
        </MyButton>
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  let {keyword} = state.CategoryReducer;
  return {keyword};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setKeywordSearchCate, GetCateGory, showRefreshCate}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TextSearch);
