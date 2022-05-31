import {MyButton, MyIcon, MyText, MyToolbarPrimary, MyView} from 'bases/components';
import {COLOR, MY_SIZE, setPadding} from 'bases/styles/Core';
// import {ResponseAPIModel} from 'models/ManagerSetting.Model';
import {
  IProductCreate
  //  ProductModel
} from 'models/Product.Model';
import React, {PureComponent} from 'react';
import {FlatList, TextInput} from 'react-native';
// import {ProductAPI} from 'services/Product.Api';
import MyNavigator from 'utils/MyNavigator';
import {importOrdStyles} from '../styles/ImportOrder.style';

interface ImportCreateProps {}

interface ImportCreateState {
  arrProducts: IProductCreate[];
  arrProductsAdd: IProductCreate[];
  keyword: string;
  isShowSearch: boolean;
}

export default class ImportCreateView extends PureComponent<ImportCreateProps, ImportCreateState> {
  constructor(props: ImportCreateProps) {
    super(props);
    this.state = {
      arrProducts: [],
      arrProductsAdd: [],
      keyword: '',
      isShowSearch: false
    };
  }

  searchProduct = (text: string) => {
    if (text.length === 0) {
      this.setState({
        isShowSearch: false,
        keyword: text
      });
    } else {
      this.setState(
        {
          isShowSearch: true,
          keyword: text
        },
        () => {
          this.getListProductByKeyword(text);
        }
      );
    }
  };

  getListProductByKeyword = async (_text: string) => {
    // const result: ResponseAPIModel<ProductModel[]> = await ProductAPI.getListProduct({
    //   keyword: text
    // });
    // if (result && !result.code) {
    //   Utilities.log(result.data);
    // }
  };

  render() {
    return (
      <MyView style={importOrdStyles.container}>
        <MyToolbarPrimary
          title={'Tạo phiếu nhập hàng'}
          isShowBtnLeft
          isShowBtnRight
          iconRightFontType={'Feather'}
          iconRightProps={{name: 'info', size: 20, color: COLOR.BG.BLACK}}
          iconLeftFontType={'AntDesign'}
          iconLeftProps={{name: 'close', size: 24, color: COLOR.BG.BLACK}}
          onPressLeft={() => MyNavigator.goBack()}
        />
        <MyView
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: COLOR.BG.SECONDARY,
            ...setPadding(0, 0, MY_SIZE.s_16, MY_SIZE.s_16)
          }}>
          <MyIcon iconFontType={'Ionicons'} name={'search'} size={20} color={COLOR.BG.BLACK} />
          <TextInput
            placeholder={'Chọn hàng nhập'}
            value={this.state.keyword}
            numberOfLines={1}
            style={{flex: 1}}
            onChangeText={text => this.searchProduct(text)}
          />
          <MyView
            style={{flexDirection: 'row', alignItems: 'center', backgroundColor: 'red', flex: 0.5}}
          />
        </MyView>
        <MyButton
          // onPress={() => Alert.alert('GG', 'EZ')}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)
          }}>
          <MyText>Chọn nhà cung cấp</MyText>
          <MyIcon name={'arrow-right'} iconFontType={'SimpleLineIcons'} size={20} />
        </MyButton>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          renderItem={() => {
            return null;
          }}
          ListEmptyComponent={() => {
            return (
              <MyView
                style={[
                  importOrdStyles.container,
                  {alignItems: 'center', justifyContent: 'center'}
                ]}>
                <MyText>Không có hàng hóa trong phiếu nhập kho</MyText>
              </MyView>
            );
          }}
          extraData={[]}
          data={[]}
        />
        {/* <Modal visible={this.state.isShowSearch} transparent>
          <FlatList
            data={this.state.arrProducts}
            extraData={this.state.arrProducts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={() => {
              return null;
            }}
          />
        </Modal> */}
      </MyView>
    );
  }
}
