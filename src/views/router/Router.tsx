import React, {PureComponent} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import {register} from 'react-native-bundle-splitter';
import MyNavigator from 'utils/MyNavigator';
import Utilities from 'utils/Utilities';
import {COLOR, MY_SIZE, setPadding} from 'bases/styles/Core';
import RouteBottomBar from './RouteBottomBar';
import Splash from 'views/splash/Splash';
import {MyButtonIcon} from 'bases/components';
import Toolbar from './Toolbar';
import MyCheckAppModal from 'views/app/components/customs/checkApp/MyCheckAppModal';
import MyDatePickerModal from 'bases/components/picker/MyDatePickerModal';
import tw from 'utils/tailwind';
import PhieuSuaChua from 'views/phieuSuaChua/PhieuSuaChua';
import AddPhieuSuaChua from 'views/phieuSuaChua/addPhieuSuaChua/AddPhieuSuaChua';
import TiepNhanXe from 'views/tiepNhanXe/TiepNhanXe';
import AddTiepNhanXe from 'views/tiepNhanXe/addTiepNhanXe/AddTiepNhanXe';
import TypeCarModal from 'views/tiepNhanXe/addTiepNhanXe/components/TypeCarModal';
import CreatedPSC from 'views/createPSC/CreatedPSC';
import ThanhToanPSC from 'views/createPSC/ThanhToanPSC';
import DetailPSC from 'views/phieuSuaChua/detialPSC/DetailPSC';
import PhuTung from 'views/phuTung/PhuTung';
import AddPhuTung from 'views/phuTung/AddPhuTung';

const Login = register({loader: () => import('views/account/Login')});
const PersonalView = register({
  loader: () => import('views/personals/PersonalView')
});
const SelectDateRange = register({
  loader: () => import('views/app/components/customs/SelectDateRange')
});
const FilterBanHang = register({
  loader: () => import('views/banhang/FilterBanHang/FilterBanHang')
});
const ProductBanHang = register({
  loader: () => import('views/banhang/ProductBanHang/ProductBanHang')
});
const FilterHangHoa = register({
  loader: () => import('views/products/FilterHangHoa/FilterHangHoa')
});
const Order = register({loader: () => import('views/orders/manager/Order')});
const Customer = register({loader: () => import('views/customers/manager/Customers')});
const Suppliers = register({loader: () => import('views/suppliers/manager/Suppliers')});
// const Wholesale = register({loader: () => import('views/wholesales/manager/Wholesale')});
const ManagerBranch = register({loader: () => import('views/store/managerBranch/ManagerBranch')});
const CustomersDetail = register({loader: () => import('views/customers/detail/CustomersDetail')});
const FilterCustomer = register({loader: () => import('views/customers/filter/FilterCustomer')});

const AddCustomer = register({
  loader: () => import('views/customers/manager/components/AddCustomer')
});
const CreateGroupCustomer = register({
  loader: () => import('views/customers/filter/components/CreateGroupSupplier')
});
const SuppliersDetail = register({loader: () => import('views/suppliers/detail/SuppliersDetail')});
const FilterSupplier = register({loader: () => import('views/suppliers/filter/FilterSupplier')});
const AddSuppliers = register({
  loader: () => import('views/suppliers/manager/components/AddSuppliers')
});
const CreateGroupSupplier = register({
  loader: () => import('views/suppliers/filter/components/CreateGroupSupplier')
});
// c??c m??n h??nh ??i ra t??? m??n Wholesale
// const DetailWhoSale = register({loader: () => import('views/wholesales/detail/DetailWhosale')});
// const FilterWholesale = register({loader: () => import('views/wholesales/filter/FilterWholesale')});
// const SortWholesale = register({loader: () => import('views/wholesales/sort/SortWholesale')});
// const AddWholesale = register({
//   loader: () => import('views/wholesales/manager/components/AddWholesale')
// });
const ProductDetail = register({
  loader: () => import('views/products/ProductDetail/ProductDetail')
});
const Categorys = register({loader: () => import('views/categorys/Category')});
const BangGiaChung = register({loader: () => import('views/banhang/bangGiaChung/BangGiaChung')});
const CreateSale = register({loader: () => import('views/banhang/createSale/CreateSale')});
const KenhBan = register({loader: () => import('views/banhang/kenhBan/KenhBan')});
const InforShipping = register({loader: () => import('views/banhang/inforShipping/InforShipping')});
const FormPayment = register({loader: () => import('views/banhang/formPayment/FormPayment')});
const ThanhToanBanHang = register({
  loader: () => import('views/banhang/thanhToanBanHang/ThanhToanBanHang')
});
const ListDoiTacGiaoHang = register({
  loader: () => import('views/banhang/inforShipping/components/ListDoiTacGiaoHang')
});

