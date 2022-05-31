import React, {Component} from 'react';
import {FlatList, RefreshControl} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';

import {MyView, MyLoading, MyText, MyButtonText} from 'bases/components';

import {
  DestroyExportCateGory,
  getExportCateGory,
  IExportCateReducerState,
  showLoadmore,
  showRefresh
} from './redux';
import {ICategoryModel} from 'models/Category.Model';
import {CategoryStyles} from './styles/ExportCate.styles';
import ItemCategory from './components/ItemCategory';
import {ItemLineIndicator} from 'views/app/components/items';
import TextSearchCate from './components/TextSearchCate';

interface IProps extends IExportCateReducerState {
  getExportCateGory: typeof getExportCateGory;
  DestroyExportCateGory: typeof DestroyExportCateGory;
  showRefresh: typeof showRefresh;
  showLoadmore: typeof showLoadmore;

  route: any;
}

class ExportCategory extends Component<IProps> {
  renderItem = ({item}: {item: ICategoryModel}) => {
    return <ItemCategory item={item} />;
  };

  keyExtractor = (item: ICategoryModel) => {
    return String(item.id);
  };

  renderListEmptyComponent = () => {
    const {isFirstLoading, isError} = this.props;
    if (isFirstLoading) {
      return (
        <MyView style={CategoryStyles.emptyCustomer}>
          <MyLoading />
        </MyView>
      );
    }
    if (isError) {
      return (
        <MyView style={CategoryStyles.emptyCustomer}>
          <MyText>Không có dữ liệu</MyText>
          <MyButtonText
            onPress={() => this.props.getExportCateGory()}
            title="Tải lại"
            style={CategoryStyles.BtnEmpty}
          />
        </MyView>
      );
    } else {
      return (
        <MyView style={CategoryStyles.emptyCustomer}>
          <MyText>Không có dữ liệu</MyText>
        </MyView>
      );
    }
  };

  renderItemSeparatorComponent = () => {
    return <ItemLineIndicator />;
  };

  renderListFooterComponent = () => {
    const {isLoadMore} = this.props;
    if (isLoadMore) {
      return (
        <MyView style={CategoryStyles.emptyCustomer}>
          <MyLoading />
        </MyView>
      );
    } else {
      return null;
    }
  };

  componentDidMount() {
    const {isFirstLoading} = this.props;
    if (isFirstLoading) {
      this.props.getExportCateGory();
    }
  }

  componentWillUnmount() {
    // this.props.DestroyExportCateGory();
  }

  reload = () => {
    const {isFirstLoading, isLoadMore} = this.props;

    if (!isFirstLoading && !isLoadMore) {
      this.props.showRefresh(true);
      this.props.getExportCateGory();
    }
  };

  onEndReached = () => {
    const {isLoadMore, isStop} = this.props;

    if (isLoadMore || isStop) {
      return;
    }
    this.props.showLoadmore(true);
    this.props.getExportCateGory();
  };

  render() {
    const {arrExportCateReducer, isRefresh} = this.props;
    return (
      <MyView style={CategoryStyles.container}>
        <MyText style={CategoryStyles.titleContainer}>Tìm theo</MyText>
        <TextSearchCate />
        <FlatList
          style={CategoryStyles.list}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isRefresh || false} onRefresh={this.reload} />
          }
          data={arrExportCateReducer}
          extraData={arrExportCateReducer}
          initialNumToRender={10}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          ItemSeparatorComponent={this.renderItemSeparatorComponent}
          ListEmptyComponent={this.renderListEmptyComponent}
          ListFooterComponent={this.renderListFooterComponent}
          onEndReachedThreshold={0.1}
          onEndReached={this.onEndReached}
        />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {isFirstLoading, isRefresh, arrExportCateReducer, isLoadMore, isStop, isError, cate} =
    state.ExportCateReducer;

  return {
    isFirstLoading,
    isRefresh,
    arrExportCateReducer,
    isLoadMore,
    isStop,
    isError,
    cate
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {getExportCateGory, DestroyExportCateGory, showRefresh, showLoadmore},
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ExportCategory);
