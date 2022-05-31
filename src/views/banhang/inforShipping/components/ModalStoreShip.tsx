import React, {Component, PureComponent} from 'react';
import {StyleSheet, Modal, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {COLOR, MY_SIZE, setPadding, setRadius} from 'bases/styles/Core';
import {MyButton, MyIcon, MyText, MyView} from 'bases/components';
import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {ItemLineIndicator} from 'views/app/components/items';
import {IPersonalState} from 'views/personals/redux';
import {bindActionCreators} from 'redux';
import {setStoreInforShip, IInforShippingState, setObjectDTGH} from '../redux';
import {ManagerAPI} from 'services/Manager.Api';
import {IResponse} from 'services/ClientAPI';
import {IStoreModel} from 'models/Store.Model';
import {IStorePerson} from 'models/ModelBase';

interface IPropsStore {
  isSelected: boolean;
  store: IStorePerson;
  addStoreSelected: (store: IStorePerson) => void;
}

class StoreItem extends Component<IPropsStore> {
  onSelectStore = () => {
    this.props.addStoreSelected(this.props.store);
  };

  render() {
    const {store, isSelected} = this.props;

    return (
      <MyButton onPress={this.onSelectStore} style={itemStoretyles.content}>
        <MyText myFontStyle="Regular" style={itemStoretyles.text}>
          {store.name}
        </MyText>
        <MyIcon
          name="check"
          iconFontType="AntDesign"
          size={22}
          color={isSelected ? COLOR.TEXT.BLUE : COLOR.TEXT.WHITE}
        />
      </MyButton>
    );
  }
}

interface IProps extends IPersonalState, IInforShippingState {
  setStoreInforShip: typeof setStoreInforShip;
  setObjectDTGH: typeof setObjectDTGH;
}

interface IStates {
  isVisible: boolean;
  data: IStorePerson[];
}

class ModalStoreShip extends PureComponent<IProps, IStates> {
  state = {isVisible: false, data: []};

  onShow = () => {
    this.setState({
      isVisible: true
    });
  };

  onHide = () => {
    this.setState({
      isVisible: false
    });
  };

  onSelectStore = async (store: IStorePerson) => {
    this.onHide();
    if (store.id) {
      const response: IResponse<IStoreModel | null> = await ManagerAPI.getDetailStores(
        store.id.toString()
      );
      if (response && response.data) {
        this.props.setStoreInforShip(response.data);
        this.props.setObjectDTGH(undefined);
      }
    }
  };

  renderItem = ({item}: {item: IStorePerson}) => {
    let isSelected = false;
    const {storeInforShip} = this.props;
    if (storeInforShip?.id === item.id) {
      isSelected = true;
    }
    return <StoreItem isSelected={isSelected} store={item} addStoreSelected={this.onSelectStore} />;
  };

  renderItemSeparatorComponent = () => {
    return <ItemLineIndicator />;
  };

  componentDidMount() {
    ManagerAPI.getListIStorePerson({skip: 0, limit: 50}).then(result => {
      this.setState({
        data: result.data || []
      });
    });
  }

  render() {
    const {isVisible, data} = this.state;

    return (
      <Modal
        visible={isVisible}
        transparent
        animationType="slide"
        hardwareAccelerated
        onRequestClose={this.onHide}>
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
            <MyText style={styles.btnTitle} />
          </MyView>
          <MyView style={styles.line} />

          <FlatList
            style={styles.modalContainer}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={data}
            extraData={data}
            initialNumToRender={10}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={this.renderItemSeparatorComponent}
          />
          <SafeAreaView edges={['left', 'bottom', 'right']} style={styles.container} />
        </MyView>
      </Modal>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {storeInforShip} = state.InforShippingReducer;
  return {storeInforShip};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setStoreInforShip, setObjectDTGH}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(
  ModalStoreShip
);

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

const itemStoretyles = StyleSheet.create({
  text: {
    flex: 1,
    fontSize: MY_SIZE.s_16
  },
  content: {
    backgroundColor: COLOR.BG.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_14, MY_SIZE.s_14, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  content2: {
    backgroundColor: COLOR.BG.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_14, MY_SIZE.s_14, MY_SIZE.s_0, MY_SIZE.s_16)
  }
});
