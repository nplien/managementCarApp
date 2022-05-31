import React, {PureComponent} from 'react';
import {MyButton, MyIcon, MyView} from 'bases/components';
import {CONFIG_SORT_FILTER} from 'configs/FilterConfig';
import {IPropsButtonSheet, ISortFilterType} from 'views/app';
import {StyleSheet} from 'react-native';
import {MY_SIZE, setPadding} from 'bases/styles/Core';
import MyNavigator from 'utils/MyNavigator';

interface IProps {
  sortFilter?: ISortFilterType;
  chooseSortFilter: (value: ISortFilterType) => void;
}

export default class SortNVBanHang extends PureComponent<IProps> {
  render() {
    const {sortFilter} = this.props;

    let arrSortBy: IPropsButtonSheet[] = [];
    if (sortFilter) {
      for (let index = 0; index < CONFIG_SORT_FILTER.BC_NHAN_VIEN_BAN_HANG.length; index++) {
        const element = CONFIG_SORT_FILTER.BC_NHAN_VIEN_BAN_HANG[index];
        arrSortBy.push({
          title: element.name,
          onPress: () => {
            MyNavigator.goBack();
            this.props.chooseSortFilter(element);
          },
          isActive: element.name === sortFilter?.name
        });
      }
    }

    return (
      <MyView style={styles.myViewTop} transparent>
        <MyButton
          transparent
          style={styles.myviewIcon}
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
const styles = StyleSheet.create({
  myViewTop: {
    flex: 1,
    flexDirection: 'row'
  },
  myviewIcon: {
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_10, MY_SIZE.s_10, MY_SIZE.s_16, MY_SIZE.s_16)
  }
});
