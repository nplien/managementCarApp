import {TON_KHO_TYPE} from 'models/DashBoard.Model';
import {SO_QUY_GROUP_TYPE, SO_QUY_TYPE} from 'models/SoQuy.Model';
import {IDateFilterType, ISortFilterType} from 'views/app';

export enum DOI_TAC_GIAO_HANG {
  GHN = 'ghn',
  GHTK = 'ghtk',
  AHA_MOVE = 'ahamove'
}

export enum PAYMENT_METHOD {
  TIEN_MAT = 1,
  CHUYEN_KHOAN = 2,
  QUET_THE = 3,
  VISA = 4,
  ONE_PAY = 5,
  MOMO = 6,
  VNPAY = 7,
  VOUCHER = 8,
  POINT = 9
}
export enum BAO_CAO_HANG_HOA_VALUE {
  GIA_TRI_KHO = 'total_value_14',
  TON_KHO = 'total_quantity_3',
  LOI_NHUAN = 'total_value_4',
  SO_LUONG_BAN = 'total_quantity_1',
  DOANH_THU_THUAN = 'total_value_3',
  DOANH_THU = 'total_value_18',
  SO_LUONG_TRA = 'total_quantity_2',
  GIA_TRI_TRA = 'total_value_2'
}
type ConfigOfFilter = {
  DASHBOARD: IDateFilterType[];
  CUSTOMER: IDateFilterType[];
  NCC: IDateFilterType[];
  HANG_HOA: IDateFilterType[];
  KIEM_KHO: IDateFilterType[];
  DAT_HANG: IDateFilterType[];
  HOA_DON: IDateFilterType[];
  VAN_DON: IDateFilterType[];
  NHAP_HANG: IDateFilterType[];
  CHUYEN_HANG: IDateFilterType[];
  VOUCHER: IDateFilterType[];
  STORE: IDateFilterType[];
  SO_QUY: IDateFilterType[];
  KHACH_BUON: IDateFilterType[];
  BAO_CAO_HANG_HOA: IDateFilterType[];
};

type ConfigOfSort = {
  CUSTOMER: ISortFilterType[];
  NCC: ISortFilterType[];
  HANG_HOA: ISortFilterType[];
  KIEM_KHO: ISortFilterType[];
  DAT_HANG: ISortFilterType[];
  HOA_DON: ISortFilterType[];
  TRA_HANG: ISortFilterType[];
  VAN_DON: ISortFilterType[];
  NHAP_HANG: ISortFilterType[];
  CHUYEN_HANG: ISortFilterType[];
  VOUCHER: ISortFilterType[];
  SO_QUY: ISortFilterType[];
  KHACH_BUON: ISortFilterType[];
  BAO_CAO_HANG_HOA: ISortFilterType[];
  BC_NHAN_VIEN_BAN_HANG: ISortFilterType[];
};

export interface IMethodSales {
  id: number;
  name: string;
  isCheck?: boolean;
}

export enum KENH_BAN {
  BAN_ONLINE = 2,
  BAN_TRUC_TIEP = 1,
  KHAC = 0
}
export interface IKenhBan {
  id: KENH_BAN;
  name: string;
}
export interface IChungTu {
  id: SO_QUY_TYPE | SO_QUY_GROUP_TYPE;
  name: string;
}
export interface IBC_HANG_HOA {
  id: BAO_CAO_HANG_HOA_VALUE;
  name: string;
}

// const getRawValueDate = (code: DATE_CODE) => {
//   return Utilities.getDateFilter(code);
// };