const InventoryDetail = register({
  loader: () => import('views/kiemkho/InventoryDetail/InventoryDetail')
});
const InventoryFilter = register({
  loader: () => import('views/kiemkho/InventoryFilter/InventoryFilter')
});
const DetailsOrder = register({loader: () => import('views/orders/detailsOrder/DetailsOrder')});

const FilterOrder = register({
  loader: () => import('views/orders/manager/filterOrder/FilterOrder')
});
const DetailsInvoice = register({
  loader: () => import('views/invoice/detailsInvoice/DetailsInvoice')
});
const FilterInvoice = register({
  loader: () => import('views/invoice/manager/filter/FilterInvoice')
});
const DetailsDelivery = register({loader: () => import('views/delivery/detail/DetailsDelivery')});
const FilterDelivery = register({loader: () => import('views/delivery/filter/FilterDelivery')});
const ImportCreateView = register({
  loader: () => import('views/warehouse/imports/manager/components/ImportCreateView')
});
const DetailsOrderImport = register({
  loader: () => import('views/warehouse/imports/detail/DetailsOrderImport')
});
const ImportFilter = register({
  loader: () => import('views/warehouse/imports/manager/filter/ImportFilter')
});
const AddImport = register({loader: () => import('views/warehouse/imports/addImport/AddImport')});
const CateAndBrands = register({
  loader: () => import('views/warehouse/imports/categorys/CateAndBrands')
});
const ImportCategory = register({
  loader: () => import('views/warehouse/imports/categorys/ImportCategory')
});
const ImportBrands = register({
  loader: () => import('views/warehouse/imports/categorys/ImportBrands')
});
const PaymentImport = register({
  loader: () => import('views/warehouse/imports/paymentImport/PaymentImport')
});
const DetailsOrderExport = register({
  loader: () => import('views/warehouse/exports/detail/DetailsOrderExport')
});
const FilterExport = register({
  loader: () => import('views/warehouse/exports/manager/filter/FilterExport')
});
const CreateExport = register({
  loader: () => import('views/warehouse/exports/createExports/createExport')
});
const ExportCateAndBrands = register({
  loader: () => import('views/warehouse/exports/categorys/ExportCateAndBrands')
});
const ExportCategory = register({
  loader: () => import('views/warehouse/exports/categorys/ExportCategory')
});
const ExportBrands = register({
  loader: () => import('views/warehouse/exports/categorys/ExportBrands')
});
const InfoPhieuChuyen = register({
  loader: () => import('views/warehouse/exports/createExports/components/InfoPhieuchuyen')
});
const VoucherDetail = register({loader: () => import('views/ctkm/vouchers/detail/VoucherDetail')});
const TaoVoucher = register({loader: () => import('views/ctkm/taoVoucher/TaoVoucher')});
const FilterVoucherList = register({
  loader: () => import('views/ctkm/vouchers/manager/filter/FilterVoucherList')
});
const NhanvienDetail = register({
  loader: () => import('views/employees/NhanVienDetail/NhanVienDetail')
});
const BranchDetail = register({loader: () => import('views/store/branchDetail/BranchDetail')});
const FilterBrand = register({
  loader: () => import('views/store/managerBranch/component/FilterBrand')
});
const PaymentDetails = register({
  loader: () => import('views/soquy/detail/PaymentDetails')
});
const PaymentOfOrder = register({
  loader: () => import('views/soquy/list/components/PaymentOfOrder')
});
const FilterSoQuy = register({loader: () => import('views/soquy/filter/FilterSoQuy')});
const AddManagerBranch = register({loader: () => import('views/store/addBranch/AddManagerBranch')});
const Inventory = register({loader: () => import('views/kiemkho/Inventory/Inventory')});
const DeliveryOrder = register({loader: () => import('views/delivery/manager/DeliveryOrder')});
const ImportOrder = register({loader: () => import('views/warehouse/imports/manager/ImportOrder')});
const ExportOrder = register({loader: () => import('views/warehouse/exports/manager/ExportOrder')});
const VoucherList = register({loader: () => import('views/ctkm/vouchers/manager/VoucherList')});
const QLNhanVien = register({loader: () => import('views/employees/QLNhanVien/QLNhanVien')});
const SoQuy = register({loader: () => import('views/soquy/list/SoQuy')});
const BCHangHoa = register({
  loader: () => import('views/reports/BCHangHoa/BCHangHoa')
});
const FilterBCHangHoa = register({
  loader: () => import('views/reports/BCHangHoa/components/LocBCHangHoa')
});
const BCBanHang = register({
  loader: () => import('views/reports/BCBanHang/BCBanHang')
});

