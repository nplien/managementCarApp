import * as React from 'react';
import {StyleSheet, Modal, FlatList} from 'react-native';
import {MyButton, MyText, MyView, MyIcon, MyLoading} from 'bases/components';
import {COLOR, setPadding, setRadius, MY_SIZE} from 'bases/styles/Core';
import {ItemLineIndicator} from 'views/app/components/items';
import Utilities from 'utils/Utilities';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getApiGroupCustomer} from 'services';
import {IGroupCustomer} from 'models/GroupCustomer.Model';
import {IGroupsRequest} from 'services/Customers.Api';

interface IProps {
  valueModal: (valueGroup: IGroupsRequest) => void;
  checkGroup: string;
}

interface IAppState {
  isModal: boolean;
  arrModal: Array<IGroupCustomer> | any;
  isLoading: boolean;
}

export default class ModalNKH extends React.Component<IProps, IAppState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isModal: false,
      arrModal: [],
      isLoading: true
    };
  }
  getListGroup = async () => {
    try {
      const response = await getApiGroupCustomer(0, 500, 'customer');
      if (response && !response?.code) {
        this.setState({
          arrModal: response?.data ? response?.data : [],
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
      Utilities.logException('ModalNKH', error);
    }
  };

  showModal = () => {
    this.setState({
      isModal: true
    });
    if (this.state.arrModal.length <= 0) {
      this.getListGroup();
    }
  };
  onHideModal = () => {
    this.setState({
      isModal: false
    });
  };
  renderItemGroup = ({item}: {item: IGroupCustomer}) => {
    const {checkGroup} = this.props;
    return (
      <MyButton
        onPress={() => {
          this.props.valueModal({
            id: item.id,
            name: item.name,
            discount_type: item.discount_type,
            discount_value: item.discount_value
          });
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
  render() {
    const {arrModal, isLoading} = this.state;
    return (
      <Modal
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
                {'Chọn nhóm'}
              </MyText>
            </MyView>
            <MyText style={styles.btnTitle} />
          </MyView>
          <MyView style={styles.line} />
          {isLoading ? (
            <MyView style={{flex: 1, paddingTop: 16}}>
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
              renderItem={this.renderItemGroup}
              keyExtractor={(_item, index) => String(index)}
              ItemSeparatorComponent={() => <ItemLineIndicator />}
            />
          )}
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
  }
});
