import {MyButton, MyButtonText, MyLoading, MyText, MyView} from 'bases/components';
import ButtonToolbarRouter from 'bases/components/button/ButtonToolbarRouter';
import {COLOR, MY_SIZE, setMargin, setPadding, setRadius} from 'bases/styles/Core';
import {CHECK_VIEW_BCBH, DETAIL_BCBH} from 'common/Constants';
import {CONFIG_DATE_FILTER} from 'configs/FilterConfig';
import {
  // IBCBHModel,
  IBCBHModelV2,
  ISumBCBHModel
} from 'models/DashBoard.Model';
import {IStorePerson} from 'models/ModelBase';
import React, {Component} from 'react';
import {FlatList, RefreshControl, ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import {DashBoardApi, IBCBHRequest} from 'services/DashBoard.Api';
import MyNavigator from 'utils/MyNavigator';
import Utilities from 'utils/Utilities';
import {IAppNavigateProps, IAppState, IDateFilterType, IDateRange} from 'views/app';
import {RootState} from 'views/app/redux/App.Reducer';
import {IBCBanHangState} from '../redux';
import {SalesStyles} from '../styles/BCBanHang.Styles';
import ChonChiNhanhDetail from './components/ChonChiNhanhDetail';
import {paramsItemTable} from './components/ItemTable';
import LocThoigianDetail from './components/LocThoigianDetail';

type IProps = IBCBanHangState & IAppNavigateProps<'DetailBCBanHang'>;

interface IState extends IAppState {
  arrListBCBanHang: IBCBHModelV2[];
  sumTableBCBanHang?: ISumBCBHModel;
  isError?: boolean;
  channels: number[];
  thoiGianDetail?: IDateFilterType;
  khoangThoiGianDetail?: IDateRange;
  arrCNDetail?: IStorePerson[];
  withItem: number;
}
class DetailBCBanHang extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const {arrChiNhanhDaChonBCBH, thoiGianLoc, khoangThoiGian} = this.props;
    this.state = {
      arrListBCBanHang: [],
      sumTableBCBanHang: {},
      isFirstLoading: true,
      isError: false,
      channels: [],
      isRefresh: false,
      thoiGianDetail: thoiGianLoc,
      khoangThoiGianDetail: khoangThoiGian,
      arrCNDetail: arrChiNhanhDaChonBCBH || [],
      withItem: (Utilities.getWidthScreen() - 50) / 3
    };
  }

  componentDidMount() {
    const param = this.props.route?.params.checkView;
    const {channels} = this.state;
    this.props.navigation.setOptions({
      title: param?.title || '',
      headerRight: () => (
        <ButtonToolbarRouter
          isShowBtnLeft={false}
          isShowBtnRight
          iconRightFontType="AntDesign"
          iconRightProps={{name: 'filter', size: 24, color: COLOR.TEXT.BLACK}}
          onPressRight={() => {
            MyNavigator.pushModal('ModalKenhBan', {
              arrChannels: channels,
              onSubmitKB: this.selectKB
            });
          }}
        />
      )
    });
    this.loadApiSaleReport();
  }

  loadApiSaleReport = async () => {
    const {isError, channels, thoiGianDetail, khoangThoiGianDetail, arrCNDetail} = this.state;
    const param = this.props.route?.params.checkView;

    if (isError) {
      Utilities.showHideRootLoading(true, 'Loading...');
    }
    try {
      let date_time: IDateFilterType | undefined = thoiGianDetail;
      if (
        thoiGianDetail &&
        khoangThoiGianDetail &&
        (thoiGianDetail.id === 'TUY_CHON' || thoiGianDetail.id === 'TOAN_THOI_GIAN') &&
        khoangThoiGianDetail.dateFrom &&
        khoangThoiGianDetail.dateTo
      ) {
        let start = new Date(khoangThoiGianDetail.dateFrom).getTime();
        let end = new Date(khoangThoiGianDetail.dateTo).getTime();
        let _62ngay = 62 * 86400000;
        console.log(date_time);
        if (end - start > _62ngay && date_time) {
          date_time.type = 'quarter';
        }

        console.log(start, end);
        console.log(start - end);
        console.log(start - end, _62ngay);
      }

      let bcbhRequest: IBCBHRequest = {
        limit: 100,
        skip: 0,
        min_created_at_day: khoangThoiGianDetail?.dateFrom,
        max_created_at_day: khoangThoiGianDetail?.dateTo,
        date_time:
          date_time && date_time.type === 'month' ? 'day' : date_time ? date_time.type : '',
        channels: channels?.join(',')
      };
      if (channels?.length === 0) {
        delete bcbhRequest.channels;
      }
      if (arrCNDetail?.length !== 0) {
        bcbhRequest.stores = arrCNDetail?.map(x => x.id).join(',');
      }
      if (param.type === DETAIL_BCBH[1].type) {
        bcbhRequest.types = 'revenues';
      }
      const result = await DashBoardApi.getBaoCaoBanHang(bcbhRequest);
      if (result && result.code === 0) {
        this.setState({
          arrListBCBanHang: result?.data || [],
          sumTableBCBanHang: result?.sum || {},
          isFirstLoading: false,
          isError: false,
          isRefresh: false
        });
      }
      Utilities.showHideRootLoading(false);
    } catch (error) {
      Utilities.showHideRootLoading(false);
      this.setState({
        isFirstLoading: false,
        isError: true,
        isRefresh: false
      });
    }
  };

  selectStore = (arr: IStorePerson[]) => {
    this.setState({arrCNDetail: arr}, () => {
      Utilities.showHideRootLoading(true, 'Loading...');
      this.loadApiSaleReport();
    });
  };

  selectThoiGian = (value: IDateFilterType) => {
    this.setState({thoiGianDetail: value});
  };

  selectKhoangThoiGian = (value: IDateRange) => {
    this.setState({khoangThoiGianDetail: value}, () => {
      Utilities.showHideRootLoading(true, 'Loading...');
      this.loadApiSaleReport();
    });
  };

  selectKB = (value: number[]) => {
    this.setState({channels: value}, () => {
      Utilities.showHideRootLoading(true, 'Loading...');
      this.loadApiSaleReport();
    });
  };

  reload = () => {
    const {isFirstLoading} = this.state;
    if (!isFirstLoading) {
      this.setState({isRefresh: true});
      this.loadApiSaleReport();
    }
  };

  renderItem = ({item}: {item: IBCBHModelV2}) => {
    const {arrCNDetail, withItem, thoiGianDetail} = this.state;
    const stringIDCN = arrCNDetail?.map(x => x.id).join(',');
    let time: string = '';
    if (thoiGianDetail?.type === 'quarter') {
      time = Utilities.convertUnixTimeByFormat(item.created_at_time, 'MM/YYYY');
    } else if (thoiGianDetail?.type === 'hour') {
      time = Utilities.convertUnixTimeByFormat(item.created_at_time, 'HH:mm');
    } else {
      time = Utilities.convertUnixTimeByFormat(item.created_at_time, 'DD/MM');
    }

    let tineItemTable: paramsItemTable = {
      store: stringIDCN,
      type: thoiGianDetail?.type,
      min_tineItemTable: String(item.created_at_time),
      max_tineItemTable: String(item.created_at_time)
    };
    return (
      <MyButton
        onPress={() => MyNavigator.navigate('ItemTable', tineItemTable)}
        style={styles.tableRow}>
        <MyView style={styles.viewTimeTable}>
          <MyText style={styles.textTime}>{time}</MyText>
        </MyView>
        <MyView style={[styles.viewTable, {width: withItem}]}>
          <MyText>{Utilities.convertCount(Number(item.total_value_2 || 0))}</MyText>
        </MyView>
        <MyView style={[styles.viewTable, {width: withItem}]}>
          <MyText>{Utilities.convertCount(Number(item.total_value_4 || 0))}</MyText>
        </MyView>
        <MyView style={[styles.viewTableEnd]}>
          <MyText>{Utilities.convertCount(Number(item.total_value_5 || 0))}</MyText>
        </MyView>
      </MyButton>
    );
  };

  ListHeaderComponent = () => {
    const param = this.props.route?.params.checkView;
    const title = param.id === CHECK_VIEW_BCBH.BC_THEO_THOI_GIAN ? 'GT trả' : 'Tổng giá vốn';
    const {sumTableBCBanHang, withItem} = this.state;
    return (
      <MyView>
        <MyView style={styles.tableRow}>
          <MyView style={styles.viewTimeTable} />
          <MyView
            style={styles.viewTable}
            onLayout={event => {
              let {width} = event.nativeEvent.layout;
              this.setState({withItem: width});
            }}>
            <MyText style={{fontSize: MY_SIZE.s_18}}>Doanh thu</MyText>
            <MyText style={styles.textHeader}>
              {Utilities.convertCount(Number(sumTableBCBanHang?.total_value_5 || 0))}
            </MyText>
          </MyView>
          <MyView style={[styles.viewTable, {width: withItem}]}>
            <MyText style={{fontSize: MY_SIZE.s_18}}>{title}</MyText>
            <MyText style={styles.textHeader}>
              {Utilities.convertCount(Number(sumTableBCBanHang?.total_value_2 || 0))}
            </MyText>
          </MyView>
          <MyView style={[styles.viewTableEnd, {width: withItem}]}>
            <MyText style={{fontSize: MY_SIZE.s_18}}>DT Thuần</MyText>
            <MyText style={styles.textHeader}>
              {Utilities.convertCount(Number(sumTableBCBanHang?.total_value_18 || 0))}
            </MyText>
          </MyView>
        </MyView>
        <MyView style={styles.viewSeparator} />
      </MyView>
    );
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
            onPress={() => this.loadApiSaleReport()}
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

  render() {
    const {arrListBCBanHang, isRefresh, thoiGianDetail, khoangThoiGianDetail, arrCNDetail} =
      this.state;

    return (
      <SafeAreaView style={SalesStyles.container} edges={['bottom']}>
        <MyView style={SalesStyles.myViewTop}>
          <LocThoigianDetail
            chooseThoiGian={this.selectThoiGian}
            chooseKhoangThoigian={this.selectKhoangThoiGian}
            valueThoiGian={thoiGianDetail || CONFIG_DATE_FILTER.DASHBOARD[2]}
            valueKhoangThoigian={
              khoangThoiGianDetail || Utilities.getDateFilter(CONFIG_DATE_FILTER.DASHBOARD[2].id)
            }
          />
          <ChonChiNhanhDetail chooseStore={this.selectStore} store={arrCNDetail || []} />
        </MyView>
        <MyView style={{height: MY_SIZE.s_16}} transparent />
        <ScrollView horizontal style={styles.contentContainer}>
          <FlatList
            showsVerticalScrollIndicator
            data={arrListBCBanHang}
            extraData={arrListBCBanHang}
            keyExtractor={(_v, index) => index.toString()}
            refreshControl={
              <RefreshControl refreshing={isRefresh || false} onRefresh={this.reload} />
            }
            renderItem={this.renderItem}
            ItemSeparatorComponent={() => {
              return <MyView style={styles.viewSeparator} />;
            }}
            ListHeaderComponent={this.ListHeaderComponent}
            ListFooterComponent={() => {
              return <MyView style={{height: MY_SIZE.s_60}} />;
            }}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: COLOR.BG.WHITE,
    paddingTop: MY_SIZE.s_16,
    ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  tableRow: {
    flexDirection: 'row',
    // borderBottomColor: COLOR.BG.BLACK,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    marginHorizontal: MY_SIZE.s_8
  },
  contextHeader: {
    fontSize: MY_SIZE.s_18
  },
  textHeader: {
    marginBottom: MY_SIZE.s_16
  },
  viewTimeTable: {
    width: 45,
    paddingVertical: MY_SIZE.s_16
  },
  textTime: {
    textAlign: 'center',
    color: COLOR.TEXT.BLUE
  },
  viewTable: {
    minWidth: (Utilities.getWidthScreen() - 50) / 3.15,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: COLOR.BG.BLACK,
    alignItems: 'flex-end',
    paddingHorizontal: MY_SIZE.s_4,
    justifyContent: 'center'
  },
  viewTableEnd: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: MY_SIZE.s_4
  },
  btnEmpty: {
    ...setMargin(MY_SIZE.s_10, MY_SIZE.s_10, MY_SIZE.s_10, MY_SIZE.s_10),
    ...setPadding(MY_SIZE.s_10, MY_SIZE.s_10, MY_SIZE.s_10, MY_SIZE.s_10)
  },
  emptyCustomer: {
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    alignSelf: 'center'
  },
  viewSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLOR.BG.BLACK,
    marginHorizontal: MY_SIZE.s_8
  }
});
const mapStateToProps = (state: RootState) => {
  const {arrChiNhanhDaChonBCBH, thoiGianLoc, khoangThoiGian} = state.BCBanHangReducer;

  return {arrChiNhanhDaChonBCBH, thoiGianLoc, khoangThoiGian};
};

export default connect(mapStateToProps, null)(DetailBCBanHang);
