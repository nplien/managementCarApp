import {MyText, MyTextPriceMask, MyView} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import React, {PureComponent} from 'react';
import {RootState} from 'views/app/redux/App.Reducer';
import {connect} from 'react-redux';
import {formPaymentStyle} from '../styles/FormPayment.Styles';
import {IFormPaymentState} from '../redux';
import Utilities from 'utils/Utilities';

interface IProps extends IFormPaymentState {}

class SoTienDaTra extends PureComponent<IProps> {
  render() {
    const {arrFormPayment} = this.props;

    let soTienDaTra = 0;
    if (arrFormPayment) {
      for (let index = 0; index < arrFormPayment.length; index++) {
        const element = arrFormPayment[index];
        soTienDaTra = soTienDaTra + (element.value || 0);
      }
    }

    return (
      <MyView style={formPaymentStyle.viewItem}>
        <MyText myFontStyle="Regular" style={formPaymentStyle.txtTitle}>
          Khách thanh toán
        </MyText>
        <MyTextPriceMask
          myFontStyle="Medium"
          text={Utilities.convertCount(soTienDaTra)}
          numberOfLines={1}
          style={[formPaymentStyle.textRight, {color: COLOR.TEXT.GREEN}]}
        />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {arrFormPayment} = state.FormPaymentReducer;

  return {
    arrFormPayment
  };
};

export default connect(mapStateToProps, null)(SoTienDaTra);
