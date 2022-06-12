// import {FlatList} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {dataPhuTungFake} from './components/DataPhuTungFake';
// import {MyView, MyLoading} from 'bases/components';
// import tw from 'utils/tailwind';
// import {IPhuTungModel, IProductPhuTung} from 'models/PhuTung.Model';
// import {useDispatch, useSelector} from 'react-redux';
// import {createAction} from 'views/app/redux/MyAction';
// import HeaderSelectedPhuTung from './components/HeaderSelectedPhuTung';
// import {RootState} from 'views/app/redux';
// import {ItemPhuTung} from './components/ItemPhuTung';
// import ChonTiepNhanXe from './components/ChonTiepNhanXe';
// import BottomChoosePhuTung from './components/BottomChoosePhuTung';
// import MyNavigator from 'utils/MyNavigator';
// export default function AddPhieuSuaChua() {
//   const dispatch = useDispatch();
//   const isSelectedManyPSC = useSelector(
//     (state: RootState) => state.PhieuSuaChuaReducer.isSelectedManyPSC
//   );
//   const [isFirstLoading, setIsFirstLoading] = useState(true);

//   let mapItemRef: Map<number, any> = new Map();

//   useEffect(() => {
//     const timer1 = setTimeout(() => {
//       setIsFirstLoading(false);
//     }, 500);
//     return function cleanup() {
//       clearTimeout(timer1);
//     };
//   });

//   const handleItem = (item: IPhuTungModel) => {
//     if (isSelectedManyPSC) {
//       mapItemRef.get(item.id).setCheck();
//     } else {
//       dispatch(
//         createAction('SET/PSC/SELECTED_PHU_TUNG', {
//           productPhuTung: {
//             phuTung: item,
//             totalQty: 1
//           }
//         })
//       );
//       MyNavigator.navigate('CreatedPSC');
//     }
//   };
//   const pressXongChonNhieu = () => {
//     const arrItemPhuTungDaChon: IProductPhuTung[] = [];
//     const arrItemProductDaChon: IPhuTungModel[] = [];
//     for (let [, value] of mapItemRef) {
//       if (value) {
//         if (value.getIsCheck()) {
//           value.setCheck();
//           arrItemPhuTungDaChon.push({
//             phuTung: value.getItem(),
//             totalQty: 1
//           });
//           arrItemProductDaChon.push(value.getItem());
//         }
//       }
//     }
//     dispatch(createAction('SET/PSC/LIST_PHU_TUNG', {arrPhuTung: arrItemPhuTungDaChon}));
//     // this.props.addListProductToCart(arrItemSaleDaChon);
//     MyNavigator.navigate('CreatedPSC');
//   };
//   const pressHuyChonNhieu = () => {
//     dispatch(
//       createAction('SET/PSC/IS/MANY/SELECTED', {
//         isSelectedManyPSC: false
//       })
//     );
//     for (let [, value] of mapItemRef) {
//       if (value) {
//         if (value.getIsCheck()) {
//           value.setCheck();
//         }
//       }
//     }
//   };

//   const keyExtractor = (item: any, index: number) => item.id?.toString() || index.toString();
//   const renderItemSeparatorComponent = () => (
//     <MyView style={tw.style('m-2px h-1px bg-stone-200')} />
//   );
//   const renderItem = ({item}: {item: IPhuTungModel}) => {
//     return (
//       <ItemPhuTung
//         ref={node => {
//           mapItemRef.set(item.id, node);
//         }}
//         itemProduct={item}
//         onPress={() => handleItem(item)}
//       />
//     );
//   };
//   const renderHeader = () => (
//     <MyView transparent>
//       <ChonTiepNhanXe />
//       <HeaderSelectedPhuTung huySelectedMany={pressHuyChonNhieu} />
//     </MyView>
//   );
//   const renderFooter = () => (
//     <BottomChoosePhuTung
//       pressHuyChonNhieu={pressHuyChonNhieu}
//       pressXongChonNhieu={pressXongChonNhieu}
//     />
//   );
//   if (isFirstLoading) {
//     return (
//       <MyView style={tw.style('flex-1')}>
//         <MyLoading />
//       </MyView>
//     );
//   }
//   return (
//     <MyView transparent style={tw.style('flex-1')}>
//       {renderHeader()}
//       <FlatList
//         showsHorizontalScrollIndicator={false}
//         showsVerticalScrollIndicator={false}
//         bounces={false}
//         extraData={dataPhuTungFake}
//         data={dataPhuTungFake}
//         keyExtractor={keyExtractor}
//         renderItem={renderItem}
//         ItemSeparatorComponent={renderItemSeparatorComponent}
//         contentContainerStyle={tw.style(' px-8px pt-16px pb-60px bg-white rounded-16px ')}
//         style={tw.style('pb-60px')}
//       />
//       {renderFooter()}
//     </MyView>
//   );
// }

import React, {Component} from 'react';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';
import {MyView, MyText} from 'bases/components';
import {ItemLineIndicator} from 'views/app/components/items';
import {RootState} from 'views/app/redux/App.Reducer';
import {bindActionCreators} from 'redux';

import {dataPhuTungFake} from './components/DataPhuTungFake';
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
    return (
      <MyView transparent style={CategoryStyle.container}>
        {this.renderHeader()}
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          extraData={dataPhuTungFake}
          data={dataPhuTungFake}
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
  return {isSelectedManyPSC};
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
