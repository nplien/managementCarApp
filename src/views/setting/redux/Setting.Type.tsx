import vi from 'translations/vi.json';

export type ISettingState = {
  translation: typeof vi;
};

export interface ISettingAction {
  type: string;
  payload: {
    iso?: 'vi' | 'en';
  };
}
