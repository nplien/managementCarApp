import {MyView, MyInput, MyButton, MyIcon} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {getImportCateGory, setKeywordCate, IImportCateReducerState, showRefresh} from '../redux';
import {brandsStyles} from '../styles/ImportCate.styles';
interface IProps extends Partial<IImportCateReducerState> {
  getImportCateGory: typeof getImportCateGory;
  showRefresh: typeof showRefresh;
  setKeywordCate: typeof setKeywordCate;
}
class TextSearchCate extends PureComponent<IProps> {
  setKeywordSearch = (text: string) => {
    this.props.setKeywordCate(text);
  };
  getListFilter = () => {
    this.props.showRefresh(true);
    this.props.getImportCateGory();
  };
  handleToSearch = () => {
    this.getListFilter();
  };
  render() {
    const {keywordBrands} = this.props;
    return (
      <MyView style={[brandsStyles.viewInput]}>
        <MyInput
          defaultValue={keywordBrands}
          placeholder={'Tên nhóm hàng'}
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
  const {keywordBrands} = state.ImportCateReducer;
  return {keywordBrands};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getImportCateGory,
      showRefresh,
      setKeywordCate
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(TextSearchCate);
