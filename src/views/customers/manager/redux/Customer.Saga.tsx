import {takeLatest, put, call, select} from 'redux-saga/effects';
import {
  CUSTOMER_ACTION,
  GetCustomer,
  LoadMoreCustomer,
} from './Customer.Reducer';
import {getApiCustomer} from 'services/Customers.Api';
import Utilities from 'utils/Utilities';
import {RootState} from 'views/app/redux/App.Reducer';
import {CustomerModelRequest, CustomerModel} from 'models/Customer.Model';
import {IDateRange, IAppAction} from 'views/app';
import {IResponse} from 'services/ClientAPI';
import {ICustomerState} from './Cutomer.Type';
import {CONFIG_DATE_FILTER} from 'configs/FilterConfig';
/**
 *
 * @param action
 * 1. Tìm kiếm customer
 * 2. Refreshing customer
 * 3. Load List Customer
 */
function* getListCustomer(action: ReturnType<typeof GetCustomer>) {
  try {
    const {skip, limit} = action.payload;
    let AllState: RootState = yield select();
    const {
      currentSort,
      genders,
      created_by,
      keyword,
      types,
      groups,
      min_total_price,
      max_total_price,
      min_total_debt,
      max_total_debt,
      min_total_point,
      max_total_point,
      provincesCity,
      thoiGianLocGDC,
      khoangThoiGianGDC,
      currentFilterDate,
      convertCurrentFilterDate,
    } = AllState.CustomerReducer;
    let paramCustomer: CustomerModelRequest = {};
    if (types && types?.length > 0) {
      paramCustomer = {
        skip: skip,
        limit: limit,
        types: types,
      };
    } else {
      paramCustomer = {
        types: 'individual,company,whosale',
        skip: skip,
        limit: limit,
      };
    }
    /* tim theo ten */
    if (keyword && keyword.length > 0) {
      paramCustomer.keyword = keyword;
    }
    /** tim theo nguoi tao */
    if (created_by && created_by.id) {
      paramCustomer.staffs = created_by?.id;
    }
    if (genders && genders.length > 0) {
      paramCustomer.genders = genders;
    }
    /** nhom khach hang */
    if (groups && groups?.id) {
      paramCustomer.groups = groups?.id;
    }
    /* sap xep */
    if (currentSort && currentSort.order_by !== 'desc') {
      paramCustomer.order_by = currentSort?.order_by;
      paramCustomer.sort_by = currentSort?.sort_by;
    }
    /* ngay tao khach hang */
    if (currentFilterDate) {
      let dateQuery: any = {} as IDateRange;
      if (currentFilterDate.id === 'TUY_CHON') {
        dateQuery = convertCurrentFilterDate;
      } else {
        dateQuery = Utilities.getDateFilter(currentFilterDate.id);
      }

      paramCustomer.min_created_at = dateQuery?.dateFrom || undefined;
      paramCustomer.max_created_at = dateQuery?.dateTo || undefined;
    }
    if (
      currentFilterDate &&
      currentFilterDate.id === CONFIG_DATE_FILTER.CUSTOMER[0].id
    ) {
      delete paramCustomer.min_created_at;
      delete paramCustomer.max_created_at;
    }

    /** ngay giao dich cuoi cua khach hang  */
    if (thoiGianLocGDC?.id !== CONFIG_DATE_FILTER.CUSTOMER[0].id) {
      paramCustomer.min_last_purchase = khoangThoiGianGDC?.dateFrom;
      paramCustomer.max_last_purchase = khoangThoiGianGDC?.dateTo;
    }
    /** tổng bán  */
    if (min_total_price && min_total_price?.length > 0) {
      paramCustomer.min_total_price = min_total_price;
    }
    if (max_total_price && max_total_price?.length > 0) {
      paramCustomer.max_total_price = max_total_price;
    }
    /** Nợ hiện tại  */
    if (min_total_debt && min_total_debt.length > 0) {
      paramCustomer.min_total_debt = parseInt(min_total_debt);
    }
    if (max_total_debt && max_total_debt.length > 0) {
      paramCustomer.max_total_debt = parseInt(max_total_debt);
    }
    if (min_total_point && min_total_point.length > 0) {
      paramCustomer.min_total_point = parseInt(min_total_point);
    }
    if (max_total_point && max_total_point.length > 0) {
      paramCustomer.max_total_point = parseInt(max_total_point);
    }
    /** khu vực */
    if (provincesCity && provincesCity.length > 0) {
      let stringProvinces: any = [];
      provincesCity.map((v: {code: any}) => {
        stringProvinces.push(v.code);
      });
      paramCustomer.provinces = stringProvinces.toString();
    }
    // if (provincesDistrict && provincesDistrict.code.length >= 0) {
    //   paramCustomer.provinces = provincesDistrict.code;
    // }

    const response: IResponse<CustomerModel[]> = yield call(() =>
      getApiCustomer(paramCustomer),
    );
    if (!response.code) {
      if (action.payload.isRefresh) {
        yield put<IAppAction<ICustomerState>>({
          type: CUSTOMER_ACTION.LIST_SUCCESS,
          payload: {
            isRefresh: true,
            count: response.count,
            arrCustomer: response.data,
          },
        });
      } else {
        yield put<IAppAction<ICustomerState>>({
          type: CUSTOMER_ACTION.LIST_SUCCESS,
          payload: {
            count: response.count,
            arrCustomer: response.data,
          },
        });
      }
    } else {
      Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
      yield put<IAppAction<ICustomerState>>({
        type: CUSTOMER_ACTION.LIST_FAIL,
      });
    }
  } catch (error) {
    yield put<IAppAction<ICustomerState>>({
      type: CUSTOMER_ACTION.LOAD_ERROR,
    });
    Utilities.logException(getListCustomer, error);
    Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
  }
}

