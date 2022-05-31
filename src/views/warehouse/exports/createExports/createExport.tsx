import * as React from 'react';
import {COLOR} from 'bases/styles/Core';
import {MyButton, MyView, MyLoading, MyText} from 'bases/components';
import SelectShipping from './components/selectShipping';
import {CreateExportStyle, BottomViewStyle} from './styles/createExport.styles';
import HeaderBrach from './components/headerBrach';
import {FlatList} from 'react-native-gesture-handler';
import ItemCreateExport from './components/itemCreateExport';
import {ItemLineIndicator} from 'views/app/components/items';
import BottomView from './components/bottomView';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setClearValue, ICreateExportState, setIsManySelect, deleteListExport} from './redux';
import {RootState} from 'views/app/redux/App.Reducer';
import MyNavigator from 'utils/MyNavigator';
import {ProductOptionsModel} from 'models/Product.Model';
import {SafeAreaView} from 'react-native-safe-area-context';
import ButtonToolbarRouter from 'bases/components/button/ButtonToolbarRouter';
interface IProps extends ICreateExportState {
  navigation: any;
  setClearValue: typeof setClearValue;
  setIsManySelect: typeof setIsManySelect;
  deleteListExport: typeof deleteListExport;
}

interface AppState {}

class CreateExport extends React.Component<IProps, AppState> {
  mapItemRef: Map<string, any> = new Map();
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <ButtonToolbarRouter
          isShowBtnLeft={false}
          isShowBtnRight
          iconRightFontType="MaterialCommunityIcons"
          iconRightProps={{name: 'information-outline', size: 24, color: COLOR.TEXT.BLACK}}
          onPressRight={() => {
            MyNavigator.push('InfoPhieuChuyen');
          }}
        />
      )
    });
  }
  componentWillUnmount() {
    this.props.setClearValue();
  }

  pressHuyXoa = () => {
    this.props.setIsManySelect(false);
    for (let [, value] of this.mapItemRef) {
      if (value) {
        if (value.getIsCheck()) {
          value.unCheck();
        }
      }
    }
  };

  pressXoa = () => {
    this.props.setIsManySelect(false);
    const arrItemXoa: ProductOptionsModel[] = [];
    for (let [, value] of this.mapItemRef) {
      if (value) {
        if (value.getIsCheck()) {
          arrItemXoa.push(value.getItem());
          value.unCheck();
        }
      }
    }
    this.props.deleteListExport(arrItemXoa);
  };
  renderItem = ({item}: {item: ProductOptionsModel}) => {
    return (
      <ItemCreateExport
        itemCreate={item}
        ref={node => {
          this.mapItemRef.set(item.sku, node);
        }}
      />
    );
  };
  public render() {
    const {arrExport, isLoading, isError, isManySelected} = this.props;
    if (isError) {
      <MyView style={CreateExportStyle.container}>
        <SelectShipping />
        <HeaderBrach />
        <MyView style={CreateExportStyle.line} />
      </MyView>;
    }
    return (
      <MyView style={CreateExportStyle.container}>
        <SelectShipping />
        <HeaderBrach />
        <MyView style={CreateExportStyle.line} />

        {isLoading ? (
          <MyView style={[CreateExportStyle.container, CreateExportStyle.loading]}>
            <MyLoading />
          </MyView>
        ) : (
          <FlatList
            data={arrExport}
            extraData={arrExport}
            initialNumToRender={10}
            renderItem={this.renderItem}
            keyExtractor={(_item, index) => String(index)}
            ItemSeparatorComponent={() => <ItemLineIndicator />}
          />
        )}
        <SafeAreaView edges={['left', 'bottom', 'right']}>
          {isManySelected ? (
            <MyView style={BottomViewStyle.viewBtnBottom}>
              <MyButton
                style={[BottomViewStyle.bottomView, {backgroundColor: COLOR.BG.GRAY}]}
                onPress={this.pressHuyXoa}>
                <MyText style={{color: COLOR.TEXT.WHITE}}>Huỷ</MyText>
              </MyButton>
              <MyButton
                style={[BottomViewStyle.bottomView, {backgroundColor: COLOR.BG.RED}]}
                onPress={this.pressXoa}>
                <MyText style={{color: COLOR.TEXT.WHITE}}>Xoá</MyText>
              </MyButton>
            </MyView>
          ) : (
            <BottomView />
          )}
        </SafeAreaView>
      </MyView>
    );
  }
}
const mapStateToProps = (state: RootState) => {
  const {arrExport, isLoading, isError, isManySelected} = state.CreateExportReducer;
  return {arrExport, isLoading, isError, isManySelected};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setClearValue, setIsManySelect, deleteListExport}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateExport);
