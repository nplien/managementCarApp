import * as React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {MyView, MyText, MyIcon} from 'bases/components';
import {COLOR, setPadding, setRadius, setMargin, MY_SIZE} from 'bases/styles/Core';
import {RootState} from 'views/app/redux/App.Reducer';
import {IDashboardState} from 'views/dashboard/redux';
import Utilities from 'utils/Utilities';
import {bindActionCreators} from 'redux';

interface IProps extends IDashboardState {}

class ViewHangTon extends React.Component<IProps> {
  render() {
    const {tongSoSanPhamTonKho, tongGiaTriSanPhamTonKho, isLoadingTonKhoSP} = this.props;
    return (
      <MyView style={styles.container}>
        <MyView style={{flex: 1}}>
          <MyText style={{fontSize: MY_SIZE.s_14}} myFontStyle="Bold">
            Tồn kho
          </MyText>
          {isLoadingTonKhoSP ? (
            <ActivityIndicator size={'small'} style={{alignSelf: 'baseline'}} />
          ) : (
            <MyText style={{fontSize: MY_SIZE.s_12}}>
              <MyText style={{fontSize: MY_SIZE.s_14, color: COLOR.TEXT.BLUE}} myFontStyle="Bold">
                {Utilities.convertCount(tongSoSanPhamTonKho)}
              </MyText>{' '}
              sản phẩm
            </MyText>
          )}
        </MyView>
        {isLoadingTonKhoSP ? (
          <ActivityIndicator size={'small'} style={{alignSelf: 'baseline'}} />
        ) : (
          <MyText style={{color: COLOR.TEXT.BLUE, fontSize: MY_SIZE.s_18}} myFontStyle="Bold">
            {Utilities.convertCurrency(tongGiaTriSanPhamTonKho)}
          </MyText>
        )}

        <MyIcon
          iconFontType="MaterialIcons"
          name="keyboard-arrow-right"
          size={24}
          color={COLOR.BG.WHITE}
        />
      </MyView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0),
    alignItems: 'center',
    flexDirection: 'row',
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_8),
    ...setRadius(0, 0, 16, 16)
  }
});
const mapStateToProps = (state: RootState) => {
  const {tongSoSanPhamTonKho, tongGiaTriSanPhamTonKho, isLoadingTonKhoSP} = state.DashboardReducer;
  return {tongSoSanPhamTonKho, tongGiaTriSanPhamTonKho, isLoadingTonKhoSP};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(ViewHangTon);
