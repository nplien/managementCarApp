import {MyButton, MyIcon, MyLoading, MyText, MyView} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import {BAO_CAO_HANG_HOA_VALUE, IBC_HANG_HOA, SORT_FILTER_BAO_CAO} from 'configs/FilterConfig';
import {IBCSPModel} from 'models/DashBoard.Model';
import React, {PureComponent} from 'react';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {MOI_QUAN_TAM} from 'services/DashBoard.Api';
import MyNavigator from 'utils/MyNavigator';
import Utilities from 'utils/Utilities';
import {IAppNavigateProps, IPropsButtonSheet} from 'views/app';
import {ItemLineIndicatorCustom} from 'views/app/components/items';
import {RootState} from 'views/app/redux/App.Reducer';
import {detailBCHHStyles} from '../styles/DetailBCHH.Styles';
import FilterDateDetailBCHH from './components/FilterDateDetailBCHH';
import SortDetailBCHH from './components/SortDetailBCHH';
import {
  IDetailBCHHState,
  getListDetailBCHH,
  onFisrtLoadingDetailBCHH,
  setOnLoadmoreDetailBCHH,
  clearListDetailBCHH,
  setOnRefreshDetailBCHH
} from './redux';

type IProps = IAppNavigateProps<'DetailBCHangHoa'> &
  IDetailBCHHState & {
    getListDetailBCHH: typeof getListDetailBCHH;
    onFisrtLoadingDetailBCHH: typeof onFisrtLoadingDetailBCHH;
    setOnLoadmoreDetailBCHH: typeof setOnLoadmoreDetailBCHH;
    setOnRefreshDetailBCHH: typeof setOnRefreshDetailBCHH;
    clearListDetailBCHH: typeof clearListDetailBCHH;
  };

