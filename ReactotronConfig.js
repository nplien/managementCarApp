import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeModules } from 'react-native';
import Reactotron from 'reactotron-react-native';

let scriptHostname;
if (__DEV__) {
    const { scriptURL } = NativeModules.SourceCode;
    scriptHostname = scriptURL.split('://')[1].split(':')[0];
}

Reactotron.setAsyncStorageHandler(AsyncStorage)
    .configure({
        name: 'Management Car',
        host: scriptHostname
    })
    .useReactNative({
        editor: false,
        errors: { veto: () => false },
        overlay: false
    })
    .connect();