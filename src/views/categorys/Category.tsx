import React, {Component} from 'react';
import {FlatList, RefreshControl} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';

import {MyView, MyLoading, MyText, MyButtonText} from 'bases/components';

import {
  DestroyCateGory,
  GetCateGory,
  ICategoryState,
  showLoadmoreCate,
  showRefreshCate
} from './redux';
import {ICategoryModel} from 'models/Category.Model';
import {CategoryStyles} from './styles/Category.styles';
import ItemCategory from './components/ItemCategory';
import {ItemLineIndicator} from 'views/app/components/items';
import TextSearch from './components/TextSearch';
import {IAppNavigateProps} from 'views/app';

type IProps = IAppNavigateProps<'Categorys'> &
  ICategoryState & {
    GetCateGory: typeof GetCateGory;
    DestroyCateGory: typeof DestroyCateGory;
    showRefreshCate: typeof showRefreshCate;
    showLoadmoreCate: typeof showLoadmoreCate;
  };

class Categorys extends Component<IProps> {
  renderItem = ({item}: {item: ICategoryModel}) => {
    const {arrCate, screen} = this.props.route.params;
    let indexElement = -1;
    if (arrCate) {
      indexElement = arrCate.findIndex((x: ICategoryModel) => x.id === item.id);
    }
    return <ItemCategory item={item} isSelected={indexElement > -1} screen={screen} />;
  };

  keyExtractor = (item: ICategoryModel) => {
    return String(item.id);
  };

  renderListEmptyComponent = () => {
    const {isFirstLoading, isError} = this.props;
    if (isFirstLoading) {
      return (
        <MyView transparent style={CategoryStyles.emptyCustomer}>
          <MyLoading />
        </MyView>
      );
    }
    if (isError) {
      return (
        <MyView transparent style={CategoryStyles.emptyCustomer}>
          <MyText>Không có dữ liệu</MyText>
          <MyButtonText
            onPress={() => this.props.GetCateGory()}
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
      this.props.GetCateGory();
    }
  }

  componentWillUnmount() {
    // this.props.DestroyCateGory();
  }

  reload = () => {
    const {isFirstLoading, isLoadMore} = this.props;

    if (!isFirstLoading && !isLoadMore) {
      this.props.showRefreshCate(true);
      this.props.GetCateGory();
    }
  };

  onEndReached = () => {
    const {isLoadMore, isStop} = this.props;

    if (isLoadMore || isStop) {
      return;
    }
    this.props.showLoadmoreCate(true);
    this.props.GetCateGory();
  };

  render() {
    const {arrCategory, isRefresh} = this.props;
    return (
      <MyView style={CategoryStyles.container}>
        <MyText style={CategoryStyles.titleContainer}>Tìm theo</MyText>
        <TextSearch />
        <FlatList
          style={CategoryStyles.list}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isRefresh || false} onRefresh={this.reload} />
          }
          data={arrCategory}
          extraData={arrCategory}
          initialNumToRender={10}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          ItemSeparatorComponent={this.renderItemSeparatorComponent}
          ListEmptyComponent={this.renderListEmptyComponent}
          ListFooterComponent={this.renderListFooterComponent}
          onEndReachedThreshold={0.1}
          onEndReached={this.onEndReached}
          contentContainerStyle={CategoryStyles.containerList}
        />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {isFirstLoading, isRefresh, arrCategory, isLoadMore, isStop, isError} =
    state.CategoryReducer;

  return {
    isFirstLoading,
    isRefresh,
    arrCategory,
    isLoadMore,
    isStop,
    isError
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {GetCateGory, DestroyCateGory, showRefreshCate, showLoadmoreCate},
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Categorys);
