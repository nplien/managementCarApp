import * as React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {MyView, MyText, MyButton, MyIcon} from 'bases/components';
import {COLOR, setPadding, setRadius, setMargin, MY_SIZE} from 'bases/styles/Core';
import {RootState} from 'views/app/redux/App.Reducer';
import {IDashboardState} from 'views/dashboard/redux';
import Utilities from 'utils/Utilities';
import MyNavigator from 'utils/MyNavigator';
import {bindActionCreators} from 'redux';

import {INVOICE_LIST} from 'configs/StatusConfig';
import {
  setFilterDateInvoice,
  setStoreInvoice,
  setStatusInvoice,
  setTypeInvoice,
  clearListDashBoardInvoice,
  setOnRefreshInvoice
} from 'views/invoice/manager/redux';

interface IProps extends IDashboardState {
  setFilterDateInvoice: typeof setFilterDateInvoice;
  setStoreInvoice: typeof setStoreInvoice;
  setStatusInvoice: typeof setStatusInvoice;
  setTypeInvoice: typeof setTypeInvoice;
  clearListDashBoardInvoice: typeof clearListDashBoardInvoice;
  setOnRefreshInvoice: typeof setOnRefreshInvoice;
}

class ViewDatHang extends React.Component<IProps> {
  render() {
    const {
      tongSoHoaDonBan,
      thoiGianLoc,
      khoangThoiGian,
      arrChiNhanhDaChonDashBoard,
      isLoadingDatHang,
      tongGiaTriHoaDonBan
    } = this.props;
    return (
      <MyButton
        style={styles.container}
        onPress={() => {
          this.props.clearListDashBoardInvoice();
          this.props.setStatusInvoice([INVOICE_LIST[4], INVOICE_LIST[2]]);
          this.props.setTypeInvoice('retail');
          this.props.setFilterDateInvoice(thoiGianLoc, khoangThoiGian);
          this.props.setStoreInvoice(arrChiNhanhDaChonDashBoard);
          this.props.setOnRefreshInvoice(true);
          MyNavigator.navigate('Invoice', {isFromReport: false});
        }}>
        <MyView style={{flex: 1}} transparent>
          <MyText style={{fontSize: MY_SIZE.s_14}} myFontStyle="Bold">
            Số đơn hàng
          </MyText>
          {isLoadingDatHang ? (
            <ActivityIndicator size={'small'} style={{alignSelf: 'baseline'}} />
          ) : (
            <MyText style={{fontSize: MY_SIZE.s_12}}>
              <MyText style={{fontSize: MY_SIZE.s_14, color: COLOR.TEXT.BLUE}} myFontStyle="Bold">
                {Utilities.convertCount(tongSoHoaDonBan)}
              </MyText>{' '}
              đơn hàng
            </MyText>
          )}
        </MyView>
        {isLoadingDatHang ? (
          <ActivityIndicator size={'small'} />
        ) : (
          <MyText style={{color: COLOR.TEXT.BLUE, fontSize: MY_SIZE.s_18}} myFontStyle="Bold">
            {Utilities.convertCurrency(tongGiaTriHoaDonBan)}
          </MyText>
        )}

        <MyIcon
          iconFontType="MaterialIcons"
          name="keyboard-arrow-right"
          size={24}
          color={COLOR.SWITCH.PLACEHOLDER}
        />
      </MyButton>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    ...setMargin(MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    alignItems: 'center',
    flexDirection: 'row',
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_8),
    ...setRadius(16, 16, 0, 0)
  }
});
const mapStateToProps = (state: RootState) => {
  const {
    tongSoHoaDonDatHang,
    tongSoHoaDonBan,
    isLoadingDatHang,
    arrChiNhanhDaChonDashBoard,
    tongGiaTriHoaDonBan
  } = state.DashboardReducer;
  const {thoiGianLoc, khoangThoiGian} = state.DashboardReducer;
  return {
    tongSoHoaDonDatHang,
    tongSoHoaDonBan,
    isLoadingDatHang,
    thoiGianLoc,
    khoangThoiGian,
    arrChiNhanhDaChonDashBoard,
    tongGiaTriHoaDonBan
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      setFilterDateInvoice,
      setStoreInvoice,
      setStatusInvoice,
      clearListDashBoardInvoice,
      setTypeInvoice,
      setOnRefreshInvoice
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(ViewDatHang);
