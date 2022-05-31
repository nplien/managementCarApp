import React, {Component} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import store from 'views/app';
import {SafeAreaView} from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';
import RootLoading from 'bases/components/loading/RootLoading';
import Router from 'views/router/Router';
import {COLOR} from 'bases/styles/Core';
import {enableScreens} from 'react-native-screens';
enableScreens();
// import {investigate} from 'react-native-bundle-splitter/dist/utils';
import Utilities from 'utils/Utilities';

// Utilities.log(investigate());
export default class App extends Component {
  BaoTriModalRef: any = React.createRef();

  SupportOSModalRef: any = React.createRef();

  UpdateAppModalRef: any = React.createRef();

  render() {
    return (
      <Provider store={store}>
        <SafeAreaView style={styles.container} edges={['left', 'right']}>
          <StatusBar
            backgroundColor={COLOR.BG.BLACK}
            barStyle={Utilities.isAndroid() ? 'light-content' : 'dark-content'}
          />
          <Router />
          <FlashMessage position="top" />
          <RootLoading />
        </SafeAreaView>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
