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
import Utilities from 'utils/Utilities';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {COLOR} from 'bases/styles/Core';
import {Alert} from 'react-native';
import {IStorePerson} from 'models/ModelBase';
import {
  addProductToCart,
  deleteProductToCart,
  ICreatePSCState,
  setIsManySelected,
  setProductToCart
} from '../redux';
import {IProductPhuTung} from 'models/PhuTung.Model';
import {itemCreateSaleStyles} from 'views/banhang/createSale/styles/CreateSale.styles';

interface IProps extends ICreatePSCState {
  item: IProductPhuTung;
  cuaHangDangChon?: IStorePerson;

  setProductToCart: typeof setProductToCart;
  addProductToCart: typeof addProductToCart;
  deleteProductToCart: typeof deleteProductToCart;
  setIsManySelected: typeof setIsManySelected;

  onPressItem: (item: IProductPhuTung) => void;
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
        phuTung: this.props.item.phuTung,
        totalQty: parseInt(value, 10)
      });
    } else {
      this.props.setProductToCart({
        phuTung: this.props.item.phuTung,
        totalQty: 1
      });
    }
  };

  congSp = () => {
    this.props.addProductToCart({
      phuTung: this.props.item.phuTung,
      totalQty: 1
    });
  };

  truSp = () => {
    if (this.soLuong > 1) {
      this.props.addProductToCart({
        phuTung: this.props.item.phuTung,
        totalQty: -1
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
      phuTung: this.props.item.phuTung,
      totalQty: 1
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

  getItem = (): IProductPhuTung => {
    return {
      phuTung: this.props.item.phuTung,
      totalQty: this.soLuong
    };
  };

  unCheck = () => {
    this.setState({
      isCheck: false
    });
  };

  render() {
    const {item, arrProductPSC} = this.props;

    let tonKho = 0;

    let textSoLuong = 0;
    if (arrProductPSC) {
      let found = -1;
      found = arrProductPSC?.findIndex(
        (x: IProductPhuTung) => x.phuTung?.sku === item.phuTung?.sku
      );
      if (found > -1) {
        textSoLuong = arrProductPSC[found].totalQty;
        tonKho = arrProductPSC[found].phuTung?.total_quantity || 0;
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
              {item.phuTung?.name}
            </MyText>
            <MyText
              numberOfLines={1}
              myFontStyle="Medium"
              style={itemCreateSaleStyles.textIDCenter}>
              {item.phuTung?.sku}
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
              text={Utilities.convertCount(item.phuTung?.price)}
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
  const {arrProductPSC, isManySelected} = state.CreatePSCReducer;
  return {
    arrProductPSC,
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
