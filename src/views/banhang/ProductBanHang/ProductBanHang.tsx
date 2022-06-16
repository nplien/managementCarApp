import React, {Component} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import {MyView, MyLoading, MyButtonText, MyText} from 'bases/components';
import {ItemLineIndicator, ItemProductOption} from 'views/app/components/items';
import {RootState} from 'views/app/redux/App.Reducer';
import {bindActionCreators} from 'redux';
import {
  IProductBanHangState,
  GetProductBanHang,
  DestroyBanHang,
  showRefreshBanHang,
  showLoadmore
} from './redux';
import {IProductSale, ProductOptionsModel} from 'models/Product.Model';
import SortFilter from './components/SortFilterBanHang';
import MyNavigator from 'utils/MyNavigator';
import HeaderSelected from './components/HeaderSelectedBanHang';
import ChooseBangGia from './components/ChooseBangGiaBanHang';
import ChooseKhachHang from './components/ChooseKhachBanHang';
import {addListProductToCart, addProductToCart} from '../createSale/redux';
import {pushValueItem, pushArrayValueItem} from 'views/warehouse/exports/createExports/redux';
import {addListProductToImport, addProductToImport} from 'views/warehouse/imports/addImport/redux';
import BottomManyChoose from './components/BottomManyChoose';
import {BHCustomerandPrice, CategoryStyle} from './styles/ProductHangHoa.Style';
import {BANG_GIA_CHUNG} from 'common/Constants';
import {IChooseStoreState} from 'views/menuLeft/redux';
import {arrrProductNameTest} from './redux/ProductNameTest';

interface IProps extends IProductBanHangState, IChooseStoreState {
  GetProductBanHang: typeof GetProductBanHang;
  DestroyBanHang: typeof DestroyBanHang;
  showRefreshBanHang: typeof showRefreshBanHang;
  showLoadmore: typeof showLoadmore;
  addProductToCart: typeof addProductToCart;
  addListProductToCart: typeof addListProductToCart;
  pushValueItem: typeof pushValueItem;
  pushArrayValueItem: typeof pushArrayValueItem;
  addProductToImport: typeof addProductToImport;
  addListProductToImport: typeof addListProductToImport;
}

class ProductBanHang extends Component<IProps> {
  mapItemRef: Map<string, any> = new Map();

  onPressChonBanHang = (itemProduct: ProductOptionsModel) => {
    const {isSelectMany, currentBangGia} = this.props;
    if (isSelectMany) {
      this.mapItemRef.get(itemProduct.sku).setCheck();
    } else {
      this.props.addProductToCart({
        product: itemProduct,
        price_books: currentBangGia || BANG_GIA_CHUNG,
        totalQty: 1
      });
      MyNavigator.navigate('CreateSale');
    }
  };

  renderHeader = () => {
    return (
      <MyView transparent>
        <SortFilter isShowSearchCode={true} isShowSort={false} />
        <MyView style={BHCustomerandPrice.container}>
          <ChooseKhachHang />
          <ChooseBangGia />
        </MyView>
        <HeaderSelected huySelectedMany={this.pressHuyChonNhieu} />
      </MyView>
    );
  };

  pressHuyChonNhieu = () => {
    for (let [, value] of this.mapItemRef) {
      if (value) {
        if (value.getIsCheck()) {
          value.setCheck();
        }
      }
    }
  };

  pressXongChonNhieu = () => {
    const arrItemSaleDaChon: IProductSale[] = [];
    const arrItemProductDaChon: ProductOptionsModel[] = [];
    for (let [, value] of this.mapItemRef) {
      if (value) {
        if (value.getIsCheck()) {
          value.setCheck();
          arrItemSaleDaChon.push({
            product: value.getItem(),
            price_books: this.props.currentBangGia || BANG_GIA_CHUNG,
            totalQty: 1
          });
          arrItemProductDaChon.push(value.getItem());
        }
      }
    }
    this.props.addListProductToCart(arrItemSaleDaChon);
    MyNavigator.navigate('CreateSale');
  };

  renderFooter = () => {
    return (
      <BottomManyChoose
        pressHuyChonNhieu={this.pressHuyChonNhieu}
        pressXongChonNhieu={this.pressXongChonNhieu}
      />
    );
  };

