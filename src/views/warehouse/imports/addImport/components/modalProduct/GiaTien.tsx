import React, {PureComponent} from 'react';
import {MyInput, MyText, MyView, MyInputPriceMask} from 'bases/components';
import {StyleSheet} from 'react-native';
import {COLOR, MY_SIZE, setMargin, setPadding} from 'bases/styles/Core';
import {modalImportStyles} from '../../style/AddImport.Styles';
import {ItemLineIndicator} from 'views/app/components/items';

interface IProps {
  type: number | 1 | 2;
  giaGoc: number;
  giaGiam: number;
  giaBan: number;
  onChangeDiscount: (type: number | 1 | 2, giaGiam: number, giaBan: number) => void;
}

interface IState {
  type: number | 1 | 2;
  giaGiam: number;
  giaBan: number;
}

export default class GiaTien extends PureComponent<IProps, IState> {
  inputGiaGiamRef: any = React.createRef();

  state = {type: this.props.type, giaGiam: this.props.giaGiam, giaBan: this.props.giaBan};

  changeType = (type: 1 | 2) => {
    if (type === 1) {
      this.setState(
        {
          type: 1,
          giaGiam: 0,
          giaBan: this.props.giaGoc
        },
        () => {
          this.props.onChangeDiscount(1, 0, this.state.giaBan);
        }
      );
    }
    if (type === 2) {
      this.setState(
        {
          type: 2,
          giaGiam: 0,
          giaBan: this.props.giaGoc
        },
        () => {
          this.props.onChangeDiscount(2, 0, this.state.giaBan);
        }
      );
    }
  };

  nhapGiaGiam = (text: string) => {
    const {type} = this.state;
    const {giaGoc} = this.props;
    const inputGiaGiamTmp = parseInt(text || '0', 10);

    if (type === 1) {
      if (inputGiaGiamTmp > giaGoc) {
        this.setState(
          {
            giaGiam: this.props.giaGoc,
            giaBan: 0
          },
          () => {
            this.props.onChangeDiscount(1, this.state.giaGiam, 0);
          }
        );
      } else {
        this.setState(
          {
            giaGiam: inputGiaGiamTmp,
            giaBan: this.props.giaGoc - inputGiaGiamTmp
          },
          () => {
            this.props.onChangeDiscount(1, this.state.giaGiam, this.state.giaBan);
          }
        );
      }
    }
    if (type === 2) {
      if (inputGiaGiamTmp > 100) {
        this.setState(
          {
            giaGiam: 100,
            giaBan: 0
          },
          () => {
            this.props.onChangeDiscount(2, 100, 0);
          }
        );
      } else {
        this.setState(
          {
            giaGiam: inputGiaGiamTmp,
            giaBan: this.props.giaGoc - (inputGiaGiamTmp * this.props.giaGoc) / 100
          },
          () => {
            this.props.onChangeDiscount(2, this.state.giaGiam, this.state.giaBan);
          }
        );
      }
    }
  };

  nhapGiaBan = (text: string) => {
    const {type} = this.state;
    const {giaGoc} = this.props;

    const inputGiaBanTmp = parseInt(text || '0', 10) || 0;
    const giaGiamTmp = giaGoc - inputGiaBanTmp;

    if (giaGiamTmp <= 0) {
      this.setState(
        {
          giaGiam: 0,
          giaBan: inputGiaBanTmp
        },
        () => {
          this.props.onChangeDiscount(this.state.type, this.state.giaGiam, this.state.giaBan);
        }
      );
    } else {
      if (type === 1) {
        this.setState(
          {
            giaGiam: giaGiamTmp,
            giaBan: inputGiaBanTmp
          },
          () => {
            this.props.onChangeDiscount(1, this.state.giaGiam, this.state.giaBan);
          }
        );
      }
      if (type === 2) {
        this.setState(
          {
            giaGiam: Number(((giaGiamTmp / this.props.giaGoc) * 100).toFixed(2)),
            giaBan: inputGiaBanTmp
          },
          () => {
            this.props.onChangeDiscount(2, this.state.giaGiam, this.state.giaBan);
          }
        );
      }
    }
  };

  render() {
    const {type, giaGiam, giaBan} = this.state;

    return (
      <MyView>
        <MyView style={modalImportStyles.viewGiamGia}>
          <MyText style={modalImportStyles.titleText}>Giảm giá</MyText>
          <MyView style={styles.contentViewGiamGia}>
            <MyView style={styles.container}>
              <MyText
                onPress={() => this.changeType(1)}
                style={[
                  styles.text,
                  {
                    backgroundColor: type === 1 ? COLOR.TEXT.GREEN : COLOR.BG.LIGHT_GRAY,
                    color: type === 1 ? COLOR.TEXT.WHITE : COLOR.TEXT.BLACK
                  }
                ]}>
                VNĐ
              </MyText>
              <MyText
                onPress={() => this.changeType(2)}
                style={[
                  styles.text,
                  {
                    backgroundColor: type !== 1 ? COLOR.TEXT.GREEN : COLOR.BG.LIGHT_GRAY,
                    color: type !== 1 ? COLOR.TEXT.WHITE : COLOR.TEXT.BLACK
                  }
                ]}>
                %
              </MyText>
            </MyView>
            <MyInputPriceMask
              ref={this.inputGiaGiamRef}
              numberOfLines={1}
              containerStyle={styles.contentInput}
              style={styles.inputSoluong}
              placeholder={type === 1 ? 'VNĐ' : '%'}
              value={giaGiam.toString()}
              keyboardType={'number-pad'}
              onTextCallback={this.nhapGiaGiam}
            />
          </MyView>
        </MyView>
        <ItemLineIndicator style={modalImportStyles.viewLine} />
        <MyView style={modalImportStyles.viewGiamGia}>
          <MyText style={modalImportStyles.titleText}>Giá bán</MyText>
          <MyView style={modalImportStyles.contentViewGiamGia}>
            <MyInput
              numberOfLines={1}
              containerStyle={modalImportStyles.contentInput2}
              style={modalImportStyles.inputSoluong}
              placeholder="VNĐ"
              keyboardType={'number-pad'}
              value={giaBan.toString()}
              onChangeText={this.nhapGiaBan}
            />
          </MyView>
        </MyView>
      </MyView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLOR.BG.LIGHT_GRAY,
    ...setPadding(MY_SIZE.s_2, MY_SIZE.s_2, MY_SIZE.s_2, MY_SIZE.s_2),
    borderRadius: MY_SIZE.s_8,
    height: MY_SIZE.s_34
  },
  text: {
    width: MY_SIZE.s_48,
    fontSize: MY_SIZE.s_18,
    ...setPadding(MY_SIZE.s_4, MY_SIZE.s_4, MY_SIZE.s_2, MY_SIZE.s_2),
    textAlign: 'center',
    borderRadius: MY_SIZE.s_8,
    overflow: 'hidden'
  },
  contentViewGiamGia: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  },
  contentInput: {
    flex: 1,
    backgroundColor: 'transparent',
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_12, MY_SIZE.s_16)
  },
  inputSoluong: {
    borderWidth: 1,
    borderColor: COLOR.TEXT.SECONDARY,
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_10, MY_SIZE.s_10),
    textAlign: 'right'
  }
});
