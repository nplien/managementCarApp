/* eslint-disable react/no-did-mount-set-state */
import * as React from 'react';
import {MyButton, MyIcon, MyLoading, MyText, MyView} from 'bases/components';
import Utilities from 'utils/Utilities';
import {detailStyles} from './styles/DetailTraHang.style';
import {OrderAPI} from 'services/Order.Api';
import {FlatList} from 'react-native';
import {OrderModel} from 'models/Order.Model';
import {ItemLineIndicatorCustom, ItemProductOfOrder} from 'views/app/components/items';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLOR, MY_SIZE} from 'bases/styles/Core';
import {ProductOrderModel} from 'models/Product.Model';
import MyNavigator from 'utils/MyNavigator';
import BotPriceView from './components/BotPriceView';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KHACH_LE} from 'common/Constants';
import {IAppNavigateProps} from 'views/app';

type IDetailProps = IAppNavigateProps<'DetailsTraHang'>;

interface IDetailState {
  detail: Partial<OrderModel>;
  isLoading: boolean;
  isError: boolean;
}

/**
 *  Chi tiết một đợn hàng
 */
export default class DetailsTraHang extends React.PureComponent<IDetailProps, IDetailState> {
  constructor(props: any) {
    super(props);
    this.state = {
      detail: {},
      isLoading: true,
      isError: false
    };
  }

  async componentDidMount() {
    if (this.props?.route?.params?.id) {
      const idOrder = this.props.route.params.id.toString();

      let result = await OrderAPI.getDetailOrder(idOrder);
      if (result && !result.code) {
        this.setState({
          detail: result.data ? result.data : {},
          isLoading: false,
          isError: false
        });
      } else {
        Utilities.showToast('Chi tiết đơn/phiếu', result.message, 'danger', 4123);
        this.setState({
          isLoading: false,
          isError: true
        });
      }
    }
  }
  handleDetailUser = () => {
    const {detail} = this.state;
    if (detail.customer?.id !== KHACH_LE.id) {
      MyNavigator.push('CustomersDetail', {idCustomer: detail.customer?.id});
    }
  };

  _renderHeader = () => {
    const {detail} = this.state;
    const timeNow = new Date().getTime();
    const length = detail.created_at
      ? timeNow.toString().length - detail.created_at?.toString().length
      : 0;
    const timeCreate =
      length > 0 && (length === 3 || length === 4)
        ? Number(detail.created_at) * 1000
        : Number(detail.created_at);
    const isDisabled = detail.customer?.id === KHACH_LE.id;
    return (
      <MyView style={detailStyles.container}>
        <MyText myFontStyle={'Regular'} style={[detailStyles.statusText]}>
          {this.state.detail.status_name}
        </MyText>
        <MyButton disabled={isDisabled} style={detailStyles.rowTopview}>
          <MyView transparent style={detailStyles.infoProdCenter}>
            <MyButton transparent onPress={this.handleDetailUser} style={detailStyles.viewName}>
              <MyText myFontStyle="Medium" numberOfLines={2} style={detailStyles.textNameLeft}>
                {detail.customer?.name}
              </MyText>
              {isDisabled ? null : (
                <MyIcon
                  iconFontType="MaterialCommunityIcons"
                  name={'chevron-right'}
                  color={COLOR.TEXT.SECONDARY}
                  size={24}
                  style={detailStyles.icon}
                />
              )}
            </MyButton>
            <MyText myFontStyle={'Medium'} numberOfLines={2} style={detailStyles.textRight}>
              {detail.created_by?.name}
            </MyText>
          </MyView>
          <MyView transparent style={[detailStyles.infoProdCenter, {marginTop: MY_SIZE.s_8}]}>
            <MyView transparent style={detailStyles.textNameView}>
              <Ionicons
                name={'pricetag'}
                color={COLOR.TEXT.SECONDARY}
                size={14}
                style={detailStyles.icon}
              />
              <MyText myFontStyle={'Regular'} style={detailStyles.textLeft}>
                {detail.price_book?.name}
              </MyText>
            </MyView>
            <MyText myFontStyle={'Regular'} numberOfLines={1} style={detailStyles.textRight}>
              {Utilities.convertTimeByFormat(timeCreate, 'DD/MM/YYYY-HH:mm')}
            </MyText>
          </MyView>
          <MyView transparent style={detailStyles.infoProdCenter}>
            <MyView transparent style={detailStyles.textNameView}>
              <FontAwesome5
                name={'shopping-basket'}
                color={COLOR.TEXT.SECONDARY}
                size={14}
                style={detailStyles.icon}
              />
              <MyText myFontStyle={'Regular'} style={detailStyles.textLeft}>
                {detail.invoice?.code}
              </MyText>
            </MyView>
            <MyText myFontStyle={'Regular'} numberOfLines={1} style={detailStyles.textRight}>
              {detail.store?.name}
            </MyText>
          </MyView>
        </MyButton>
        {/* Khi nào có Api thì mở ra */}

        {/* <MyButton style={detailStyles.btnShipper}>
          <MyView transparent style={detailStyles.viewShipper}>
            <MyIcon name="motorcycle" iconFontType="Fontisto" size={14} color={COLOR.BG.GRAY} />
            <MyText myFontStyle="Medium" style={{marginLeft: MY_SIZE.s_8}}>
              Giao hàng
            </MyText>
          </MyView>
          <MyIcon
            name="navigate-next"
            iconFontType="MaterialIcons"
            size={24}
            color={COLOR.BG.GRAY}
          />
        </MyButton> */}
      </MyView>
    );
  };

