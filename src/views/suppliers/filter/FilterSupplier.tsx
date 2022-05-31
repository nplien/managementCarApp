import * as React from 'react';
import {KeyboardAvoidingView, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {MyText, MyIcon, MyButton, MyView, MyButtonText} from 'bases/components';
import {setMargin, MY_SIZE, COLOR} from 'bases/styles/Core';
import MyNavigator from 'utils/MyNavigator';
import ModalCreator from './components/ModalCreator';
import ViewStatus from './components/ViewStatus';
import ModalGroup from './components/ModalGroup';
import {FilterSupplierStyle} from './styles/FilterSupplier.style';
import {GetFilterSupplier, GetSuppliers, ISuppliersState} from '../manager/redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootState} from 'views/app/redux/App.Reducer';
import ViewDebt from './components/ViewDebt';
import ViewPrice from './components/ViewPrice';
import TextSearch from './components/TextSearch';
import Utilities from 'utils/Utilities';

interface IProps extends ISuppliersState {
  GetFilterSupplier: typeof GetFilterSupplier;
  GetSuppliers: typeof GetSuppliers;
}
interface AppState {
  nameCreator: string;
  nameGroup: string;
}
class FilterSupplier extends React.Component<IProps, AppState> {
  mapSupplies: any;
  maxTotalDebt: any;
  maxTotalPrice: any;
  modalCreator: ModalCreator | any;
  modalGroup: ModalGroup | any;
  constructor(props: IProps) {
    super(props);
    this.mapSupplies = {};
    const {param, nameGroup} = this.props;
    this.state = {
      nameCreator: param?.created_by ? param?.created_by : '',
      nameGroup: nameGroup ? nameGroup : ''
    };
  }
  onchangeValue(key: string, text: any) {
    this.mapSupplies[key] = text;
  }
  isEmpty(obj: {hasOwnProperty: (arg0: string) => any}) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }
  componentDidMount() {
    this.modalCreator?.getListStaff();
    this.modalGroup?.getListGroup();
  }
  FnSearchWholesale = () => {
    const {param} = this.props;
    const {nameGroup} = this.state;

    if (this.isEmpty(this.mapSupplies)) {
      this.props.GetFilterSupplier(this.props.param, nameGroup);
    } else {
      let convertParam: any = param;
      for (var iMapSupplies in this.mapSupplies) {
        for (var iParam in convertParam) {
          if (iMapSupplies === iParam) {
            convertParam[iParam] = this.mapSupplies[iParam];
          } else {
            convertParam[iMapSupplies] = this.mapSupplies[iMapSupplies];
          }
        }
      }
      this.props.GetFilterSupplier(convertParam, nameGroup);
    }
    this.props.GetSuppliers(0, 10, true);
    MyNavigator.goBack();
  };
  render() {
    const {nameCreator, nameGroup} = this.state;
    return (
      <MyView style={FilterSupplierStyle.container}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={60}
          style={FilterSupplierStyle.container}
          behavior={Utilities.isAndroid() ? undefined : 'padding'}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <MyText style={FilterSupplierStyle.myText}>Tìm kiếm theo</MyText>
            <TextSearch
              onChangeTextView={(key, text) => {
                this.onchangeValue(key, text);
              }}
            />
            <MyText style={FilterSupplierStyle.myText}>Nhóm nhà cung cấp</MyText>
            <MyButton
              onPress={() => {
                // this.modalGroup?.showModal();
                MyNavigator.pushModal('ModalNKH', {
                  checkGroup: nameGroup,
                  valueModal: (text: string, index: number) => {
                    this.onchangeValue('groups', index);
                    if (text === this.state.nameGroup) {
                      this.setState({
                        nameGroup: ''
                      });
                    } else {
                      this.setState({
                        nameGroup: text
                      });
                    }
                  },
                  type: 'supplier'
                });
              }}
              style={FilterSupplierStyle.myButton}>
              <MyView style={FilterSupplierStyle.myGroup} transparent>
                {nameGroup && nameGroup?.length > 0 ? (
                  <MyButton
                    onPress={() => {
                      this.setState({
                        nameGroup: ''
                      });
                    }}
                    style={[FilterSupplierStyle.myButtonGroup, {backgroundColor: COLOR.TEXT.BLUE}]}>
                    <MyText
                      myFontStyle="Regular"
                      style={[FilterSupplierStyle.myTextSize, {color: COLOR.TEXT.WHITE}]}>
                      {nameGroup}
                    </MyText>
                  </MyButton>
                ) : (
                  <MyText
                    myFontStyle="Regular"
                    style={[FilterSupplierStyle.myTextSize, FilterSupplierStyle.myButtonGroup]}>
                    Tất cả
                  </MyText>
                )}
              </MyView>
              <MyIcon
                iconFontType="AntDesign"
                name={'right'}
                size={20}
                style={FilterSupplierStyle.IconView}
              />
            </MyButton>
            <MyText style={FilterSupplierStyle.myText}>Người tạo</MyText>
            <MyButton
              onPress={() => {
                // this.modalCreator?.showModal();
                MyNavigator.pushModal('ModalCreator', {
                  checkCreator: nameCreator,
                  valueModal: (text: any) => {
                    if (text.name === this.state.nameCreator) {
                      this.setState({
                        nameCreator: ''
                      });
                      this.onchangeValue('created_by', null);
                    } else {
                      this.onchangeValue('created_by', text.name);
                      this.setState({
                        nameCreator: text.name
                      });
                    }
                  }
                });
              }}
              style={FilterSupplierStyle.myButton}>
              <MyView style={FilterSupplierStyle.myGroup} transparent>
                {nameCreator && nameCreator?.length > 0 ? (
                  <MyButton
                    onPress={() => {
                      this.onchangeValue('created_by', null);
                      this.setState({
                        nameCreator: ''
                      });
                    }}
                    style={[FilterSupplierStyle.myButtonGroup, {backgroundColor: COLOR.TEXT.BLUE}]}>
                    <MyText
                      myFontStyle="Regular"
                      style={[FilterSupplierStyle.myTextSize, {color: COLOR.TEXT.WHITE}]}>
                      {nameCreator}
                    </MyText>
                  </MyButton>
                ) : (
                  <MyText
                    myFontStyle="Regular"
                    style={[FilterSupplierStyle.myTextSize, FilterSupplierStyle.myButtonGroup]}>
                    Tất cả
                  </MyText>
                )}
              </MyView>
              <MyIcon
                iconFontType="AntDesign"
                name={'right'}
                size={20}
                style={FilterSupplierStyle.IconView}
              />
            </MyButton>
            <MyText style={FilterSupplierStyle.myText}>Tổng mua</MyText>
            <ViewPrice
              onChangeTextView={(key, text) => {
                this.onchangeValue(key, text);
              }}
            />
            <MyText style={FilterSupplierStyle.myText}>Nợ hiện tại</MyText>
            <ViewDebt
              onChangeTextView={(key, text) => {
                this.onchangeValue(key, text);
              }}
            />
            <MyText style={FilterSupplierStyle.myText}>Trạng thái</MyText>
            <ViewStatus
              onChangeValue={value => {
                this.onchangeValue('status', value);
              }}
            />
          </ScrollView>
        </KeyboardAvoidingView>
        <ModalGroup
          ref={node => {
            this.modalGroup = node;
          }}
          checkGroup={nameGroup}
          valueModal={(text, index) => {
            this.onchangeValue('groups', index);
            if (text === this.state.nameGroup) {
              this.setState({
                nameGroup: ''
              });
            } else {
              this.setState({
                nameGroup: text
              });
            }
          }}
        />
        <ModalCreator
          ref={node => {
            this.modalCreator = node;
          }}
          checkCreator={nameCreator}
          valueModal={text => {
            if (text === this.state.nameCreator) {
              this.setState({
                nameCreator: ''
              });
              this.onchangeValue('created_by', null);
            } else {
              this.onchangeValue('created_by', text);
              this.setState({
                nameCreator: text
              });
            }
          }}
        />
        <SafeAreaView edges={['bottom']}>
          <MyButtonText
            onPress={() => {
              this.FnSearchWholesale();
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
  const {param, nameGroup} = state.SuppliersReducer;
  return {param, nameGroup};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({GetFilterSupplier, GetSuppliers}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(FilterSupplier);
