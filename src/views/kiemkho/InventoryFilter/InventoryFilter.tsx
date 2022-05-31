import React, {Component} from 'react';

import {ScrollView} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {MyView, MyLoading, MyButtonText, MyText} from 'bases/components';

import MyNavigator from 'utils/MyNavigator';
import {GetInventory, IIventoryState, setValueKK, showRefresh} from '../Inventory/redux';
import TextSearch from './components/TextSearch';
import StatusesPhieuKiem from './components/StatusesPhieuKiem';

import {RootState} from 'views/app/redux/App.Reducer';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FilterCategoryStyle} from './styles/InventoryMH.Style';

interface IProps {
  InventoryReducer: IIventoryState;

  GetInventory: typeof GetInventory;
  showRefresh: typeof showRefresh;
  setValueKK: typeof setValueKK;
}

interface IAppState extends IIventoryState {
  isFirstLoading: boolean;
}

class InventoryMH extends Component<IProps, IAppState> {
  state = {isFirstLoading: true};
  timeOut: any = null;

  filterReducerOld: IIventoryState = {};
  isBack: boolean = true;

  constructor(props: any) {
    super(props);
    let oldReducer = JSON.stringify(this.props.InventoryReducer);
    this.filterReducerOld = JSON.parse(oldReducer);
  }

  componentDidMount() {
    this.timeOut = setTimeout(() => {
      this.setState({
        isFirstLoading: false
      });
    }, 300);
  }

  componentWillUnmount() {
    if (this.timeOut) {
      clearTimeout(this.timeOut);
    }
    if (this.isBack) {
      this.props.setValueKK(this.filterReducerOld);
    }
  }

  shouldComponentUpdate() {
    return this.state.isFirstLoading;
  }

  pressApDung = () => {
    this.isBack = false;
    MyNavigator.goBack();
    this.props.showRefresh(true);
    this.props.GetInventory();
  };

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
          <MyText style={FilterCategoryStyle.titleContainer}>Tìm theo</MyText>
          <TextSearch />
          <MyText style={FilterCategoryStyle.titleContainer}>Trạng thái</MyText>
          <StatusesPhieuKiem />
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
  const {InventoryReducer} = state;
  return {InventoryReducer};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({GetInventory, showRefresh, setValueKK}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(InventoryMH);
