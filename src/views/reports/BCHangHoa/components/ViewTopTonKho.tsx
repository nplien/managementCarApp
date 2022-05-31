import {svgLine} from 'assets/images/svgImage';
import {MyView, MyText, MyButton, MyIcon} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import {BAO_CAO_HANG_HOA_VALUE} from 'configs/FilterConfig';
import {IBCSPModel} from 'models/DashBoard.Model';
import React, {PureComponent} from 'react';
import {FlatList} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {MOI_QUAN_TAM} from 'services/DashBoard.Api';
import MyNavigator from 'utils/MyNavigator';
import Utilities from 'utils/Utilities';
import {RootState} from 'views/app/redux/App.Reducer';
import {setFilterDateDetailBCHH} from '../detailBCHangHoa/redux';
import {changeViewBCWarehouse, IBCHangHoaState} from '../redux';
import {BCHangHoaStyle, BCHangHoaStyles} from '../styles/BCHangHoa.Styles';

interface IProps extends IBCHangHoaState {
  changeViewBCWarehouse: typeof changeViewBCWarehouse;
  setFilterDateDetailBCHH: typeof setFilterDateDetailBCHH;
}

class ViewTopTonKho extends PureComponent<IProps> {
  renderItemSeparator = () => <MyView style={BCHangHoaStyle.separator} />;

  // Ton kho
  renderItemTonKho = ({item}: {item: IBCSPModel}) => {
    const {arrBCHangHoaByInventory, viewWarehouse, arrBCHangHoaByWarehouse} = this.props;

    let withLine: number = 0;
    let value: number = 0;
    let price: number = 0;

    if (viewWarehouse === MOI_QUAN_TAM.GIA_TRI_KHO) {
      let top1 = arrBCHangHoaByWarehouse ? arrBCHangHoaByWarehouse[0].total_value_14 || 1 : 1;
      value = (item.total_value_14 || 0) / top1;
      price = item.total_value_14 || 0;
    } else if (viewWarehouse === MOI_QUAN_TAM.XUAT_NHAP_TON) {
      let top2 = arrBCHangHoaByInventory ? arrBCHangHoaByInventory[0].total_quantity_3 || 1 : 1;
      value = (item.total_quantity_3 || 0) / top2;
      price = item.total_quantity_3 || 0;
    }

    if (value) {
      withLine = Utilities.getWidthScreen() * value;
    }

    return (
      <MyView style={BCHangHoaStyle.itemView}>
        <MyView style={BCHangHoaStyle.viewProductName} transparent>
          <MyText style={BCHangHoaStyle.textProductName} numberOfLines={2}>
            {item.product_name || item.product_category_name}
          </MyText>
          <MyText style={BCHangHoaStyle.textPriceMask}>{Utilities.convertCount(price)}</MyText>
        </MyView>
        <SvgXml xml={svgLine(withLine)} />
      </MyView>
    );
  };
  handleToChangeView = (view: MOI_QUAN_TAM) => {
    this.props.changeViewBCWarehouse(view);
  };
  onPressToDetail = () => {
    const {viewWarehouse, thoiGianLoc, khoangThoiGian} = this.props;
    if (viewWarehouse === MOI_QUAN_TAM.GIA_TRI_KHO) {
      MyNavigator.navigate('DetailBCHangHoa', {
        view: MOI_QUAN_TAM.GIA_TRI_KHO,
        sort_by: BAO_CAO_HANG_HOA_VALUE.GIA_TRI_KHO
      });
    } else if (viewWarehouse === MOI_QUAN_TAM.XUAT_NHAP_TON) {
      MyNavigator.navigate('DetailBCHangHoa', {
        view: MOI_QUAN_TAM.XUAT_NHAP_TON,
        sort_by: BAO_CAO_HANG_HOA_VALUE.TON_KHO
      });
    }
    this.props.setFilterDateDetailBCHH(thoiGianLoc, khoangThoiGian);
  };
  render() {
    const {arrBCHangHoaByInventory, arrBCHangHoaByWarehouse, viewWarehouse} = this.props;
    let renderViewHeader = null;
    let arrBCHangHoa;
    if (viewWarehouse === MOI_QUAN_TAM.GIA_TRI_KHO) {
      arrBCHangHoa = arrBCHangHoaByWarehouse;
      renderViewHeader = (
        <MyView transparent style={BCHangHoaStyles.viewTxtHeader}>
          <MyText style={BCHangHoaStyles.textTitle} myFontStyle="600">
            Top hàng
          </MyText>
          <MyButton
            onPress={() => this.handleToChangeView(MOI_QUAN_TAM.XUAT_NHAP_TON)}
            transparent
            style={BCHangHoaStyles.btnTopHeader}>
            <MyText style={BCHangHoaStyles.textTitleChange} myFontStyle="600">
              theo giá trị kho
            </MyText>
            <MyIcon name={'random'} size={14} color={COLOR.BG.GRAY} iconFontType={'FontAwesome'} />
          </MyButton>
        </MyView>
      );
    } else if (viewWarehouse === MOI_QUAN_TAM.XUAT_NHAP_TON) {
      arrBCHangHoa = arrBCHangHoaByInventory;
      renderViewHeader = (
        <MyView transparent style={BCHangHoaStyles.viewTxtHeader}>
          <MyText style={BCHangHoaStyles.textTitle} myFontStyle="600">
            Top hàng
          </MyText>
          <MyButton
            onPress={() => this.handleToChangeView(MOI_QUAN_TAM.GIA_TRI_KHO)}
            transparent
            style={BCHangHoaStyles.btnTopHeader}>
            <MyText style={BCHangHoaStyles.textTitleChange} myFontStyle="600">
              theo tồn kho
            </MyText>
            <MyIcon name={'random'} size={14} color={COLOR.BG.GRAY} iconFontType={'FontAwesome'} />
          </MyButton>
        </MyView>
      );
    }
    return (
      <MyView transparent>
        <MyView style={BCHangHoaStyles.viewTopHeader}>
          {renderViewHeader}
          <MyButton style={BCHangHoaStyles.btnNextDetail} onPress={this.onPressToDetail}>
            <MyIcon
              name={'angle-right'}
              size={24}
              color={COLOR.BG.GRAY}
              iconFontType={'FontAwesome'}
            />
          </MyButton>
        </MyView>

        <FlatList
          data={arrBCHangHoa}
          extraData={arrBCHangHoa}
          keyExtractor={(_item, index) => _item.product_id + `${index}` + _item.product_sku}
          renderItem={this.renderItemTonKho}
          ItemSeparatorComponent={this.renderItemSeparator}
        />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {
    arrBCHangHoaByInventory,
    viewWarehouse,
    arrBCHangHoaByWarehouse,
    thoiGianLoc,
    khoangThoiGian
  } = state.BCHangHoaReducer;
  return {
    arrBCHangHoaByInventory,
    viewWarehouse,
    arrBCHangHoaByWarehouse,
    thoiGianLoc,
    khoangThoiGian
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      changeViewBCWarehouse,
      setFilterDateDetailBCHH
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(ViewTopTonKho);
