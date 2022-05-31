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
import {itemCreateSaleStyles} from '../styles/CreateSale.styles';
import Utilities from 'utils/Utilities';
import {bindActionCreators} from 'redux';
import {IProductSale, StockProduct} from 'models/Product.Model';
import {RootState} from 'views/app/redux/App.Reducer';
import {
  ICreateSaleState,
  setProductToCart,
  addProductToCart,
  deleteProductToCart,
  setIsManySelected
} from '../redux';
import {COLOR} from 'bases/styles/Core';
import {Alert} from 'react-native';
import {BANG_GIA_CHUNG} from 'common/Constants';
import {IStorePerson} from 'models/ModelBase';

interface IProps extends ICreateSaleState {
  item: IProductSale;
  cuaHangDangChon?: IStorePerson;

  setProductToCart: typeof setProductToCart;
  addProductToCart: typeof addProductToCart;
  deleteProductToCart: typeof deleteProductToCart;
  setIsManySelected: typeof setIsManySelected;

  onPressItem: (item: IProductSale) => void;
}

interface IState {
  isCheck: boolean;
}

class ItemCreateSale extends React.Component<IProps, IState> {
  state = {isCheck: false};

  soLuong: number = 0;

  nhapSoLuong = (value: string) => {
    if (value) {
      this.props.setProductToCart({
        product: this.props.item.product,
        totalQty: parseInt(value, 10),
        price_books: this.props.item.price_books
      });
    } else {
      this.props.setProductToCart({
        product: this.props.item.product,
        totalQty: 1,
        price_books: this.props.item.price_books
      });
    }
  };

  congSp = () => {
    this.props.addProductToCart({
      product: this.props.item.product,
      totalQty: 1,
      price_books: this.props.item.price_books
    });
  };

  truSp = () => {
    if (this.soLuong > 1) {
      this.props.addProductToCart({
        product: this.props.item.product,
        totalQty: -1,
        price_books: this.props.item.price_books
      });
    } else {
      Alert.alert('Bạn có chắc chắn muốn xoá sản phẩm ?', '', [
        {
          text: 'Đóng',
          style: 'cancel'
        },
        {text: 'Xoá', onPress: this.deleteSp, style: 'destructive'}
      ]);
    }
  };

  deleteSp = () => {
    this.props.deleteProductToCart({
      product: this.props.item.product,
      totalQty: 1,
      price_books: this.props.item.price_books
    });
  };

  canhBao = () => {
    Utilities.showToast('Quá số lượng tồn kho!', '', 'danger');
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
      this.props.onPressItem(this.props.item);
    }
  };

  getIsCheck = (): boolean => {
    return this.state.isCheck;
  };

  getItem = (): IProductSale => {
    return {
      product: this.props.item.product,
      totalQty: this.soLuong,
      price_books: this.props.item.price_books
    };
  };

  unCheck = () => {
    this.setState({
      isCheck: false
    });
  };

  render() {
    const {item, arrProductSale, cuaHangDangChon} = this.props;

    const {price_books, stocks} = item.product;
    let price = item.product.price || 0;
    if (price_books) {
      let found = price_books.findIndex(x => x.id === item.price_books.id);
      if (found > -1) {
        price = price_books[found].price || item.product.price || 0;
      }
    }
    if (item.price_books.id === BANG_GIA_CHUNG.id && item.product.discount && item.product.price) {
      price = item.product.price;
    }

    let tonKho = 0;
    let listTonKho: StockProduct[] = [];
    if (stocks) {
      listTonKho = stocks.filter(element => {
        return element?.id?.toString() === cuaHangDangChon?.id?.toString();
      });
    }
    for (let index = 0; index < listTonKho.length; index++) {
      const element = listTonKho[index];
      tonKho = tonKho + Number(element.total_quantity || 0);
    }

    let textSoLuong = 0;
    if (arrProductSale) {
      let found = -1;
      found = arrProductSale?.findIndex((x: IProductSale) => x.product.sku === item.product.sku);
      if (found > -1) {
        textSoLuong = arrProductSale[found].totalQty;
      }
    }
    this.soLuong = textSoLuong;

    const {isCheck} = this.state;

    return (
      <MyButton
        onLongPress={this.onLongPress}
        onPress={this.onPress}
        style={{
          backgroundColor: isCheck ? COLOR.BG.BLACK_10 : COLOR.BG.PRIMARY
        }}>
        <MyView style={itemCreateSaleStyles.container} transparent>
          <MyView style={itemCreateSaleStyles.infoProdCenter} transparent>
            <MyText
              numberOfLines={2}
              myFontStyle="Regular"
              style={itemCreateSaleStyles.textNameCenter}>
              {item.product.name}
            </MyText>
            <MyText
              numberOfLines={1}
              myFontStyle="Medium"
              style={itemCreateSaleStyles.textIDCenter}>
              {item.product.sku}
            </MyText>
          </MyView>
          <MyView style={itemCreateSaleStyles.infoProdRight} transparent>
            <MyText
              numberOfLines={1}
              myFontStyle="Regular"
              style={[itemCreateSaleStyles.textPriceRight, {color: COLOR.TEXT.GREEN}]}>
              {Utilities.convertCount(tonKho)}
            </MyText>
          </MyView>
        </MyView>
        <MyView style={itemCreateSaleStyles.viewBtn} transparent>
          <MyView style={itemCreateSaleStyles.viewBotPrice} transparent>
            <MyTextPriceMask
              text={Utilities.convertCount(price)}
              numberOfLines={1}
              style={itemCreateSaleStyles.textPriceLeft}
            />
            <MyText style={itemCreateSaleStyles.textX}>X</MyText>
          </MyView>
          <MyView style={itemCreateSaleStyles.viewBot} transparent>
            {tonKho < textSoLuong ? (
              <MyButton onPress={this.canhBao} transparent>
                <MyIcon
                  iconFontType={'Octicons'}
                  name={'alert'}
                  size={18}
                  color={'red'}
                  style={itemCreateSaleStyles.icon}
                />
              </MyButton>
            ) : null}
            <MyButton style={itemCreateSaleStyles.btnCountItem} onPress={this.truSp} transparent>
              <MyIcon iconFontType={'MaterialCommunityIcons'} name={'minus'} size={22} />
            </MyButton>
            <MyInputPriceMask
              numberOfLines={1}
              containerStyle={itemCreateSaleStyles.bgTranparent}
              style={itemCreateSaleStyles.inputSoluong}
              value={Utilities.convertCount(textSoLuong).toString()}
              keyboardType={'number-pad'}
              onTextCallback={this.nhapSoLuong}
              returnKeyType="done"
            />
            <MyButton style={itemCreateSaleStyles.btnCountItem} onPress={this.congSp} transparent>
              <MyIcon iconFontType={'MaterialCommunityIcons'} name={'plus'} size={22} />
            </MyButton>
          </MyView>
        </MyView>
      </MyButton>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {arrProductSale, isManySelected} = state.CreateSaleReducer;
  return {
    arrProductSale,
    isManySelected
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      setProductToCart,
      addProductToCart,
      deleteProductToCart,
      setIsManySelected
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(
  ItemCreateSale
);
