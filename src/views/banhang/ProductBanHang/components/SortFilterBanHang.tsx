import {MyButton, MyIcon, MyText, MyView} from 'bases/components';
import React, {PureComponent} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {
  changeSortFilterBanHang,
  GetProductBanHang,
  IProductBanHangState,
  showRefreshBanHang
} from '../redux';
import MyNavigator from 'utils/MyNavigator';
import {CONFIG_SORT_FILTER} from 'configs/FilterConfig';
import {CategoryStyle} from '../styles/ProductHangHoa.Style';
import Utilities from 'utils/Utilities';
import {IPropsButtonSheet} from 'views/app';

interface IProps extends IProductBanHangState {
  changeSortFilterBanHang: typeof changeSortFilterBanHang;
  GetProductBanHang: typeof GetProductBanHang;
  showRefreshBanHang: typeof showRefreshBanHang;

  isShowSort: boolean;
  isShowSearchCode: boolean;
}

class SortFilter extends PureComponent<IProps> {
  showFilterCategory = () => {
    MyNavigator.push('FilterBanHang');
  };

  render() {
    const {count, sortFilter, isShowSearchCode, isShowSort} = this.props;

    let arrSortBy: IPropsButtonSheet[] = [];
    for (let index = 0; index < CONFIG_SORT_FILTER.HANG_HOA.length; index++) {
      const element = CONFIG_SORT_FILTER.HANG_HOA[index];
      arrSortBy.push({
        title: element.name,
        onPress: () => {
          this.props.changeSortFilterBanHang(element);
          MyNavigator.goBack();
          this.props.showRefreshBanHang(true);
          this.props.GetProductBanHang();
        },
        isActive: element.name === sortFilter?.name
      });
    }

    return (
      <MyView style={CategoryStyle.myViewTop}>
        <MyView style={CategoryStyle.viewTextHeader} transparent>
          <MyText numberOfLines={1}>Tổng số {Utilities.convertCount(count)} hàng hóa</MyText>
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
  const {count, sortFilter} = state.ProductBanHangReducer;
  return {count, sortFilter};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      changeSortFilterBanHang,
      GetProductBanHang,
      showRefreshBanHang
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SortFilter);
