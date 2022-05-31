export interface ILocation {
  id?: number;
  name?: string;
  code?: string;
  providers?: IProvider[];
  created_at?: number;
  updated_at?: number;
}

export interface IProvider {
  code?: string;
  province_id?: string;
  province_code?: string;
}
export interface ILocationDistrict {
  id?: number;
  name?: string;
  code?: string;
  providers?: IDistrict[];
  created_at?: number;
  updated_at?: number;
}

export interface IDistrict {
  code?: string;
  district_id?: string;
  district_code?: string;
}
export interface ILocationWard {
  id?: number;
  name?: string;
  code?: string;
  providers?: IWard[];
  created_at?: number;
  updated_at?: number;
}

export interface IWard {
  code?: string;
  ward_id?: string;
  ward_code?: string;
}
