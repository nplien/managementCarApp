/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import {IBangGiaModel} from 'models/BangGia.Model';
import {CustomerModel} from 'models/Customer.Model';
import {IStorePerson} from 'models/ModelBase';

export const IMAGE_SIZE = {
  REAL: '.',
  MAX: '-600x600',
  EPIC: '-500x500',
  HIGH: '-400x400',
  MEDIUM: '-300x300',
  LOW: '-200x200',
  MIN: '-100x100',
};

export const TIMEOUT = {
  MAX: 86400000, // 1 day => milliseconds
  MIN: 3600000, // 1 hour => milliseconds
};

export const PRICE_MASK = {
  INPUT: {
    VND: {
      precision: 0,
      separator: ' ',
      delimiter: ',',
      unit: '₫ ',
      suffixUnit: '',
    },
    USD: {
      precision: 2,
      separator: ',',
      delimiter: '.',
      unit: '$ ',
      suffixUnit: '',
    },
    HIDE: {
      precision: 0,
      separator: ' ',
      delimiter: ',',
      unit: '',
      suffixUnit: '',
    },
  },
  VND: {
    precision: 0,
    separator: ' ',
    delimiter: ',',
    unit: '',
    suffixUnit: '₫',
  },
  USD: {
    precision: 2,
    separator: ',',
    delimiter: '.',
    unit: '$ ',
    suffixUnit: '',
  },
  HIDE: {
    precision: 0,
    separator: ' ',
    delimiter: ',',
    unit: '',
    suffixUnit: '',
  },
};

export enum KIND_OF_SCREEN {
  INVOICE = 'invoice',
  ORDER = 'order',
  IMPORT = 'import',
  EXPORT = 'export',
  DELIVERY = 'delivery',
  PAYMENT = 'payment',
  VOUCHER = 'voucher',
  BRAND = 'brand',
}

export enum STATUS_INVENTORY_TYPE {
  CHECKING = 'checking',
  COMPLETED = 'confirmed',
  CANCELLED = 'cancelled',
}
export const KEY_INVENTORY = [
  {key: STATUS_INVENTORY_TYPE.COMPLETED, name: 'Đã kiểm kho'},
  {key: STATUS_INVENTORY_TYPE.CANCELLED, name: 'Đã hủy phiếu'},
];

export const TYPE_MESSAGE_RESPONSE = [
  {
    id: 'password_incorrect',
    value: 'Mật khẩu cũ không chính xác',
  },
  {
    id: 'update_success',
    value: 'Cập nhật thành công',
  },
];

export enum CODE_LIST_GENDER {
  FEMALE = 'female',
  MALE = 'male',
}

export const LIST_GENDER = [
  {
    code: CODE_LIST_GENDER.FEMALE,
    name: 'Nữ',
  },
  {
    code: CODE_LIST_GENDER.MALE,
    name: 'Nam',
  },
];
export enum CODE_LIST_TYPES {
  INDIVIDUAL = 'individual',
  COMPANY = 'company',
  WHOLESALE = 'whosale',
}
export const LIST_TYPES = [
  {
    code: CODE_LIST_TYPES.INDIVIDUAL,
    name: 'Cá Nhân',
  },
  {
    code: CODE_LIST_TYPES.COMPANY,
    name: 'Công Ty',
  },
  {
    code: CODE_LIST_TYPES.WHOLESALE,
    name: 'Khách buôn',
  },
];

export enum LOCATION {
  CITY = 'Thành phố',
  DISTRICT = 'Quận/Huyện',
  WARD = 'Phường/xã',
}

export const CONFIG_PRICE_SHOW = {
  CUSTOMER: [
    {
      id: 'total_price',
      name: 'Tổng bán',
    },
    {
      id: 'total_debt',
      name: 'Nợ cần thu',
    },
  ],
  NCC: [
    {
      id: 'price',
      name: 'Giá bán',
    },
    {
      id: 'original_price',
      name: 'Giá vốn',
    },
  ],
  HANG_HOA: [
    {
      id: 'price',
      name: 'Giá bán',
    },
    {
      id: 'original_price',
      name: 'Giá vốn',
    },
  ],
};

export const STORE_DEFAULT: IStorePerson = {
  id: 1,
  name: 'Coco Online',
  phone: '0988888290',
  address: 'Coco online',
  province: {code: '201', name: 'Hà Nội'},
  district: {code: '1486', name: 'Quận Đống Đa'},
  ward: {code: '1A0405', name: 'Phường Kim Liên'},
};

export const BANG_GIA_CHUNG: Readonly<IBangGiaModel> = {
  id: 1000,
  name: 'Bảng giá chung',
};

export const KHACH_LE: Readonly<CustomerModel> = {
  id: 0,
  name: 'Khách lẻ',
  phone: '0987654321',
};

export const KHACH_TAT_CA: Readonly<CustomerModel> = {
  id: 1,
  name: 'Tất cả',
};

