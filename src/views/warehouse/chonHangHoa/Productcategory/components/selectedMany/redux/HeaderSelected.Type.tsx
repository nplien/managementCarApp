export interface IHeaderSelectedState {
  isSelectMany?: boolean;
}

export interface IHeaderSelectedAction {
  type: string;
  payload?: IHeaderSelectedState;
}
