import {MyButton, MyIcon, MyText, MyView} from 'bases/components';
import {COLOR, MY_SIZE, setPadding, setRadius} from 'bases/styles/Core';
import {ARR_KENH_BAN, IKenhBan} from 'configs/FilterConfig';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import MyNavigator from 'utils/MyNavigator';
import {IAppNavigateProps} from 'views/app';

type IProps = IAppNavigateProps<'ModalKenhBan'>;

type IAppState = {
  isLoading: boolean;
  arrChooseKB: number[];
};

export default class ModalKenhBan extends Component<IProps, IAppState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isLoading: true,
      arrChooseKB: this.props.route.params.arrChannels
    };
  }

  onHideModal = () => {
    MyNavigator.goBack();
  };
  chooseKB = (value: IKenhBan) => {
    const {arrChooseKB} = this.state;
    const indexKB = arrChooseKB.findIndex(valueKB => valueKB === value.id);
    let arrCurrentChooseKB = arrChooseKB;
    if (indexKB !== -1) {
      arrCurrentChooseKB.splice(indexKB, 1);
      this.setState({
        arrChooseKB: arrCurrentChooseKB
      });
      return;
    }
    arrCurrentChooseKB.push(value.id);
    this.setState({
      arrChooseKB: arrCurrentChooseKB
    });
  };

  render() {
    const {arrChooseKB} = this.state;
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
              {'Chọn kênh bán'}
            </MyText>
          </MyView>
          <MyButton
            style={styles.btnTitle}
            transparent
            onPress={() => {
              this.props.route.params.onSubmitKB(arrChooseKB);
              this.onHideModal();
            }}>
            <MyText myFontStyle="Regular" style={[styles.titleRight, {color: COLOR.TEXT.BLUE}]}>
              {'Áp dụng'}
            </MyText>
          </MyButton>
        </MyView>
        <MyView style={styles.line} />
        <MyView style={{flex: 1}}>
          {ARR_KENH_BAN.map((value, index) => {
            let isActive = arrChooseKB && arrChooseKB?.findIndex((x: any) => x === value.id) > -1;
            return (
              <MyButton
                transparent
                key={index.toString()}
                onPress={() => {
                  this.chooseKB(value);
                }}
                style={styles.buttomName}>
                <MyText style={{fontSize: MY_SIZE.s_18}}>{value.name}</MyText>
                {isActive ? (
                  <MyIcon
                    iconFontType="MaterialCommunityIcons"
                    name={'check'}
                    size={22}
                    color={COLOR.TEXT.POSITIVE_BTN}
                  />
                ) : null}
              </MyButton>
            );
          })}
        </MyView>
      </MyView>
    );
  }
}

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    backgroundColor: COLOR.BG.BLACK_10
  },
  Modal: {
    flex: 1,
    margin: MY_SIZE.s_0
  },
  containerToolbar: {
    height: MY_SIZE.s_135,
    justifyContent: 'flex-end'
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
  buttomName: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLOR.BG.BLACK_30
  }
});
