/* eslint-disable react/no-did-mount-set-state */
import * as React from 'react';
import {MyButtonText, MyLoading, MyText, MyTextPriceMask, MyView} from 'bases/components';
import Utilities from 'utils/Utilities';
import {detailStyles} from './styles/DetailOrder.style';
import {FlatList} from 'react-native';
import {OrderIEModel, ProductOfImport} from 'models/Order.Model';
import {ItemLineIndicator, ItemProductOfWarehouse} from 'views/app/components/items';
import {COLOR, MY_SIZE, setMargin, setPadding} from 'bases/styles/Core';
import BotPriceView from './components/BotPriceView';
import {SafeAreaView} from 'react-native-safe-area-context';
import {WareHouseApi} from 'services/WareHouse.Api';
import {IAppNavigateProps} from 'views/app';

type DetailsOrderImportProps = IAppNavigateProps<'DetailsOrderImport'>;

interface DetailsOrderImportState {
  detail: Partial<OrderIEModel>;
  isLoading: boolean;
  isError: boolean;
  isFirstLoading: boolean;
}

/**
 *  Chi tiết một đợn imports
 */
export default class DetailsOrderImport extends React.PureComponent<
  DetailsOrderImportProps,
  DetailsOrderImportState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      detail: {},
      isFirstLoading: true,
      isLoading: true,
      isError: false
    };
  }

  async componentDidMount() {
    if (this.props?.route?.params?.type && this.props?.route?.params?.id) {
      const idOrder = this.props.route.params.id.toString();

      let result: any = await WareHouseApi.getDetailImport(idOrder);
      if (result && !result.code) {
        this.setState({
          detail: result.data,
          isLoading: false,
          isError: false,
          isFirstLoading: false
        });
      } else {
        Utilities.showToast('Chi tiết đơn/phiếu', result.message, 'danger', 3000);
        this.setState({
          isLoading: false,
          isError: true,
          isFirstLoading: false
        });
      }
    }
  }

  _renderHeader = () => {
    const {detail} = this.state;
    return (
      <MyView
        style={{
          ...setPadding(MY_SIZE.s_16, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16),
          ...setMargin(0, MY_SIZE.s_16, 0, 0)
        }}>
        <MyView style={detailStyles.rowTopview}>
          <MyText style={detailStyles.textNameLeft}>{detail.created_by?.name || ''}</MyText>
          <MyText style={[detailStyles.textRight, , {textTransform: 'uppercase'}]}>
            {detail?.code || ''}
          </MyText>
        </MyView>
        <MyView style={[detailStyles.rowTopview, {...setMargin(MY_SIZE.s_4, MY_SIZE.s_4, 0, 0)}]}>
          <MyText style={detailStyles.textNameLeft} myFontStyle="Regular">
            {Utilities.convertTimeByFormat(
              detail.created_at && detail.created_at * 1000,
              'DD/MM/YYYY HH:mm'
            )}
          </MyText>
          <MyText style={detailStyles.textRight} myFontStyle="Regular">
            {Utilities.convertTimeByFormat(
              detail.confirmed_at && detail.confirmed_at * 1000,
              'DD/MM/YYYY HH:mm'
            )}
          </MyText>
        </MyView>
        <MyView style={detailStyles.rowTopview}>
          <MyText style={detailStyles.textNameLeft} myFontStyle="Regular">
            {detail.receiver?.name || ''}
          </MyText>
        </MyView>
      </MyView>
    );
  };

  keyExtractor = (item: ProductOfImport, index: any) => {
    return item.id.toString() + index.toString();
  };

  _renderFooter = () => {
    const {detail} = this.state;

    return (
      <MyView style={detailStyles.container}>
        <MyView style={detailStyles.rowBotview} />
        <BotPriceView
          color={COLOR.TEXT.BLUE}
          value={detail.total_price || 0}
          title={'Tổng tiền hàng'}
          isStock={true}
          stock_quantity={detail.total_quantity}
        />
        <MyView style={detailStyles.lineSepePrice} />
        <BotPriceView
          color={COLOR.TEXT.BLACK}
          value={detail.total_discount_value || 0}
          title={'Giảm giá phiếu nhập'}
        />
        <MyView style={detailStyles.lineSepePrice} />
        <BotPriceView
          color={COLOR.TEXT.GREEN}
          value={detail.total_unpaid || 0}
          title={'Cần trả NCC'}
        />
        <MyView style={detailStyles.lineSepePrice} />
        <BotPriceView
          color={COLOR.TEXT.BLACK}
          value={detail.total_paid || 0}
          title={'Đã trả NCC'}
        />
        <MyText myFontStyle={'Regular'} style={detailStyles.creatView}>
          Ghi chú:{' '}
          <MyText style={detailStyles.creatText} myFontStyle={'Medium'}>
            {detail.note}
          </MyText>
        </MyText>
      </MyView>
    );
  };
  renderItem = ({item}: {item: ProductOfImport}) => {
    return <ItemProductOfWarehouse itemProduct={item} />;
  };

  render() {
    if (this.state.isFirstLoading) {
      return (
        <MyView style={detailStyles.loadingContainer}>
          <MyLoading />
        </MyView>
      );
    }

    if (this.state.isError) {
      return (
        <MyView style={detailStyles.emptyCustomer} transparent>
          <MyText>Không có dữ liệu</MyText>
          <MyButtonText
            onPress={() => this.componentDidMount()}
            title="Tải lại"
            style={detailStyles.BtnEmpty}
          />
        </MyView>
      );
    }

    const {detail} = this.state;

    return (
      <MyView style={detailStyles.container}>
        {this.state.isError ? (
          <MyView style={detailStyles.container} />
        ) : (
          <MyView style={detailStyles.container}>
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
              keyExtractor={this.keyExtractor}
              renderItem={this.renderItem}
              ItemSeparatorComponent={() => {
                return <ItemLineIndicator />;
              }}
              ListHeaderComponent={this._renderHeader}
              ListFooterComponent={this._renderFooter}
            />

            <SafeAreaView edges={['bottom', 'left', 'right']}>
              <MyView style={detailStyles.botView}>
                <MyText style={detailStyles.productLengthtext}>
                  {detail.total_product + ' Sản phẩm'}
                </MyText>
                <MyText style={detailStyles.productLengthtext}>
                  Tổng{' '}
                  <MyTextPriceMask
                    style={detailStyles.productBotPrice}
                    text={detail.total_price || 0}
                  />
                </MyText>
              </MyView>
            </SafeAreaView>
          </MyView>
        )}
      </MyView>
    );
  }
}
