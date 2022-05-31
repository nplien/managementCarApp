import React, {PureComponent} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BCHangHoaStyles} from './styles/BCHangHoa.Styles';
import {MyView, MyText} from 'bases/components';
import ViewLocThoiGian from './components/ViewLocThoiGian';
import ChonChiNhanh from './components/ChonChiNhanh';
import {FlatList, Text} from 'react-native';
import {RootState} from 'views/app/redux/App.Reducer';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {IBCHangHoaState, resetBCHangHoa, getListBCHangHoa} from './redux';
import {IChooseStoreState} from 'views/menuLeft/redux';
import {COLOR, setMargin, MY_SIZE} from 'bases/styles/Core';
import Utilities from 'utils/Utilities';
import ViewTopDoanhThu from './components/ViewTopDoanhThu';
import ViewTopTonKho from './components/ViewTopTonKho';

interface IProps extends IBCHangHoaState, IChooseStoreState {
  getListBCHangHoa: typeof getListBCHangHoa;

  resetBCHangHoa: typeof resetBCHangHoa;
}

class BCHangHoa extends PureComponent<IProps> {
  arrDataOnlyOne: number[] = [1];

  componentDidMount() {
    this.props.getListBCHangHoa();
  }
  componentWillUnmount() {
    this.props.resetBCHangHoa();
  }

  ListHeaderComponent = () => {
    return <ViewTopDoanhThu />;
  };

  ListFooterComponent = () => {
    return <ViewTopTonKho />;
  };

  renderItemCenter = () => {
    const {totalProduct, totalProductValueInventory} = this.props;
    return (
      <MyView style={BCHangHoaStyles.viewContent}>
        <MyText style={{fontSize: MY_SIZE.s_18, color: COLOR.TEXT.WHITE}}>
          Tồn kho{' '}
          <Text style={{fontWeight: '600'}}>
            {Utilities.convertCount(totalProductValueInventory)}
          </Text>
        </MyText>
        <MyText
          style={{color: COLOR.TEXT.WHITE, fontSize: MY_SIZE.s_12, ...setMargin(MY_SIZE.s_4)}}>
          {Utilities.convertCount(totalProduct)} sản phẩm
        </MyText>
      </MyView>
    );
  };

  render() {
    return (
      <SafeAreaView style={BCHangHoaStyles.container} edges={['bottom']}>
        <MyView style={BCHangHoaStyles.myViewTop}>
          <ViewLocThoiGian />
          <ChonChiNhanh />
        </MyView>

        <FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={this.ListHeaderComponent()}
          ListHeaderComponentStyle={BCHangHoaStyles.viewListHerder}
          ListFooterComponent={this.ListFooterComponent()}
          ListFooterComponentStyle={BCHangHoaStyles.viewListHerder}
          data={this.arrDataOnlyOne}
          extraData={this.arrDataOnlyOne}
          keyExtractor={() => 'OnlyOne'}
          renderItem={this.renderItemCenter}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {
    arrBCHangHoaRevenue,
    arrBCHangHoaByInventory,
    totalProduct,
    groupCategory,
    totalProductValueInventory
  } = state.BCHangHoaReducer;
  const {cuaHangDangChon} = state.ChooseStoreReducer;
  return {
    arrBCHangHoaRevenue,
    arrBCHangHoaByInventory,
    totalProduct,
    groupCategory,
    totalProductValueInventory,
    cuaHangDangChon
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getListBCHangHoa,
      resetBCHangHoa
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(BCHangHoa);