export const CONFIG_DATE_FILTER: ConfigOfFilter = {
  DASHBOARD: [
    {
      id: 'HOM_NAY',
      type: 'hour',
      name: 'H??m nay'
      // rawValue: getRawValueDate
    },
    // {
    //   id: 'HOM_QUA',
    //   type: 'hour',
    //   name: 'H??m qua'
    //   // rawValue: getRawValueDate
    // },
    {
      id: '7_NGAY_QUA',
      type: 'day',
      name: '7 ng??y qua'
      // rawValue: getRawValueDate
    },
    // {
    //   id: 'TUAN_TRUOC',
    //   type: 'day',
    //   name: 'Tu???n tr?????c'
    //   // rawValue: getRawValueDate
    // },
    {
      id: 'THANG_NAY',
      type: 'month',
      name: 'Th??ng n??y'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_TRUOC',
      type: 'month',
      name: 'Th??ng tr?????c'
      // rawValue: getRawValueDate
    },
    // {
    //   id: 'NAM_NAY',
    //   type: 'quarter',
    //   name: 'N??m nay'
    //   // rawValue: getRawValueDate
    // },
    // {
    //   id: 'NAM_TRUOC',
    //   type: 'quarter',
    //   name: 'N??m tr?????c'
    //   // rawValue: getRawValueDate
    // },
    {
      id: 'TUY_CHON',
      type: '',
      name: 'T??y ch???n...'
      // rawValue: getRawValueDate
    }
  ],
  CUSTOMER: [
    {
      id: 'TOAN_THOI_GIAN',
      type: '',
      name: 'To??n th???i gian'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_NAY',
      type: 'hour',
      name: 'H??m nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_QUA',
      type: 'hour',
      name: 'H??m qua'
      // rawValue: getRawValueDate
    },
    {
      id: '7_NGAY_QUA',
      type: 'day',
      name: '7 ng??y qua'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUAN_TRUOC',
      type: 'day',
      name: 'Tu???n tr?????c'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_NAY',
      type: 'month',
      name: 'Th??ng n??y'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_TRUOC',
      type: 'month',
      name: 'Th??ng tr?????c'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_NAY',
      type: 'quarter',
      name: 'N??m nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_TRUOC',
      type: 'quarter',
      name: 'N??m tr?????c'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUY_CHON',
      type: '',
      name: 'T??y ch???n...'
      // rawValue: getRawValueDate
    }
  ],
  NCC: [
    {
      id: 'TOAN_THOI_GIAN',
      type: '',
      name: 'To??n th???i gian'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_NAY',
      type: 'hour',
      name: 'H??m nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_QUA',
      type: 'hour',
      name: 'H??m qua'
      // rawValue: getRawValueDate
    },
    {
      id: '7_NGAY_QUA',
      type: 'day',
      name: '7 ng??y qua'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUAN_TRUOC',
      type: 'day',
      name: 'Tu???n tr?????c'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_NAY',
      type: 'month',
      name: 'Th??ng n??y'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_TRUOC',
      type: 'month',
      name: 'Th??ng tr?????c'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_NAY',
      type: 'quarter',
      name: 'N??m nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_TRUOC',
      type: 'quarter',
      name: 'N??m tr?????c'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUY_CHON',
      type: '',
      name: 'T??y ch???n...'
      // rawValue: getRawValueDate
    }
  ],
  HANG_HOA: [
    {
      id: 'TOAN_THOI_GIAN',
      type: '',
      name: 'To??n th???i gian'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_NAY',
      type: 'hour',
      name: 'H??m nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_QUA',
      type: 'hour',
      name: 'H??m qua'
      // rawValue: getRawValueDate
    },
    {
      id: '7_NGAY_QUA',
      type: 'day',
      name: '7 ng??y qua'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUAN_TRUOC',
      type: 'day',
      name: 'Tu???n tr?????c'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_NAY',
      type: 'month',
      name: 'Th??ng n??y'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_TRUOC',
      type: 'month',
      name: 'Th??ng tr?????c'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_NAY',
      type: 'quarter',
      name: 'N??m nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_TRUOC',
      type: 'quarter',
      name: 'N??m tr?????c'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUY_CHON',
      type: '',
      name: 'T??y ch???n...'
      // rawValue: getRawValueDate
    }
  ],
  KIEM_KHO: [
    {
      id: 'TOAN_THOI_GIAN',
      type: '',
      name: 'To??n th???i gian'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_NAY',
      type: 'hour',
      name: 'H??m nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_QUA',
      type: 'hour',
      name: 'H??m qua'
      // rawValue: getRawValueDate
    },
    {
      id: '7_NGAY_QUA',
      type: 'day',
      name: '7 ng??y qua'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUAN_TRUOC',
      type: 'day',
      name: 'Tu???n tr?????c'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_NAY',
      type: 'month',
      name: 'Th??ng n??y'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_TRUOC',
      type: 'month',
      name: 'Th??ng tr?????c'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_NAY',
      type: 'quarter',
      name: 'N??m nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_TRUOC',
      type: 'quarter',
      name: 'N??m tr?????c'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUY_CHON',
      type: '',
      name: 'T??y ch???n...'
      // rawValue: getRawValueDate
    }
  ],
  DAT_HANG: [
    {
      id: 'TOAN_THOI_GIAN',
      type: '',
      name: 'To??n th???i gian'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_NAY',
      type: 'hour',
      name: 'H??m nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_QUA',
      type: 'hour',
      name: 'H??m qua'
      // rawValue: getRawValueDate
    },
    {
      id: '7_NGAY_QUA',
      type: 'day',
      name: '7 ng??y qua'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUAN_TRUOC',
      type: 'day',
      name: 'Tu???n tr?????c'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_NAY',
      type: 'month',
      name: 'Th??ng n??y'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_TRUOC',
      type: 'month',
      name: 'Th??ng tr?????c'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_NAY',
      type: 'quarter',
      name: 'N??m nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_TRUOC',
      type: 'quarter',
      name: 'N??m tr?????c'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUY_CHON',
      type: '',
      name: 'T??y ch???n...'
      // rawValue: getRawValueDate
    }
  ],
  HOA_DON: [
    {
      id: 'TOAN_THOI_GIAN',
      type: '',
      name: 'To??n th???i gian'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_NAY',
      type: 'hour',
      name: 'H??m nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_QUA',
      type: 'hour',
      name: 'H??m qua'
      // rawValue: getRawValueDate
    },
    {
      id: '7_NGAY_QUA',
      type: 'day',
      name: '7 ng??y qua'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUAN_TRUOC',
      type: 'day',
      name: 'Tu???n tr?????c'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_NAY',
      type: 'month',
      name: 'Th??ng n??y'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_TRUOC',
      type: 'month',
      name: 'Th??ng tr?????c'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_NAY',
      type: 'quarter',
      name: 'N??m nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_TRUOC',
      type: 'quarter',
      name: 'N??m tr?????c'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUY_CHON',
      type: '',
      name: 'T??y ch???n...'
      // rawValue: getRawValueDate
    }
  ],
  VAN_DON: [
    {
      id: 'TOAN_THOI_GIAN',
      type: '',
      name: 'To??n th???i gian'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_NAY',
      type: 'hour',
      name: 'H??m nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_QUA',
      type: 'hour',
      name: 'H??m qua'
      // rawValue: getRawValueDate
    },
    {
      id: '7_NGAY_QUA',
      type: 'day',
      name: '7 ng??y qua'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUAN_TRUOC',
      type: 'day',
      name: 'Tu???n tr?????c'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_NAY',
      type: 'month',
      name: 'Th??ng n??y'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_TRUOC',
      type: 'month',
      name: 'Th??ng tr?????c'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_NAY',
      type: 'quarter',
      name: 'N??m nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_TRUOC',
      type: 'quarter',
      name: 'N??m tr?????c'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUY_CHON',
      type: '',
      name: 'T??y ch???n...'
      // rawValue: getRawValueDate
    }
  ],
  NHAP_HANG: [
    {
      id: 'TOAN_THOI_GIAN',
      type: '',
      name: 'To??n th???i gian'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_NAY',
      type: 'hour',
      name: 'H??m nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_QUA',
      type: 'hour',
      name: 'H??m qua'
      // rawValue: getRawValueDate
    },
    {
      id: '7_NGAY_QUA',
      type: 'day',
      name: '7 ng??y qua'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUAN_TRUOC',
      type: 'day',
      name: 'Tu???n tr?????c'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_NAY',
      type: 'month',
      name: 'Th??ng n??y'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_TRUOC',
      type: 'month',
      name: 'Th??ng tr?????c'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_NAY',
      type: 'quarter',
      name: 'N??m nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_TRUOC',
      type: 'quarter',
      name: 'N??m tr?????c'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUY_CHON',
      type: '',
      name: 'T??y ch???n...'
      // rawValue: getRawValueDate
    }
  ],
  CHUYEN_HANG: [
    {
      id: 'TOAN_THOI_GIAN',
      type: '',
      name: 'To??n th???i gian'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_NAY',
      type: 'hour',
      name: 'H??m nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_QUA',
      type: 'hour',
      name: 'H??m qua'
      // rawValue: getRawValueDate
    },
    {
      id: '7_NGAY_QUA',
      type: 'day',
      name: '7 ng??y qua'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUAN_TRUOC',
      type: 'day',
      name: 'Tu???n tr?????c'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_NAY',
      type: 'month',
      name: 'Th??ng n??y'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_TRUOC',
      type: 'month',
      name: 'Th??ng tr?????c'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_NAY',
      type: 'quarter',
      name: 'N??m nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_TRUOC',
      type: 'quarter',
      name: 'N??m tr?????c'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUY_CHON',
      type: '',
      name: 'T??y ch???n...'
      // rawValue: getRawValueDate
    }
  ],
  VOUCHER: [
    {
      id: 'TOAN_THOI_GIAN',
      type: '',
      name: 'To??n th???i gian'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_NAY',
      type: 'hour',
      name: 'H??m nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_QUA',
      type: 'hour',
      name: 'H??m qua'
      // rawValue: getRawValueDate
    },
    {
      id: '7_NGAY_QUA',
      type: 'day',
      name: '7 ng??y qua'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUAN_TRUOC',
      type: 'day',
      name: 'Tu???n tr?????c'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_NAY',
      type: 'month',
      name: 'Th??ng n??y'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_TRUOC',
      type: 'month',
      name: 'Th??ng tr?????c'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_NAY',
      type: 'quarter',
      name: 'N??m nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_TRUOC',
      type: 'quarter',
      name: 'N??m tr?????c'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUY_CHON',
      type: '',
      name: 'T??y ch???n...'
      // rawValue: getRawValueDate
    }
  ],
  STORE: [
    {
      id: 'TOAN_THOI_GIAN',
      type: '',
      name: 'To??n th???i gian'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_NAY',
      type: 'hour',
      name: 'H??m nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_QUA',
      type: 'hour',
      name: 'H??m qua'
      // rawValue: getRawValueDate
    },
    {
      id: '7_NGAY_QUA',
      type: 'day',
      name: '7 ng??y qua'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUAN_TRUOC',
      type: 'day',
      name: 'Tu???n tr?????c'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_NAY',
      type: 'month',
      name: 'Th??ng n??y'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_TRUOC',
      type: 'month',
      name: 'Th??ng tr?????c'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_NAY',
      type: 'quarter',
      name: 'N??m nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_TRUOC',
      type: 'quarter',
      name: 'N??m tr?????c'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUY_CHON',
      type: '',
      name: 'T??y ch???n...'
      // rawValue: getRawValueDate
    }
  ],
  SO_QUY: [
    {
      id: 'TOAN_THOI_GIAN',
      type: '',
      name: 'To??n th???i gian'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_NAY',
      type: 'hour',
      name: 'H??m nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_QUA',
      type: 'hour',
      name: 'H??m qua'
      // rawValue: getRawValueDate
    },
    {
      id: '7_NGAY_QUA',
      type: 'day',
      name: '7 ng??y qua'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUAN_TRUOC',
      type: 'day',
      name: 'Tu???n tr?????c'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_NAY',
      type: 'month',
      name: 'Th??ng n??y'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_TRUOC',
      type: 'month',
      name: 'Th??ng tr?????c'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_NAY',
      type: 'quarter',
      name: 'N??m nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_TRUOC',
      type: 'quarter',
      name: 'N??m tr?????c'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUY_CHON',
      type: '',
      name: 'T??y ch???n...'
      // rawValue: getRawValueDate
    }
  ],
  KHACH_BUON: [
    {
      id: 'TOAN_THOI_GIAN',
      type: '',
      name: 'To??n th???i gian'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_NAY',
      type: 'hour',
      name: 'H??m nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_QUA',
      type: 'hour',
      name: 'H??m qua'
      // rawValue: getRawValueDate
    },
    {
      id: '7_NGAY_QUA',
      type: 'day',
      name: '7 ng??y qua'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUAN_TRUOC',
      type: 'day',
      name: 'Tu???n tr?????c'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_NAY',
      type: 'month',
      name: 'Th??ng n??y'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_TRUOC',
      type: 'month',
      name: 'Th??ng tr?????c'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_NAY',
      type: 'quarter',
      name: 'N??m nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_TRUOC',
      type: 'quarter',
      name: 'N??m tr?????c'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUY_CHON',
      type: '',
      name: 'T??y ch???n...'
      // rawValue: getRawValueDate
    }
  ],
  BAO_CAO_HANG_HOA: [
    {
      id: 'TOAN_THOI_GIAN',
      type: '',
      name: 'To??n th???i gian'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_NAY',
      type: 'hour',
      name: 'H??m nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_QUA',
      type: 'hour',
      name: 'H??m qua'
      // rawValue: getRawValueDate
    },
    {
      id: '7_NGAY_QUA',
      type: 'day',
      name: '7 ng??y qua'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUAN_TRUOC',
      type: 'day',
      name: 'Tu???n tr?????c'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_NAY',
      type: 'month',
      name: 'Th??ng n??y'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_TRUOC',
      type: 'month',
      name: 'Th??ng tr?????c'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_NAY',
      type: 'quarter',
      name: 'N??m nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_TRUOC',
      type: 'quarter',
      name: 'N??m tr?????c'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUY_CHON',
      type: '',
      name: 'T??y ch???n...'
      // rawValue: getRawValueDate
    }
  ]
};

