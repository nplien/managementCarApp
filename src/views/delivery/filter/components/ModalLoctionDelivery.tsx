import * as React from 'react';
import {View, Modal, FlatList, StyleSheet} from 'react-native';
import {MyView, MyButton, MyText, MyIcon} from 'bases/components';
import {ItemLineIndicator} from 'views/app/components/items';
import {SafeAreaView} from 'react-native-safe-area-context';
import Utilities from 'utils/Utilities';
import {LocationApi} from 'services/LocationApi';
import {setProvincesCityDelivery} from '../redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {connect} from 'react-redux';
import {ILocation} from 'models/Localtion.Model';
import {COLOR, MY_SIZE, setPadding, setRadius} from 'bases/styles/Core';

interface IProps {
  provincesCity?: [
    {
      code: string;
      name: string;
    }
  ];
  setProvincesCityDelivery: typeof setProvincesCityDelivery;
}

interface IAppState {
  isModal: boolean;
  arrModal: ILocation[];
}
class ModalLocation extends React.Component<IProps, IAppState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isModal: false,
      arrModal: []
    };
  }
  showHideModal = () => {
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
          arrModal: response.data ? response.data : []
        });
      } else {
        Utilities.showToast(response?.message);
      }
    } catch (error) {
      Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
      Utilities.logException('ModalCreatorCustomer', error);
    }
  };

  renderItemLocation = ({item}: any) => {
    const {name, code} = item;
    const {provincesCity} = this.props;
    let checkValue = null;
    if (provincesCity && provincesCity?.length > 0) {
      checkValue = provincesCity.map(value => {
        if (value.code === code) {
          return <MyIcon iconFontType="AntDesign" name="check" size={22} color={COLOR.TEXT.BLUE} />;
        }
      });
    }
    return (
      <MyButton
        onPress={() => {
          this.props.setProvincesCityDelivery({code, name});
          this.hideModal();
        }}
        style={styles.textModal}>
        <MyText myFontStyle="Regular" style={styles.text}>
          {name}
        </MyText>
        {checkValue ? checkValue : null}
      </MyButton>
    );
  };
  render() {
    const {arrModal} = this.state;
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
            <FlatList
              style={styles.modalContainer}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={arrModal}
              extraData={arrModal}
              initialNumToRender={10}
              renderItem={this.renderItemLocation}
              keyExtractor={(_item, index) => String(index)}
              ItemSeparatorComponent={() => <ItemLineIndicator />}
            />

            <SafeAreaView edges={['left', 'bottom', 'right']} style={styles.container3} />
          </MyView>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container2: {
    flex: 1,
    backgroundColor: COLOR.BG.BLACK_30
  },
  container3: {backgroundColor: COLOR.BG.WHITE},
  modalContainer: {
    flex: 1,
    backgroundColor: COLOR.BG.WHITE
  },
  title: {
    fontSize: MY_SIZE.s_18,
    textAlign: 'center'
  },
  line: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLOR.TEXT.PRIMARY
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
  text: {
    flex: 1,
    fontSize: MY_SIZE.s_16
  },
  textModal: {
    backgroundColor: COLOR.BG.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_14, MY_SIZE.s_14, MY_SIZE.s_16, MY_SIZE.s_16)
  }
});
const mapStateToProps = (state: RootState) => {
  let {provincesCity} = state.FilterDeliveryReducer;
  return {provincesCity};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setProvincesCityDelivery}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(
  ModalLocation
);
