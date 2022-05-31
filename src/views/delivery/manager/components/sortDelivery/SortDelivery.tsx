import {MyButton, MyIcon, MyView} from 'bases/components';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {COLOR, MY_SIZE, setPadding} from 'bases/styles/Core';
import {StyleSheet} from 'react-native';
import MyNavigator from 'utils/MyNavigator';
import {RootState} from 'views/app/redux/App.Reducer';
import {getListDeliveryOrder, IDeliveryOrderState, setOnRefresh, setParamsSort} from '../../redux';
import {CONFIG_SORT_FILTER} from 'configs/FilterConfig';
import {bindActionCreators} from 'redux';
import {IPropsButtonSheet} from 'views/app';

interface IProps extends IDeliveryOrderState {
  getListDeliveryOrder: typeof getListDeliveryOrder;
  setOnRefresh: typeof setOnRefresh; // hien thi loading screen ManagerDelivery
  setParamsSort: typeof setParamsSort;
}

interface IState {}

class HeaderFilterSort extends PureComponent<IProps, IState> {
  render() {
    let {currentSortVD} = this.props;
    let arrSortBy: IPropsButtonSheet[] = [];
    for (let index = 0; index < CONFIG_SORT_FILTER.VAN_DON.length; index++) {
      const element = CONFIG_SORT_FILTER.VAN_DON[index];
      arrSortBy.push({
        title: element.name,
        onPress: () => {
          this.props.setParamsSort(element);
          MyNavigator.goBack();
          this.props.setOnRefresh(true);
          this.props.getListDeliveryOrder();
        },
        isActive: element.name === currentSortVD?.name
      });
    }

    return (
      <MyView style={styles.filterDivideRight} transparent>
        <MyButton
          transparent
          style={styles.btnFilterContainer}
          onPress={() => {
            MyNavigator.push('FilterDelivery');
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

const styles = StyleSheet.create({
  filterDivideRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: COLOR.BG.SECONDARY
  },
  btnFilterContainer: {
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_5, MY_SIZE.s_5, MY_SIZE.s_12, MY_SIZE.s_12)
  }
});
const mapStateToProps = (state: RootState) => {
  const {currentSortVD} = state.DeliveryOrderReducer;
  return {currentSortVD};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getListDeliveryOrder,
      setOnRefresh,
      setParamsSort
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(HeaderFilterSort);
