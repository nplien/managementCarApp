import React, {Component} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import {MyView, MyLoading, MyButtonText, MyText} from 'bases/components';

import {
  ItemBoderBottom,
  ItemLineIndicator,
  ItemLineIndicatorCustom,
  ItemProduct
} from 'views/app/components/items';
import {RootState} from 'views/app/redux/App.Reducer';
import {bindActionCreators} from 'redux';
import {
  IProductHangHoaState,
  GetProductHangHoa,
  showRefreshHangHoa,
  showLoadmoreHangHoa
} from './redux';
import {ProductModel} from 'models/Product.Model';
import ChangeGiaBan from './components/ChangeGiaBanHangHoa';
import {CONFIG_PRICE_SHOW} from 'common/Constants';
import SortFilter from './components/SortFilterHangHoa';
import MyNavigator from 'utils/MyNavigator';
import {CategoryStyle} from './styles/ProductHangHoa.Style';
import {IChooseStoreState} from 'views/menuLeft/redux';
import Utilities from 'utils/Utilities';
import {COLOR} from 'bases/styles/Core';
const arrrTextTest = [
  {name: ' LG01 Lọc gió điều hòa ', price: 120000, id: 24182},
  {name: 'LG02 Lọc gió động cơ ', price: 350000, id: 24181},
  {name: 'CG01 Cần gạt mưa  ', price: 679000, id: 24154},
  {name: 'CG01 Cần gạt mưa  ', price: 560000, id: 24140},
  {name: ' BAQ Bình ắc quy ', price: 2000000, id: 23078},
  {name: 'BDP Bảo dưỡng phanh  ', price: 200000, id: 22466},
  {name: '. VS01 Vệ sinh Bu zi  ', price: 200000, id: 22465},
  {name: 'LX01 Lốp xe', price: 560000, id: 22464},
  {name: 'LG02 Lọc gió động cơ ', price: 120000, id: 22463},
  {name: 'LG02 Lọc gió động cơ ', price: 120000, id: 22449}
];
interface IProps extends IProductHangHoaState, IChooseStoreState {
  GetProductHangHoa: typeof GetProductHangHoa;
  showRefreshHangHoa: typeof showRefreshHangHoa;
  showLoadmoreHangHoa: typeof showLoadmoreHangHoa;
}

class ProductHangHoa extends Component<IProps> {
  mapItemRef: Map<string, any> = new Map();

  onPressOpenDetail = (itemProduct: ProductModel) => {
    MyNavigator.push('ProductDetail', {
      itemProduct: itemProduct
    });
  };

  renderHeader = () => {
    return (
      <MyView transparent>
        <SortFilter isShowSearchCode={false} isShowSort={true} />
      </MyView>
    );
  };

  renderFooter = () => {
    return <ChangeGiaBan />;
  };

  renderItem = ({item}: {item: ProductModel}) => {
    const {giaHienThi, cuaHangDangChon} = this.props;
    return (
      <ItemProduct
        ref={node => {
          this.mapItemRef.set(item.sku, node);
        }}
        itemProduct={item}
        cuaHangDangChon={cuaHangDangChon}
        price={
          giaHienThi?.id === CONFIG_PRICE_SHOW.HANG_HOA[0].id ? item.price : item.original_price
        }
        onPress={() => this.onPressOpenDetail(item)}
      />
    );
  };

  keyExtractor = (item: ProductModel) => {
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
            onPress={() => this.props.GetProductHangHoa()}
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
        <MyView transparent style={CategoryStyle.emptyCustomer}>
          <MyLoading />
        </MyView>
      );
    } else {
      return <ItemBoderBottom />;
    }
  };

  componentDidMount() {
    const {isFirstLoading} = this.props;
    if (isFirstLoading) {
      this.props.GetProductHangHoa();
    }
  }

  reload = () => {
    const {isFirstLoading, isLoadMore} = this.props;

    if (!isFirstLoading && !isLoadMore) {
      this.props.showRefreshHangHoa(true);
      this.props.GetProductHangHoa();
    }
  };

  onEndReached = () => {
    const {isLoadMore, isStop} = this.props;

    if (isLoadMore || isStop) {
      return;
    }
    this.props.showLoadmoreHangHoa(true);
    this.props.GetProductHangHoa();
  };

  render() {
    const {arrProduct, isRefresh, arrPhuTungTmp} = this.props;
    arrProduct?.forEach((item, index) => {
      const element = arrrTextTest.findIndex(value => value.id === item.id);
      if (element > 1) {
        arrProduct[index].name = arrrTextTest[element].name;
        arrProduct[index].price = arrrTextTest[element].price;
      }
    });
    const children = arrPhuTungTmp?.concat(arrProduct);
    return (
      <MyView style={CategoryStyle.container}>
        <ItemLineIndicatorCustom />
        {this.renderHeader()}
        <MyView style={[CategoryStyle.myViewTop2, {flexDirection: 'row', alignItems: 'center'}]}>
          <MyText
            style={[
              CategoryStyle.textSum,
              {
                color: COLOR.TEXT.BLUE
              }
            ]}
            myFontStyle="700"
            numberOfLines={1}>
            {Utilities.convertCount(children.length)}
          </MyText>
          <MyText style={{}} myFontStyle="Medium" numberOfLines={1}>
            {' hàng hóa'}
          </MyText>
        </MyView>
        <ItemLineIndicatorCustom />
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isRefresh || false} onRefresh={this.reload} />
          }
          data={children}
          contentContainerStyle={CategoryStyle.contentContainerStyle}
          extraData={children}
          initialNumToRender={10}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          ItemSeparatorComponent={this.renderItemSeparatorComponent}
          ListEmptyComponent={this.renderListEmptyComponent}
          // ListFooterComponent={this.renderListFooterComponent}
          onEndReachedThreshold={0.1}
          // onEndReached={this.onEndReached}
        />
        {/* {this.renderFooter()} */}
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {isFirstLoading, isRefresh, arrProduct, isLoadMore, isStop, isError, giaHienThi} =
    state.ProductHangHoaReducer;
  const {arrPhuTungTmp} = state.PhieuSuaChuaReducer;
  const {cuaHangDangChon} = state.ChooseStoreReducer;
  return {
    isFirstLoading,
    isRefresh,
    arrProduct,
    isLoadMore,
    isStop,
    isError,
    giaHienThi,
    cuaHangDangChon,
    arrPhuTungTmp
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      GetProductHangHoa,
      showRefreshHangHoa,
      showLoadmoreHangHoa
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductHangHoa);
