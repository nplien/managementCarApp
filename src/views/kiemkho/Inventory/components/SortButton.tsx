import React, {PureComponent} from 'react';
import {MyButton, MyIcon, MyView} from 'bases/components';
import {FilterStyle} from '../styles/Inventory.Style';
import MyNavigator from 'utils/MyNavigator';
import {CONFIG_SORT_FILTER} from 'configs/FilterConfig';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {changeSortKK, IIventoryState, GetInventory, showRefresh} from '../redux';
import {IPropsButtonSheet} from 'views/app';

interface IProps extends IIventoryState {
  changeSortKK: typeof changeSortKK;
  GetInventory: typeof GetInventory;
  showRefresh: typeof showRefresh;
}

class SortButton extends PureComponent<IProps> {
  showFilterCategory = () => {
    MyNavigator.push('InventoryFilter');
  };

  render() {
    const {sortFilter} = this.props;

    let arrSortBy: IPropsButtonSheet[] = [];
    if (sortFilter) {
      for (let index = 0; index < CONFIG_SORT_FILTER.KIEM_KHO.length; index++) {
        const element = CONFIG_SORT_FILTER.KIEM_KHO[index];
        arrSortBy.push({
          title: element.name,
          onPress: () => {
            this.props.changeSortKK(element);
            MyNavigator.goBack();
            this.props.showRefresh(true);
            this.props.GetInventory();
          },
          isActive: element.name === sortFilter?.name
        });
      }
    }

    return (
      <MyView style={FilterStyle.myViewTop} transparent>
        <MyButton transparent style={FilterStyle.myviewIcon} onPress={this.showFilterCategory}>
          <MyIcon iconFontType="MaterialIcons" name="search" size={24} />
        </MyButton>
        <MyButton
          transparent
          style={FilterStyle.myviewIcon}
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
  const {sortFilter} = state.InventoryReducer;
  return {sortFilter};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      changeSortKK,
      GetInventory,
      showRefresh
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SortButton);
