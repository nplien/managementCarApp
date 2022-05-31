import {all, fork} from 'redux-saga/effects';
// Các saga của màn hình view dashboard
import {
  watchListDatHangCuaHang,
  watchListTonKhoCuaHang,
  watchDoanhThuTheoStorePieChartDashBoard,
  watchDoanhThuTheoThoiGianStackBarDashBoard,
  watchTop10ForSale,
  watchTop10ForQty
} from 'views/dashboard/redux';

// Các saga của màn hình view  Hoá đơn tạm

// Các saga của màn hình view Trả hàng

// Các saga của màn hình view Khách hàng
import {watchListCustomer, watchLoadMoreCustomer} from 'views/customers/manager/redux';

// Các saga của màn hình view Nhà cung cấp (Suppliers)
import {watchListSuppliers} from 'views/suppliers/manager/redux';

// Các saga của màn hình view Bán hàng
import {watchListProductBanHang} from 'views/banhang/ProductBanHang/redux';

// Các saga của màn hình view Hàng hoá
import {watchListProductHangHoa} from 'views/products/ProductHangHoa/redux';

// Các saga của màn hình view  Hàng hoá (ProductCategorys)
import {watchListCategory} from 'views/categorys/redux';
import {watchListBangGia} from 'views/banhang/bangGiaChung/redux';
import {watchListKenhBan} from 'views/banhang/kenhBan/redux';
import {watchThanhToanHoaDon} from 'views/banhang/thanhToanBanHang/redux';

// Các saga của màn hình view Kiểm kho (Inventory)
import {watchListInventory} from 'views/kiemkho/Inventory/redux';

// Các saga của màn hình view Đặt hàng (Order)
import {watchOrderSaga} from 'views/orders/manager/redux';

// Các saga của màn hình view Hoá đơn (Invoice)
import {watchInvoiceOrderSaga} from 'views/invoice/manager/redux';

// Các saga của màn hình view Vận đơn (DeliveryOrder)
import {watchDeliveryOrderSaga} from 'views/delivery/manager/redux';

// Các saga của màn hình view Nhập hàng (ImportOrder)
import {watchImportOrderSaga} from 'views/warehouse/imports/manager/redux';
import {watchListImportCate, watchListBrands} from 'views/warehouse/imports/categorys/redux';
import {watchListProductImport} from 'views/warehouse/imports/addImport/redux';

// Các saga của màn hình view Chuyển hàng (ExportOrder)
import {watchExportOrderSaga} from 'views/warehouse/exports/manager/redux';
import {watchExportListCreate} from 'views/warehouse/exports/createExports/redux';
import {watchListExportCate, watchExportListBrands} from 'views/warehouse/exports/categorys/redux';
// Các saga của màn hình view Mã giảm giá (VoucherList)
import {watchListVoucherSaga, watchVoucherDetailSaga} from 'views/ctkm/vouchers/manager/redux';

// Các saga của màn hình view Quản lý nhân viên (QLNhanvien)
import {watchAllNhanVien, watchListNhanVien} from 'views/employees/QLNhanVien/redux';

// Các saga của màn hình view Quản lý chi nhánh (ManagerBranch)
import {watchListManagerBranch} from 'views/store/managerBranch/redux';

// Các saga của màn hình view Sổ quỹ (PaymentHome)
import {watchPaymentSaga} from 'views/soquy/list/redux';

// Các saga của màn hình view Báo cáo  ()
// Các màn reducer của màn hình user
import {
  watchUpdateInfoPersonalSaga,
  watchChangePassPersonalSaga,
  watchInfoPersonalSaga
} from 'views/personals/redux';

