import * as React from 'react';
import {RefreshControl, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {bindActionCreators} from 'redux';
import {MyView} from 'bases/components/view/MyView';
import {
  ItemBoderBottom,
  ItemCustomers,
  ItemLineIndicator,
  ItemLineIndicatorCustom
} from 'views/app/components/items';
import {GetCustomer, ICustomerState, LoadMoreCustomer} from './redux';
import {MyLoading, MyText, MyButtonIcon} from 'bases/components';
import {CustomerStyle} from './style/Customer.Style';
import {CustomerModel} from 'models/Customer.Model';
import MyNavigator from 'utils/MyNavigator';
import HeaderFilterSort from './components/HeaderFilterSort';
import {setMargin, MY_SIZE, COLOR, setRadius, setPadding} from 'bases/styles/Core';
import {BANG_GIA_CHUNG, KHACH_LE} from 'common/Constants';
import {setObjectInforShip} from 'views/banhang/inforShipping/redux';
import {IProductBanHangState, setBangGia, setKhachHang} from 'views/banhang/ProductBanHang/redux';
import Utilities from 'utils/Utilities';
import {IAppNavigateProps} from 'views/app';

type IProps = IAppNavigateProps<'Customer'> &
  ICustomerState &
  IProductBanHangState & {
    GetCustomer: typeof GetCustomer;
    LoadMoreCustomer: typeof LoadMoreCustomer;
    setKhachHang: typeof setKhachHang;
    setObjectInforShip: typeof setObjectInforShip;
    setBangGia: typeof setBangGia;
  };

class Customer extends React.Component<IProps> {
  chonKhachHang = (item: CustomerModel) => {
    MyNavigator.goBack();
    this.props.setKhachHang(item);
    this.props.setBangGia(BANG_GIA_CHUNG);
    this.props.setObjectInforShip(null);
  };

  renderItem = ({item}: {item: CustomerModel}) => {
    let price: number | undefined = 0;
    if (this.props?.giaHienThiCustomer) {
      price =
        this.props.giaHienThiCustomer.id === 'total_price'
          ? item?.total_invoice_price
          : item.total_debt;
    }
    if (this.props.route?.params?.type === 'CHON_KHACH_HANG') {
      return (
        <ItemCustomers
          onPressItem={() => this.chonKhachHang(item)}
          customerCheck={true}
          uri={item.avatar}
          name={item.name}
          id={item.id}
          phoneCustomer={item.phone}
          totalPrice={price}
          styleProps={{
            backgroundColor:
              item?.id === this.props.currentKhachHang?.id ? COLOR.BG.BLACK_10 : COLOR.BG.PRIMARY
          }}
        />
      );
    }
    return (
      <ItemCustomers
        onPressItem={() => {
          MyNavigator.navigate('CustomersDetail', {idCustomer: item.id});
        }}
        customerCheck={true}
        uri={item.avatar}
        name={item.name}
        id={item.id}
        phoneCustomer={item.phone}
        totalPrice={price}
      />
    );
  };

  keyExtractor = (item: CustomerModel, index: number) => {
    if (item.id) {
      return item.id.toString() + index.toString();
    }
    return item.toString();
  };

  renderListFooterComponent = () => {
    if (this.props.isLoadMore) {
      return <MyLoading />;
    }
    return <ItemBoderBottom />;
  };

  renderItemSeparatorComponent = () => {
    return <ItemLineIndicator />;
  };

  componentDidMount() {
    const {type} = this.props.route.params;
    this.props.navigation.setOptions({
      headerTitle: type === 'CHON_KHACH_HANG' ? 'Chọn khách hàng' : 'Khách hàng',
      headerRight: () => {
        if (type === 'CHON_KHACH_HANG') {
          return null;
        }
        return (
          <MyButtonIcon
            style={{...setPadding(MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)}}
            iconFontType="AntDesign"
            iconProps={{name: 'plus', size: 24, color: COLOR.TEXT.BLACK}}
            onPress={() => {
              MyNavigator.navigate('AddCustomer');
            }}
          />
        );
      }
    });
  }

  shouldComponentUpdate(nextProps: IProps) {
    if (this.props.currentKhachHang !== nextProps.currentKhachHang) return false;
    return true;
  }

  renderListEmptyComponent = () => {
    const {isFirstLoading, isError} = this.props;
    if (isFirstLoading) {
      return (
        <MyView style={CustomerStyle.loadingContainer}>
          <MyLoading />
        </MyView>
      );
    }
    if (isError) {
      return (
        <MyView style={CustomerStyle.emptyCustomer}>
          <MyText>Không có dữ liệu</MyText>
        </MyView>
      );
    }
    return (
      <MyView style={CustomerStyle.emptyCustomer}>
        <MyText>Không có dữ liệu.</MyText>
      </MyView>
    );
  };

  renderListHeaderComponent = () => {
    if (this.props.route?.params?.type === 'CHON_KHACH_HANG') {
      const item = KHACH_LE;
      return (
        <>
          <ItemCustomers
            onPressItem={() => this.chonKhachHang(item)}
            customerCheck={true}
            name={item.name}
            id={item.id}
            styleProps={{
              backgroundColor:
                item?.id === this.props.currentKhachHang?.id ? COLOR.BG.BLACK_10 : COLOR.BG.PRIMARY
            }}
          />
          <ItemLineIndicator />
        </>
      );
    } else {
      return <MyView />;
    }
  };

  render() {
    const {isRefresh, arrCustomer} = this.props;
    return (
      <MyView style={CustomerStyle.containerList}>
        <HeaderFilterSort />
        <MyView
          style={{
            ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0),
            ...setMargin(MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)
          }}>
          <MyText myFontStyle="Medium" style={CustomerStyle.myTextTop}>
            Tổng số {Utilities.convertCount(arrCustomer?.length)} khách hàng
          </MyText>
        </MyView>
        <ItemLineIndicatorCustom />
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={isRefresh ? isRefresh : false} />}
          data={arrCustomer}
          extraData={arrCustomer}
          initialNumToRender={10}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderItemSeparatorComponent}
          ListEmptyComponent={this.renderListEmptyComponent}
          keyExtractor={this.keyExtractor}
          onEndReachedThreshold={0.1}
          ListFooterComponent={this.renderListFooterComponent}
          ListHeaderComponent={this.renderListHeaderComponent}
          contentContainerStyle={{
            ...setRadius(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16),
            backgroundColor: COLOR.BG.WHITE
          }}
        />
        {/* <TotalPriceCustomer /> */}
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {isRefresh, giaHienThiCustomer, arrCustomer, count, isLoadMore, isError, isFirstLoading} =
    state.CustomerReducer;
  const {currentKhachHang} = state.ProductBanHangReducer;
  return {
    isRefresh,
    arrCustomer,
    isError,
    count,
    isLoadMore,
    isFirstLoading,
    currentKhachHang,
    giaHienThiCustomer
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      GetCustomer,
      LoadMoreCustomer,
      setKhachHang,
      setObjectInforShip,
      setBangGia
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Customer);
