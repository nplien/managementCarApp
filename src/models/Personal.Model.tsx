import {ICreatedBy, IStorePerson} from './ModelBase';

export interface PermissionModel {
  id: string;
  name: string;
  created_at: number;
  updated_at: number;
}

export interface PersonalModel {
  id?: string;
  type?: string;
  name?: string;
  note?: string;
  phone?: string;
  email?: string;
  avatar?: string;
  cover?: string | null;
  birthday?: number | null;
  gender?: string | null;
  role?: ICreatedBy;
  stores?: IStorePerson[];
  permissions?: PermissionModel[];
  country?: string | null;
  province_code?: string | null;
  district_code?: string | null;
  ward_code?: string | null;
  address?: string | null;
  total_debt?: number;
  total_price?: number;
  total_point?: number;
  total_purchase?: number;
  last_purchase?: null;
  status?: string | null;
  created_at?: number | null;
  updated_at?: number | null;
  created_by?: ICreatedBy;
}
export interface ITokenModel {
  access_token: string;
  refresh_token: string;
  access_expired_at: number;
  refresh_expired_at: number;
  type: string;
}

export interface IDataLogin {
  token: ITokenModel;
  user: PersonalModel;
}
