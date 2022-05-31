import {MyLoading, MyText, MyView} from 'bases/components';
import {setMargin, setPadding, MY_SIZE} from 'bases/styles/Core';
import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Utilities from 'utils/Utilities';
import {ItemLineIndicatorCustom} from 'views/app/components/items';
import {RootState} from 'views/app/redux/App.Reducer';
import {IBCCuoiNgayState} from '../../redux';

type IProps = IBCCuoiNgayState;

class PhuongThucThanhToan extends PureComponent<IProps> {
  render() {
    const {
      tongPTTT_TiemMat,
      tongPTTT_ChuyenKhoan,
      tongPTTT_The,
      tongPTTT_Diem,
      tongPTTT_Voucher,
      isLoadingPTTT
    } = this.props;

    let tien_mat = Utilities.convertCount(tongPTTT_TiemMat);
    let chuyen_khoan = Utilities.convertCount(tongPTTT_ChuyenKhoan);
    let the = Utilities.convertCount(tongPTTT_The);
    let diem = Utilities.convertCount(tongPTTT_Diem);
    let voucher = Utilities.convertCount(tongPTTT_Voucher);

    return (
      <MyView style={styles.container} transparent>
        <MyText style={styles.label}>Phương thức thanh toán</MyText>
        <MyView style={styles.content}>
          <MyView transparent style={styles.contentItem}>
            <MyText style={styles.textLeft}>Tiền mặt</MyText>
            {isLoadingPTTT ? (
              <MyLoading style={styles.loading} />
            ) : (
              <MyText style={styles.textRight}>{tien_mat}</MyText>
            )}
          </MyView>
          <ItemLineIndicatorCustom lineStyle={styles.line} />
          <MyView transparent style={styles.contentItem}>
            <MyText style={styles.textLeft}>Chuyển khoản</MyText>
            {isLoadingPTTT ? (
              <MyLoading style={styles.loading} />
            ) : (
              <MyText style={styles.textRight}>{chuyen_khoan}</MyText>
            )}
          </MyView>
          <ItemLineIndicatorCustom lineStyle={styles.line} />
          <MyView transparent style={styles.contentItem}>
            <MyText style={styles.textLeft}>Thẻ</MyText>
            {isLoadingPTTT ? (
              <MyLoading style={styles.loading} />
            ) : (
              <MyText style={styles.textRight}>{the}</MyText>
            )}
          </MyView>
          <ItemLineIndicatorCustom lineStyle={styles.line} />
          <MyView transparent style={styles.contentItem}>
            <MyText style={styles.textLeft}>Điểm</MyText>
            {isLoadingPTTT ? (
              <MyLoading style={styles.loading} />
            ) : (
              <MyText style={styles.textRight}>{diem}</MyText>
            )}
          </MyView>
          <ItemLineIndicatorCustom lineStyle={styles.line} />
          <MyView transparent style={styles.contentItem}>
            <MyText style={styles.textLeft}>Voucher</MyText>
            {isLoadingPTTT ? (
              <MyLoading style={styles.loading} />
            ) : (
              <MyText style={styles.textRight}>{voucher}</MyText>
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
  textRight: {fontSize: MY_SIZE.s_16}
});

const mapPropsToState = (rootState: RootState) => {
  const {
    tongPTTT_TiemMat,
    tongPTTT_ChuyenKhoan,
    tongPTTT_The,
    tongPTTT_Diem,
    tongPTTT_Voucher,
    isLoadingPTTT
  } = rootState.BCCuoiNgayReducer;

  return {
    tongPTTT_TiemMat,
    tongPTTT_ChuyenKhoan,
    tongPTTT_The,
    tongPTTT_Diem,
    tongPTTT_Voucher,
    isLoadingPTTT
  };
};

// const mapDispatchToProps = (dispatch: any) => {
//   return bindActionCreators(
//     {
//     },
//     dispatch
//   );
// };

export default connect(mapPropsToState, null)(PhuongThucThanhToan);
