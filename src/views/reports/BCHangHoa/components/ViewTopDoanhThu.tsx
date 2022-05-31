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
import {setFilterDateDetailBCHH, setStoreDetailBCHH} from '../detailBCHangHoa/redux';
import {IBCHangHoaState, changeViewBCHangHoa} from '../redux';
import {BCHangHoaStyle, BCHangHoaStyles} from '../styles/BCHangHoa.Styles';

interface IProps extends IBCHangHoaState {
  changeViewBCHangHoa: typeof changeViewBCHangHoa;
  setFilterDateDetailBCHH: typeof setFilterDateDetailBCHH;
  setStoreDetailBCHH: typeof setStoreDetailBCHH;
}

class ViewTopDoanhThu extends PureComponent<IProps> {
  renderItemSeparator = () => <MyView style={BCHangHoaStyle.separator} />;

  //Doanh thu
  renderItemDoanhThu = ({item}: {item: IBCSPModel}) => {
    const {arrBCHangHoaRevenue, arrBCHangHoaByProfit, view} = this.props;
    let withLine: number = 0;
    let value: number = 0;
    let price: number = 0;
    if (view === MOI_QUAN_TAM.BAN_HANG) {
      let top1 = arrBCHangHoaRevenue ? arrBCHangHoaRevenue[0].total_value_18 || 1 : 1;
      value = (item.total_value_18 || 0) / top1;
      price = item.total_value_18 || 0;
    } else if (view === MOI_QUAN_TAM.LOI_NHUAN) {
      let top2 = arrBCHangHoaByProfit ? arrBCHangHoaByProfit[0].total_value_4 || 1 : 1;
      value = (item.total_value_4 || 0) / top2;
      price = item.total_value_4 || 0;
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
    this.props.changeViewBCHangHoa(view);
  };
  onPressToDetail = () => {
    const {view, thoiGianLoc, khoangThoiGian, arrChiNhanhDaChonBCHH} = this.props;
    if (view === MOI_QUAN_TAM.BAN_HANG) {
      MyNavigator.navigate('DetailBCHangHoa', {
        view: MOI_QUAN_TAM.BAN_HANG,
        sort_by: BAO_CAO_HANG_HOA_VALUE.DOANH_THU
      });
    } else if (view === MOI_QUAN_TAM.LOI_NHUAN) {
      MyNavigator.navigate('DetailBCHangHoa', {
        view: MOI_QUAN_TAM.LOI_NHUAN,
        sort_by: BAO_CAO_HANG_HOA_VALUE.LOI_NHUAN
      });
    }
    this.props.setFilterDateDetailBCHH(thoiGianLoc, khoangThoiGian);
    this.props.setStoreDetailBCHH(arrChiNhanhDaChonBCHH);
  };
  render() {
    const {arrBCHangHoaRevenue, view, arrBCHangHoaByProfit} = this.props;
    let renderViewHeader = null;
    let arrBCHangHoa;
    if (view === MOI_QUAN_TAM.BAN_HANG) {
      arrBCHangHoa = arrBCHangHoaRevenue;
      renderViewHeader = (
        <MyView transparent style={BCHangHoaStyles.viewTxtHeader}>
          <MyText style={BCHangHoaStyles.textTitle} myFontStyle="600">
            Top hàng
          </MyText>
          <MyButton
            onPress={() => this.handleToChangeView(2)}
            transparent
            style={BCHangHoaStyles.btnTopHeader}>
            <MyText style={BCHangHoaStyles.textTitleChange} myFontStyle="600">
              theo doanh thu
            </MyText>
            <MyIcon name={'random'} size={14} color={COLOR.BG.GRAY} iconFontType={'FontAwesome'} />
          </MyButton>
        </MyView>
      );
    } else if (view === MOI_QUAN_TAM.LOI_NHUAN) {
      arrBCHangHoa = arrBCHangHoaByProfit;
      renderViewHeader = (
        <MyView transparent style={BCHangHoaStyles.viewTxtHeader}>
          <MyText style={BCHangHoaStyles.textTitle} myFontStyle="600">
            Top hàng
          </MyText>
          <MyButton
            onPress={() => this.handleToChangeView(1)}
            transparent
            style={BCHangHoaStyles.btnTopHeader}>
            <MyText style={BCHangHoaStyles.textTitleChange} myFontStyle="600">
              theo lợi nhuận
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
          renderItem={this.renderItemDoanhThu}
          ItemSeparatorComponent={this.renderItemSeparator}
        />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {
    arrBCHangHoaRevenue,
    view,
    arrBCHangHoaByProfit,
    thoiGianLoc,
    khoangThoiGian,
    arrChiNhanhDaChonBCHH
  } = state.BCHangHoaReducer;
  return {
    arrBCHangHoaRevenue,
    view,
    arrBCHangHoaByProfit,
    thoiGianLoc,
    khoangThoiGian,
    arrChiNhanhDaChonBCHH
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      changeViewBCHangHoa,
      setFilterDateDetailBCHH,
      setStoreDetailBCHH
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewTopDoanhThu);
