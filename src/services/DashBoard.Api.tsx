import Utilities from 'utils/Utilities';
import ClientAPI, {IResponse} from './ClientAPI';
import {DoanhThu} from 'models/DoanhSo.Model';
import {
  // IBCBHModel,
  IBCBHModelV2,
  IBCDHModel,
  IBCSPModel,
  ISumBCBHModel,
  ISumBCDHModelV2,
  ISumBCSPModel
} from 'models/DashBoard.Model';
import {TIME_TYPE} from 'views/app';

const URL_REPORT_DASHBOARD = 'v1/reports/orders';
const URL_REPORT_TOP_SALE = 'v1/reports/product-best-sales';

const URL_REPORT_TONGDT = 'v1/orders/sum';

const URL_REPORT_SALE = 'v1/sale-reports';
const URL_REPORT_PRODUCT = 'v1/product-reports';
const URL_REPORT_ORDER = 'v1/orders';
const END_OF_DAY_REPORT = 'v1/end-of-day-reports/products';
const TOP_10_SP = URL_REPORT_SALE + '/product-top-seller';
const URL_DT_BY_TIME = URL_REPORT_SALE + '/store-revenue';

export interface IBCBHRequest {
  stores?: string;
  types?: 'revenues' | 'staffs' | 'stores' | 'discounts' | 'returns';
  min_created_at_day?: string; // MM/DD/YYYY
  max_created_at_day?: string; // MM/DD/YYYY
  skip: number;
  limit: number;
  date_time?: TIME_TYPE;
  channels?: string;
  is_delivery?: boolean;
  price_books?: string;
  staffs?: string;
}
/**
 ** 1: Bán hàng
 ** 2: Lợi nhuận
 ** 3: Giá trị kho
 ** 4: Xuất nhập tồn
 ** 5: Xuất hủy
 ** 6: Nhân viên (Khách) theo bán hàng
 ** 7: NCC theo nhập
 */
export enum MOI_QUAN_TAM {
  BAN_HANG = 1,
  LOI_NHUAN = 2,
  GIA_TRI_KHO = 3,
  XUAT_NHAP_TON = 4,
  XUAT_HUY = 5,
  NHAN_VIEN_THEO_BAN = 6,
  KHACH_THEO_BAN = 6,
  NCC_THEO_NHAP = 7
}

export interface IBCSPRequest {
  stores?: string;
  min_created_at_day?: string; // MM/DD/YYYY
  max_created_at_day?: string;
  skip: number;
  limit: number;
  view?: MOI_QUAN_TAM;
  keyword?: string;
  group_category?: boolean;
  category?: number;
  types?: string;
  sort_by?: string;
  order_by?: 'asc' | 'desc';
  statuses?: string;
  stock?: number;
  categories?: string;
}

export interface IBCDHRequest {
  stores?: string;
  skip: number;
  limit: number;
  min_created_at?: string; // MM/DD/YYYY
  max_created_at?: string; // MM/DD/YYYY
  statuses?: string;
  types?: string;
}

export interface IEndOfDayReportReq {
  skip?: number;
  limit?: number;
  stores?: string;
  date_time?: string;
  min_created_at_day?: string;
  max_created_at_day?: string;
}
export interface Top10Request {
  skip?: number;
  limit?: number;
  stores?: string;
  seller_type?: 1 | 2; // 1: sl ban, 2: doanh thu
  date_time?: string;
  min_created_at_day?: string;
  max_created_at_day?: string;
}
export interface DoanhThuTimeRequest {
  stores?: string;
  date_time?: string;
  min_created_at_day?: string;
  max_created_at_day?: string;
}
const DashBoardApi = {
  /**
   * * Lay doanh thu theo cua hang
   */
  getDoanhThuTheoCuaHang: async (
    store_id: string,
    date_type: 'HH' | 'DD/MM/YYYY' | 'MM:YYYY' | 'YYYY',
    min_created_at?: string,
    max_created_at?: string
  ) => {
    const response = await ClientAPI.GET(
      URL_REPORT_DASHBOARD,
      {
        store_id,
        date_type,
        min_created_at,
        max_created_at
      },
      Utilities.getHeaderRequest()
    );
    return response;
  },

  getTopSaleProduct: async (param: {
    stores?: string;
    min_created_at?: string;
    max_created_at?: string;
    order_by?: 'total_revenue' | 'total_ordered';
  }) => {
    const response = await ClientAPI.GET(
      URL_REPORT_TOP_SALE,
      {
        stores: param.stores,
        min_created_at: param.min_created_at,
        max_created_at: param.max_created_at,
        order_by: param.order_by
      },
      Utilities.getHeaderRequest()
    );
    return response;
  },
  getTongDoanhThu: async (
    types: string,
    stores: string,
    statuses: string,
    min_created_at?: string,
    max_created_at?: string
  ) => {
    const response = await ClientAPI.GET<IResponse<DoanhThu>>(
      URL_REPORT_TONGDT,
      {
        types,
        stores,
        statuses,
        min_created_at,
        max_created_at
      },
      Utilities.getHeaderRequest()
    );
    return response;
  },
  getBaoCaoBanHang: async (params: IBCBHRequest) => {
    let stringUrl = '';
    if (params.types) {
      stringUrl = '/' + params.types;
    }
    delete params.types;
    const response = await ClientAPI.GET<IResponse<IBCBHModelV2[], ISumBCBHModel>>(
      URL_REPORT_SALE + stringUrl,
      params,
      Utilities.getHeaderRequest()
    );
    return response;
  },
  getBaoCaoSanPham: async (params: IBCSPRequest) => {
    let link: string = '';

    switch (params.view) {
      case 2:
        link = '/profit';
        break;
      case 3:
        link = '/stock-value';
        break;
      case 4:
        link = '/stock-detail';
        break;
      default:
        link = '/sale';
        break;
    }
    delete params.view;
    const response = await ClientAPI.GET<IResponse<IBCSPModel[], ISumBCSPModel>>(
      URL_REPORT_PRODUCT + link,
      params,
      Utilities.getHeaderRequest()
    );
    return response;
  },
  getBaoCaoDatHang: async (params: IBCDHRequest) => {
    const response = await ClientAPI.GET<IResponse<IBCDHModel[], ISumBCDHModelV2>>(
      URL_REPORT_ORDER,
      params,
      Utilities.getHeaderRequest()
    );
    return response;
  },
  // https://api.cocolux.com/v1/end-of-day-reports/products?stores=1,2,3,4,5,6,7,8,9,10,11,12,13,14,16,17,23,22,21&date_time=day&min_created_at_day=05/01/2022&max_created_at_day=05/30/2022
  getTop10ProductForSale: async (params: IEndOfDayReportReq) => {
    const response = await ClientAPI.GET<IResponse<IBCDHModel[], ISumBCDHModelV2>>(
      END_OF_DAY_REPORT,
      params,
      Utilities.getHeaderRequest()
    );
    return response;
  },
  getTop10ProductForSaleNew: async (params: Top10Request) => {
    const response = await ClientAPI.GET<IResponse<IBCDHModel[], any>>(
      TOP_10_SP,
      params,
      Utilities.getHeaderRequest()
    );
    return response;
  },
  getDoanhThuThoiGian: async (params: DoanhThuTimeRequest) => {
    const response = await ClientAPI.GET<IResponse<IBCDHModel[], any>>(
      URL_DT_BY_TIME,
      params,
      Utilities.getHeaderRequest()
    );
    return response;
  }
  // end-of-day-reports/products?
};
export {DashBoardApi};
