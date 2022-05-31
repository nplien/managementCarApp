/* eslint-disable react/no-did-mount-set-state */
import * as React from 'react';
import {FlatList} from 'react-native';
import Utilities from 'utils/Utilities';
import {MyView, MyLoading} from 'bases/components';
import {SuppliersDetailStyle} from '../style/SuppliersDetail.Style';
import {ItemSupplierHistory} from 'views/app/components/items';
import {OrderIEModel} from 'models/Order.Model';
import {WareHouseApi} from 'services/WareHouse.Api';

interface IProps {
  id: string;
}

interface IAppState {
  arrSupplierHistory: OrderIEModel[];
  isPlaceholder: boolean;
}

export default class SupplierHistory extends React.Component<IProps, IAppState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      arrSupplierHistory: [],
      isPlaceholder: true
    };
  }
  async componentDidMount() {
    const {id} = this.props;
    try {
      const response = await WareHouseApi.getListImport({
        user_code: id,
        receivers: '1',
        limit: 100,
        skip: 0
      });
      if (response.code === 0) {
        this.setState({
          arrSupplierHistory: response.data ? response.data : [],
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
      Utilities.logException('SupplierHistory', error);
    }
  }

  render() {
    const {arrSupplierHistory, isPlaceholder} = this.state;
    if (isPlaceholder) {
      return (
        <MyView style={SuppliersDetailStyle.myLoading}>
          <MyLoading />
        </MyView>
      );
    }
    return (
      <MyView style={SuppliersDetailStyle.container}>
        {isPlaceholder ? (
          <MyView style={SuppliersDetailStyle.myLoading}>
            <MyLoading />
          </MyView>
        ) : (
          <FlatList
            data={arrSupplierHistory}
            extraData={arrSupplierHistory}
            renderItem={({item}: {item: OrderIEModel}) => {
              return <ItemSupplierHistory itemOrder={item} />;
            }}
            ItemSeparatorComponent={() => <MyView style={SuppliersDetailStyle.itemSeparator} />}
            keyExtractor={(item, index: number) => index.toString()}
          />
        )}
      </MyView>
    );
  }
}
