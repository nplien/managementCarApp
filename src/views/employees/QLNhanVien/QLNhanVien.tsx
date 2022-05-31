import * as React from 'react';
import {RefreshControl, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {MyView, MyLoading, MyText, MyButtonText} from 'bases/components';
import {RootState} from 'views/app/redux/App.Reducer';
import {bindActionCreators} from 'redux';
import {ICreateByState, GetCreateByCustomer, showRefresh, showLoadmore} from './redux';
import {IStaffModel} from 'models/Staff.Model';

import {ItemLineIndicator, ItemManager} from 'views/app/components/items';
import {CreatedByStyle} from './style/QLNhanVien.Style';

interface IProps extends ICreateByState {
  GetCreateByCustomer: typeof GetCreateByCustomer;
  showRefresh: typeof showRefresh;
  showLoadmore: typeof showLoadmore;
}

class QLNhanVien extends React.Component<IProps, any> {
  renderItem = ({item}: {item: IStaffModel}) => {
    return <ItemManager ItemManager={item} />;
  };

  keyExtractor = (item: IStaffModel) => {
    return 'NV_' + item.id;
  };

  renderListEmptyComponent = () => {
    const {isFirstLoading, isError} = this.props;
    if (isFirstLoading) {
      return (
        <MyView style={CreatedByStyle.emptyCustomer}>
          <MyLoading />
        </MyView>
      );
    }
    if (isError) {
      return (
        <MyView style={CreatedByStyle.emptyCustomer}>
          <MyText>Không có dữ liệu</MyText>
          <MyButtonText
            onPress={() => this.props.GetCreateByCustomer()}
            title="Tải lại"
            style={CreatedByStyle.BtnEmpty}
          />
        </MyView>
      );
    } else {
      return (
        <MyView style={CreatedByStyle.emptyCustomer}>
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
      return <MyLoading />;
    } else {
      return null;
    }
  };

  reload = () => {
    const {isFirstLoading, isLoadMore} = this.props;

    if (!isFirstLoading && !isLoadMore) {
      this.props.showRefresh(true);
      setTimeout(() => {
        this.props.showRefresh(false);
      }, 300);
      // this.props.GetCreateByCustomer();
    }
  };

  render() {
    const {isRefresh, arrStaffs} = this.props;

    return (
      <FlatList
        style={CreatedByStyle.container}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={isRefresh || false} onRefresh={this.reload} />}
        data={arrStaffs}
        extraData={arrStaffs}
        initialNumToRender={10}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        ItemSeparatorComponent={this.renderItemSeparatorComponent}
        ListEmptyComponent={this.renderListEmptyComponent}
        ListFooterComponent={this.renderListFooterComponent}
        onEndReachedThreshold={0.1}
      />
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {isFirstLoading, isRefresh, arrStaffs, isLoadMore, isStop, isError} =
    state.QLNhanVienReducer;
  return {isFirstLoading, isRefresh, arrStaffs, isLoadMore, isStop, isError};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({GetCreateByCustomer, showRefresh, showLoadmore}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(QLNhanVien);
