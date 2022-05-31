import React, {Component, PureComponent} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLOR, MY_SIZE, setPadding, setRadius} from 'bases/styles/Core';
import {MyButton, MyIcon, MyText, MyView} from 'bases/components';
import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {ItemLineIndicator} from 'views/app/components/items';
import {IPersonalState} from 'views/personals/redux';
import {IStorePerson} from 'models/ModelBase';
import MyNavigator from 'utils/MyNavigator';
import {IAppNavigateProps} from 'views/app';

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

type IProps = IAppNavigateProps<'MyStoreMultiplePicker'> & IPersonalState;

interface IStates {
  arrStoreDaChon: IStorePerson[];
  isApDung: boolean;
}

class MyStoreMultiplePicker extends PureComponent<IProps> {
  state: IStates = {arrStoreDaChon: [], isApDung: true};

  componentDidMount() {
    const {infoPersonal} = this.props;
    const {storeDaChon} = this.props.route.params;
    if (storeDaChon?.length === infoPersonal?.stores?.length) {
      let data: IStorePerson[] = [{id: 'TAT_CA', name: 'Tất cả'}];
      data = data.concat(infoPersonal?.stores || []);

      this.setState({
        arrStoreDaChon: data
      });
    } else {
      this.setState({
        arrStoreDaChon: [...storeDaChon]
      });
    }
  }

  onHide = () => {
    MyNavigator.goBack();
  };

  onSelectStore = (store: IStorePerson) => {
    const {infoPersonal} = this.props;
    const {arrStoreDaChon} = this.state;

    if (store.id === 'TAT_CA') {
      let found = arrStoreDaChon.findIndex((x: IStorePerson) => x.id === store.id);
      if (found > -1) {
        this.setState({
          arrStoreDaChon: [],
          isApDung: false
        });
      } else {
        let data: IStorePerson[] = [{id: 'TAT_CA', name: 'Tất cả'}];
        data = data.concat(infoPersonal?.stores || []);

        this.setState({
          arrStoreDaChon: data,
          isApDung: true
        });
      }
    } else {
      let found = arrStoreDaChon.findIndex((x: IStorePerson) => x.id === store.id);
      if (found > -1) {
        arrStoreDaChon.splice(found, 1);

        let foundAll = arrStoreDaChon.findIndex((x: IStorePerson) => x.id === 'TAT_CA');
        if (foundAll > -1) {
          arrStoreDaChon.splice(foundAll, 1);
        }
      } else {
        arrStoreDaChon.push(store);
        if (arrStoreDaChon.length === infoPersonal?.stores?.length) {
          arrStoreDaChon.unshift({id: 'TAT_CA', name: 'Tất cả'});
        }
      }
      this.setState({
        arrStoreDaChon: [...arrStoreDaChon],
        isApDung: arrStoreDaChon.length > 0
      });
    }
  };

  submit = () => {
    const {arrStoreDaChon} = this.state;
    let foundAll = arrStoreDaChon.findIndex((x: IStorePerson) => x.id === 'TAT_CA');
    if (foundAll > -1) {
      arrStoreDaChon.splice(foundAll, 1);
    }
    this.props.route.params.onApDung(arrStoreDaChon);
    MyNavigator.goBack();
  };

  renderItem = ({item}: {item: IStorePerson}) => {
    const {arrStoreDaChon} = this.state;
    let isSelected = false;
    if (arrStoreDaChon.findIndex((x: IStorePerson) => x.id === item.id) > -1) {
      isSelected = true;
    }

    return <StoreItem isSelected={isSelected} store={item} addStoreSelected={this.onSelectStore} />;
  };

  keyExtractor = (_item: IStorePerson, index: number) => {
    return 'StoreMultiple-' + index;
  };

  renderItemSeparatorComponent = () => {
    return <ItemLineIndicator />;
  };

  render() {
    const {isApDung} = this.state;
    const {infoPersonal} = this.props;

    let data: IStorePerson[] = [{id: 'TAT_CA', name: 'Tất cả'}];
    data = data.concat(infoPersonal?.stores || []);

    return (
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
          <MyButton style={styles.btnTitle} transparent onPress={this.submit} disabled={!isApDung}>
            <MyText
              myFontStyle="Regular"
              style={[
                styles.titleRight,
                {color: isApDung ? COLOR.TEXT.BLUE : COLOR.TEXT.SECONDARY}
              ]}>
              {'Áp dụng'}
            </MyText>
          </MyButton>
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
          keyExtractor={this.keyExtractor}
          ItemSeparatorComponent={this.renderItemSeparatorComponent}
        />
        <SafeAreaView edges={['left', 'bottom', 'right']} style={styles.container} />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {infoPersonal} = state.PersonalReducer;
  return {infoPersonal};
};

export default connect(mapStateToProps, null, null, {forwardRef: true})(MyStoreMultiplePicker);

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
