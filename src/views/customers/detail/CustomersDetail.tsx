import * as React from 'react';
import {TabView, TabBar} from 'react-native-tab-view';
import {MyView, MyText} from 'bases/components';
import CustomersHistory from './components/CustomersHistory';
import {CustomersDetailStyle} from './style/CustomersDetail.Style';
import CustomersAddress from './components/CustomersAddress';
import InfoCustomer from './components/InfoCustomer';
import {COLOR} from 'bases/styles/Core';
import {IAppNavigateProps} from 'views/app';

type IProps = IAppNavigateProps<'CustomersDetail'>;
export default class CustomersDetail extends React.Component<IProps, any> {
  state = {
    index: 0,
    routes: [
      {key: 'Thông tin', title: 'Thông tin'},
      {key: 'Địa chỉ', title: 'Địa chỉ'},
      {key: 'Lịch sử', title: 'Lịch sử'}
    ]
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
          <InfoCustomer
            id={String(this.props.route?.params?.idCustomer)}
            navigation={this.props.navigation}
          />
        );
      }
      case 'Địa chỉ': {
        return <CustomersAddress id={String(this.props.route?.params?.idCustomer)} />;
      }
      case 'Lịch sử': {
        return <CustomersHistory id={String(this.props.route?.params?.idCustomer)} />;
      }

      default: {
        return null;
      }
    }
  };

  render() {
    return (
      <MyView style={CustomersDetailStyle.container}>
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
