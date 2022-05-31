import React, {Component} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import {MyView, MyLoading, MyButtonText, MyText} from 'bases/components';
import {ItemLineIndicator, ItemProductOption} from 'views/app/components/items';
import {RootState} from 'views/app/redux/App.Reducer';
import {bindActionCreators} from 'redux';
import {
  IProductcategoryState,
  GetProductCategory,
  DestroyCategory,
  showRefresh,
  showLoadmore
} from './redux';
import {IProductSale, ProductOptionsModel} from 'models/Product.Model';
import {CategoryStyle} from './styles/Category.Style';
import ChangeGiaBan from './components/changeGiaBan/ChangeGiaBan';
import {IChangeGiaBanState} from './components/changeGiaBan/redux';
import {BANG_GIA_CHUNG, SCREEN_PRODUCT_TYPE} from 'common/Constants';
import SortFilter from './components/sortFilter/SortFilter';
import MyNavigator from 'utils/MyNavigator';
import HeaderSelected from './components/selectedMany/HeaderSelected';
import {BHCustomerandPrice} from './styles/BanHang.style';
import ChooseBangGia from './components/chooseBangGia/ChooseBangGia';
import ChooseKhachHang from './components/chooseKhachHang/ChooseKhachHang';
import {IChooseBangGiaState} from './components/chooseBangGia/redux';
import {IHeaderSelectedState} from './components/selectedMany/redux';
import {addListProductToCart, addProductToCart} from 'views/banhang/createSale/redux';
import {pushValueItem, pushArrayValueItem} from 'views/warehouse/exports/createExports/redux';
import {addListProductToImport, addProductToImport} from 'views/warehouse/imports/addImport/redux';
import BottomManyChoose from './components/bottomManyChoose/BottomManyChoose';

interface IProps
  extends IProductcategoryState,
    IChangeGiaBanState,
    IChooseBangGiaState,
    IHeaderSelectedState {
  GetProductCategory: typeof GetProductCategory;
  DestroyCategory: typeof DestroyCategory;
  showRefresh: typeof showRefresh;
  showLoadmore: typeof showLoadmore;
  addProductToCart: typeof addProductToCart;
  addListProductToCart: typeof addListProductToCart;
  pushValueItem: typeof pushValueItem;
  pushArrayValueItem: typeof pushArrayValueItem;
  addProductToImport: typeof addProductToImport;
  addListProductToImport: typeof addListProductToImport;
  route: {
    params: {
      type: 'HANG_HOA' | 'BAN_HANG' | 'NHAP_HANG' | 'XUAT_HANG';
    };
  };
}

class ProductCategorys extends Component<IProps> {
  mapItemRef: Map<string, any> = new Map();

  onPressOpenDetail = (itemProduct: ProductOptionsModel) => {
    MyNavigator.navigate('ProductDetail', {
      idCha: itemProduct.parent_id || 0,
      idCon: itemProduct.id
    });
  };

  onPressChonBanHang = (itemProduct: ProductOptionsModel) => {
    const {isSelectMany} = this.props;
    if (isSelectMany) {
      this.mapItemRef.get(itemProduct.sku).setCheck();
    } else {
      this.props.addProductToCart({product: itemProduct, price_books: BANG_GIA_CHUNG, totalQty: 1});
      MyNavigator.navigate('CreateSale');
    }
  };

  onPressExportProduct = (itemProduct: ProductOptionsModel) => {
    const {isSelectMany} = this.props;
    if (isSelectMany) {
      this.mapItemRef.get(itemProduct.sku).setCheck();
    } else {
      this.props.pushValueItem(itemProduct);
      MyNavigator.goBack();
    }
  };

  onPressImportProduct = (itemProduct: ProductOptionsModel) => {
    const {isSelectMany} = this.props;
    if (isSelectMany) {
      this.mapItemRef.get(itemProduct.sku).setCheck();
    } else {
      this.props.addProductToImport({
        product: itemProduct,
        price_books: BANG_GIA_CHUNG,
        totalQty: 1
      });
      MyNavigator.goBack();
    }
  };

