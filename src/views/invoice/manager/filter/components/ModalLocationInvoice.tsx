import * as React from 'react';
import {View, Modal, FlatList, StyleSheet} from 'react-native';
import {MyView, MyButton, MyText, MyIcon, MyLoading} from 'bases/components';
import {ItemLineIndicator} from 'views/app/components/items';
import {SafeAreaView} from 'react-native-safe-area-context';
import Utilities from 'utils/Utilities';
import {LocationApi} from 'services/LocationApi';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {connect} from 'react-redux';
import {ILocation} from 'models/Localtion.Model';
import {COLOR, MY_SIZE, setPadding, setRadius} from 'bases/styles/Core';
import {IInvoiceOrderState, setLocationCityInvoice} from 'views/invoice/manager/redux';

interface IProps extends IInvoiceOrderState {
  setLocationCityInvoice: typeof setLocationCityInvoice;
}

interface IAppState {
  isModal: boolean;
  arrModal: ILocation[];
  isFirstLoading: boolean;
}
class ModalLocationInvoice extends React.Component<IProps, IAppState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isModal: false,
      arrModal: [],
      isFirstLoading: true
    };
  }
  showModal = () => {
    this.setState({
      isModal: true
    });
    if (this.state.arrModal.length <= 0) {
      this.getListCity();
    }
  };
  hideModal = () => {
    this.setState({
      isModal: false
    });
  };

  getListCity = async () => {
    try {
      const response = await LocationApi.getListCity();
      if (response && response.code === 0) {
        this.setState({
          arrModal: response.data ? response.data : [],
          isFirstLoading: false
        });
      } else {
        Utilities.showToast(response?.message);
        this.setState({
          isFirstLoading: false
        });
      }
    } catch (error) {
      this.setState({
        isFirstLoading: false
      });
      Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
      Utilities.logException('ModalLocationInvoice', error);
    }
  };
  onPressItem(item: ILocation) {
    const {locationDaChon} = this.props;
    if (locationDaChon && locationDaChon.id === item.id) {
      this.props.setLocationCityInvoice(undefined);
      this.hideModal();
    } else {
      this.props.setLocationCityInvoice(item);
      this.hideModal();
    }
  }
  renderItemLocation = ({item}: {item: ILocation}) => {
    const {name, id} = item;
    const {locationDaChon} = this.props;
    let checkValue = null;
    if (locationDaChon && locationDaChon.id === id) {
      checkValue = (
        <MyIcon iconFontType="AntDesign" name="check" size={22} color={COLOR.TEXT.BLUE} />
      );
    }
    return (
      <MyButton
        onPress={() => {
          this.onPressItem(item);
        }}
        style={styles.textModal}>
        <MyText myFontStyle="Regular" style={styles.text}>
          {name}
        </MyText>
        {checkValue}
      </MyButton>
    );
  };
  render() {
    const {arrModal, isFirstLoading} = this.state;
    return (
      <View>
        <Modal
          visible={this.state.isModal}
          onRequestClose={this.hideModal}
          animationType="slide"
          hardwareAccelerated
          transparent>
          <MyView style={styles.container2}>
            <MyButton
              style={styles.containerToolbar}
              transparent
              onPress={this.hideModal}
              activeOpacity={1}
            />

            <MyView style={styles.content}>
              <MyButton style={styles.btnTitle} transparent onPress={this.hideModal}>
                <MyText myFontStyle="Regular" style={styles.titleLeft}>
                  {'Huỷ bỏ'}
                </MyText>
              </MyButton>
              <MyView style={styles.btnTitle2} transparent>
                <MyText myFontStyle="Bold" style={styles.title}>
                  {'Chọn Tỉnh/TP'}
                </MyText>
              </MyView>
              <MyText style={styles.btnTitle} />
            </MyView>
            <MyView style={styles.line} />
            {isFirstLoading ? (
              <MyLoading />
            ) : (
              <FlatList
                style={styles.modalContainer}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={arrModal}
                extraData={arrModal}
                initialNumToRender={10}
                renderItem={this.renderItemLocation}
                keyExtractor={(_item, index) => index.toString()}
                ItemSeparatorComponent={() => <ItemLineIndicator />}
              />
            )}
            <SafeAreaView edges={['left', 'bottom', 'right']} style={styles.container3} />
          </MyView>
        </Modal>
      </View>
    );
  }
}
const mapStateToProps = (state: RootState) => {
  let {locationDaChon} = state.InvoiceOrderReducer;
  return {locationDaChon};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setLocationCityInvoice}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(
  ModalLocationInvoice
);

const styles = StyleSheet.create({
  container3: {backgroundColor: COLOR.BG.WHITE},
  textModal: {
    backgroundColor: COLOR.BG.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_14, MY_SIZE.s_14, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLOR.BG.WHITE
  },
  text: {
    flex: 1
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
  line: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLOR.TEXT.PRIMARY
  }
});
