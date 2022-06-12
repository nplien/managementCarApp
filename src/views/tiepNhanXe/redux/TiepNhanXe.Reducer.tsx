import {ICreatedBy} from 'models/ModelBase';
import {ITiepNhanXeModel} from 'models/TiepNhanXe.Model';
import {MyReduxAction, PayloadList} from 'views/app/redux/MyAction.Type';

type IStatusTNXStates = {
  typeCar?: ICreatedBy;
  inforXeTN?: ITiepNhanXeModel;
  arrTiepNhanXe: ITiepNhanXeModel[];
};

const initialStates: IStatusTNXStates = {
  arrTiepNhanXe: []
};
const TiepNhanXeReducer = (state: IStatusTNXStates = initialStates, action: MyReduxAction) => {
  switch (action.type) {
    case 'SET/TNX/TYPE_CAR': {
      const payload = action.payload as PayloadList['SET/TNX/TYPE_CAR'];
      return {
        ...state,
        typeCar: payload.typeCar
      };
    }
    case 'SET/TNX/OBJECT_INFOR_XE': {
      const payload = action.payload as PayloadList['SET/TNX/OBJECT_INFOR_XE'];
      let objTMP = state.arrTiepNhanXe.find(x => x.id === payload.inforXeTN.id);
      if (objTMP) {
        return {
          ...state,
          arrTiepNhanXe: state.arrTiepNhanXe.map(x => {
            if (x.id === payload.inforXeTN.id) {
              x = payload.inforXeTN;
            }
            return x;
          })
        };
      } else {
        return {
          ...state,
          arrTiepNhanXe: [...state.arrTiepNhanXe, payload.inforXeTN]
        };
      }
    }
    default:
      return state;
  }
};

export default TiepNhanXeReducer;
