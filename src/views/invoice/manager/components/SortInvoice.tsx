import {MyButton, MyIcon, MyView} from 'bases/components';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import MyNavigator from 'utils/MyNavigator';
import {RootState} from 'views/app/redux/App.Reducer';
import {CONFIG_SORT_FILTER} from 'configs/FilterConfig';
import {styles} from 'views/invoice/manager/filter/styles/filterInvoice.styles';
import {bindActionCreators} from 'redux';
import {
  getListInvoice,
  setOnRefreshInvoice,
  IInvoiceOrderState,
  setParamsSortInvoice,
  setStoreInvoice
} from '../redux';
import {IPersonalState} from 'views/personals/redux';
// import MyStoreMultiplePicker from 'views/app/components/customs/MyStoreMultiplePicker';
import {IStorePerson} from 'models/ModelBase';
import {IPropsButtonSheet} from 'views/app';
interface IProps extends IInvoiceOrderState, IPersonalState {
  setParamsSortInvoice: typeof setParamsSortInvoice;
  getListInvoice: typeof getListInvoice;
  setOnRefreshInvoice: typeof setOnRefreshInvoice;
  setStoreInvoice: typeof setStoreInvoice;
}

interface IState {}

class SortInvoice extends PureComponent<IProps, IState> {
  showChiNhanhModal = () => {
    const {arrStoreInvoice, infoPersonal} = this.props;
    if (arrStoreInvoice && arrStoreInvoice.length > 0) {
      MyNavigator.pushModal('MyStoreMultiplePicker', {
        storeDaChon: arrStoreInvoice || [],
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
    this.props.setStoreInvoice(arr);
    this.props.setOnRefreshInvoice(true);
    this.props.getListInvoice();
  };
  render() {
    let {currentSort} = this.props;
    let arrSortBy: IPropsButtonSheet[] = [];
    for (let index = 0; index < CONFIG_SORT_FILTER.HOA_DON.length; index++) {
      const element = CONFIG_SORT_FILTER.HOA_DON[index];
      arrSortBy.push({
        title: element.name,
        onPress: () => {
          this.props.setParamsSortInvoice(element);
          MyNavigator.goBack();
          this.props.setOnRefreshInvoice(true);
          this.props.getListInvoice();
        },
        isActive: element.name === currentSort?.name
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
            MyNavigator.push('FilterInvoice');
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
  const {currentSort, arrStoreInvoice} = state.InvoiceOrderReducer;
  const {infoPersonal} = state.PersonalReducer;
  return {currentSort, arrStoreInvoice, infoPersonal};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      setParamsSortInvoice,
      getListInvoice,
      setOnRefreshInvoice,
      setStoreInvoice
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SortInvoice);
