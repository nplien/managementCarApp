import {MyButton, MyIcon, MyView} from 'bases/components';
import React, {PureComponent} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {
  GetProductHangHoa,
  IProductHangHoaState,
  showRefreshHangHoa,
  changeSortFilterHangHoa
} from '../redux';
import MyNavigator from 'utils/MyNavigator';
import {CONFIG_SORT_FILTER} from 'configs/FilterConfig';
import {CategoryStyle} from '../styles/ProductHangHoa.Style';
import {IPropsButtonSheet} from 'views/app';

interface IProps extends IProductHangHoaState {
  changeSortFilterHangHoa: typeof changeSortFilterHangHoa;
  GetProductHangHoa: typeof GetProductHangHoa;
  showRefreshHangHoa: typeof showRefreshHangHoa;

  isShowSort: boolean;
  isShowSearchCode: boolean;
}

class SortFilter extends PureComponent<IProps> {
  showFilterHangHoa = () => {
    MyNavigator.push('FilterHangHoa');
  };

  render() {
    const {sortFilter, isShowSearchCode, isShowSort} = this.props;

    let arrSortBy: IPropsButtonSheet[] = [];
    for (let index = 0; index < CONFIG_SORT_FILTER.HANG_HOA.length; index++) {
      const element = CONFIG_SORT_FILTER.HANG_HOA[index];
      arrSortBy.push({
        title: element.name,
        onPress: () => {
          this.props.changeSortFilterHangHoa(element);
          MyNavigator.goBack();
          this.props.showRefreshHangHoa(true);
          this.props.GetProductHangHoa();
        },
        isActive: element.name === sortFilter?.name
      });
    }

    return (
      <MyView style={CategoryStyle.myViewTop}>
        <MyButton transparent style={CategoryStyle.myviewIcon} onPress={this.showFilterHangHoa}>
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
  const {sortFilter} = state.ProductHangHoaReducer;
  return {sortFilter};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      changeSortFilterHangHoa,
      GetProductHangHoa,
      showRefreshHangHoa
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SortFilter);
