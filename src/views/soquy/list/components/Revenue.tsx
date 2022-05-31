import {MyView} from 'bases/components';
import {COLOR, setMargin, setRadius} from 'bases/styles/Core';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';
import PaymentRowView from '../../detail/components/PaymentRowView';
import {IPaymentState} from '../redux';
interface IProps extends IPaymentState {}

class Revenue extends Component<IProps> {
  render() {
    let {objRevenue} = this.props;
    return (
      <MyView style={{...setMargin(16, 0), ...setRadius(16, 16, 16, 16)}}>
        <PaymentRowView
          isSpaceBetween
          color={COLOR.TEXT.GREEN}
          title={'Quỹ đầu kì'}
          value={objRevenue?.total_value_0?.toString() || '0'}
        />
        <PaymentRowView
          isSpaceBetween
          color={COLOR.TEXT.BLUE}
          title={'Tổng thu'}
          value={objRevenue?.total_value_1?.toString() || '0'}
        />
        <PaymentRowView
          isSpaceBetween
          color={COLOR.TEXT.RED}
          title={'Tổng chi'}
          value={objRevenue?.total_value_2?.toString() || '0'}
        />
        <PaymentRowView
          isSpaceBetween
          color={COLOR.TEXT.GREEN}
          title={'Tồn quỹ'}
          value={objRevenue?.total_value_3?.toString() || '0'}
        />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {objRevenue} = state.PaymentReducer;
  return {objRevenue};
};
// const mapDispatchToProps = (dispatch: any) => {
//   return bindActionCreators(
//     {
//       getListPayment,
//       onFirstLoading,
//       setOnLoadmore,
//       setOnRefresh
//     },
//     dispatch
//   );
// };
export default connect(mapStateToProps, null)(Revenue);
