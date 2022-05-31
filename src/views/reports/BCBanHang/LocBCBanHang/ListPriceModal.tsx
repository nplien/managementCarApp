import React, {Component} from 'react';

import {MyText, MyButton, MyIcon, MyView} from 'bases/components';
import {FilterBCBanHangStyles} from '../styles/BCBanHang.Styles';
import {ManagerAPI} from 'services/Manager.Api';
import {checkArrTablePrice, IBCBanHangState} from '../redux';
import {IBangGiaModel} from 'models/BangGia.Model';
import {COLOR, MY_SIZE, setPadding, setRadius} from 'bases/styles/Core';
import {ActivityIndicator, FlatList, StyleSheet} from 'react-native';
import {ItemLineIndicator} from 'views/app/components/items';
import {RootState} from 'views/app/redux/App.Reducer';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Utilities from 'utils/Utilities';
import MyNavigator from 'utils/MyNavigator';
interface IProps extends IBCBanHangState {
  checkArrTablePrice: typeof checkArrTablePrice;
}
type IAppState = {
  isLoading: boolean;
  arrListTablePrice: IBangGiaModel[];
  arrHistoryTablePrice: IBangGiaModel[];
};
enum ID_TAT_CA {
  id = 0,
  name = 'Tất cả'
}
class ListPriceModal extends Component<IProps, IAppState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      arrListTablePrice: [],
      isLoading: true,
      arrHistoryTablePrice: []
    };
  }

  componentDidMount() {
    this.getPriceBook();

    const {arrTablePrice} = this.props;
    const {arrListTablePrice} = this.state;
    if (arrTablePrice?.length === arrListTablePrice.length - 1) {
      let newArrReduce: IBangGiaModel[] = [ID_TAT_CA];
      newArrReduce = newArrReduce.concat(arrTablePrice || []);
      this.setState({
        arrHistoryTablePrice: newArrReduce
      });
      return;
    }
    this.setState({arrHistoryTablePrice: [...(arrTablePrice || [])]});
  }

  onHideModal = () => {
    MyNavigator.goBack();
  };
  getPriceBook = () => {
    const param = {
      skip: 0,
      limit: 30,
      status: 'active'
    };
    ManagerAPI.getListPriceBooks(param)
      .then(data => {
        if (data && !data.code) {
          let newArrData: IBangGiaModel[] = [ID_TAT_CA];
          newArrData = newArrData.concat(data.data || []);
          this.setState({
            arrListTablePrice: newArrData,
            isLoading: false
          });
        } else {
          Utilities.showToast(data?.message, '', 'danger');
          this.setState({isLoading: false});
        }
      })
      .catch(_error => {
        Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
        this.setState({isLoading: false});
      });
  };
  /**
   *
   * @param item
   * NOTE loc và thêm vào các item vào arrHistoryTablePrice để gữi lại trước khi submit lên reducer
   */
  selectItem = (item: IBangGiaModel) => {
    const {arrHistoryTablePrice, arrListTablePrice} = this.state;

    const indexCurrent = arrHistoryTablePrice.findIndex(value => {
      return value.id === item.id;
    });
    if (item.id === ID_TAT_CA.id) {
      if (indexCurrent !== -1) {
        // id=0 có trong mảng arrHistoryTablePrice
        this.setState({arrHistoryTablePrice: []});
        return;
      }
      const data = [...arrListTablePrice];
      this.setState({arrHistoryTablePrice: data});
      return;
    }

    if (indexCurrent !== -1) {
      arrHistoryTablePrice.splice(indexCurrent, 1);

      const indexIDAll = arrHistoryTablePrice.findIndex(value => {
        return value.id === ID_TAT_CA.id;
      });
      if (indexIDAll !== -1) {
        arrHistoryTablePrice.splice(indexIDAll, 1);
      }
    } else {
      arrHistoryTablePrice.push(item);
      if (arrHistoryTablePrice.length === arrListTablePrice.length - 1) {
        arrHistoryTablePrice.push(ID_TAT_CA);
      }
    }

    this.setState({arrHistoryTablePrice: arrHistoryTablePrice});
  };

  onSubmit = () => {
    const {arrHistoryTablePrice} = this.state;
    const indexIDAll = arrHistoryTablePrice.findIndex(value => {
      return value.id === ID_TAT_CA.id;
    });
    if (indexIDAll !== -1) {
      arrHistoryTablePrice.splice(indexIDAll, 1);
    }
    this.props.checkArrTablePrice(arrHistoryTablePrice);
    this.onHideModal();
  };

  renderItem = ({item}: {item: IBangGiaModel}) => {
    const {arrHistoryTablePrice} = this.state;
    const isShowIcon =
      arrHistoryTablePrice && arrHistoryTablePrice?.findIndex(value => value.id === item.id) > -1;
    return (
      <MyButton
        style={FilterBCBanHangStyles.viewIconCheck}
        transparent
        onPress={() => {
          this.selectItem(item);
        }}>
        <MyText style={[FilterBCBanHangStyles.textContent, {flex: 1}]}>{item.name}</MyText>
        {isShowIcon ? (
          <MyIcon iconFontType="AntDesign" name="check" size={24} color={COLOR.TEXT.POSITIVE_BTN} />
        ) : null}
      </MyButton>
    );
  };
  render() {
    const {arrListTablePrice, isLoading} = this.state;

    return (
      <MyView style={{flex: 1, backgroundColor: COLOR.BG.BLACK_10}}>
        <MyButton
          style={styleListTablePrice.containerToolbar}
          transparent
          onPress={this.onHideModal}
          activeOpacity={1}
        />
        <MyView style={styleListTablePrice.viewTitleModal}>
          <MyButton
            style={styleListTablePrice.viewTitle}
            onPress={this.onHideModal}
            activeOpacity={1}
            transparent>
            <MyText myFontStyle="Medium" style={{fontSize: MY_SIZE.s_18}}>
              Huỷ bỏ
            </MyText>
          </MyButton>
          <MyView style={styleListTablePrice.titleModal}>
            <MyText myFontStyle="Medium" style={{fontSize: MY_SIZE.s_18}}>
              Chọn bảng giá
            </MyText>
          </MyView>
          <MyButton
            style={styleListTablePrice.viewTitle}
            onPress={this.onSubmit}
            activeOpacity={1}
            transparent>
            <MyText myFontStyle="Medium" style={{fontSize: MY_SIZE.s_18}}>
              Áp dụng
            </MyText>
          </MyButton>
        </MyView>
        {isLoading ? (
          <MyView>
            <ActivityIndicator />
          </MyView>
        ) : (
          <FlatList
            style={{backgroundColor: COLOR.BG.WHITE}}
            data={arrListTablePrice}
            keyExtractor={(i, index) => index.toString()}
            renderItem={this.renderItem}
            ItemSeparatorComponent={(_i, _index) => {
              return <ItemLineIndicator />;
            }}
          />
        )}
      </MyView>
    );
  }
}
const mapStateToProps = (state: RootState) => {
  const {arrTablePrice} = state.BCBanHangReducer;
  return {arrTablePrice};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({checkArrTablePrice}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(
  ListPriceModal
);

const styleListTablePrice = StyleSheet.create({
  containerToolbar: {
    height: MY_SIZE.s_135
  },
  viewTitleModal: {
    flexDirection: 'row',
    height: 56,
    alignItems: 'center',
    ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLOR.BG.BLACK_30
  },
  viewTitle: {
    flex: 1,
    height: '100%',
    ...setPadding(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_12, MY_SIZE.s_12)
  },
  titleModal: {
    flex: 2,
    height: '100%',
    padding: MY_SIZE.s_16,
    alignItems: 'center'
  },
  Modal: {
    flex: 1,
    margin: MY_SIZE.s_0
  }
});
