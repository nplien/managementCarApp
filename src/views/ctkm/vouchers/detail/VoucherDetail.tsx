import {MyButtonText, MyImage, MyLoading, MyText, MyView} from 'bases/components';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {IVoucherState, getDetailVoucher, setDetailVoucherFirst} from '../manager/redux';
import {voucherStyles} from '../manager/styles/Voucher.styles';
import Utilities from 'utils/Utilities';
import {MY_SIZE} from 'bases/styles/Core';
import VoucherRowView from './components/VoucherRowView';
import {IAppNavigateProps} from 'views/app';

type IVoucherDetailProps = IVoucherState &
  IAppNavigateProps<'VoucherDetail'> & {
    getDetailVoucher: typeof getDetailVoucher;
    setDetailVoucherFirst: typeof setDetailVoucherFirst;
  };

class VoucherDetail extends PureComponent<IVoucherDetailProps> {
  constructor(props: IVoucherDetailProps) {
    super(props);
  }

  componentDidMount() {
    this.props.getDetailVoucher(this.props?.route?.params?.id?.toString() || '');
  }

  componentWillUnmount() {
    this.props.setDetailVoucherFirst(true);
  }

  resetData = () => {
    // this.props.setVoucherDetailLoading(true);
    // this.props.getDetailVoucher(this.props.route.params.id?.toString() || '');
  };

  render() {
    const {detailOfVoucher, isFirstDetail} = this.props;
    if (isFirstDetail) {
      return (
        <MyView style={voucherStyles.emptyCustomer} transparent>
          <MyLoading />
        </MyView>
      );
    }

    if (!detailOfVoucher) {
      return (
        <MyView style={voucherStyles.emptyCustomer} transparent>
          <MyText>Không có dữ liệu</MyText>
          <MyButtonText
            onPress={() => this.componentDidMount()}
            title="Tải lại"
            style={voucherStyles.BtnEmpty}
          />
        </MyView>
      );
    }

    const imageVoucher = detailOfVoucher?.thumbnail_url || null;
    // let timeCreate = Utilities.convertTimeByFormat(detailOfVoucher.created_at*1000, 'DD/MM/YYYY');
    let timeStart = Utilities.convertTimeByFormat(
      detailOfVoucher.applied_start_time && detailOfVoucher?.applied_start_time * 1000,
      'DD/MM/YYYY'
    );
    let timeEnd = Utilities.convertTimeByFormat(
      detailOfVoucher.applied_stop_time && detailOfVoucher.applied_stop_time * 1000,
      'DD/MM/YYYY'
    );

    return (
      <MyView style={voucherStyles.container}>
        {/* {this.props.isLoadingDetails ? (
          <MyView style={voucherStyles.container}>
            <MyLoading />
          </MyView>
        ) : !detailOfVoucher ? (
          <MyView style={voucherStyles.container} />
        ) : ( */}
        <ScrollView style={voucherStyles.container}>
          <MyView style={voucherStyles.voucherDetailContainer}>
            {imageVoucher ? (
              <MyImage
                height={MY_SIZE.s_75}
                width={MY_SIZE.s_75}
                resizeMode={'contain'}
                source={{
                  uri: imageVoucher
                }}
              />
            ) : (
              <MyView style={voucherStyles.viewImage}>
                <MyText
                  numberOfLines={1}
                  myFontStyle={'Medium'}
                  style={voucherStyles.textImageCenter}>
                  Voucher
                </MyText>
              </MyView>
            )}
            <MyView style={voucherStyles.viewName}>
              <MyText myFontStyle={'Bold'} style={voucherStyles.textInfo}>
                {'Tên Voucher: ' + detailOfVoucher?.name}
              </MyText>
              <MyText style={voucherStyles.textCenter} myFontStyle={'Medium'}>
                {'Mã Voucher: ' + detailOfVoucher?.code}
              </MyText>
              <MyText>
                {'Trạng thái: '}
                <MyText>{detailOfVoucher?.status_name}</MyText>
              </MyText>
            </MyView>
          </MyView>
          <MyView style={voucherStyles.voucherDetailBody}>
            <VoucherRowView title={'Ngày bắt đầu: '} value={timeStart} />
            <VoucherRowView title={'Hạn sử dụng: '} value={timeEnd} />
            <VoucherRowView
              title={'Loại chiết khấu: '}
              value={detailOfVoucher?.discount_type === 1 ? '%' : 'VNĐ'}
            />
            <VoucherRowView
              title={'Giá trị chiết khấu: '}
              value={
                detailOfVoucher?.discount_value?.toString() +
                (detailOfVoucher?.discount_type === 1 ? ' %' : ' VNĐ')
              }
            />
            <VoucherRowView
              title={'Số lượng phát hành: '}
              value={detailOfVoucher?.applied_max_quantity || 0}
            />
            <VoucherRowView
              isTextMask
              title={'Áp dụng giảm tối đa: '}
              value={detailOfVoucher?.max_discount_value || 0}
            />
            <VoucherRowView
              isTextMask
              title={'Áp dụng đơn hàng tối thiểu: '}
              value={detailOfVoucher?.applied_order_value || 0}
            />
            <VoucherRowView title={'Mô tả:'} value="" />

            <MyText myFontStyle="Regular">{detailOfVoucher?.content}</MyText>
          </MyView>
        </ScrollView>
        {/* )} */}
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {detailOfVoucher, isFirstDetail} = state.VoucherReducer;
  return {detailOfVoucher, isFirstDetail};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getDetailVoucher,
      setDetailVoucherFirst
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(VoucherDetail);
