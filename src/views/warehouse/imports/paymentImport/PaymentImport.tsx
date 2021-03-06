import {
  MyButton,
  MyInput,
  MyInputPriceMask,
  MyText,
  MyTextPriceMask,
  MyView
} from 'bases/components';
import {COLOR, MY_SIZE} from 'bases/styles/Core';
import React, {PureComponent} from 'react';
import {KeyboardAvoidingView, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MyNavigator from 'utils/MyNavigator';
import Utilities from 'utils/Utilities';
import {RootState} from 'views/app/redux/App.Reducer';
import {IPersonalState} from 'views/personals/redux';

import {IAddImportOrderState, setTextNote} from '../addImport/redux';
import ButtonPayment from './components/ButtonPayment';
import PaymentMethods from './components/PaymentMethods';
import {paymentStyles} from './styles/PaymentImport.Style';

interface IProps extends IAddImportOrderState, IPersonalState {
  setTextNote: typeof setTextNote;
}
class PaymentImport extends PureComponent<IProps> {
  state = {
    payPrice: 0
  };

  totalCongNo: number = 0;

  note: string = '';

  onChangeText = (text: string) => {
    const {arrProductImport} = this.props;
    let tongGia = 0;
    if (arrProductImport) {
      for (let index = 0; index < arrProductImport.length; index++) {
        const element = arrProductImport[index];
        let price = element.product.original_price || 0;
        tongGia = tongGia + price * element.totalQty;
      }
    }
    const inputPayPrice = parseInt(text || '0', 10);

    if (inputPayPrice > tongGia) {
      this.setState({
        payPrice: tongGia
      });
    } else {
      this.setState({
        payPrice: inputPayPrice
      });
    }
  };

  onChangeTextNote = (text: string) => {
    this.props.setTextNote(text);
  };

  render() {
    const {infoPersonal, suppliers, arrProductImport, note} = this.props;
    let tongSo = 0;
    let tongGia = 0;
    if (arrProductImport) {
      for (let index = 0; index < arrProductImport.length; index += 1) {
        const element = arrProductImport[index];
        tongSo += element.totalQty;
        const price = element.product.original_price || 0;
        tongGia += price * element.totalQty;
      }
    }
    const date = new Date(Date.now());
    const {payPrice} = this.state;
    const inputPayPrice = parseInt(payPrice.toString(), 10);
    let totalPayNCC: number = 0;
    totalPayNCC = payPrice;
    this.totalCongNo = tongGia - inputPayPrice;
    return (
      <MyView style={paymentStyles.container}>
        <KeyboardAvoidingView
          style={[paymentStyles.container, {marginBottom: MY_SIZE.s_16}]}
          keyboardVerticalOffset={60}
          behavior={Utilities.isAndroid() ? undefined : 'padding'}>
          <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            {/* Ngu???i t???o */}
            <MyView style={paymentStyles.containerChild}>
              <MyView style={paymentStyles.childflexDirection}>
                <MyText myFontStyle="Medium">Ng?????i t???o</MyText>
              </MyView>
              <MyText style={[paymentStyles.txtTotal]}>{infoPersonal?.name}</MyText>
            </MyView>
            <MyView style={paymentStyles.line} />
            {/* Nh?? cung c???p */}
            <MyButton
              onPress={() => MyNavigator.push('SuppliersImport', {type: 'IMPROT_ORDER'})}
              style={paymentStyles.containerChild}>
              <MyView style={paymentStyles.childflexDirection}>
                <MyText myFontStyle="Medium">Nh?? cung c???p</MyText>
              </MyView>
              <MyText style={[paymentStyles.txtTotal]}>{suppliers?.name}</MyText>
            </MyButton>
            <MyView style={paymentStyles.line} />

            {/* ng??y nh???p */}
            <MyView style={paymentStyles.containerChild}>
              <MyView style={paymentStyles.childflexDirection}>
                <MyText myFontStyle="Medium">Ng??y nh???p</MyText>
              </MyView>
              <MyText style={[paymentStyles.txtTotal]}>
                {Utilities.convertTimeByFormat(date)}
              </MyText>
            </MyView>
            <MyView style={paymentStyles.line} />
            {/* <MyView style={[paymentStyles.lineInput, {marginBottom: MY_SIZE.s_10}]} /> */}
            {/* Ph????ng th???c thanh to??n */}
            <PaymentMethods />

            {/* Total Price */}
            <MyView style={paymentStyles.containerChild}>
              <MyView style={paymentStyles.childflexDirection}>
                <MyText myFontStyle="Regular">T???ng c???ng</MyText>
                <MyText style={paymentStyles.txtCount}>{tongSo}</MyText>
              </MyView>
              <MyTextPriceMask style={paymentStyles.txtTotal} text={tongGia} />
            </MyView>
            <MyView style={paymentStyles.line} />

            {/* Sale */}
            {/* <InputGiamGia /> */}

            {/* tr??? nh?? cung c???p */}
            <MyView style={paymentStyles.containerChild}>
              <MyView style={paymentStyles.childflexDirection}>
                <MyText myFontStyle="Medium">C???n tr??? NCC</MyText>
              </MyView>
              <MyTextPriceMask
                style={[paymentStyles.txtTotal, {color: COLOR.TEXT.BLUE}]}
                text={tongGia}
              />
            </MyView>
            <MyView style={paymentStyles.line} />

            {/* Ti???n tr??? nh?? cung c???p */}
            <MyView style={paymentStyles.containerChild}>
              <MyText style={paymentStyles.txtTitle} myFontStyle="Regular">
                Ti???n tr??? NCC
              </MyText>
              <MyInputPriceMask
                textAlign="right"
                keyboardType="number-pad"
                containerStyle={paymentStyles.input}
                value={payPrice.toString()}
                onTextCallback={this.onChangeText}
              />
            </MyView>
            <MyView style={paymentStyles.line} />

            {/* T??nh v??o c??ng n??? */}
            <MyView style={paymentStyles.viewCongNo}>
              <MyText myFontStyle="Regular">T??nh v??o c??ng n???</MyText>
              <MyTextPriceMask style={paymentStyles.txtTotal} text={this.totalCongNo} />
            </MyView>

            {/* Ghi ch?? */}

            <MyInput
              label="Ghi ch??"
              containerStyle={paymentStyles.viewinputNote}
              textAlignVertical="top"
              multiline
              style={paymentStyles.inputNote}
              placeholder="Nh???p ghi ch??"
              defaultValue={note}
              onChangeText={this.onChangeTextNote}
            />
          </ScrollView>
        </KeyboardAvoidingView>
        <ButtonPayment total_paid={totalPayNCC} total_unpaid={this.totalCongNo} />
      </MyView>
    );
  }
}
const mapStateToProps = (state: RootState) => {
  const {suppliers, arrProductImport, note} = state.AddImportOrderReducer;
  const {infoPersonal} = state.PersonalReducer;
  return {infoPersonal, suppliers, arrProductImport, note};
};
const mapDispatchToProps = (dispatch: any) => bindActionCreators({setTextNote}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(PaymentImport);
