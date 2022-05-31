import {combineReducers} from 'redux';
// Các reducer của màn hình view dashboard
import DashboardReducer from 'views/dashboard/redux';

// Các reduct của màn hình bán hàng
import InforShippingReducer from 'views/banhang/inforShipping/redux';
import FilterBanHangReducer from 'views/banhang/FilterBanHang/redux';
import ProductBanHangReducer from 'views/banhang/ProductBanHang/redux';
import ThanhToanReducer from 'views/banhang/thanhToanBanHang/redux';

// Các reducer của màn hình view  Hoá đơn tạm

// Các reducer của màn hình view Trả hàng

// Các reducer của màn hình view Khách hàng

import AdvancedSettingCustomerReducer from 'views/customers/filter/components/createGroup/redux/AdvancedSettingCustomer.Reducer';
import CustomerReducer from 'views/customers/manager/redux';

// Các reducer của màn hình view Nhà cung cấp (Suppliers)

import SuppliersReducer from 'views/suppliers/manager/redux';
import TotalPriceSupplierReducer from 'views/suppliers/manager/components/totalPriceSupplier/redux';

// Các reducer của màn hình view Khách bán buôn (wholesale)

// Các reducer của màn hình view  Hàng hoá (ProductHangHoa)
import ProductHangHoaReducer from 'views/products/ProductHangHoa/redux';
import FilterHangHoaReducer from 'views/products/FilterHangHoa/redux';

// Các reducer của màn hình view  Hàng hoá (ProductCategorys)
import CategoryReducer from 'views/categorys/redux';
import BangGiaReducer from 'views/banhang/bangGiaChung/redux';
import KenhBanReducer from 'views/banhang/kenhBan/redux';
import CreateSaleReducer from 'views/banhang/createSale/redux';
import FormPaymentReducer from 'views/banhang/formPayment/redux';

// Các reducer của màn hình view Kiểm kho (Inventory)
import InventoryReducer from 'views/kiemkho/Inventory/redux';

// Các reducer của màn hình view Đặt hàng (Order)
import OrderReducer from 'views/orders/manager/redux';

// Các reducer của màn hình view Hoá đơn (Invoice)
import InvoiceOrderReducer from 'views/invoice/manager/redux';

// Các reducer của màn hình view Vận đơn (DeliveryOrder)
import FilterDeliveryReducer from 'views/delivery/filter/redux';
import DeliveryOrderReducer from 'views/delivery/manager/redux';

// Các reducer của màn hình view Nhập hàng (ImportOrder)
import ImportOrderReducer from 'views/warehouse/imports/manager/redux';
import AddImportOrderReducer from 'views/warehouse/imports/addImport/redux';
import ImportCateReducer from 'views/warehouse/imports/categorys/redux';

// Các reducer của màn hình view Chuyển hàng (ExportOrder)

import ExportOrderReducer from 'views/warehouse/exports/manager/redux';
import CreateExportReducer from 'views/warehouse/exports/createExports/redux';
import ExportCateReducer from 'views/warehouse/exports/categorys/redux';

// Các reducer của màn hình view Mã giảm giá (VoucherList)
import VoucherReducer from 'views/ctkm/vouchers/manager/redux';

// Các reducer của màn hình view Quản lý nhân viên (QLNhanvien)
import QLNhanVienReducer from 'views/employees/QLNhanVien/redux';

// Các reducer của màn hình view Quản lý chi nhánh (ManagerBranch)
import ManagerBranchReducer from 'views/store/managerBranch/redux';

// Các reducer của màn hình view Sổ quỹ (PaymentHome)
import PaymentReducer from 'views/soquy/list/redux';
import FilterSoQuyReducer from 'views/soquy/filter/redux';

// Các reducer của màn hình view Báo cáo  ()
// Các màn reducer của màn hình user
import SettingReducer from 'views/setting/redux';
import PersonalReducer from 'views/personals/redux';
import ChooseStoreReducer from 'views/menuLeft/redux';

// NOTE cac man hinh bao cao hang hoa, ban hang
import BCHangHoaReducer from 'views/reports/BCHangHoa/redux';
import BCBanHangReducer from 'views/reports/BCBanHang/redux';

