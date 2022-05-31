/* eslint-disable react/no-did-mount-set-state */
import * as React from 'react';
import {MyView, MyLoading, MyText} from 'bases/components';
import {OrderAPI} from 'services/Order.Api';
import {FlatList} from 'react-native';
import Utilities from 'utils/Utilities';
import {CustomersDetailStyle} from '../style/CustomersDetail.Style';
import {ItemOrder} from 'views/app/components/items/ItemOrder';
import {OrderModel} from 'models/Order.Model';
import {ItemLineIndicator} from 'views/app/components/items';
import {CustomerStyle} from 'views/customers/manager/style/Customer.Style';
import MyNavigator from 'utils/MyNavigator';

interface IProps {
  id: string;
}

interface IAppState {
  arrCustomersHistory: Array<OrderModel>;
  isPlaceholder: boolean;
  count?: number;
  isLoadMore: boolean;
}
export default class CustomersHistory extends React.Component<IProps, IAppState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      arrCustomersHistory: [],
      isPlaceholder: false,
      count: 0,
      isLoadMore: false
    };
  }
  async componentDidMount() {
    this.setState({isPlaceholder: true});
    const {id} = this.props;
    try {
      const response = await OrderAPI.getListOrder({
        skip: 0,
        limit: 10,
        user_code: id,
        types: 'retail,return'
      });
      if (response.code === 0) {
        this.setState({
          arrCustomersHistory: response.data ? response.data : [],
          isPlaceholder: false,
          count: response.count
        });
      } else {
        Utilities.showToast('Vui lòng thử lại!', '', 'danger');
        this.setState({
          isPlaceholder: false
        });
      }
    } catch (error) {
      Utilities.showToast('Vui lòng thử lại!', '', 'danger');
      this.setState({
        isPlaceholder: false
      });
      Utilities.logException('CustomersHistory', error);
    }
  }
  LoadMoreHistoryCustomer = async (skip: number, limit: number) => {
    const {id} = this.props;
    const {arrCustomersHistory} = this.state;
    this.setState({isLoadMore: true});
    const response = await OrderAPI.getListOrder({
      skip: skip,
      limit: limit,
      user_code: id,
      types: 'retail,return'
    });
    try {
      if (response.code === 0) {
        this.setState({
          arrCustomersHistory: arrCustomersHistory.concat(response.data ? response.data : []),
          isLoadMore: false,
          count: response.count
        });
      } else {
        Utilities.showToast(response.message, '', 'warning');
        this.setState({
          isLoadMore: false
        });
      }
    } catch (error) {
      Utilities.showToast('Tải lên nội dung thất bại!', '', 'warning');
      this.setState({
        isLoadMore: false
      });
      Utilities.logException('CustomersHistory', error);
    }
  };

  renderListEmptyComponent = () => {
    return (
      <MyView style={CustomerStyle.emptyCustomer}>
        <MyText>Không có dữ liệu</MyText>
      </MyView>
    );
  };

  getDetailOrder = (id: string) => {
    MyNavigator.push('DetailsInvoice', {id});
  };

  render() {
    const {arrCustomersHistory, isPlaceholder, count, isLoadMore} = this.state;
    if (isPlaceholder) {
      return (
        <MyView style={CustomersDetailStyle.myLoading}>
          <MyLoading />
        </MyView>
      );
    }
    return (
      <MyView style={CustomersDetailStyle.container}>
        <MyView style={CustomersDetailStyle.containerHistory}>
          <MyText style={CustomersDetailStyle.childContainerHitory}>{count} giao dịch</MyText>
        </MyView>

        <FlatList
          data={arrCustomersHistory}
          extraData={arrCustomersHistory}
          renderItem={({item}) => {
            return <ItemOrder itemOrder={item} getDetailOrder={this.getDetailOrder} />;
          }}
          ListEmptyComponent={this.renderListEmptyComponent()}
          ItemSeparatorComponent={() => <ItemLineIndicator />}
          keyExtractor={(item, index: number) => index.toString()}
          onEndReached={() => {
            if (arrCustomersHistory.length === count) return;
            if (isLoadMore) return;
            this.LoadMoreHistoryCustomer(arrCustomersHistory.length, 10);
          }}
          onEndReachedThreshold={0.4}
          ListFooterComponent={() => {
            if (isLoadMore) {
              return (
                <MyView style={CustomersDetailStyle.viewLoadmore}>
                  <MyLoading />
                </MyView>
              );
            }
            return <MyView style={CustomersDetailStyle.viewLoadmore} />;
          }}
        />
      </MyView>
    );
  }
}
