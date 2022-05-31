import {MyButtonText, MyLoading, MyText, MyView} from 'bases/components';
import {COLOR, MY_SIZE, setMargin, setPadding, setRadius} from 'bases/styles/Core';
import {OrderModel} from 'models/Order.Model';
import moment from 'moment';
import * as React from 'react';
import {StyleSheet, FlatList, RefreshControl} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IOrderRequest, OrderAPI} from 'services/Order.Api';
import Utilities from 'utils/Utilities';

import {IAppNavigateProps, IAppState, TIME_TYPE} from 'views/app';

export type paramsItemTable = {
  type?: TIME_TYPE;
  min_tineItemTable?: string;
  max_tineItemTable?: string;
  store?: string;
};

type IProps = IAppNavigateProps<'ItemTable'>;

type ISumOrderlModel = {
  total_discount_value?: number;
  total_paid?: number;
  total_price?: number;
  total_price_before_discount?: number;
  total_quantity?: number;
  total_unpaid?: number;
  total_revenue?: number;
};
interface IState extends IAppState {
  arrItemTable?: OrderModel[];
  sumItemTable?: ISumOrderlModel;
  isError?: boolean;
  isLoading: boolean;
  count: number;
  isRefresh: boolean;
}

export default class ItemTable extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      arrItemTable: [],
      sumItemTable: {},
      isFirstLoading: true,
      isError: false,
      count: 0,
      isRefresh: false,
      isLoading: false
    };
  }
  componentDidMount() {
    const {min_tineItemTable, type} = this.props.route?.params;
    if (type === 'quarter') {
      this.props.navigation.setOptions({
        title: Utilities.convertUnixTimeByFormat(Number(min_tineItemTable), 'MM/YYYY') || ''
      });
    } else if (type === 'hour') {
      this.props.navigation.setOptions({
        title: Utilities.convertUnixTimeByFormat(Number(min_tineItemTable), 'HH:mm') || ''
      });
    } else {
      this.props.navigation.setOptions({
        title: Utilities.convertUnixTimeByFormat(Number(min_tineItemTable), 'DD/MM/YYYY') || ''
      });
    }
    this.getItemTable();
  }

  componentWillUnmount() {
    this.setState({
      arrItemTable: [],
      sumItemTable: {},
      isFirstLoading: true,
      isError: false,
      count: 0,
      isRefresh: false,
      isLoading: false
    });
  }

  getItemTable = async () => {
    const {isLoading, arrItemTable} = this.state;
    const {min_tineItemTable, max_tineItemTable, type, store} = this.props.route?.params;
    try {
      const paramsHeader: IOrderRequest = {
        min_created_at_day: Utilities.convertUnixTimeByFormat(
          Number(min_tineItemTable),
          'MM/DD/YYYY'
        ),
        max_created_at_day: Utilities.convertUnixTimeByFormat(
          Number(max_tineItemTable),
          'MM/DD/YYYY'
        ),
        date_time: type,
        skip: 0,
        limit: 10,
        order_types: 'retail,return',
        statuses: 'completed,processing'
      };
      if (type === 'month') {
        paramsHeader.date_time = 'day';
      }
      if (type === 'hour') {
        paramsHeader.min_created_at_day = Utilities.convertUnixTimeByFormat(
          Number(min_tineItemTable),
          'MM/DD/YYYY HH:mm'
        );
        paramsHeader.max_created_at_day = Utilities.convertUnixTimeByFormat(
          Number(max_tineItemTable),
          'MM/DD/YYYY HH:mm'
        );
      }
      if (type === 'quarter') {
        paramsHeader.min_created_at_day = Utilities.convertUnixTimeByFormat(
          Number(min_tineItemTable),
          'MM/DD/YYYY'
        );
        paramsHeader.max_created_at_day = moment(Number(max_tineItemTable) * 1000)
          .endOf('month')
          .format('MM/DD/YYYY');
      }

      if (store && store.length !== 0) {
        paramsHeader.stores = store || '';
      }

      if (isLoading) {
        paramsHeader.skip = arrItemTable?.length || 0;
      }
      const result = await OrderAPI.getListInvoiceReport(paramsHeader);
      if (result && result.code === 0) {
        if (isLoading) {
          this.setState({
            arrItemTable: arrItemTable?.concat(result.data || []),
            isLoading: false,
            isFirstLoading: false
          });
          return;
        }
        this.setState({
          arrItemTable: result.data || [],
          sumItemTable: result.sum || {},
          isFirstLoading: false,
          isRefresh: false,
          isLoading: false,
          count: result.count || 0
        });
      }
      this.setState({
        isFirstLoading: false,
        isLoading: false,
        isRefresh: false,
        isError: false
      });
    } catch (error) {
      this.setState({
        isFirstLoading: false,
        isLoading: false,
        isRefresh: false,
        isError: true
      });
    }
  };
  _renderItem = ({item}: {item: OrderModel}) => {
    return (
      <MyView style={styles.viewItem} transparent>
        <MyView style={styles.viewItemOne}>
          <MyText style={{fontSize: MY_SIZE.s_18}}>{item.code}</MyText>
          <MyText>{Utilities.convertUnixTimeByFormat(item.created_at)}</MyText>
        </MyView>
        <MyView style={styles.viewItemEnd}>
          <MyText style={{color: COLOR.TEXT.BLUE}}>
            {Utilities.convertCount(item.total_revenue)}
          </MyText>
          <MyText>{item.customer?.name}</MyText>
        </MyView>
      </MyView>
    );
  };
  _keyExtractor = (item: OrderModel) => {
    return item.id.toString();
  };
  onEndReached = () => {
    const {count, arrItemTable} = this.state;
    if (arrItemTable && count <= arrItemTable?.length) {
      return;
    }
    this.setState(
      {
        isLoading: true
      },
      () => {
        this.getItemTable();
      }
    );
    return;
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
            onPress={() => this.getItemTable()}
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
  reload = () => {
    const {isFirstLoading, isLoading} = this.state;

    if (!isFirstLoading && !isLoading) {
      this.setState({isRefresh: true});
      this.getItemTable();
    }
  };
  render() {
    const {arrItemTable, count, isLoading, sumItemTable, isRefresh} = this.state;

    return (
      <SafeAreaView style={{backgroundColor: COLOR.BG.SECONDARY}} edges={['bottom']}>
        <MyView style={styles.viewHeader}>
          <MyView style={{flexDirection: 'row'}}>
            <MyText style={{color: COLOR.TEXT.BLUE}}>{Utilities.convertCount(count)}</MyText>
            <MyText> đơn</MyText>
          </MyView>
          <MyView style={{flexDirection: 'row'}}>
            <MyText>Lợi nhuận gộp </MyText>
            <MyText style={{color: COLOR.TEXT.BLUE}}>
              {Utilities.convertCount(sumItemTable?.total_revenue)}
            </MyText>
          </MyView>
        </MyView>
        <MyView style={{height: MY_SIZE.s_16}} transparent />
        <FlatList
          style={[{marginBottom: MY_SIZE.s_56}, styles.contentContainer]}
          contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl refreshing={isRefresh || false} onRefresh={this.reload} />
          }
          data={arrItemTable}
          extraData={arrItemTable}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          initialNumToRender={10}
          ListEmptyComponent={this.renderListEmptyComponent}
          ItemSeparatorComponent={() => {
            return <MyView style={styles.viewSeparator} />;
          }}
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
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: COLOR.BG.WHITE,
    ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)
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
    backgroundColor: COLOR.BG.BLACK_10,
    marginHorizontal: MY_SIZE.s_16
  },
  viewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: MY_SIZE.s_12,
    ...setRadius(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  viewItem: {
    flexDirection: 'row',
    paddingHorizontal: MY_SIZE.s_16
  },
  viewItemEnd: {
    flex: 1,
    paddingTop: MY_SIZE.s_8,
    paddingBottom: MY_SIZE.s_18,
    alignItems: 'flex-end'
  },
  viewItemOne: {
    flex: 1,
    paddingTop: MY_SIZE.s_8,
    paddingBottom: MY_SIZE.s_18
  }
});
