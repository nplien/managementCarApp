import remoteConfig from '@react-native-firebase/remote-config';
import {TYPE_MODAL} from 'common/Constants';
import {MODE_REMOTE_CONFIG_FCM} from 'env';
import MyNavigator from './MyNavigator';
import Utilities from './Utilities';

const checkVersion = (arrVersionCurrent: any, arrVersionServer: any) => {
  let ok = false;
  if (Number(arrVersionCurrent[0]) < Number(arrVersionServer[0])) {
    ok = true;
  } else if (
    Number(arrVersionCurrent[0]) === Number(arrVersionServer[0]) &&
    Number(arrVersionCurrent[1]) < Number(arrVersionServer[1])
  ) {
    ok = true;
  } else if (
    Number(arrVersionCurrent[0]) === Number(arrVersionServer[0]) &&
    Number(arrVersionCurrent[1]) === Number(arrVersionServer[1]) &&
    Number(arrVersionCurrent[2]) < Number(arrVersionServer[2])
  ) {
    ok = true;
  } else {
    ok = false;
  }
  return ok;
};
const checkRemoteConfig = (isCheckCodePush: boolean) => {
  try {
    const remoteData = remoteConfig().getValue(MODE_REMOTE_CONFIG_FCM).asString();
    if (__DEV__) console.log(remoteData);
    const parameters = remoteData ? JSON.parse(remoteData) : {};
    /* quy tắc check: maintain > support os > update app */

    let maintenance_content = '';
    let support_os_content = '';
    let update_content = '';
    let linkApp = '';

    let arrVersionOnServerMaintance = ['1', '0', '0']; // version check bao tri;
    let arrVersionUpdateOnServer = ['1', '0', '0']; // version check update app;
    let arrOSVersionSupportServer = ['1', '0', '0']; // version support os;

    const isAndroid = Utilities.isAndroid();

    const maintance_parse = parameters.maintance;
    const support_os_parse = parameters.support_os;
    const update_app_parse = parameters.update_app;
    // const home_popup_parse = JSON.parse(parameters.home_popup);

    const is_require = update_app_parse.is_require || false;
    if (isAndroid) {
      maintenance_content = maintance_parse.android_content;
      support_os_content = support_os_parse.android_content;
      update_content = update_app_parse.android_content;
      linkApp = update_app_parse.android_url;
      arrVersionOnServerMaintance = String(maintance_parse.android_version).split('.');
      arrOSVersionSupportServer = String(support_os_parse.android_version).split('.');
      arrVersionUpdateOnServer = String(update_app_parse.android_version).split('.');
    } else {
      maintenance_content = maintance_parse.ios_content;
      support_os_content = support_os_parse.ios_content;
      update_content = update_app_parse.ios_content;
      linkApp = update_app_parse.ios_url;
      arrVersionOnServerMaintance = String(maintance_parse.ios_version).split('.');
      arrOSVersionSupportServer = String(support_os_parse.ios_version).split('.');
      arrVersionUpdateOnServer = String(update_app_parse.ios_version).split('.');
    }

    // an loading khi check upadte from tab MenuContent
    if (isCheckCodePush) {
      Utilities.showHideRootLoading(false);
    }

    /* check maintance */
    if (checkVersion('', arrVersionOnServerMaintance)) {
      // BaoTriModalRef?.current?.isShowModal(maintenance_content);
      MyNavigator.pushModal('MyCheckAppModal', {
        nameConfig: TYPE_MODAL.BAO_TRI,
        content: maintenance_content
      });
      return;
    }

    /* check support os */
    if (checkVersion('', arrOSVersionSupportServer)) {
      MyNavigator.pushModal('MyCheckAppModal', {
        nameConfig: TYPE_MODAL.SUPPORT_OS,
        content: support_os_content
      });
      return;
    }

    /* check update app */
    if (checkVersion('', arrVersionUpdateOnServer)) {
      MyNavigator.pushModal('MyCheckAppModal', {
        nameConfig: TYPE_MODAL.UPADTE_APP,
        url_app: linkApp,
        content: update_content,
        is_required: is_require
      });
      return;
    }

    /* check CodePush */
    if (isCheckCodePush) {
      MyNavigator.pushModal('MyCheckAppModal', {
        nameConfig: TYPE_MODAL.CODE_PUSH
      });
    } else {
    }
  } catch (error) {
    Utilities.showHideRootLoading(false);
  }
};

remoteConfig().setDefaults({
  dev: '',
  live: ''
});

export const remoteConfigFcm = async (isCheckCodePush?: boolean) => {
  await remoteConfig().fetch(isCheckCodePush ? 0 : 1 * 60 * 60);
  remoteConfig()
    .fetchAndActivate()
    .then(isChange => {
      if (__DEV__) console.log(`Remote Config Change = ${isChange}`);
      checkRemoteConfig(isCheckCodePush || false);
    });
};