export function* watchListCustomer() {
  yield takeLatest(CUSTOMER_ACTION.LIST, getListCustomer);
}
/**
 * @param action
 * 1. Load more customer
 */
function* getLoadmoreCustomer(action: ReturnType<typeof LoadMoreCustomer>) {
  try {
    const {skip, limit} = action.payload;
    let AllState: RootState = yield select();
    const {
      currentSort,
      genders,
      created_by,
      keyword,
      types,
      groups,
      min_total_price,
      max_total_price,
      min_total_debt,
      max_total_debt,
      min_total_point,
      max_total_point,
      provincesCity,
      thoiGianLocGDC,
      khoangThoiGianGDC,
      currentFilterDate,
      convertCurrentFilterDate,
    } = AllState.CustomerReducer;

    let paramCustomer: CustomerModelRequest | any = {};
    if (types && types?.length > 0) {
      paramCustomer = {
        skip: skip,
        limit: limit,
        types: types,
      };
    } else {
      paramCustomer = {
        types: 'individual,company,whosale',
        skip: skip,
        limit: limit,
      };
    }
    /* tim theo ten */
    if (keyword && keyword.length > 0) {
      paramCustomer.keyword = keyword;
    }
    /** tim theo nguoi tao */
    if (created_by && created_by.length > 0) {
      paramCustomer.created_by = created_by;
    }
    if (genders && genders.length > 0) {
      paramCustomer.genders = genders;
    }
    /** nhom khach hang */
    if (groups && groups?.id) {
      paramCustomer.groups = groups?.id;
    }
    /* sap xep */
    if (currentSort && currentSort.order_by !== 'desc') {
      paramCustomer.order_by = currentSort?.order_by;
      paramCustomer.sort_by = currentSort?.sort_by;
    }
    /* ngay tao khach hang */
    if (currentFilterDate) {
      let dateQuery: any = {} as IDateRange;
      if (currentFilterDate.id === 'TUY_CHON') {
        dateQuery = convertCurrentFilterDate;
      } else {
        dateQuery = Utilities.getDateFilter(currentFilterDate.id);
      }

      paramCustomer.min_created_at = dateQuery?.dateFrom || undefined;
      paramCustomer.max_created_at = dateQuery?.dateTo || undefined;
    }
    if (
      currentFilterDate &&
      currentFilterDate.id === CONFIG_DATE_FILTER.CUSTOMER[0].id
    ) {
      delete paramCustomer.min_created_at;
      delete paramCustomer.max_created_at;
    }
    /** ngay giao dich cuoi cua khach hang  */
    if (thoiGianLocGDC?.id !== CONFIG_DATE_FILTER.CUSTOMER[0].id) {
      paramCustomer.min_last_purchase = khoangThoiGianGDC?.dateFrom;
      paramCustomer.max_last_purchase = khoangThoiGianGDC?.dateTo;
    }
    /** tổng bán  */
    if (min_total_price && min_total_price?.length > 0) {
      paramCustomer.min_total_price = min_total_price;
    }
    if (max_total_price && max_total_price?.length > 0) {
      paramCustomer.max_total_price = max_total_price;
    }
    /** Nợ hiện tại  */
    if (min_total_debt && min_total_debt.length > 0) {
      paramCustomer.min_total_debt = min_total_debt;
    }
    if (max_total_debt && max_total_debt.length > 0) {
      paramCustomer.max_total_debt = max_total_debt;
    }
    if (min_total_point && min_total_point.length > 0) {
      paramCustomer.min_total_point = min_total_point;
    }
    if (max_total_point && max_total_point.length > 0) {
      paramCustomer.max_total_point = max_total_point;
    }
    /** khu vực */
    if (provincesCity && provincesCity.length > 0) {
      let stringProvinces: any = [];
      provincesCity.map((v: {code: any}) => {
        stringProvinces.push(v.code);
      });
      paramCustomer.provinces = stringProvinces.toString();
    }
    // if (provincesDistrict && provincesDistrict.code.length >= 0) {
    //   paramCustomer.provinces = provincesDistrict.code;
    // }

    const response: IResponse<CustomerModel[]> = yield call(() =>
      getApiCustomer(paramCustomer),
    );
    if (!response.code) {
      yield put<IAppAction<ICustomerState>>({
        type: CUSTOMER_ACTION.LOADMORE_SUCCESS,
        payload: {
          arrCustomer: response.data,
        },
      });
    } else {
      Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
      yield put<IAppAction<ICustomerState>>({
        type: CUSTOMER_ACTION.LOADMORE_FAIL,
      });
    }
  } catch (error) {
    Utilities.logException(getLoadmoreCustomer, error);
    Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
    yield put<IAppAction<ICustomerState>>({
      type: CUSTOMER_ACTION.LOADMORE_FAIL,
    });
  }
}

export function* watchLoadMoreCustomer() {
  yield takeLatest(CUSTOMER_ACTION.LOADMORE, getLoadmoreCustomer);
}
