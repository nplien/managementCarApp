export interface ICategoryModel {
  id: number;
  name: string;
  slug: string;
  logo: string;
  image: string;
  content: string;
  meta_url: string;
  meta_title: string;
  meta_image: string;
  meta_content: string;
  path: [];
  position: number;
  parent_id: number | null;
  is_show_on_home: boolean;
  is_show_on_web: boolean;
  is_active: boolean;
  created_by: {
    id: string;
    name: string;
  };
  children: ICategoryModel[];
  created_at: number;
  updated_at: number;

  padding?: number;
}
