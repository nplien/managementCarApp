import {MyButtonText, MyLoading, MyText, MyView} from 'bases/components';
import {setMargin, MY_SIZE} from 'bases/styles/Core';
import React, {PureComponent} from 'react';
import {ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MyNavigator from 'utils/MyNavigator';
import {RootState} from 'views/app/redux/App.Reducer';
import {setOnRefresh, getListAddImport} from '../addImport/redux';
import BrandsItem from './components/BrandsItem';
import DMView from './components/DMView';
import {IImportCateReducerState, setBrands, setValue} from './redux';
import {cateAndBrandsStyle} from './styles/ImportCate.styles';
interface IProps extends IImportCateReducerState {
  setBrands: typeof setBrands;
  setValue: typeof setValue;
  setOnRefresh: typeof setOnRefresh;
  getListAddImport: typeof getListAddImport;
  ImportCateReducer: IImportCateReducerState;
}
interface IStates {
  isFirstLoading: boolean;
}
class CateAndBrands extends PureComponent<IProps, IStates> {
  state = {isFirstLoading: true};
  timeOut: any = null;

  statusOrderRef: any = React.createRef();
  orderFilterReducerOld: IImportCateReducerState = {};
  isBack: boolean = true;

  constructor(props: any) {
    super(props);
    let oldReducer = JSON.stringify(this.props.ImportCateReducer);
    this.orderFilterReducerOld = JSON.parse(oldReducer);
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
      this.props.setValue(this.orderFilterReducerOld);
    }
  }
  submitFilter = () => {
    // this.props.setValue(this.filterCategoryReducerOld);
    this.isBack = false;
    this.props.setOnRefresh(true);
    this.props.getListAddImport();
    MyNavigator.goBack();
  };

  handleBrands = () => {
    if (!this.props.brands) {
      MyNavigator.push('ImportBrands');
    } else {
      this.props.setBrands(undefined);
    }
  };
  render() {
    const {isFirstLoading} = this.state;

    if (isFirstLoading) {
      return (
        <MyView style={[cateAndBrandsStyle.container, {marginTop: MY_SIZE.s_16}]}>
          <MyLoading />
        </MyView>
      );
    }

    const {brands, arrBrands} = this.props;
    let brand = 'Tất cả';
    let isCheckBrands = false;
    if (brands && arrBrands && arrBrands?.length > 0) {
      brand = arrBrands?.find((x: any) => x.id && x.id.toString() === brands)?.name || 'Tất cả';
    }

    if (brand !== 'Tất cả') {
      isCheckBrands = true;
    }
    return (
      <MyView style={cateAndBrandsStyle.container}>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <MyText style={cateAndBrandsStyle.titleContainer}>Nhóm hàng</MyText>
          <DMView />
          <BrandsItem
            title="Thương hiệu"
            typeOfList="created_by"
            isSelected={isCheckBrands}
            value={brand}
            onPress={this.handleBrands}
          />
        </ScrollView>
        <SafeAreaView edges={['bottom']}>
          <MyButtonText
            onPress={() => {
              this.submitFilter();
            }}
            title="Áp dụng"
            style={{...setMargin(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)}}
          />
        </SafeAreaView>
      </MyView>
    );
  }
}
const mapStateToProps = (state: RootState) => {
  let {brands, arrBrands} = state.ImportCateReducer;
  let {ImportCateReducer} = state;
  return {brands, arrBrands, ImportCateReducer};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setBrands, setValue, getListAddImport, setOnRefresh}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(CateAndBrands);
