import React, {PureComponent} from 'react';
import MenuContentStyle from './styles/MenuContent.style';
import {ScrollView} from 'react-native';
import MenuComponent from './components/MenuComponent';
import MenuLeftHeader from './components/MenuLeftHeader';
import {MyLoading, MyView} from 'bases/components';
import {ItemLineIndicatorCustom} from 'views/app/components/items';

interface IProps {}
interface AppState {
  isFirstLoading: boolean;
}

export default class MenuContent extends PureComponent<IProps, AppState> {
  state = {isFirstLoading: false};

  componentDidMount() {
    const cleanTimer = setTimeout(() => {
      this.setState({isFirstLoading: false}, () => {
        clearTimeout(cleanTimer);
      });
    }, 300);
  }

  render() {
    if (this.state.isFirstLoading) {
      return (
        <MyView style={MenuContentStyle.container}>
          <MyLoading />
        </MyView>
      );
    }
    return (
      <MyView style={MenuContentStyle.container}>
        <ItemLineIndicatorCustom />
        <ScrollView style={MenuContentStyle.content} showsVerticalScrollIndicator={false}>
          <MenuLeftHeader />
          <MenuComponent />
        </ScrollView>
      </MyView>
    );
  }
}
