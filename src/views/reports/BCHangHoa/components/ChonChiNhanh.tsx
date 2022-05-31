import {MyButton, MyIcon, MyText} from 'bases/components';
import React, {createRef, PureComponent} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {IBCHangHoaState, changeChiNhanhBCHH, getListBCHangHoa} from '../redux';
import {locThoiGianStyles} from '../styles/BCHangHoa.Styles';
// import MyStoreMultiplePicker from 'views/app/components/customs/MyStoreMultiplePicker';
import {IPersonalState} from 'views/personals/redux';
import {IStorePerson} from 'models/ModelBase';
import MyNavigator from 'utils/MyNavigator';

interface IProps extends Partial<IBCHangHoaState>, IPersonalState {
  changeChiNhanhBCHH: typeof changeChiNhanhBCHH;
  getListBCHangHoa: typeof getListBCHangHoa;
}

class ChonChiNhanh extends PureComponent<IProps> {
  chiNhanhModalRef: any = createRef();

  showChiNhanhModal = () => {
    const {arrChiNhanhDaChonBCHH} = this.props;
    // this.chiNhanhModalRef.current.onShow(arrChiNhanhDaChonBCHH);
    MyNavigator.pushModal('MyStoreMultiplePicker', {
      storeDaChon: arrChiNhanhDaChonBCHH || [],
      onApDung: (arr: IStorePerson[]) => {
        this.apDungChiNhanh(arr);
      }
    });
  };

  apDungChiNhanh = (arr: IStorePerson[]) => {
    this.props.changeChiNhanhBCHH(arr);
    this.props.getListBCHangHoa();
  };

  render() {
    const {infoPersonal, arrChiNhanhDaChonBCHH} = this.props;
    let title = '';

    if (arrChiNhanhDaChonBCHH && arrChiNhanhDaChonBCHH.length) {
      if (arrChiNhanhDaChonBCHH.length === infoPersonal?.stores?.length) {
        title = 'Tất cả chi nhánh';
      } else if (arrChiNhanhDaChonBCHH.length === 1) {
        title = arrChiNhanhDaChonBCHH[0].name || '1 chi nhánh';
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
  const {arrChiNhanhDaChonBCHH} = state.BCHangHoaReducer;
  return {infoPersonal, arrChiNhanhDaChonBCHH};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      changeChiNhanhBCHH,
      getListBCHangHoa
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ChonChiNhanh);
