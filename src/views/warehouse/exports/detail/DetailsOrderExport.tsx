/* eslint-disable react/no-did-mount-set-state */
import * as React from 'react';
import {MyButtonText, MyLoading, MyText, MyView} from 'bases/components';
import Utilities from 'utils/Utilities';
import {detailStyles} from './styles/DetailOrder.style';
import {FlatList} from 'react-native';
import {ItemLineIndicator, ItemProductExport} from 'views/app/components/items';
import {setMargin, setPadding, MY_SIZE} from 'bases/styles/Core';
import BotPriceView from './components/BotPriceView';
import {WareHouseApi} from 'services/WareHouse.Api';
import {IExportModel, ProductOfExport} from 'models/ExportOrder.Model';
import {IAppNavigateProps} from 'views/app';

type IDetailsOrderExportProps = IAppNavigateProps<'DetailsOrderExport'>;

interface IDetailsOrderExportState {
  detail: Partial<IExportModel>;
  isLoading: boolean;
  isError: boolean;
  isFirstLoading: boolean;
}

/**
 *  Chi tiết một đợn exports
 */
export default class DetailsOrderExport extends React.PureComponent<
  IDetailsOrderExportProps,
  IDetailsOrderExportState
> {
  constructor(props: IDetailsOrderExportProps) {
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
      let result: any = await WareHouseApi.getDetailExport(idOrder);
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
          <MyText style={[detailStyles.textRight, {textTransform: 'uppercase'}]}>
            {detail.code || ''}
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
            Từ {detail.sender?.name || ''}
          </MyText>
          <MyText style={detailStyles.textRight} myFontStyle="Regular">
            {detail.confirmed_by?.name ? 'Đến ' + detail.receiver?.name : ''}
          </MyText>
        </MyView>
      </MyView>
    );
  };

  _renderFooter = () => {
    const {detail} = this.state;

    return (
      <MyView style={detailStyles.container}>
        <MyView style={detailStyles.rowBotview} />
        <MyView style={{width: '100%'}}>
          <BotPriceView
            color={null}
            value={detail.total_product || 0}
            title={'Tổng số hàng'}
            isText={true}
          />
          <MyView style={detailStyles.lineSepePrice} />
          <BotPriceView
            color={null}
            isText={true}
            value={detail.total_export_quantity + '/' + detail.total_import_quantity}
            title={'Tổng số lượng hàng chuyển/nhận'}
          />
          <MyView style={detailStyles.lineSepePrice} />
          <BotPriceView
            color={null}
            value={detail.total_export_price || 0}
            title={'Tổng giá trị'}
          />
          <MyView style={detailStyles.lineSepePrice} />
        </MyView>
      </MyView>
    );
  };

  keyExtractor = (item: ProductOfExport, index: number) => {
    return item.id.toString() || index.toString();
  };

  _renderItem = ({item}: {item: ProductOfExport}) => {
    return <ItemProductExport itemProduct={item} />;
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
              renderItem={this._renderItem}
              ItemSeparatorComponent={() => {
                return <ItemLineIndicator />;
              }}
              ListHeaderComponent={this._renderHeader}
              ListFooterComponent={this._renderFooter}
            />
          </MyView>
        )}
      </MyView>
    );
  }
}
