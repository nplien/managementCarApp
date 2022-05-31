import {MyIcon, MyLoading, MyText, MyView, MyButton} from 'bases/components';
import {setMargin, setPadding, MY_SIZE} from 'bases/styles/Core';
import {SO_QUY_STATUS} from 'models/SoQuy.Model';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MyNavigator from 'utils/MyNavigator';
import Utilities from 'utils/Utilities';
import {ItemLineIndicatorCustom} from 'views/app/components/items';
import {RootState} from 'views/app/redux/App.Reducer';
import {
  setStatusSoQuy,
  changeCustomerSoQuy,
  changeNhanViewSoQuy,
  changeArrPTTTSoQuy
} from 'views/soquy/filter/redux';
import {onChangeStoreSQ, setDateFilterSoQuy} from 'views/soquy/list/redux';
import {IBCCuoiNgayState} from '../../redux';

interface IProps extends IBCCuoiNgayState {
  setDateFilterSoQuy: typeof setDateFilterSoQuy;
  onChangeStoreSQ: typeof onChangeStoreSQ;
  setStatusSoQuy: typeof setStatusSoQuy;
  changeCustomerSoQuy: typeof changeCustomerSoQuy;
  changeNhanViewSoQuy: typeof changeNhanViewSoQuy;
  changeArrPTTTSoQuy: typeof changeArrPTTTSoQuy;
}
// con thieu gui sang customer
class TongKetThuChi extends Component<IProps> {
  render() {
    const {
      tongTienThu,
      tongTienChi,
      tongTienThuChi,
      isLoadingThuChi,
      thoiGianLoc,
      khoangThoiGian,
      arrChiNhanhDaChonBCCN,
      arrStaffDaChon,
      arrPTTTDaChon,
      arrCustomerDaChon
    } = this.props;
    let price_thu = Utilities.convertCount(tongTienThu);
    let price_chi = Utilities.convertCount(tongTienChi);
    let total_amount = Utilities.convertCount(tongTienThuChi);

    return (
      <MyView style={styles.container} transparent>
        <MyText style={styles.label}>Tổng kết thu chi</MyText>
        <MyView style={styles.content}>
          <MyView transparent style={styles.contentItem}>
            <MyText style={styles.textLeft}>Tổng thu</MyText>
            {isLoadingThuChi ? (
              <MyLoading style={styles.loading} />
            ) : (
              <MyText style={styles.textRight}>{price_thu}</MyText>
            )}
          </MyView>
          <ItemLineIndicatorCustom lineStyle={styles.line} />
          <MyView transparent style={styles.contentItem}>
            <MyText style={styles.textLeft}>Tổng chi</MyText>
            {isLoadingThuChi ? (
              <MyLoading style={styles.loading} />
            ) : (
              <MyText style={styles.textRight}>
                {tongTienChi ? '-' : ''}
                {price_chi}
              </MyText>
            )}
          </MyView>
          <ItemLineIndicatorCustom lineStyle={styles.line} />
          <MyButton
            transparent
            style={styles.contentItem}
            onPress={() => {
              if (!isLoadingThuChi) {
                MyNavigator.navigate('PaymentHome', {isFromReport: true});
                if (thoiGianLoc && khoangThoiGian) {
                  this.props.setDateFilterSoQuy(thoiGianLoc, khoangThoiGian);
                }
                if (arrChiNhanhDaChonBCCN) {
                  this.props.onChangeStoreSQ(arrChiNhanhDaChonBCCN);
                }
                this.props.setStatusSoQuy(SO_QUY_STATUS.COMPLETED);
                if (arrStaffDaChon) {
                  this.props.changeNhanViewSoQuy(arrStaffDaChon);
                }
                if (arrPTTTDaChon) {
                  this.props.changeArrPTTTSoQuy(arrPTTTDaChon);
                }
                if (arrCustomerDaChon) {
                  this.props.changeCustomerSoQuy(arrCustomerDaChon);
                }
              }
            }}>
            <MyText style={styles.textLeft}>Thu - Chi</MyText>
            {isLoadingThuChi ? (
              <MyLoading style={styles.loading} />
            ) : (
              <MyText style={styles.textRight}>{total_amount}</MyText>
            )}
            <MyIcon iconFontType="MaterialIcons" name="keyboard-arrow-right" size={20} />
          </MyButton>
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
    tongTienThu,
    tongTienChi,
    tongTienThuChi,
    isLoadingThuChi,
    thoiGianLoc,
    khoangThoiGian,
    arrChiNhanhDaChonBCCN,
    arrStaffDaChon,
    arrPTTTDaChon,
    arrCustomerDaChon
  } = rootState.BCCuoiNgayReducer;

  return {
    tongTienThu,
    tongTienChi,
    tongTienThuChi,
    isLoadingThuChi,
    thoiGianLoc,
    khoangThoiGian,
    arrChiNhanhDaChonBCCN,
    arrStaffDaChon,
    arrPTTTDaChon,
    arrCustomerDaChon
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      setDateFilterSoQuy,
      onChangeStoreSQ,
      setStatusSoQuy,
      changeCustomerSoQuy,
      changeNhanViewSoQuy,
      changeArrPTTTSoQuy
    },
    dispatch
  );
};

export default connect(mapPropsToState, mapDispatchToProps)(TongKetThuChi);
