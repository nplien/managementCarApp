import React, {PureComponent} from 'react';

import {MyView, MyText, MyLoading, MyButtonText} from 'bases/components';
import {productDetailStyle} from './styles/ProductDetail.style';
import {TabBar, TabView} from 'react-native-tab-view';
import {COLOR, setRadius} from 'bases/styles/Core';
import TabThongTin from './components/tabThongTin/TabThongTin';
import TabTonKho from './components/tabTonKho/TabTonKho';
import {ProductModel, ProductOptionsModel} from 'models/Product.Model';
import {IAppNavigateProps} from 'views/app';

type IProps = IAppNavigateProps<'ProductDetail'>;

interface IStates {
  index: number;
  isFirstLoading: boolean;
  isError: boolean;

  productCha?: ProductModel;
  productCon?: ProductOptionsModel;
}

class ProductDetail extends PureComponent<IProps, IStates> {
  routes: any = [{key: 'Thông tin'}, {key: 'Tồn kho'}];

  state: IStates = {
    index: 0,
    isFirstLoading: true,
    isError: false,
    productCha: undefined,
    productCon: undefined
  };

  setIndex = (index: number) => {
    this.setState({index});
  };

  renderLabel = ({route, color}: {route: any; color: string}) => {
    return (
      <MyText myFontStyle="Bold" style={{color}}>
        {route.key}
      </MyText>
    );
  };

  renderTabBar = (props: any) => {
    return (
      <TabBar
        {...props}
        scrollEnabled={false}
        activeColor={COLOR.TEXT.PRIMARY}
        inactiveColor={COLOR.TEXT.SECONDARY}
        style={{backgroundColor: COLOR.BG.WHITE, ...setRadius(0, 0, 16, 16)}}
        renderLabel={this.renderLabel}
        indicatorStyle={{
          backgroundColor: COLOR.TEXT.BLUE
        }}
      />
    );
  };

  renderScene = ({route}: {route: any}) => {
    switch (route.key) {
      case 'Thông tin': {
        return (
          <TabThongTin productCha={this.state.productCha} productCon={this.state.productCon} />
        );
      }
      case 'Tồn kho': {
        return <TabTonKho productCha={this.state.productCha} productCon={this.state.productCon} />;
      }
    }
  };

  componentDidMount() {
    // ProductAPI.getDetailProduct(this.props.route.params.idCha)
    //   .then(response => {
    //     if (response.code) {
    //       Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
    //       this.setState({
    //         isFirstLoading: false,
    //         isError: true
    //       });
    //     } else {
    //       if (response.data) {
    //         const productCon = response.data.products?.find(
    //           x => x.id === this.props.route.params.idCon
    //         );
    //         this.setState({
    //           isFirstLoading: false,
    //           productCha: response.data,
    //           productCon
    //         });
    //       } else {
    //         Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
    //         this.setState({
    //           isFirstLoading: false,
    //           isError: true
    //         });
    //       }
    //     }
    //   })
    //   .catch(() => {
    //     Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
    //     this.setState({
    //       isFirstLoading: false,
    //       isError: true
    //     });
    //   });
    this.setState({
      productCha: this.props.route.params.itemProduct,
      isFirstLoading: false
    });
  }

  render() {
    const {isFirstLoading, isError} = this.state;
    if (isFirstLoading) {
      return (
        <MyView transparent style={productDetailStyle.emptyCustomer}>
          <MyLoading />
        </MyView>
      );
    }
    if (isError) {
      return (
        <MyView transparent style={productDetailStyle.emptyCustomer}>
          <MyButtonText
            onPress={() => this.componentDidMount()}
            title="Tải lại"
            style={productDetailStyle.BtnEmpty}
          />
        </MyView>
      );
    }

    const {index} = this.state;
    const routes = this.routes;

    return (
      <MyView style={productDetailStyle.container}>
        <TabView
          lazy={true}
          navigationState={{index, routes}}
          onIndexChange={this.setIndex}
          renderTabBar={this.renderTabBar}
          renderScene={this.renderScene}
        />
      </MyView>
    );
  }
}

export default ProductDetail;
