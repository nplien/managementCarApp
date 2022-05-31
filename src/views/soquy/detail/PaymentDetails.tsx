import {MyButtonText, MyLoading, MyText, MyView} from 'bases/components';
import {COLOR, MY_SIZE} from 'bases/styles/Core';
import {PaymentModel} from 'models/Order.Model';
import {SO_QUY_TYPE} from 'models/SoQuy.Model';
import React, {PureComponent} from 'react';
import {ScrollView} from 'react-native';
import {PaymentAPI} from 'services/Payment.Api';
import Utilities from 'utils/Utilities';
import {IPropsNavigate} from 'views/app';
import {paymentStyles} from '../list/styles/Payment.style';
import PaymentRowView from './components/PaymentRowView';

interface IParamsProps {
  id: number;
}
interface IProps extends IPropsNavigate<IParamsProps> {}

interface IState {
  objDetails: Partial<PaymentModel>;
  isFirstLoading: boolean;
  isError: boolean;
}

export default class PaymentDetails extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      objDetails: {},
      isFirstLoading: true,
      isError: false
    };
  }

  async componentDidMount() {
    const result = await PaymentAPI.getDetailPayment(
      this.props?.route?.params?.id?.toString() || ''
    );
    if (result && !result.code) {
      this.setState({
        objDetails: result.data ? result.data : {},
        isFirstLoading: false
      });
    } else {
      Utilities.showToast('Chi tiết phiếu thu chi', result.message, 'danger', 2000);
      this.setState({
        objDetails: result.data ? result.data : {},
        isFirstLoading: false,
        isError: true
      });
    }
  }

  render() {
    const {isFirstLoading, objDetails, isError} = this.state;

    let textType = objDetails.type === SO_QUY_TYPE.THU ? 'Phiếu thu' : 'Phiếu chi';
    if (isFirstLoading) {
      return (
        <MyView style={paymentStyles.myLoading} transparent>
          <MyLoading />
        </MyView>
      );
    }
    if (isError) {
      return (
        <MyView style={paymentStyles.emptyCustomer} transparent>
          <MyText>Không có dữ liệu</MyText>
          <MyButtonText
            onPress={() => this.componentDidMount()}
            title="Tải lại"
            style={paymentStyles.BtnEmpty}
          />
        </MyView>
      );
    }

    return (
      <ScrollView>
        {objDetails.transaction_code ? (
          <MyText
            style={[
              paymentStyles.padding,
              {fontSize: MY_SIZE.s_14}
            ]}>{`${textType} tự động được gắn với hóa đơn ${objDetails.transaction_code}`}</MyText>
        ) : null}
        <MyView style={[paymentStyles.container]}>
          <PaymentRowView
            isSpaceBetween={false}
            color={COLOR.TEXT.BLACK}
            title={'Chi nhánh: '}
            value={objDetails.store?.name || ''}
            isText={true}
          />
          <MyView style={paymentStyles.lineSepeDetails} />
          <PaymentRowView
            isSpaceBetween={false}
            color={COLOR.TEXT.BLUE}
            title={'Người tạo: '}
            value={
              objDetails.created_by && objDetails.created_by.name ? objDetails.created_by.name : ''
            }
            isText={true}
          />
          <MyView style={paymentStyles.lineSepeDetails} />
          <PaymentRowView
            isSpaceBetween={false}
            color={COLOR.TEXT.BLACK}
            title={'Thời gian: '}
            value={Utilities.convertUnixTimeByFormat(objDetails.created_at, 'DD/MM/YYYY HH:mm')}
            isText={true}
          />
          <MyView style={paymentStyles.lineSepeDetails} />
          <PaymentRowView
            isSpaceBetween={false}
            color={COLOR.TEXT.BLACK}
            title={objDetails.type === 1 ? 'Loại thu' : 'Loại chi'}
            value={objDetails.group?.name || ''}
            isText={true}
          />
          <MyView style={paymentStyles.lineSepeDetails} />
          <PaymentRowView
            isSpaceBetween={false}
            color={COLOR.TEXT.BLACK}
            title={'Giá trị: '}
            value={objDetails.value?.toString() || ''}
          />
          <MyView style={paymentStyles.lineSepeDetails} />
          <PaymentRowView
            isSpaceBetween={false}
            color={COLOR.TEXT.BLUE}
            title={'Người nộp: '}
            value={objDetails.partner?.name || ''}
            isText={true}
          />
          <MyView style={paymentStyles.lineSepeDetails} />
          <PaymentRowView
            isSpaceBetween={false}
            color={COLOR.TEXT.BLACK}
            title={'Phương thức: '}
            value={objDetails.method_name || ''}
            isText={true}
          />
          <MyView style={paymentStyles.lineSepeDetails} />
          <PaymentRowView
            isSpaceBetween={false}
            color={COLOR.TEXT.BLACK}
            title={'Trạng thái: '}
            value={objDetails.status_name || ''}
            isText
          />
          <MyView style={paymentStyles.lineSepeDetails} />
          <PaymentRowView
            isSpaceBetween={false}
            color={COLOR.TEXT.BLACK}
            title={'Ghi chú: '}
            value={objDetails.note || ''}
            isText={true}
          />
        </MyView>
      </ScrollView>
    );
  }
}
