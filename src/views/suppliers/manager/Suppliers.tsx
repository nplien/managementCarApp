import * as React from 'react';
import {FlatList, RefreshControl, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {MyView, MyText, MyButtonText, MyLoading} from 'bases/components';
import {ItemBoderBottom, ItemCustomers, ItemLineIndicatorCustom} from 'views/app/components/items';
import {RootState} from 'views/app/redux/App.Reducer';
import {ISuppliersState, GetSuppliers} from './redux';
import {SuppliersStyle} from './style/suppliers.Style';
import {bindActionCreators} from 'redux';
import MyNavigator from 'utils/MyNavigator';

import HeaderFilterSort from './components/HeaderFilterSort';
import {IAddImportOrderState, setCurrentSuppliear} from 'views/warehouse/imports/addImport/redux';
import {COLOR, MY_SIZE} from 'bases/styles/Core';
import Utilities from 'utils/Utilities';
import {IAppNavigateProps} from 'views/app';
// import TotalPriceSupplier from './components/totalPriceSupplier/TotalPriceSupplier';

type IProps = IAppNavigateProps<'Suppliers'> &
  IAddImportOrderState & {
    SuppliersReducer: ISuppliersState;
    GetSuppliers: typeof GetSuppliers;
    setCurrentSuppliear: typeof setCurrentSuppliear;
  };
interface IStateProps {
  isModal: boolean;
}
const skip = 0;
const limit = 10;
class Suppliers extends React.Component<IProps, IStateProps> {
  componentDidMount() {
    const {arrSupplier} = this.props.SuppliersReducer;
    if (arrSupplier && arrSupplier.length > 0) {
      return;
    }
    this.props.GetSuppliers(skip, limit);
  }

  renderListEmptyComponent = () => {
    const {isFirstLoading, isError} = this.props.SuppliersReducer;
    if (isFirstLoading) {
      return (
        <MyView style={SuppliersStyle.loadingContainer}>
          <MyLoading />
        </MyView>
      );
    }
    if (isError) {
      return (
        <MyView style={SuppliersStyle.emptyCustomer}>
          <MyText>Không có dữ liệu</MyText>
          <MyButtonText
            onPress={() => {
              this.props.GetSuppliers(skip, limit);
            }}
            title="Tải lại"
            style={SuppliersStyle.BtnEmpty}
          />
        </MyView>
      );
    }
    return (
      <MyView style={SuppliersStyle.emptyCustomer}>
        <MyText>Không có dữ liệu.</MyText>
      </MyView>
    );
  };

  handleItemCustomer = (item: any) => {
    const type = this.props.route?.params?.type || '';
    const {suppliers} = this.props;
    if (type === 'IMPROT_ORDER') {
      if (item?.id === suppliers?.id) {
        this.props.setCurrentSuppliear(null);
      } else {
        this.props.setCurrentSuppliear(item);
      }
      MyNavigator.goBack();
    } else {
      MyNavigator.navigate('SuppliersDetail', {idCustomer: item.id});
    }
  };
  render() {
    const {arrSupplier, isRefresh, isLoadMore, count} = this.props.SuppliersReducer;
    const {suppliers} = this.props;

    return (
      <MyView style={SuppliersStyle.container}>
        <HeaderFilterSort />
        <MyView style={SuppliersStyle.ctnSoLuong}>
          <MyText myFontStyle="Medium" style={SuppliersStyle.myTextTop}>
            Tổng số {Utilities.convertCount(count)} nhà cung cấp
          </MyText>
        </MyView>
        <ItemLineIndicatorCustom />
        <FlatList
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefresh ? isRefresh : false}
              onRefresh={() => {
                this.props.GetSuppliers(skip, limit, true);
              }}
            />
          }
          contentContainerStyle={SuppliersStyle.contentStyle}
          data={arrSupplier}
          extraData={arrSupplier}
          keyExtractor={(item, index: number) => index.toString()}
          renderItem={({item}) => {
            return (
              <ItemCustomers
                styleProps={{
                  backgroundColor: item?.id === suppliers?.id ? COLOR.BG.BLACK_10 : COLOR.BG.PRIMARY
                }}
                onPressItem={() => this.handleItemCustomer(item)}
                // nameScreen={'Nhà cung cấp'}
                customerCheck={false}
                uri={item.avatar}
                name={item.name}
                id={item.id}
                phoneCustomer={item.phone}
                totalPrice={item?.total_invoice_price || 0}
              />
            );
          }}
          ListEmptyComponent={this.renderListEmptyComponent}
          ItemSeparatorComponent={() => (
            <MyView
              style={{
                marginHorizontal: MY_SIZE.s_16,
                height: StyleSheet.hairlineWidth,
                backgroundColor: COLOR.BG.GRAY
              }}
            />
          )}
          onEndReachedThreshold={0.4}
          onEndReached={() => {
            if (arrSupplier && arrSupplier.length === count) return;
            if (isLoadMore) return;
          }}
          ListFooterComponent={() => {
            if (isLoadMore) {
              return <MyLoading />;
            }
            return <ItemBoderBottom />;
          }}
        />
        {/* <TotalPriceSupplier /> */}
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {SuppliersReducer} = state;
  const {suppliers} = state.AddImportOrderReducer;
  return {SuppliersReducer, suppliers};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({GetSuppliers, setCurrentSuppliear}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Suppliers);
