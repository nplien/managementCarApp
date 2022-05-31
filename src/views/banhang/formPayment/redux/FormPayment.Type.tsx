import {PAYMENT_METHOD} from 'configs/FilterConfig';
import {IPaymentOrderModel} from 'models/Payment.Model';

export interface IFormPaymentState {
  arrFormPayment?: IPaymentOrderModel[];

  formPayment?: IPaymentOrderModel;
  paymentMethod?: PAYMENT_METHOD;
}

export interface IFormPaymentAction {
  type: string;
  payload: IFormPaymentState;
}
