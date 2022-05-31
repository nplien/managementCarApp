/* eslint-disable react/no-did-mount-set-state */

import * as React from 'react';
import {MyView, MyLoading, MyText} from 'bases/components';
import {FlatList} from 'react-native';
import {IAddressModel} from 'models/Customer.Model';
import ItemAddress from 'views/app/components/items/ItemAddress';
import {CustomersDetailStyle} from '../style/CustomersDetail.Style';
import Utilities from 'utils/Utilities';
import {ItemLineIndicator} from 'views/app/components/items';
import {CustomerStyle} from 'views/customers/manager/style/Customer.Style';
import {getApiAddressCustomer} from 'services';

interface IProps {
  id: string;
}

interface IAppState {
  arrAddress: IAddressModel[] | null;
  isPlaceholder: boolean;
}

export default class CustomersAddress extends React.Component<IProps, IAppState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      arrAddress: [],
      isPlaceholder: true
    };
  }
  async componentDidMount() {
    try {
      const {id} = this.props;
      const response = await getApiAddressCustomer(id);
      if (response.code === 0) {
        this.setState({
          arrAddress: response.data,
          isPlaceholder: false
        });
      } else {
        Utilities.showToast(response.message);
        this.setState({
          isPlaceholder: false
        });
      }
    } catch (error) {
      Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
      this.setState({
        isPlaceholder: false
      });
      Utilities.logException('CustomersAddress', error);
    }
  }

  renderListEmptyComponent = () => {
    return (
      <MyView style={CustomerStyle.emptyCustomer}>
        <MyText>Không có dữ liệu</MyText>
      </MyView>
    );
  };

  public render() {
    const {arrAddress, isPlaceholder} = this.state;
    if (isPlaceholder) {
      return (
        <MyView style={CustomersDetailStyle.myLoading}>
          <MyLoading />
        </MyView>
      );
    }
    return (
      <FlatList
        data={arrAddress}
        extraData={arrAddress}
        renderItem={({item}) => {
          return <ItemAddress itemAddress={item} isShowBack />;
        }}
        ListEmptyComponent={this.renderListEmptyComponent()}
        ItemSeparatorComponent={() => <ItemLineIndicator />}
        keyExtractor={(item, index: number) => index.toString()}
      />
    );
  }
}
