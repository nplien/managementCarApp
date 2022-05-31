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
      name: 'Hôm nay'
      // rawValue: getRawValueDate
    },
    // {
    //   id: 'HOM_QUA',
    //   type: 'hour',
    //   name: 'Hôm qua'
    //   // rawValue: getRawValueDate
    // },
    {
      id: '7_NGAY_QUA',
      type: 'day',
      name: '7 ngày qua'
      // rawValue: getRawValueDate
    },
    // {
    //   id: 'TUAN_TRUOC',
    //   type: 'day',
    //   name: 'Tuần trước'
    //   // rawValue: getRawValueDate
    // },
    {
      id: 'THANG_NAY',
      type: 'month',
      name: 'Tháng này'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_TRUOC',
      type: 'month',
      name: 'Tháng trước'
      // rawValue: getRawValueDate
    },
    // {
    //   id: 'NAM_NAY',
    //   type: 'quarter',
    //   name: 'Năm nay'
    //   // rawValue: getRawValueDate
    // },
    // {
    //   id: 'NAM_TRUOC',
    //   type: 'quarter',
    //   name: 'Năm trước'
    //   // rawValue: getRawValueDate
    // },
    {
      id: 'TUY_CHON',
      type: '',
      name: 'Tùy chọn...'
      // rawValue: getRawValueDate
    }
  ],
  CUSTOMER: [
    {
      id: 'TOAN_THOI_GIAN',
      type: '',
      name: 'Toàn thời gian'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_NAY',
      type: 'hour',
      name: 'Hôm nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_QUA',
      type: 'hour',
      name: 'Hôm qua'
      // rawValue: getRawValueDate
    },
    {
      id: '7_NGAY_QUA',
      type: 'day',
      name: '7 ngày qua'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUAN_TRUOC',
      type: 'day',
      name: 'Tuần trước'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_NAY',
      type: 'month',
      name: 'Tháng này'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_TRUOC',
      type: 'month',
      name: 'Tháng trước'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_NAY',
      type: 'quarter',
      name: 'Năm nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_TRUOC',
      type: 'quarter',
      name: 'Năm trước'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUY_CHON',
      type: '',
      name: 'Tùy chọn...'
      // rawValue: getRawValueDate
    }
  ],
  NCC: [
    {
      id: 'TOAN_THOI_GIAN',
      type: '',
      name: 'Toàn thời gian'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_NAY',
      type: 'hour',
      name: 'Hôm nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_QUA',
      type: 'hour',
      name: 'Hôm qua'
      // rawValue: getRawValueDate
    },
    {
      id: '7_NGAY_QUA',
      type: 'day',
      name: '7 ngày qua'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUAN_TRUOC',
      type: 'day',
      name: 'Tuần trước'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_NAY',
      type: 'month',
      name: 'Tháng này'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_TRUOC',
      type: 'month',
      name: 'Tháng trước'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_NAY',
      type: 'quarter',
      name: 'Năm nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_TRUOC',
      type: 'quarter',
      name: 'Năm trước'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUY_CHON',
      type: '',
      name: 'Tùy chọn...'
      // rawValue: getRawValueDate
    }
  ],
  HANG_HOA: [
    {
      id: 'TOAN_THOI_GIAN',
      type: '',
      name: 'Toàn thời gian'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_NAY',
      type: 'hour',
      name: 'Hôm nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_QUA',
      type: 'hour',
      name: 'Hôm qua'
      // rawValue: getRawValueDate
    },
    {
      id: '7_NGAY_QUA',
      type: 'day',
      name: '7 ngày qua'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUAN_TRUOC',
      type: 'day',
      name: 'Tuần trước'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_NAY',
      type: 'month',
      name: 'Tháng này'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_TRUOC',
      type: 'month',
      name: 'Tháng trước'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_NAY',
      type: 'quarter',
      name: 'Năm nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_TRUOC',
      type: 'quarter',
      name: 'Năm trước'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUY_CHON',
      type: '',
      name: 'Tùy chọn...'
      // rawValue: getRawValueDate
    }
  ],
  KIEM_KHO: [
    {
      id: 'TOAN_THOI_GIAN',
      type: '',
      name: 'Toàn thời gian'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_NAY',
      type: 'hour',
      name: 'Hôm nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_QUA',
      type: 'hour',
      name: 'Hôm qua'
      // rawValue: getRawValueDate
    },
    {
      id: '7_NGAY_QUA',
      type: 'day',
      name: '7 ngày qua'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUAN_TRUOC',
      type: 'day',
      name: 'Tuần trước'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_NAY',
      type: 'month',
      name: 'Tháng này'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_TRUOC',
      type: 'month',
      name: 'Tháng trước'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_NAY',
      type: 'quarter',
      name: 'Năm nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_TRUOC',
      type: 'quarter',
      name: 'Năm trước'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUY_CHON',
      type: '',
      name: 'Tùy chọn...'
      // rawValue: getRawValueDate
    }
  ],
  DAT_HANG: [
    {
      id: 'TOAN_THOI_GIAN',
      type: '',
      name: 'Toàn thời gian'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_NAY',
      type: 'hour',
      name: 'Hôm nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_QUA',
      type: 'hour',
      name: 'Hôm qua'
      // rawValue: getRawValueDate
    },
    {
      id: '7_NGAY_QUA',
      type: 'day',
      name: '7 ngày qua'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUAN_TRUOC',
      type: 'day',
      name: 'Tuần trước'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_NAY',
      type: 'month',
      name: 'Tháng này'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_TRUOC',
      type: 'month',
      name: 'Tháng trước'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_NAY',
      type: 'quarter',
      name: 'Năm nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_TRUOC',
      type: 'quarter',
      name: 'Năm trước'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUY_CHON',
      type: '',
      name: 'Tùy chọn...'
      // rawValue: getRawValueDate
    }
  ],
  HOA_DON: [
    {
      id: 'TOAN_THOI_GIAN',
      type: '',
      name: 'Toàn thời gian'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_NAY',
      type: 'hour',
      name: 'Hôm nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_QUA',
      type: 'hour',
      name: 'Hôm qua'
      // rawValue: getRawValueDate
    },
    {
      id: '7_NGAY_QUA',
      type: 'day',
      name: '7 ngày qua'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUAN_TRUOC',
      type: 'day',
      name: 'Tuần trước'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_NAY',
      type: 'month',
      name: 'Tháng này'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_TRUOC',
      type: 'month',
      name: 'Tháng trước'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_NAY',
      type: 'quarter',
      name: 'Năm nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_TRUOC',
      type: 'quarter',
      name: 'Năm trước'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUY_CHON',
      type: '',
      name: 'Tùy chọn...'
      // rawValue: getRawValueDate
    }
  ],
  VAN_DON: [
    {
      id: 'TOAN_THOI_GIAN',
      type: '',
      name: 'Toàn thời gian'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_NAY',
      type: 'hour',
      name: 'Hôm nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_QUA',
      type: 'hour',
      name: 'Hôm qua'
      // rawValue: getRawValueDate
    },
    {
      id: '7_NGAY_QUA',
      type: 'day',
      name: '7 ngày qua'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUAN_TRUOC',
      type: 'day',
      name: 'Tuần trước'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_NAY',
      type: 'month',
      name: 'Tháng này'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_TRUOC',
      type: 'month',
      name: 'Tháng trước'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_NAY',
      type: 'quarter',
      name: 'Năm nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_TRUOC',
      type: 'quarter',
      name: 'Năm trước'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUY_CHON',
      type: '',
      name: 'Tùy chọn...'
      // rawValue: getRawValueDate
    }
  ],
  NHAP_HANG: [
    {
      id: 'TOAN_THOI_GIAN',
      type: '',
      name: 'Toàn thời gian'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_NAY',
      type: 'hour',
      name: 'Hôm nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_QUA',
      type: 'hour',
      name: 'Hôm qua'
      // rawValue: getRawValueDate
    },
    {
      id: '7_NGAY_QUA',
      type: 'day',
      name: '7 ngày qua'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUAN_TRUOC',
      type: 'day',
      name: 'Tuần trước'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_NAY',
      type: 'month',
      name: 'Tháng này'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_TRUOC',
      type: 'month',
      name: 'Tháng trước'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_NAY',
      type: 'quarter',
      name: 'Năm nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_TRUOC',
      type: 'quarter',
      name: 'Năm trước'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUY_CHON',
      type: '',
      name: 'Tùy chọn...'
      // rawValue: getRawValueDate
    }
  ],
  CHUYEN_HANG: [
    {
      id: 'TOAN_THOI_GIAN',
      type: '',
      name: 'Toàn thời gian'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_NAY',
      type: 'hour',
      name: 'Hôm nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_QUA',
      type: 'hour',
      name: 'Hôm qua'
      // rawValue: getRawValueDate
    },
    {
      id: '7_NGAY_QUA',
      type: 'day',
      name: '7 ngày qua'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUAN_TRUOC',
      type: 'day',
      name: 'Tuần trước'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_NAY',
      type: 'month',
      name: 'Tháng này'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_TRUOC',
      type: 'month',
      name: 'Tháng trước'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_NAY',
      type: 'quarter',
      name: 'Năm nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_TRUOC',
      type: 'quarter',
      name: 'Năm trước'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUY_CHON',
      type: '',
      name: 'Tùy chọn...'
      // rawValue: getRawValueDate
    }
  ],
  VOUCHER: [
    {
      id: 'TOAN_THOI_GIAN',
      type: '',
      name: 'Toàn thời gian'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_NAY',
      type: 'hour',
      name: 'Hôm nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_QUA',
      type: 'hour',
      name: 'Hôm qua'
      // rawValue: getRawValueDate
    },
    {
      id: '7_NGAY_QUA',
      type: 'day',
      name: '7 ngày qua'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUAN_TRUOC',
      type: 'day',
      name: 'Tuần trước'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_NAY',
      type: 'month',
      name: 'Tháng này'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_TRUOC',
      type: 'month',
      name: 'Tháng trước'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_NAY',
      type: 'quarter',
      name: 'Năm nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_TRUOC',
      type: 'quarter',
      name: 'Năm trước'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUY_CHON',
      type: '',
      name: 'Tùy chọn...'
      // rawValue: getRawValueDate
    }
  ],
  STORE: [
    {
      id: 'TOAN_THOI_GIAN',
      type: '',
      name: 'Toàn thời gian'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_NAY',
      type: 'hour',
      name: 'Hôm nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_QUA',
      type: 'hour',
      name: 'Hôm qua'
      // rawValue: getRawValueDate
    },
    {
      id: '7_NGAY_QUA',
      type: 'day',
      name: '7 ngày qua'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUAN_TRUOC',
      type: 'day',
      name: 'Tuần trước'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_NAY',
      type: 'month',
      name: 'Tháng này'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_TRUOC',
      type: 'month',
      name: 'Tháng trước'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_NAY',
      type: 'quarter',
      name: 'Năm nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_TRUOC',
      type: 'quarter',
      name: 'Năm trước'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUY_CHON',
      type: '',
      name: 'Tùy chọn...'
      // rawValue: getRawValueDate
    }
  ],
  SO_QUY: [
    {
      id: 'TOAN_THOI_GIAN',
      type: '',
      name: 'Toàn thời gian'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_NAY',
      type: 'hour',
      name: 'Hôm nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_QUA',
      type: 'hour',
      name: 'Hôm qua'
      // rawValue: getRawValueDate
    },
    {
      id: '7_NGAY_QUA',
      type: 'day',
      name: '7 ngày qua'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUAN_TRUOC',
      type: 'day',
      name: 'Tuần trước'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_NAY',
      type: 'month',
      name: 'Tháng này'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_TRUOC',
      type: 'month',
      name: 'Tháng trước'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_NAY',
      type: 'quarter',
      name: 'Năm nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_TRUOC',
      type: 'quarter',
      name: 'Năm trước'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUY_CHON',
      type: '',
      name: 'Tùy chọn...'
      // rawValue: getRawValueDate
    }
  ],
  KHACH_BUON: [
    {
      id: 'TOAN_THOI_GIAN',
      type: '',
      name: 'Toàn thời gian'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_NAY',
      type: 'hour',
      name: 'Hôm nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_QUA',
      type: 'hour',
      name: 'Hôm qua'
      // rawValue: getRawValueDate
    },
    {
      id: '7_NGAY_QUA',
      type: 'day',
      name: '7 ngày qua'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUAN_TRUOC',
      type: 'day',
      name: 'Tuần trước'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_NAY',
      type: 'month',
      name: 'Tháng này'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_TRUOC',
      type: 'month',
      name: 'Tháng trước'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_NAY',
      type: 'quarter',
      name: 'Năm nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_TRUOC',
      type: 'quarter',
      name: 'Năm trước'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUY_CHON',
      type: '',
      name: 'Tùy chọn...'
      // rawValue: getRawValueDate
    }
  ],
  BAO_CAO_HANG_HOA: [
    {
      id: 'TOAN_THOI_GIAN',
      type: '',
      name: 'Toàn thời gian'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_NAY',
      type: 'hour',
      name: 'Hôm nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'HOM_QUA',
      type: 'hour',
      name: 'Hôm qua'
      // rawValue: getRawValueDate
    },
    {
      id: '7_NGAY_QUA',
      type: 'day',
      name: '7 ngày qua'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUAN_TRUOC',
      type: 'day',
      name: 'Tuần trước'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_NAY',
      type: 'month',
      name: 'Tháng này'
      // rawValue: getRawValueDate
    },
    {
      id: 'THANG_TRUOC',
      type: 'month',
      name: 'Tháng trước'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_NAY',
      type: 'quarter',
      name: 'Năm nay'
      // rawValue: getRawValueDate
    },
    {
      id: 'NAM_TRUOC',
      type: 'quarter',
      name: 'Năm trước'
      // rawValue: getRawValueDate
    },
    {
      id: 'TUY_CHON',
      type: '',
      name: 'Tùy chọn...'
      // rawValue: getRawValueDate
    }
  ]
};

