import React from 'react';
import {FlatList, RefreshControl, StyleSheet} from 'react-native';
import ButtonToolbarRouter from 'bases/components/button/ButtonToolbarRouter';
import {COLOR, MY_SIZE, setMargin, setPadding, setRadius} from 'bases/styles/Core';
import MyStaffModal from 'views/app/components/customs/MyStaffModal';

import {MyButtonText, MyLoading, MyText, MyView} from 'bases/components';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IStaffModel} from 'models/Staff.Model';
import {DashBoardApi, IBCBHRequest} from 'services/DashBoard.Api';
import Utilities from 'utils/Utilities';
import {
  IAppNavigateProps,
  IAppState,
  IDateFilterType,
  IDateRange,
  ISortFilterType
} from 'views/app';
import {SvgXml} from 'react-native-svg';
import {svgLine} from 'assets/images/svgImage';
import {
  // IBCBHModel,
  IBCBHModelV2,
  ISumBCBHModel
} from 'models/DashBoard.Model';
import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {IBCBanHangState} from '../redux';
import LocThoigianDetail from './components/LocThoigianDetail';
import ChonChiNhanhDetail from './components/ChonChiNhanhDetail';
import {CONFIG_DATE_FILTER, CONFIG_SORT_FILTER} from 'configs/FilterConfig';
import SortNVBanHang from './components/SortNVBanHang';
import SortDoanhThuThuan, {TittleDTT} from './components/SortDoanhThuThuan';
import {BC_SORT_DTT, BC_SORT_DTT_TITLE} from 'common/Constants';
import {IStorePerson} from 'models/ModelBase';

type IProps = IAppNavigateProps<'DetailBCNVBanHang'> & IBCBanHangState;

interface IState extends IAppState {
  arrStaffSale?: IStaffModel[];
  arrStaffsBestSales?: IBCBHModelV2[];
  isError?: boolean;
  isLoading?: boolean;
  count: number;
  sum?: ISumBCBHModel;
  thoiGianStaffSale?: IDateFilterType;
  khoangThoiGianStaffSale?: IDateRange;
  arrCNStaffSale?: IStorePerson[];
  sortDTT?: TittleDTT;
  sortFilter?: any;
}

class DetailBCNVbanHang extends React.Component<IProps, IState> {
  staffModalRef: any = React.createRef();

  constructor(props: IProps) {
    super(props);
    const {thoiGianLoc, khoangThoiGian, arrChiNhanhDaChonBCBH} = this.props;
    this.state = {
      arrStaffSale: [],
      arrStaffsBestSales: [],
      isFirstLoading: true,
      isError: false,
      isLoading: false,
      count: 0,
      sum: {},
      isRefresh: false,
      thoiGianStaffSale: thoiGianLoc,
      khoangThoiGianStaffSale: khoangThoiGian,
      arrCNStaffSale: arrChiNhanhDaChonBCBH || [],
      sortDTT: BC_SORT_DTT[0],
      sortFilter: CONFIG_SORT_FILTER.BC_NHAN_VIEN_BAN_HANG[0]
    };
  }
  componentDidMount() {
    this.props.navigation.setOptions({
      title: 'BC bán hàng theo nhân viên',
      headerRight: () => (
        <ButtonToolbarRouter
          isShowBtnLeft={false}
          isShowBtnRight
          iconRightFontType="AntDesign"
          iconRightProps={{name: 'filter', size: 24, color: COLOR.TEXT.BLACK}}
          onPressRight={() => {
            const {arrStaffSale} = this.state;
            this.staffModalRef.current.onShow(arrStaffSale);
          }}
        />
      )
    });
    this.getReportStaffSale();
  }

