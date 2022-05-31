import * as React from 'react';
import {StyleSheet, Modal, FlatList} from 'react-native';
import {MyButton, MyText, MyView, MyIcon, MyLoading} from 'bases/components';
import {COLOR, MY_SIZE, setRadius, setPadding} from 'bases/styles/Core';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ItemLineIndicator} from 'views/app/components/items';
import {ITaiKhoanModel} from 'models/Payment.Model';
import {ManagerAPI} from 'services/Manager.Api';
import Utilities from 'utils/Utilities';

interface IProps {
  valueModal: (value: ITaiKhoanModel) => void;
}

interface IAppState {
  isVisible: boolean;
  arrModal: ITaiKhoanModel[];
  isLoading: boolean;
}

export default class ModalChuyenKhoan extends React.Component<IProps, IAppState> {
  taiKhoan: ITaiKhoanModel | undefined = undefined;

  state = {isVisible: false, arrModal: [], isLoading: true};

  getListTaiKhoan = async () => {
    try {
      const response = await ManagerAPI.getListTaiKhoan({
        skip: 0,
        limit: 100,
        attribute_code: 'payment_card'
      });
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
      Utilities.logException('ModalChuyenKhoan-getListTaiKhoan', error);
    }
  };

  componentDidMount() {
    this.getListTaiKhoan();
  }

  onShow = (taiKhoan: ITaiKhoanModel) => {
    this.taiKhoan = taiKhoan;
    this.setState({
      isVisible: true
    });
  };

  onHide = () => {
    this.setState({
      isVisible: false
    });
  };

  submit = (item: ITaiKhoanModel) => {
    this.setState(
      {
        isVisible: false
      },
      () => {
        this.props.valueModal(item);
      }
    );
  };

  renderItem = ({item}: {item: ITaiKhoanModel}) => {
    const {name, value} = item;
    return (
      <MyButton
        onPress={() => {
          this.submit(item);
        }}
        style={itemStyles.content}>
        <MyText myFontStyle="Regular" style={itemStyles.text}>
          {`${name} - ${value}`}
        </MyText>
        <MyIcon
          iconFontType="AntDesign"
          name="check"
          size={22}
          color={name === this.taiKhoan?.name ? COLOR.TEXT.BLUE : COLOR.TEXT.WHITE}
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
    const {arrModal, isVisible} = this.state;

    return (
      <Modal
        // supportedOrientations={['portrait', 'landscape']}
        animationType="slide"
        hardwareAccelerated
        onRequestClose={this.onHide}
        visible={isVisible}
        transparent>
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
                {'Chọn tài khoản'}
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
            renderItem={this.renderItem}
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
