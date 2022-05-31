import {MyView, MyButton, MyIcon, MyText, MyImage} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {IPersonalState, getInfo} from 'views/personals/redux';
import {chooseStore, IChooseStoreState} from '../redux';
import MenuContentStyle from '../styles/MenuContent.style';
import {bindActionCreators} from 'redux';
import {showRefreshHangHoa, GetProductHangHoa} from 'views/products/ProductHangHoa/redux';
import {GetProductBanHang, showRefreshBanHang} from 'views/banhang/ProductBanHang/redux';
import MyNavigator from 'utils/MyNavigator';

interface IProps extends IChooseStoreState, IPersonalState {
  chooseStore: typeof chooseStore;
  getInfo: typeof getInfo;
  showRefreshHangHoa: typeof showRefreshHangHoa;
  GetProductHangHoa: typeof GetProductHangHoa;
  showRefreshBanHang: typeof showRefreshBanHang;
  GetProductBanHang: typeof GetProductBanHang;
}

class MenuLeftHeader extends PureComponent<IProps> {
  versionOfCodepush: string = '';
  modalStoreHeaderRef: any;

  render() {
    const {cuaHangDangChon, infoPersonal} = this.props;
    if (!infoPersonal) {
      return <MyView />;
    }
    const store = cuaHangDangChon?.name;
    return (
      <MyView style={MenuContentStyle.viewheaderDrawer}>
        <MyView transparent style={MenuContentStyle.btnStore2}>
          <MyImage
            source={{
              uri: 'https://i.pinimg.com/564x/9c/be/bf/9cbebfffc5e36c54e017f211a76abbf6.jpg'
            }}
            style={MenuContentStyle.imageAvatar}
          />
          <MyView style={{flex: 1, justifyContent: 'center', marginTop: 16}} transparent>
            <MyText style={MenuContentStyle.textName}>{'Phương Liên cs1'}</MyText>
            <MyButton
              transparent
              onPress={() => {
                MyNavigator.pushModal('MenuLeftHeaderModal');
              }}
              style={MenuContentStyle.btnStore}>
              <MyText style={MenuContentStyle.txtStore}> {store} </MyText>
              <MyIcon
                name={'chevron-down'}
                iconFontType="MaterialCommunityIcons"
                size={22}
                style={MenuContentStyle.icon}
                color={COLOR.BG.BLACK}
              />
            </MyButton>
          </MyView>
        </MyView>
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {cuaHangDangChon} = state.ChooseStoreReducer;
  const {infoPersonal} = state.PersonalReducer;
  return {cuaHangDangChon, infoPersonal};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getInfo,
      chooseStore,
      showRefreshBanHang,
      GetProductBanHang,
      showRefreshHangHoa,
      GetProductHangHoa
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuLeftHeader);