const FilterBCBanHang = register({
  loader: () => import('views/reports/BCBanHang/LocBCBanHang/FilterBCBanHang')
});
const BaoCaoCuoiNgay = register({
  loader: () => import('views/reports/BCCuoiNgay/BCCuoiNgay')
});

const LocBCCuoiNgay = register({
  loader: () => import('views/reports/BCCuoiNgay/components/locBCCuoiNgay/LocBCCuoiNgay')
});
const DetailsTraHang = register({
  loader: () => import('views/trahang/detailsInvoice/DetailsTraHang')
});

const FilterTraHang = register({
  loader: () => import('views/trahang/manager/filter/FilterTraHang')
});
const ReturnOrder = register({
  loader: () => import('views/trahang/manager/ReturnOrder')
});
const DetailBCHangHoa = register({
  loader: () => import('views/reports/BCHangHoa/detailBCHangHoa/DetailBCHangHoa')
});
const FilterDetailBCHH = register({
  loader: () => import('views/reports/BCHangHoa/detailBCHangHoa/filter/FilterDetailBCHH')
});
const DetailBCBanHang = register({
  loader: () => import('views/reports/BCBanHang/detail/DetailBCBanHang')
});
const ItemTable = register({
  loader: () => import('views/reports/BCBanHang/detail/components/ItemTable')
});
const DetailBCNVBanHang = register({
  loader: () => import('views/reports/BCBanHang/detail/DetailBCNVbanHang')
});
const Invoice = register({loader: () => import('views/invoice/manager/Invoice')});
const MenuLeftHeaderModal = register({
  loader: () => import('views/menuLeft/components/ModalStoreHeader')
});
const ModalCreator = register({
  loader: () => import('views/customers/filter/components/ModalCreator')
});
const ModalNKH = register({
  loader: () => import('views/customers/filter/components/ModalNKH')
});
const MyStoreMultiplePicker = register({
  loader: () => import('views/app/components/customs/MyStoreMultiplePicker')
});
const MyBottomSheetPicker = register({
  loader: () => import('bases/components/picker/MyBottomSheetPicker')
});
const MyFromToDatePicker = register({
  loader: () => import('bases/components/picker/MyFromToDatePicker')
});
const ModalKenhBan = register({
  loader: () => import('views/reports/BCBanHang/detail/components/ModalKenhBan')
});
const ModalNhomHang = register({
  loader: () => import('views/reports/BCHangHoa/components/ModalNhomHang')
});
const ListPriceModal = register({
  loader: () => import('views/reports/BCBanHang/LocBCBanHang/ListPriceModal')
});

const RootStack = createStackNavigator();

