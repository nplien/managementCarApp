import {ICreatedBy} from './ModelBase';

export interface IBrands {
  id: string;
  name: string;
  note: string;
  logo: string | null;
  banner_url: string | null;
  meta_url: string | null;
  meta_title: string;
  meta_image: string | null;
  meta_content: string;
  is_active: boolean;
  created_by: ICreatedBy;
  created_at: number | null;
  updated_at: number | null;
}
export interface IBrandsModel {
  id?: string;
  name?: string;
  email?: null;
  address?: string;
  description?: null;
  logo?: null;
  phone?: string;
  status?: 'active' | 'inactive';
  updated_at?: number;
  created_at?: number;
  created_by?: ICreatedBy;
  province_code?: string;
  district_code?: string;
  ward_code?: string;
  province?: string;
  district?: string;
  ward?: string;
}
export interface IRequestCate {
  skip?: number;
  limit?: number;
  nested?: boolean;
  keyword?: string;
}
