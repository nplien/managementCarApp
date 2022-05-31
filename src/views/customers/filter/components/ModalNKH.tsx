import * as React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {MyButton, MyText, MyView, MyIcon, MyLoading} from 'bases/components';
import {COLOR, setPadding, setRadius, MY_SIZE} from 'bases/styles/Core';
import {ItemLineIndicator} from 'views/app/components/items';
import Utilities from 'utils/Utilities';
import {SafeAreaView} from 'react-native-safe-area-context';

import {StaffDetailModel} from 'models/ManagerSetting.Model';
import {getApiGroupCustomer} from 'services';
import MyNavigator from 'utils/MyNavigator';
import {IAppNavigateProps} from 'views/app';

type IProps = IAppNavigateProps<'ModalNKH'>;

interface IAppState {
  arrModal: Array<StaffDetailModel>;
  isLoading: boolean;
}

export default class ModalNKH extends React.Component<IProps, IAppState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      arrModal: [],
      isLoading: true
    };
  }
  getListGroup = async () => {
    const {type} = this.props.route.params;
    try {
      const response: any = await getApiGroupCustomer(0, 500, type);
      if (response && response.data) {
        this.setState({
          arrModal: response.data,
          isLoading: false
        });
      } else {
        Utilities.showToast(response?.message);
        this.setState({
          isLoading: false
        });
      }
    } catch (error) {
      // Utilities.showToast(error);
      this.setState({
        isLoading: false
      });
      // Utilities.logException('ModalNKH', error);
    }
  };
  componentDidMount() {
    this.getListGroup();
  }

  onHideModal = () => {
    MyNavigator.goBack();
  };
  renderItemLocation = ({item}: any) => {
    const {checkGroup} = this.props.route.params;
    return (
      <MyButton
        onPress={() => {
          this.props.route.params.valueModal(item.name, item.id);
          this.onHideModal();
        }}
        style={styles.textModal}>
        <MyText myFontStyle="Regular" style={styles.text}>
          {item.name}
        </MyText>
        {checkGroup === item.name ? (
          <MyIcon iconFontType="AntDesign" name="check" size={22} color={COLOR.TEXT.BLUE} />
        ) : null}
      </MyButton>
    );
  };
  checkBtnAdd = () => {
    this.onHideModal();
    const {type} = this.props.route.params;
    if (type === 'customer') {
      MyNavigator.navigate('CreateGroupCustomer');
      return;
    }
    MyNavigator.navigate('CreateGroupSupplier');
  };
  render() {
    const {arrModal, isLoading} = this.state;
    return (
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
              {'Chọn nhóm'}
            </MyText>
          </MyView>
          <MyButton
            style={{height: '100%', justifyContent: 'center'}}
            transparent
            onPress={this.checkBtnAdd}>
            <MyText
              myFontStyle="Regular"
              style={[
                styles.titleLeft,
                {...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16)}
              ]}>
              {'Thêm nhóm'}
            </MyText>
          </MyButton>
        </MyView>
        <MyView style={styles.line} />
        {isLoading ? (
          <MyView style={styles.myLoading}>
            <MyLoading />
          </MyView>
        ) : (
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
        )}
        <SafeAreaView edges={['left', 'bottom', 'right']} style={styles.container} />
      </MyView>
    );
  }
}

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
  },
  text: {
    flex: 1,
    fontSize: MY_SIZE.s_16
  },
  myLoading: {
    flex: 1,
    backgroundColor: COLOR.BG.WHITE,
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)
  }
});
