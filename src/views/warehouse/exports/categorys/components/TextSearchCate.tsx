import {MyView, MyInput, MyButton, MyIcon} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {IExportCateReducerState, showRefresh, setKeywordCate, getExportCateGory} from '../redux';
import {brandsStyles} from '../styles/ExportCate.styles';
interface IProps extends Partial<IExportCateReducerState> {
  getExportCateGory: typeof getExportCateGory;
  showRefresh: typeof showRefresh;
  setKeywordCate: typeof setKeywordCate;
}
class TextSearchCate extends PureComponent<IProps> {
  setKeywordSearch = (text: string) => {
    this.props.setKeywordCate(text);
  };
  handleToSearch = () => {
    this.props.showRefresh(true);
    this.props.getExportCateGory();
  };
  render() {
    const {keyword} = this.props;
    return (
      <MyView style={brandsStyles.viewInput}>
        <MyInput
          defaultValue={keyword}
          placeholder={'Tìm kiếm...'}
          placeholderTextColor={COLOR.TEXT.SECONDARY}
          containerStyle={[brandsStyles.inputSearch]}
          onChangeText={this.setKeywordSearch}
          returnKeyType="search"
          onSubmitEditing={this.handleToSearch}
        />
        <MyButton style={brandsStyles.btnSearch} onPress={this.handleToSearch}>
          <MyIcon color={COLOR.BG.WHITE} iconFontType="MaterialIcons" name="search" size={24} />
        </MyButton>
      </MyView>
    );
  }
}
const mapStateToProps = (state: RootState) => {
  const {keyword} = state.ExportCateReducer;
  return {keyword};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getExportCateGory,
      showRefresh,
      setKeywordCate
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(TextSearchCate);
