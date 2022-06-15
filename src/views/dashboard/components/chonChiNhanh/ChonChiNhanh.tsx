import {MyButton, MyIcon, MyText} from 'bases/components';
import React, {createRef, PureComponent} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {
  getBCDH,
  getBCSP,
  changeChiNhanhDashBoard,
  IDashboardState,
  getDoanhThuTheoStorePieChartDashBoard,
  getDoanhThuTheoThoiGianStackBarDashBoard
} from '../../redux';
import {locThoiGianStyles} from '../../styles/DashBoard.styles';
// import MyStoreMultiplePicker from 'views/app/components/customs/MyStoreMultiplePicker';
import {IPersonalState} from 'views/personals/redux';
import {IStorePerson} from 'models/ModelBase';
import MyNavigator from 'utils/MyNavigator';

interface IProps extends IDashboardState, IPersonalState {
  changeChiNhanhDashBoard: typeof changeChiNhanhDashBoard;
  getDoanhThuTheoStorePieChartDashBoard: typeof getDoanhThuTheoStorePieChartDashBoard;
  getDoanhThuTheoThoiGianStackBarDashBoard: typeof getDoanhThuTheoThoiGianStackBarDashBoard;
  getBCSP: typeof getBCSP;
  getBCDH: typeof getBCDH;
  onSubmit: () => void;
}

class ChonChiNhanh extends PureComponent<IProps> {
  chiNhanhModalRef: any = createRef();

  showChiNhanhModal = () => {
    const {arrChiNhanhDaChonDashBoard} = this.props;
    // this.chiNhanhModalRef.current.onShow(arrChiNhanhDaChonDashBoard);
    MyNavigator.pushModal('MyStoreMultiplePicker', {
      storeDaChon: arrChiNhanhDaChonDashBoard || [],
      onApDung: (arr: IStorePerson[]) => {
        this.apDungChiNhanh(arr);
      }
    });
  };

  apDungChiNhanh = (arr: IStorePerson[]) => {
    this.props.changeChiNhanhDashBoard(arr);
    this.props.onSubmit();
  };

  render() {
    const {infoPersonal} = this.props;
    let title = infoPersonal?.stores && infoPersonal?.stores[0].name;

    return (
      <MyButton
        style={locThoiGianStyles.viewTextHeader2}
        transparent
        onPress={this.showChiNhanhModal}>
        <MyIcon iconFontType="MaterialIcons" name="location-on" size={18} />
        <MyText numberOfLines={1} style={locThoiGianStyles.title}>
          {title}
        </MyText>
        <MyIcon iconFontType="MaterialCommunityIcons" name="menu-down" size={18} />

        {/* <MyStoreMultiplePicker ref={this.chiNhanhModalRef} onApDung={this.apDungChiNhanh} /> */}
      </MyButton>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {infoPersonal} = state.PersonalReducer;
  const {arrChiNhanhDaChonDashBoard} = state.DashboardReducer;
  return {infoPersonal, arrChiNhanhDaChonDashBoard};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      changeChiNhanhDashBoard,
      getDoanhThuTheoStorePieChartDashBoard,
      getDoanhThuTheoThoiGianStackBarDashBoard,
      getBCSP,
      getBCDH
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ChonChiNhanh);
