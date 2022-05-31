import {MyIcon, MyText, MyView, MyButton, MyButtonText} from 'bases/components';
import {COLOR, MY_SIZE, setMargin, setPadding, setRadius} from 'bases/styles/Core';
import {ARR_PT_BAN_HANG, ARR_PT_THANHTOAN, IPaymentItem} from 'configs/FilterConfig';
import {CustomerModel} from 'models/Customer.Model';
import {IStaffModel} from 'models/Staff.Model';
import React, {Component, createRef} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MyCustomerModal from 'views/app/components/customs/MyCustomerModal';
import MyStaffModal from 'views/app/components/customs/MyStaffModal';
import {RootState} from 'views/app/redux/App.Reducer';
import {
  IFilterSoQuyState,
  changeCustomerSoQuy,
  changeNhanViewSoQuy,
  changePTTTSoQuy
} from '../redux';

interface IProps extends IFilterSoQuyState {
  changeCustomerSoQuy: typeof changeCustomerSoQuy;
  changeNhanViewSoQuy: typeof changeNhanViewSoQuy;
  changePTTTSoQuy: typeof changePTTTSoQuy;
}

class BoLocChonSoQuy extends Component<IProps> {
  arrPTTT = ARR_PT_THANHTOAN;
  arrPTBH = ARR_PT_BAN_HANG;
  customerModalRef: any = createRef();
  staffModalRef: any = createRef();

  apDungCustomer = (arrCustomer: CustomerModel[]) => {
    this.props.changeCustomerSoQuy(arrCustomer);
  };

  apDungStaff = (arrStaff: IStaffModel[]) => {
    this.props.changeNhanViewSoQuy(arrStaff);
  };

  onShowCustomerfModal = () => {
    const {arrCustomerDaChon} = this.props;
    this.customerModalRef?.current?.onShow(arrCustomerDaChon);
  };

  onShowStaffModal = () => {
    const {arrStaffDaChon} = this.props;
    this.staffModalRef?.current?.onShow(arrStaffDaChon);
  };

  onPTTTSelected = (pttt: IPaymentItem) => {
    this.props.changePTTTSoQuy(pttt);
  };

  render() {
    const {arrCustomerDaChon, arrStaffDaChon, arrPTTTDaChon} = this.props;
    const customerStr = arrCustomerDaChon?.map(x => x.name).join(', ') || '';
    const staffStr = arrStaffDaChon?.map(x => x.name).join(', ') || '';
    return (
      <MyView style={styles.container}>
        <MyText style={styles.label}>Khách hàng</MyText>
        <MyButton
          onPress={() => {
            this.onShowCustomerfModal();
          }}
          style={styles.subcontent}>
          <MyText style={styles.textValue} numberOfLines={3}>
            {customerStr ? customerStr : 'Chọn khách hàng'}
          </MyText>
          <MyIcon iconFontType="MaterialIcons" name="keyboard-arrow-right" size={20} />
        </MyButton>

        <MyText style={styles.label}>Nhân viên</MyText>
        <MyButton
          onPress={() => {
            this.onShowStaffModal();
          }}
          style={styles.subcontent}>
          <MyText style={styles.textValue} numberOfLines={3}>
            {staffStr ? staffStr : 'Chọn nhân viên'}
          </MyText>
          <MyIcon iconFontType="MaterialIcons" name="keyboard-arrow-right" size={20} />
        </MyButton>

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

        <MyCustomerModal ref={this.customerModalRef} onApDung={this.apDungCustomer} />
        <MyStaffModal ref={this.staffModalRef} onApDung={this.apDungStaff} />
      </MyView>
    );
  }
}

const mapPropsToState = (rootState: RootState) => {
  const {arrCustomerDaChon, arrStaffDaChon, arrPTTTDaChon} = rootState.FilterSoQuyReducer;

  return {arrCustomerDaChon, arrStaffDaChon, arrPTTTDaChon};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      changeCustomerSoQuy,
      changeNhanViewSoQuy,
      changePTTTSoQuy
    },
    dispatch
  );
};

export default connect(mapPropsToState, mapDispatchToProps)(BoLocChonSoQuy);

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
