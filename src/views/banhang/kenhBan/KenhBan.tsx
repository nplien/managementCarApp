import * as React from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {ItemLineIndicator} from 'views/app/components/items';

import {KenhBanStyles} from './styles/KenhBan.Style';
import MyNavigator from 'utils/MyNavigator';
import {ICreateSaleState, setKenhBan} from '../../banhang/createSale/redux';
import {ChannelModel} from 'models/ManagerSetting.Model';
import ItemKenhBan from './components/ItemKenhBan';
import {RootState} from 'views/app/redux/App.Reducer';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getKenhBan, IKenhBanState, reset, showLoadmoreKenhBan, showRefreshKenhBan} from './redux';
import {MyButtonText, MyLoading, MyText, MyView} from 'bases/components';

interface IProps extends IKenhBanState, ICreateSaleState {
  getKenhBan: typeof getKenhBan;
  reset: typeof reset;
  showRefreshKenhBan: typeof showRefreshKenhBan;
  showLoadmoreKenhBan: typeof showLoadmoreKenhBan;
  setKenhBan: typeof setKenhBan;
}

class KenhBan extends React.Component<IProps> {
  onPressItem = (item: ChannelModel) => {
    MyNavigator.goBack();
    this.props.setKenhBan(item);
  };

  renderItem = ({item}: {item: ChannelModel}) => {
    const {currentKenhBan} = this.props;
    return (
      <ItemKenhBan
        item={item}
        isCheck={currentKenhBan?.id === item.id}
        onPress={() => this.onPressItem(item)}
      />
    );
  };

  keyExtractor = (item: ChannelModel) => {
    return item.id.toString();
  };

  renderListEmptyComponent = () => {
    const {isFirstLoading, isError} = this.props;
    if (isFirstLoading) {
      return (
        <MyView style={KenhBanStyles.emptyCustomer} transparent>
          <MyLoading />
        </MyView>
      );
    }
    if (isError) {
      return (
        <MyView style={KenhBanStyles.emptyCustomer} transparent>
          <MyText>Không có dữ liệu</MyText>
          <MyButtonText
            onPress={() => this.props.getKenhBan()}
            title="Tải lại"
            style={KenhBanStyles.BtnEmpty}
          />
        </MyView>
      );
    } else {
      return (
        <MyView style={KenhBanStyles.emptyCustomer} transparent>
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
      this.props.getKenhBan();
    }
  }

  shouldComponentUpdate(nextProps: IProps) {
    if (this.props.currentKenhBan !== nextProps.currentKenhBan) return false;
    return true;
  }

  reload = () => {
    const {isFirstLoading, isLoadMore} = this.props;

    if (!isFirstLoading && !isLoadMore) {
      this.props.showRefreshKenhBan(true);
      this.props.getKenhBan();
    }
  };

  onEndReached = () => {
    const {isLoadMore, isStop} = this.props;

    if (isLoadMore || isStop) {
      return;
    }
    this.props.showLoadmoreKenhBan(true);
    this.props.getKenhBan();
  };

  render() {
    const {isRefresh, arrKenhBan} = this.props;

    return (
      <FlatList
        style={KenhBanStyles.list}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={isRefresh || false} onRefresh={this.reload} />}
        data={arrKenhBan}
        extraData={arrKenhBan}
        initialNumToRender={10}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        ItemSeparatorComponent={this.renderItemSeparatorComponent}
        ListEmptyComponent={this.renderListEmptyComponent}
        ListFooterComponent={this.renderListFooterComponent}
        onEndReachedThreshold={0.1}
        onEndReached={this.onEndReached}
      />
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {isFirstLoading, isRefresh, arrKenhBan, isLoadMore, isStop, isError} = state.KenhBanReducer;
  const {currentKenhBan} = state.CreateSaleReducer;
  return {isFirstLoading, isRefresh, arrKenhBan, isLoadMore, isStop, isError, currentKenhBan};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {getKenhBan, reset, showRefreshKenhBan, showLoadmoreKenhBan, setKenhBan},
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(KenhBan);
