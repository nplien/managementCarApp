import {MyButton, MyIcon, MyText, MyView} from 'bases/components';
import {COLOR, MY_SIZE, setRadius} from 'bases/styles/Core';
import {ICategoryModel} from 'models/Category.Model';
import * as React from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';

import {CategoryApi, ICategoryRequest} from 'services/Category.Api';
import MyNavigator from 'utils/MyNavigator';
import Utilities from 'utils/Utilities';
import {IAppNavigateProps} from 'views/app';
import {ItemLineIndicator} from 'views/app/components/items';
import {IBCHangHoaState} from '../redux';
import {FilterBCHangHoaStyle} from '../styles/BCHangHoa.Styles';

type IProps = IAppNavigateProps<'ModalNhomHang'> & IBCHangHoaState;

type IAppState = {
  isLoading: boolean;
  arrCategory: ICategoryModel[];
};

export default class ModalNhomHang extends React.Component<IProps, IAppState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isLoading: true,
      arrCategory: []
    };
  }

  componentDidMount() {
    this.getListArrCategory();
  }
  onHideModal = () => {
    MyNavigator.goBack();
  };

  renderItem = ({item}: {item: ICategoryModel}) => {
    const {id, name, children} = item;
    const {idCheckNhomHang} = this.props.route.params;

    return (
      <MyButton
        style={[FilterBCHangHoaStyle.viewItem]}
        transparent
        onPress={() => {
          if (children.length > 0) {
            this.props.route.params.onChooseItem(name, children.map(x => x.id).join(','));
          } else {
            this.props.route.params.onChooseItem(name, id.toString());
          }
          this.onHideModal();
        }}>
        <MyText style={[FilterBCHangHoaStyle.textContent, {flex: 1}]}>{name}</MyText>
        {idCheckNhomHang === id ? (
          <MyIcon iconFontType="AntDesign" name="check" size={22} color={COLOR.TEXT.POSITIVE_BTN} />
        ) : null}
      </MyButton>
    );
  };
  getListArrCategory = async () => {
    try {
      const params: ICategoryRequest = {skip: 0, limit: 500, nested: true};
      const response = await CategoryApi.getListCategory(params);
      if (response && response.data) {
        this.setState({arrCategory: response.data, isLoading: false});
      }
      this.setState({isLoading: false});
    } catch (error) {
      Utilities.logException('ModalNhomHang', error);
      this.setState({isLoading: false});
    }
  };

  render() {
    const {isLoading} = this.state;
    return (
      <MyView style={{flex: 1, backgroundColor: COLOR.BG.BLACK_10}}>
        <MyButton
          style={styles.containerToolbar}
          transparent
          onPress={this.onHideModal}
          activeOpacity={1}
        />
        <MyView style={styles.viewTitleModal}>
          <MyButton
            style={styles.viewTitle}
            onPress={this.onHideModal}
            activeOpacity={1}
            transparent>
            <MyText myFontStyle="Medium" style={{fontSize: MY_SIZE.s_18}}>
              Huỷ bỏ
            </MyText>
          </MyButton>
          <MyView style={styles.titleModal}>
            <MyText myFontStyle="Medium" style={{fontSize: MY_SIZE.s_18}}>
              Chọn Nhóm hàng
            </MyText>
          </MyView>
          <MyView transparent style={styles.viewTitle} />
        </MyView>
        {isLoading ? (
          <View style={{flex: 1, backgroundColor: 'white'}}>
            <ActivityIndicator />
          </View>
        ) : (
          <FlatList
            style={{backgroundColor: COLOR.BG.WHITE}}
            data={this.state.arrCategory}
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

const styles = StyleSheet.create({
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
    padding: MY_SIZE.s_16
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