  getReportStaffSale = async () => {
    const {
      thoiGianStaffSale,
      arrStaffSale,
      isError,
      isLoading,
      khoangThoiGianStaffSale,
      arrCNStaffSale,
      arrStaffsBestSales
      // sortFilter
    } = this.state;
    try {
      if (isError || isLoading) {
        Utilities.showHideRootLoading(true, 'Loading...');
      }
      let bcStaffRequest: IBCBHRequest = {
        limit: 20,
        skip: 0,
        types: 'staffs',
        // order_by: sortFilter?.order_by,
        min_created_at_day: khoangThoiGianStaffSale?.dateFrom,
        max_created_at_day: khoangThoiGianStaffSale?.dateTo,
        date_time: thoiGianStaffSale?.type || 'month'
      };
      if (arrCNStaffSale?.length !== 0) {
        bcStaffRequest.stores = arrCNStaffSale?.map(x => x.id).join(',');
      }
      if (arrStaffSale?.length !== 0) {
        bcStaffRequest.staffs = arrStaffSale?.map(x => x.id).join(',');
      }
      const result = await DashBoardApi.getBaoCaoBanHang(bcStaffRequest);
      if (result && !result.code) {
        if (isLoading) {
          this.setState({
            arrStaffsBestSales: arrStaffsBestSales?.concat(result.data || []),
            isLoading: false,
            isFirstLoading: false
          });
          Utilities.showHideRootLoading(false);
          return;
        }
        this.setState({
          count: result.count || 0,
          sum: result.sum || {},
          isFirstLoading: false,
          isRefresh: false,
          arrStaffsBestSales: result.data || []
        });
      }
      Utilities.showHideRootLoading(false);
    } catch (error) {
      Utilities.showHideRootLoading(false);
      this.setState({
        isFirstLoading: false,
        isRefresh: false,
        isError: true,
        isLoading: false
      });
    }
  };

  renderListEmptyComponent = () => {
    const {isFirstLoading, isError} = this.state;
    if (isFirstLoading) {
      return (
        <MyView style={styles.emptyCustomer}>
          <MyLoading />
        </MyView>
      );
    }
    if (isError) {
      return (
        <MyView style={styles.emptyCustomer}>
          <MyText>Không có dữ liệu</MyText>
          <MyButtonText
            onPress={() => this.getReportStaffSale()}
            title="Tải lại"
            style={styles.btnEmpty}
          />
        </MyView>
      );
    } else {
      return (
        <MyView style={styles.emptyCustomer}>
          <MyText>Không có dữ liệu</MyText>
        </MyView>
      );
    }
  };

  renderItem = ({item}: {item: IBCBHModelV2}) => {
    const {arrStaffsBestSales, sortDTT} = this.state;

    let withLine: number = 0;
    let top1 = arrStaffsBestSales ? arrStaffsBestSales[0].total_value_5 || 1 : 1;
    let soTienNV: any = '';
    switch (sortDTT?.title) {
      case BC_SORT_DTT_TITLE.DOANH_THU_THUAN:
        soTienNV = Utilities.convertCount(item?.total_value_5 || 0); //doanh thu thuan
        break;
      case BC_SORT_DTT_TITLE.GIA_TRI_TRA:
        if (item?.total_value_2) {
          soTienNV = '-' + Utilities.convertCount(item?.total_value_4 || 0); //gia tri tra
        } else {
          soTienNV = Utilities.convertCount(item?.total_value_4 || 0); //gia tri tra
        }
        break;
      case BC_SORT_DTT_TITLE.DOANH_THU:
        soTienNV = Utilities.convertCount(item?.total_value_2 || 0); //doanh thu
        break;
      default:
        break;
    }

    const value = (item.total_value_5 || 0) / top1;
    if (value) {
      withLine = Utilities.getWidthScreen() * value;
    }
    if (sortDTT?.title === BC_SORT_DTT_TITLE.GIA_TRI_TRA) {
      withLine = 0;
    }
    return (
      <MyView style={styles.itemView} transparent>
        <MyView style={styles.viewProductName} transparent>
          <MyText style={styles.textProductName}>{item.staff ? item.staff.name : ''}</MyText>
          <MyText style={styles.textPriceMask}>{soTienNV}</MyText>
        </MyView>
        <SvgXml xml={svgLine(withLine)} width="100%" height="100%" />
      </MyView>
    );
  };

  reload = () => {
    const {isFirstLoading, isLoading} = this.state;

    if (!isFirstLoading && !isLoading) {
      this.setState({isRefresh: true}, () => {
        this.getReportStaffSale();
      });
    }
  };

  onEndReached = () => {
    const {count, arrStaffsBestSales} = this.state;
    if (arrStaffsBestSales && count <= arrStaffsBestSales?.length) {
      return;
    }
    this.setState(
      {
        isLoading: true
      },
      () => {
        this.getReportStaffSale();
      }
    );
    return;
  };

  apDungStaff = (arrStaff: IStaffModel[]) => {
    this.setState(
      {
        arrStaffSale: arrStaff
      },
      () => {
        this.getReportStaffSale();
      }
    );
  };

