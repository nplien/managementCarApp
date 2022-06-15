import {MyButtonText, MyInput, MyText, MyView} from 'bases/components';
import {ADDRESS_STORE_CHOOSE, USER_DATA, USER_TOKEN} from 'common/KeyStorages';
import React, {createRef, PureComponent} from 'react';
import {KeyboardAvoidingView, ScrollView} from 'react-native';
import {SvgCss} from 'react-native-svg';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PersonalAPI} from 'services/Personal.API';
import MyNavigator from 'utils/MyNavigator';
import MyStaticLocal from 'utils/MyStaticLocal';
import Utilities from 'utils/Utilities';
import {loginStyle} from './style/Login.Style';
import {SafeAreaView} from 'react-native-safe-area-context';
import {chooseStore} from 'views/menuLeft/redux';
import {IDataLogin} from 'models/Personal.Model';
import {getInfo, initUser} from 'views/personals/redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StoersFake } from 'views/personals/redux/StoresData';

interface IProps {
  chooseStore: typeof chooseStore;
  getInfo: typeof getInfo;
  initUser: typeof initUser;
}

class Login extends PureComponent<IProps> {
  phone: string = '';
  password: string = '';
  inputPhoneRef: any = createRef();
  inputPasswordRef: any = createRef();
  versionOfCodepush: string = '';

  componentDidMount() {
    MyStaticLocal.USER_ID = undefined;
    MyStaticLocal.USER_TOKEN = undefined;
    AsyncStorage.clear();
  }

  handleToLogin = () => {
    try {
      if (__DEV__) {
        this.phone = '0987654321';
        this.password = 'Ab123456a@';
      }
      Utilities.showHideRootLoading(true);
      PersonalAPI.login(this.phone, this.password)
        .then((res: any) => {
          if (res?.code) {
            Utilities.showHideRootLoading(false);
            Utilities.showToast('Đăng nhập thất bại', '', 'danger');
          } else {
            this.handleSaveDate(res.data);
          }
        })
        .catch(error => {
          Utilities.logException('Login - onConfirm: ', error);
          Utilities.showHideRootLoading(false);
          Utilities.showToast('Đăng nhập thất bại', '', 'danger');
        });
    } catch (error) {
      Utilities.showHideRootLoading(false);
      Utilities.logException('Login', error);
    }
  };

  handleSaveDate = (data: IDataLogin) => {
    if (data) {
      Utilities.showHideRootLoading(false);
      if (data.user.stores && data.user.stores.length > 0) {
        MyStaticLocal.USER_ID = data.user.id;
        MyStaticLocal.USER_TOKEN = data.token;
        this.props.initUser(data.user);
        this.props.chooseStore(StoersFake[0]);
        AsyncStorage.multiSet([
          [USER_DATA, JSON.stringify(data.user)],
          [USER_TOKEN, JSON.stringify(data.token)],
          [ADDRESS_STORE_CHOOSE, JSON.stringify(StoersFake[0])]
        ]);
        MyNavigator.reset('Home');
      } else {
        Utilities.showToast(
          'Đăng nhập thất bại',
          'Tài khoản của bạn chưa trực thuộc cửa hàng nào, vui lòng liên hệ admin để sử dụng',
          'warning',
          10000
        );
      }
    } else {
      Utilities.showHideRootLoading(false);
      Utilities.showToast('Đăng nhập thất bại', '', 'danger');
    }
  };

  render() {
    return (
      <SafeAreaView edges={['top', 'bottom']} style={loginStyle.container}>
        <KeyboardAvoidingView
          style={loginStyle.container}
          behavior={Utilities.isAndroid() ? undefined : 'padding'}>
          <ScrollView
            style={loginStyle.container}
            contentContainerStyle={loginStyle.contentScroll}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps={'handled'}>
            <MyView style={loginStyle.viewcontroll} transparent>
              <SvgCss xml={Utilities.getImageLogo(168, 104)} style={loginStyle.iconSvg} />
              <MyInput
                inputRef={this.inputPhoneRef}
                placeholder={'Tên đăng nhập'}
                containerStyle={loginStyle.input}
                returnKeyType="next"
                onSubmitEditing={() => {
                  this.inputPasswordRef.current.focus();
                }}
                onChangeText={text => (this.phone = text)}
              />
              <MyInput
                inputRef={this.inputPasswordRef}
                placeholder={'Mật khẩu'}
                containerStyle={loginStyle.input}
                returnKeyType="done"
                onSubmitEditing={this.handleToLogin}
                onChangeText={text => (this.password = text)}
                secureTextEntry
              />
              <MyButtonText
                style={loginStyle.btnLogin}
                title="Đăng nhập"
                onPress={this.handleToLogin}
              />
              <MyText style={{marginVertical: 16, textAlign: 'center'}}>
                {MyStaticLocal.VERSION_APP}
              </MyText>
            </MyView>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      chooseStore,
      initUser,
      getInfo
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(Login);
