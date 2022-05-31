import {MyButton, MyText} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import React, {PureComponent} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {IRequestPostImport, WareHouseApi} from 'services/WareHouse.Api';
import MyNavigator from 'utils/MyNavigator';
import Utilities from 'utils/Utilities';
import {RootState} from 'views/app/redux/App.Reducer';
import {IChooseStoreState} from 'views/menuLeft/redux';

import {
  destroyAddImportOrder,
  IAddImportOrderState,
} from '../../addImport/redux';
import {destroyImportCateGory} from '../../categorys/redux';
import {
  getListImportOrder,
  IImportOrderState,
  setOnRefreshImportOrder,
} from '../../manager/redux';
import {paymentStyles} from '../styles/PaymentImport.Style';

interface IProps
  extends IAddImportOrderState,
    Partial<IChooseStoreState>,
    Partial<IImportOrderState> {
  total_unpaid: number;
  total_paid: number;
  getListImportOrder: typeof getListImportOrder;
  setOnRefreshImportOrder: typeof setOnRefreshImportOrder;
  destroyAddImportOrder: typeof destroyAddImportOrder;
  destroyImportCateGory: typeof destroyImportCateGory;
}
class ButtonPayment extends PureComponent<IProps> {
  handleToPost = () => {
    Utilities.showHideRootLoading(true);
    const {
      note,
      total_unpaid,
      total_paid,
      arrProductImport,
      suppliers,
      cuaHangDangChon,
    } = this.props;
    let tongSo = 0;
    let tongGia = 0;
    let arrTest: any = [];
    if (arrProductImport) {
      for (let i = 0; i < arrProductImport.length; i++) {
        const element = arrProductImport[i];
        arrTest.push({
          id: element.product.parent_id,
          name: element.product.name,
          option_id: element.product.id,
          original_price: element.product.original_price,
          total_quantity: element.totalQty,
          total_price: element.product.original_price,
        });
        tongSo = tongSo + element.totalQty;
        let price = element.product.original_price || 0;
        tongGia = tongGia + price * element.totalQty;
      }
    }
    let params: IRequestPostImport = {
      note: note,
      total_unpaid: total_unpaid,
      total_paid: total_paid,
      total_quantity: tongSo,
      total_price: tongGia,
      products: arrTest,
      receiver: cuaHangDangChon,
    };
    if (suppliers && suppliers.id) {
      params.supplier = suppliers;
    }
    WareHouseApi.postImportOrder(params)
      .then((res: any) => {
        Utilities.showHideRootLoading(false);
        if (res?.code) {
          Utilities.logException('PaymentImport: ', res);

          Utilities.showToast('Tạo đặt hàng thất bại', res.message, 'danger');
        } else {
          Utilities.showToast('Thành công', res.message, 'success');
          MyNavigator.popToTop();
          this.props.setOnRefreshImportOrder(true);
          this.props.getListImportOrder();
          this.props.destroyAddImportOrder();
          this.props.destroyImportCateGory();
        }
      })
      .catch(error => {
        Utilities.logException('PaymentImport: ', error);
        Utilities.showHideRootLoading(false);
        Utilities.showToast('Tạo đặt hàng thất bại', error.message, 'danger');
      });
  };

  render() {
    return (
      <SafeAreaView
        edges={['bottom', 'left', 'right']}
        style={paymentStyles.viewButton}>
        {/* <MyButton style={paymentStyles.btnSave}>
          <MyText style={{color: COLOR.TEXT.WHITE}}>Lưu tạm</MyText>
        </MyButton> */}
        <MyButton onPress={this.handleToPost} style={paymentStyles.btnDone}>
          <MyText style={{color: COLOR.TEXT.WHITE}}>Hoàn thành</MyText>
        </MyButton>
        {/* <MyButtonText style={paymentStyles.btnSave} title="Lưu tạm" />
          <MyButtonText
            onPress={this.handleToPost}
            style={paymentStyles.btnDone}
            title="Hoàn thành"
          /> */}
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state: RootState) => {
  const {arrProductImport, suppliers, note} = state.AddImportOrderReducer;
  const {cuaHangDangChon} = state.ChooseStoreReducer;
  return {arrProductImport, suppliers, cuaHangDangChon, note};
};
const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      getListImportOrder,
      setOnRefreshImportOrder,
      destroyAddImportOrder,
      destroyImportCateGory,
    },
    dispatch,
  );
export default connect(mapStateToProps, mapDispatchToProps)(ButtonPayment);
