import {KIND_OF_SCREEN, TYPE_BCBH_DETAIL, TYPE_MODAL} from 'common/Constants';
import {ICategoryModel} from 'models/Category.Model';
import {CustomerModel} from 'models/Customer.Model';
import {IStorePerson} from 'models/ModelBase';
import {PaymentModel} from 'models/Order.Model';
import {IStaffModel} from 'models/Staff.Model';
import {IStoreModel} from 'models/Store.Model';
import {MOI_QUAN_TAM} from 'services/DashBoard.Api';
import {IDateFilterType, IDateRange, IPropsButtonSheet, TIME_TYPE} from 'views/app';

export type RouterParamsList = {
  DashBoard: undefined;
  Invoice: {isFromReport: boolean};
  ProductHangHoa: undefined;
  Notification: undefined;
  Menu: undefined;
  Splash: undefined;
  Login: undefined;
  PersonalView: undefined;
  SelectDateRange: undefined;
  Home: undefined;
  BCHangHoa: undefined;
  FilterBCHangHoa: undefined;
  FilterBCBanHang: undefined;
  BCBanHang: undefined;
  BaoCaoCuoiNgay: undefined;
  LocBCCuoiNgay: undefined;
  CustomersDetail: {idCustomer?: number};
  FilterCustomer: undefined;
  AddCustomer: undefined | {type: 'UPDATE' | string; InfoCustomerUpdate: CustomerModel};
  CreateGroupCustomer: undefined;
  SuppliersDetail: {idCustomer: string};
  FilterSupplier: undefined;
  AddSuppliers: undefined | {type: 'UPDATE'; InfoSupplierUpdate: CustomerModel};
  CreateGroupSupplier: undefined;
  Categorys: {arrCate?: ICategoryModel[]; screen: string};
  ProductDetail: {idCha: number; idCon?: number};
  BangGiaChung: undefined;
  CreateSale: undefined;
  KenhBan: undefined;
  ThanhToanBanHang: undefined;
  ListDoiTacGiaoHang: undefined;
  InforShipping: undefined;
  FormPayment: undefined;
  InventoryTaoPhieu: undefined;
  FilterBanHang: undefined;
  FilterHangHoa: undefined;
  InventoryFilter: undefined;
  InventoryDetail: {IdInventory: number};
  DetailsOrder: {id: string};
  FilterList: {kind: string};
  FilterOrder: undefined;
  DetailsInvoice: {id: string};
  FilterListInvoice: undefined;
  FilterInvoice: undefined;
  DetailsDelivery: {id: string; type: KIND_OF_SCREEN};
  FilterDelivery: undefined;
  ImportCreateView: undefined;
  DetailsOrderImport: {id: string; type: string};
  ImportFilter: undefined;
  AddImport: undefined;
  SuppliersImport: {type: string};
  CateAndBrands: undefined;
  ImportCate: {cate?: ICategoryModel};
  ImportBrands: undefined | {kind: string};
  PaymentImport: undefined;
  DetailsOrderExport: {id: string; type: string};
  FilterExport: undefined;
  CreateExport: undefined;
  ManagerBranchExport: {type: string};
  AddManagerBranch: {isUpdateBrands?: boolean; itemUpdate?: Partial<IStoreModel>; onSelect: any};
  ExportCateAndBrands: undefined;
  ExportCategory: {cate?: ICategoryModel};
  ExportBrands: undefined | {kind: string};
  InfoPhieuChuyen: undefined;
  VoucherDetail: {id?: number};
  TaoVoucher: undefined;
  FilterVoucherList: undefined;
  NhanvienDetail: {id: number | string; itemDetail?: IStaffModel};
  BranchDetail: {id: number};
  FilterBrand: undefined;
  PaymentDetails: {id: string};
  PaymentOfOrder: {list: PaymentModel[]};
  FilterSoQuy: undefined;
  Order: {isFromReport: boolean};
  Customer: {type: 'KHACH_HANG' | 'CHON_KHACH_HANG'};
  ProductBanHang: undefined | {type: string};
  Suppliers: {type: string};
  Wholesale: undefined;
  Inventory: undefined;
  DeliveryOrder: undefined;
  ImportOrder: undefined;
  ExportOrder: undefined;
  VoucherList: undefined;
  QLNhanVien: undefined;
  ManagerBranch: undefined | {type: 'CHUYEN_HANG' | null};
  PaymentHome: {isFromReport: boolean};
  DetailsTraHang: {id: string};
  FilterTraHang: undefined;
  DetailBCBanHang: {checkView: TYPE_BCBH_DETAIL};
  ItemTable: {
    type?: TIME_TYPE;
    min_tineItemTable?: string;
    max_tineItemTable?: string;
    store?: string;
  };
  DetailBCNVBanHang: undefined;
  ReturnOrder: {isFromReport: boolean};
  DetailBCHangHoa: {view: number; sort_by: string};
  FilterDetailBCHH: {view: MOI_QUAN_TAM; sort_by: string};
};

export type RouterModalParamsList = {
  MenuLeftHeaderModal: undefined;
  ModalCreator: {
    checkCreator: string;
    valueModal: (text: any) => void;
  };
  ModalNKH: {
    valueModal: (text: string, index: number) => void;
    checkGroup: string;
    type: 'customer' | 'supplier';
  };
  MyStoreMultiplePicker: {
    storeDaChon: IStorePerson[];
    onApDung: (arrStore: IStorePerson[]) => void;
  };
  MyBottomSheetPicker: {
    title?: string;
    titleButtonCancel: string;

    arrayButton: IPropsButtonSheet[];
  };
  MyFromToDatePicker: {
    onApDung: (dateRange: IDateRange, dateFilterType?: IDateFilterType) => void;
    mode?: 'date' | 'time' | 'datetime';
    dateFilterType?: IDateFilterType;
    khoangThoiGian?: IDateRange;
  };
  MyCheckAppModal: {
    nameConfig: TYPE_MODAL;
    url_app?: string;
    content?: string;
    is_required?: boolean;
  };
  MyDatePickerModal: {
    title: string;
    titleButtonChange: string;
    titleButtonCancel: string;
    onChange: (birthday: Date | string) => void;
    value?: Date;
    mode?: 'date' | 'time' | 'datetime';
  };
  ModalKenhBan: {
    onSubmitKB: (value: number[]) => void;
    arrChannels: number[];
  };
  ModalNhomHang: {
    onChooseItem: (name: string, id: string) => void;
    idCheckNhomHang: number;
  };
  ModalListPrice: undefined;
};

export type RootParamsList = RouterParamsList & RouterModalParamsList;

export type SCREEN =
  | 'ProductBanHang'
  | 'Invoice'
  | 'Order'
  | 'ReturnOrder'
  | 'Customer'
  | 'Suppliers'
  | 'DeliveryOrder'
  | 'Inventory'
  | 'ExportOrder'
  | 'ImportOrder'
  | 'ManagerBranch'
  | 'VoucherList'
  | 'QLNhanVien'
  | 'PaymentHome';
