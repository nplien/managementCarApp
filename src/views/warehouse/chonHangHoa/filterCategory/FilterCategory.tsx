import React, {Component} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';

import {MyView, MyText, MyButtonText, MyLoading} from 'bases/components';
import {ScrollView} from 'react-native';
import {FilterCategoryStyle} from './styles/FilterCategory.style';
import TextSearch from './components/TextSearch';
import TypeHangHoa from './components/TypeHangHoa';
import TonKho from './components/TonKho';
import BanTrucTiep from './components/BanTrucTiep';
import HienThi from './components/HienThi';
import DMView from './components/DMView';
import {IFilterCategoryState, setValue} from './redux';
import MyNavigator from 'utils/MyNavigator';
import {GetProductCategory, showRefresh} from '../Productcategory/redux';
import {SafeAreaView} from 'react-native-safe-area-context';

interface IProps {
  FilterCategoryReducer: IFilterCategoryState;

  setValue: typeof setValue;
  GetProductCategory: typeof GetProductCategory;
  showRefresh: typeof showRefresh;
}

interface IStates {
  isFirstLoading: boolean;
}

class FilterCategory extends Component<IProps, IStates> {
  state = {isFirstLoading: true};
  timeOut: any = null;

  filterCategoryReducerOld: IFilterCategoryState = {};
  isBack: boolean = true;

  constructor(props: any) {
    super(props);
    let oldReducer = JSON.stringify(this.props.FilterCategoryReducer);
    this.filterCategoryReducerOld = JSON.parse(oldReducer);
  }

  pressApDung = () => {
    this.isBack = false;
    MyNavigator.goBack();
    this.props.showRefresh(true);
    this.props.GetProductCategory();
  };

  componentWillUnmount() {
    if (this.timeOut) {
      clearTimeout(this.timeOut);
    }
    if (this.isBack) {
      this.props.setValue(this.filterCategoryReducerOld);
    }
  }

  shouldComponentUpdate() {
    return this.state.isFirstLoading;
  }

  componentDidMount() {
    this.timeOut = setTimeout(() => {
      this.setState({
        isFirstLoading: false
      });
    }, 300);
  }

  render() {
    const {isFirstLoading} = this.state;

    if (isFirstLoading) {
      return (
        <MyView style={FilterCategoryStyle.emptyCustomer}>
          <MyLoading />
        </MyView>
      );
    }

    return (
      <SafeAreaView edges={['bottom']} style={FilterCategoryStyle.container}>
        <ScrollView
          style={FilterCategoryStyle.containerScroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <MyText style={FilterCategoryStyle.titleContainer}>Tìm kiếm</MyText>
          <TextSearch />
          <MyText style={FilterCategoryStyle.titleContainer}>Loại hàng</MyText>
          <TypeHangHoa />
          <MyText style={FilterCategoryStyle.titleContainer}>Nhóm hàng</MyText>
          <DMView />
          <MyText style={FilterCategoryStyle.titleContainer}>Tồn kho</MyText>
          <TonKho />
          <MyText style={FilterCategoryStyle.titleContainer}>Bán trực tiếp</MyText>
          <BanTrucTiep />
          <MyText style={FilterCategoryStyle.titleContainer}>Trạng thái</MyText>
          <HienThi />
        </ScrollView>
        <MyButtonText
          style={FilterCategoryStyle.btnApDung}
          title="Áp dụng"
          onPress={this.pressApDung}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {FilterCategoryReducer} = state;
  return {FilterCategoryReducer};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setValue, GetProductCategory, showRefresh}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterCategory);
