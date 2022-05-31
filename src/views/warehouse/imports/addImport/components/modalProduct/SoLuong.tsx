import React, {PureComponent} from 'react';
import {MyButton, MyIcon, MyInput, MyText, MyView} from 'bases/components';
import {StyleSheet} from 'react-native';
import {COLOR, MY_SIZE, setMargin, setPadding} from 'bases/styles/Core';
import Utilities from 'utils/Utilities';
import {modalImportStyles} from '../../style/AddImport.Styles';

interface IProps {
  soLuong: number;
  soLuongTon: number;
  onChangeSoLuong: (soLuong: number) => void;
}

interface IState {
  soLuong: number;
}

class SoLuong extends PureComponent<IProps, IState> {
  state = {soLuong: this.props.soLuong};

  nhapSoLuong = (value: string) => {
    if (value) {
      this.setState(
        {
          soLuong: parseInt(value, 10)
        },
        () => {
          this.props.onChangeSoLuong(this.state.soLuong);
        }
      );
    } else {
      this.setState(
        {
          soLuong: 1
        },
        () => {
          this.props.onChangeSoLuong(this.state.soLuong);
        }
      );
    }
  };

  congSp = () => {
    this.setState(
      {
        soLuong: this.state.soLuong + 1
      },
      () => {
        this.props.onChangeSoLuong(this.state.soLuong);
      }
    );
  };

  truSp = () => {
    const {soLuong} = this.state;
    if (soLuong > 1) {
      this.setState(
        {
          soLuong: this.state.soLuong - 1
        },
        () => {
          this.props.onChangeSoLuong(this.state.soLuong);
        }
      );
    }
  };

  canhBao = () => {
    Utilities.showToast('Quá số lượng tồn kho!', '', 'danger');
  };

  render() {
    const {soLuong} = this.state;
    const {soLuongTon} = this.props;

    return (
      <MyView style={modalImportStyles.viewGiamGia}>
        <MyText style={modalImportStyles.titleText}>Số lượng</MyText>
        <MyView style={styles.container} transparent>
          {soLuongTon < soLuong ? (
            <MyButton onPress={this.canhBao} transparent>
              <MyIcon
                iconFontType={'Octicons'}
                name={'alert'}
                size={18}
                color={'red'}
                style={styles.icon}
              />
            </MyButton>
          ) : null}
          <MyButton style={styles.btnCountItem} onPress={this.truSp} transparent>
            <MyIcon iconFontType={'MaterialCommunityIcons'} name={'minus'} size={22} />
          </MyButton>
          <MyInput
            numberOfLines={1}
            containerStyle={styles.containerInput}
            style={styles.inputSoluong}
            value={soLuong.toString()}
            keyboardType={'number-pad'}
            onChangeText={this.nhapSoLuong}
          />
          <MyButton style={styles.btnCountItem} onPress={this.congSp} transparent>
            <MyIcon iconFontType={'MaterialCommunityIcons'} name={'plus'} size={22} />
          </MyButton>
        </MyView>
      </MyView>
    );
  }
}

export default SoLuong;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_12, MY_SIZE.s_12),
    alignItems: 'center'
  },
  text: {
    width: MY_SIZE.s_48,
    fontSize: MY_SIZE.s_18,
    ...setPadding(MY_SIZE.s_4, MY_SIZE.s_4, MY_SIZE.s_2, MY_SIZE.s_2),
    textAlign: 'center',
    borderRadius: MY_SIZE.s_8,
    overflow: 'hidden'
  },
  containerInput: {
    justifyContent: 'center'
  },
  btnCountItem: {
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_12, MY_SIZE.s_12),
    justifyContent: 'center'
  },
  inputSoluong: {
    width: MY_SIZE.s_75,
    borderWidth: 1,
    borderColor: COLOR.TEXT.SECONDARY,
    textAlign: 'center'
  },
  icon: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16)
  }
});
