import * as React from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {MyView, MyText, MyButton, MyIcon} from 'bases/components';
import {COLOR, MY_SIZE, setMargin, setPadding, setRadius} from 'bases/styles/Core';
import {RootState} from 'views/app/redux/App.Reducer';
import {IDashboardState} from 'views/dashboard/redux';
import Utilities from 'utils/Utilities';
import {bindActionCreators} from 'redux';
import {
  setTypeInvoice,
  clearListDashBoardInvoice,
  setStoreInvoice,
  setFilterDateInvoice,
  setOnRefreshInvoice,
  setStatusInvoice
} from 'views/invoice/manager/redux';
import MyNavigator from 'utils/MyNavigator';
import {INVOICE_LIST} from 'configs/StatusConfig';

interface IProps extends IDashboardState {
  setFilterDateInvoice: typeof setFilterDateInvoice;
  setStoreInvoice: typeof setStoreInvoice;
  setStatusInvoice: typeof setStatusInvoice;
  setTypeInvoice: typeof setTypeInvoice;
  clearListDashBoardInvoice: typeof clearListDashBoardInvoice;
  setOnRefreshInvoice: typeof setOnRefreshInvoice;
}

class ViewTongDoanhThu extends React.Component<IProps, any> {
  render() {
    const {
      tongGiaTriHoaDonBan,
      tongSoHoaDonBan,
      thoiGianLoc,
      khoangThoiGian,
      arrChiNhanhDaChonDashBoard,
      arrPhieuSuaChua
    } = this.props;
    let tongPSC = 0;
    for (let i = 0; i < arrPhieuSuaChua.length; i++) {
      const element = arrPhieuSuaChua[i];
      tongPSC += element.total_price;
    }

    return (
      <MyView style={styles.container}>
        <MyButton
          style={styles.viewFlex}
          onPress={() => {
            this.props.clearListDashBoardInvoice();
            this.props.setStatusInvoice([INVOICE_LIST[4], INVOICE_LIST[2]]);
            this.props.setTypeInvoice('retail');
            this.props.setFilterDateInvoice(thoiGianLoc, khoangThoiGian);
            this.props.setStoreInvoice(arrChiNhanhDaChonDashBoard);
            this.props.setOnRefreshInvoice(true);
            MyNavigator.navigate('Invoice', {isFromReport: false});
          }}>
          <MyView style={{flex: 1}}>
            <MyText myFontStyle="Bold" style={{color: COLOR.TEXT.BLUE, fontSize: MY_SIZE.s_18}}>
              {Utilities.convertCurrency(tongGiaTriHoaDonBan)}
            </MyText>

            <MyText style={{fontSize: MY_SIZE.s_14}}>
              {Utilities.convertCount(tongSoHoaDonBan)} Hoá đơn
            </MyText>
          </MyView>
          <MyIcon
            iconFontType="MaterialIcons"
            name="keyboard-arrow-right"
            size={24}
            color={COLOR.SWITCH.PLACEHOLDER}
          />
        </MyButton>
        <MyButton
          style={styles.viewFlex}
          onPress={() => {
            this.props.clearListDashBoardInvoice();
            this.props.setTypeInvoice('return');
            this.props.setFilterDateInvoice(thoiGianLoc, khoangThoiGian);
            this.props.setStoreInvoice(arrChiNhanhDaChonDashBoard);
            this.props.setOnRefreshInvoice(true);
            MyNavigator.navigate('PhieuSuaChua');
          }}>
          <MyView style={{flex: 1}} transparent>
            <MyText myFontStyle="Bold" style={{color: COLOR.TEXT.BLUE, fontSize: MY_SIZE.s_18}}>
              {Utilities.convertCurrency(tongPSC)}
            </MyText>

            <MyText style={{fontSize: MY_SIZE.s_14}}>
              {Utilities.convertCount(arrPhieuSuaChua.length)} Phiếu sửa chữa
            </MyText>
          </MyView>
          <MyIcon
            iconFontType="MaterialIcons"
            name="keyboard-arrow-right"
            size={24}
            color={COLOR.SWITCH.PLACEHOLDER}
          />
        </MyButton>
      </MyView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    ...setPadding(MY_SIZE.s_10, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_8),
    ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0),
    ...setMargin(MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  viewFlex: {flex: 1, flexDirection: 'row', alignItems: 'center', marginHorizontal: MY_SIZE.s_4}
});
const mapStateToProps = (state: RootState) => {
  const {tongGiaTriHoaDonBan, tongGiaTriHoaDonTra, tongSoHoaDonBan, tongSoHoaDonTra} =
    state.DashboardReducer;
  const {thoiGianLoc, khoangThoiGian, arrChiNhanhDaChonDashBoard} = state.DashboardReducer;
  const {arrPhieuSuaChua} = state.PhieuSuaChuaReducer;
  return {
    tongGiaTriHoaDonBan,
    tongGiaTriHoaDonTra,
    tongSoHoaDonBan,
    tongSoHoaDonTra,
    thoiGianLoc,
    khoangThoiGian,
    arrChiNhanhDaChonDashBoard,
    arrPhieuSuaChua
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
export default connect(mapStateToProps, mapDispatchToProps)(ViewTongDoanhThu);