export const CONFIG_SORT_FILTER: ConfigOfSort = {
  CUSTOMER: [
    {
      sort_by: 'created_at',
      name: 'M???i nh???t',
      order_by: 'desc'
    },
    {
      sort_by: 'created_at',
      name: 'C?? nh???t',
      order_by: 'asc'
    },
    {
      sort_by: 'name',
      name: 'T??n A-Z',
      order_by: 'desc'
    },
    {
      sort_by: 'name',
      name: 'T??n Z-A',
      order_by: 'asc'
    }
  ],
  NCC: [
    {
      sort_by: 'created_at',
      name: 'M???i nh???t',
      order_by: 'desc'
    },
    {
      sort_by: 'created_at',
      name: 'C?? nh???t',
      order_by: 'asc'
    },
    {
      sort_by: 'name',
      name: 'T??n A-Z',
      order_by: 'desc'
    },
    {
      sort_by: 'name',
      name: 'T??n Z-A',
      order_by: 'asc'
    }
  ],
  HANG_HOA: [
    {
      sort_by: 'created_at',
      name: 'M???i nh???t',
      order_by: 'desc'
    },
    {
      sort_by: 'created_at',
      name: 'C?? nh???t',
      order_by: 'asc'
    }
    // ,{
    //   sort_by: 'name',
    //   name: 'A - Z',
    //   order_by: 'desc'
    // },
    // {
    //   sort_by: 'name',
    //   name: 'Z - A',
    //   order_by: 'asc'
    // }
  ],
  KIEM_KHO: [
    {
      sort_by: 'created_at',
      name: 'M???i nh???t',
      order_by: 'desc'
    },
    {
      sort_by: 'created_at',
      name: 'C?? nh???t',
      order_by: 'asc'
    }
  ],
  DAT_HANG: [
    {
      sort_by: 'created_at',
      name: 'M???i nh???t',
      order_by: 'desc'
    },
    {
      sort_by: 'created_at',
      name: 'C?? nh???t',
      order_by: 'asc'
    }
  ],
  HOA_DON: [
    {
      sort_by: 'created_at',
      name: 'M???i nh???t',
      order_by: 'desc'
    },
    {
      sort_by: 'created_at',
      name: 'C?? nh???t',
      order_by: 'asc'
    }
  ],
  TRA_HANG: [
    {
      sort_by: 'created_at',
      name: 'M???i nh???t',
      order_by: 'desc'
    },
    {
      sort_by: 'created_at',
      name: 'C?? nh???t',
      order_by: 'asc'
    }
  ],
  VAN_DON: [
    {
      sort_by: 'created_at',
      name: 'M???i nh???t',
      order_by: 'desc'
    },
    {
      sort_by: 'created_at',
      name: 'C?? nh???t',
      order_by: 'asc'
    }
  ],
  NHAP_HANG: [
    {
      sort_by: 'created_at',
      name: 'Ng??y t???o m???i nh???t',
      order_by: 'desc'
    },
    {
      sort_by: 'created_at',
      name: 'Ng??y t???o c?? nh???t',
      order_by: 'asc'
    }
  ],
  CHUYEN_HANG: [
    {
      sort_by: 'created_at',
      name: 'Ng??y t???o m???i nh???t',
      order_by: 'desc'
    },
    {
      sort_by: 'created_at',
      name: 'Ng??y t???o c?? nh???t',
      order_by: 'asc'
    }
  ],
  VOUCHER: [
    {
      sort_by: 'created_at',
      name: 'M???i nh???t',
      order_by: 'desc'
    },
    {
      sort_by: 'created_at',
      name: 'C?? nh???t',
      order_by: 'asc'
    }
  ],
  SO_QUY: [
    {
      sort_by: 'created_at',
      name: 'M???i nh???t',
      order_by: 'desc'
    },
    {
      sort_by: 'created_at',
      name: 'C?? nh???t',
      order_by: 'asc'
    }
  ],
  KHACH_BUON: [
    {
      sort_by: 'created_at',
      name: 'M???i nh???t',
      order_by: 'desc'
    },
    {
      sort_by: 'created_at',
      name: 'C?? nh???t',
      order_by: 'asc'
    }
  ],
  BAO_CAO_HANG_HOA: [
    {
      sort_by: 'created_at_day',
      name: 'Gi?? tr??? gi???m',
      order_by: 'desc'
    },
    {
      sort_by: 'created_at_day',
      name: 'Gi?? tr??? t??ng',
      order_by: 'asc'
    }
  ],
  BC_NHAN_VIEN_BAN_HANG: [
    {
      sort_by: 'created_at',
      name: 'M???i nh???t',
      order_by: 'desc'
    },
    {
      sort_by: 'created_at',
      name: 'C?? nh???t',
      order_by: 'asc'
    }
  ]
};

