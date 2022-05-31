import {MyView} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import {TYPE_MODAL} from 'common/Constants';
import React, {useEffect} from 'react';
import {BackHandler, StyleSheet} from 'react-native';
import {IAppNavigateProps} from 'views/app';
import BaoTriComponent from './BaoTriComponent';
import SupportOSComponent from './SupportOSComponent';
import UpdateAppComponent from './UpdateAppComponent';

type IProps = IAppNavigateProps<'MyCheckAppModal'>;

const MyCheckAppModal = (props: IProps) => {
  useEffect(() => {
    const handleGoBack = () => {
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleGoBack);

    return () => {
      backHandler.remove();
    };
  }, []);

  let componentsModal = null;

  switch (props.route?.params?.nameConfig) {
    case TYPE_MODAL.BAO_TRI:
      componentsModal = <BaoTriComponent content={props.route.params.content || ''} />;
      break;
    case TYPE_MODAL.SUPPORT_OS:
      componentsModal = <SupportOSComponent content={props.route.params.content || ''} />;
      break;
    case TYPE_MODAL.UPADTE_APP:
      componentsModal = (
        <UpdateAppComponent
          url_app={props.route.params.url_app || ''}
          content={props.route.params.content || ''}
          is_required={props.route.params.is_required || false}
        />
      );
      break;
    case TYPE_MODAL.CODE_PUSH:
      break;
    default:
      break;
  }
  return <MyView style={styles.container}>{componentsModal}</MyView>;
};

export default MyCheckAppModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.BG.BLACK_30,
    justifyContent: 'center'
  }
});
