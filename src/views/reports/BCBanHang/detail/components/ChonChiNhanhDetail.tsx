import {MyButton, MyIcon, MyText} from 'bases/components';
import React, {createRef, PureComponent} from 'react';
import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';
// import MyStoreMultiplePicker from 'views/app/components/customs/MyStoreMultiplePicker';
import {IPersonalState} from 'views/personals/redux';
import {locThoiGianStyles} from '../../styles/BCBanHang.Styles';
import {IStorePerson} from 'models/ModelBase';
import MyNavigator from 'utils/MyNavigator';

interface IProps extends IPersonalState {
  store: IStorePerson[];
  chooseStore: (arr: IStorePerson[]) => void;
}
interface IState {
  arrChiNhanhDetail: IStorePerson[];
}
class ChonChiNhanhDetail extends PureComponent<IProps, IState> {
  chiNhanhModalRef: any = createRef();

  constructor(props: IProps) {
    super(props);
    const {store} = this.props;
    this.state = {
      arrChiNhanhDetail: store
    };
  }

  showChiNhanhModal = () => {
    const {arrChiNhanhDetail} = this.state;
    // this.chiNhanhModalRef.current.onShow(arrChiNhanhDetail);
    MyNavigator.pushModal('MyStoreMultiplePicker', {
      storeDaChon: arrChiNhanhDetail || [],
      onApDung: (arr: IStorePerson[]) => {
        this.apDungChiNhanh(arr);
      }
    });
  };

  apDungChiNhanh = (arr: IStorePerson[]) => {
    this.setState({arrChiNhanhDetail: arr});
    this.props.chooseStore(arr);
  };

  render() {
    const {infoPersonal} = this.props;
    const {arrChiNhanhDetail} = this.state;
    let title = '';
    if (arrChiNhanhDetail && arrChiNhanhDetail.length) {
      if (arrChiNhanhDetail.length === infoPersonal?.stores?.length) {
        title = 'Tất cả chi nhánh';
      } else if (arrChiNhanhDetail.length === 1) {
        title = arrChiNhanhDetail[0].name || '1 chi nhánh';
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

  return {infoPersonal};
};

export default connect(mapStateToProps, null)(ChonChiNhanhDetail);
