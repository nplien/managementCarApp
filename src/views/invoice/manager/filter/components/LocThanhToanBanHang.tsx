import {MyText, MyView, MyButtonText} from 'bases/components';
import {COLOR, MY_SIZE, setMargin, setPadding, setRadius} from 'bases/styles/Core';
import {ARR_PT_BAN_HANG, ARR_PT_THANHTOAN, IMethodSales, IPaymentItem} from 'configs/FilterConfig';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {onChangePTBHInvoice, setPaymentMethodInvoice, IInvoiceOrderState} from '../../redux';

interface IProps extends IInvoiceOrderState {
  setPaymentMethodInvoice: typeof setPaymentMethodInvoice;
  onChangePTBHInvoice: typeof onChangePTBHInvoice;
}

class LocThanhToanBanHang extends Component<IProps> {
  arrPTTT = ARR_PT_THANHTOAN;
  arrPTBH = ARR_PT_BAN_HANG;

  onPTTTSelected = (pttt: IPaymentItem) => {
    this.props.setPaymentMethodInvoice(pttt);
  };

  onPTBHSelected = (ptbh: IMethodSales) => {
    this.props.onChangePTBHInvoice(ptbh);
  };

  render() {
    const {arrPTTTDaChon, arrPTBHDaChon} = this.props;
    return (
      <MyView style={styles.container}>
        <MyText style={styles.label}>Phương thức thanh toán</MyText>
        <MyView style={styles.contentWrap}>
          {this.arrPTTT.map(tt => {
            let isChecked = false;
            if (arrPTTTDaChon?.length) {
              isChecked = arrPTTTDaChon.findIndex(x => x.name === tt.name) > -1;
            }

            let bg_color = {
              backgroundColor: isChecked ? COLOR.TEXT.POSITIVE_BTN : COLOR.BG.SECONDARY
            };
            let text_color = {color: isChecked ? COLOR.TEXT.WHITE : COLOR.BG.BLACK};
            return (
              <MyButtonText
                onPress={() => {
                  this.onPTTTSelected(tt);
                }}
                key={tt.method}
                title={tt.name}
                style={[styles.btnWrap, bg_color]}
                titleProps={{myFontStyle: 'Medium'}}
                titleStyle={{...styles.btnTitle, ...text_color}}
              />
            );
          })}
        </MyView>

        <MyText style={styles.label}>Phương thức bán hàng</MyText>
        <MyView style={styles.contentWrap}>
          {this.arrPTBH.map(tt => {
            let isChecked = false;
            if (arrPTBHDaChon?.length) {
              isChecked = arrPTBHDaChon.findIndex(x => x.name === tt.name) > -1;
            }
            let bg_color = {
              backgroundColor: isChecked ? COLOR.TEXT.POSITIVE_BTN : COLOR.BG.SECONDARY
            };
            let text_color = {color: isChecked ? COLOR.TEXT.WHITE : COLOR.BG.BLACK};
            return (
              <MyButtonText
                onPress={() => {
                  this.onPTBHSelected(tt);
                }}
                key={tt.id}
                title={tt.name}
                style={[styles.btnWrap, bg_color]}
                titleProps={{myFontStyle: 'Medium'}}
                titleStyle={{...styles.btnTitle, ...text_color}}
              />
            );
          })}
        </MyView>
      </MyView>
    );
  }
}

const mapPropsToState = (rootState: RootState) => {
  const {arrPTTTDaChon, arrPTBHDaChon} = rootState.InvoiceOrderReducer;
  return {arrPTTTDaChon, arrPTBHDaChon};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      setPaymentMethodInvoice,
      onChangePTBHInvoice
    },
    dispatch
  );
};

export default connect(mapPropsToState, mapDispatchToProps)(LocThanhToanBanHang);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.BG.SECONDARY
  },
  label: {
    ...setMargin(16, 10, 16, 16)
  },
  input: {
    borderRadius: 16
  },
  subcontent: {
    flexDirection: 'row',
    ...setPadding(10, 10, 16, 16),
    borderRadius: 16,
    alignItems: 'center'
  },
  contentWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    ...setPadding(8, 8, 10, 10),
    ...setRadius(16, 16, 16, 16)
  },
  btnWrap: {
    backgroundColor: COLOR.TEXT.POSITIVE_BTN,
    ...setRadius(16, 16, 16, 16),
    ...setMargin(4, 4, 4, 4)
  },
  btnTitle: {
    fontSize: MY_SIZE.s_12,
    paddingHorizontal: 16
  },
  textValue: {
    flex: 1
  }
});
