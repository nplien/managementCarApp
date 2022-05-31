/* eslint-disable react-native/no-inline-styles */
import React, {Component, PureComponent} from 'react';
import {StyleSheet, Modal, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {COLOR, MY_SIZE, setPadding, setRadius} from 'bases/styles/Core';
import {MyButton, MyIcon, MyText, MyView} from 'bases/components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {ItemLineIndicator} from 'views/app/components/items';
import {IPersonalState} from 'views/personals/redux';
import {setStoreChuyenDiExport, setStoreNhapVeExport, IExportOrderState} from '../../redux';

interface IProps extends IExportOrderState, IPersonalState {
  setStoreNhapVeExport: typeof setStoreNhapVeExport;
  setStoreChuyenDiExport: typeof setStoreChuyenDiExport;
}

interface IStates {
  isVisible: boolean;
}

interface IPropsStore {
  isSelected: boolean;
  store: any;
  addStoreSelected: (store: any) => void;
}

interface IStatesStore {
  isSelected: boolean;
}
class StoreItem extends Component<IPropsStore, IStatesStore> {
  constructor(props: IPropsStore) {
    super(props);
    this.state = {isSelected: props.isSelected};
  }

  onSelectStore = (store: any) => {
    this.setState({
      isSelected: !this.state.isSelected
    });

    this.props.addStoreSelected(store);
  };

  render() {
    let {store} = this.props;
    return (
      <MyButton
        onPress={() => this.onSelectStore(store)}
        style={{
          backgroundColor: COLOR.BG.WHITE,
          flexDirection: 'row',
          alignItems: 'center',
          ...setPadding(MY_SIZE.s_14, MY_SIZE.s_14, MY_SIZE.s_16, MY_SIZE.s_16)
        }}>
        <MyText
          myFontStyle="Regular"
          style={{
            flex: 1,
            fontSize: MY_SIZE.s_16
          }}>
          {store.name}
        </MyText>
        <MyIcon
          name="check"
          iconFontType="AntDesign"
          size={22}
          color={this.state.isSelected ? COLOR.TEXT.BLUE : COLOR.TEXT.WHITE}
        />
      </MyButton>
    );
  }
}
class ChiNhanhModal extends PureComponent<IProps, IStates> {
  state = {isVisible: false};
  isChuyenDi?: boolean;
  isNhapVe?: boolean;
  arrStoreSelected: any = [];

  onShow = (isChuyenDi: boolean, isNhapVe: boolean) => {
    this.arrStoreSelected = [];
    const {arrStoreNhapVe, arrStoreChuyenDi} = this.props;
    this.isChuyenDi = isChuyenDi;
    this.isNhapVe = isNhapVe;
    if (this.isChuyenDi) {
      if (arrStoreChuyenDi) {
        this.arrStoreSelected = arrStoreChuyenDi;
      }
    } else if (this.isNhapVe) {
      if (arrStoreNhapVe) {
        this.arrStoreSelected = arrStoreNhapVe;
      }
    }
    this.setState({
      isVisible: true
    });
  };

  onHide = () => {
    this.setState({
      isVisible: false
    });
  };

  onSelectStore = (store: any) => {
    let found = this.arrStoreSelected.findIndex((x: any) => x.id === store.id);
    if (found > -1) {
      this.arrStoreSelected.splice(found, 1);
    } else {
      this.arrStoreSelected.push(store);
    }
  };

  submit = () => {
    if (this.isChuyenDi) {
      this.props.setStoreChuyenDiExport(this.arrStoreSelected);
    } else if (this.isNhapVe) {
      this.props.setStoreNhapVeExport(this.arrStoreSelected);
    }

    this.onHide();
  };

  render() {
    const {isVisible} = this.state;
    const {arrStoreNhapVe, arrStoreChuyenDi, infoPersonal} = this.props;
    return (
      <Modal
        visible={isVisible}
        transparent
        // supportedOrientations={['portrait', 'landscape']}
        animationType="slide"
        hardwareAccelerated
        onRequestClose={this.onHide}>
        {/* <SafeAreaView edges={['left', 'bottom', 'right']} style={styles.container}> */}
        <MyView style={styles.container2}>
          <MyButton
            style={styles.containerToolbar}
            transparent
            onPress={this.onHide}
            activeOpacity={1}
          />

          <MyView style={styles.content}>
            <MyButton style={styles.btnTitle} transparent onPress={this.onHide}>
              <MyText myFontStyle="Regular" style={styles.titleLeft}>
                {'Huỷ bỏ'}
              </MyText>
            </MyButton>
            <MyView style={styles.btnTitle2} transparent>
              <MyText myFontStyle="Bold" style={styles.title}>
                {'Chọn chi nhánh'}
              </MyText>
            </MyView>
            <MyButton style={styles.btnTitle} transparent onPress={this.submit}>
              <MyText myFontStyle="Regular" style={[styles.titleRight, {color: COLOR.TEXT.BLUE}]}>
                {'Áp dụng'}
              </MyText>
            </MyButton>
          </MyView>
          <MyView style={styles.line} />
          <FlatList
            style={styles.modalContainer}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={infoPersonal && infoPersonal.stores}
            extraData={infoPersonal && infoPersonal.stores}
            keyExtractor={item => item.id + ''}
            ItemSeparatorComponent={() => <ItemLineIndicator />}
            renderItem={({item}) => {
              let isSelected = false;
              if (this.isChuyenDi) {
                if (arrStoreChuyenDi) {
                  if (arrStoreChuyenDi.findIndex((x: any) => x.id === item.id) > -1) {
                    isSelected = true;
                  }
                }
              } else if (this.isNhapVe) {
                if (arrStoreNhapVe) {
                  if (arrStoreNhapVe.findIndex((x: any) => x.id === item.id) > -1) {
                    isSelected = true;
                  }
                }
              }
              return (
                <StoreItem
                  isSelected={isSelected}
                  store={item}
                  addStoreSelected={(store: any) => {
                    this.onSelectStore(store);
                  }}
                />
              );
            }}
          />
          <SafeAreaView edges={['left', 'bottom', 'right']} style={styles.container} />
        </MyView>
        {/* </SafeAreaView> */}
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.BG.WHITE
  },
  container2: {
    flex: 1,
    backgroundColor: COLOR.BG.BLACK_30
  },
  containerToolbar: {
    height: MY_SIZE.s_75
  },
  content: {
    ...setRadius(MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_0, MY_SIZE.s_0),
    height: MY_SIZE.s_46,
    backgroundColor: COLOR.BG.WHITE,
    flexDirection: 'row'
  },
  btnTitle: {
    flex: 1,
    height: '100%',
    justifyContent: 'center'
  },
  btnTitle2: {
    flex: 2,
    height: '100%',
    justifyContent: 'center'
  },
  titleLeft: {
    fontSize: MY_SIZE.s_16,
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_0),
    color: COLOR.TEXT.BLUE,
    textAlign: 'left'
  },
  title: {
    fontSize: MY_SIZE.s_18,
    textAlign: 'center'
  },
  titleRight: {
    fontSize: MY_SIZE.s_16,
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16),
    color: COLOR.TEXT.BLUE,
    textAlign: 'right'
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLOR.BG.WHITE
  },
  line: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLOR.TEXT.PRIMARY
  }
});

const mapStateToProps = (state: RootState) => {
  let {infoPersonal} = state.PersonalReducer;
  let {arrStoreChuyenDi, arrStoreNhapVe} = state.ExportOrderReducer;
  return {arrStoreChuyenDi, arrStoreNhapVe, infoPersonal};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      setStoreNhapVeExport,
      setStoreChuyenDiExport
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(
  ChiNhanhModal
);
