import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {IStorePerson} from 'models/ModelBase';
import {RootParamsList} from 'views/router/type';

export interface IAppState {
  isFirstLoading?: boolean;
  isRefresh?: boolean;
}
export interface IAppAction<T> {
  type: string;
  payload?: T;
}

export interface IPropsNavigate<T> {
  route?: {
    key: string;
    name: string;
    params?: T;
  };
}
export type DATE_CODE =
  | 'TOAN_THOI_GIAN'
  | 'HOM_NAY'
  | 'HOM_QUA'
  | 'TUAN_NAY'
  | '7_NGAY_QUA'
  | 'TUAN_TRUOC'
  | 'THANG_NAY'
  | 'THANG_TRUOC'
  | 'NAM_NAY'
  | 'NAM_TRUOC'
  | 'TUY_CHON';

export type TIME_TYPE = '' | 'hour' | 'day' | 'month' | 'quarter' | 'year';

export type IDateFilterType = {
  id: DATE_CODE;
  type: TIME_TYPE;
  name?: string;
  // rawValue?: (date_code: DATE_CODE) => IDateRange;
};

export type ISortFilterType = {
  sort_by: 'name' | 'created_at' | 'price_type' | 'created_at_day';
  order_by: 'asc' | 'desc';
  name: string;
};

export interface IDateRange {
  dateFrom?: string;
  dateTo?: string;
}
export interface IThoiGianLocState {
  thoiGianLoc: IDateFilterType;
  khoangThoiGian: IDateRange;
}

export interface IChonChiNhanhState {
  arrChiNhanh: IStorePerson[];
}

type MyNavigationProp<ScreenName extends keyof RootParamsList> = CompositeScreenProps<
  StackScreenProps<RootParamsList, ScreenName>,
  BottomTabScreenProps<RootParamsList, ScreenName>
>;
export type IAppNavigateProps<ScreenName extends keyof RootParamsList> =
  MyNavigationProp<ScreenName> & {
    route: MyNavigationProp<ScreenName>['route'] & {
      params?: RootParamsList[ScreenName];
    };
    navigation: MyNavigationProp<ScreenName>['navigation'];
  };
export interface IPropsButtonSheet {
  title?: string;
  onPress?: () => void;
  isActive?: boolean;
}
