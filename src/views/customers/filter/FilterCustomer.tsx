import * as React from 'react';
import {connect} from 'react-redux';
import {MyView, MyText, MyButtonText} from 'bases/components';
import {FilterCustomerStyle} from './styles/FilterCustomer.style';
import MyNavigator from 'utils/MyNavigator';
import {
  changeKTGFilterCustomer,
  changeTGFilterCustomer,
  GetCustomer,
  ICustomerState,
  setClear,
  setValue
} from '../manager/redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {KeyboardAvoidingView, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import NKHView from './components/NKHView';
import {setMargin, MY_SIZE} from 'bases/styles/Core';
import Location from './components/Location';

import TextSearch from './components/TextSearch';
import ViewPrice from './components/ViewPrice';
import ViewDebt from './components/ViewDebt';
import ViewStatus from './components/ViewStatus';
import TypeofCustomer from './components/TypeofCustomer';
import ViewGender from './components/ViewGender';
import ViewCreator from './components/ViewCreator';
import GiaoDichCuoi from './components/GiaoDichCuoi';
import Utilities from 'utils/Utilities';
import ViewPoint from './components/ViewPoint';
import {IAppNavigateProps, IDateFilterType, IDateRange} from 'views/app';

type IProps = IAppNavigateProps<'FilterCustomer'> &
  ICustomerState & {
    GetCustomer: typeof GetCustomer;
    CustomerReducer: ICustomerState;
    setClear: typeof setClear;
    setValue: typeof setValue;
    changeTGFilterCustomer: typeof changeTGFilterCustomer;
    changeKTGFilterCustomer: typeof changeKTGFilterCustomer;
  };

const skip = 0;
const limit = 10;
class FilterCustomer extends React.Component<IProps, any> {
  isBack: boolean = true;
  filterCustomerReducerOld: any;
  idGroup: any;
  nameGroup: any;
  oldFilterTime?: IDateFilterType;
  oldApproxTime?: IDateRange;
  constructor(props: IProps) {
    super(props);
    const {CustomerReducer, thoiGianLocGDC, khoangThoiGianGDC} = this.props;
    let oldReducer = JSON.stringify(CustomerReducer);
    this.filterCustomerReducerOld = JSON.parse(oldReducer);
    this.oldFilterTime = thoiGianLocGDC;
    this.oldApproxTime = khoangThoiGianGDC;
  }
  componentWillUnmount() {
    if (this.isBack) {
      this.props.setValue(this.filterCustomerReducerOld);
      this.props.changeTGFilterCustomer(this.oldFilterTime);
      this.props.changeKTGFilterCustomer(this.oldApproxTime);
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  /**
   * bo loc customer
   */
  FnSearchCustomers = () => {
    this.props.GetCustomer(skip, limit, true);
    this.isBack = false;
    MyNavigator.goBack();
  };
  render() {
    return (
      <MyView style={FilterCustomerStyle.container}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={60}
          style={FilterCustomerStyle.container}
          behavior={Utilities.isAndroid() ? undefined : 'padding'}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <MyText style={FilterCustomerStyle.myTextTow}>Tìm kiếm theo</MyText>
            <TextSearch />
            <MyText style={FilterCustomerStyle.myTextTow}>Nhóm</MyText>
            <NKHView />
            <MyText style={FilterCustomerStyle.myTextTow}>Người tạo</MyText>
            <ViewCreator />
            <MyText style={FilterCustomerStyle.myTextTow}>Giao dịch cuối</MyText>
            <GiaoDichCuoi />
            <MyText style={FilterCustomerStyle.myTextTow}>Tổng bán</MyText>
            <ViewPrice />
            <MyText style={FilterCustomerStyle.myTextTow}>Nợ hiện tại</MyText>
            <ViewDebt />
            <MyText style={FilterCustomerStyle.myTextTow}>Tổng điểm</MyText>
            <ViewPoint />
            <MyText style={FilterCustomerStyle.myTextTow}>Loại khách</MyText>
            <TypeofCustomer />
            <MyText style={FilterCustomerStyle.myTextTow}>Giới tính</MyText>
            <ViewGender />
            <MyText style={FilterCustomerStyle.myTextTow}>Khu vực</MyText>
            <Location />
            {/* <ItemLineIndicator />
            <LocationDistrict /> */}
            <MyText style={FilterCustomerStyle.myTextTow}>Trạng thái</MyText>
            <ViewStatus />
          </ScrollView>
        </KeyboardAvoidingView>
        <SafeAreaView edges={['bottom']}>
          <MyButtonText
            onPress={() => {
              this.FnSearchCustomers();
            }}
            title="Áp dụng"
            style={{...setMargin(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)}}
          />
        </SafeAreaView>
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {CustomerReducer} = state;
  const {thoiGianLocGDC, khoangThoiGianGDC} = state.CustomerReducer;
  return {CustomerReducer, thoiGianLocGDC, khoangThoiGianGDC};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      GetCustomer,

      changeTGFilterCustomer,
      changeKTGFilterCustomer,
      setValue,
      setClear
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterCustomer);
