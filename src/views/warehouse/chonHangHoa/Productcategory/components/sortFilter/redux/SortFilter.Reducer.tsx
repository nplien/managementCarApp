import {CONFIG_SORT_FILTER} from 'configs/FilterConfig';
import {ISortFilterType} from 'views/app';
import {ISortFilterState} from './SortFilter.Type';

export const CHANGE_SORT_FILTER_ACTION = {
  CHANGE: 'CHANGE/SORT/FILTER/ACTION'
};

export function changeSortFilter(sortFilter: ISortFilterType) {
  return {
    type: CHANGE_SORT_FILTER_ACTION.CHANGE,
    payload: {
      sortFilter
    }
  };
}

const SortFilterReducer = (
  state: ISortFilterState = {
    sortFilter: CONFIG_SORT_FILTER.HANG_HOA[0]
  },
  action: {type: string; payload: any}
): ISortFilterState => {
  switch (action.type) {
    case CHANGE_SORT_FILTER_ACTION.CHANGE:
      return {
        ...state,
        sortFilter: action.payload.sortFilter
      };

    default:
      return state;
  }
};

export default SortFilterReducer;
