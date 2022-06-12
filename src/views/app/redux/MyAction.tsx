import {AnyAction, bindActionCreators, Dispatch} from 'redux';

import {PayloadList} from './MyAction.Type';

export function createAction<Payload extends keyof PayloadList>(
  ...args: undefined extends PayloadList[Payload]
    ? [screen: Payload] | [screen: Payload, params: PayloadList[Payload]]
    : [screen: Payload, params: PayloadList[Payload]]
) {
  return {
    type: args[0],
    payload: args[1]
  };
}

export function mapDispatchToProps(dispatch: Dispatch<AnyAction>): {
  dispatchAction: typeof createAction;
} {
  return bindActionCreators(
    {
      dispatchAction: createAction
    },
    dispatch
  );
}
