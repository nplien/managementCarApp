import {MyButton, MyIcon, MyView} from 'bases/components';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import MyNavigator from 'utils/MyNavigator';
import {RootState} from 'views/app/redux/App.Reducer';
import {CONFIG_SORT_FILTER} from 'configs/FilterConfig';
import {bindActionCreators} from 'redux';
import {
  getListTraHang,
  setOnRefreshTraHang,
  IReturnOrderState,
  setParamsSortTraHang,
  setStoreTraHang
} from '../redux';
import {IPersonalState} from 'views/personals/redux';
import {IStorePerson} from 'models/ModelBase';
import {filterTraHang} from '../filter/styles/filterTraHang.styles';
import {IPropsButtonSheet} from 'views/app';
interface IProps extends IReturnOrderState, IPersonalState {
  setParamsSortTraHang: typeof setParamsSortTraHang;
  getListTraHang: typeof getListTraHang;
  setOnRefreshTraHang: typeof setOnRefreshTraHang;
  setStoreTraHang: typeof setStoreTraHang;
}

interface IState {}

class SortTraHang extends PureComponent<IProps, IState> {
  showChiNhanhModal = () => {
    const {arrReturnOrder, infoPersonal} = this.props;
    if (arrReturnOrder && arrReturnOrder.length > 0) {
      MyNavigator.pushModal('MyStoreMultiplePicker', {
        storeDaChon: arrReturnOrder || [],
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
    this.props.setStoreTraHang(arr);
    this.props.setOnRefreshTraHang(true);
    this.props.getListTraHang();
  };
  render() {
    let {currentSort} = this.props;
    let arrSortBy: IPropsButtonSheet[] = [];
    for (let index = 0; index < CONFIG_SORT_FILTER.TRA_HANG.length; index++) {
      const element = CONFIG_SORT_FILTER.TRA_HANG[index];
      arrSortBy.push({
        title: element.name,
        onPress: () => {
          this.props.setParamsSortTraHang(element);
          MyNavigator.goBack();
          this.props.setOnRefreshTraHang(true);
          this.props.getListTraHang();
        },
        isActive: element.name === currentSort?.name
      });
    }
    return (
      <MyView style={filterTraHang.filterDivideRight} transparent>
        <MyButton
          transparent
          style={filterTraHang.btnFilterContainer}
          onPress={this.showChiNhanhModal}>
          <MyIcon iconFontType="MaterialIcons" name="location-on" size={20} />
        </MyButton>
        <MyButton
          transparent
          style={filterTraHang.btnFilterContainer}
          onPress={() => {
            MyNavigator.push('FilterTraHang');
          }}>
          <MyIcon iconFontType="MaterialIcons" name="search" size={24} />
        </MyButton>
        <MyButton
          transparent
          style={filterTraHang.btnFilterContainer}
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
  const {currentSort, arrReturnOrder} = state.ReturnOrderReducer;
  const {infoPersonal} = state.PersonalReducer;
  return {currentSort, arrReturnOrder, infoPersonal};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      setParamsSortTraHang,
      getListTraHang,
      setOnRefreshTraHang,
      setStoreTraHang
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SortTraHang);
