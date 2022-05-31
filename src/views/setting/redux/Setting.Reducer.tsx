import vi from 'translations/vi.json';
import en from 'translations/en.json';

import {ISettingState, ISettingAction} from './Setting.Type';

export const SETTING_ACTION = {
  CHANGE_LANGUAGE: 'DINGTEA/CHANGE/LANGUAGE'
};

export function changeLanguage(iso: 'vi' | 'en') {
  return {
    type: SETTING_ACTION.CHANGE_LANGUAGE,
    payload: {
      iso
    }
  };
}

const SettingReducer = (
  state: ISettingState = {translation: vi},
  action: ISettingAction
): ISettingState => {
  switch (action.type) {
    case SETTING_ACTION.CHANGE_LANGUAGE:
      if (action.payload.iso) {
        if (action.payload.iso === 'vi') {
          return {...state, translation: vi};
        }
        return {...state, translation: en};
      }
      return {...state, translation: vi};

    default:
      return state;
  }
};

export default SettingReducer;