  selectStore = (arr: IStorePerson[]) => {
    this.setState({arrCNStaffSale: arr}, () => {
      Utilities.showHideRootLoading(true, 'Loading...');
      this.getReportStaffSale();
    });
  };

  selectThoiGian = (value: IDateFilterType) => {
    this.setState({thoiGianStaffSale: value});
  };

  selectKhoangThoiGian = (value: IDateRange) => {
    this.setState({khoangThoiGianStaffSale: value}, () => {
      Utilities.showHideRootLoading(true, 'Loading...');
      this.getReportStaffSale();
    });
  };

  selectDTT = (value: TittleDTT) => {
    this.setState({sortDTT: value});
  };
  selectSortFilter = (value: ISortFilterType) => {
    this.setState({sortFilter: value}, () => {
      Utilities.showHideRootLoading(true, 'Loading...');
      this.getReportStaffSale();
    });
  };

  public render() {
    const {
      arrStaffsBestSales,
      arrCNStaffSale,
      isLoading,
      isRefresh,
      sum,
      thoiGianStaffSale,
      khoangThoiGianStaffSale,
      sortDTT,
      sortFilter
    } = this.state;
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <MyView style={styles.myViewTop}>
          <LocThoigianDetail
            chooseThoiGian={this.selectThoiGian}
            chooseKhoangThoigian={this.selectKhoangThoiGian}
            valueThoiGian={thoiGianStaffSale || CONFIG_DATE_FILTER.DASHBOARD[2]}
            valueKhoangThoigian={
              khoangThoiGianStaffSale || Utilities.getDateFilter(CONFIG_DATE_FILTER.DASHBOARD[2].id)
            }
          />
          <ChonChiNhanhDetail chooseStore={this.selectStore} store={arrCNStaffSale || []} />
        </MyView>
        <MyView
          style={[
            styles.myViewTop,
            {...setRadius(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16)}
          ]}>
          <SortNVBanHang sortFilter={sortFilter} chooseSortFilter={this.selectSortFilter} />
          <SortDoanhThuThuan
            sum={sum}
            sortDTT={sortDTT || BC_SORT_DTT[0]}
            chooseDTT={this.selectDTT}
          />
        </MyView>
        <MyView style={{height: MY_SIZE.s_16}} transparent />
        <FlatList
          style={{backgroundColor: COLOR.BG.WHITE}}
          contentContainerStyle={{
            paddingHorizontal: MY_SIZE.s_16
          }}
          refreshControl={
            <RefreshControl refreshing={isRefresh || false} onRefresh={this.reload} />
          }
          data={arrStaffsBestSales}
          extraData={arrStaffsBestSales}
          keyExtractor={(_v, index) => index.toString()}
          ListEmptyComponent={this.renderListEmptyComponent}
          renderItem={this.renderItem}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.1}
          ListFooterComponent={() => {
            if (isLoading) {
              return (
                <MyView style={{marginVertical: MY_SIZE.s_16}}>
                  <MyLoading />
                </MyView>
              );
            }
            return null;
          }}
        />
        <MyStaffModal ref={this.staffModalRef} onApDung={this.apDungStaff} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.BG.SECONDARY,
    flex: 1
  },
  myViewTop: {
    flexDirection: 'row'
  },
  btnEmpty: {
    ...setMargin(MY_SIZE.s_10, MY_SIZE.s_10, MY_SIZE.s_10, MY_SIZE.s_10),
    ...setPadding(MY_SIZE.s_10, MY_SIZE.s_10, MY_SIZE.s_10, MY_SIZE.s_10)
  },
  emptyCustomer: {
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    alignSelf: 'center'
  },

  itemView: {
    flex: 1,
    marginBottom: MY_SIZE.s_8
  },
  viewProductName: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textProductName: {
    flex: 6,
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  textPriceMask: {
    flex: 4,
    alignContent: 'center',
    textAlign: 'right'
  }
});
const mapStateToProps = (state: RootState) => {
  const {arrChiNhanhDaChonBCBH, thoiGianLoc, khoangThoiGian} = state.BCBanHangReducer;

  return {arrChiNhanhDaChonBCBH, thoiGianLoc, khoangThoiGian};
};

export default connect(mapStateToProps, null)(DetailBCNVbanHang);
