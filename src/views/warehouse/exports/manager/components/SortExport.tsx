import {MyButton, MyIcon, MyView} from 'bases/components';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';
import MyNavigator from 'utils/MyNavigator';
import {CONFIG_SORT_FILTER} from 'configs/FilterConfig';
import {bindActionCreators} from 'redux';
import {
  getListExportOrder,
  setOnRefreshExport,
  setParamsSortExport,
  IExportOrderState
} from '../redux';
import {sortExport} from '../styles/ExportOrder.style';
import {IPropsButtonSheet} from 'views/app';

interface IToolbarFilterProps extends IExportOrderState {
  setParamsSortExport: typeof setParamsSortExport;
  getListExportOrder: typeof getListExportOrder;
  setOnRefreshExport: typeof setOnRefreshExport;
}

class SortExport extends PureComponent<IToolbarFilterProps> {
  render() {
    let {currentSort} = this.props;

    let arrSortBy: IPropsButtonSheet[] = [];
    for (let index = 0; index < CONFIG_SORT_FILTER.CHUYEN_HANG.length; index++) {
      const element = CONFIG_SORT_FILTER.CHUYEN_HANG[index];
      arrSortBy.push({
        title: element.name,
        onPress: () => {
          this.props.setParamsSortExport(element);
          MyNavigator.goBack();
          this.props.setOnRefreshExport(true);
          this.props.getListExportOrder();
        },
        isActive: element.name === currentSort?.name
      });
    }

    return (
      <MyView style={sortExport.filterDivideRight} transparent>
        <MyButton
          transparent
          style={sortExport.btnFilterContainer}
          onPress={() => {
            MyNavigator.push('FilterExport');
          }}>
          <MyIcon iconFontType="MaterialIcons" name="search" size={24} />
        </MyButton>
        <MyButton
          transparent
          style={sortExport.btnFilterContainer}
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
  const {currentSort} = state.ExportOrderReducer;
  return {currentSort};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      setParamsSortExport,
      getListExportOrder,
      setOnRefreshExport
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SortExport);
