import * as React from 'react';
import {MyButtonText, MyLoading, MyText, MyView} from 'bases/components';
import Utilities from 'utils/Utilities';
import {detailStyles} from '../../orders/detailsOrder/styles/DetailOrder.style';

import {Linking, RefreshControl, ScrollView} from 'react-native';
import {DeliveryModel} from 'models/Order.Model';
import {KIND_OF_SCREEN} from '../../../common/Constants';
import RowView from '../../orders/detailsOrder/components/RowView';
import {COLOR} from 'bases/styles/Core';
import {DeliveryApi} from 'services/Delivery.Api';
import {deliveryStyles} from '../manager/styles/Delivery.style';
import {IAppNavigateProps} from 'views/app';

type IDetailProps = IAppNavigateProps<'DetailsDelivery'>;

interface IDetailState {
  detail: Partial<DeliveryModel>;
  isLoading: boolean;
  isError: boolean;
  isFirstLoading: boolean;
}

/**
 *  Chi tiết một vận đơn
 */
export default class DetailsDelivery extends React.PureComponent<IDetailProps, IDetailState> {
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
      if (this.props.route.params.type === KIND_OF_SCREEN.DELIVERY) {
        let result = await DeliveryApi.getDetailDelivery(idOrder);
        if (result && !result.code && result.data) {
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
  }

  _renderHeader = () => {
    const {detail} = this.state;

    let addressReceiver = '';
    addressReceiver += detail?.receiver_address;
    addressReceiver += ', ' + detail.receiver_ward?.name;
    addressReceiver += ', ' + detail.receiver_district?.name;
    addressReceiver += ', ' + detail.receiver_province?.name;

    let addressSender = '';
    addressSender += detail?.sender_address;
    addressSender += ', ' + detail.sender_ward?.name;
    addressSender += ', ' + detail.sender_district?.name;
    addressSender += ', ' + detail.sender_province?.name;

    return (
      <MyView style={detailStyles.container}>
        <MyText style={detailStyles.titleDelivery}>Địa chỉ lấy hàng</MyText>

        <MyText myFontStyle={'Regular'} style={detailStyles.senderText}>
          {addressSender} - {detail?.sender_phone}
        </MyText>
        <MyView style={detailStyles.lineSepeShape} />
        <RowView isText title={'Mã vận đơn'} value={detail?.code || ''} />
        <MyView style={detailStyles.lineSepe} />
        <RowView isText title={'Mã đơn hàng'} value={detail?.order_code || ''} />
        <MyText style={detailStyles.titleDelivery}>Người nhận</MyText>
        <RowView isText title={'Người nhận'} value={detail?.receiver_name || ''} />
        <MyView style={detailStyles.lineSepe} />
        <RowView
          isText
          title={'Điện thoại'}
          value={detail?.receiver_phone || ''}
          onPress={() => {
            if (detail?.receiver_phone) {
              Linking.openURL(`tel:${detail?.receiver_phone}`);
            }
          }}
          styleRight={{color: COLOR.TEXT.BLUE}}
        />
        <MyView style={detailStyles.lineSepe} />
        <RowView isText title={'Địa chỉ'} value={addressReceiver} />

        <MyText style={detailStyles.titleDelivery}>Thông tin gói hàng</MyText>
        <RowView isText title={'Trọng lượng'} value={detail?.weight || 0} />
        <MyView style={detailStyles.lineSepe} />
        <RowView
          isText
          title={'Kích thước'}
          value={
            (detail?.length || '0') +
            ' x ' +
            (detail?.height || '0') +
            ' x ' +
            (detail?.width || '0')
          }
        />
        <MyText style={detailStyles.titleDelivery}>Đối tác giao hàng</MyText>
        <RowView title={'Phí giao hàng'} value={detail?.total_shipping_fee || ''} />
        <MyView style={detailStyles.lineSepe} />
        <RowView title={'Thu hộ'} value={detail?.total_shipping_cod || ''} />
        <MyView style={detailStyles.lineSepe} />
        <RowView isText title={'Tên'} value={detail?.provider_name || ''} />
        <MyView style={detailStyles.lineSepe} />
        <RowView isText title={'Loại dịch vụ'} value={detail?.service_name || ''} />
        <MyView style={detailStyles.lineSepe} />
        <RowView isText title={'Trạng thái'} value={detail?.status_name || ''} />
        <MyView style={detailStyles.lineSepe} />
        <RowView
          isText
          title={'Bên trả phí'}
          value={
            detail?.payment_by
              ? detail?.payment_by === 'NGUOIGUI'
                ? 'Người gửi'
                : 'Người nhận'
              : ''
          }
        />
        <MyView style={detailStyles.lineSepe} />
        <RowView isText title={'Lưu ý'} value={detail?.note || ''} />
        <MyView style={detailStyles.lineSepe} />
      </MyView>
    );
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

    return (
      <MyView style={detailStyles.container}>
        {this.state.isFirstLoading ? (
          <MyView style={detailStyles.loadingContainer}>
            <MyLoading />
          </MyView>
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl
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
              />
            }
            contentContainerStyle={deliveryStyles.containerList}
            showsVerticalScrollIndicator={false}>
            {this._renderHeader()}
          </ScrollView>
        )}
      </MyView>
    );
  }
}
