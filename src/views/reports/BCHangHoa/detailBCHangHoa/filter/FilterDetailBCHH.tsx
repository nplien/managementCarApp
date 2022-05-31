import {MyView, MyText, MyButtonText, MyLoading, MyButton, MyIcon} from 'bases/components';
import {setMargin, MY_SIZE, COLOR} from 'bases/styles/Core';
import React, {PureComponent} from 'react';
import {ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {MOI_QUAN_TAM} from 'services/DashBoard.Api';
import MyNavigator from 'utils/MyNavigator';
import {RootState} from 'views/app/redux/App.Reducer';
// import ModalNhomHang from '../../components/ModalNhomHang';
import {FilterBCHangHoaStyle} from '../../styles/BCHangHoa.Styles';
import {
  getListDetailBCHH,
  setOnRefreshDetailBCHH,
  IDetailBCHHState,
  setValueDetailBCHH,
  setCategorylsDetailBCHH
} from '../redux';
import TextSearchInvoice from './components/TextSearchInvoice';
import TypeFilterDetail from './components/TypeFilterDetail';
import StatusDetailBCHH from './components/StatusDetailBCHH';
import {filterBCHHStyle} from './styles/FilterBCHH.styles';
import {IAppNavigateProps} from 'views/app';
type IProps = IAppNavigateProps<'FilterDetailBCHH'> &
  IDetailBCHHState & {
    getListDetailBCHH: typeof getListDetailBCHH;
    setOnRefreshDetailBCHH: typeof setOnRefreshDetailBCHH;
    setValueDetailBCHH: typeof setValueDetailBCHH;
    setCategorylsDetailBCHH: typeof setCategorylsDetailBCHH;
    DetailBCHHReducerCopy: IDetailBCHHState;
  };
class FilterDetailBCHH extends PureComponent<IProps> {
  state = {isFirstLoading: true};
  timeOut: any = null;

  typesDetailRef: any = React.createRef();
  detailBCHHReducerOld: IDetailBCHHState = {};
  isBack: boolean = true;

  constructor(props: any) {
    super(props);
    let oldReducer = JSON.stringify(this.props.DetailBCHHReducerCopy);
    this.detailBCHHReducerOld = JSON.parse(oldReducer);
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
      this.props.setValueDetailBCHH(this.detailBCHHReducerOld);
    }
  }
  submitFilter = () => {
    const view = this.props.route?.params?.view;
    this.isBack = false;
    this.props.setValueDetailBCHH(this.typesDetailRef?.current?.type || []);
    this.props.setOnRefreshDetailBCHH(true);
    if (view) {
      this.props.getListDetailBCHH({view: view, skip: 0, limit: 10});
    }
    MyNavigator.goBack();
  };
  getListDetailBCHH = () => {
    const params = this.props.route?.params;
    if (params?.view === MOI_QUAN_TAM.BAN_HANG || params?.view === MOI_QUAN_TAM.LOI_NHUAN) {
      this.props.getListDetailBCHH({
        view: MOI_QUAN_TAM.LOI_NHUAN,
        skip: 0,
        limit: 10,
        sort_by: params?.sort_by
      });
    } else if (
      params?.view === MOI_QUAN_TAM.GIA_TRI_KHO ||
      params?.view === MOI_QUAN_TAM.XUAT_NHAP_TON
    ) {
      this.props.getListDetailBCHH({
        view: MOI_QUAN_TAM.GIA_TRI_KHO,
        skip: 0,
        limit: 10,
        sort_by: params?.sort_by
      });
    }
  };
  render() {
    const {isFirstLoading} = this.state;
    const {categories} = this.props;
    const params = this.props.route?.params;
    let renderFilterStatus = null;
    if (params?.view === MOI_QUAN_TAM.BAN_HANG || params?.view === MOI_QUAN_TAM.LOI_NHUAN) {
      renderFilterStatus = (
        <MyView>
          <MyText style={filterBCHHStyle.titleContainer}>Loại hàng</MyText>
          <TypeFilterDetail ref={this.typesDetailRef} />
        </MyView>
      );
    } else if (
      params?.view === MOI_QUAN_TAM.GIA_TRI_KHO ||
      params?.view === MOI_QUAN_TAM.XUAT_NHAP_TON
    ) {
      renderFilterStatus = <StatusDetailBCHH />;
    }
    if (isFirstLoading) {
      return (
        <MyView style={[filterBCHHStyle.container, {marginTop: MY_SIZE.s_16}]}>
          <MyLoading />
        </MyView>
      );
    }
    return (
      <MyView style={filterBCHHStyle.container} transparent>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <MyText style={filterBCHHStyle.titleContainer}>Tìm theo</MyText>
          <TextSearchInvoice />
          {renderFilterStatus}
          <MyText style={filterBCHHStyle.titleContainer}>Nhóm hàng</MyText>
          <MyButton
            style={FilterBCHangHoaStyle.myViewDM}
            onPress={() => {
              MyNavigator.pushModal('ModalNhomHang', {
                idCheckNhomHang: Number(categories?.id) || 0,
                onChooseItem: (name: string, id: string) => {
                  this.props.setCategorylsDetailBCHH(name, id);
                }
              });
            }}>
            <MyView style={FilterBCHangHoaStyle.myContentViewDM} transparent>
              {categories && categories.id !== undefined ? (
                <MyButton
                  onPress={() => this.props.setCategorylsDetailBCHH(undefined)}
                  style={[
                    FilterBCHangHoaStyle.myButtonCreator,
                    {backgroundColor: COLOR.TEXT.BLUE}
                  ]}>
                  <MyText
                    myFontStyle="Regular"
                    style={[FilterBCHangHoaStyle.myTextSize, {color: COLOR.TEXT.WHITE}]}>
                    {categories?.name || ''}
                  </MyText>
                </MyButton>
              ) : (
                <MyView
                  style={[
                    FilterBCHangHoaStyle.myButtonCreator,
                    {backgroundColor: COLOR.TEXT.WHITE}
                  ]}>
                  <MyText myFontStyle="Regular" style={FilterBCHangHoaStyle.myTextSize}>
                    Nhóm hàng
                  </MyText>
                </MyView>
              )}
            </MyView>
            <MyIcon
              style={FilterBCHangHoaStyle.myIconDM}
              iconFontType="AntDesign"
              name={'right'}
              size={24}
            />
          </MyButton>
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
  const {DetailBCHHReducer} = state;
  const {categories} = state.DetailBCHHReducer;
  return {DetailBCHHReducerCopy: DetailBCHHReducer, categories};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getListDetailBCHH,
      setOnRefreshDetailBCHH,
      setValueDetailBCHH,
      setCategorylsDetailBCHH
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterDetailBCHH);
