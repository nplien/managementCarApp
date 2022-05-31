import * as React from 'react';
import {View, StyleSheet, Modal, FlatList} from 'react-native';
import {MyButton, MyText, MyView, MyIcon} from 'bases/components';
import {COLOR, setRadius, setPadding, MY_SIZE} from 'bases/styles/Core';
import {CODE_LIST_GENDER, CODE_LIST_TYPES} from 'common/Constants';

interface IProps {
  valueModal: (
    selectedType: string,
    code: CODE_LIST_GENDER | CODE_LIST_TYPES,
    name: string
  ) => void;
  refModal?: any;
}

interface IAppState {
  isModal: boolean;
  arrModal: Array<string>;
  selectedType: string;
  title: string;
  value: string;
}

export default class ModalTypeAndGender extends React.Component<IProps, IAppState> {
  ClearTime: any;
  constructor(props: IProps) {
    super(props);
    this.state = {
      isModal: false,
      arrModal: [],
      selectedType: '',
      value: '',
      title: ''
    };
  }

  showHideModal = (selectedType: string, valueArr: Array<string>, value: string) => {
    switch (selectedType) {
      case 'type':
        this.setState({
          isModal: true,
          arrModal: valueArr,
          selectedType,
          value,
          title: 'Kiểu khách hàng'
        });
        break;
      case 'gender':
        this.setState({
          isModal: true,
          arrModal: valueArr,
          selectedType,
          value,
          title: 'Giới tính'
        });
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
  renderItem = ({item}: any) => {
    const {name, code} = item;
    const {selectedType, value} = this.state;
    return (
      <MyButton
        onPress={() => {
          this.props.valueModal(selectedType, name, code);
          this.onHideModal();
        }}
        style={styles.textModal}>
        <MyText myFontStyle="Regular" style={styles.text}>
          {name}
        </MyText>
        {value === code ? (
          <MyIcon iconFontType="AntDesign" name="check" size={22} color={COLOR.TEXT.BLUE} />
        ) : null}
      </MyButton>
    );
  };
  render() {
    const {arrModal, title} = this.state;
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
                {title}
              </MyText>
            </MyView>
            <MyText style={styles.btnTitle} />
          </MyView>
          <MyView style={styles.line} />
          <MyView style={{flex: 1}}>
            <FlatList
              data={arrModal}
              extraData={arrModal}
              keyExtractor={(_item, index) => String(index)}
              ItemSeparatorComponent={() => {
                return <View style={styles.modalLine} />;
              }}
              renderItem={this.renderItem}
            />
          </MyView>
        </MyView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalLine: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLOR.BG.GRAY
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
