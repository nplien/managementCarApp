import {MyLoading, MyText, MyView} from 'bases/components';
import {COLOR, MY_SIZE, setRadius} from 'bases/styles/Core';
import {IBCSPModel} from 'models/DashBoard.Model';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Utilities, {hexToRGBA} from 'utils/Utilities';
import {ItemLineIndicatorCustom} from 'views/app/components/items';
import {RootState} from 'views/app/redux/App.Reducer';
import {arrrProductNameTest} from 'views/banhang/ProductBanHang/redux/ProductNameTest';
import {IDashboardState} from 'views/dashboard/redux';

interface IProps extends IDashboardState {}

class ReportQtyProduct extends Component<IProps> {
  renderItem = (item: IBCSPModel, index: number) => {
    let character = String(item.product_name).substring(0, 1);
    let colorConvertByName = Utilities.returnColorBangChuCai(character);
    let colorBG = {
      backgroundColor: hexToRGBA(colorConvertByName, 0.2)
    };
    let colorText = {color: colorConvertByName};

    return (
      <MyView key={item.product_sku + '' + index} transparent>
        <MyView style={styles.content} transparent>
          <MyView style={[styles.viewAvatar, colorBG]}>
            <MyText style={[styles.textAvatar, colorText]} myFontStyle="Medium">
              {character}
            </MyText>
          </MyView>

          <MyView style={styles.contentTitle} transparent>
            <MyText style={styles.textName} numberOfLines={2}>
              {item.product_name}
            </MyText>
            <MyText style={styles.textSKU} numberOfLines={1}>
              {item.product_sku}
            </MyText>
          </MyView>

          <MyText style={styles.textPrice}>{Utilities.convertCount(item.total_quantity_1)}</MyText>
        </MyView>
        <ItemLineIndicatorCustom containerStyle={styles.separator} />
      </MyView>
    );
  };

  render() {
    const {arrProductReportByQuantity, isTop10ForQty} = this.props;
    if (isTop10ForQty) return <MyLoading />;
    arrProductReportByQuantity?.forEach((item, index) => {
      const element = arrrProductNameTest.findIndex(value => value.id === item.product_id);
      if (element > 1) {
        arrProductReportByQuantity[index].product_name = arrrProductNameTest[element].name;
        arrProductReportByQuantity[index].product_sku = arrrProductNameTest[element].sku;
      }
    });
    return (
      <MyView style={styles.container}>{arrProductReportByQuantity?.map(this.renderItem)}</MyView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.BG.WHITE,
    ...setRadius(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  content: {flexDirection: 'row', paddingHorizontal: 16},
  separator: {marginVertical: 10},
  viewAvatar: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8
  },
  textAvatar: {
    fontSize: 20
  },
  contentTitle: {
    flex: 2,
    marginHorizontal: 10
  },
  textName: {fontSize: 14},
  textSKU: {marginTop: 8, fontSize: 12, color: COLOR.TEXT.BLUE},
  textPrice: {
    color: COLOR.TEXT.BLUE,
    fontSize: 16,
    textAlign: 'right',
    minWidth: 56
  }
});

const mapStateToProps = (state: RootState) => {
  const {arrProductReportByQuantity, isTop10ForQty} = state.DashboardReducer;
  return {
    arrProductReportByQuantity,
    isTop10ForQty
  };
};

export default connect(mapStateToProps, null, null, {forwardRef: true})(ReportQtyProduct);
