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
  setFilterDateDetailBCHH,
  setStoreDetailBCHH
} from 'views/reports/BCHangHoa/detailBCHangHoa/redux';
import {
  changeArrPTBHTraHang,
  changeArrPTTTTraHang,
  onChangeStaffTraHang,
  setFilterDateTraHang,
  setReceiverTraHang,
  setStatusTraHang,
  setStoreTraHang
} from 'views/trahang/manager/redux';
import {IBCCuoiNgayState} from '../../redux';

interface IProps extends IBCCuoiNgayState {
  setFilterDateDetailBCHH: typeof setFilterDateDetailBCHH;
  setStoreDetailBCHH: typeof setStoreDetailBCHH;
  setFilterDateTraHang: typeof setFilterDateTraHang;
  setStoreTraHang: typeof setStoreTraHang;
  setStatusTraHang: typeof setStatusTraHang;
  setReceiverTraHang: typeof setReceiverTraHang;
  onChangeStaffTraHang: typeof onChangeStaffTraHang;
  changeArrPTTTTraHang: typeof changeArrPTTTTraHang;
  changeArrPTBHTraHang: typeof changeArrPTBHTraHang;
}
class TraHang extends Component<IProps> {
  onPressToDetailBCHH = () => {
    const {arrChiNhanhDaChonBCCN, thoiGianLoc, khoangThoiGian} = this.props;
    MyNavigator.navigate('DetailBCHangHoa', {
      view: MOI_QUAN_TAM.LOI_NHUAN,
      sort_by: BAO_CAO_HANG_HOA_VALUE.SO_LUONG_TRA
    });
    this.props.setFilterDateDetailBCHH(thoiGianLoc, khoangThoiGian);
    this.props.setStoreDetailBCHH(arrChiNhanhDaChonBCCN);
  };
  render() {
    const {
      tongSoHoaDonTH,
      tongSoLuongSanPhamTH,
      tongHoanTraThuKhacTH,
      tongPhiTraTH,
      tongThucTraTH,
      isLoadingTH,
      thoiGianLoc,
      tongTienTH,
      khoangThoiGian,
      arrChiNhanhDaChonBCCN,
      arrCustomerDaChon,
      arrStaffDaChon,
      arrPTTTDaChon,
      arrPTBHDaChon
    } = this.props;

    Utilities.log(this.props);

    return (
      <MyView style={styles.container} transparent>
        <MyView style={styles.content}>
          <MyButton
            transparent
            style={styles.contentItem}
            onPress={() => {
              MyNavigator.navigate('ReturnOrder', {isFromReport: true});
              if (thoiGianLoc && khoangThoiGian) {
                this.props.setFilterDateTraHang(thoiGianLoc, khoangThoiGian);
              }
              if (arrChiNhanhDaChonBCCN) {
                this.props.setStoreTraHang(arrChiNhanhDaChonBCCN);
              }
              this.props.setStatusTraHang([INVOICE_LIST[2], INVOICE_LIST[4]]);
              if (arrCustomerDaChon && arrCustomerDaChon[0]) {
                this.props.setReceiverTraHang(arrCustomerDaChon[0].name);
              }
              if (arrStaffDaChon) {
                this.props.onChangeStaffTraHang(arrStaffDaChon);
              }
              if (arrPTTTDaChon) {
                this.props.changeArrPTTTTraHang(arrPTTTDaChon);
              }
              if (arrPTBHDaChon) {
                this.props.changeArrPTBHTraHang(arrPTBHDaChon);
              }
            }}>
            <MyText style={[styles.textLeft, {color: COLOR.TEXT.RED}]} myFontStyle="Bold">
              Trả hàng
            </MyText>
            {isLoadingTH ? (
              <MyLoading style={styles.loading} />
            ) : (
              <MyText style={styles.textRight}>{Utilities.convertCount(tongSoHoaDonTH)}</MyText>
            )}
            <MyIcon iconFontType="MaterialIcons" name="keyboard-arrow-right" size={20} />
          </MyButton>
          <ItemLineIndicatorCustom lineStyle={styles.line} />
          <MyButton onPress={this.onPressToDetailBCHH} transparent style={styles.contentItem}>
            <MyText style={styles.textLeft}>Số lượng sản phẩm</MyText>
            {isLoadingTH ? (
              <MyLoading style={styles.loading} />
            ) : (
              <MyText style={styles.textRight}>
                {Utilities.convertCount(tongSoLuongSanPhamTH)}
              </MyText>
            )}
            <MyIcon iconFontType="MaterialIcons" name="keyboard-arrow-right" size={20} />
          </MyButton>
          <ItemLineIndicatorCustom lineStyle={styles.line} />
          <MyView transparent style={styles.contentItem}>
            <MyText style={styles.textLeft}>Tổng tiền trả hàng</MyText>
            {isLoadingTH ? (
              <MyLoading style={styles.loading} />
            ) : (
              <MyText style={styles.textRight}>{Utilities.convertCount(tongTienTH)}</MyText>
            )}
          </MyView>
          <ItemLineIndicatorCustom lineStyle={styles.line} />
          <MyView transparent style={styles.contentItem}>
            <MyText style={styles.textLeft}>Hoàn trả thu khác</MyText>
            {isLoadingTH ? (
              <MyLoading style={styles.loading} />
            ) : (
              <MyText style={styles.textRight}>
                {Utilities.convertCount(tongHoanTraThuKhacTH)}
              </MyText>
            )}
          </MyView>
          <ItemLineIndicatorCustom lineStyle={styles.line} />
          <MyView transparent style={styles.contentItem}>
            <MyText style={styles.textLeft}>Phí trả hàng</MyText>
            {isLoadingTH ? (
              <MyLoading style={styles.loading} />
            ) : (
              <MyText style={styles.textRight}>{Utilities.convertCount(tongPhiTraTH)}</MyText>
            )}
          </MyView>
          <ItemLineIndicatorCustom lineStyle={styles.line} />
          <MyView transparent style={styles.contentItem}>
            <MyText style={styles.textLeft}>Thực trả</MyText>
            {isLoadingTH ? (
              <MyLoading style={styles.loading} />
            ) : (
              <MyText style={[styles.textRight, {color: COLOR.TEXT.BLUE}]} myFontStyle="Bold">
                {Utilities.convertCount(tongThucTraTH)}
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
    ...setMargin(16, 64)
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
    tongSoHoaDonTH,
    tongSoLuongSanPhamTH,
    tongHoanTraThuKhacTH,
    tongPhiTraTH,
    tongTienTH,
    tongThucTraTH,
    isLoadingTH,
    thoiGianLoc,
    khoangThoiGian,
    arrChiNhanhDaChonBCCN,
    arrCustomerDaChon,
    arrStaffDaChon,
    arrPTTTDaChon,
    arrPTBHDaChon
  } = rootState.BCCuoiNgayReducer;

  return {
    tongSoHoaDonTH,
    tongSoLuongSanPhamTH,
    tongHoanTraThuKhacTH,
    tongPhiTraTH,
    tongTienTH,
    tongThucTraTH,
    isLoadingTH,
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

      setFilterDateTraHang,
      setStoreTraHang,
      setStatusTraHang,
      setReceiverTraHang,
      onChangeStaffTraHang,
      changeArrPTTTTraHang,
      changeArrPTBHTraHang
    },
    dispatch
  );
};

export default connect(mapPropsToState, mapDispatchToProps)(TraHang);
