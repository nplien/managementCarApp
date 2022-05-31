import {MyButton, MyIcon, MyView} from 'bases/components';
import React, {createRef, PureComponent} from 'react';
import {connect} from 'react-redux';
import MyNavigator from 'utils/MyNavigator';
import {RootState} from 'views/app/redux/App.Reducer';
import {CONFIG_SORT_FILTER} from 'configs/FilterConfig';
import {bindActionCreators} from 'redux';
import {
  getListDetailBCHH,
  setOnRefreshDetailBCHH,
  IDetailBCHHState,
  setParamsSortDetailBCHH,
  setStoreDetailBCHH
} from '../redux';
import {IPersonalState} from 'views/personals/redux';
import {filterBCHHStyle} from '../filter/styles/FilterBCHH.styles';
import {IStorePerson} from 'models/ModelBase';
import {IPropsButtonSheet} from 'views/app';
interface IProps extends IDetailBCHHState, IPersonalState {
  view: number;
  sort_by: string;
  setParamsSortDetailBCHH: typeof setParamsSortDetailBCHH;
  getListDetailBCHH: typeof getListDetailBCHH;
  setOnRefreshDetailBCHH: typeof setOnRefreshDetailBCHH;
  setStoreDetailBCHH: typeof setStoreDetailBCHH;
}

interface IState {}

class SortDetailBCHH extends PureComponent<IProps, IState> {
  sortRef: any = createRef();
  chiNhanhModalRef: any = createRef();

  showChiNhanhModal = () => {
    const {arrStoreDetailBCHH, infoPersonal} = this.props;
    if (arrStoreDetailBCHH && arrStoreDetailBCHH.length > 0) {
      // this.chiNhanhModalRef.current.onShow(arrStoreDetailBCHH);
      MyNavigator.pushModal('MyStoreMultiplePicker', {
        storeDaChon: arrStoreDetailBCHH || [],
        onApDung: (arr: IStorePerson[]) => {
          this.apDungChiNhanh(arr);
        }
      });
    } else {
      // this.chiNhanhModalRef.current.onShow(infoPersonal?.stores);
      MyNavigator.pushModal('MyStoreMultiplePicker', {
        storeDaChon: infoPersonal?.stores || [],
        onApDung: (arr: IStorePerson[]) => {
          this.apDungChiNhanh(arr);
        }
      });
    }
  };
  showSortModal = () => {
    this.sortRef.current.onShow();
  };

  apDungChiNhanh = (arr: IStorePerson[]) => {
    this.props.setStoreDetailBCHH(arr);
    this.props.setOnRefreshDetailBCHH(true);
    this.props.getListDetailBCHH({
      view: this.props.view,
      skip: 0,
      limit: 10,
      sort_by: this.props.sort_by
    });
  };
  render() {
    let {currentSortDetailBCHH} = this.props;
    let arrSortBy: IPropsButtonSheet[] = [];
    for (let index = 0; index < CONFIG_SORT_FILTER.BAO_CAO_HANG_HOA.length; index++) {
      const element = CONFIG_SORT_FILTER.BAO_CAO_HANG_HOA[index];
      arrSortBy.push({
        title: element.name,
        onPress: () => {
          this.props.setParamsSortDetailBCHH(element);
          MyNavigator.goBack();
          this.props.setOnRefreshDetailBCHH(true);
          this.props.getListDetailBCHH({
            view: this.props.view,
            skip: 0,
            limit: 10,
            sort_by: this.props.sort_by
          });
        },
        isActive: element.name === currentSortDetailBCHH?.name
      });
    }
    return (
      <MyView style={filterBCHHStyle.filterDivideRight} transparent>
        <MyButton
          transparent
          style={filterBCHHStyle.btnFilterContainer}
          onPress={this.showChiNhanhModal}>
          <MyIcon iconFontType="MaterialIcons" name="location-on" size={20} />
        </MyButton>
        <MyButton
          transparent
          style={filterBCHHStyle.btnFilterContainer}
          onPress={() => {
            MyNavigator.push('FilterDetailBCHH', {
              view: this.props.view,
              sort_by: this.props.sort_by
            });
          }}>
          <MyIcon iconFontType="MaterialIcons" name="search" size={24} />
        </MyButton>
        <MyButton
          transparent
          style={filterBCHHStyle.btnFilterContainer}
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
  const {currentSortDetailBCHH, arrStoreDetailBCHH} = state.DetailBCHHReducer;
  const {infoPersonal} = state.PersonalReducer;
  return {currentSortDetailBCHH, arrStoreDetailBCHH, infoPersonal};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      setParamsSortDetailBCHH,
      getListDetailBCHH,
      setOnRefreshDetailBCHH,
      setStoreDetailBCHH
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SortDetailBCHH);
