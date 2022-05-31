import {takeLatest, put, call, select} from 'redux-saga/effects';
import {getApiCustomer} from 'services/Customers.Api';
import Utilities from 'utils/Utilities';
import {GetSuppliers, SUPPLIER_ACTION} from './Suppliers.Reducer';
import {RootState} from 'views/app/redux/App.Reducer';
import {CustomerModelRequest, CustomerModel} from 'models/Customer.Model';
import {IResponse} from 'services/ClientAPI';
import {IAppAction} from 'views/app';
import {ISuppliersState} from './Suppliers.Type';

/**
 *
 * @param action
 * 1. Tìm kiếm customer
 * 2. Refreshing customer
 * 3. Load List Customer
 */
function* getListSuppliers(action: ReturnType<typeof GetSuppliers>) {
  try {
    const {skip, limit} = action.payload;
    let AllState: RootState = yield select();
    const {currentSort, param, nameGroup} = AllState.SuppliersReducer;
    let paramCustomer: CustomerModelRequest = {
      skip: skip,
      limit: limit,
      types: 'supplier'
    };
    if (currentSort && currentSort.order_by !== 'desc') {
      paramCustomer.order_by = currentSort?.order_by;
      paramCustomer.sort_by = currentSort?.sort_by;
    }
    if (nameGroup) {
      paramCustomer.groups = param?.groups;
    }
    if (param?.created_by) {
      paramCustomer.created_by = param.created_by;
    }
    if (param?.min_total_debt) {
      paramCustomer.min_total_debt = param.min_total_debt;
    }
    if (param?.max_total_debt) {
      paramCustomer.max_total_debt = param.max_total_debt;
    }
    if (param?.max_total_price) {
      paramCustomer.max_total_price = param.max_total_price;
    }
    if (param?.min_total_price) {
      paramCustomer.min_total_price = param.min_total_price;
    }
    if (param?.status) {
      paramCustomer.status = param.status;
    }
    if (param?.keyword) {
      paramCustomer.keyword = param.keyword;
    }
    const response: IResponse<CustomerModel[]> = yield call(() => getApiCustomer(paramCustomer));
    if (!response.code) {
      if (action.payload.isRefresh) {
        yield put<IAppAction<ISuppliersState>>({
          type: SUPPLIER_ACTION.LIST_SUCCESS,
          payload: {arrSupplier: response.data, count: response.count, isRefresh: true}
        });
      } else {
        yield put<IAppAction<ISuppliersState>>({
          type: SUPPLIER_ACTION.LIST_SUCCESS,
          payload: {arrSupplier: response.data, count: response.count}
        });
      }
    } else {
      Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
      yield put<IAppAction<ISuppliersState>>({
        type: SUPPLIER_ACTION.LIST_FAIL
      });
    }
  } catch (error) {
    yield put<IAppAction<ISuppliersState>>({
      type: SUPPLIER_ACTION.LOAD_ERROR
    });
    Utilities.logException(getListSuppliers, error);
    Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
  }
}

export function* watchListSuppliers() {
  yield takeLatest(SUPPLIER_ACTION.LIST, getListSuppliers);
}