export type IPaymentItem = {
  method: PAYMENT_METHOD;
  name: string;
};

export const ARR_PT_THANHTOAN: Readonly<IPaymentItem[]> = [
  {
    method: PAYMENT_METHOD.TIEN_MAT,
    name: 'Ti???n m???t'
  },
  {
    method: PAYMENT_METHOD.QUET_THE,
    name: 'Th???'
  },
  {
    method: PAYMENT_METHOD.POINT,
    name: '??i???m'
  },
  {
    method: PAYMENT_METHOD.CHUYEN_KHOAN,
    name: 'Chuy???n kho???n'
  },
  {
    method: PAYMENT_METHOD.VOUCHER,
    name: 'Voucher'
  }
];

/* is_delivery tren API nhan gia tri: true, false */
export const ARR_PT_BAN_HANG: Readonly<IMethodSales[]> = [
  {id: 0, name: 'C?? giao h??ng', isCheck: true},
  {id: 1, name: 'Kh??ng giao h??ng', isCheck: false}
];

export const ARR_KENH_BAN: Readonly<IKenhBan[]> = [
  {id: KENH_BAN.KHAC, name: 'Kh??c'},
  {id: KENH_BAN.BAN_ONLINE, name: 'B??n online'},
  {id: KENH_BAN.BAN_TRUC_TIEP, name: 'B??n tr???c ti???p'}
];

