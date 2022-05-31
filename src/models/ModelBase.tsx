export interface IProvince {
  id?: number;
  code?: string;
  name?: string;
  providers?: Provider[] | District[] | Ward[];
}

export interface Provider {
  code: string;
  province_id: string;
  province_code: string;
}

export interface District {
  code: string;
  district_id: string;
  district_code: string;
}
export interface Ward {
  code: string;
  ward_id: string;
  ward_code: string;
}

export interface ICreatedBy {
  id?: number;
  name?: string;
}

export interface ICategoryOfProduct {
  id: number;
  name: string;
  slug: string;
}

export interface ISupplierOfProduct {
  id: number;
  name?: string;
  phone?: string;
}
export interface IStorePerson {
  id?: string | number;
  name?: string;
  phone?: string;
  address?: string;
  province?: IProvince;
  district?: IProvince;
  ward?: IProvince;
}
