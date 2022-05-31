import {MyView, MyText, MyIcon, MyButton} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import {IStoreModel} from 'models/Store.Model';
import React, {createRef, PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {IResponse} from 'services/ClientAPI';
import {ManagerAPI} from 'services/Manager.Api';
import {RootState} from 'views/app/redux/App.Reducer';
import {IChooseStoreState} from 'views/menuLeft/redux';
import {IInforShippingState} from '../redux';
import {setStoreInforShip} from '../redux/InforShipping.Reducer';
import {inforShipStyles} from '../style/InforShipping.Styles';
import ModalStoreShip from './ModalStoreShip';
interface IProps extends IChooseStoreState, IInforShippingState {
  setStoreInforShip: typeof setStoreInforShip;
}
class ViewStoreShip extends PureComponent<IProps> {
  chiNhanhModalRef: any = createRef();

  async componentDidMount() {
    const {storeInforShip, cuaHangDangChon} = this.props;
    if (!storeInforShip && cuaHangDangChon && cuaHangDangChon.id) {
      const response: IResponse<IStoreModel | null> = await ManagerAPI.getDetailStores(
        cuaHangDangChon.id.toString()
      );
      if (response && response.data) {
        this.props.setStoreInforShip(response.data);
      }
    }
  }

  showChiNhanhModal = () => {
    this.chiNhanhModalRef.current.onShow();
  };

  render() {
    const {storeInforShip} = this.props;
    return (
      <MyView style={{backgroundColor: COLOR.BG.SECONDARY}}>
        <MyView style={inforShipStyles.headerTitleShip}>
          <MyText myFontStyle={'Medium'}>Địa chỉ lấy hàng</MyText>
          <MyButton
            transparent
            onPress={this.showChiNhanhModal}
            style={inforShipStyles.btnTitleShip}>
            <MyIcon iconFontType="MaterialIcons" name="location-on" size={20} />
          </MyButton>
        </MyView>

        <MyView style={inforShipStyles.viewAddress}>
          <MyIcon iconFontType="MaterialIcons" name="location-on" size={20} />
          <MyText style={inforShipStyles.txtinfor}>
            {storeInforShip?.name} , {storeInforShip?.address || ''}
          </MyText>
        </MyView>

        <MyView style={inforShipStyles.viewAddress2}>
          <MyIcon iconFontType="Entypo" name="phone" size={20} />
          <MyText style={inforShipStyles.txtinfor}>{storeInforShip?.phone || '-'}</MyText>
        </MyView>
        <ModalStoreShip ref={this.chiNhanhModalRef} />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {cuaHangDangChon} = state.ChooseStoreReducer;
  const {storeInforShip} = state.InforShippingReducer;
  return {cuaHangDangChon, storeInforShip};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setStoreInforShip}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(ViewStoreShip);