/** Using view Export filter */
export const ARR_TT_NHAN_HANG: Readonly<IMethodSales[]> = [
  {
    id: 0,
    name: 'T???t c???',
    isCheck: undefined
  },
  {
    id: 1,
    name: 'Kh???p',
    isCheck: true
  },
  {
    id: 2,
    name: 'Kh??ng kh???p',
    isCheck: false
  }
];

export const ARR_CHUNG_TU: IChungTu[] = [
  {
    id: SO_QUY_TYPE.THU,
    name: 'Phi???u thu'
  },
  {
    id: SO_QUY_TYPE.CHI,
    name: 'Phi???u chi'
  }
];

export const ARR_GROUP_SQ: IChungTu[] = [
  {
    id: SO_QUY_GROUP_TYPE.KHAC,
    name: 'Kh??c'
  },
  {
    id: SO_QUY_GROUP_TYPE.CHUYEN_RUT,
    name: 'Chuy???n r??t'
  }
];

/** S??? d???ng t???i view FillterHangHoa */
export const TYPE_HANG_HOA = [
  {
    id: 'types',
    name: 'S???n ph???m',
    value: 'item'
  },
  // {
  //   id: 'types',
  //   name: 'D???ch v???',
  //   value: 2
  // },
  {
    id: 'types',
    name: 'Combo & ????ng g??i',
    value: 'combo'
  }
];