export const SCREEN_PRODUCT_TYPE = {
  BAN_HANG: 'BAN_HANG',
  HANG_HOA: 'HANG_HOA',
  XUAT_HANG: 'XUAT_HANG',
  NHAP_HANG: 'NHAP_HANG',
};
export enum ID_LIST_OPERATION {
  LON_HON = 'lon_hon',
  LON_HON_BANG = 'lon_hon_bang',
  NHO_HON = 'nho_hon',
  NHO_HON_BANG = 'nho_hon_bang',
  BANG = 'bang',
}
export const LIST_OPERATION = [
  {id: ID_LIST_OPERATION.LON_HON, name: '>'},
  {id: ID_LIST_OPERATION.LON_HON_BANG, name: '>='},
  {id: ID_LIST_OPERATION.NHO_HON, name: '<'},
  {id: ID_LIST_OPERATION.NHO_HON_BANG, name: '<='},
  {id: ID_LIST_OPERATION.BANG, name: '='},
];
export enum ID_LIST_FIELDS {
  TOTAL_PRICE = 'total_price',
  TOTAL_ORDER = 'total_order',
  CREATED_AT = 'created_at',
  GENDER_FEMALE = 'gender_female',
  GENDER_MALE = 'gender_male',
  TYPE_INDIVIDUAL = 'type_individual',
  TYPE_COMPANY = 'type_company',
}
export const LIST_FIELDS = [
  {
    id: ID_LIST_FIELDS.TOTAL_PRICE,
    name: 'Tổng bán (trừ trả hàng)',
    isShowInput: true,
  },
  {id: ID_LIST_FIELDS.TOTAL_ORDER, name: 'Tổng bán', isShowInput: true},
  {id: ID_LIST_FIELDS.CREATED_AT, name: 'Thời gian', isShowInput: true},
  {id: ID_LIST_FIELDS.GENDER_FEMALE, name: 'Giới tính: Nữ', isShowInput: false},
  {id: ID_LIST_FIELDS.GENDER_MALE, name: 'Giới tính: Nam', isShowInput: false},
  {
    id: ID_LIST_FIELDS.TYPE_INDIVIDUAL,
    name: 'Loại khách: Cá nhân',
    isShowInput: false,
  },
  {
    id: ID_LIST_FIELDS.TYPE_COMPANY,
    name: 'Loại khách: Doanh nghiệp',
    isShowInput: false,
  },
];

export enum ID_VIEW_LOI_NHUAN {
  PROFIT = 'profit',
  REVENUE = 'revenue',
  COST_PRICE = 'cost_price',
}

export const VIEW_LOI_NHUAN = [
  {id: ID_VIEW_LOI_NHUAN.PROFIT, name: 'Lợi nhuận', color: '#2595cd'},
  {id: ID_VIEW_LOI_NHUAN.REVENUE, name: 'Doanh thu', color: '#f27a58'},
  {id: ID_VIEW_LOI_NHUAN.COST_PRICE, name: 'Giá vốn', color: '#ebbd4f'},
];

export const TYPE_PHIEU_KIEM = [
  {
    name: 'Đang kiểm phiếu',
    value: STATUS_INVENTORY_TYPE.CHECKING,
  },
  {
    name: 'Hoàn thành',
    value: STATUS_INVENTORY_TYPE.COMPLETED,
  },
  {
    name: 'Đã huỷ phiếu',
    value: STATUS_INVENTORY_TYPE.CANCELLED,
  },
];
export enum CHECK_VIEW_BCBH {
  BC_THEO_THOI_GIAN = 'BC_Theo_Thoi_Gian',
  BC_THEO_LOI_NHUAN = 'BC_Theo_Loi_Nhuan',
}
export type TYPE_BCBH_DETAIL = {
  id: CHECK_VIEW_BCBH;
  type: 'time' | 'revenue';
  title: string;
};
export const DETAIL_BCBH: TYPE_BCBH_DETAIL[] = [
  {
    id: CHECK_VIEW_BCBH.BC_THEO_THOI_GIAN,
    type: 'time',
    title: 'BC Bán hàng theo thời gian',
  },
  {
    id: CHECK_VIEW_BCBH.BC_THEO_LOI_NHUAN,
    type: 'revenue',
    title: 'BC lợi nhuận theo hoá đơn',
  },
];

export enum BC_SORT_DTT_TITLE {
  DOANH_THU_THUAN = 'Doanh thu thuần',
  GIA_TRI_TRA = 'Giá trị trả',
  DOANH_THU = 'Doanh thu',
}

export const BC_SORT_DTT = [
  {title: BC_SORT_DTT_TITLE.DOANH_THU_THUAN},
  {title: BC_SORT_DTT_TITLE.GIA_TRI_TRA},
  {title: BC_SORT_DTT_TITLE.DOANH_THU},
];
export enum TYPE_MODAL {
  BAO_TRI = 'BAO_TRI',
  SUPPORT_OS = 'SUPPORT_OS',
  UPADTE_APP = 'UPADTE_APP',
  CODE_PUSH = 'CODE_PUSH',
}
