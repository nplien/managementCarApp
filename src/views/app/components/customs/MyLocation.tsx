import * as React from 'react';
import {StyleSheet, Modal, FlatList} from 'react-native';
import {ILocation} from 'models/Localtion.Model';
import {LocationApi} from 'services/LocationApi';
import Utilities from 'utils/Utilities';
import {LOCATION} from 'common/Constants';
import {MyButton, MyIcon, MyLoading, MyText, MyView} from 'bases/components';
import {COLOR, MY_SIZE, setPadding, setRadius} from 'bases/styles/Core';
import {ItemLineIndicator} from '../items';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IProvince} from 'models/ModelBase';

interface IProps {
  valueModal: (location: IProvince, nameLocation: string) => void;
  refModal?: any;
}

interface IAppState {
  isModal: boolean;
  arrModal: ILocation[];
  codeMS: string[];
  nameLocation: string;
  isLoading: boolean;
}

export default class MyLocation extends React.Component<IProps, IAppState> {
  ClearTime: any;
  constructor(props: IProps) {
    super(props);
    this.state = {
      isModal: false,
      arrModal: [],
      codeMS: [],
      nameLocation: '',
      isLoading: true
    };
  }

  getListCity = async () => {
    try {
      const response = await LocationApi.getListCity();
      if (response && !response?.code) {
        this.setState({
          arrModal: response.data ? response.data : [],
          isLoading: false
        });
      } else {
        Utilities.showToast(response?.message);
        this.setState({
          isLoading: false
        });
      }
    } catch (error) {
      Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
      this.setState({
        isLoading: false
      });
      Utilities.logException('ModalLocation-City', error);
    }
  };
  /**
   * id cua City
   */
  getListDistrict = async (id?: string) => {
    try {
      const response = await LocationApi.getListDistrict(id);
      if (response && !response?.code) {
        this.setState({
          arrModal: response.data ? response.data : [],
          isLoading: false
        });
      } else {
        Utilities.showToast(response?.message);
        this.setState({
          isLoading: false
        });
      }
    } catch (error) {
      Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
      this.setState({
        isLoading: false
      });
      Utilities.logException('ModalLocation-District', error);
    }
  };
  /**
   * id cua District
   */
  getListWard = async (id?: string) => {
    try {
      const response = await LocationApi.getListWard(id);
      if (response && !response?.code) {
        this.setState({
          arrModal: response.data ? response.data : [],
          isLoading: false
        });
      } else {
        Utilities.showToast(response?.message);
        this.setState({
          isLoading: false
        });
      }
    } catch (error) {
      Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
      this.setState({
        isLoading: false
      });
      Utilities.logException('ModalLocation-Ward', error);
    }
  };
  /**
   * NOTE codeMS:id của tỉnh,huyện hoặc xã
   */
  showHideModal = (location: string, codeMS: string[], parentCode?: string) => {
    switch (location) {
      case LOCATION.CITY:
        this.setState({
          isModal: true,
          codeMS,
          isLoading: true,
          nameLocation: location
        });
        this.getListCity();
        break;
      case LOCATION.DISTRICT:
        this.setState({
          isModal: true,
          isLoading: true,
          codeMS,
          nameLocation: location
        });
        this.getListDistrict(parentCode);
        break;
      case LOCATION.WARD:
        this.setState({
          isModal: true,
          isLoading: true,
          codeMS,
          nameLocation: location
        });
        this.getListWard(parentCode);
        break;
      default:
        break;
    }
  };
  onHideModal = () => {
    this.setState({
      isModal: false
    });
  };
  renderItemLocation = ({item}: any) => {
    const {name, code, id} = item;
    const location = {name, code, id};
    const {codeMS, nameLocation} = this.state;
    let isCheckIcon: boolean = false;
    if (codeMS && codeMS.length > 0) {
      isCheckIcon = codeMS.findIndex((value: string) => parseInt(value) === id) > -1;
    }
    return (
      <MyButton
        onPress={() => {
          this.props.valueModal(location, nameLocation);
          this.onHideModal();
        }}
        style={itemStyles.content}>
        <MyText myFontStyle="Regular" style={itemStyles.text}>
          {name}
        </MyText>
        <MyIcon
          iconFontType="AntDesign"
          name="check"
          size={22}
          color={isCheckIcon ? COLOR.TEXT.BLUE : COLOR.TEXT.WHITE}
        />
      </MyButton>
    );
  };

  renderItemSeparatorComponent = () => {
    return <ItemLineIndicator />;
  };

  renderListEmptyComponent = () => {
    const {isLoading} = this.state;
    if (isLoading) {
      return (
        <MyView style={styles.containerEmpty}>
          <MyLoading />
        </MyView>
      );
    } else {
      return <MyView />;
    }
  };

  render() {
    const {arrModal, nameLocation} = this.state;
    return (
      <Modal
        // supportedOrientations={['portrait', 'landscape']}
        animationType="slide"
        hardwareAccelerated
        onRequestClose={this.onHideModal}
        visible={this.state.isModal}
        transparent>
        <MyView style={styles.container2}>
          <MyButton
            style={styles.containerToolbar}
            transparent
            onPress={this.onHideModal}
            activeOpacity={1}
          />
          <MyView style={styles.content}>
            <MyButton style={styles.btnTitle} transparent onPress={this.onHideModal}>
              <MyText myFontStyle="Regular" style={styles.titleLeft}>
                {'Huỷ bỏ'}
              </MyText>
            </MyButton>
            <MyView style={styles.btnTitle2} transparent>
              <MyText myFontStyle="Bold" style={styles.title}>
                {nameLocation}
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
            keyExtractor={(_item, index) => String(index)}
            ItemSeparatorComponent={this.renderItemSeparatorComponent}
            renderItem={this.renderItemLocation}
            ListEmptyComponent={this.renderListEmptyComponent}
          />
          <SafeAreaView edges={['left', 'bottom', 'right']} style={styles.container} />
        </MyView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.BG.WHITE
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLOR.BG.WHITE
  },
  containerEmpty: {
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  modalLine: {
    height: 1,
    backgroundColor: COLOR.TEXT.BLACK
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

const itemStyles = StyleSheet.create({
  text: {
    flex: 1,
    fontSize: MY_SIZE.s_16
  },
  content: {
    backgroundColor: COLOR.BG.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_14, MY_SIZE.s_14, MY_SIZE.s_16, MY_SIZE.s_16)
  }
});