// NOTE cac man hinh bao cao hang hoa, ban hang
import {watchListBCHangHoa} from 'views/reports/BCHangHoa/redux';
import {
  watchDoanhThuTheoThoiGianStackBarBCBH,
  watchDoanhThuTheoStorePieChartBCBH,
  watchDoanhThuLoiNhuanGiaVonLineChartBCBH,
  watchStaffBestSaleBCBH
} from 'views/reports/BCBanHang/redux';
import {
  watchTongKetPTTT,
  watchTongKetDatHang,
  watchTongKetHoaDon,
  watchTongKetThuChi,
  watchTongKetTraHang
} from 'views/reports/BCCuoiNgay/redux/BCCuoiNgay.Saga';
import {watchDetailBCHHSaga} from 'views/reports/BCHangHoa/detailBCHangHoa/redux';
// NOTE cac man hinh Tra Hang
import {watchReturnOrderSaga} from 'views/trahang/manager/redux';
import {watchListProductCategory} from 'views/warehouse/chonHangHoa/Productcategory/redux';

export default function* rootSaga() {
  yield all([
    // Các saga của màn hình view dashboard
    fork(watchListDatHangCuaHang),
    fork(watchListTonKhoCuaHang),
    fork(watchDoanhThuTheoStorePieChartDashBoard),
    fork(watchDoanhThuTheoThoiGianStackBarDashBoard),
    // Các saga của màn hình view  Hoá đơn tạm

    // Các saga của màn hình view Trả hàng

    // Các saga của màn hình view Khách hàng
    fork(watchListCustomer),
    fork(watchLoadMoreCustomer),
    // Các saga của màn hình view Nhà cung cấp (Suppliers)
    fork(watchListSuppliers),

    // Các saga của màn hình view Bán hàng
    fork(watchListProductBanHang),

    // Các saga của màn hình view Hàng hoá
    fork(watchListProductHangHoa),

    // Các saga của màn hình view  Hàng hoá (ProductCategorys)
    fork(watchListCategory),
    fork(watchListBangGia),
    fork(watchListKenhBan),
    fork(watchThanhToanHoaDon),

    // Các saga của màn hình view Kiểm kho (Inventory)
    fork(watchListInventory),
    // Các saga của màn hình view Đặt hàng (Order)
    fork(watchOrderSaga),
    // Các saga của màn hình view Hoá đơn (Invoice)
    fork(watchInvoiceOrderSaga),
    // Các saga của màn hình view Vận đơn (DeliveryOrder)
    fork(watchDeliveryOrderSaga),

    // Các saga của màn hình view Nhập hàng (ImportOrder)
    fork(watchImportOrderSaga),
    fork(watchListImportCate),
    fork(watchListBrands),
    fork(watchListProductImport),

    // Các saga của màn hình view Chuyển hàng (ExportOrder)
    fork(watchExportOrderSaga),
    fork(watchListExportCate),
    fork(watchExportListBrands),
    fork(watchExportListCreate),

    // Các saga của màn hình view Mã giảm giá (VoucherList)
    fork(watchVoucherDetailSaga),
    fork(watchListVoucherSaga),

    // Các saga của màn hình view Quản lý nhân viên (QLNhanvien)
    fork(watchListNhanVien),
    fork(watchAllNhanVien),

    // Các saga của màn hình view Quản lý chi nhánh (ManagerBranch)
    fork(watchListManagerBranch),

    // Các saga của màn hình view Sổ quỹ (PaymentHome)
    fork(watchPaymentSaga),
    fork(watchTongKetThuChi),
    fork(watchTongKetHoaDon),
    fork(watchTongKetDatHang),
    fork(watchTongKetTraHang),
    fork(watchTongKetPTTT),

    // Các saga của màn hình view Báo cáo  ()
    // Các màn reducer của màn hình user
    fork(watchUpdateInfoPersonalSaga),
    fork(watchChangePassPersonalSaga),
    fork(watchInfoPersonalSaga),

    // NOTE cac man hinh bao cao hang hoa, ban hang
    fork(watchListBCHangHoa),
    fork(watchDoanhThuTheoThoiGianStackBarBCBH),
    fork(watchDoanhThuTheoStorePieChartBCBH),
    fork(watchDoanhThuLoiNhuanGiaVonLineChartBCBH),
    fork(watchStaffBestSaleBCBH),
    fork(watchDetailBCHHSaga),

    // NOTE cac man hinh Tra Hang
    fork(watchReturnOrderSaga),
    fork(watchListProductCategory),
    fork(watchTop10ForSale),
    fork(watchTop10ForQty)
  ]);
}
