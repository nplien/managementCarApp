import * as React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {MyButton, MyIcon, MyText, MyView} from 'bases/components';
import {COLOR, MY_SIZE, setMargin, setPadding, setRadius} from 'bases/styles/Core';

import MenuContentStyle from '../styles/MenuContent.style';
import {chooseStore, IChooseStoreState} from '../redux';
import {getInfo, IPersonalState} from 'views/personals/redux';
import {IStorePerson} from 'models/ModelBase';
import MyNavigator from 'utils/MyNavigator';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {GetProductHangHoa, showRefreshHangHoa} from 'views/products/ProductHangHoa/redux';
import {GetProductBanHang, showRefreshBanHang} from 'views/banhang/ProductBanHang/redux';
import {RootState} from 'views/app/redux/App.Reducer';

interface IProps extends IChooseStoreState, IPersonalState {
  chooseStore: typeof chooseStore;
  getInfo: typeof getInfo;
  showRefreshHangHoa: typeof showRefreshHangHoa;
  GetProductHangHoa: typeof GetProductHangHoa;
  showRefreshBanHang: typeof showRefreshBanHang;
  GetProductBanHang: typeof GetProductBanHang;
}

type IAppState = {
  isModal: boolean;
  isLoading: boolean;
};

class MenuLeftHeaderModal extends React.Component<IProps, IAppState> {
  onHideModal = () => {
    MyNavigator.goBack();
  };

  render() {
    const {infoPersonal, cuaHangDangChon} = this.props;
    return (
      <MyView style={styles.container2}>
        <MyButton
          style={styles.containerToolbar}
          transparent
          onPress={this.onHideModal}
          activeOpacity={1}>
          {/* <MyView style={MenuContentStyle.viewLine} /> */}
        </MyButton>
        <MyView style={styles.viewTitleModal}>
          <MyButton
            style={styles.viewTitle}
            onPress={this.onHideModal}
            activeOpacity={1}
            transparent>
            <MyText myFontStyle="Medium" style={{fontSize: MY_SIZE.s_18}}>
              Huỷ bỏ
            </MyText>
          </MyButton>
          <MyView style={styles.titleModal}>
            <MyText myFontStyle="Medium" style={{fontSize: MY_SIZE.s_18}}>
              Chọn Chi Nhánh
            </MyText>
          </MyView>
          <MyView transparent style={styles.viewTitle} />
        </MyView>
        <ScrollView
          scrollEventThrottle={16}
          style={MenuContentStyle.contentStoreList}
          showsVerticalScrollIndicator={false}>
          {infoPersonal?.stores?.length &&
            infoPersonal?.stores?.map((item: IStorePerson, index: number) => (
              <MyView
                key={item.id || ''}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  backgroundColor:
                    item.id === cuaHangDangChon?.id ? 'rgba(190, 240, 255, 0.4)' : COLOR.TEXT.WHITE
                }}>
                <MyButton
                  key={index.toString()}
                  style={MenuContentStyle.viewSheetScrollView}
                  onPress={() => {
                    this.onHideModal();
                    this.props.chooseStore(item);
                    this.props.showRefreshBanHang(true);
                    this.props.GetProductBanHang();
                    this.props.showRefreshHangHoa(true);
                    this.props.GetProductHangHoa();
                  }}
                  transparent>
                  <MyText style={MenuContentStyle.textItemStore}>{item.name}</MyText>
                  <MyIcon
                    iconFontType="MaterialCommunityIcons"
                    name={'check'}
                    size={22}
                    style={[
                      MenuContentStyle.icon,
                      {
                        ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16),
                        color:
                          item.id === cuaHangDangChon?.id ? COLOR.TEXT.POSITIVE_BTN : COLOR.BG.WHITE
                      }
                    ]}
                  />
                </MyButton>
              </MyView>
            ))}
        </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuLeftHeaderModal);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.BG.WHITE
  },
  modalLine: {
    height: 1,
    backgroundColor: COLOR.TEXT.BLACK
  },
  tittleModal: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.BG.SECONDARY
  },
  textModal: {
    backgroundColor: COLOR.BG.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_14, MY_SIZE.s_14, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  container2: {
    flex: 1,
    backgroundColor: COLOR.BG.BLACK_30
  },
  containerToolbar: {
    height: MY_SIZE.s_135,
    justifyContent: 'flex-end'
  },
  viewTitleModal: {
    flexDirection: 'row',
    height: 56,
    alignItems: 'center',
    ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  viewTitle: {
    flex: 1,
    height: '100%',
    padding: MY_SIZE.s_16
  },
  titleModal: {
    flex: 2,
    height: '100%',
    padding: MY_SIZE.s_16,
    alignItems: 'center'
  },
  Modal: {
    flex: 1,
    margin: MY_SIZE.s_0
  }
});
