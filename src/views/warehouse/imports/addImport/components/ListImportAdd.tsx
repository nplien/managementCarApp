import {MyView} from 'bases/components';
import {IProductSale} from 'models/Product.Model';
import React, {createRef, PureComponent} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MyNavigator from 'utils/MyNavigator';
import Utilities from 'utils/Utilities';
import {RootState} from 'views/app/redux/App.Reducer';
import {IImportCateReducerState} from '../../categorys/redux';
import {
  IAddImportOrderState,
  destroyAddImportOrder,
  setIsManySelected,
  deleteListImport
} from '../redux';
import {listimportAdd} from '../style/AddImport.Styles';
import BottomTotalImport from './BottomTotalImport';
import ListViewImport from './ListViewImport';
interface IProps extends IAddImportOrderState, Partial<IImportCateReducerState> {
  destroyAddImportOrder: typeof destroyAddImportOrder;
  setIsManySelected: typeof setIsManySelected;
  deleteListImport: typeof deleteListImport;
}

class ListImportAdd extends PureComponent<IProps> {
  listItemSPRef: any = createRef();
  componentWillUnmount() {
    this.props.destroyAddImportOrder();
  }

  handleToPayment = () => {
    MyNavigator.navigate('PaymentImport');
  };
  pressHuyXoa = () => {
    this.props.setIsManySelected(false);
    for (let [, value] of this.listItemSPRef.mapItemSPRef) {
      if (value) {
        if (value.getIsCheck()) {
          value.unCheck();
        }
      }
    }
  };

  pressXoa = () => {
    this.props.setIsManySelected(false);
    const arrItemXoa: IProductSale[] = [];
    for (let [, value] of this.listItemSPRef.mapItemSPRef) {
      if (value) {
        if (value.getIsCheck()) {
          arrItemXoa.push(value.getItem());
        }
      }
    }
    this.props.deleteListImport(arrItemXoa);
  };
  render() {
    const {arrProductImport} = this.props;
    let tongSo = 0;
    let tongGia = 0;
    if (arrProductImport) {
      for (let index = 0; index < arrProductImport.length; index++) {
        const element = arrProductImport[index];
        tongSo = tongSo + element.totalQty;
        let price = element.product.original_price || 0;
        tongGia = tongGia + price * element.totalQty;
      }
    }
    return (
      <MyView style={listimportAdd.container}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={140}
          behavior={Utilities.isAndroid() ? undefined : 'padding'}
          style={listimportAdd.container}>
          <ListViewImport ref={node => (this.listItemSPRef = node)} />
          <BottomTotalImport pressHuyXoa={this.pressHuyXoa} pressXoa={this.pressXoa} />
        </KeyboardAvoidingView>
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {isFirstLoading, isRefresh, arrProductImport, isLoadMore, isStop, isError, isManySelected} =
    state.AddImportOrderReducer;
  const {giaHienThi} = state.ChangeGiaBanReducer;
  return {
    isFirstLoading,
    isRefresh,
    arrProductImport,
    isLoadMore,
    isStop,
    isError,
    giaHienThi,
    isManySelected
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      destroyAddImportOrder,
      setIsManySelected,
      deleteListImport
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ListImportAdd);
