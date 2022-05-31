import {IHeaderSelectedState, IHeaderSelectedAction} from './HeaderSelected.Type';

export const CHOOSE_IS_SELECTED_MANY_ACTION = {
  IS_SELECTED_MANY: 'IS/SELECTED/MANY/SET'
};

export function setSelectedMany(isSelectMany: boolean) {
  return {
    type: CHOOSE_IS_SELECTED_MANY_ACTION.IS_SELECTED_MANY,
    payload: {
      isSelectMany
    }
  };
}

const HeaderSelectedReducer = (
  state: IHeaderSelectedState = {
    isSelectMany: false
  },
  action: IHeaderSelectedAction
): IHeaderSelectedState => {
  switch (action.type) {
    case CHOOSE_IS_SELECTED_MANY_ACTION.IS_SELECTED_MANY:
      return {...state, isSelectMany: action.payload?.isSelectMany};

    default:
      return state;
  }
};

export default HeaderSelectedReducer;
