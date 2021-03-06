import * as React from 'react';

import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {bindActionCreators} from 'redux';

import {COLOR, MY_SIZE, setPadding} from 'bases/styles/Core';
import {MyButton, MyButtonIcon, MyText, MyView} from 'bases/components';
import {FlatList} from 'react-native-gesture-handler';
import {ItemLineIndicator} from 'views/app/components/items';
import {SafeAreaView} from 'react-native-safe-area-context';
import MyNotePicker from 'bases/components/picker/MyNotePicker';
import {Alert, KeyboardAvoidingView} from 'react-native';
import Utilities from 'utils/Utilities';
import {IAppNavigateProps} from 'views/app';
import {IChooseStoreState} from 'views/menuLeft/redux';
import {ICreatePSCState} from './redux/CreatePSC.Type';
import {
  deleteListProductToCart,
  resetDonHang,
  setGhiChuHoaDon,
  setIsManySelected
} from './redux/CreatePSC.Reducer';
import MyNavigator from 'utils/MyNavigator';
import {IProductPhuTung} from 'models/PhuTung.Model';
import {BottomViewStyle, CreateSaleStyle} from 'views/banhang/createSale/styles/CreateSale.styles';
import ChonTiepNhanXe from 'views/phieuSuaChua/addPhieuSuaChua/components/ChonTiepNhanXe';
import GioHangPSC from './components/GioHangPSC';
import ItemCreatePSC from './components/ItemCreatePSC';

type IProps = IAppNavigateProps<'CreateSale'> &
  ICreatePSCState &
  IChooseStoreState & {
    setIsManySelected: typeof setIsManySelected;
    deleteListProductToCart: typeof deleteListProductToCart;
    setGhiChuHoaDon: typeof setGhiChuHoaDon;
    resetDonHang: typeof resetDonHang;
  };

class CreateSale extends React.Component<IProps> {
  ghiChuRef: any = React.createRef();
  ghiChu: string = '';
  mapItemRef: Map<string, any> = new Map();

  setGhiChu = (note: string) => {
    this.ghiChu = note;
    this.props.setGhiChuHoaDon(note);
  };

  luuHoaDonTam = () => {
    this.khongLuu();
  };

  khongLuu = () => {
    MyNavigator.goBack();
    this.props.resetDonHang();
  };

  handleClose = () => {
    // Alert.alert('B???n c?? mu???n l??u ????n h??ng n??y kh??ng ?', '', [
    //   {text: 'L??u t???m', onPress: this.luuHoaDonTam},
    //   {
    //     text: 'Kh??ng l??u',
    //     onPress: this.khongLuu,
    //     style: 'destructive'
    //   },
    //   {text: '????ng', style: 'cancel'}
    // ]);
    Alert.alert('B???n c?? mu???n tho??t kh??ng ?', '', [
      {
        text: 'Tho??t',
        onPress: this.khongLuu
      },
      {text: '????ng', style: 'cancel'}
    ]);
  };

