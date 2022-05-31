import {MyButton, MyText, MyView} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import React, {PureComponent} from 'react';
import {ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {thanhToanStyles} from './styles/ThanhToanBanHang.Styles';

import GiamGia from './components/GiamGia';
import KhachThanhToan from './components/KhachThanhToan';
import {ItemLineIndicator} from 'views/app/components/items';
import GiaoHang from './components/GiaoHang';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {thanhToan} from './redux';
import TongTienHang from './components/TongTienHang';
import PhiGiaoHang from './components/PhiGiaoHang';
import KhachCanTra from './components/KhachCanTra';
import KhachThuaTien from './components/KhachThuaTien';

interface IProps {
  thanhToan: typeof thanhToan;
}

class ThanhToanBanHang extends PureComponent<IProps> {
  render() {
    return (
      <MyView style={thanhToanStyles.container}>
        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          style={thanhToanStyles.container}
          showsVerticalScrollIndicator={false}>
          <TongTienHang />
          <ItemLineIndicator />
          <GiamGia />
          <ItemLineIndicator />
          <PhiGiaoHang />
          <KhachCanTra />
          <ItemLineIndicator />
          <KhachThanhToan />
          <KhachThuaTien />
          <GiaoHang />
        </ScrollView>
        <SafeAreaView edges={['left', 'bottom', 'right']}>
          <MyButton style={thanhToanStyles.btnBottomView} onPress={() => this.props.thanhToan()}>
            <MyText myFontStyle="Bold" style={{color: COLOR.TEXT.WHITE}}>
              Hoàn thành
            </MyText>
          </MyButton>
        </SafeAreaView>
      </MyView>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      thanhToan
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(ThanhToanBanHang);
