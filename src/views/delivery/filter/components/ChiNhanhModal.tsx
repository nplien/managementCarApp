import React, {Component, PureComponent} from 'react';
import {StyleSheet, Modal, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {COLOR, MY_SIZE, setMargin, setPadding} from 'bases/styles/Core';
import {MyButton, MyButtonText, MyIcon, MyText, MyToolbarPrimary, MyView} from 'bases/components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {ItemLineIndicator} from 'views/app/components/items';
import {IFilterDeliveryState, setStoreChuyenDi, setStoreNhapVe} from '../redux';
import {IPersonalState} from 'views/personals/redux';

interface IProps extends IFilterDeliveryState, IPersonalState {
  setStoreNhapVe: typeof setStoreNhapVe;
  setStoreChuyenDi: typeof setStoreChuyenDi;
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
          ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)
        }}>
        <MyText
          style={{
            flex: 1
          }}>
          {store.name}
        </MyText>
        <MyIcon
          name="checkmark-sharp"
          iconFontType="Ionicons"
          size={20}
          color={this.state.isSelected ? COLOR.TEXT.GREEN : COLOR.TEXT.WHITE}
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
      this.props.setStoreChuyenDi(this.arrStoreSelected);
    } else if (this.isNhapVe) {
      this.props.setStoreNhapVe(this.arrStoreSelected);
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
        supportedOrientations={['portrait', 'landscape']}
        animationType="slide"
        hardwareAccelerated
        style={{flex: 1, margin: 0}}
        onRequestClose={this.onHide}>
        <SafeAreaView edges={['left', 'bottom', 'right']} style={styles.container}>
          <MyView style={{flex: 1, backgroundColor: COLOR.BG.WHITE}}>
            <MyToolbarPrimary
              title={'titleToolbar'}
              isShowBtnLeft
              onPressLeft={this.onHide}
              iconLeftFontType="Ionicons"
              iconLeftProps={{name: 'md-close-sharp', color: 'black', size: 24}}
            />
            <FlatList
              data={infoPersonal?.stores || []}
              extraData={infoPersonal?.stores || []}
              keyExtractor={item => item.id + ''}
              ItemSeparatorComponent={() => <ItemLineIndicator />}
              renderItem={({item}) => {
                let isSelected = false;
                if (this.isChuyenDi) {
                  if (arrStoreChuyenDi) {
                    if (
                      arrStoreChuyenDi.findIndex(
                        (x: {id: string | number | undefined}) => x.id === item.id
                      ) > -1
                    ) {
                      isSelected = true;
                    }
                  }
                } else if (this.isNhapVe) {
                  if (arrStoreNhapVe) {
                    if (
                      arrStoreNhapVe.findIndex(
                        (x: {id: string | number | undefined}) => x.id === item.id
                      ) > -1
                    ) {
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
            <MyButtonText
              style={{...setMargin(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)}}
              title="Chọn"
              onPress={() => this.submit()}
            />
          </MyView>
        </SafeAreaView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.BG.WHITE
  }
});

const mapStateToProps = (state: RootState) => {
  let {infoPersonal} = state.PersonalReducer;
  let {arrStoreChuyenDi, arrStoreNhapVe} = state.FilterDeliveryReducer;
  return {infoPersonal, arrStoreChuyenDi, arrStoreNhapVe};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      setStoreNhapVe,
      setStoreChuyenDi
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(
  ChiNhanhModal
);