interface IAppState {
  sortType: IBC_HANG_HOA;
  arrButtonBottomFor: IBC_HANG_HOA[];
}
class DetailBCHangHoa extends PureComponent<IProps, IAppState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      sortType: {
        id: BAO_CAO_HANG_HOA_VALUE.DOANH_THU,
        name: 'Doanh thu'
      },
      arrButtonBottomFor: []
    };
  }

  componentDidMount() {
    if (this.props.route?.params?.sort_by === BAO_CAO_HANG_HOA_VALUE.SO_LUONG_BAN) {
      this.props.navigation.setOptions({headerTitle: 'BC số lượng SP hoá đơn'});
    }
    if (this.props.route?.params?.sort_by === BAO_CAO_HANG_HOA_VALUE.SO_LUONG_TRA) {
      this.props.navigation.setOptions({headerTitle: 'BC số lượng SP trả hàng'});
    }
    this.getListDetailBCHH();
    this.getListBottomSheet();
  }
  componentWillUnmount() {
    this.props.clearListDetailBCHH();
  }
  getListBottomSheet = () => {
    const {sort_by, view} = this.props.route?.params;
    let arrButtonBottomFor: IBC_HANG_HOA[] = [];
    //  check va kiem tra param de get arr vao bottomsheet sort
    if (view === MOI_QUAN_TAM.LOI_NHUAN && sort_by === BAO_CAO_HANG_HOA_VALUE.SO_LUONG_BAN) {
      arrButtonBottomFor = SORT_FILTER_BAO_CAO.HOA_DON;
    } else if (view === MOI_QUAN_TAM.LOI_NHUAN && sort_by === BAO_CAO_HANG_HOA_VALUE.SO_LUONG_TRA) {
      arrButtonBottomFor = SORT_FILTER_BAO_CAO.HOA_DON;
    } else if (view === MOI_QUAN_TAM.BAN_HANG || view === MOI_QUAN_TAM.LOI_NHUAN) {
      arrButtonBottomFor = SORT_FILTER_BAO_CAO.LOI_NHUAN;
    } else if (view === MOI_QUAN_TAM.GIA_TRI_KHO || view === MOI_QUAN_TAM.XUAT_NHAP_TON) {
      arrButtonBottomFor = SORT_FILTER_BAO_CAO.TON_KHO;
    }
    const sortTypeParam: IBC_HANG_HOA | any = arrButtonBottomFor.find(
      (x: IBC_HANG_HOA) => x?.id === sort_by
    );
    this.setState({
      arrButtonBottomFor: arrButtonBottomFor,
      sortType: sortTypeParam
    });
  };
  getListDetailBCHH = (skip?: number) => {
    const {sort_by, view} = this.props.route?.params;
    //  Check va kiem tra param va goi api lay du lieu
    if (view === MOI_QUAN_TAM.BAN_HANG || view === MOI_QUAN_TAM.LOI_NHUAN) {
      this.props.getListDetailBCHH({
        view: MOI_QUAN_TAM.LOI_NHUAN,
        skip: skip || 0,
        limit: 10,
        sort_by: this.state.sortType?.id || sort_by
      });
    } else if (view === MOI_QUAN_TAM.GIA_TRI_KHO || view === MOI_QUAN_TAM.XUAT_NHAP_TON) {
      this.props.getListDetailBCHH({
        view: MOI_QUAN_TAM.GIA_TRI_KHO,
        skip: skip || 0,
        limit: 10,
        sort_by: this.state.sortType?.id || sort_by
      });
    }
  };
  _renderEmpty = () => {
    const {isFirstLoading} = this.props;
    if (isFirstLoading) {
      return (
        <MyView style={detailBCHHStyles.loadingContainer}>
          <MyLoading />
        </MyView>
      );
    }
    return (
      <MyView style={detailBCHHStyles.containerEmpty}>
        <MyText myFontStyle={'Medium'} style={detailBCHHStyles.textEmpty}>
          Không có đơn nào.
        </MyText>
      </MyView>
    );
  };
  _renderFooter = () => {
    if (this.props.isLoadMore) {
      return <MyLoading />;
    }
    return null;
  };

  onEndReached = () => {
    const {isStop, isLoadMore, arrDetailBCHH} = this.props;
    if (isStop) {
      return;
    }
    if (isLoadMore) return;
    this.props.setOnLoadmoreDetailBCHH(true);
    this.getListDetailBCHH(arrDetailBCHH?.length);
  };
  resetData = () => {
    this.props.setOnRefreshDetailBCHH(true);
    this.getListDetailBCHH();
  };

  renderItem = ({item}: {item: IBCSPModel}) => {
    const {view} = this.props.route?.params;
    const {sortType} = this.state;
    let price: number = 0;
    if (view === MOI_QUAN_TAM.GIA_TRI_KHO) {
      price = item.total_value_14 || 0;
    } else if (view === MOI_QUAN_TAM.XUAT_NHAP_TON) {
      price = item.total_quantity_3 || 0;
    } else if (view === MOI_QUAN_TAM.BAN_HANG) {
      price = item.total_value_18 || 0;
    } else if (view === MOI_QUAN_TAM.LOI_NHUAN) {
      price = item.total_value_4 || 0;
    }
    if (sortType) {
      switch (sortType.id) {
        case BAO_CAO_HANG_HOA_VALUE.TON_KHO:
          price = item?.total_quantity_3 || 0;
          break;
        case BAO_CAO_HANG_HOA_VALUE.GIA_TRI_KHO:
          price = item?.total_value_14 || 0;
          break;
        case BAO_CAO_HANG_HOA_VALUE.LOI_NHUAN:
          price = item?.total_value_4 || 0;
          break;
        case BAO_CAO_HANG_HOA_VALUE.SO_LUONG_BAN:
          price = item?.total_quantity_1 || 0;
          break;
        case BAO_CAO_HANG_HOA_VALUE.DOANH_THU_THUAN:
          price = item?.total_value_3 || 0;
          break;
        case BAO_CAO_HANG_HOA_VALUE.DOANH_THU:
          price = item?.total_value_18 || 0;
          break;
        case BAO_CAO_HANG_HOA_VALUE.SO_LUONG_TRA:
          price = item?.total_quantity_2 || 0;
          break;
        case BAO_CAO_HANG_HOA_VALUE.GIA_TRI_TRA:
          price = item?.total_value_2 || 0;
          break;
        default:
          break;
      }
    }
    return (
      <MyView style={detailBCHHStyles.viewItem}>
        <MyText numberOfLines={2} style={detailBCHHStyles.txtName}>
          {item.product_name}
        </MyText>
        <MyText style={detailBCHHStyles.txtPrice}>{Utilities.convertCount(price)}</MyText>
      </MyView>
    );
  };

  render() {
    const {arrDetailBCHH, isRefresh, count, sumDetailBCHH} = this.props;
    const {sortType, arrButtonBottomFor} = this.state;
    let txtNameCount: string = '';
    let total_value: number = 0;
    let viewParams: number = 1;
    // Kiểm tra khi vao man hinh thi check duoc chuyen tu view nao
    const {view, sort_by} = this.props.route?.params;
    if (view === MOI_QUAN_TAM.GIA_TRI_KHO) {
      txtNameCount = 'Giá trị kho';
      total_value = sumDetailBCHH?.total_value_14 || 0;
      viewParams = MOI_QUAN_TAM.GIA_TRI_KHO;
    } else if (view === MOI_QUAN_TAM.XUAT_NHAP_TON) {
      txtNameCount = 'Tồn kho';
      total_value = sumDetailBCHH?.total_quantity_3 || 0;
      viewParams = MOI_QUAN_TAM.GIA_TRI_KHO;
    } else if (view === MOI_QUAN_TAM.BAN_HANG) {
      txtNameCount = 'Doanh thu';
      total_value = sumDetailBCHH?.total_value_18 || 0;
      viewParams = MOI_QUAN_TAM.LOI_NHUAN;
    } else if (view === MOI_QUAN_TAM.LOI_NHUAN) {
      total_value = sumDetailBCHH?.total_value_4 || 0;
      txtNameCount = 'Lợi nhuận';
      viewParams = MOI_QUAN_TAM.LOI_NHUAN;
    }
    //  kiểm tra khi sort type
    let arrSortBy: IPropsButtonSheet[] = [];
    if (sortType) {
      switch (sortType.id) {
        case BAO_CAO_HANG_HOA_VALUE.TON_KHO:
          txtNameCount = sortType?.name;
          total_value = sumDetailBCHH?.total_quantity_3 || 0;
          break;
        case BAO_CAO_HANG_HOA_VALUE.GIA_TRI_KHO:
          txtNameCount = sortType?.name;
          total_value = sumDetailBCHH?.total_value_14 || 0;
          break;
        case BAO_CAO_HANG_HOA_VALUE.LOI_NHUAN:
          txtNameCount = sortType?.name;
          total_value = sumDetailBCHH?.total_value_4 || 0;
          break;
        case BAO_CAO_HANG_HOA_VALUE.SO_LUONG_BAN:
          txtNameCount = sortType?.name;
          total_value = sumDetailBCHH?.total_quantity_1 || 0;
          break;
        case BAO_CAO_HANG_HOA_VALUE.DOANH_THU_THUAN:
          txtNameCount = sortType?.name;
          total_value = sumDetailBCHH?.total_value_3 || 0;
          break;
        case BAO_CAO_HANG_HOA_VALUE.DOANH_THU:
          txtNameCount = sortType?.name;
          total_value = sumDetailBCHH?.total_value_18 || 0;
          break;
        case BAO_CAO_HANG_HOA_VALUE.GIA_TRI_TRA:
          txtNameCount = sortType?.name;
          total_value = sumDetailBCHH?.total_value_2 || 0;
          break;
        case BAO_CAO_HANG_HOA_VALUE.SO_LUONG_TRA:
          txtNameCount = sortType?.name;
          total_value = sumDetailBCHH?.total_quantity_2 || 0;
          break;
        default:
          break;
      }
    }

    for (let index = 0; index < arrButtonBottomFor.length; index++) {
      const element = arrButtonBottomFor[index];
      arrSortBy.push({
        title: element.name,
        onPress: () => {
          this.setState({
            sortType: element
          });
          MyNavigator.goBack();
        },
        isActive: element.id === sortType?.id
      });
    }
    return (
      <MyView style={detailBCHHStyles.container}>
        <MyView style={detailBCHHStyles.filterContainer}>
          <FilterDateDetailBCHH view={viewParams} sort_by={sort_by || ''} />
          <SortDetailBCHH view={viewParams} sort_by={sortType?.id || sort_by || ''} />
        </MyView>
        <MyView style={detailBCHHStyles.viewCount}>
          <MyText myFontStyle={'Medium'} style={detailBCHHStyles.textTotalValue}>
            {Utilities.convertCount(count)}
            <MyText style={detailBCHHStyles.textSum}> hàng hoá </MyText>
          </MyText>
          <MyButton
            onPress={() => {
              MyNavigator.pushModal('MyBottomSheetPicker', {
                arrayButton: arrSortBy,
                titleButtonCancel: 'Huỷ bỏ'
              });
            }}
            style={detailBCHHStyles.viewPriceCount}>
            <MyText myFontStyle={'Medium'} style={detailBCHHStyles.textSum}>
              {txtNameCount}
            </MyText>
            <MyText myFontStyle={'Medium'} style={detailBCHHStyles.textTotalValue}>
              {Utilities.convertCount(total_value)}
            </MyText>
            <MyIcon
              name={'angle-down'}
              size={16}
              iconFontType={'FontAwesome'}
              color={COLOR.BG.BLACK}
            />
          </MyButton>
        </MyView>
        <FlatList
          showsVerticalScrollIndicator={false}
          refreshing={isRefresh}
          onRefresh={this.resetData}
          onEndReachedThreshold={0.1}
          data={arrDetailBCHH}
          extraData={arrDetailBCHH}
          ItemSeparatorComponent={() => {
            return <ItemLineIndicatorCustom />;
          }}
          onEndReached={this.onEndReached}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderItem}
          ListFooterComponent={this._renderFooter}
          ListEmptyComponent={this._renderEmpty}
          contentContainerStyle={detailBCHHStyles.containerList}
        />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {count, isFirstLoading, isLoadMore, isRefresh, isStop, arrDetailBCHH, sumDetailBCHH} =
    state.DetailBCHHReducer;

  return {arrDetailBCHH, count, isFirstLoading, isLoadMore, isRefresh, isStop, sumDetailBCHH};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      clearListDetailBCHH,
      getListDetailBCHH,
      onFisrtLoadingDetailBCHH,
      setOnLoadmoreDetailBCHH,
      setOnRefreshDetailBCHH
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailBCHangHoa);
