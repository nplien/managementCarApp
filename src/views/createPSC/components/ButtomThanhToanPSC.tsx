import React from 'react';
import {MyButton, MyText} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import {thanhToanStyles} from 'views/banhang/thanhToanBanHang/styles/ThanhToanBanHang.Styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {batch, useDispatch, useSelector} from 'react-redux';
import {createAction} from 'views/app/redux/MyAction';
import {IProductInPSC, IProductPCS} from 'models/PhieuSuaChua.Model';
import {RootState} from 'views/app/redux';
import Utilities from 'utils/Utilities';
import {IPaymentOrderModel} from 'models/Payment.Model';
import {PAYMENT_METHOD} from 'configs/FilterConfig';
import MyNavigator from 'utils/MyNavigator';

export default function ButtomThanhToanPSC() {
  const arrPhieuSuaChua = useSelector(
    (state: RootState) => state.PhieuSuaChuaReducer.arrPhieuSuaChua
  );
  const arrPhuTungTmp = useSelector((state: RootState) => state.PhieuSuaChuaReducer.arrPhuTungTmp);
  const arrProductPSC = useSelector((state: RootState) => state.CreatePSCReducer.arrProductPSC);
  const arrFormPayment = useSelector((state: RootState) => state.FormPaymentReducer.arrFormPayment);
  const cuaHangDangChon = useSelector(
    (state: RootState) => state.ChooseStoreReducer.cuaHangDangChon
  );
  const currenTiepNhanXe = useSelector(
    (state: RootState) => state.PhieuSuaChuaReducer.currenTiepNhanXe
  );
  const dispatch = useDispatch();
  const handleToThanhToan = () => {
    let phieuSuaChuaTPM: IProductPCS = {
      id: arrPhieuSuaChua?.length + 1,
      code: `PSC00000${arrPhieuSuaChua?.length + 1}`,
      customer: currenTiepNhanXe,
      created_at: new Date(Date.now()).getTime(),
      stores: cuaHangDangChon
    };
    const products: IProductInPSC[] = [];
    let tongSo = 0;
    let tongGia = 0;
    if (!arrProductPSC || arrProductPSC.length === 0) {
      Utilities.showToast('Bạn chưa chọn sản phẩm!', '', 'warning');
      return;
    } else {
      for (let index = 0; index < arrProductPSC.length; index++) {
        const element = arrProductPSC[index].phuTung;
        tongSo = tongSo + arrProductPSC[index].totalQty;
        let price = element?.price || 0;
        tongGia = tongGia + price * arrProductPSC[index].totalQty;
        let productInOrder: IProductInPSC = {
          sku: element?.sku,
          id: element?.id,
          name: element?.name,
          total_quantity: arrProductPSC[index].totalQty,
          price: element?.price,
          total_price: price * arrProductPSC[index].totalQty
        };

        products.push(productInOrder);
        phieuSuaChuaTPM.products = products;
        phieuSuaChuaTPM.total_quantity = tongSo;
        phieuSuaChuaTPM.total_price = tongGia;
      }
    }
    //  thanh toan cho hoa don
    let thanhToanHoaDon: IPaymentOrderModel[] = [];
    if (arrFormPayment) {
      thanhToanHoaDon = arrFormPayment.filter(payment => {
        return (payment.value || 0) > 0;
      });
    }
    if (thanhToanHoaDon.length <= 0) {
      phieuSuaChuaTPM.is_payment = false;
      phieuSuaChuaTPM.status_name = 'Khách chưa thanh toán';
      phieuSuaChuaTPM.status_id = 1;
    } else {
      let thanhToanInOrder: IPaymentOrderModel[] = [];
      for (let index = 0; index < thanhToanHoaDon.length; index++) {
        if (thanhToanHoaDon[index].method !== PAYMENT_METHOD.TIEN_MAT) {
          if (!thanhToanHoaDon[index].card) {
            Utilities.showToast('Bạn chưa chọn tài khoản thanh toán!', '', 'warning');
            return;
          } else {
            thanhToanInOrder.push({
              method: thanhToanHoaDon[index].method,
              partner: {
                id: phieuSuaChuaTPM.customer?.id,
                name: phieuSuaChuaTPM.customer?.name,
                phone: phieuSuaChuaTPM.customer?.phone
              },
              type: thanhToanHoaDon[index].type,
              value: thanhToanHoaDon[index].value,
              card: {
                ...thanhToanHoaDon[index].card,
                number: thanhToanHoaDon[index].card?.value,
                ccv: '000',
                bank: thanhToanHoaDon[index].card?.name
              }
            });
          }
        } else {
          thanhToanInOrder.push({
            method: thanhToanHoaDon[index].method,
            partner: {
              id: phieuSuaChuaTPM.customer?.id,
              name: phieuSuaChuaTPM.customer?.name,
              phone: phieuSuaChuaTPM.customer?.phone
            },
            type: thanhToanHoaDon[index].type,
            value: thanhToanHoaDon[index].value
          });
        }
      }
      if (thanhToanInOrder[0].value >= tongGia) {
        phieuSuaChuaTPM.status_name = 'Đã hoàn thành';
        phieuSuaChuaTPM.status_id = 2;
      } else {
        phieuSuaChuaTPM.status_name = 'Khách chưa thanh toán';
        phieuSuaChuaTPM.status_id = 1;
      }
      phieuSuaChuaTPM.is_payment = true;
      phieuSuaChuaTPM.payments = thanhToanInOrder;
      phieuSuaChuaTPM.total_paid = thanhToanInOrder[0].value;
    }
    Utilities.log(phieuSuaChuaTPM);
    for (let i = 0; i < arrPhuTungTmp.length; i++) {
      const element = arrPhuTungTmp[i];
      const itemPhuTung = arrProductPSC.find(x => x.phuTung?.id === element.id);
      if (itemPhuTung && itemPhuTung.phuTung) {
        element.total_quantity = element.total_quantity - itemPhuTung.totalQty;
      }
    }
    batch(() => {
      dispatch(
        createAction('THANH/TOAN/ACTION_PSC', {
          phieuSuaChua: phieuSuaChuaTPM
        })
      );
      dispatch(createAction('SET/PSC/ARR_PHU_TUNG', {arrPhuTungTmp: arrPhuTungTmp}));
      dispatch(createAction('CREATE/PSC/RESET'));
      dispatch(createAction('SET/PSC/CURRENT_TIEP_NHAN_XE', {currenTiepNhanXe: undefined}));
    });
    MyNavigator.popToTop();
  };
  return (
    <SafeAreaView edges={['left', 'bottom', 'right']}>
      <MyButton style={thanhToanStyles.btnBottomView} onPress={handleToThanhToan}>
        <MyText myFontStyle="Bold" style={{color: COLOR.TEXT.WHITE}}>
          Hoàn thành
        </MyText>
      </MyButton>
    </SafeAreaView>
  );
}
