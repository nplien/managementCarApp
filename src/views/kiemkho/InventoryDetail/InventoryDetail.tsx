import React, {Component} from 'react';
import {MyView, MyText, MyLoading, MyButtonText} from 'bases/components';
import {InventoryDetailStyle, itemDetailStyles} from './styles/InventoryDetail.style';
import Utilities from 'utils/Utilities';
import {COLOR} from 'bases/styles/Core';
import {ItemLineIndicator} from 'views/app/components/items';
import ItemProductOfDetail from './components/ItemProductOfDetail';
import {IAppNavigateProps, IAppState} from 'views/app';
import {IInventoryModel, ProductOfInventory} from 'models/Inventory.Model';
import {InventoryApi} from 'services/Inventory.Api';
import {FlatList} from 'react-native';

type IProps = IAppNavigateProps<'InventoryDetail'> & {};
interface IState extends IAppState {
  ItemInventoryDetail?: IInventoryModel;
  isError?: boolean;
}
export default class InventoryDetail extends Component<IProps, IState> {
  isDestroyView: boolean = false;
  constructor(props: IProps) {
    super(props);
    this.state = {
      isFirstLoading: true,
      ItemInventoryDetail: undefined,
      isError: false
    };
  }

  async componentDidMount() {
    const {IdInventory} = this.props.route?.params;
    this.GetInventoryDetail(String(IdInventory) || '');
  }

  GetInventoryDetail = async (IdInventory: string) => {
    try {
      const response = await InventoryApi.getDetailInventory(IdInventory);

      if (response && !response.code) {
        this.setState({
          ItemInventoryDetail: response.data ? response.data : undefined,
          isFirstLoading: false
        });
      } else {
        Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
        this.setState({
          isError: true,
          isFirstLoading: false
        });
      }
    } catch (error) {
      Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
      this.setState({
        isError: true,
        isFirstLoading: false
      });
    }
  };

  keyExtractor = (item: ProductOfInventory, index: number) => {
    return item.sku?.toString() + item.id.toString() + index;
  };

  renderItemSeparatorComponent = () => {
    return <ItemLineIndicator />;
  };

  renderListHeaderComponent = () => {
    if (!this.state.ItemInventoryDetail) {
      return null;
    }
    const {
      code,
      status,

      created_at,
      created_by,

      confirmed_at,
      confirmed_by,

      cancelled_at,
      cancelled_by,

      products,
      total_quantity,
      total_actual,
      status_name
    } = this.state.ItemInventoryDetail;

    const tonKho = total_quantity || 0;
    const thucTe = total_actual || 0;
    const lech = thucTe - tonKho;

    let colorStatus = COLOR.TEXT.GREEN;
    if (status !== 'completed') {
      colorStatus = COLOR.TEXT.RED;
    }

    let xuly = '-';
    let nguoiXuLy = '-';
    if (status === 'completed') {
      if (confirmed_at) {
        xuly = Utilities.convertTimeByFormat(confirmed_at * 1000, 'DD/MM/YYYY - HH:mm');
        nguoiXuLy = confirmed_by?.name || '-';
      }
    } else if (status === 'cancelled') {
      if (cancelled_at) {
        xuly = Utilities.convertTimeByFormat(cancelled_at * 1000, 'DD/MM/YYYY - HH:mm');
        nguoiXuLy = cancelled_by?.name || '-';
      }
    }

    return (
      <MyView style={InventoryDetailStyle.container}>
        <MyView style={InventoryDetailStyle.viewTextHeader}>
          <MyText style={InventoryDetailStyle.textHeader} myFontStyle="Regular">
            {'Mã phiếu:'}
          </MyText>
          <MyText style={[InventoryDetailStyle.textHeader, , {textTransform: 'uppercase'}]}>
            {code}
          </MyText>
        </MyView>
        <ItemLineIndicator />
        <MyView style={InventoryDetailStyle.viewTextHeader}>
          <MyText style={InventoryDetailStyle.textHeader} myFontStyle="Regular">
            {'Trạng thái:'}
          </MyText>
          <MyText style={[InventoryDetailStyle.textHeader, {color: colorStatus}]}>
            {status_name}
          </MyText>
        </MyView>
        <ItemLineIndicator />
        <MyView style={InventoryDetailStyle.viewTextHeader2}>
          <MyText style={InventoryDetailStyle.textHeader} myFontStyle="Regular">
            {'Người tạo:'}
          </MyText>
          <MyText style={InventoryDetailStyle.textHeader}>{created_by?.name || '-'}</MyText>
        </MyView>
        <MyText style={InventoryDetailStyle.textHeader2} myFontStyle="Regular">
          {Utilities.convertTimeByFormat(created_at && created_at * 1000, 'DD/MM/YYYY - HH:mm')}
        </MyText>
        <ItemLineIndicator />
        <MyView style={InventoryDetailStyle.viewTextHeader2}>
          <MyText style={InventoryDetailStyle.textHeader} myFontStyle="Regular">
            {'Người cân bằng kho:'}
          </MyText>
          <MyText style={InventoryDetailStyle.textHeader}>{nguoiXuLy}</MyText>
        </MyView>
        <MyText style={InventoryDetailStyle.textHeader2} myFontStyle="Regular">
          {xuly}
        </MyText>
        <ItemLineIndicator style={InventoryDetailStyle.lineHeight} />
        <MyView style={itemDetailStyles.container}>
          <MyView style={itemDetailStyles.contentHeader}>
            <MyText myFontStyle="Regular">{'Hàng kiểm'}</MyText>
            <MyText style={itemDetailStyles.titleValue}>{products?.length}</MyText>
          </MyView>
          <MyView style={itemDetailStyles.content}>
            <MyText myFontStyle="Regular">{'Tồn kho'}</MyText>
            <MyText style={itemDetailStyles.titleValue}>{tonKho}</MyText>
          </MyView>
          <MyView style={itemDetailStyles.content}>
            <MyText myFontStyle="Regular">{'Thực tế'}</MyText>
            <MyText style={[itemDetailStyles.titleValue, {color: COLOR.TEXT.BLUE}]}>
              {thucTe}
            </MyText>
          </MyView>
          <MyView style={itemDetailStyles.content}>
            <MyText myFontStyle="Regular">{'Lệch'}</MyText>
            <MyText style={[itemDetailStyles.titleValue, {color: COLOR.TEXT.RED}]}>{lech}</MyText>
          </MyView>
        </MyView>
        <ItemLineIndicator />
      </MyView>
    );
  };

  renderItem = ({item}: {item: ProductOfInventory}) => {
    return <ItemProductOfDetail item={item} />;
  };

  render() {
    const {isFirstLoading, ItemInventoryDetail, isError} = this.state;
    const {IdInventory} = this.props.route?.params;
    if (isFirstLoading) {
      return (
        <MyView style={InventoryDetailStyle.myLoading}>
          <MyLoading />
        </MyView>
      );
    }

    if (isError) {
      return (
        <MyView style={InventoryDetailStyle.emptyCustomer}>
          <MyText>Không có dữ liệu</MyText>
          <MyButtonText
            onPress={() => this.GetInventoryDetail(IdInventory + '')}
            title="Tải lại"
            style={InventoryDetailStyle.BtnEmpty}
          />
        </MyView>
      );
    }

    return (
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={this.renderListHeaderComponent}
        data={ItemInventoryDetail?.products || []}
        extraData={ItemInventoryDetail?.products}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        ItemSeparatorComponent={this.renderItemSeparatorComponent}
      />
    );
  }
}
