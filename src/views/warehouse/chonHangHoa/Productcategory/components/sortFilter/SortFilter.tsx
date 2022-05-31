import {MyButton, MyIcon, MyText, MyView} from 'bases/components';
import React, {PureComponent} from 'react';
import {CategoryStyle} from '../../styles/Category.Style';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {GetProductCategory, IProductcategoryState, showRefresh} from '../../redux';
import {CONFIG_SORT_FILTER} from 'configs/FilterConfig';
import {changeSortFilter, ISortFilterState} from './redux';
import {IPropsButtonSheet} from 'views/app';
import MyNavigator from 'utils/MyNavigator';

interface IProps extends IProductcategoryState, ISortFilterState {
  changeSortFilter: typeof changeSortFilter;
  GetProductCategory: typeof GetProductCategory;
  showRefresh: typeof showRefresh;

  isShowSort: boolean;
  isShowSearchCode: boolean;
}

class SortFilter extends PureComponent<IProps> {
  showFilterCategory = () => {
    // MyNavigator.push('FilterCategory');
  };

  render() {
    const {count, sortFilter, isShowSearchCode, isShowSort} = this.props;

    let arrSortBy: IPropsButtonSheet[] = [];
    for (let index = 0; index < CONFIG_SORT_FILTER.HANG_HOA.length; index++) {
      const element = CONFIG_SORT_FILTER.HANG_HOA[index];
      arrSortBy.push({
        title: element.name,
        onPress: () => {
          this.props.changeSortFilter(element);
          MyNavigator.goBack();
          this.props.showRefresh(true);
          this.props.GetProductCategory();
        },
        isActive: element.name === sortFilter.name
      });
    }

    return (
      <MyView style={CategoryStyle.myViewTop}>
        <MyView style={CategoryStyle.viewTextHeader} transparent>
          <MyText numberOfLines={1}>Tổng số {count} hàng hóa</MyText>
        </MyView>
        <MyButton transparent style={CategoryStyle.myviewIcon} onPress={this.showFilterCategory}>
          <MyIcon iconFontType="MaterialIcons" name="search" size={24} />
        </MyButton>

        {isShowSort ? (
          <MyButton
            transparent
            style={CategoryStyle.myviewIcon}
            onPress={() => {
              MyNavigator.pushModal('MyBottomSheetPicker', {
                arrayButton: arrSortBy,
                titleButtonCancel: 'Huỷ bỏ'
              });
            }}>
            <MyIcon iconFontType="MaterialIcons" name="sort" size={24} />
          </MyButton>
        ) : null}

        {isShowSearchCode ? (
          <MyButton transparent style={CategoryStyle.myviewIcon}>
            <MyIcon iconFontType="MaterialCommunityIcons" name="barcode-scan" size={24} />
          </MyButton>
        ) : null}
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {count} = state.ProductCategoryReducer;
  const {sortFilter} = state.SortFilterReducer;
  return {count, sortFilter};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      changeSortFilter,
      GetProductCategory,
      showRefresh
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SortFilter);
