import * as React from 'react';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';
import {MyView, MyLoading, MyText, MyIcon, MyButton} from 'bases/components';

import {RootState} from 'views/app/redux/App.Reducer';
import {bindActionCreators} from 'redux';
import ItemBranch from 'views/app/components/items/ItemBranch';
import {GetManagerBranch, IManagerBranchState, showRefresh, showLoadmore} from './redux';
import {ItemBoderBottom, ItemLineIndicatorCustom} from 'views/app/components/items';
import {IStoreModel} from 'models/Store.Model';
import {managerBranchStyles} from './styles/ManagerBranch.Style';
import MyNavigator from 'utils/MyNavigator';
import {setHeaderBranch, ICreateExportState} from 'views/warehouse/exports/createExports/redux';
import {COLOR} from 'bases/styles/Core';
import Utilities from 'utils/Utilities';
import {IAppNavigateProps} from 'views/app';

type IProps = IAppNavigateProps<'ManagerBranch'> &
  IManagerBranchState &
  ICreateExportState & {
    GetManagerBranch: typeof GetManagerBranch;
    showRefresh: typeof showRefresh;
    showLoadmore: typeof showLoadmore;
    setHeaderBranch: typeof setHeaderBranch;
    // route: {
    //   params: {
    //     type: 'CHUYEN_HANG' | null;
    //   };
    // };
    // navigation?: any;
  };

class ManagerBranch extends React.Component<IProps, any> {
  renderItem = ({item}: {item: IStoreModel}) => {
    const {objBranch} = this.props;
    return (
      <ItemBranch
        propsStyle={{
          backgroundColor: item.id === objBranch.id ? COLOR.BG.SECONDARY : COLOR.BG.WHITE
        }}
        onPress={() => {
          if (this.props.route?.params?.type === 'CHUYEN_HANG') {
            this.props.setHeaderBranch(item);
            MyNavigator.goBack();
          } else {
            MyNavigator.push('BranchDetail', {id: item.id});
          }
        }}
        ItemBranch={item}
      />
    );
  };

  keyExtractor = (item: IStoreModel) => {
    return item.id?.toString();
  };

  renderListEmptyComponent = () => {
    // const {isFirstLoading} = this.props;
    // if (isFirstLoading) {
    //   return (
    //     <MyView style={managerBranchStyles.emptyCustomer}>
    //       <MyLoading />
    //     </MyView>
    //   );
    // }
    return (
      <MyView style={managerBranchStyles.emptyCustomer}>
        <MyText>Không có dữ liệu.</MyText>
      </MyView>
    );
  };

  renderItemSeparatorComponent = () => {
    return <ItemLineIndicatorCustom />;
  };

  renderListFooterComponent = () => {
    const {isLoadMore} = this.props;
    if (isLoadMore) {
      return <MyLoading />;
    } else {
      return <ItemBoderBottom />;
    }
  };

  reload = () => {
    const {isFirstLoading, isLoadMore} = this.props;

    if (!isFirstLoading && !isLoadMore) {
      this.props.showRefresh(true);
      this.props.GetManagerBranch();
    }
  };

  onEndReached = () => {
    const {isLoadMore, isStop} = this.props;

    if (isLoadMore || isStop) {
      return;
    }
    this.props.showLoadmore(true);
    this.props.GetManagerBranch();
  };

  render() {
    const {arrManagerBranch} = this.props;

    return (
      <MyView style={managerBranchStyles.container}>
        <MyView style={managerBranchStyles.filterContainer}>
          <MyView style={managerBranchStyles.filterDivideRight} transparent>
            <MyButton
              transparent
              style={managerBranchStyles.btnFilterContainer}
              onPress={() => {
                MyNavigator.push('FilterBrand');
              }}>
              <MyIcon iconFontType="MaterialIcons" name="search" size={24} />
            </MyButton>
          </MyView>
        </MyView>
        <MyView style={managerBranchStyles.textSum}>
          <MyText myFontStyle={'Medium'} style={managerBranchStyles.myTextTop}>
            {'Tổng số ' + Utilities.convertCount(arrManagerBranch?.length) + ' chi nhánh'}
          </MyText>
        </MyView>
        <ItemLineIndicatorCustom />
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          // refreshControl={
          //   <RefreshControl refreshing={isRefresh || false} onRefresh={this.reload} />
          // }
          data={arrManagerBranch}
          extraData={arrManagerBranch}
          initialNumToRender={10}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          ItemSeparatorComponent={this.renderItemSeparatorComponent}
          ListEmptyComponent={this.renderListEmptyComponent}
          // ListFooterComponent={this.renderListFooterComponent}
          // onEndReachedThreshold={0.1}
          // onEndReached={this.onEndReached}
          contentContainerStyle={managerBranchStyles.containerList}
        />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {isFirstLoading, isRefresh, count, arrManagerBranch, isLoadMore, isStop, isError} =
    state.ManagerBranchReducer;
  const {objBranch} = state.CreateExportReducer;
  return {
    isFirstLoading,
    isRefresh,
    count,
    arrManagerBranch,
    isLoadMore,
    isStop,
    isError,
    objBranch
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {GetManagerBranch, showRefresh, showLoadmore, setHeaderBranch},
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerBranch);
