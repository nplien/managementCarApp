import React, {PureComponent} from 'react';

import {MyText, MyView} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import {itemStoreStyles} from 'views/products/ProductDetail/styles/ProductDetail.style';
import {StoreModel} from 'models/ManagerSetting.Model';
import {StockProduct} from 'models/Product.Model';
import Utilities from 'utils/Utilities';

interface IProps {
  item: StoreModel;
  listStock: StockProduct[];
}

export default class ItemTonKho extends PureComponent<IProps> {
  render() {
    const {item, listStock} = this.props;

    let tonKho = 0;
    const listTonKho = listStock.filter(element => {
      return element.id?.toString() === item.id.toString();
    });
    for (let index = 0; index < listTonKho.length; index++) {
      const element = listTonKho[index];
      tonKho = tonKho + Number(element?.total_quantity || 0);
    }

    let _viewStatus = null;
    if (item.status === 'active') {
      _viewStatus = (
        <MyText myFontStyle="Regular" style={{color: COLOR.TEXT.GREEN}}>
          Đang kinh doanh
        </MyText>
      );
    } else {
      _viewStatus = (
        <MyText myFontStyle="Regular" style={{color: COLOR.TEXT.RED}}>
          Ngừng kinh doanh
        </MyText>
      );
    }
    return (
      <MyView style={itemStoreStyles.container}>
        <MyView style={itemStoreStyles.viewLeft}>
          <MyText myFontStyle="Regular">Chi nhánh</MyText>
          <MyText numberOfLines={2} style={itemStoreStyles.textContent}>
            {item.name}
          </MyText>
          {_viewStatus}
        </MyView>
        <MyView style={itemStoreStyles.viewRight}>
          <MyText myFontStyle="Regular">Tồn kho</MyText>
          <MyText style={itemStoreStyles.textContent}>{Utilities.convertCount(tonKho)}</MyText>
        </MyView>
      </MyView>
    );
  }
}
