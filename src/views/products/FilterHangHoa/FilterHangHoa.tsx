import React, {Component} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';

import {MyView, MyText, MyButtonText, MyLoading} from 'bases/components';
import {ScrollView} from 'react-native';
import {FilterHangHoaStyle} from './styles/FilterHangHoa.style';
import TextSearch from './components/TextSearch';
// import TypeHangHoa from './components/TypeHangHoa';
import TonKho from './components/TonKho';
// import BanTrucTiep from './components/BanTrucTiep';
// import HienThi from './components/HienThi';
import DMView from './components/DMView';
import {IFilterHangHoaState, setValue} from './redux';
import MyNavigator from 'utils/MyNavigator';
import {GetProductHangHoa, showRefreshHangHoa} from '../ProductHangHoa/redux';
import {SafeAreaView} from 'react-native-safe-area-context';

interface IProps {
  FilterHangHoaReducer: IFilterHangHoaState;

  setValue: typeof setValue;
  GetProductHangHoa: typeof GetProductHangHoa;
  showRefreshHangHoa: typeof showRefreshHangHoa;
}

interface IStates {
  isFirstLoading: boolean;
}

class FilterHangHoa extends Component<IProps, IStates> {
  state = {isFirstLoading: true};
  timeOut: any = null;
  timeOutRefresh: any = null;

  FilterHangHoaReducerOld: IFilterHangHoaState = {};
  isBack: boolean = true;

  constructor(props: any) {
    super(props);
    let oldReducer = JSON.stringify(this.props.FilterHangHoaReducer);
    this.FilterHangHoaReducerOld = JSON.parse(oldReducer);
  }

  pressApDung = () => {
    this.isBack = false;
    MyNavigator.goBack();
    this.timeOutRefresh = setTimeout(() => {
      this.props.showRefreshHangHoa(true);
      this.props.GetProductHangHoa();
    }, 100);
  };

  componentWillUnmount() {
    if (this.timeOut) {
      clearTimeout(this.timeOut);
    }
    if (this.timeOutRefresh) {
      clearTimeout(this.timeOutRefresh);
    }
    if (this.isBack) {
      this.props.setValue(this.FilterHangHoaReducerOld);
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
        <MyView style={FilterHangHoaStyle.emptyCustomer}>
          <MyLoading />
        </MyView>
      );
    }

    return (
      <MyView style={FilterHangHoaStyle.container} transparent>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <MyText style={FilterHangHoaStyle.titleContainer}>Tìm kiếm</MyText>
          <TextSearch />
          {/* <MyText style={FilterHangHoaStyle.titleContainer}>Loại hàng</MyText>
          <TypeHangHoa /> */}
          <MyText style={FilterHangHoaStyle.titleContainer}>Loại phụ tùng</MyText>
          <DMView />
          <MyText style={FilterHangHoaStyle.titleContainer}>Tồn kho</MyText>
          <TonKho />
          {/* <MyText style={FilterHangHoaStyle.titleContainer}>Bán trực tiếp</MyText>
          <BanTrucTiep /> */}
          {/* <MyText style={FilterHangHoaStyle.titleContainer}>Trạng thái</MyText>
          <HienThi /> */}
        </ScrollView>
        <SafeAreaView edges={['bottom']}>
          <MyButtonText
            style={FilterHangHoaStyle.btnApDung}
            title="Áp dụng"
            onPress={this.pressApDung}
          />
        </SafeAreaView>
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {FilterHangHoaReducer} = state;
  return {FilterHangHoaReducer};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setValue, GetProductHangHoa, showRefreshHangHoa}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterHangHoa);