  componentDidMount() {
    this.props.navigation.setOptions({
      headerLeft: () => (
        <MyButtonIcon
          style={{...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)}}
          iconFontType="MaterialCommunityIcons"
          iconProps={{name: 'close', size: 22, color: COLOR.TEXT.BLACK}}
          onPress={this.handleClose}
        />
      ),
      headerTitle: 'T???o ho?? ????n',
      headerRight: () => (
        <MyButtonIcon
          style={{...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)}}
          iconFontType="MaterialCommunityIcons"
          iconProps={{name: 'information-outline', size: 22, color: COLOR.TEXT.BLACK}}
          onPress={() => {
            this.ghiChuRef.current.onShow(this.ghiChu);
          }}
        />
      )
    });
  }

  pressHuyXoa = () => {
    this.props.setIsManySelected(false);
    for (let [, value] of this.mapItemRef) {
      if (value) {
        if (value.getIsCheck()) {
          value.unCheck();
        }
      }
    }
  };

  pressXoa = () => {
    this.props.setIsManySelected(false);
    const arrItemXoa: IProductPhuTung[] = [];
    for (let [, value] of this.mapItemRef) {
      if (value) {
        if (value.getIsCheck()) {
          arrItemXoa.push(value.getItem());
        }
      }
    }
    this.props.deleteListProductToCart(arrItemXoa);
  };

  onPressItem = () => {};

  renderItem = ({item}: {item: IProductPhuTung}) => {
    return (
      <ItemCreatePSC
        item={item}
        onPressItem={this.onPressItem}
        ref={node => {
          if (item.phuTung?.sku) {
            this.mapItemRef.set(item.phuTung.sku, node);
          }
        }}
      />
    );
  };

  keyExtractor = (item: IProductPhuTung, index: any) => {
    return item.phuTung?.id.toString() + index.toString();
  };

  renderListHeaderComponent = () => {
    return <ItemLineIndicator />;
  };

  renderItemSeparatorComponent = () => {
    return <ItemLineIndicator />;
  };

  renderListEmptyComponent = () => {
    return (
      <MyView style={CreateSaleStyle.emptyCustomer}>
        <MyText>Kh??ng c?? d??? li???u</MyText>
      </MyView>
    );
  };

  onPressThanhToan = () => {
    MyNavigator.navigate('ThanhToanPSC');
  };

  render() {
    const {arrProductPSC, isManySelected} = this.props;
    console.log(111, arrProductPSC);

    return (
      <MyView style={CreateSaleStyle.container}>
        <ChonTiepNhanXe />

        <KeyboardAvoidingView
          keyboardVerticalOffset={60}
          style={CreateSaleStyle.container}
          behavior={Utilities.isAndroid() ? undefined : 'padding'}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={arrProductPSC}
            extraData={arrProductPSC}
            initialNumToRender={10}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            ListEmptyComponent={this.renderListEmptyComponent}
            ListHeaderComponent={this.renderListHeaderComponent}
            ItemSeparatorComponent={this.renderItemSeparatorComponent}
          />
          <MyView style={BottomViewStyle.containerKenhBan}>
            <GioHangPSC />
          </MyView>
        </KeyboardAvoidingView>

        <SafeAreaView
          edges={['left', 'bottom', 'right']}
          style={[BottomViewStyle.viewBtnBottom, {backgroundColor: COLOR.BG.BLACK_10}]}>
          {isManySelected ? (
            <MyView style={BottomViewStyle.viewBtnBottom2}>
              <MyButton
                style={[
                  BottomViewStyle.btnBottomView,
                  {backgroundColor: COLOR.BG.GRAY, borderTopLeftRadius: MY_SIZE.s_16}
                ]}
                onPress={this.pressHuyXoa}>
                <MyText style={{color: COLOR.TEXT.WHITE}}>Hu???</MyText>
              </MyButton>
              <MyButton
                style={[
                  BottomViewStyle.btnBottomView,
                  {backgroundColor: COLOR.BG.RED, borderTopRightRadius: MY_SIZE.s_16}
                ]}
                onPress={this.pressXoa}>
                <MyText style={{color: COLOR.TEXT.WHITE}}>Xo??</MyText>
              </MyButton>
            </MyView>
          ) : (
            <MyButton
              style={[
                BottomViewStyle.btnBottomView,
                {borderTopLeftRadius: MY_SIZE.s_16, borderTopRightRadius: MY_SIZE.s_16}
              ]}
              onPress={this.onPressThanhToan}>
              <MyText style={{color: COLOR.TEXT.WHITE}}>Thanh to??n</MyText>
            </MyButton>
          )}
        </SafeAreaView>
        <MyNotePicker ref={this.ghiChuRef} onApDung={this.setGhiChu} />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {arrProductPSC, isManySelected} = state.CreatePSCReducer;
  return {arrProductPSC, isManySelected};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      setIsManySelected,
      deleteListProductToCart,
      setGhiChuHoaDon,
      resetDonHang
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateSale);
