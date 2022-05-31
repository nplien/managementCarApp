import {MyButton, MyButtonText, MyLoading, MyText, MyView} from 'bases/components';
import React, {PureComponent} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MyNavigator from 'utils/MyNavigator';
import {RootState} from 'views/app/redux/App.Reducer';
import {
  getExportListBrands,
  IExportCateReducerState,
  setKeywordBrands,
  setBrands,
  showRefresh,
  setOnLoadmore
} from './redux';
import {brandsStyles} from './styles/ExportCate.styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLOR} from 'bases/styles/Core';
import {ItemLineIndicator} from 'views/app/components/items';
import TextSearchList from './components/TextSearchList';
interface IListFilterProps extends IExportCateReducerState {
  getExportListBrands: typeof getExportListBrands;
  setKeywordBrands: typeof setKeywordBrands;
  setBrands: typeof setBrands;
  showRefresh: typeof showRefresh;
  setOnLoadmore: typeof setOnLoadmore;
}

class ExportBrands extends PureComponent<IListFilterProps> {
  componentDidMount() {
    this.getListFilter();
  }

  getListFilter = () => {
    this.props.getExportListBrands();
  };
  setData = (data: string | null) => {
    const {brands} = this.props;

    if (brands === data) {
      this.props.setBrands(undefined);
    } else {
      this.props.setBrands(data);
    }
    this.props.setKeywordBrands('');
    MyNavigator.goBack();
  };
  _renderEmpty = () => {
    const {isFirstLoading, isError} = this.props;
    if (isFirstLoading) {
      return (
        <MyView style={brandsStyles.containerEmpty}>
          <MyLoading />
        </MyView>
      );
    }
    if (isError) {
      return (
        <MyView style={brandsStyles.containerEmpty}>
          <MyText>Không có dữ liệu</MyText>
          <MyButtonText
            onPress={() => this.getListFilter()}
            title="Tải lại"
            style={brandsStyles.BtnEmpty}
          />
        </MyView>
      );
    }
    return (
      <MyView style={brandsStyles.containerEmpty}>
        <MyText>Không có dữ liệu</MyText>
      </MyView>
    );
  };

  _renderFooter = () => {
    const {isLoadMore} = this.props;
    if (isLoadMore) {
      return <MyLoading />;
    } else {
      return null;
    }
  };

  resetData = () => {
    const {isFirstLoading, isLoadMore} = this.props;

    if (!isFirstLoading && !isLoadMore) {
      this.props.showRefresh(true);
      this.getListFilter();
    }
  };

  onEndReached = () => {
    const {isLoadMore, isStop} = this.props;

    if (isLoadMore || isStop) {
      return;
    }
    this.getListFilter();
    this.props.setOnLoadmore(true);
  };

  _renderItem = ({item}: any) => {
    const {brands} = this.props;
    let renderIcon: any = null;
    renderIcon = brands && brands === item.id.toString() ? COLOR.TEXT.BLUE : COLOR.TEXT.WHITE;

    return (
      <MyButton
        onPress={() => {
          this.setData(item.id.toString());
        }}
        style={brandsStyles.itemTouch}>
        <MyText style={brandsStyles.itemText}>{item.name}</MyText>
        <AntDesign name={'check'} color={renderIcon} size={24} style={brandsStyles.icon2} />
      </MyButton>
    );
  };

  render() {
    const {isRefresh, arrBrands} = this.props;

    return (
      <MyView style={brandsStyles.container}>
        <MyText style={brandsStyles.titleContainer}>Tìm theo</MyText>
        <TextSearchList />
        <FlatList
          style={brandsStyles.list}
          keyboardShouldPersistTaps={'handled'}
          showsVerticalScrollIndicator={false}
          data={arrBrands}
          extraData={arrBrands}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this._renderItem}
          ItemSeparatorComponent={() => <ItemLineIndicator />}
          refreshControl={
            <RefreshControl refreshing={isRefresh || false} onRefresh={this.resetData} />
          }
          onEndReached={this.onEndReached}
          ListFooterComponent={this._renderFooter}
          ListEmptyComponent={this._renderEmpty}
          onEndReachedThreshold={0.1}
          initialNumToRender={10}
        />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {isFirstLoading, count, isLoadMore, isRefresh, isStop, isError, arrBrands, brands} =
    state.ExportCateReducer;

  const objRoot = {
    isFirstLoading,
    count,
    isLoadMore,
    isRefresh,
    isStop,
    isError,
    arrBrands,
    brands
  };
  return objRoot;
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getExportListBrands,
      setKeywordBrands,
      setBrands,
      showRefresh,
      setOnLoadmore
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(ExportBrands);
