import React, {PureComponent} from 'react';
import {MyText, MyView, MyInputPriceMask, MyButton} from 'bases/components';
import {StyleSheet} from 'react-native';
import {COLOR, MY_SIZE, setMargin, setPadding} from 'bases/styles/Core';

import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {bindActionCreators} from 'redux';

import {KieuKhuyenMai} from 'configs/ProductConfig';
import {ICreatePSCState, setDiscount} from '../redux';
import Utilities, {getTongTienHangPSC} from 'utils/Utilities';
import {resetThanhToan, addFormPayment} from 'views/banhang/formPayment/redux';
import {SO_QUY_TYPE} from 'models/SoQuy.Model';
import {PAYMENT_METHOD} from 'configs/FilterConfig';

interface IProps extends ICreatePSCState {
  setDiscount: typeof setDiscount;
  resetThanhToan: typeof resetThanhToan;
  addFormPayment: typeof addFormPayment;
}

class GiamGiaPSC extends PureComponent<IProps> {
  tinhTienPhaiTra = (tienGiamGia: number) => {
    const {arrProductPSC} = this.props;
    const tongTienTmp = getTongTienHangPSC(arrProductPSC) || 0;
    const giamGiaTmp = tienGiamGia || 0;

    this.props.resetThanhToan();

    this.props.addFormPayment({
      random_id: Utilities.randomNumber(),
      value: tongTienTmp - giamGiaTmp,
      type: SO_QUY_TYPE.THU,
      method: PAYMENT_METHOD.TIEN_MAT
    });
  };

  nhapGiaGiam = (text: string) => {
    const {discountType, arrProductPSC} = this.props;
    const tongTienTmp = getTongTienHangPSC(arrProductPSC);

    const inputGiaGiamTmp = parseInt(text || '0', 10);

    if (discountType === KieuKhuyenMai.GIAM_THANG_TIEN) {
      if (inputGiaGiamTmp > tongTienTmp) {
        this.props.setDiscount(KieuKhuyenMai.GIAM_THANG_TIEN, tongTienTmp, tongTienTmp);
        this.tinhTienPhaiTra(tongTienTmp);
      } else {
        this.props.setDiscount(KieuKhuyenMai.GIAM_THANG_TIEN, inputGiaGiamTmp, inputGiaGiamTmp);
        this.tinhTienPhaiTra(inputGiaGiamTmp);
      }
    }
    if (discountType === KieuKhuyenMai.GIAM_PHAN_TRAM) {
      if (inputGiaGiamTmp > 100) {
        this.props.setDiscount(KieuKhuyenMai.GIAM_PHAN_TRAM, 100, tongTienTmp);
        this.tinhTienPhaiTra(tongTienTmp);
      } else {
        this.props.setDiscount(
          KieuKhuyenMai.GIAM_PHAN_TRAM,
          inputGiaGiamTmp,
          (tongTienTmp * inputGiaGiamTmp) / 100
        );
        this.tinhTienPhaiTra((tongTienTmp * inputGiaGiamTmp) / 100);
      }
    }
  };

  changeType = (type: KieuKhuyenMai) => {
    this.props.setDiscount(type, 0, 0);
    this.tinhTienPhaiTra(0);
  };

  render() {
    const {discountType, discountValue} = this.props;

    return (
      <MyView style={styles.viewGiamGia}>
        <MyText style={styles.titleText} myFontStyle="Regular">
          Giảm giá
        </MyText>
        <MyView style={styles.contentViewGiamGia}>
          <MyView style={styles.container}>
            <MyButton
              onPress={() => this.changeType(KieuKhuyenMai.GIAM_THANG_TIEN)}
              style={[
                styles.btnText,
                {
                  backgroundColor:
                    discountType === KieuKhuyenMai.GIAM_THANG_TIEN
                      ? COLOR.TEXT.GREEN
                      : COLOR.BG.LIGHT_GRAY
                }
              ]}>
              <MyText
                style={[
                  styles.text,
                  {
                    color:
                      discountType === KieuKhuyenMai.GIAM_THANG_TIEN
                        ? COLOR.TEXT.WHITE
                        : COLOR.TEXT.BLACK
                  }
                ]}>
                VNĐ
              </MyText>
            </MyButton>
            <MyButton
              onPress={() => this.changeType(KieuKhuyenMai.GIAM_PHAN_TRAM)}
              style={[
                styles.btnText,
                {
                  backgroundColor:
                    discountType !== KieuKhuyenMai.GIAM_THANG_TIEN
                      ? COLOR.TEXT.GREEN
                      : COLOR.BG.LIGHT_GRAY
                }
              ]}>
              <MyText
                style={[
                  styles.text,
                  {
                    color:
                      discountType !== KieuKhuyenMai.GIAM_THANG_TIEN
                        ? COLOR.TEXT.WHITE
                        : COLOR.TEXT.BLACK
                  }
                ]}>
                %
              </MyText>
            </MyButton>
          </MyView>
          <MyInputPriceMask
            numberOfLines={1}
            containerStyle={styles.contentInput}
            style={styles.inputSoluong}
            placeholder={discountType === KieuKhuyenMai.GIAM_THANG_TIEN ? 'VNĐ' : '%'}
            value={Utilities.convertCount(discountValue || 0).toString()}
            keyboardType={'number-pad'}
            onTextCallback={this.nhapGiaGiam}
            returnKeyType="done"
          />
        </MyView>
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {discountType, discountValue, arrProductPSC} = state.CreatePSCReducer;

  return {
    arrProductPSC,

    discountType,
    discountValue
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      setDiscount,
      addFormPayment,
      resetThanhToan
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(GiamGiaPSC);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLOR.BG.LIGHT_GRAY,
    ...setPadding(MY_SIZE.s_2, MY_SIZE.s_2, MY_SIZE.s_2, MY_SIZE.s_2),
    borderRadius: MY_SIZE.s_8,
    height: MY_SIZE.s_34
  },
  btnText: {
    width: MY_SIZE.s_48,
    borderRadius: MY_SIZE.s_8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: MY_SIZE.s_18,
    textAlign: 'center'
  },
  contentViewGiamGia: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  },
  contentInput: {
    flex: 1,
    backgroundColor: 'transparent',
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_12, MY_SIZE.s_16)
  },
  inputSoluong: {
    borderWidth: 1,
    borderColor: COLOR.TEXT.SECONDARY,
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_10, MY_SIZE.s_10),
    textAlign: 'right',
    height: MY_SIZE.s_34,
    minHeight: MY_SIZE.s_34
  },
  titleText: {
    flex: 1,
    fontSize: MY_SIZE.s_16,
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_0)
  },
  viewGiamGia: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_0, MY_SIZE.s_0)
  }
});
