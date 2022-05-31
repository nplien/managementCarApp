import {MyButton, MyIcon, MyInputPriceMask, MyText, MyView} from 'bases/components';
import {COLOR, MY_SIZE, setMargin, setPadding} from 'bases/styles/Core';
import {IPaymentOrderModel, ITaiKhoanModel} from 'models/Payment.Model';
import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';
import ModalChuyenKhoan from './ModalMayPos';
import {connect} from 'react-redux';
import {IProductBanHangState} from 'views/banhang/ProductBanHang/redux';
import {bindActionCreators} from 'redux';
import {deleteItemPayment, editItemPayment} from 'views/banhang/formPayment/redux';
import Utilities from 'utils/Utilities';

interface IProps extends IProductBanHangState {
  itemPayment: IPaymentOrderModel;

  editItemPayment: typeof editItemPayment;
  deleteItemPayment: typeof deleteItemPayment;
}

class ItemMayPos extends PureComponent<IProps> {
  chonTaiKhoanRef: any = React.createRef();

  setTaiKhoan = (taiKhoan: ITaiKhoanModel) => {
    this.props.editItemPayment({...this.props.itemPayment, card: taiKhoan});
  };

  nhapSoTien = (text: string) => {
    this.setState({
      soTien: text
    });
    this.props.editItemPayment({
      ...this.props.itemPayment,
      value: parseInt(text || '0', 10)
    });
  };

  xoaItem = () => {
    this.props.deleteItemPayment(this.props.itemPayment);
  };

  render() {
    const {itemPayment} = this.props;
    return (
      <MyView>
        <MyView style={styles.containerInput}>
          <MyInputPriceMask
            numberOfLines={1}
            containerStyle={styles.contentInput}
            style={styles.inputSoluong}
            placeholder={'VNĐ'}
            keyboardType={'number-pad'}
            value={Utilities.convertCount(itemPayment.value).toString()}
            onTextCallback={this.nhapSoTien}
            returnKeyType="done"
          />
          <MyButton style={styles.btnAdd} onPress={this.xoaItem}>
            <MyIcon
              name={'minuscircle'}
              color={COLOR.TEXT.RED}
              iconFontType="AntDesign"
              size={20}
            />
          </MyButton>
        </MyView>
        <MyButton
          style={styles.contentValue}
          onPress={() => this.chonTaiKhoanRef.current.onShow(itemPayment.card)}>
          <MyText style={styles.textValue} numberOfLines={2}>
            {itemPayment.card
              ? `${`${itemPayment.card.name} - ${itemPayment.card.value}`}`
              : 'Chọn tài khoản thanh toán'}
          </MyText>
          <MyIcon name={'chevron-right'} iconFontType="MaterialIcons" size={24} />
        </MyButton>
        <ModalChuyenKhoan ref={this.chonTaiKhoanRef} valueModal={this.setTaiKhoan} />
      </MyView>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      editItemPayment,
      deleteItemPayment
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(ItemMayPos);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    ...setPadding(MY_SIZE.s_14, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_0)
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: MY_SIZE.s_16,
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  contentInput: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  inputSoluong: {
    borderWidth: 1,
    borderColor: COLOR.TEXT.SECONDARY,
    textAlign: 'right',
    height: MY_SIZE.s_34,
    minHeight: MY_SIZE.s_34
  },
  textValue: {
    flex: 1
  },
  contentValue: {
    flexDirection: 'row',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, 54, MY_SIZE.s_8)
  },
  btnAdd: {
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16),
    justifyContent: 'center'
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_10, MY_SIZE.s_0, 54, MY_SIZE.s_0)
  },
  itemLineIndicator: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16)
  }
});
