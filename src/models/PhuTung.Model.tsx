export interface IPhuTungModel {
  id: number;
  name: string;
  sku: string;
  price: number;
  thumbnail_url: string;
  total_quantity: number;
}

export interface IProductPhuTung {
  phuTung?: IPhuTungModel;
  totalQty: number;
}
