/* eslint-disable react/no-did-mount-set-state */
import * as React from 'react';
import {MyButton, MyIcon, MyLoading, MyText, MyView} from 'bases/components';
import Utilities from 'utils/Utilities';
import {detailStyles} from './styles/DetailOrder.style';
import {OrderAPI} from 'services/Order.Api';
import {FlatList} from 'react-native';
import {OrderModel} from 'models/Order.Model';
import {ItemProductOfOrder} from 'views/app/components/items';
import {COLOR, MY_SIZE} from 'bases/styles/Core';
import {ProductOrderModel} from 'models/Product.Model';
import MyNavigator from 'utils/MyNavigator';
import {KHACH_LE, KIND_OF_SCREEN} from '../../../common/Constants';
import BotPriceView from './components/BotPriceView';
import {IAppNavigateProps} from 'views/app';

type IDetailProps = IAppNavigateProps<'DetailsOrder'>;

interface IDetailState {
  detail: Partial<OrderModel>;
  isLoading: boolean;
  isError: boolean;
}

/**
 *  Chi tiết một đợn hàng
 */
export default class DetailsOrder extends React.PureComponent<IDetailProps, IDetailState> {
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
        Utilities.showToast('Chi tiết đơn/phiếu', result.message, 'danger', 3000);
        this.setState({
          isLoading: false,
          isError: true
        });
      }
    }
  }
  handleDetailuser = () => {
    const {detail} = this.state;
    if (detail.customer && detail.customer?.id && detail.customer?.id !== KHACH_LE.id) {
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
          {Utilities.setStatusOrderContent(KIND_OF_SCREEN.INVOICE, this.state.detail.status || '')}
        </MyText>
        <MyButton
          disabled={isDisabled}
          onPress={this.handleDetailuser}
          style={detailStyles.rowTopview}>
          <MyView transparent style={detailStyles.infoProdCenter}>
            <MyView transparent style={detailStyles.viewName}>
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
            </MyView>
            <MyText myFontStyle={'Medium'} numberOfLines={2} style={detailStyles.textRight}>
              {detail.created_by?.name}
            </MyText>
          </MyView>
          <MyView transparent style={[detailStyles.infoProdCenter, {marginTop: MY_SIZE.s_8}]}>
            <MyView transparent style={detailStyles.textNameView}>
              <MyIcon
                iconFontType="Ionicons"
                name={'pricetag'}
                color={COLOR.TEXT.SECONDARY}
                size={14}
              />
              <MyText myFontStyle={'Regular'} style={detailStyles.textLeft}>
                {detail.price_book?.name}
              </MyText>
            </MyView>
            <MyText myFontStyle={'Regular'} numberOfLines={1} style={detailStyles.textRight}>
              {Utilities.convertTimeByFormat(timeCreate, 'DD/MM/YYYY - HH:mm')}
            </MyText>
          </MyView>
          <MyView transparent style={detailStyles.infoProdCenter}>
            <MyView transparent style={detailStyles.textNameView}>
              <MyIcon
                iconFontType="FontAwesome5"
                name={'shopping-basket'}
                color={COLOR.TEXT.SECONDARY}
                size={14}
              />
              <MyText myFontStyle={'Regular'} style={detailStyles.textLeft}>
                {detail.channel?.name}
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
        <MyView style={detailStyles.rowBotview}>
          <BotPriceView
            disabled
            color={COLOR.TEXT.BLUE}
            value={detail.total_before_discount || 0}
            title={'Tổng tiền hàng'}
            isStock={true}
            stock_quantity={total_quantity_stock}
          />
          <MyView style={detailStyles.lineSepePrice} />
          <BotPriceView
            disabled
            color={COLOR.TEXT.BLACK}
            value={detail.total_discount || 0}
            title={'Giảm giá HĐ'}
          />
          <MyView style={detailStyles.lineSepePrice} />
          <BotPriceView
            disabled
            color={COLOR.TEXT.GREEN}
            value={detail.total_price || 0}
            title={'Khách cần trả'}
          />
          <MyView style={detailStyles.lineSepePrice} />
          <BotPriceView
            color={COLOR.TEXT.BLACK}
            value={detail.total_paid || 0}
            userPayment={detail.total_paid}
            title={'Khách đã trả'}
            onPress={() => {
              // if (detail.payments && detail.payments.length > 0) {
              MyNavigator.push('PaymentOfOrder', {list: detail.payments || []});
              // }
            }}
          />
        </MyView>
      </MyView>
    );
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
      <MyView style={detailStyles.container}>
        {this.state.isError ? (
          <MyView style={detailStyles.container} />
        ) : (
          <FlatList
            refreshing={this.state.isLoading}
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
            renderItem={item => {
              return <ItemProductOfOrder itemProduct={item.item} />;
            }}
            ItemSeparatorComponent={() => {
              return <MyView style={detailStyles.lineSepe} />;
            }}
            ListHeaderComponent={this._renderHeader}
            ListFooterComponent={this._renderFooter}
          />
        )}
        {/* <SafeAreaView edges={['bottom', 'left', 'right']}>
          <MyView style={detailStyles.botView}>
            <MyText style={detailStyles.productLengthtext}>
              {detail.products?.length + ' Sản phẩm'}
            </MyText>
            <MyText style={detailStyles.productLengthtext}>
              Tổng{' '}
              <MyTextPriceMask style={detailStyles.productBotPrice} text={detail.total_price} />
            </MyText>
          </MyView>
        </SafeAreaView> */}
      </MyView>
    );
  }
}
