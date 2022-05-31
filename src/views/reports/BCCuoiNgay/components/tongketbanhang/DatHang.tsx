import {MyButton, MyIcon, MyLoading, MyText, MyView} from 'bases/components';
import {COLOR, MY_SIZE, setMargin, setPadding} from 'bases/styles/Core';
import {INVOICE_LIST} from 'configs/StatusConfig';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MyNavigator from 'utils/MyNavigator';
import Utilities from 'utils/Utilities';
import {ItemLineIndicatorCustom} from 'views/app/components/items';
import {RootState} from 'views/app/redux/App.Reducer';
import {
  setOrderFilterDate,
  setStoreOrder,
  setStatusOrder,
  setKeywordReceiverDG,
  onChangeStaffOrder,
  changeArrPTTTOrder,
  changeArrPTBHOrder
} from 'views/orders/manager/redux';
import {IBCCuoiNgayState} from '../../redux';

interface IProps extends IBCCuoiNgayState {
  setOrderFilterDate: typeof setOrderFilterDate;
  setStoreOrder: typeof setStoreOrder;
  setStatusOrder: typeof setStatusOrder;
  setKeywordReceiverDG: typeof setKeywordReceiverDG;
  onChangeStaffOrder: typeof onChangeStaffOrder;
  changeArrPTTTOrder: typeof changeArrPTTTOrder;
  changeArrPTBHOrder: typeof changeArrPTBHOrder;
}
class DatHang extends Component<IProps> {
  render() {
    const {
      tongSoHoaDonDH,
      tongThuKhacDH,
      tongThucThuDH,
      tongDoanhThuDH,
      tongSoLuongSanPhamDH,
      isLoadingDH,
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
        <MyView style={styles.content}>
          <MyButton
            transparent
            style={styles.contentItem}
            onPress={() => {
              MyNavigator.navigate('Order', {isFromReport: true});
              if (thoiGianLoc && khoangThoiGian) {
                this.props.setOrderFilterDate(thoiGianLoc, khoangThoiGian);
              }
              if (arrChiNhanhDaChonBCCN) {
                this.props.setStoreOrder(arrChiNhanhDaChonBCCN);
              }
              this.props.setStatusOrder([INVOICE_LIST[2], INVOICE_LIST[4]]);
              if (arrCustomerDaChon && arrCustomerDaChon[0]) {
                this.props.setKeywordReceiverDG(arrCustomerDaChon[0].name);
              }
              if (arrStaffDaChon) {
                this.props.onChangeStaffOrder(arrStaffDaChon);
              }
              if (arrPTTTDaChon) {
                this.props.changeArrPTTTOrder(arrPTTTDaChon);
              }
              if (arrPTBHDaChon) {
                this.props.changeArrPTBHOrder(arrPTBHDaChon);
              }
            }}>
            <MyText style={[styles.textLeft, {color: COLOR.TEXT.GREEN}]} myFontStyle="Bold">
              Đặt hàng
            </MyText>
            {isLoadingDH ? (
              <MyLoading style={styles.loading} />
            ) : (
              <MyText style={styles.textRight}>{Utilities.convertCount(tongSoHoaDonDH)}</MyText>
            )}
            <MyIcon iconFontType="MaterialIcons" name="keyboard-arrow-right" size={20} />
          </MyButton>
          <ItemLineIndicatorCustom lineStyle={styles.line} />
          <MyView transparent style={styles.contentItem}>
            <MyText style={styles.textLeft}>Số lượng sản phẩm</MyText>
            {isLoadingDH ? (
              <MyLoading style={styles.loading} />
            ) : (
              <MyText style={styles.textRight}>
                {Utilities.convertCount(tongSoLuongSanPhamDH)}
              </MyText>
            )}
          </MyView>
          <ItemLineIndicatorCustom lineStyle={styles.line} />
          <MyView transparent style={styles.contentItem}>
            <MyText style={styles.textLeft}>Doanh thu</MyText>
            {isLoadingDH ? (
              <MyLoading style={styles.loading} />
            ) : (
              <MyText style={styles.textRight}>{Utilities.convertCount(tongDoanhThuDH)}</MyText>
            )}
          </MyView>
          <ItemLineIndicatorCustom lineStyle={styles.line} />
          <MyView transparent style={styles.contentItem}>
            <MyText style={styles.textLeft}>Thu khác</MyText>
            {isLoadingDH ? (
              <MyLoading style={styles.loading} />
            ) : (
              <MyText style={styles.textRight}>{Utilities.convertCount(tongThuKhacDH)}</MyText>
            )}
          </MyView>
          <ItemLineIndicatorCustom lineStyle={styles.line} />
          <MyView transparent style={styles.contentItem}>
            <MyText style={styles.textLeft}>Thực thu</MyText>
            {isLoadingDH ? (
              <MyLoading style={styles.loading} />
            ) : (
              <MyText style={[styles.textRight, {color: COLOR.TEXT.BLUE}]} myFontStyle="Bold">
                {Utilities.convertCount(tongThucThuDH)}
              </MyText>
            )}
          </MyView>
        </MyView>
      </MyView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...setMargin(16)
  },
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
    tongSoHoaDonDH,
    tongThuKhacDH,
    tongThucThuDH,
    tongDoanhThuDH,
    tongSoLuongSanPhamDH,
    isLoadingDH,
    thoiGianLoc,
    khoangThoiGian,
    arrChiNhanhDaChonBCCN,
    arrCustomerDaChon,
    arrStaffDaChon,
    arrPTTTDaChon,
    arrPTBHDaChon
  } = rootState.BCCuoiNgayReducer;

  return {
    tongSoHoaDonDH,
    tongThuKhacDH,
    tongThucThuDH,
    tongDoanhThuDH,
    tongSoLuongSanPhamDH,
    isLoadingDH,
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
      setOrderFilterDate,
      setStoreOrder,
      setStatusOrder,
      setKeywordReceiverDG,
      onChangeStaffOrder,
      changeArrPTTTOrder,
      changeArrPTBHOrder
    },
    dispatch
  );
};

export default connect(mapPropsToState, mapDispatchToProps)(DatHang);
