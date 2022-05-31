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
    const {infoPersonal, arrChiNhanhDaChonDashBoard} = this.props;

    let title = '';

    if (arrChiNhanhDaChonDashBoard && arrChiNhanhDaChonDashBoard.length) {
      if (arrChiNhanhDaChonDashBoard.length === infoPersonal?.stores?.length) {
        title = 'Tất cả chi nhánh';
      } else if (arrChiNhanhDaChonDashBoard.length === 1) {
        title = arrChiNhanhDaChonDashBoard[0].name || '1 chi nhánh';
      } else {
        title = 'Nhiều chi nhánh';
      }
    } else {
      title = 'Tất cả chi nhánh';
    }

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
