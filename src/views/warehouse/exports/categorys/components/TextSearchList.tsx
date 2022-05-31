import {MyView, MyInput, MyButton, MyIcon} from 'bases/components';
import {COLOR, MY_SIZE} from 'bases/styles/Core';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {
  getExportListBrands,
  setKeywordBrands,
  IExportCateReducerState,
  showRefresh
} from '../redux';
import {brandsStyles} from '../styles/ExportCate.styles';
interface IProps extends Partial<IExportCateReducerState> {
  getExportListBrands: typeof getExportListBrands;
  showRefresh: typeof showRefresh;
  setKeywordBrands: typeof setKeywordBrands;
}
class TextSearchList extends PureComponent<IProps> {
  setKeywordSearch = (text: string) => {
    this.props.setKeywordBrands(text);
  };
  handleToSearch = () => {
    this.props.showRefresh(true);
    this.props.getExportListBrands();
  };
  render() {
    const {keywordBrands} = this.props;
    return (
      <MyView style={[brandsStyles.viewInput, {marginTop: MY_SIZE.s_0}]}>
        <MyInput
          defaultValue={keywordBrands}
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
  const {keywordBrands} = state.ExportCateReducer;
  return {keywordBrands};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getExportListBrands,
      showRefresh,
      setKeywordBrands
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(TextSearchList);
