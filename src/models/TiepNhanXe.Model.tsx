export interface ITiepNhanXeModel {
  id: number;
  name: string;
  phone: string;
  typeCar: string;
  license_plates: string;
  created_at: Date;
  images?: string[];
  note: string;
}
