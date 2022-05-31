import {MyButton, MyIcon, MyView} from 'bases/components';
import React, {createRef, PureComponent} from 'react';
import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';
import MyNavigator from 'utils/MyNavigator';
import {bindActionCreators} from 'redux';
import {getListPayment, IPaymentState, onChangeStoreSQ, setOnRefresh} from '../redux';
import {sortPayment} from '../styles/Payment.style';
// import MyStoreMultiplePicker from 'views/app/components/customs/MyStoreMultiplePicker';
import {IStorePerson} from 'models/ModelBase';

interface IToolbarFilterProps extends IPaymentState {
  getListPayment: typeof getListPayment;
  setOnRefresh: typeof setOnRefresh;
  onChangeStoreSQ: typeof onChangeStoreSQ;
}

class SortSoQuy extends PureComponent<IToolbarFilterProps> {
  sortRef: any = createRef();
  chiNhanhModalRef: any = createRef();

  showSortModal = () => {
    this.sortRef.current.onShow();
  };
  showChiNhanhModal = () => {
    const {arrChiNhanhDaChonSQ} = this.props;
    // this.chiNhanhModalRef?.current?.onShow(arrChiNhanhDaChonSQ);
    MyNavigator.pushModal('MyStoreMultiplePicker', {
      storeDaChon: arrChiNhanhDaChonSQ || [],
      onApDung: (arr: IStorePerson[]) => {
        this.apDungChiNhanh(arr);
      }
    });
  };
  apDungChiNhanh = (arr: IStorePerson[]) => {
    this.props.onChangeStoreSQ(arr);
    this.props.setOnRefresh(true);
    this.props.getListPayment();
  };

  render() {
    return (
      <MyView style={sortPayment.filterDivideRight} transparent>
        <MyButton
          transparent
          style={sortPayment.btnFilterContainer}
          onPress={this.showChiNhanhModal}>
          <MyIcon iconFontType="MaterialIcons" name="location-on" size={20} />
        </MyButton>

        <MyButton
          transparent
          style={sortPayment.btnFilterContainer}
          onPress={() => {
            MyNavigator.push('FilterSoQuy');
          }}>
          <MyIcon iconFontType="MaterialIcons" name="search" size={24} />
        </MyButton>

        {/* <MyStoreMultiplePicker ref={this.chiNhanhModalRef} onApDung={this.apDungChiNhanh} /> */}
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {arrChiNhanhDaChonSQ} = state.PaymentReducer;
  return {arrChiNhanhDaChonSQ};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getListPayment,
      setOnRefresh,
      onChangeStoreSQ
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SortSoQuy);
