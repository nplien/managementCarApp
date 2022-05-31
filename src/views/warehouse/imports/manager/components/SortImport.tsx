import {MyButton, MyIcon, MyView} from 'bases/components';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';
import MyNavigator from 'utils/MyNavigator';
import {CONFIG_SORT_FILTER} from 'configs/FilterConfig';
import {bindActionCreators} from 'redux';
import {
  getListImportOrder,
  setOnRefreshImportOrder,
  setParamsSortIP,
  IImportOrderState,
  setStoreNhapVeImport
} from '../redux';
import {sortImport} from '../styles/ImportOrder.style';
import {IStorePerson} from 'models/ModelBase';
import {IPersonalState} from 'views/personals/redux';
import {IPropsButtonSheet} from 'views/app';

interface IToolbarFilterProps extends IPersonalState, IImportOrderState {
  setParamsSortIP: typeof setParamsSortIP;
  getListImportOrder: typeof getListImportOrder;
  setOnRefreshImportOrder: typeof setOnRefreshImportOrder;
  setStoreNhapVeImport: typeof setStoreNhapVeImport;
}

class SortImport extends PureComponent<IToolbarFilterProps> {
  showChiNhanhModal = () => {
    const {arrStoreDaChonImport, infoPersonal} = this.props;
    if (arrStoreDaChonImport && arrStoreDaChonImport.length > 0) {
      MyNavigator.pushModal('MyStoreMultiplePicker', {
        storeDaChon: arrStoreDaChonImport || [],
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
    this.props.setStoreNhapVeImport(arr);
    this.props.setOnRefreshImportOrder(true);
    this.props.getListImportOrder();
  };

  render() {
    let {currentSortIP} = this.props;

    let arrSortBy: IPropsButtonSheet[] = [];
    for (let index = 0; index < CONFIG_SORT_FILTER.NHAP_HANG.length; index++) {
      const element = CONFIG_SORT_FILTER.NHAP_HANG[index];
      arrSortBy.push({
        title: element.name,
        onPress: () => {
          this.props.setParamsSortIP(element);
          MyNavigator.goBack();
          this.props.setOnRefreshImportOrder(true);
          this.props.getListImportOrder();
        },
        isActive: element.name === currentSortIP?.name
      });
    }

    return (
      <MyView style={sortImport.filterDivideRight} transparent>
        <MyButton
          transparent
          style={sortImport.btnFilterContainer}
          onPress={this.showChiNhanhModal}>
          <MyIcon iconFontType="MaterialIcons" name="location-on" size={20} />
        </MyButton>

        <MyButton
          transparent
          style={sortImport.btnFilterContainer}
          onPress={() => {
            MyNavigator.push('ImportFilter');
          }}>
          <MyIcon iconFontType="MaterialIcons" name="search" size={24} />
        </MyButton>
        <MyButton
          transparent
          style={sortImport.btnFilterContainer}
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
  const {currentSortIP, arrStoreDaChonImport} = state.ImportOrderReducer;
  const {infoPersonal} = state.PersonalReducer;
  return {arrStoreDaChonImport, currentSortIP, infoPersonal};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      setParamsSortIP,
      getListImportOrder,
      setOnRefreshImportOrder,
      setStoreNhapVeImport
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SortImport);
