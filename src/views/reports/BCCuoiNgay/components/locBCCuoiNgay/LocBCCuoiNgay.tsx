import {MyIcon, MyText, MyView, MyButton, MyButtonText} from 'bases/components';
import {COLOR, MY_SIZE, setMargin, setPadding, setRadius} from 'bases/styles/Core';
import {ARR_PT_BAN_HANG, ARR_PT_THANHTOAN, IMethodSales, IPaymentItem} from 'configs/FilterConfig';
import {CustomerModel} from 'models/Customer.Model';
import {IStaffModel} from 'models/Staff.Model';
import React, {Component, createRef} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MyNavigator from 'utils/MyNavigator';
import {IAppNavigateProps} from 'views/app';
import MyCustomerModal from 'views/app/components/customs/MyCustomerModal';
import MyStaffModal from 'views/app/components/customs/MyStaffModal';
import {RootState} from 'views/app/redux/App.Reducer';
import {
  getTongKetBanHangBCCN,
  getTongKetPTTTBCCN,
  getTongKetThuChiBCCN,
  IBCCuoiNgayState,
  onChangeArrCustomerLocBCCN,
  onChangePTBHLocBCCN,
  onChangePTTTLocBCCN,
  onChangeStaffLocBCCN,
  onResetFilterDefault
} from '../../redux';

type IProps = IAppNavigateProps<'LocBCCuoiNgay'> &
  IBCCuoiNgayState & {
    onChangePTTTLocBCCN: typeof onChangePTTTLocBCCN;
    onChangePTBHLocBCCN: typeof onChangePTBHLocBCCN;
    onChangeArrCustomerLocBCCN: typeof onChangeArrCustomerLocBCCN;
    onChangeStaffLocBCCN: typeof onChangeStaffLocBCCN;
    getTongKetThuChiBCCN: typeof getTongKetThuChiBCCN;
    getTongKetBanHangBCCN: typeof getTongKetBanHangBCCN;
    onResetFilterDefault: typeof onResetFilterDefault;
    getTongKetPTTTBCCN: typeof getTongKetPTTTBCCN;
  };

class LocBCCuoiNgay extends Component<IProps> {
  arrPTTT = ARR_PT_THANHTOAN;
  arrPTBH = ARR_PT_BAN_HANG;
  customerModalRef: any = createRef();
  staffModalRef: any = createRef();

  filterDefault: any;
  isBack: boolean = true;

  constructor(props: IProps) {
    super(props);
    this.filterDefault = {
      ...{
        arrStaffDaChon: props.arrStaffDaChon,
        arrPTTTDaChon: props.arrPTTTDaChon,
        arrPTBHDaChon: props.arrPTBHDaChon,
        arrCustomerDaChon: props.arrCustomerDaChon
      }
    };
  }

  componentDidMount() {
    try {
      this.props.navigation.setOptions({
        headerRight: () => (
          <MyButton
            onPress={() => {
              this.onSubmitFilter();
            }}
            style={{...setMargin(0, 0, 0, 16)}}>
            <MyText myFontStyle="Bold" style={{color: COLOR.TEXT.BLUE}}>
              Áp dụng
            </MyText>
          </MyButton>
        )
      });
    } catch (error) {}
  }

  componentWillUnmount() {
    if (this.isBack) {
      // tao 1 action init lai reducer
      this.props.onResetFilterDefault(this.filterDefault);
    }
  }

  onSubmitFilter = () => {
    this.isBack = false;
    this.props.getTongKetThuChiBCCN();
    this.props.getTongKetPTTTBCCN();
    this.props.getTongKetBanHangBCCN('TONG_KET_HOA_DON', 'retail');
    this.props.getTongKetBanHangBCCN('TONG_KET_DAT_HANG', 'order');
    this.props.getTongKetBanHangBCCN('TONG_KET_TRA_HANG', 'return');
    MyNavigator.goBack();
  };

  apDungCustomer = (arrCustomer: CustomerModel[]) => {
    this.props.onChangeArrCustomerLocBCCN(arrCustomer);
  };

  apDungStaff = (arrStaff: IStaffModel[]) => {
    this.props.onChangeStaffLocBCCN(arrStaff);
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
    this.props.onChangePTTTLocBCCN(pttt);
  };

  onPTBHSelected = (ptbh: IMethodSales) => {
    this.props.onChangePTBHLocBCCN(ptbh);
  };

  render() {
    const {arrStaffDaChon, arrPTTTDaChon, arrPTBHDaChon, arrCustomerDaChon} = this.props;
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

        <MyCustomerModal ref={this.customerModalRef} onApDung={this.apDungCustomer} />
        <MyStaffModal ref={this.staffModalRef} onApDung={this.apDungStaff} />
      </MyView>
    );
  }
}

const mapPropsToState = (rootState: RootState) => {
  const {arrStaffDaChon, arrPTTTDaChon, arrPTBHDaChon, arrCustomerDaChon} =
    rootState.BCCuoiNgayReducer;

  return {arrStaffDaChon, arrPTTTDaChon, arrPTBHDaChon, arrCustomerDaChon};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      onChangePTTTLocBCCN,
      onChangePTBHLocBCCN,
      onChangeArrCustomerLocBCCN,
      onChangeStaffLocBCCN,
      getTongKetThuChiBCCN,
      getTongKetBanHangBCCN,
      onResetFilterDefault,
      getTongKetPTTTBCCN
    },
    dispatch
  );
};

export default connect(mapPropsToState, mapDispatchToProps)(LocBCCuoiNgay);

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
