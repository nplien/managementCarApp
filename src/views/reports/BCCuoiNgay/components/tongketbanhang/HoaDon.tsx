import {MyButton, MyIcon, MyLoading, MyText, MyView} from 'bases/components';
import {COLOR, MY_SIZE, setMargin, setPadding} from 'bases/styles/Core';
import {BAO_CAO_HANG_HOA_VALUE} from 'configs/FilterConfig';
import {INVOICE_LIST} from 'configs/StatusConfig';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {MOI_QUAN_TAM} from 'services/DashBoard.Api';
import MyNavigator from 'utils/MyNavigator';
import Utilities from 'utils/Utilities';
import {ItemLineIndicatorCustom} from 'views/app/components/items';
import {RootState} from 'views/app/redux/App.Reducer';
import {
  changeArrPTBHInvoice,
  changeArrPTTTInvoice,
  onChangeStaffInvoice,
  setFilterDateInvoice,
  setReceiverInvoice,
  setStatusInvoice,
  setStoreInvoice
} from 'views/invoice/manager/redux';
import {
  setFilterDateDetailBCHH,
  setStoreDetailBCHH
} from 'views/reports/BCHangHoa/detailBCHangHoa/redux';
import {IBCCuoiNgayState} from '../../redux';

interface IProps extends IBCCuoiNgayState {
  setFilterDateDetailBCHH: typeof setFilterDateDetailBCHH;
  setStoreDetailBCHH: typeof setStoreDetailBCHH;
  setFilterDateInvoice: typeof setFilterDateInvoice;
  setStoreInvoice: typeof setStoreInvoice;
  setStatusInvoice: typeof setStatusInvoice;
  setReceiverInvoice: typeof setReceiverInvoice;
  onChangeStaffInvoice: typeof onChangeStaffInvoice;
  changeArrPTTTInvoice: typeof changeArrPTTTInvoice;
  changeArrPTBHInvoice: typeof changeArrPTBHInvoice;
}
class HoaDon extends Component<IProps> {
  onPressToDetailBCHH = () => {
    const {arrChiNhanhDaChonBCCN, thoiGianLoc, khoangThoiGian} = this.props;
    MyNavigator.navigate('DetailBCHangHoa', {
      view: MOI_QUAN_TAM.LOI_NHUAN,
      sort_by: BAO_CAO_HANG_HOA_VALUE.SO_LUONG_BAN
    });
    this.props.setFilterDateDetailBCHH(thoiGianLoc, khoangThoiGian);
    this.props.setStoreDetailBCHH(arrChiNhanhDaChonBCCN);
  };
  render() {
    const {
      tongSoHoaDonHD,
      tongThuKhacHD,
      tongThucThuHD,
      tongDoanhThuHD,
      tongSoLuongSanPhamHD,
      isLoadingHD,
      thoiGianLoc,
      khoangThoiGian,
      arrChiNhanhDaChonBCCN,
      arrCustomerDaChon,
      arrStaffDaChon,
      arrPTTTDaChon,
      arrPTBHDaChon
    } = this.props;
    return (
      <MyView style={styles.container} transparent>
        <MyText style={styles.label}>Tổng kết bán hàng</MyText>
        <MyView style={styles.content}>
          <MyButton
            transparent
            style={styles.contentItem}
            onPress={() => {
              MyNavigator.navigate('Invoice', {isFromReport: true});
              if (thoiGianLoc && khoangThoiGian) {
                this.props.setFilterDateInvoice(thoiGianLoc, khoangThoiGian);
              }
              if (arrChiNhanhDaChonBCCN) {
                this.props.setStoreInvoice(arrChiNhanhDaChonBCCN);
              }
              this.props.setStatusInvoice([INVOICE_LIST[2], INVOICE_LIST[4]]);
              if (arrCustomerDaChon && arrCustomerDaChon[0]) {
                this.props.setReceiverInvoice(arrCustomerDaChon[0].name);
              }
              if (arrStaffDaChon) {
                this.props.onChangeStaffInvoice(arrStaffDaChon);
              }
              if (arrPTTTDaChon) {
                this.props.changeArrPTTTInvoice(arrPTTTDaChon);
              }
              if (arrPTBHDaChon) {
                this.props.changeArrPTBHInvoice(arrPTBHDaChon);
              }
            }}>
            <MyText style={[styles.textLeft, {color: COLOR.TEXT.BLUE}]} myFontStyle="Bold">
              Hóa đơn
            </MyText>
            {isLoadingHD ? (
              <MyLoading style={styles.loading} />
            ) : (
              <MyText style={styles.textRight}>{Utilities.convertCount(tongSoHoaDonHD)}</MyText>
            )}
            <MyIcon iconFontType="MaterialIcons" name="keyboard-arrow-right" size={20} />
          </MyButton>
          <ItemLineIndicatorCustom lineStyle={styles.line} />
          <MyButton onPress={this.onPressToDetailBCHH} transparent style={styles.contentItem}>
            <MyText style={styles.textLeft}>Số lượng sản phẩm</MyText>
            {isLoadingHD ? (
              <MyLoading style={styles.loading} />
            ) : (
              <MyText style={styles.textRight}>
                {Utilities.convertCount(tongSoLuongSanPhamHD)}
              </MyText>
            )}
            <MyIcon iconFontType="MaterialIcons" name="keyboard-arrow-right" size={20} />
          </MyButton>
          <ItemLineIndicatorCustom lineStyle={styles.line} />
          <MyView transparent style={styles.contentItem}>
            <MyText style={styles.textLeft}>Doanh thu</MyText>
            {isLoadingHD ? (
              <MyLoading style={styles.loading} />
            ) : (
              <MyText style={styles.textRight}>{Utilities.convertCount(tongDoanhThuHD)}</MyText>
            )}
          </MyView>
          <ItemLineIndicatorCustom lineStyle={styles.line} />
          <MyView transparent style={styles.contentItem}>
            <MyText style={styles.textLeft}>Thu khác</MyText>
            {isLoadingHD ? (
              <MyLoading style={styles.loading} />
            ) : (
              <MyText style={styles.textRight}>{Utilities.convertCount(tongThuKhacHD)}</MyText>
            )}
          </MyView>
          <ItemLineIndicatorCustom lineStyle={styles.line} />
          <MyView transparent style={styles.contentItem}>
            <MyText style={styles.textLeft}>Thực thu</MyText>
            {isLoadingHD ? (
              <MyLoading style={styles.loading} />
            ) : (
              <MyText style={[styles.textRight, {color: COLOR.TEXT.BLUE}]} myFontStyle="Bold">
                {Utilities.convertCount(tongThucThuHD)}
              </MyText>
            )}
          </MyView>
        </MyView>
      </MyView>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  content: {
    borderRadius: 16
  },
  loading: {
    flex: 1,
    alignItems: 'flex-end',
    ...setPadding(0, 0, 0, 0)
  },
  line: {
    marginHorizontal: 16
  },
  label: {
    ...setMargin(16, 8, 16, 16)
  },
  contentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...setPadding(12, 12, 16, 16)
  },
  textLeft: {fontSize: MY_SIZE.s_16},
  textRight: {fontSize: MY_SIZE.s_16, flex: 1, textAlign: 'right', ...setPadding(0, 0, 10, 10)}
});
const mapPropsToState = (rootState: RootState) => {
  const {
    tongSoHoaDonHD,
    tongThuKhacHD,
    tongThucThuHD,
    tongDoanhThuHD,
    tongSoLuongSanPhamHD,
    isLoadingHD,
    thoiGianLoc,
    khoangThoiGian,
    arrChiNhanhDaChonBCCN,
    arrCustomerDaChon,
    arrStaffDaChon,
    arrPTTTDaChon,
    arrPTBHDaChon
  } = rootState.BCCuoiNgayReducer;

  return {
    tongSoHoaDonHD,
    tongThuKhacHD,
    tongThucThuHD,
    tongDoanhThuHD,
    tongSoLuongSanPhamHD,
    isLoadingHD,
    thoiGianLoc,
    khoangThoiGian,
    arrChiNhanhDaChonBCCN,
    arrCustomerDaChon,
    arrStaffDaChon,
    arrPTTTDaChon,
    arrPTBHDaChon
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      setFilterDateDetailBCHH,
      setStoreDetailBCHH,

      setFilterDateInvoice,
      setStoreInvoice,
      setStatusInvoice,
      setReceiverInvoice,
      onChangeStaffInvoice,
      changeArrPTTTInvoice,
      changeArrPTBHInvoice
    },
    dispatch
  );
};

export default connect(mapPropsToState, mapDispatchToProps)(HoaDon);
