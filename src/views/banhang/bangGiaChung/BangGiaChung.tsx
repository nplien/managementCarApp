import * as React from 'react';
import {connect} from 'react-redux';
import {MyView, MyText, MyButtonText, MyLoading} from 'bases/components';
import {FlatList, RefreshControl} from 'react-native';
import {ItemLineIndicator} from 'views/app/components/items';
import {RootState} from 'views/app/redux/App.Reducer';
import {getBangGia, reset, showRefreshBangGia, showLoadmoreBangGia, IBangGiaState} from './redux';
import {bindActionCreators} from 'redux';

import {IBangGiaModel} from 'models/BangGia.Model';
import ItemBangGia from './components/ItemBangGia';
import {BangGiaChungStyles} from './styles/BangGiaChung.Style';
import TextSearch from './components/TextSearch';
import MyNavigator from 'utils/MyNavigator';
import {IProductBanHangState, setBangGia} from '../ProductBanHang/redux';

interface IProps extends IBangGiaState, IProductBanHangState {
  getBangGia: typeof getBangGia;
  reset: typeof reset;
  showRefreshBangGia: typeof showRefreshBangGia;
  showLoadmoreBangGia: typeof showLoadmoreBangGia;
  setBangGia: typeof setBangGia;
}

class BangGiaChung extends React.Component<IProps> {
  onPressItem = (item: IBangGiaModel) => {
    MyNavigator.goBack();
    this.props.setBangGia(item);
  };

  renderItem = ({item}: {item: IBangGiaModel}) => {
    const {currentBangGia} = this.props;
    return (
      <ItemBangGia
        item={item}
        isCheck={currentBangGia?.id === item.id}
        onPress={() => this.onPressItem(item)}
      />
    );
  };

  keyExtractor = (item: IBangGiaModel) => {
    return item.id.toString();
  };

  renderListEmptyComponent = () => {
    const {isFirstLoading, isError} = this.props;
    if (isFirstLoading) {
      return (
        <MyView style={BangGiaChungStyles.emptyCustomer} transparent>
          <MyLoading />
        </MyView>
      );
    }
    if (isError) {
      return (
        <MyView style={BangGiaChungStyles.emptyCustomer} transparent>
          <MyText>Không có dữ liệu</MyText>
          <MyButtonText
            onPress={() => this.props.getBangGia()}
            title="Tải lại"
            style={BangGiaChungStyles.BtnEmpty}
          />
        </MyView>
      );
    } else {
      return (
        <MyView style={BangGiaChungStyles.emptyCustomer} transparent>
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

  componentDidMount() {
    const {isFirstLoading} = this.props;
    if (isFirstLoading) {
      this.props.getBangGia();
    }
  }

  shouldComponentUpdate(nextProps: IProps) {
    if (this.props.currentBangGia !== nextProps.currentBangGia) return false;
    return true;
  }

  reload = () => {
    const {isFirstLoading, isLoadMore} = this.props;

    if (!isFirstLoading && !isLoadMore) {
      this.props.showRefreshBangGia(true);
      this.props.getBangGia();
    }
  };

  onEndReached = () => {
    const {isLoadMore, isStop} = this.props;

    if (isLoadMore || isStop) {
      return;
    }
    this.props.showLoadmoreBangGia(true);
    this.props.getBangGia();
  };

  render() {
    const {isRefresh, arrBangGia, currentKhachHang} = this.props;

    const arrBangGiaTmp = [];
    if (arrBangGia) {
      for (let index = 0; index < arrBangGia.length; index++) {
        const element = arrBangGia[index];
        if (element.applied_groups && element.applied_groups.length > 0) {
          const applied = element.applied_groups.find(
            x => x === currentKhachHang?.group?.id?.toString()
          );
          if (applied) {
            arrBangGiaTmp.push(element);
          }
        } else {
          arrBangGiaTmp.push(element);
        }
      }
    }

    return (
      <MyView style={BangGiaChungStyles.container}>
        <MyText style={BangGiaChungStyles.titleContainer}>Tìm theo</MyText>
        <TextSearch />
        <FlatList
          style={BangGiaChungStyles.list}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isRefresh || false} onRefresh={this.reload} />
          }
          data={arrBangGiaTmp}
          extraData={arrBangGiaTmp}
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
  const {isFirstLoading, isRefresh, arrBangGia, isLoadMore, isStop, isError} = state.BangGiaReducer;
  const {currentBangGia, currentKhachHang} = state.ProductBanHangReducer;
  return {
    isFirstLoading,
    isRefresh,
    arrBangGia,
    isLoadMore,
    isStop,
    isError,
    currentBangGia,
    currentKhachHang
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {getBangGia, reset, showRefreshBangGia, showLoadmoreBangGia, setBangGia},
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(BangGiaChung);