  _renderFooter = () => {
    const {detail} = this.state;
    let total_quantity_stock = 0;
    if (detail.products && detail.products.length > 0) {
      detail.products.forEach((element: ProductOrderModel) => {
        if (element.total_quantity && element.total_quantity > 0) {
          total_quantity_stock += element.total_quantity;
        }
      });
    }
    return (
      <MyView style={detailStyles.container}>
        <MyView style={detailStyles.containerFooter}>
          <BotPriceView
            disabled
            color={COLOR.TEXT.BLUE}
            value={detail.total_price_before_discount || 0}
            title={'Tổng tiền hàng trả'}
            isStock={true}
            stock_quantity={total_quantity_stock}
          />
          <MyView style={detailStyles.lineSepePrice} />
          <BotPriceView
            disabled
            color={COLOR.TEXT.BLACK}
            value={detail.total_return_fee || 0}
            title={'Phí trả hàng'}
          />
          <MyView style={detailStyles.lineSepePrice} />
          <BotPriceView
            disabled
            color={COLOR.TEXT.BLACK}
            value={detail.total_price_after_discount || 0}
            title={'Tổng tiền hóa đơn trả'}
          />
          <MyView style={detailStyles.lineSepePrice} />
          <BotPriceView
            disabled
            color={COLOR.TEXT.GREEN}
            value={detail.total_price || 0}
            title={'Cần trả khách'}
          />
          <MyView style={detailStyles.lineSepePrice} />
          <BotPriceView
            color={COLOR.TEXT.BLACK}
            value={detail.total_paid || 0}
            userPayment={detail.total_paid}
            title={'Đã trả khách'}
            onPress={() => {
              MyNavigator.push('PaymentOfOrder', {list: detail.payments || []});
            }}
          />
        </MyView>
      </MyView>
    );
  };
  _renderItem = ({item}: any) => {
    return <ItemProductOfOrder itemProduct={item} />;
  };
  render() {
    if (this.state.isLoading) {
      return (
        <MyView style={detailStyles.loadingContainer}>
          <MyLoading />
        </MyView>
      );
    }
    const {detail} = this.state;
    return (
      <SafeAreaView style={detailStyles.container} edges={['bottom']}>
        <MyView style={detailStyles.container}>
          {this.state.isError ? (
            <MyView style={detailStyles.container} />
          ) : (
            <FlatList
              refreshing={this.state.isLoading}
              showsVerticalScrollIndicator={false}
              onRefresh={() => {
                this.setState(
                  {
                    isLoading: true
                  },
                  () => {
                    this.componentDidMount();
                  }
                );
              }}
              data={detail.products}
              extraData={detail.products}
              keyExtractor={(item, index) => index.toString()}
              renderItem={this._renderItem}
              ItemSeparatorComponent={() => (
                <ItemLineIndicatorCustom containerStyle={detailStyles.separator} />
              )}
              ListHeaderComponent={this._renderHeader}
              ListFooterComponent={this._renderFooter}
              contentContainerStyle={detailStyles.listContainer}
            />
          )}
        </MyView>
      </SafeAreaView>
    );
  }
}
