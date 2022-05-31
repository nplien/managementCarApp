import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SvgCss} from 'react-native-svg';
import MyStaticLocal from 'utils/MyStaticLocal';
import tw from 'utils/tailwind';
import Utilities from 'utils/Utilities';
export default class Toolbar extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={tw.style('justify-center flex-row items-center px-10px py-8px')}>
          <SvgCss xml={Utilities.getImageLogo(32, 32)} />
          <Text style={styles.text}>Phương Liên</Text>
          <Text style={styles.textVersion}>{MyStaticLocal.VERSION_APP}</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  content: {
    paddingHorizontal: 10,
    paddingVertical: Utilities.isAndroid() ? 8 : 4,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 16
  },
  text: {
    flex: 1,
    fontWeight: 'bold',
    marginHorizontal: 10
  },
  textVersion: {
    fontSize: 10
  }
});
