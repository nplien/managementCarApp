import {MyButton, MyIcon, MyView} from 'bases/components';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {COLOR, MY_SIZE, setPadding, setRadius} from 'bases/styles/Core';
import {StyleSheet} from 'react-native';
import MyNavigator from 'utils/MyNavigator';
import {RootState} from 'views/app/redux/App.Reducer';
import {bindActionCreators} from 'redux';
import {GetSuppliers, ISuppliersState, setParamsSortSupplier} from '../redux';
import {CONFIG_SORT_FILTER} from 'configs/FilterConfig';
import {IPropsButtonSheet} from 'views/app';

interface IProps extends Partial<ISuppliersState> {
  setParamsSortSupplier: typeof setParamsSortSupplier;
  GetSuppliers: typeof GetSuppliers;
}
interface IState {}

class HeaderFilterSort extends PureComponent<IProps, IState> {
  render() {
    const {currentSort} = this.props;
    let arrSortBy: IPropsButtonSheet[] = [];
    for (let index = 0; index < CONFIG_SORT_FILTER.CUSTOMER.length; index++) {
      const element = CONFIG_SORT_FILTER.CUSTOMER[index];
      arrSortBy.push({
        title: element.name,
        onPress: () => {
          this.props.setParamsSortSupplier(element);
          MyNavigator.goBack();
          this.props.GetSuppliers(0, 10, true);
        },
        isActive: element.name === currentSort?.name
      });
    }
    return (
      <MyView style={styles.container}>
        <MyButton
          transparent
          style={styles.btnIcon}
          onPress={() => {
            MyNavigator.push('FilterSupplier');
          }}>
          <MyIcon iconFontType="MaterialIcons" name="search" size={24} />
        </MyButton>
        <MyButton
          transparent
          style={styles.btnIcon}
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
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: COLOR.BG.WHITE,
    ...setRadius(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  viewBtnDate: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  viewSortFilter: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: COLOR.BG.SECONDARY
  },
  btnIcon: {
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_5, MY_SIZE.s_5, MY_SIZE.s_12, MY_SIZE.s_12)
  },
  viewTextHeader: {
    justifyContent: 'center',
    flex: 1,
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_0)
  }
});

const mapStateToProps = (state: RootState) => {
  const {currentSort} = state.SuppliersReducer;
  return {currentSort};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setParamsSortSupplier, GetSuppliers}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderFilterSort);
