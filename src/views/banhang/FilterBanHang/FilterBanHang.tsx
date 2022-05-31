import React, {Component} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';

import {MyView, MyText, MyButtonText, MyLoading} from 'bases/components';
import {ScrollView} from 'react-native';
import {FilterBanHangStyle} from './styles/FilterBanHang.style';
import TextSearch from './components/TextSearch';
import TypeHangHoa from './components/TypeHangHoa';
import TonKho from './components/TonKho';
import BanTrucTiep from './components/BanTrucTiep';
import HienThi from './components/HienThi';
import DMView from './components/DMView';
import {IFilterBanHangState, setValue} from './redux';
import MyNavigator from 'utils/MyNavigator';
import {GetProductBanHang, showRefreshBanHang} from '../ProductBanHang/redux';
import {SafeAreaView} from 'react-native-safe-area-context';

interface IProps {
  FilterBanHangReducer: IFilterBanHangState;

  setValue: typeof setValue;
  GetProductBanHang: typeof GetProductBanHang;
  showRefreshBanHang: typeof showRefreshBanHang;
}

interface IStates {
  isFirstLoading: boolean;
}

class FilterBanHang extends Component<IProps, IStates> {
  state = {isFirstLoading: true};
  timeOut: any = null;

  filterBanHangReducerOld: IFilterBanHangState = {};
  isBack: boolean = true;

  constructor(props: any) {
    super(props);
    let oldReducer = JSON.stringify(this.props.FilterBanHangReducer);
    this.filterBanHangReducerOld = JSON.parse(oldReducer);
  }

  pressApDung = () => {
    this.isBack = false;
    MyNavigator.goBack();
    this.props.showRefreshBanHang(true);
    this.props.GetProductBanHang();
  };

  componentWillUnmount() {
    if (this.timeOut) {
      clearTimeout(this.timeOut);
    }
    if (this.isBack) {
      this.props.setValue(this.filterBanHangReducerOld);
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
        <MyView style={FilterBanHangStyle.emptyCustomer}>
          <MyLoading />
        </MyView>
      );
    }

    return (
      <MyView style={FilterBanHangStyle.container} transparent>
        <ScrollView
          style={FilterBanHangStyle.containerScroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <MyText style={FilterBanHangStyle.titleContainer}>Tìm kiếm</MyText>
          <TextSearch />
          <MyText style={FilterBanHangStyle.titleContainer}>Loại hàng</MyText>
          <TypeHangHoa />
          <MyText style={FilterBanHangStyle.titleContainer}>Nhóm hàng</MyText>
          <DMView />
          <MyText style={FilterBanHangStyle.titleContainer}>Tồn kho</MyText>
          <TonKho />
          <MyText style={FilterBanHangStyle.titleContainer}>Bán trực tiếp</MyText>
          <BanTrucTiep />
          <MyText style={FilterBanHangStyle.titleContainer}>Trạng thái</MyText>
          <HienThi />
        </ScrollView>
        <SafeAreaView edges={['bottom']}>
          <MyButtonText
            style={FilterBanHangStyle.btnApDung}
            title="Áp dụng"
            onPress={this.pressApDung}
          />
        </SafeAreaView>
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {FilterBanHangReducer} = state;
  return {FilterBanHangReducer};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      setValue,
      GetProductBanHang,
      showRefreshBanHang
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterBanHang);
