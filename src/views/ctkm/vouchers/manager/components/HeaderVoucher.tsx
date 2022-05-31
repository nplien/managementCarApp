import {MyButton, MyIcon, MyView} from 'bases/components';
import {IStorePerson} from 'models/ModelBase';
// import MyStoreMultiplePicker from 'views/app/components/customs/MyStoreMultiplePicker';
import React, {createRef, PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MyNavigator from 'utils/MyNavigator';
import {RootState} from 'views/app/redux/App.Reducer';
import {IPersonalState} from 'views/personals/redux';
import {IVoucherState, setStoreVoucher, setOnRefresh, getListVoucher} from '../redux';
import {voucherStyles} from '../styles/Voucher.styles';

interface IVoucherListProps extends Partial<IVoucherState>, IPersonalState {
  setStoreVoucher: typeof setStoreVoucher;
  getListVoucher: typeof getListVoucher;
  setOnRefresh: typeof setOnRefresh;
}

class HeaderVoucher extends PureComponent<IVoucherListProps> {
  constructor(props: IVoucherListProps) {
    super(props);
  }
  chiNhanhModalRef: any = createRef();

  showChiNhanhModal = () => {
    const {arrStoreVoucher, infoPersonal} = this.props;
    if (arrStoreVoucher && arrStoreVoucher.length > 0) {
      this.chiNhanhModalRef.current.onShow(arrStoreVoucher);
    } else {
      this.chiNhanhModalRef.current.onShow(infoPersonal?.stores);
    }
  };
  apDungChiNhanh = (arr: IStorePerson[]) => {
    this.props.setStoreVoucher(arr);
    this.props.setOnRefresh(true);
    this.props.getListVoucher();
  };

  render() {
    return (
      <MyView style={voucherStyles.toolbarContainer} transparent>
        {/* <MyButton
          transparent
          style={voucherStyles.btnFilterContainer}
          onPress={this.showChiNhanhModal}>
          <MyIcon iconFontType="MaterialIcons" name="location-on" size={20} />
        </MyButton> */}
        <MyButton
          transparent
          style={voucherStyles.btnFilterContainer}
          onPress={() => {
            MyNavigator.push('FilterVoucherList');
          }}>
          <MyIcon iconFontType="MaterialIcons" name="search" size={24} />
        </MyButton>
        {/* <MyStoreMultiplePicker ref={this.chiNhanhModalRef} onApDung={this.apDungChiNhanh} /> */}
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {status, count, arrStoreVoucher} = state.VoucherReducer;
  const {infoPersonal} = state.PersonalReducer;
  return {status, count, arrStoreVoucher, infoPersonal};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getListVoucher,
      setOnRefresh,
      setStoreVoucher
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(HeaderVoucher);
