import {ProductModel} from 'models/Product.Model';

export type InfoProduct = {
  id: string;
  key: keyof ProductModel | 'stock_muc_ton';
  title: string;
};

export const INFO_PRODUCT: InfoProduct[] = [
  {
    id: '1',
    key: 'sku',
    title: 'Mã hàng'
  },
  {
    id: '2',
    key: 'barcode',
    title: 'Mã vạch'
  },
  {
    id: '3',
    key: 'categories',
    title: 'Danh mục'
  },
  {
    id: '4',
    key: 'unit',
    title: 'Đơn vị tính'
  },
  {
    id: '5',
    key: 'original_price',
    title: 'Giá vốn'
  },
  {
    id: '6',
    key: 'price',
    title: 'Giá bán'
  },
  {
    id: '7',
    key: 'expired_at',
    title: 'Hạn sử dụng'
  },
  {
    id: '8',
    key: 'stock_muc_ton',
    title: 'Định mức tồn'
  },
  {
    id: '9',
    key: 'stocks',
    title: 'Tồn kho'
  }
];

export enum TheKhoStatus {
  NHAP_HANG = 'import',
  XUAT_HANG = 'export',
  KIEM_HANG = 'stock_take',
  BAN_HANG = 'order',
  TRA_HANG = 'return'
}

export enum KieuKhuyenMai {
  GIAM_PHAN_TRAM = 1,
  GIAM_THANG_TIEN = 2
}

export enum NGUOI_TRA_TIEN {
  NGUOI_NHAN = 'NGUOINHAN',
  NGUOI_GUI = 'NGUOIGUI'
}

// 1: customer (khách hàng), 2: supplier (nhà cung cấp), 3: delivery (vận chuyển), 4: staff (nhân viên), 5: other (khác)
export enum PARTNER_TYPE {
  KHACH_HANG = 1,
  NHA_CUNG_CAP = 2,
  VAN_CHUYEN = 3,
  NHAN_VIEW = 4,
  KHAC = 5
}

// 1: order (bán hàng), 2: delivery (vận chuyển), 3: import (nhập hàng), 4: other (khác)
export enum TRANSACTION_TYPE {
  BAN_HANG = 1,
  VAN_CHUYEN = 2,
  NHAP_HANG = 3,
  KHAC = 4
}

export const HINH_THUC_NHAN_HANG = [
  {
    id: 'KHONGCHOXEMHANG',
    name: 'Không cho xem hàng'
  },
  {
    id: 'CHOXEMHANG',
    name: 'Cho xem hàng'
  },
  {
    id: 'CHOTHUHANG',
    name: 'Cho thử hàng'
  }
];

export const ARR_PAYMENT_BY = [
  {
    id: 'NGUOINHAN',
    name: 'Người nhận trả phí'
  },
  {
    id: 'NGUOIGUI',
    name: 'Người gửi trả phí'
  }
];
