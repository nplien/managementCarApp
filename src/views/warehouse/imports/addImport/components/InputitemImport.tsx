/* eslint-disable react-native/no-inline-styles */
import {MyView, MyButton, MyIcon, MyInput} from 'bases/components';
import {BANG_GIA_CHUNG} from 'common/Constants';
import {IProductSale} from 'models/Product.Model';
import React, {PureComponent} from 'react';
import {Alert} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {
  addProductToImport,
  IAddImportOrderState,
  setIsManySelected,
  setProductToImport
} from '../redux';
import {itemAddImportStyles} from '../style/AddImport.Styles';
interface IProps extends IAddImportOrderState {
  addProductToImport: typeof addProductToImport;
  setProductToImport: typeof setProductToImport;
  setIsManySelected: typeof setIsManySelected;
  itemProduct: IProductSale;
  arrProductImport: any;
}

class InputitemImport extends PureComponent<IProps> {
  soLuong: number = 0;
  nhapSoLuong = (value: string) => {
    if (value) {
      this.props.setProductToImport({
        product: this.props.itemProduct.product,
        price_books: BANG_GIA_CHUNG,
        totalQty: parseInt(value, 10)
      });
    } else {
      this.props.setProductToImport({
        product: this.props.itemProduct.product,
        price_books: BANG_GIA_CHUNG,
        totalQty: 0
      });
    }
  };
  truSpImport = () => {
    if (this.soLuong > 0) {
      this.props.addProductToImport({
        product: this.props.itemProduct.product,
        price_books: BANG_GIA_CHUNG,
        totalQty: -1
      });
    } else {
      Alert.alert('Bạn chắc chắn có muốn xoá sản phẩm ?', '', [
        {
          text: 'Đóng',
          style: 'cancel'
        }
        // {text: 'Xoá', onPress: this.deleteSp, style: 'destructive'}
      ]);
    }
  };
  congSpImport = () => {
    this.props.addProductToImport({
      product: this.props.itemProduct.product,
      price_books: BANG_GIA_CHUNG,
      totalQty: 1
    });
  };

  render() {
    const {arrProductImport} = this.props;

    let textSoLuong = 0;
    if (arrProductImport) {
      let found = -1;
      found = arrProductImport?.findIndex(
        (x: IProductSale) => x.product.sku === this.props.itemProduct.product.sku
      );
      if (found > -1) {
        textSoLuong = arrProductImport[found].totalQty;
      }
    }
    this.soLuong = textSoLuong;
    return (
      <MyView transparent style={itemAddImportStyles.infoProdRight}>
        <MyButton transparent style={itemAddImportStyles.btnCountItem} onPress={this.truSpImport}>
          <MyIcon iconFontType={'MaterialCommunityIcons'} name={'minus'} size={20} />
        </MyButton>
        <MyInput
          containerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent'
          }}
          value={textSoLuong.toString()}
          onChangeText={this.nhapSoLuong}
          keyboardType={'number-pad'}
          returnKeyType="done"
          numberOfLines={1}
        />
        <MyButton transparent style={itemAddImportStyles.btnCountItem} onPress={this.congSpImport}>
          <MyIcon iconFontType={'MaterialCommunityIcons'} name={'plus'} size={20} />
        </MyButton>
      </MyView>
    );
  }
}
const mapStateToProps = (state: RootState) => {
  const {isManySelected} = state.AddImportOrderReducer;
  return {
    isManySelected
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({addProductToImport, setProductToImport, setIsManySelected}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(
  InputitemImport
);
