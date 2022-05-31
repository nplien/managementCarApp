export const ADVANCED_SETTING_CUSTOMER = {
  ADD: 'ADVANCED/SETTING/CUSTOMER/ADD',
  DELETE: 'ADVANCED/SETTING/CUSTOMER/DELETE',
  UPDATE: 'ADVANCED/SETTING/CUSTOMER/UPDATE',
  CLEAR: 'ADVANCED/SETTING/CUSTOMER/CLEAR'
};

export function addItem() {
  return {
    type: ADVANCED_SETTING_CUSTOMER.ADD
  };
}
export function onDeleteItem(index: number) {
  return {
    type: ADVANCED_SETTING_CUSTOMER.DELETE,
    payload: {
      index: index
    }
  };
}
// NOTE Value la mot object
export function updateItem(value: any, index: number) {
  return {
    type: ADVANCED_SETTING_CUSTOMER.UPDATE,
    payload: {
      value,
      index
    }
  };
}
export function clear() {
  return {
    type: ADVANCED_SETTING_CUSTOMER.CLEAR
  };
}
const AdvancedSettingCustomerReducer = (
  state = {
    arrList: [
      {
        valueCondition: 'Chọn điều kiện',
        valueOperations: 'Chon giá trị',
        isShowInput: false
      }
    ]
  },
  action: {type: string; payload: any}
) => {
  switch (action.type) {
    case ADVANCED_SETTING_CUSTOMER.ADD:
      state.arrList.push({
        valueCondition: 'Chọn điều kiện',
        valueOperations: 'Chon giá trị',
        isShowInput: false
      });
      return {...state, arrList: [...state.arrList]};
    case ADVANCED_SETTING_CUSTOMER.DELETE:
      state.arrList.splice(action.payload.index, 1);
      return {...state, arrList: [...state.arrList]};
    case ADVANCED_SETTING_CUSTOMER.UPDATE:
      const objectCurrent = state.arrList[action.payload.index];
      const objectNew = Object.assign(objectCurrent, action.payload.value);
      state.arrList[action.payload.index] = objectNew;
      return {...state, arrList: [...state.arrList]};
    case ADVANCED_SETTING_CUSTOMER.CLEAR:
      return {
        ...state,
        arrList: [
          {
            valueCondition: 'Chọn điều kiện',
            valueOperations: 'Chon giá trị',
            isShowInput: false
          }
        ]
      };
    default:
      return state;
  }
};

export default AdvancedSettingCustomerReducer;