import BCCuoiNgayReducer from 'views/reports/BCCuoiNgay/redux';
import DetailBCHHReducer from 'views/reports/BCHangHoa/detailBCHangHoa/redux';

// Cac reducer cua man Trả Hàng
import ReturnOrderReducer from 'views/trahang/manager/redux';

import ProductCategoryReducer from 'views/warehouse/chonHangHoa/Productcategory/redux';
import SortFilterReducer from 'views/warehouse/chonHangHoa/Productcategory/components/sortFilter/redux';
import HeaderSelectedReducer from 'views/warehouse/chonHangHoa/Productcategory/components/selectedMany/redux';
import ChangeGiaBanReducer from 'views/warehouse/chonHangHoa/Productcategory/components/changeGiaBan/redux';
import ChooseBangGiaReducer from 'views/warehouse/chonHangHoa/Productcategory/components/chooseBangGia/redux';
import ChooseKhachHangReducer from 'views/warehouse/chonHangHoa/Productcategory/components/chooseKhachHang/redux';
import FilterCategoryReducer from 'views/warehouse/chonHangHoa/filterCategory/redux';

const allReducer = combineReducers({
  // Các reducer của màn hình view dashboard

  DashboardReducer,

  // Các reducer của màn hình view bán hàng
  InforShippingReducer,
  FilterBanHangReducer,
  ProductBanHangReducer,
  ThanhToanReducer,
  // Các reducer của màn hình view  Hoá đơn tạm

  // Các reducer của màn hình view Trả hàng

  // Các reducer của màn hình view Khách hàng

  CustomerReducer,
  AdvancedSettingCustomerReducer,

  // Các reducer của màn hình view Nhà cung cấp (Suppliers)
  SuppliersReducer,
  TotalPriceSupplierReducer,

  // Các reducer của màn hình view  Hàng hoá (ProductHangHoa)
  ProductHangHoaReducer,
  FilterHangHoaReducer,

  // Các reducer của màn hình view  Hàng hoá (ProductCategorys)
  CategoryReducer,
  BangGiaReducer,
  KenhBanReducer,
  CreateSaleReducer,
  FormPaymentReducer,

  // Các reducer của màn hình view Kiểm kho (Inventory)
  InventoryReducer,

  // Các reducer của màn hình view Đặt hàng (Order)
  OrderReducer,

  // Các reducer của màn hình view Hoá đơn (Invoice)
  InvoiceOrderReducer,

  // Các reducer của màn hình view Vận đơn (DeliveryOrder)
  FilterDeliveryReducer,
  DeliveryOrderReducer,

  // Các reducer của màn hình view Nhập hàng (ImportOrder)
  ImportOrderReducer,
  AddImportOrderReducer,
  ImportCateReducer,

  // Các reducer của màn hình view Chuyển hàng (ExportOrder)
  ExportOrderReducer,
  CreateExportReducer,
  ExportCateReducer,

  // Các reducer của màn hình view Mã giảm giá (VoucherList)
  VoucherReducer,

  // Các reducer của màn hình view Quản lý nhân viên (QLNhanvien)
  QLNhanVienReducer,

  // Các reducer của màn hình view Quản lý chi nhánh (ManagerBranch)
  ManagerBranchReducer,

  // Các reducer của màn hình view Sổ quỹ (PaymentHome)
  FilterSoQuyReducer,
  PaymentReducer,

  // Các reducer của màn hình view Báo cáo  ()

  // Các màn reducer của màn hình user
  SettingReducer,
  PersonalReducer,
  ChooseStoreReducer,

  // NOTE bao coa hang hoa, ban hang
  BCHangHoaReducer,
  BCBanHangReducer,
  BCCuoiNgayReducer,
  DetailBCHHReducer,

  // Cac reducer cua man Trả Hàng
  ReturnOrderReducer,
  ProductCategoryReducer,
  SortFilterReducer,
  HeaderSelectedReducer,
  ChangeGiaBanReducer,
  ChooseBangGiaReducer,
  ChooseKhachHangReducer,
  FilterCategoryReducer
});

export type RootState = ReturnType<typeof allReducer>;

export default allReducer;
