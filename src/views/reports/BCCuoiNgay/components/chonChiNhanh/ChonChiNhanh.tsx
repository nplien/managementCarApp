import {MyButton, MyIcon, MyText} from 'bases/components';
import React, {createRef, PureComponent} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {LocThoiGianStyle} from '../../styles/BaoCaoCuoiNgay.Style';
// import MyStoreMultiplePicker from 'views/app/components/customs/MyStoreMultiplePicker';

import {
  getTongKetBanHangBCCN,
  getTongKetThuChiBCCN,
  IBCCuoiNgayState,
  onChangeChiNhanhBCCN
} from '../../redux';
import {IPersonalState} from 'views/personals/redux';
import {IStorePerson} from 'models/ModelBase';
import MyNavigator from 'utils/MyNavigator';

interface IProps extends Partial<IBCCuoiNgayState>, IPersonalState {
  onChangeChiNhanhBCCN: typeof onChangeChiNhanhBCCN;
  getTongKetThuChiBCCN: typeof getTongKetThuChiBCCN;
  getTongKetBanHangBCCN: typeof getTongKetBanHangBCCN;
}

class ChonChiNhanh extends PureComponent<IProps> {
  chiNhanhModalRef: any = createRef();

  showChiNhanhModal = () => {
    const {arrChiNhanhDaChonBCCN} = this.props;
    // this.chiNhanhModalRef.current.onShow(arrChiNhanhDaChonBCCN);
    MyNavigator.pushModal('MyStoreMultiplePicker', {
      storeDaChon: arrChiNhanhDaChonBCCN || [],
      onApDung: (arr: IStorePerson[]) => {
        this.apDungChiNhanh(arr);
      }
    });
  };

  apDungChiNhanh = (arr: IStorePerson[]) => {
    this.props.onChangeChiNhanhBCCN(arr);
    this.props.getTongKetThuChiBCCN();
    this.props.getTongKetBanHangBCCN('TONG_KET_HOA_DON', 'retail');
    this.props.getTongKetBanHangBCCN('TONG_KET_DAT_HANG', 'order');
    this.props.getTongKetBanHangBCCN('TONG_KET_TRA_HANG', 'return');
  };

  render() {
    const {infoPersonal, arrChiNhanhDaChonBCCN} = this.props;
    let title = '';
    if (arrChiNhanhDaChonBCCN && arrChiNhanhDaChonBCCN.length) {
      if (arrChiNhanhDaChonBCCN.length === infoPersonal?.stores?.length) {
        title = 'Tất cả chi nhánh';
      } else if (arrChiNhanhDaChonBCCN.length === 1) {
        title = arrChiNhanhDaChonBCCN[0].name || '1 chi nhánh';
      } else {
        title = 'Nhiều chi nhánh';
      }
    } else {
      title = 'Tất cả chi nhánh';
    }

    return (
      <MyButton
        style={LocThoiGianStyle.viewTextHeader2}
        transparent
        onPress={this.showChiNhanhModal}>
        <MyIcon iconFontType="MaterialIcons" name="location-on" size={18} />
        <MyText numberOfLines={1} style={LocThoiGianStyle.title}>
          {title}
        </MyText>
        <MyIcon iconFontType="MaterialCommunityIcons" name="menu-down" size={18} />

        {/* <MyStoreMultiplePicker ref={this.chiNhanhModalRef} onApDung={this.apDungChiNhanh} /> */}
      </MyButton>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {arrChiNhanhDaChonBCCN} = state.BCCuoiNgayReducer;
  const {infoPersonal} = state.PersonalReducer;
  return {arrChiNhanhDaChonBCCN, infoPersonal};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {onChangeChiNhanhBCCN, getTongKetThuChiBCCN, getTongKetBanHangBCCN},
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ChonChiNhanh);
