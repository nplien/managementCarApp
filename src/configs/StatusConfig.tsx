import {SO_QUY_STATUS} from 'models/SoQuy.Model';

export enum ORDER_STATUS_INVOICE {
  DRAFT = 'draft',
  PENDING = 'pending',
  PRODCESSING = 'processing',
  DELIVERING = 'delivering',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed'
}

export enum IMPORT_EXPORT_STATUS {
  DRAFT = 'draft',
  CANCELLED = 'cancelled',
  PRODCESSING = 'processing',
  COMPLETED = 'completed'
}

export enum DELIVERY_STATUS {
  PENDING = 'pending',
  PICKING = 'picking',
  RE_PICK = 're_pick',
  PICKED = 'picked',
  RE_DELIVERY = 're_delivery',
  DELIVERED = 'delivered',
  PENDING_RETURN = 'pending_return',
  RETURNING = 'returning',
  RE_RETURN = 're_return',
  CONFIRM_PENDING_RETURN = 'confirm_pending_return',
  RETURNED = 'returned',
  CANCELLED = 'cancelled'
}

export enum VOUCHER_STATUS {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  CANCELLED = 'cancelled'
}

export enum BRAND_STATUS {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

export type IStatusItem = {
  id:
    | ORDER_STATUS_INVOICE
    | IMPORT_EXPORT_STATUS
    | DELIVERY_STATUS
    | SO_QUY_STATUS
    | VOUCHER_STATUS
    | BRAND_STATUS;
  name: string;
};

export const INVOICE_LIST: Readonly<IStatusItem[]> = [
  {
    id: ORDER_STATUS_INVOICE.DRAFT,
    name: 'Đơn tạm'
  },
  {
    id: ORDER_STATUS_INVOICE.PENDING,
    name: 'Chờ duyệt'
  },
  {
    id: ORDER_STATUS_INVOICE.PRODCESSING,
    name: 'Đang xử lý'
  },
  {
    id: ORDER_STATUS_INVOICE.CANCELLED,
    name: 'Đã huỷ đơn'
  },
  {
    id: ORDER_STATUS_INVOICE.COMPLETED,
    name: 'Đã hoàn thành'
  }
];
export const RETURN_ORDER_LIST: Readonly<IStatusItem[]> = [
  {
    id: ORDER_STATUS_INVOICE.DRAFT,
    name: 'Đơn tạm'
  },
  {
    id: ORDER_STATUS_INVOICE.PENDING,
    name: 'Chờ duyệt'
  },
  {
    id: ORDER_STATUS_INVOICE.PRODCESSING,
    name: 'Đang xử lý'
  },
  {
    id: ORDER_STATUS_INVOICE.CANCELLED,
    name: 'Đã huỷ đơn'
  },
  {
    id: ORDER_STATUS_INVOICE.COMPLETED,
    name: 'Đã hoàn thành'
  }
];

export const IMPORT_LIST: Readonly<IStatusItem[]> = [
  {
    id: IMPORT_EXPORT_STATUS.DRAFT,
    name: 'Phiếu tạm'
  },
  {
    id: IMPORT_EXPORT_STATUS.COMPLETED,
    name: 'Đã nhận'
  },
  {
    id: IMPORT_EXPORT_STATUS.CANCELLED,
    name: 'Đã hủy'
  }
];

export const EXPORT_LIST: Readonly<IStatusItem[]> = [
  {
    id: IMPORT_EXPORT_STATUS.DRAFT,
    name: 'Phiếu tạm'
  },
  {
    id: IMPORT_EXPORT_STATUS.COMPLETED,
    name: 'Đã nhận'
  },
  {
    id: IMPORT_EXPORT_STATUS.CANCELLED,
    name: 'Đã hủy'
  },
  {
    id: IMPORT_EXPORT_STATUS.PRODCESSING,
    name: 'Đang chuyển'
  }
];

export const DELIVERY_LIST: Readonly<IStatusItem[]> = [
  {
    id: DELIVERY_STATUS.PENDING,
    name: 'Chờ xử lý'
  },
  {
    id: DELIVERY_STATUS.PICKING,
    name: 'Đang lấy hàng'
  },
  {
    id: DELIVERY_STATUS.RE_PICK,
    name: 'Chờ lấy lại'
  },
  {
    id: DELIVERY_STATUS.PICKED,
    name: 'Đã lấy hàng'
  },
  {
    id: DELIVERY_STATUS.RE_DELIVERY,
    name: 'Chờ giao lại'
  },
  {
    id: DELIVERY_STATUS.DELIVERED,
    name: 'Giao thành công'
  },
  {
    id: DELIVERY_STATUS.PENDING_RETURN,
    name: 'Chờ chuyển hoàn'
  },
  {
    id: DELIVERY_STATUS.RETURNING,
    name: 'Đang chuyển hoàn'
  },
  {
    id: DELIVERY_STATUS.RE_RETURN,
    name: 'Chờ chuyển hoàn lại'
  },
  {
    id: DELIVERY_STATUS.CONFIRM_PENDING_RETURN,
    name: 'Chờ xác nhận hoàn'
  },
  {
    id: DELIVERY_STATUS.RETURNED,
    name: 'Đã chuyển hoàn'
  },
  {
    id: DELIVERY_STATUS.CANCELLED,
    name: 'Đã huỷ'
  }
];

export const SO_QUY_LIST: Readonly<IStatusItem[]> = [
  {
    id: SO_QUY_STATUS.PENDING,
    name: 'Chờ xử lý'
  },
  {
    id: SO_QUY_STATUS.COMPLETED,
    name: 'Đã thanh toán'
  },
  {
    id: SO_QUY_STATUS.CANCELLED,
    name: 'Đã hủy'
  }
];

export const VOUCHER_LIST: Readonly<IStatusItem[]> = [
  {
    id: VOUCHER_STATUS.ACTIVE,
    name: 'Đang hoạt động'
  },
  {
    id: VOUCHER_STATUS.INACTIVE,
    name: 'Ngừng hoạt động'
  },
  {
    id: VOUCHER_STATUS.CANCELLED,
    name: 'Đã hủy voucher'
  }
];

export const BRAND_LIST: Readonly<IStatusItem[]> = [
  {
    id: BRAND_STATUS.ACTIVE,
    name: 'Đang hoạt động'
  },
  {
    id: BRAND_STATUS.INACTIVE,
    name: 'Ngừng hoạt động'
  }
];