export const BAN_TRUC_TIEP = [
  {
    id: 'is_visible',
    name: 'T???t c???',
    value: undefined
  },
  {
    id: 'is_visible',
    name: 'B??n tr??n website',
    value: true
  },
  {
    id: 'is_visible',
    name: 'Kh??ng b??n tr??n website',
    value: false
  }
];

export const TON_KHO = [
  {
    id: 'stock_value',
    name: 'T???t c???',
    value: -1
  },
  // {
  //   id: 'stock_value',
  //   name: 'D?????i ?????nh m???c t???n',
  //   value: 1
  // },
  // {
  //   id: 'stock_value',
  //   name: 'V?????t ?????nh m???c t???n',
  //   value: 2
  // },
  {
    id: 'stock_value',
    name: 'C??n h??ng trong kho',
    value: 3
  },
  {
    id: 'stock_value',
    name: 'H???t h??ng trong kho',
    value: 4
  }
];

export const HIEN_THI = [
  {
    id: 'statuses',
    name: 'T???t c???',
    value: undefined
  },
  {
    id: 'statuses',
    name: '??ang ho???t ?????ng',
    value: 'active'
  },
  {
    id: 'statuses',
    name: 'Ng???ng ho???t ?????ng',
    value: 'inactive'
  }
];
export const TYPE_LOAI_HANG = [
  {
    id: 'statuses',
    name: 'S???n ph???m',
    value: 'item'
  },
  {
    id: 'statuses',
    name: 'Combo & ????ng g??i',
    value: 'combo'
  }
];
export const ARR_TON_KHO_BC = [
  {
    id: undefined,
    name: 'T???t c???'
  },
  {
    id: TON_KHO_TYPE.DUOI_DINH_MUC_TON,
    name: 'D?????i ?????nh m???c t???n'
  },
  {
    id: TON_KHO_TYPE.VUOT_DINH_MUC_TON,
    name: 'V?????t ?????nh m???c t???n'
  },
  {
    id: TON_KHO_TYPE.CON_HANG_TRONG_KHO,
    name: 'C??n h??ng trong kho'
  },
  {
    id: TON_KHO_TYPE.HET_HANG_TRONG_KHO,
    name: 'H???t h??ng trong kho'
  }
];

