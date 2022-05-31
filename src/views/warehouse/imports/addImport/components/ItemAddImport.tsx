import * as React from 'react';
import {connect} from 'react-redux';
import {
  MyButton,
  MyView,
  MyText,
  MyTextPriceMask,
  MyIcon,
  MyInputPriceMask
} from 'bases/components';
import {bindActionCreators} from 'redux';
import {
  addProductToImport,
  IAddImportOrderState,
  setProductToImport,
  setIsManySelected,
  deleteItemImport
} from '../redux';
import {itemAddImportStyles} from '../style/AddImport.Styles';
import {IProductSale} from 'models/Product.Model';
import {Alert} from 'react-native';
import {RootState} from 'views/app/redux/App.Reducer';
import {COLOR} from 'bases/styles/Core';
import {BANG_GIA_CHUNG} from 'common/Constants';

interface IProps extends IAddImportOrderState {
  addProductToImport: typeof addProductToImport;
  setProductToImport: typeof setProductToImport;
  setIsManySelected: typeof setIsManySelected;
  deleteItemImport: typeof deleteItemImport;
  itemProduct: IProductSale;
  onPressItem: (item: IProductSale) => void;
}
interface IState {
  isCheck: boolean;
}

class ItemAddImport extends React.Component<IProps, IState> {
  state = {isCheck: false};
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
    if (this.soLuong > 1) {
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
        },
        {
          text: 'Xoá',
          onPress: () =>
            this.props.deleteItemImport({
              product: this.props.itemProduct.product,
              price_books: BANG_GIA_CHUNG,
              totalQty: 1
            }),
          style: 'destructive'
        }
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
  onLongPress = () => {
    const {isManySelected} = this.props;

    if (!isManySelected) {
      this.setState(
        {
          isCheck: true
        },
        () => {
          this.props.setIsManySelected(true);
        }
      );
    }
  };
  onPress = () => {
    const {isManySelected} = this.props;
    if (isManySelected) {
      this.setState({
        isCheck: !this.state.isCheck
      });
    } else {
      this.props.onPressItem(this.props.itemProduct);
    }
  };
  getIsCheck = (): boolean => {
    return this.state.isCheck;
  };

  getItem = (): IProductSale => {
    return {
      product: this.props.itemProduct.product,
      price_books: BANG_GIA_CHUNG,
      totalQty: this.soLuong
    };
  };

  unCheck = () => {
    this.setState({
      isCheck: false
    });
  };

  render() {
    const {product} = this.props.itemProduct;
    const {arrProductImport} = this.props;

    let textSoLuong = 0;
    if (arrProductImport) {
      let found = -1;
      found = arrProductImport?.findIndex((x: IProductSale) => x.product.sku === product.sku);
      if (found > -1) {
        textSoLuong = arrProductImport[found].totalQty;
      }
    }
    this.soLuong = textSoLuong;
    let totalStock = 0;
    if (product?.stocks) {
      for (let index = 0; index < product?.stocks.length; index++) {
        const element = product?.stocks[index];
        if (element.total_quantity && element.total_quantity >= 0) {
          totalStock = totalStock + element.total_quantity;
        }
      }
    }
    const {isCheck} = this.state;

    return (
      <MyButton
        onLongPress={this.onLongPress}
        onPress={this.onPress}
        style={{
          backgroundColor: isCheck ? COLOR.BG.BLACK_10 : COLOR.BG.PRIMARY
        }}>
        <MyView style={itemAddImportStyles.container} transparent>
          <MyView style={itemAddImportStyles.infoProdCenter} transparent>
            <MyText
              numberOfLines={2}
              myFontStyle="Regular"
              style={itemAddImportStyles.textNameCenter}>
              {product?.name}
            </MyText>
            <MyText numberOfLines={1} myFontStyle="Medium" style={itemAddImportStyles.textIDCenter}>
              {product?.sku}
            </MyText>
          </MyView>
          <MyView style={itemAddImportStyles.infoProdRight} transparent>
            <MyTextPriceMask
              hideCurrency
              text={totalStock}
              numberOfLines={1}
              myFontStyle="Regular"
              style={[itemAddImportStyles.textPriceRight, {color: COLOR.TEXT.GREEN}]}
            />
          </MyView>
        </MyView>
        <MyView style={itemAddImportStyles.viewBtn} transparent>
          <MyView style={itemAddImportStyles.viewBotPrice} transparent>
            <MyTextPriceMask
              text={product?.original_price || 0}
              numberOfLines={1}
              style={itemAddImportStyles.textPriceLeft}
            />
            <MyText style={itemAddImportStyles.textX}>X</MyText>
          </MyView>
          <MyView style={itemAddImportStyles.viewBot} transparent>
            <MyButton
              style={itemAddImportStyles.btnCountItem}
              onPress={this.truSpImport}
              transparent>
              <MyIcon iconFontType={'MaterialCommunityIcons'} name={'minus'} size={22} />
            </MyButton>
            <MyInputPriceMask
              numberOfLines={1}
              containerStyle={itemAddImportStyles.bgTranparent}
              style={itemAddImportStyles.inputSoluong}
              value={textSoLuong.toString()}
              keyboardType={'number-pad'}
              onTextCallback={this.nhapSoLuong}
              returnKeyType="done"
            />
            <MyButton
              style={itemAddImportStyles.btnCountItem}
              onPress={this.congSpImport}
              transparent>
              <MyIcon iconFontType={'MaterialCommunityIcons'} name={'plus'} size={22} />
            </MyButton>
          </MyView>
        </MyView>
      </MyButton>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {arrProductImport, isManySelected} = state.AddImportOrderReducer;
  return {
    arrProductImport,
    isManySelected
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {addProductToImport, setProductToImport, setIsManySelected, deleteItemImport},
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(
  ItemAddImport
);
