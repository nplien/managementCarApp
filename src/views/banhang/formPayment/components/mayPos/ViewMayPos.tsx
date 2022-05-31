import {MyButton, MyIcon, MyText, MyView} from 'bases/components';
import {COLOR, MY_SIZE, setMargin, setPadding} from 'bases/styles/Core';
import {IPaymentOrderModel} from 'models/Payment.Model';
import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';
import ItemMayPos from './ItemMayPos';
import {RootState} from 'views/app/redux/App.Reducer';
import {connect} from 'react-redux';
import {addFormPayment, deleteAllItem, IFormPaymentState} from 'views/banhang/formPayment/redux';
import Utilities, {getTongTienHang} from 'utils/Utilities';
import {NGUOI_TRA_TIEN} from 'configs/ProductConfig';
import {SO_QUY_TYPE} from 'models/SoQuy.Model';
import {PAYMENT_METHOD} from 'configs/FilterConfig';
import {IThanhToanState} from 'views/banhang/thanhToanBanHang/redux';
import {IInforShippingState} from 'views/banhang/inforShipping/redux';
import {ICreateSaleState} from 'views/banhang/createSale/redux';

interface IProps extends IFormPaymentState, IThanhToanState, ICreateSaleState, IInforShippingState {
  addFormPayment: typeof addFormPayment;
  deleteAllItem: typeof deleteAllItem;
}

class ViewMayPos extends PureComponent<IProps> {
  getSoTienCanTra = () => {
    const {tienGiamGia, isGiaoHang, objDoiTacGiaoHang, objInforShip, arrProductSale} = this.props;
    const tongTienTmp = getTongTienHang(arrProductSale) || 0;
    const giamGiaTmp = tienGiamGia || 0;

    let phiShip = 0;
    if (
      isGiaoHang &&
      objInforShip &&
      objInforShip.payment_by === NGUOI_TRA_TIEN.NGUOI_NHAN &&
      objDoiTacGiaoHang &&
      objDoiTacGiaoHang.service_price
    ) {
      phiShip = objDoiTacGiaoHang.service_price;
    }

    const khachCanTraTmp = tongTienTmp - giamGiaTmp + phiShip;
    let soTienDaTra = 0;

    const {arrFormPayment} = this.props;
    if (arrFormPayment) {
      for (let index = 0; index < arrFormPayment.length; index++) {
        const element = arrFormPayment[index];
        soTienDaTra = soTienDaTra + (element.value || 0);
      }
    }

    return Math.max(khachCanTraTmp - soTienDaTra, 0);
  };

  setCheck = () => {
    const {arrFormPayment} = this.props;

    let chuyenKhoan: IPaymentOrderModel[] = [];
    if (arrFormPayment) {
      chuyenKhoan = arrFormPayment.filter(payment => {
        return payment.method === PAYMENT_METHOD.QUET_THE;
      });
    }
    if (chuyenKhoan.length > 0) {
      this.deleteChuyenKhoan();
    } else {
      this.addMayPos();
    }
  };

  addMayPos = () => {
    this.props.addFormPayment({
      random_id: Utilities.randomNumber(),
      value: this.getSoTienCanTra(),
      type: SO_QUY_TYPE.THU,
      method: PAYMENT_METHOD.QUET_THE
    });
  };

  deleteChuyenKhoan = () => {
    this.props.deleteAllItem(PAYMENT_METHOD.QUET_THE);
  };

  render() {
    const {arrFormPayment} = this.props;

    let chuyenKhoan: IPaymentOrderModel[] = [];
    if (arrFormPayment) {
      chuyenKhoan = arrFormPayment.filter(payment => {
        return payment.method === PAYMENT_METHOD.QUET_THE;
      });
    }

    return (
      <MyView>
        <MyView style={styles.container}>
          <MyButton style={styles.content} onPress={this.setCheck}>
            <MyIcon
              name={chuyenKhoan.length > 0 ? 'checkcircle' : 'checkcircleo'}
              color={COLOR.TEXT.GREEN}
              iconFontType="AntDesign"
              size={20}
            />
            <MyText style={styles.title}>Máy POS</MyText>
          </MyButton>
          {chuyenKhoan.length > 0 && this.getSoTienCanTra() > 0 ? (
            <MyButton style={styles.btnAdd} onPress={this.addMayPos}>
              <MyIcon
                name={'pluscircle'}
                color={COLOR.TEXT.GREEN}
                iconFontType="AntDesign"
                size={20}
              />
            </MyButton>
          ) : null}
        </MyView>
        <MyView>
          {chuyenKhoan?.map((item: IPaymentOrderModel, index: number) => {
            return <ItemMayPos key={index} itemPayment={item} />;
          })}
        </MyView>
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {arrProductSale} = state.CreateSaleReducer;

  const {tienGiamGia, isGiaoHang} = state.ThanhToanReducer;
  const {objDoiTacGiaoHang, objInforShip} = state.InforShippingReducer;

  const {arrFormPayment} = state.FormPaymentReducer;

  return {
    arrProductSale,

    tienGiamGia,
    isGiaoHang,
    objDoiTacGiaoHang,
    objInforShip,

    arrFormPayment
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      addFormPayment,
      deleteAllItem
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewMayPos);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...setPadding(MY_SIZE.s_14, MY_SIZE.s_14, MY_SIZE.s_16, MY_SIZE.s_0)
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: MY_SIZE.s_16,
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  contentInput: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  inputSoluong: {
    borderWidth: 1,
    borderColor: COLOR.TEXT.SECONDARY,
    textAlign: 'right',
    height: MY_SIZE.s_34,
    minHeight: MY_SIZE.s_34
  },
  textValue: {
    flex: 1
  },
  contentValue: {
    flexDirection: 'row',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, 54, MY_SIZE.s_8)
  },
  btnAdd: {
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16),
    justifyContent: 'center'
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_10, MY_SIZE.s_0, 54, MY_SIZE.s_0)
  },
  itemLineIndicator: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16)
  }
});