export const SORT_FILTER_BAO_CAO = {
  TON_KHO: [
    {
      id: BAO_CAO_HANG_HOA_VALUE.TON_KHO,
      name: 'T???n kho'
    },
    {
      id: BAO_CAO_HANG_HOA_VALUE.GIA_TRI_KHO,
      name: 'Gi?? tr??? kho'
    }
  ],
  LOI_NHUAN: [
    {
      id: BAO_CAO_HANG_HOA_VALUE.DOANH_THU_THUAN,
      name: 'Doanh thu thu???n'
    },
    {
      id: BAO_CAO_HANG_HOA_VALUE.SO_LUONG_BAN,
      name: 'S??? l?????ng'
    },
    {
      id: BAO_CAO_HANG_HOA_VALUE.LOI_NHUAN,
      name: 'L???i nhu???n'
    },
    {
      id: BAO_CAO_HANG_HOA_VALUE.DOANH_THU,
      name: 'Doanh thu'
    }
  ],
  HOA_DON: [
    {
      id: BAO_CAO_HANG_HOA_VALUE.DOANH_THU,
      name: 'Doanh thu'
    },
    {
      id: BAO_CAO_HANG_HOA_VALUE.SO_LUONG_BAN,
      name: 'S??? l?????ng b??n'
    },
    {
      id: BAO_CAO_HANG_HOA_VALUE.SO_LUONG_TRA,
      name: 'S??? l?????ng tr???'
    },
    {
      id: BAO_CAO_HANG_HOA_VALUE.GIA_TRI_TRA,
      name: 'Gi?? tr??? tr???'
    },
    {
      id: BAO_CAO_HANG_HOA_VALUE.DOANH_THU_THUAN,
      name: 'Doanh thu thu???n'
    }
  ]
};