export const CONFIG_SORT_FILTER: ConfigOfSort = {
  CUSTOMER: [
    {
      sort_by: 'created_at',
      name: 'Mới nhất',
      order_by: 'desc'
    },
    {
      sort_by: 'created_at',
      name: 'Cũ nhất',
      order_by: 'asc'
    },
    {
      sort_by: 'name',
      name: 'Tên A-Z',
      order_by: 'desc'
    },
    {
      sort_by: 'name',
      name: 'Tên Z-A',
      order_by: 'asc'
    }
  ],
  NCC: [
    {
      sort_by: 'created_at',
      name: 'Mới nhất',
      order_by: 'desc'
    },
    {
      sort_by: 'created_at',
      name: 'Cũ nhất',
      order_by: 'asc'
    },
    {
      sort_by: 'name',
      name: 'Tên A-Z',
      order_by: 'desc'
    },
    {
      sort_by: 'name',
      name: 'Tên Z-A',
      order_by: 'asc'
    }
  ],
  HANG_HOA: [
    {
      sort_by: 'created_at',
      name: 'Mới nhất',
      order_by: 'desc'
    },
    {
      sort_by: 'created_at',
      name: 'Cũ nhất',
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
      name: 'Mới nhất',
      order_by: 'desc'
    },
    {
      sort_by: 'created_at',
      name: 'Cũ nhất',
      order_by: 'asc'
    }
  ],
  DAT_HANG: [
    {
      sort_by: 'created_at',
      name: 'Mới nhất',
      order_by: 'desc'
    },
    {
      sort_by: 'created_at',
      name: 'Cũ nhất',
      order_by: 'asc'
    }
  ],
  HOA_DON: [
    {
      sort_by: 'created_at',
      name: 'Mới nhất',
      order_by: 'desc'
    },
    {
      sort_by: 'created_at',
      name: 'Cũ nhất',
      order_by: 'asc'
    }
  ],
  TRA_HANG: [
    {
      sort_by: 'created_at',
      name: 'Mới nhất',
      order_by: 'desc'
    },
    {
      sort_by: 'created_at',
      name: 'Cũ nhất',
      order_by: 'asc'
    }
  ],
  VAN_DON: [
    {
      sort_by: 'created_at',
      name: 'Mới nhất',
      order_by: 'desc'
    },
    {
      sort_by: 'created_at',
      name: 'Cũ nhất',
      order_by: 'asc'
    }
  ],
  NHAP_HANG: [
    {
      sort_by: 'created_at',
      name: 'Ngày tạo mới nhất',
      order_by: 'desc'
    },
    {
      sort_by: 'created_at',
      name: 'Ngày tạo cũ nhất',
      order_by: 'asc'
    }
  ],
  CHUYEN_HANG: [
    {
      sort_by: 'created_at',
      name: 'Ngày tạo mới nhất',
      order_by: 'desc'
    },
    {
      sort_by: 'created_at',
      name: 'Ngày tạo cũ nhất',
      order_by: 'asc'
    }
  ],
  VOUCHER: [
    {
      sort_by: 'created_at',
      name: 'Mới nhất',
      order_by: 'desc'
    },
    {
      sort_by: 'created_at',
      name: 'Cũ nhất',
      order_by: 'asc'
    }
  ],
  SO_QUY: [
    {
      sort_by: 'created_at',
      name: 'Mới nhất',
      order_by: 'desc'
    },
    {
      sort_by: 'created_at',
      name: 'Cũ nhất',
      order_by: 'asc'
    }
  ],
  KHACH_BUON: [
    {
      sort_by: 'created_at',
      name: 'Mới nhất',
      order_by: 'desc'
    },
    {
      sort_by: 'created_at',
      name: 'Cũ nhất',
      order_by: 'asc'
    }
  ],
  BAO_CAO_HANG_HOA: [
    {
      sort_by: 'created_at_day',
      name: 'Giá trị giảm',
      order_by: 'desc'
    },
    {
      sort_by: 'created_at_day',
      name: 'Giá trị tăng',
      order_by: 'asc'
    }
  ],
  BC_NHAN_VIEN_BAN_HANG: [
    {
      sort_by: 'created_at',
      name: 'Mới nhất',
      order_by: 'desc'
    },
    {
      sort_by: 'created_at',
      name: 'Cũ nhất',
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
    name: 'Tiền mặt'
  },
  {
    method: PAYMENT_METHOD.QUET_THE,
    name: 'Thẻ'
  },
  {
    method: PAYMENT_METHOD.POINT,
    name: 'Điểm'
  },
  {
    method: PAYMENT_METHOD.CHUYEN_KHOAN,
    name: 'Chuyển khoản'
  },
  {
    method: PAYMENT_METHOD.VOUCHER,
    name: 'Voucher'
  }
];

/* is_delivery tren API nhan gia tri: true, false */
export const ARR_PT_BAN_HANG: Readonly<IMethodSales[]> = [
  {id: 0, name: 'Có giao hàng', isCheck: true},
  {id: 1, name: 'Không giao hàng', isCheck: false}
];

export const ARR_KENH_BAN: Readonly<IKenhBan[]> = [
  {id: KENH_BAN.KHAC, name: 'Khác'},
  {id: KENH_BAN.BAN_ONLINE, name: 'Bán online'},
  {id: KENH_BAN.BAN_TRUC_TIEP, name: 'Bán trực tiếp'}
];

/** Using view Export filter */
export const ARR_TT_NHAN_HANG: Readonly<IMethodSales[]> = [
  {
    id: 0,
    name: 'Tất cả',
    isCheck: undefined
  },
  {
    id: 1,
    name: 'Khớp',
    isCheck: true
  },
  {
    id: 2,
    name: 'Không khớp',
    isCheck: false
  }
];

export const ARR_CHUNG_TU: IChungTu[] = [
  {
    id: SO_QUY_TYPE.THU,
    name: 'Phiếu thu'
  },
  {
    id: SO_QUY_TYPE.CHI,
    name: 'Phiếu chi'
  }
];

export const ARR_GROUP_SQ: IChungTu[] = [
  {
    id: SO_QUY_GROUP_TYPE.KHAC,
    name: 'Khác'
  },
  {
    id: SO_QUY_GROUP_TYPE.CHUYEN_RUT,
    name: 'Chuyển rút'
  }
];

/** Sử dụng tại view FillterHangHoa */
export const TYPE_HANG_HOA = [
  {
    id: 'types',
    name: 'Sản phẩm',
    value: 'item'
  },
  // {
  //   id: 'types',
  //   name: 'Dịch vụ',
  //   value: 2
  // },
  {
    id: 'types',
    name: 'Combo & đóng gói',
    value: 'combo'
  }
];

export const BAN_TRUC_TIEP = [
  {
    id: 'is_visible',
    name: 'Tất cả',
    value: undefined
  },
  {
    id: 'is_visible',
    name: 'Bán trên website',
    value: true
  },
  {
    id: 'is_visible',
    name: 'Không bán trên website',
    value: false
  }
];

export const TON_KHO = [
  {
    id: 'stock_value',
    name: 'Tất cả',
    value: -1
  },
  // {
  //   id: 'stock_value',
  //   name: 'Dưới định mức tồn',
  //   value: 1
  // },
  // {
  //   id: 'stock_value',
  //   name: 'Vượt định mức tồn',
  //   value: 2
  // },
  {
    id: 'stock_value',
    name: 'Còn hàng trong kho',
    value: 3
  },
  {
    id: 'stock_value',
    name: 'Hết hàng trong kho',
    value: 4
  }
];

export const HIEN_THI = [
  {
    id: 'statuses',
    name: 'Tất cả',
    value: undefined
  },
  {
    id: 'statuses',
    name: 'Đang hoạt động',
    value: 'active'
  },
  {
    id: 'statuses',
    name: 'Ngừng hoạt động',
    value: 'inactive'
  }
];
export const TYPE_LOAI_HANG = [
  {
    id: 'statuses',
    name: 'Sản phẩm',
    value: 'item'
  },
  {
    id: 'statuses',
    name: 'Combo & đóng gói',
    value: 'combo'
  }
];
export const ARR_TON_KHO_BC = [
  {
    id: undefined,
    name: 'Tất cả'
  },
  {
    id: TON_KHO_TYPE.DUOI_DINH_MUC_TON,
    name: 'Dưới định mức tồn'
  },
  {
    id: TON_KHO_TYPE.VUOT_DINH_MUC_TON,
    name: 'Vượt định mức tồn'
  },
  {
    id: TON_KHO_TYPE.CON_HANG_TRONG_KHO,
    name: 'Còn hàng trong kho'
  },
  {
    id: TON_KHO_TYPE.HET_HANG_TRONG_KHO,
    name: 'Hết hàng trong kho'
  }
];

export const SORT_FILTER_BAO_CAO = {
  TON_KHO: [
    {
      id: BAO_CAO_HANG_HOA_VALUE.TON_KHO,
      name: 'Tồn kho'
    },
    {
      id: BAO_CAO_HANG_HOA_VALUE.GIA_TRI_KHO,
      name: 'Giá trị kho'
    }
  ],
  LOI_NHUAN: [
    {
      id: BAO_CAO_HANG_HOA_VALUE.DOANH_THU_THUAN,
      name: 'Doanh thu thuần'
    },
    {
      id: BAO_CAO_HANG_HOA_VALUE.SO_LUONG_BAN,
      name: 'Số lượng'
    },
    {
      id: BAO_CAO_HANG_HOA_VALUE.LOI_NHUAN,
      name: 'Lợi nhuận'
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
      name: 'Số lượng bán'
    },
    {
      id: BAO_CAO_HANG_HOA_VALUE.SO_LUONG_TRA,
      name: 'Số lượng trả'
    },
    {
      id: BAO_CAO_HANG_HOA_VALUE.GIA_TRI_TRA,
      name: 'Giá trị trả'
    },
    {
      id: BAO_CAO_HANG_HOA_VALUE.DOANH_THU_THUAN,
      name: 'Doanh thu thuần'
    }
  ]
};
