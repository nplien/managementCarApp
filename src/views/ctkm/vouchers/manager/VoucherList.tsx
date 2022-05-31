import {MyButtonText, MyLoading, MyText, MyView} from 'bases/components';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {FlatList, RefreshControl} from 'react-native';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {IVoucherState, setOnLoadmore, setOnRefresh, getListVoucher} from './redux';
import {voucherStyles} from './styles/Voucher.styles';
import {
  ItemBoderBottom,
  ItemLineIndicator,
  ItemLineIndicatorCustom,
  ItemVoucher
} from 'views/app/components/items';
import HeaderVoucher from './components/HeaderVoucher';
import FilterVoucherDate from './components/FilterVoucherDate';
import Utilities from 'utils/Utilities';

interface IVoucherListProps extends IVoucherState {
  getListVoucher: typeof getListVoucher;
  setOnLoadmore: typeof setOnLoadmore;
  setOnRefresh: typeof setOnRefresh;
}

class VoucherList extends PureComponent<IVoucherListProps> {
  constructor(props: IVoucherListProps) {
    super(props);
  }

  componentDidMount() {
    const {isFirstLoading} = this.props;
    if (isFirstLoading) {
      this.props.getListVoucher();
    }
  }

  reload = () => {
    const {isFirstLoading, isLoadMore} = this.props;

    if (!isFirstLoading && !isLoadMore) {
      this.props.setOnRefresh(true);
      this.props.getListVoucher();
    }
  };
  onEndReached = () => {
    const {isStop, isLoadMore} = this.props;
    if (isStop) {
      return;
    }
    if (isLoadMore) return;
    this.props.setOnLoadmore(true);
    this.props.getListVoucher();
  };

  _renderFooter = () => {
    if (this.props.isLoadMore) {
      return <MyLoading />;
    }
    return <ItemBoderBottom />;
  };

  _renderEmpty = () => {
    const {isFirstLoading, isError} = this.props;
    if (isFirstLoading) {
      return (
        <MyView style={voucherStyles.emptyCustomer}>
          <MyLoading />
        </MyView>
      );
    }
    if (isError) {
      return (
        <MyView style={voucherStyles.emptyCustomer}>
          <MyText>Không có dữ liệu</MyText>
          <MyButtonText
            onPress={() => this.props.getListVoucher()}
            title="Tải lại"
            style={voucherStyles.BtnEmpty}
          />
        </MyView>
      );
    } else {
      return (
        <MyView style={voucherStyles.containerEmpty}>
          <MyText>Không có dữ liệu.</MyText>
        </MyView>
      );
    }
  };

  render() {
    let {arrVoucher, isRefresh} = this.props;
    return (
      <MyView style={voucherStyles.container}>
        <MyView style={voucherStyles.viewFilter}>
          <FilterVoucherDate />
          <HeaderVoucher />
        </MyView>
        <MyView style={voucherStyles.viewTextHead}>
          <MyText myFontStyle={'Medium'} style={voucherStyles.textSum}>
            {'Tổng số ' + Utilities.convertCount(this.props.count) + ' mã giảm giá'}
          </MyText>
        </MyView>
        <ItemLineIndicatorCustom />
        <FlatList
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isRefresh || false} onRefresh={this.reload} />
          }
          data={arrVoucher}
          initialNumToRender={10}
          extraData={arrVoucher}
          ItemSeparatorComponent={() => {
            return <ItemLineIndicator />;
          }}
          onEndReached={this.onEndReached}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          renderItem={({item}) => {
            return <ItemVoucher itemVoucher={item} />;
          }}
          ListFooterComponent={this._renderFooter}
          ListEmptyComponent={this._renderEmpty}
          contentContainerStyle={voucherStyles.containerList}
        />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {isFirstLoading, arrVoucher, count, isLoadMore, isRefresh, isStop} = state.VoucherReducer;

  return {isFirstLoading, arrVoucher, count, isLoadMore, isRefresh, isStop};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getListVoucher,
      setOnLoadmore,
      setOnRefresh
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(VoucherList);
