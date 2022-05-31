import {MyText, MyTextPriceMask, MyView} from 'bases/components';
import {MY_SIZE, setMargin} from 'bases/styles/Core';
import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';
import {modalImportStyles} from '../../style/AddImport.Styles';

interface IProps {
  giaBan: number;
  soLuong: number;
}

interface IStates {
  soTien: number;
}

export default class ThanhTien extends PureComponent<IProps, IStates> {
  state = {soTien: this.props.giaBan * this.props.soLuong};

  setSoTien = (soTien: number) => {
    this.setState({
      soTien: soTien
    });
  };

  render() {
    const {soTien} = this.state;

    return (
      <MyView style={modalImportStyles.viewGiamGia}>
        <MyText style={modalImportStyles.titleText}>Thành tiền</MyText>
        <MyTextPriceMask text={soTien} numberOfLines={1} style={styles.textPriceLeft} />
      </MyView>
    );
  }
}

const styles = StyleSheet.create({
  textPriceLeft: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16),
    fontSize: MY_SIZE.s_18
  }
});
