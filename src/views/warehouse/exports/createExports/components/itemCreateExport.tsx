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
import {itemCreateExportStyles} from '../styles/createExport.styles';
import {bindActionCreators} from 'redux';
import {
  setSummation,
  setSubtraction,
  setValueInput,
  setDeleteItem,
  ICreateExportState,
  setIsManySelect
} from '../redux';
import {ProductModel, StockProduct} from 'models/Product.Model';
import {COLOR} from 'bases/styles/Core';
import {Alert} from 'react-native';
import {RootState} from 'views/app/redux/App.Reducer';
import Utilities from 'utils/Utilities';

interface IProps extends ICreateExportState {
  setSummation: typeof setSummation;
  setSubtraction: typeof setSubtraction;
  setValueInput: typeof setValueInput;
  setDeleteItem: typeof setDeleteItem;
  setIsManySelect: typeof setIsManySelect;
  itemCreate: ProductModel | any;
}
interface AppState {
  isCheck: boolean;
}
class ItemCreateExport extends React.Component<IProps, AppState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isCheck: false
    };
  }
  deleteSp = () => {
    const {sku} = this.props.itemCreate;
    this.props.setDeleteItem(sku);
  };

  onLongPress = () => {
    const {isManySelected} = this.props;

    if (!isManySelected) {
      this.setState(
        {
          isCheck: true
        },
        () => {
          this.props.setIsManySelect(true);
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
    }
  };
  getIsCheck = (): boolean => {
    return this.state.isCheck;
  };

  getItem = (): ProductModel => {
    return this.props.itemCreate;
  };

  unCheck = () => {
    this.setState({
      isCheck: false
    });
  };
  canhBao = () => {
    Utilities.showToast('Quá số lượng tồn kho!', '', 'danger');
  };
  render() {
    const {name, price, sku, stocks} = this.props.itemCreate;
    const {arrExport} = this.props;
    const {isCheck} = this.state;
    let totalStocks = 0;
    for (let index = 0; index < stocks.length; index++) {
      const element: StockProduct = stocks[index];
      totalStocks = totalStocks + Number(element.total_quantity || 0);
    }
    let textSoLuong = 0;
    if (arrExport) {
      let found = -1;
      found = arrExport?.findIndex((x: ProductModel) => x.sku === sku);
      if (found > -1) {
        textSoLuong = arrExport[found].total_quantity;
      }
    }
    return (
      <MyButton
        onLongPress={this.onLongPress}
        onPress={this.onPress}
        style={{
          backgroundColor: isCheck ? COLOR.BG.BLACK_10 : COLOR.BG.PRIMARY
        }}>
        <MyView style={itemCreateExportStyles.container} transparent>
          <MyView style={itemCreateExportStyles.infoProdCenter} transparent>
            <MyText
              numberOfLines={2}
              myFontStyle="Regular"
              style={itemCreateExportStyles.textNameCenter}>
              {name}
            </MyText>
            <MyText
              numberOfLines={1}
              myFontStyle="Regular"
              style={itemCreateExportStyles.textIDCenter}>
              {sku}
            </MyText>
          </MyView>
          <MyView style={itemCreateExportStyles.infoProdRight} transparent>
            <MyTextPriceMask
              hideCurrency
              text={totalStocks}
              numberOfLines={1}
              myFontStyle="Regular"
              style={[itemCreateExportStyles.textPriceRight, {color: COLOR.TEXT.GREEN}]}
            />
          </MyView>
        </MyView>
        <MyView style={itemCreateExportStyles.viewBtn} transparent>
          <MyView style={itemCreateExportStyles.viewBotPrice} transparent>
            <MyTextPriceMask
              text={price}
              numberOfLines={1}
              style={itemCreateExportStyles.textPriceLeft}
            />
            <MyText style={itemCreateExportStyles.textX}>X</MyText>
          </MyView>
          <MyView style={itemCreateExportStyles.viewBot} transparent>
            {totalStocks < textSoLuong ? (
              <MyButton onPress={this.canhBao} transparent>
                <MyIcon
                  iconFontType={'Octicons'}
                  name={'alert'}
                  size={18}
                  color={'red'}
                  style={itemCreateExportStyles.icon}
                />
              </MyButton>
            ) : null}
            <MyButton
              style={itemCreateExportStyles.btnCountItem}
              onPress={() => {
                if (textSoLuong && textSoLuong > 1) {
                  this.props.setSubtraction(sku);
                } else {
                  Alert.alert('Bạn có chắc chắn muốn xoá sản phẩm ?', '', [
                    {
                      text: 'Đóng',
                      style: 'cancel'
                    },
                    {text: 'Xoá', onPress: this.deleteSp, style: 'destructive'}
                  ]);
                }
              }}
              transparent>
              <MyIcon iconFontType={'MaterialCommunityIcons'} name={'minus'} size={22} />
            </MyButton>
            <MyInputPriceMask
              numberOfLines={1}
              containerStyle={itemCreateExportStyles.bgTranparent}
              style={itemCreateExportStyles.inputSoluong}
              returnKeyType="done"
              value={textSoLuong.toString()}
              keyboardType={'number-pad'}
              onTextCallback={value => {
                if (parseInt(value)) {
                  this.props.setValueInput(parseInt(value, 10), sku);
                }
              }}
            />
            <MyButton
              style={itemCreateExportStyles.btnCountItem}
              onPress={() => {
                this.props.setSummation(sku);
              }}
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
  const {arrExport, isLoading, isError, isManySelected} = state.CreateExportReducer;
  return {arrExport, isLoading, isError, isManySelected};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {setSummation, setSubtraction, setValueInput, setIsManySelect, setDeleteItem},
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(
  ItemCreateExport
);
