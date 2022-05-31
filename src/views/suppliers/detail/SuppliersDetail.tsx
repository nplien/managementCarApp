import * as React from 'react';
import {TabView, TabBar} from 'react-native-tab-view';

import {MyView, MyText} from 'bases/components';
import {SuppliersDetailStyle} from './style/SuppliersDetail.Style';
import InfoSupplier from './components/InfoSupplier';
import SupplierHistory from './components/SupplierHistory';
import {COLOR} from 'bases/styles/Core';
import {IAppNavigateProps} from 'views/app';

type IProps = IAppNavigateProps<'SuppliersDetail'>;
export default class SuppliersDetail extends React.Component<IProps, any> {
  state = {
    index: 0,
    routes: [{key: 'Thông tin'}, {key: 'Lịch sử'}]
  };
  _handleIndexChange = (index: number) => this.setState({index});

  renderLabel = ({route, color}: {route: any; color: string}) => {
    return (
      <MyText myFontStyle="Bold" style={{color}}>
        {route.key}
      </MyText>
    );
  };

  _renderTabBar = (props: any) => {
    return (
      <TabBar
        {...props}
        scrollEnabled={false}
        activeColor={COLOR.TEXT.PRIMARY}
        inactiveColor={COLOR.TEXT.SECONDARY}
        style={{backgroundColor: COLOR.BG.WHITE}}
        renderLabel={this.renderLabel}
        indicatorStyle={{
          backgroundColor: COLOR.TEXT.BLUE
        }}
      />
    );
  };

  renderScene = ({route}: any) => {
    switch (route.key) {
      case 'Thông tin': {
        return (
          <InfoSupplier
            id={this.props.route?.params?.idCustomer}
            navigation={this.props.navigation}
          />
        );
      }
      case 'Lịch sử': {
        return <SupplierHistory id={this.props.route?.params?.idCustomer} />;
      }

      default: {
        return null;
      }
    }
  };

  render() {
    return (
      <MyView style={SuppliersDetailStyle.container}>
        <TabView
          navigationState={this.state}
          renderScene={this.renderScene}
          renderTabBar={this._renderTabBar}
          onIndexChange={this._handleIndexChange}
          lazy={true}
          tabBarPosition="top"
        />
      </MyView>
    );
  }
}
