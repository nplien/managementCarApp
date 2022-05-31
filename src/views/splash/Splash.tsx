import AsyncStorage from '@react-native-async-storage/async-storage';
import {MyView} from 'bases/components';
import {ADDRESS_STORE_CHOOSE, USER_DATA, USER_TOKEN} from 'common/KeyStorages';
import {ITokenModel, PersonalModel} from 'models/Personal.Model';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MyNavigator from 'utils/MyNavigator';
import MyStaticLocal from 'utils/MyStaticLocal';
import {chooseStore} from 'views/menuLeft/redux';
import Utilities from 'utils/Utilities';
import {StyleSheet} from 'react-native';
import {getInfo, initUser} from 'views/personals/redux';
import FastImage from 'react-native-fast-image';
import {IStorePerson} from 'models/ModelBase';
import {PING_DOMAIN} from 'env';
import {changeChiNhanhDashBoard} from 'views/dashboard/redux';
import tw from 'utils/tailwind';

interface IProps {
  changeChiNhanhDashBoard: typeof changeChiNhanhDashBoard;
  chooseStore: typeof chooseStore;
  getInfo: typeof getInfo;
  initUser: typeof initUser;
}
interface IState {
  isUpdate: boolean;
  progress: number;
}
class Splash extends Component<IProps, IState> {
  syncMessage: string;

  constructor(props: IProps) {
    super(props);
    this.syncMessage = '';
    this.state = {
      isUpdate: false,
      progress: 0
    };
  }

  componentDidMount() {
    fetch(PING_DOMAIN)
      .then(e => {
        if (e.ok && e.status === 200) {
          this.getDataAndGoMain();
        } else {
          Utilities.showToast(
            'Mất kết nối mạng',
            'Không có kết nối mạng hoặc mạng không ổn định. Vui lòng kiểm tra đường truyền mạng',
            'default',
            3000
          );
        }
      })
      .catch(() => {
        Utilities.showToast(
          'Mất kết nối mạng',
          'Không có kết nối mạng hoặc mạng không ổn định. Vui lòng kiểm tra đường truyền mạng',
          'default',
          3000
        );
      });
  }

  getDataAndGoMain = () => {
    AsyncStorage.multiGet([USER_DATA, USER_TOKEN, ADDRESS_STORE_CHOOSE])
      .then((result: any) => {
        let userLocal: PersonalModel = result[0][1] ? JSON.parse(result[0][1]) : undefined;
        let userToken: ITokenModel = result[1][1] ? JSON.parse(result[1][1]) : undefined;
        let currentStore: IStorePerson = result[2][1] ? JSON.parse(result[2][1]) : undefined;
        if (userLocal && userToken) {
          MyStaticLocal.USER_ID = userLocal?.id || undefined;
          MyStaticLocal.USER_TOKEN = userToken || undefined;

          // check time token
          const now = Date.now();
          const access = MyStaticLocal.USER_TOKEN.access_expired_at * 1000;
          if (access - now > 0) {
            this.props.initUser(userLocal);
            this.props.getInfo();
            if (currentStore) {
              this.props.changeChiNhanhDashBoard([currentStore]);
              this.props.chooseStore(currentStore);
            } else {
              this.props.chooseStore(userLocal.stores?.length ? userLocal.stores[0] : undefined);
            }
            MyNavigator.reset('Home');
          } else {
            Utilities.showToast('Thông báo', 'Phiên đăng nhập đã hết hạn', 'warning');
            MyNavigator.reset('Login');
          }
        } else {
          MyNavigator.reset('Login');
        }
      })
      .catch(() => {
        MyNavigator.reset('Login');
      });
  };

  render() {
    return (
      <MyView style={styles.container}>
        <FastImage
          source={{
            uri: 'https://i.pinimg.com/564x/58/15/11/581511ca9466c3a9d05e953ea4840249.jpg'
          }}
          style={tw.style('w-full h-full')}
        />
      </MyView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1
  },
  content: {
    alignContent: 'center'
  },
  text: {
    textAlign: 'center',
    paddingTop: 32,
    paddingBottom: 16
  }
});

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      changeChiNhanhDashBoard,
      chooseStore,
      initUser,
      getInfo
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(Splash);