class Router extends PureComponent {
  handleScreenName = () => {
    try {
      const previousRouteName = MyNavigator.getPreviousScreen();
      const currentRouteName = MyNavigator.rootNavigator.getCurrentRoute()?.name || '';
      if (previousRouteName !== currentRouteName) {
        Utilities.logAnalytics(`Screen_Of_${currentRouteName}`);
      }
      if (__DEV__) console.log(currentRouteName);
    } catch (error) {
      if (__DEV__) console.log(error);
    }
  };
  render() {
    return (
      <NavigationContainer ref={MyNavigator.rootNavigator} onStateChange={this.handleScreenName}>
        <RootStack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerStyle: {backgroundColor: COLOR.BG.WHITE},
            headerTitleStyle: {color: COLOR.TEXT.BLACK},
            headerTintColor: COLOR.TEXT.BLACK,
            headerBackTitleVisible: false // bat/tat ten man hinh truoc do tren ios o phim back tren toolbar
          }}>
          <RootStack.Group
            screenOptions={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}>
            {/* 2 m??n h??nh ban ?????u */}
            <RootStack.Screen name="Splash" component={Splash} options={{headerShown: false}} />
            <RootStack.Screen name="Login" component={Login} options={{headerShown: false}} />
            {/* c??c m??n h??nh n???m header c???a Menu left */}
            {/* m??n h??nh hi???n th??? th??ng tin c?? nh??n */}
            <RootStack.Screen
              name="PersonalView"
              component={PersonalView}
              options={{title: 'Th??ng tin c?? nh??n'}}
            />
            {/* m??n h??nh ch???n kho???ng th???i gian */}
            <RootStack.Screen
              name="SelectDateRange"
              component={SelectDateRange}
              options={{title: 'T??y ch???n ng??y'}}
            />
            <RootStack.Screen
              name="Home"
              options={{
                header: props => <Toolbar {...props} />
              }}
              component={RouteBottomBar}
            />
            <RootStack.Screen
              name="BCHangHoa"
              options={{
                title: 'B??o c??o h??ng ho??',
                headerRight: () => (
                  <MyButtonIcon
                    style={{...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)}}
                    iconFontType="AntDesign"
                    iconProps={{name: 'filter', size: 24, color: COLOR.TEXT.BLACK}}
                    onPress={() => {
                      MyNavigator.navigate('FilterBCHangHoa');
                    }}
                  />
                )
              }}
              component={BCHangHoa}
            />
            <RootStack.Screen
              name="FilterBCHangHoa"
              options={{
                title: 'B??? l???c H??ng ho??'
              }}
              component={FilterBCHangHoa}
            />
            <RootStack.Screen
              name="FilterBCBanHang"
              options={{
                title: 'B??? l???c B??n h??ng'
              }}
              component={FilterBCBanHang}
            />
            <RootStack.Screen
              name="BCBanHang"
              options={{
                title: 'B??o c??o B??n h??ng',
                headerRight: () => (
                  <MyButtonIcon
                    style={{...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)}}
                    iconFontType="AntDesign"
                    iconProps={{name: 'filter', size: 24, color: COLOR.TEXT.BLACK}}
                    onPress={() => {
                      MyNavigator.navigate('FilterBCBanHang');
                    }}
                  />
                )
              }}
              component={BCBanHang}
            />
            <RootStack.Screen name="DetailBCBanHang" component={DetailBCBanHang} />
            <RootStack.Screen name="DetailBCNVBanHang" component={DetailBCNVBanHang} />
            <RootStack.Screen name="ItemTable" component={ItemTable} />
            <RootStack.Screen
              name="BaoCaoCuoiNgay"
              options={{
                title: 'B??o c??o cu???i ng??y',
                headerRight: () => (
                  <MyButtonIcon
                    style={{...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)}}
                    iconFontType="AntDesign"
                    iconProps={{name: 'filter', size: 24, color: COLOR.TEXT.BLACK}}
                    onPress={() => {
                      MyNavigator.navigate('LocBCCuoiNgay');
                    }}
                  />
                )
              }}
              component={BaoCaoCuoiNgay}
            />
            <RootStack.Screen
              name="LocBCCuoiNgay"
              options={{
                title: 'B??o c??o cu???i ng??y'
              }}
              component={LocBCCuoiNgay}
            />
            {/* c??c m??n h??nh trong RootStack, ??i ra t??? c??c m??n h??nh trong Menu left */}
            {/* c??c m??n h??nh ??i ra t??? m??n Customers */}
            <RootStack.Screen
              name="CustomersDetail"
              component={CustomersDetail}
              options={({route, navigation}) => ({
                headerTitle: 'Th??m nh?? cung c???p',
                route: {route},
                navigation: {navigation}
              })}
            />
            <RootStack.Screen
              name="FilterCustomer"
              component={FilterCustomer}
              options={{title: 'T??m ki???m v?? l???c'}}
            />
            <RootStack.Screen
              name="AddCustomer"
              component={AddCustomer}
              // options={({route, navigation}) => ({
              //   route: {route},
              //   navigation: {navigation}
              // })}
            />
            <RootStack.Screen
              name="CreateGroupCustomer"
              component={CreateGroupCustomer}
              options={{title: 'Th??m m???i nh??m kh??ch h??ng'}}
            />
            {/* c??c m??n h??nh ??i ra t??? m??n Suppliers */}
            <RootStack.Screen
              name="SuppliersDetail"
              component={SuppliersDetail}
              options={{title: 'Th??ng tin nh?? cung c???p'}}
            />
            <RootStack.Screen
              name="FilterSupplier"
              component={FilterSupplier}
              options={{title: 'T??m ki???m v?? l???c'}}
            />
            <RootStack.Screen name="AddSuppliers" component={AddSuppliers} />
            <RootStack.Screen
              name="CreateGroupSupplier"
              component={CreateGroupSupplier}
              options={{title: 'Th??m nh??m nh?? cung c???p'}}
            />
            {/* c??c m??n h??nh ??i ra t??? m??n ProductCategorys */}
            <RootStack.Screen
              name="Categorys"
              component={Categorys}
              options={{title: 'Danh m???c h??ng h??a'}}
            />
            <RootStack.Screen
              name="ProductDetail"
              component={ProductDetail}
              options={{title: 'Chi ti???t h??ng ho??'}}
            />
            <RootStack.Screen
              name="BangGiaChung"
              component={BangGiaChung}
              options={{title: 'Ch???n b???ng gi??'}}
            />
            <RootStack.Screen
              name="CreateSale"
              options={{title: 'T???o ho?? ????n', gestureEnabled: false}}
              component={CreateSale}
            />
            <RootStack.Screen
              name="ProductBanHang"
              component={ProductBanHang}
              options={{headerTitle: 'Ch???n h??ng ho??'}}
            />
            <RootStack.Screen
              name="KenhBan"
              component={KenhBan}
              options={{title: 'Ch???n k??nh b??n'}}
            />
            <RootStack.Screen
              name="ThanhToanBanHang"
              component={ThanhToanBanHang}
              options={{title: 'Thanh to??n'}}
            />
            <RootStack.Screen
              name="ListDoiTacGiaoHang"
              component={ListDoiTacGiaoHang}
              options={{title: '?????i t??c giao h??ng'}}
            />
            <RootStack.Screen
              name="InforShipping"
              component={InforShipping}
              options={{title: 'Chi ti???t ????n giao h??ng'}}
            />
            <RootStack.Screen
              name="FormPayment"
              component={FormPayment}
              options={{title: 'Ph????ng th???c thanh to??n'}}
            />
            {/* c??c m??n h??nh ??i ra t??? m??n B??n H??ng */}
            <RootStack.Screen
              name="FilterBanHang"
              component={FilterBanHang}
              options={{title: 'T??m h??ng h??a'}}
            />
            {/* c??c m??n h??nh ??i ra t??? m??n H??ng ho?? */}
            <RootStack.Screen
              name="FilterHangHoa"
              component={FilterHangHoa}
              options={{title: 'T??m h??ng h??a'}}
            />
            {/* c??c m??n h??nh ??i ra t??? m??n Inventory */}
            <RootStack.Screen
              name="InventoryFilter"
              component={InventoryFilter}
              options={{title: 'T??m phi???u ki???m'}}
            />
            <RootStack.Screen
              name="InventoryDetail"
              component={InventoryDetail}
              options={{title: 'Chi ti???t phi???u ki???m'}}
            />
            {/* c??c m??n h??nh ??i ra t??? m??n Order */}
            <RootStack.Screen
              name="DetailsOrder"
              component={DetailsOrder}
              options={{title: 'Chi ti???t ????n ?????t h??ng'}}
            />
            <RootStack.Screen
              name="FilterOrder"
              component={FilterOrder}
              options={{title: 'T??m ki???m v?? l???c'}}
            />
            {/* c??c m??n h??nh ??i ra t??? m??n Invoice */}
            <RootStack.Screen
              name="DetailsInvoice"
              component={DetailsInvoice}
              options={{title: 'Chi ti???t ho?? ????n'}}
            />
            <RootStack.Screen
              name="FilterInvoice"
              component={FilterInvoice}
              options={{title: 'T??m ki???m v?? l???c'}}
            />
            {/* c??c m??n h??nh ??i ra t??? m??n DeliveryOrder */}
            <RootStack.Screen
              name="DetailsDelivery"
              component={DetailsDelivery}
              options={{title: 'Chi ti???t v???n ????n'}}
            />
            <RootStack.Screen
              name="FilterDelivery"
              options={{title: 'T??m ki???m v?? l???c'}}
              component={FilterDelivery}
            />
            {/* c??c m??n h??nh ??i ra t??? m??n ImportOrder */}
            <RootStack.Screen
              name="ImportCreateView"
              component={ImportCreateView}
              options={{headerShown: false}}
            />
            <RootStack.Screen
              name="DetailsOrderImport"
              component={DetailsOrderImport}
              options={{title: 'Chi ti???t nh???p h??ng'}}
            />
            <RootStack.Screen
              name="ImportFilter"
              options={{title: 'T??m ki???m v?? l???c'}}
              component={ImportFilter}
            />
            <RootStack.Screen
              name="AddImport"
              options={{title: 'T???o phi???u nh???p h??ng'}}
              component={AddImport}
            />
            <RootStack.Screen
              name="SuppliersImport"
              component={Suppliers}
              options={{headerTitle: 'Nh?? cung c???p'}}
            />
            <RootStack.Screen
              name="CateAndBrands"
              component={CateAndBrands}
              options={{headerTitle: 'Ch???n nh??m h??ng'}}
            />
            <RootStack.Screen
              name="ImportCate"
              component={ImportCategory}
              options={{headerTitle: 'Ch???n nh??m h??ng'}}
            />
            <RootStack.Screen
              name="ImportBrands"
              component={ImportBrands}
              options={{headerTitle: 'Ch???n thu??ng hi???u'}}
            />
            <RootStack.Screen
              name="PaymentImport"
              component={PaymentImport}
              options={{headerTitle: 'Thanh to??n'}}
            />
            {/* c??c m??n h??nh ??i ra t??? m??n ExportOrder */}
            <RootStack.Screen
              name="DetailsOrderExport"
              component={DetailsOrderExport}
              options={{title: 'Chi ti???t chuy???n h??ng'}}
            />
            <RootStack.Screen
              name="FilterExport"
              options={{title: 'T??m ki???m v?? l???c'}}
              component={FilterExport}
            />
            <RootStack.Screen
              name="CreateExport"
              options={({route, navigation}) => ({
                headerTitle: 'T???o phi???u chuy???n h??ng',
                route: {route},
                navigation: {navigation}
              })}
              component={CreateExport}
            />
            <RootStack.Screen
              name="ManagerBranchExport"
              component={ManagerBranch}
              options={{headerTitle: 'Qu???n l?? chi nh??nh'}}
            />
            <RootStack.Screen
              name="AddManagerBranch"
              component={AddManagerBranch}
              options={({route, navigation}) => ({
                headerTitle: 'Th??m Qu???n l?? chi nh??nh',
                route: {route},
                navigation: {navigation}
              })}
            />
            <RootStack.Screen
              name="ExportCateAndBrands"
              component={ExportCateAndBrands}
              options={{headerTitle: 'Ch???n nh??m h??ng'}}
            />
            <RootStack.Screen
              name="ExportCategory"
              component={ExportCategory}
              options={{headerTitle: 'Ch???n nh??m h??ng'}}
            />
            <RootStack.Screen
              name="ExportBrands"
              component={ExportBrands}
              options={{headerTitle: 'Ch???n thu??ng hi???u'}}
            />
            <RootStack.Screen
              name="InfoPhieuChuyen"
              component={InfoPhieuChuyen}
              options={{headerTitle: 'Th??ng tin phi???u chuy???n'}}
            />
            {/* c??c m??n h??nh ??i ra t??? m??n VoucherList */}
            <RootStack.Screen
              name="VoucherDetail"
              component={VoucherDetail}
              options={{title: 'Chi ti???t voucher'}}
            />
            <RootStack.Screen
              name="TaoVoucher"
              component={TaoVoucher}
              options={{title: 'T???o m?? gi???m gi??'}}
            />
            <RootStack.Screen
              name="FilterVoucherList"
              component={FilterVoucherList}
              options={{title: 'T??m ki???m'}}
            />
            {/* c??c m??n h??nh ??i ra t??? m??n QLNhanVien */}
            <RootStack.Screen
              name="NhanvienDetail"
              component={NhanvienDetail}
              options={{title: 'Th??ng tin nh??n vi??n'}}
            />
            {/* c??c m??n h??nh ??i ra t??? m??n ManagerBranch */}
            <RootStack.Screen
              name="BranchDetail"
              component={BranchDetail}
              options={({route, navigation}) => ({
                title: 'Chi ti???t chi nh??nh',
                route: {route},
                navigation: {navigation}
              })}
            />
            <RootStack.Screen
              name="FilterBrand"
              component={FilterBrand}
              options={{title: 'T??m Ki???m'}}
            />
            {/* c??c m??n h??nh ??i ra t??? m??n PaymentHome */}
            <RootStack.Screen
              name="PaymentDetails"
              component={PaymentDetails}
              options={{title: 'Chi ti???t phi???u thu'}}
            />
            <RootStack.Screen
              name="PaymentOfOrder"
              component={PaymentOfOrder}
              options={{title: 'Chi ti???t'}}
            />
            <RootStack.Screen
              name="FilterSoQuy"
              options={{title: 'T??m ki???m v?? l???c'}}
              component={FilterSoQuy}
            />
            <RootStack.Screen name="Order" component={Order} options={{headerTitle: '?????t h??ng'}} />
            <RootStack.Screen name="Customer" component={Customer} />
            <RootStack.Screen
              name="ProductCategorysBanHang"
              component={ProductBanHang}
              options={{headerTitle: 'B??n h??ng'}}
            />
            <RootStack.Screen
              name="Suppliers"
              component={Suppliers}
              options={{
                headerTitle: 'Nh?? cung c???p',
                headerRight: () => (
                  <MyButtonIcon
                    style={{...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)}}
                    iconFontType="AntDesign"
                    iconProps={{name: 'plus', size: 24, color: COLOR.TEXT.BLACK}}
                    onPress={() => {
                      MyNavigator.navigate('AddSuppliers');
                    }}
                  />
                )
              }}
            />
            {/* <RootStack.Screen
        name="Wholesale"
        component={Wholesale}
        options={{
          headerTitle: 'Kh??ch b??n bu??n',
          headerRight: () => (
            <ButtonToolbarRouter
              isShowBtnLeft
              isShowBtnRight={false}
              onPressLeft={() => {
                MyNavigator.navigate('AddWholesale');
              }}
            />
          )
        }}
      /> */}
            <RootStack.Screen
              name="Inventory"
              component={Inventory}
              options={{
                headerTitle: 'Ki???m kho'
                // headerRight: () => (
                //   <MyButtonIcon
                //     style={styles.viewRight}
                //     iconProps={{name: 'plus', size: 24}}
                //     iconFontType="AntDesign"
                //     onPress={() => {
                //       MyNavigator.navigate('InventoryTaoPhieu');
                //     }}
                //   />
                // )
              }}
            />
            <RootStack.Screen
              name="DeliveryOrder"
              component={DeliveryOrder}
              options={{headerTitle: 'V???n ????n'}}
            />
            <RootStack.Screen
              name="ImportOrder"
              component={ImportOrder}
              options={{
                headerTitle: 'Nh???p h??ng',
                headerRight: () => (
                  <MyButtonIcon
                    style={tw.style('mx-16px')}
                    iconProps={{name: 'plus', size: 24}}
                    iconFontType="AntDesign"
                    onPress={() => {
                      MyNavigator.navigate('AddImport');
                    }}
                  />
                )
              }}
            />
            <RootStack.Screen
              name="ExportOrder"
              component={ExportOrder}
              options={{
                headerTitle: 'Chuy???n h??ng'
                // headerRight: () => (
                // <MyButtonIcon
                //     style={styles.viewRight}
                //     iconProps={{name: 'plus', size: 24}}
                //     iconFontType="AntDesign"
                //     onPress={() => {
                //       MyNavigator.navigate('CreateExport');
                //     }}
                //   />
                // )
              }}
            />
            <RootStack.Screen
              name="VoucherList"
              component={VoucherList}
              options={{
                headerTitle: 'Qu???n l?? voucher'
                // headerRight: () => (
                // <MyButtonIcon
                //     style={styles.viewRight}
                //     iconProps={{name: 'plus', size: 24}}
                //     iconFontType="AntDesign"
                //     onPress={() => {
                //       MyNavigator.navigate('TaoVoucher');
                //     }}
                //   />
                // )
              }}
            />
            <RootStack.Screen
              name="QLNhanVien"
              component={QLNhanVien}
              options={{headerTitle: 'Qu???n l?? nh??n vi??n'}}
            />
            <RootStack.Screen
              name="ManagerBranch"
              component={ManagerBranch}
              options={{
                headerTitle: 'Qu???n l?? chi nh??nh'
                // headerRight: () => (
                //   <MyButtonIcon
                //     style={styles.viewRight}
                //     iconProps={{name: 'plus', size: 24}}
                //     iconFontType="AntDesign"
                //     onPress={() => {
                //       MyNavigator.navigate('AddManagerBranch');
                //     }}
                //   />
                // )
              }}
            />
            <RootStack.Screen
              name="PaymentHome"
              component={SoQuy}
              options={{headerTitle: 'S??? qu???'}}
            />
            <RootStack.Screen
              name="DetailsTraHang"
              component={DetailsTraHang}
              options={{headerTitle: 'Chi ti???t tr??? h??ng'}}
            />
            <RootStack.Screen
              name="FilterTraHang"
              component={FilterTraHang}
              options={{headerTitle: 'T??m ki???m'}}
            />
            <RootStack.Screen
              name="ReturnOrder"
              component={ReturnOrder}
              options={{headerTitle: 'Tr??? h??ng'}}
            />
            <RootStack.Screen
              name="DetailBCHangHoa"
              component={DetailBCHangHoa}
              options={{headerTitle: 'B??o c??o H??ng ho??'}}
            />
            <RootStack.Screen
              name="FilterDetailBCHH"
              component={FilterDetailBCHH}
              options={{headerTitle: 'T??m ki???m'}}
            />
            <RootStack.Screen
              name="Invoice"
              component={Invoice}
              options={{headerTitle: 'H??a ????n'}}
            />
            <RootStack.Screen name="PhieuSuaChua" component={PhieuSuaChua} />
            <RootStack.Screen
              name="AddPhieuSuaChua"
              component={AddPhieuSuaChua}
              options={{headerTitle: 'Th??m phi???u s???a ch???a'}}
            />
            <RootStack.Screen name="TiepNhanXe" component={TiepNhanXe} />
            <RootStack.Screen
              name="AddTiepNhanXe"
              component={AddTiepNhanXe}
              options={{headerTitle: 'Ti???p nh???n xe'}}
            />
            <RootStack.Screen
              name="CreatedPSC"
              options={{title: 'T???o Phi???u s???a ch???a', gestureEnabled: false}}
              component={CreatedPSC}
            />
            <RootStack.Screen
              name="ThanhToanPSC"
              options={{title: 'Thanh To??n Phi???u s???a ch???a', gestureEnabled: false}}
              component={ThanhToanPSC}
            />
            <RootStack.Screen
              name="DetailPSC"
              options={{title: 'Chi ti???t Phi???u s???a ch???a', gestureEnabled: false}}
              component={DetailPSC}
            />
            <RootStack.Screen
              name="PhuTung"
              options={{title: 'Ph??? T??ng', gestureEnabled: false}}
              component={PhuTung}
            />
            <RootStack.Screen
              name="AddPhuTung"
              options={{title: 'Th??m Ph??? T??ng', gestureEnabled: false}}
              component={AddPhuTung}
            />
          </RootStack.Group>
          <RootStack.Group
            screenOptions={{
              presentation: 'transparentModal',
              animationEnabled: true,
              headerShown: false
            }}>
            <RootStack.Screen name="MenuLeftHeaderModal" component={MenuLeftHeaderModal} />
            <RootStack.Screen name="ModalCreator" component={ModalCreator} />
            <RootStack.Screen name="ModalNKH" component={ModalNKH} />
            <RootStack.Screen name="MyStoreMultiplePicker" component={MyStoreMultiplePicker} />
            <RootStack.Screen name="MyBottomSheetPicker" component={MyBottomSheetPicker} />
            <RootStack.Screen name="MyFromToDatePicker" component={MyFromToDatePicker} />
            <RootStack.Screen
              name="MyCheckAppModal"
              component={MyCheckAppModal}
              options={{gestureEnabled: false}}
            />
            <RootStack.Screen name="MyDatePickerModal" component={MyDatePickerModal} />
            <RootStack.Screen name="ModalKenhBan" component={ModalKenhBan} />
            <RootStack.Screen name="ModalNhomHang" component={ModalNhomHang} />
            <RootStack.Screen name="ModalListPrice" component={ListPriceModal} />
            <RootStack.Screen name="TypeCarModal" component={TypeCarModal} />
          </RootStack.Group>
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Router;
