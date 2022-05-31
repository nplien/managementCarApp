import {CustomerModel, IAddressModel} from 'models/Customer.Model';
import {IProvince} from 'models/ModelBase';

export interface IInforShippingState {
  storeInforShip?: IAddressModel;
  objInforShip?: IRequestShip;
  inforCustomerShip?: IAddressModel;
  objDoiTacGiaoHang?: IRequestShip;
}

export interface IInforShippingAction {
  type: string;
  payload: IInforShippingState;
}

export interface IRequestShip {
  // thong tin khach hang
  customer?: CustomerModel;

  // dia chi cua hang
  sender_address?: string; // địa chỉ của hàng
  sender_province?: IProvince; // tỉnh cửa hàng
  sender_district?: IProvince; // huyện cửa hàng
  sender_ward?: IProvince; // xã của hàng

  // thong tin cua hang
  sender_name?: string; // địa chỉ của hàng
  sender_phone?: string; // số điện thoại cửa hàng

  // dia chi nguoi nhan
  receiver_address?: string; // địa chỉ người nhận
  receiver_province?: IProvince; //tỉnh người nhận
  receiver_district?: IProvince; // huyện người nhận
  receiver_ward?: IProvince; // xã người nhận

  // thong tin nguoi nhan
  receiver_name?: string; // tên người nhận
  receiver_phone?: string; //số điện thoại người nhận
  receiver_note?: string; // hình thức khi giao cho khách( có cho nguười nhạn dùng thử hay là không cho xem)

  // thong tin cod
  is_has_cod?: boolean; // thu tiền hộ hay không (COD)
  total_shipping_cod?: number; // tong tien don hang

  // thong tin khai gia
  is_has_insurrance?: boolean; // bảo hiểm khi giao hàng
  total_insurrance_price?: number; //khai gia

  // thong tin goi hang
  weight?: number; // trọng lượng;
  width?: number; // chiều   rộng;
  length?: number; // chiều dài gói hàng
  height?: number; // chiều cao của gói hàng
  total_order_price?: number; // tong don hang

  type?: string;
  payment_by?: string; // người trả phí (người nhận, người gửi)

  service_id?: string; // id đối tác giao hàng
  service_name?: string; // tên đối tác giao hàng
  provider_code?: string; // mã loại giao hàng
  provider_name?: string; // tên loại giao hàng
  total_shipping_fee?: number; // phi van chuyen

  service_price?: number; //  bien dung de ve view, bang gia tri total_shipping_fee
}

export interface IDoiTacGiaoHang {
  id: number;
  icon: string;
  type: string;
  code: string;
  name: string;
  description: string;
  service_price: number;
  provider_code: string;
  provider_name: string;
}
