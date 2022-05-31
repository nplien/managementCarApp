import * as React from 'react';
import {connect} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MyView, MyText, MyButton, MyTextPriceMask, MyIcon} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import {bottomViewStyle} from '../style/AddImport.Styles';
import {RootState} from 'views/app/redux/App.Reducer';
import {IAddImportOrderState, setIsManySelected} from '../redux';
import MyNavigator from 'utils/MyNavigator';
import {bindActionCreators} from 'redux';

interface IProps extends IAddImportOrderState {
  setIsManySelected: typeof setIsManySelected;
  pressHuyXoa: () => void;
  pressXoa: () => void;
}

class BottomTotalImport extends React.Component<IProps, any> {
  handleToPayment = () => {
    MyNavigator.navigate('PaymentImport');
  };
  render() {
    const {arrProductImport, isManySelected} = this.props;
    let tongSo = 0;
    let tongGia = 0;
    if (arrProductImport) {
      for (let index = 0; index < arrProductImport.length; index++) {
        const element = arrProductImport[index];
        tongSo = tongSo + element.totalQty;
        let price = element.product.original_price || 0;
        tongGia = tongGia + price * element.totalQty;
      }
    }
    if (arrProductImport && arrProductImport?.length > 0) {
      return (
        <SafeAreaView edges={['left', 'bottom', 'right']} style={bottomViewStyle.viewBtnBottom}>
          {isManySelected ? (
            <>
              <MyButton
                style={[bottomViewStyle.btnBottomViewDelete, {backgroundColor: COLOR.BG.GRAY}]}
                onPress={this.props.pressHuyXoa}>
                <MyText style={{color: COLOR.TEXT.WHITE}}>Huỷ</MyText>
              </MyButton>
              <MyButton
                style={[bottomViewStyle.btnBottomViewDelete, {backgroundColor: COLOR.BG.RED}]}
                onPress={this.props.pressXoa}>
                <MyText style={{color: COLOR.TEXT.WHITE}}>Xoá</MyText>
              </MyButton>
            </>
          ) : (
            <MyButton
              onPress={this.handleToPayment}
              style={[bottomViewStyle.container, bottomViewStyle.myViewBottom]}>
              <MyView transparent style={bottomViewStyle.container}>
                <MyText style={bottomViewStyle.txtValue}> Tổng</MyText>
                <MyText style={bottomViewStyle.txtCount}>{tongSo}</MyText>
              </MyView>
              <MyView transparent style={bottomViewStyle.container}>
                <MyTextPriceMask
                  style={bottomViewStyle.txtValue}
                  text={tongGia}
                  numberOfLines={1}
                  myFontStyle="Regular"
                />
                <MyIcon
                  iconFontType="MaterialIcons"
                  name="navigate-next"
                  color={COLOR.TEXT.WHITE}
                  size={24}
                />
              </MyView>
            </MyButton>
          )}
        </SafeAreaView>
      );
    } else {
      return <MyView />;
    }
  }
}

const mapStateToProps = (state: RootState) => {
  const {arrProductImport, isManySelected} = state.AddImportOrderReducer;
  return {arrProductImport, isManySelected};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setIsManySelected}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(BottomTotalImport);
