export interface IRoleModel {
  id: string;
  name: string;
  note: string;
  status: string;
  permissions: Array<object>;
  is_active: Boolean;
  created_by: {
    id: string;
    name: string;
  };
  created_at: number;
  updated_at: number;
}