  renderHeader = () => {
    const {route} = this.props;

    switch (route?.params?.type) {
      case SCREEN_PRODUCT_TYPE.HANG_HOA:
        return <SortFilter isShowSearchCode={false} isShowSort={true} />;

      case SCREEN_PRODUCT_TYPE.BAN_HANG:
        return (
          <>
            <SortFilter isShowSearchCode={true} isShowSort={false} />
            <MyView style={BHCustomerandPrice.container}>
              <ChooseKhachHang />
              <ChooseBangGia />
            </MyView>
            <HeaderSelected huySelectedMany={this.pressHuyChonNhieu} />
          </>
        );
      case SCREEN_PRODUCT_TYPE.NHAP_HANG:
      case SCREEN_PRODUCT_TYPE.XUAT_HANG:
        return (
          <>
            <SortFilter isShowSearchCode={true} isShowSort={false} />
            <ItemLineIndicator />
            <HeaderSelected huySelectedMany={this.pressHuyChonNhieu} />
          </>
        );

      default:
        return <MyView />;
    }
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
            price_books: BANG_GIA_CHUNG,
            totalQty: 1
          });
          arrItemProductDaChon.push(value.getItem());
        }
      }
    }
    const {route} = this.props;
    switch (route?.params?.type) {
      case SCREEN_PRODUCT_TYPE.HANG_HOA: {
        break;
      }

      case SCREEN_PRODUCT_TYPE.BAN_HANG: {
        this.props.addListProductToCart(arrItemSaleDaChon);
        MyNavigator.navigate('CreateSale');
        break;
      }
      case SCREEN_PRODUCT_TYPE.NHAP_HANG: {
        this.props.addListProductToImport(arrItemSaleDaChon);
        MyNavigator.goBack();
        break;
      }
      case SCREEN_PRODUCT_TYPE.XUAT_HANG: {
        this.props.pushArrayValueItem(arrItemProductDaChon);
        MyNavigator.goBack();
        break;
      }

      default: {
        break;
      }
    }
  };

  renderFooter = () => {
    const {route} = this.props;

    switch (route?.params?.type) {
      case SCREEN_PRODUCT_TYPE.HANG_HOA:
        return <ChangeGiaBan />;

      case SCREEN_PRODUCT_TYPE.BAN_HANG:
      case SCREEN_PRODUCT_TYPE.NHAP_HANG:
      case SCREEN_PRODUCT_TYPE.XUAT_HANG:
        return (
          <BottomManyChoose
            pressHuyChonNhieu={this.pressHuyChonNhieu}
            pressXongChonNhieu={this.pressXongChonNhieu}
          />
        );

      default:
        return <MyView />;
    }
  };

  renderItem = ({item}: {item: ProductOptionsModel}) => {
    const {route} = this.props;

    switch (route?.params?.type) {
      case SCREEN_PRODUCT_TYPE.NHAP_HANG: {
        return (
          <ItemProductOption
            ref={node => {
              this.mapItemRef.set(item.sku, node);
            }}
            itemProduct={item}
            price={item.original_price}
            onPress={() => this.onPressImportProduct(item)}
          />
        );
      }

      case SCREEN_PRODUCT_TYPE.XUAT_HANG: {
        return (
          <ItemProductOption
            ref={node => {
              this.mapItemRef.set(item.sku, node);
            }}
            itemProduct={item}
            price={item.price}
            onPress={() => this.onPressExportProduct(item)}
          />
        );
      }

      default:
        return <MyView />;
    }
  };

  keyExtractor = (item: ProductOptionsModel) => {
    return item.sku;
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
            onPress={() => this.props.GetProductCategory()}
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
      this.props.GetProductCategory();
    }
  }

  reload = () => {
    const {isFirstLoading, isLoadMore} = this.props;

    if (!isFirstLoading && !isLoadMore) {
      this.props.showRefresh(true);
      this.props.GetProductCategory();
    }
  };

  onEndReached = () => {
    const {isLoadMore, isStop} = this.props;

    if (isLoadMore || isStop) {
      return;
    }
    this.props.showLoadmore(true);
    this.props.GetProductCategory();
  };

  shouldComponentUpdate(nextProps: IProps) {
    if (this.props.isSelectMany !== nextProps.isSelectMany) return false;
    return true;
  }

  render() {
    const {arrProduct, isRefresh} = this.props;

    return (
      <MyView style={CategoryStyle.container}>
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
          ListFooterComponent={this.renderListFooterComponent}
          onEndReachedThreshold={0.1}
          onEndReached={this.onEndReached}
        />
        {this.renderFooter()}
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {isFirstLoading, isRefresh, arrProduct, isLoadMore, isStop, isError} =
    state.ProductCategoryReducer;
  const {giaHienThi} = state.ChangeGiaBanReducer;
  const {currentBangGia} = state.ChooseBangGiaReducer;
  const {isSelectMany} = state.HeaderSelectedReducer;
  return {
    isFirstLoading,
    isRefresh,
    arrProduct,
    isLoadMore,
    isStop,
    isError,
    giaHienThi,
    currentBangGia,
    isSelectMany
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      GetProductCategory,
      DestroyCategory,
      showRefresh,
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategorys);
