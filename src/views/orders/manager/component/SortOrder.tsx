import {MyButton, MyIcon, MyView} from 'bases/components';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';
import MyNavigator from 'utils/MyNavigator';
import {styles} from 'views/orders/manager/filterOrder/styles/filterOrder.styles';
import {CONFIG_SORT_FILTER} from 'configs/FilterConfig';
import {bindActionCreators} from 'redux';
import {getListOrder, setOnRefreshDH, IOrderState, setOrderSort, setStoreOrder} from '../redux';
import {IPersonalState} from 'views/personals/redux';
import {IStorePerson} from 'models/ModelBase';
import {IPropsButtonSheet} from 'views/app';

interface IToolbarFilterProps extends IOrderState, IPersonalState {
  setOrderSort: typeof setOrderSort;
  getListOrder: typeof getListOrder;
  setOnRefreshDH: typeof setOnRefreshDH;
  setStoreOrder: typeof setStoreOrder;
}

class HeaderFilterSortOrder extends PureComponent<IToolbarFilterProps> {
  showChiNhanhModal = () => {
    const {arrStoreOrder, infoPersonal} = this.props;
    if (arrStoreOrder && arrStoreOrder.length > 0) {
      MyNavigator.pushModal('MyStoreMultiplePicker', {
        storeDaChon: arrStoreOrder,
        onApDung: (arr: IStorePerson[]) => {
          this.apDungChiNhanh(arr);
        }
      });
    } else {
      MyNavigator.pushModal('MyStoreMultiplePicker', {
        storeDaChon: infoPersonal?.stores || [],
        onApDung: (arr: IStorePerson[]) => {
          this.apDungChiNhanh(arr);
        }
      });
    }
  };
  apDungChiNhanh = (arr: IStorePerson[]) => {
    this.props.setStoreOrder(arr);
    this.props.setOnRefreshDH(true);
    this.props.getListOrder();
  };
  render() {
    let {orderSort} = this.props;

    let arrSortBy: IPropsButtonSheet[] = [];
    for (let index = 0; index < CONFIG_SORT_FILTER.DAT_HANG.length; index++) {
      const element = CONFIG_SORT_FILTER.DAT_HANG[index];
      arrSortBy.push({
        title: element.name,
        onPress: () => {
          this.props.setOrderSort(element);
          MyNavigator.goBack();
          this.props.setOnRefreshDH(true);
          this.props.getListOrder();
        },
        isActive: element.name === orderSort?.name
      });
    }

    return (
      <MyView style={styles.filterDivideRight} transparent>
        <MyButton transparent style={styles.btnFilterContainer} onPress={this.showChiNhanhModal}>
          <MyIcon iconFontType="MaterialIcons" name="location-on" size={20} />
        </MyButton>
        <MyButton
          transparent
          style={styles.btnFilterContainer}
          onPress={() => {
            MyNavigator.push('FilterOrder');
          }}>
          <MyIcon iconFontType="MaterialIcons" name="search" size={24} />
        </MyButton>
        <MyButton
          transparent
          style={styles.btnFilterContainer}
          onPress={() => {
            MyNavigator.pushModal('MyBottomSheetPicker', {
              arrayButton: arrSortBy,
              titleButtonCancel: 'Huỷ bỏ'
            });
          }}>
          <MyIcon iconFontType="MaterialIcons" name="sort" size={24} />
        </MyButton>
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {orderSort, arrStoreOrder} = state.OrderReducer;
  const {infoPersonal} = state.PersonalReducer;
  return {orderSort, infoPersonal, arrStoreOrder};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      setOrderSort,
      getListOrder,
      setOnRefreshDH,
      setStoreOrder
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderFilterSortOrder);
