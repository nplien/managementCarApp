import React, {Component} from 'react';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';
import {MyView, MyText} from 'bases/components';
import {ItemLineIndicator} from 'views/app/components/items';
import {RootState} from 'views/app/redux/App.Reducer';
import {bindActionCreators} from 'redux';

import {IPhuTungModel, IProductPhuTung} from 'models/PhuTung.Model';
import {ItemPhuTung} from './components/ItemPhuTung';
import MyNavigator from 'utils/MyNavigator';
import {addListProductToCart, addProductToCart, ICreatePSCState} from 'views/createPSC/redux';
import {CategoryStyle} from 'views/banhang/ProductBanHang/styles/ProductHangHoa.Style';
import ChonTiepNhanXe from './components/ChonTiepNhanXe';
import HeaderSelectedPhuTung from './components/HeaderSelectedPhuTung';
import BottomChoosePhuTung from './components/BottomChoosePhuTung';

interface IProps extends ICreatePSCState {
  addProductToCart: typeof addProductToCart;
  addListProductToCart: typeof addListProductToCart;
}

class AddPhieuSuaChua extends Component<IProps> {
  mapItemRef: Map<string, any> = new Map();

  onPressChonBanHang = (itemProduct: IPhuTungModel) => {
    const {isSelectedManyPSC} = this.props;
    if (isSelectedManyPSC) {
      this.mapItemRef.get(itemProduct.sku).setCheck();
    } else {
      this.props.addProductToCart({
        phuTung: itemProduct,
        totalQty: 1
      });
      MyNavigator.navigate('CreatedPSC');
    }
  };

  renderHeader = () => (
    <MyView transparent>
      <ChonTiepNhanXe />
      <HeaderSelectedPhuTung huySelectedMany={this.pressHuyChonNhieu} />
    </MyView>
  );

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
    const arrItemSaleDaChon: IProductPhuTung[] = [];
    const arrItemProductDaChon: IPhuTungModel[] = [];
    for (let [, value] of this.mapItemRef) {
      if (value) {
        if (value.getIsCheck()) {
          value.setCheck();
          arrItemSaleDaChon.push({
            phuTung: value.getItem(),
            totalQty: 1
          });
          arrItemProductDaChon.push(value.getItem());
        }
      }
    }
    this.props.addListProductToCart(arrItemSaleDaChon);
    MyNavigator.navigate('CreatedPSC');
  };

  renderFooter = () => {
    return (
      <BottomChoosePhuTung
        pressHuyChonNhieu={this.pressHuyChonNhieu}
        pressXongChonNhieu={this.pressXongChonNhieu}
      />
    );
  };

  renderItem = ({item}: {item: IPhuTungModel}) => {
    return (
      <ItemPhuTung
        ref={node => {
          this.mapItemRef.set(item.sku, node);
        }}
        itemProduct={item}
        onPress={() => this.onPressChonBanHang(item)}
      />
    );
  };

  keyExtractor = (item: any, index: number) => item.id?.toString() || index.toString();

  renderListEmptyComponent = () => {
    return (
      <MyView style={CategoryStyle.emptyCustomer}>
        <MyText>Không có dữ liệu</MyText>
      </MyView>
    );
  };

  renderItemSeparatorComponent = () => {
    return <ItemLineIndicator />;
  };

  shouldComponentUpdate(nextProps: IProps) {
    if (this.props.isSelectedManyPSC !== nextProps.isSelectedManyPSC) return false;
    return true;
  }

  render() {
    const {arrPhuTungTmp, arrProduct} = this.props;
    const children = arrPhuTungTmp?.concat(arrProduct);
    return (
      <MyView transparent style={CategoryStyle.container}>
        {this.renderHeader()}
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          extraData={children}
          data={children}
          initialNumToRender={10}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          ItemSeparatorComponent={this.renderItemSeparatorComponent}
          ListEmptyComponent={this.renderListEmptyComponent}
          onEndReachedThreshold={0.1}
          contentContainerStyle={CategoryStyle.contentContainerStyle}
        />
        {this.renderFooter()}
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {isSelectedManyPSC} = state.CreatePSCReducer;
  const {arrPhuTungTmp} = state.PhieuSuaChuaReducer;
  const {arrProduct} = state.ProductHangHoaReducer;
  return {isSelectedManyPSC, arrPhuTungTmp, arrProduct};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      addProductToCart,
      addListProductToCart
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPhieuSuaChua);