  renderItem = ({item}: {item: ProductOptionsModel}) => {
    const {currentBangGia, cuaHangDangChon} = this.props;
    // const {price_books} = item;
    let price = item.price || 0;
    // if (price_books) {
    //   let found = price_books.findIndex(x => x.id === currentBangGia?.id);
    //   if (found > -1) {
    //     price = price_books[found].price || item.price || 0;
    //   }
    // }
    // if (currentBangGia?.id === BANG_GIA_CHUNG.id && item.discount && item.price) {
    //   price = item.price;
    // }

    return (
      <ItemProductOption
        ref={node => {
          this.mapItemRef.set(item.sku, node);
        }}
        itemProduct={item}
        cuaHangDangChon={cuaHangDangChon}
        isShowDiscount={currentBangGia?.id === BANG_GIA_CHUNG.id}
        price={price}
        onPress={() => this.onPressChonBanHang(item)}
      />
    );
  };

  keyExtractor = (item: ProductOptionsModel) => {
    return item.id.toString();
  };

  renderListEmptyComponent = () => {
    const {isFirstLoading, isError} = this.props;
    if (isFirstLoading) {
      return (
        <MyView style={CategoryStyle.emptyCustomer}>
          <MyLoading />
        </MyView>
      );
    }
    if (isError) {
      return (
        <MyView style={CategoryStyle.emptyCustomer}>
          <MyText>Không có dữ liệu</MyText>
          <MyButtonText
            onPress={() => this.props.GetProductBanHang()}
            title="Tải lại"
            style={CategoryStyle.BtnEmpty}
          />
        </MyView>
      );
    } else {
      return (
        <MyView style={CategoryStyle.emptyCustomer}>
          <MyText>Không có dữ liệu</MyText>
        </MyView>
      );
    }
  };

  renderItemSeparatorComponent = () => {
    return <ItemLineIndicator />;
  };

  renderListFooterComponent = () => {
    const {isLoadMore} = this.props;
    if (isLoadMore) {
      return (
        <MyView style={CategoryStyle.emptyCustomer}>
          <MyLoading />
        </MyView>
      );
    } else {
      return null;
    }
  };

  componentDidMount() {
    const {isFirstLoading} = this.props;
    if (isFirstLoading) {
      this.props.GetProductBanHang();
    }
  }

  reload = () => {
    this.props.showRefreshBanHang(true);
    this.props.GetProductBanHang();
  };

  onEndReached = () => {
    const {isLoadMore, isStop} = this.props;

    if (isLoadMore || isStop) {
      return;
    }
    this.props.showLoadmore(true);
    this.props.GetProductBanHang();
  };

  shouldComponentUpdate(nextProps: IProps) {
    if (this.props.isSelectMany !== nextProps.isSelectMany) return false;
    return true;
  }

  render() {
    const {arrProduct, isRefresh} = this.props;

    return (
      <MyView transparent style={CategoryStyle.container}>
        {this.renderHeader()}
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isRefresh || false} onRefresh={this.reload} />
          }
          data={arrProduct}
          extraData={arrProduct}
          initialNumToRender={10}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          ItemSeparatorComponent={this.renderItemSeparatorComponent}
          ListEmptyComponent={this.renderListEmptyComponent}
          // ListFooterComponent={this.renderListFooterComponent}
          onEndReachedThreshold={0.1}
          // onEndReached={this.onEndReached}
          contentContainerStyle={CategoryStyle.contentContainerStyle}
        />
        {this.renderFooter()}
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {
    isFirstLoading,
    isRefresh,
    arrProduct,
    isLoadMore,
    isStop,
    isError,
    giaHienThi,
    currentBangGia,
    isSelectMany
  } = state.ProductBanHangReducer;
  const {cuaHangDangChon} = state.ChooseStoreReducer;
  return {
    isFirstLoading,
    isRefresh,
    arrProduct,
    isLoadMore,
    isStop,
    isError,
    giaHienThi,
    currentBangGia,
    isSelectMany,

    cuaHangDangChon
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      GetProductBanHang,
      DestroyBanHang,
      showRefreshBanHang,
      showLoadmore,
      pushValueItem,
      pushArrayValueItem,
      addProductToCart,
      addListProductToCart,
      addProductToImport,
      addListProductToImport
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductBanHang);
