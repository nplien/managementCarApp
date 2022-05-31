import {ChannelModel} from 'models/ManagerSetting.Model';
import {IAppState} from 'views/app';

export interface IKenhBanState extends IAppState {
  arrKenhBan?: ChannelModel[];
  count?: number;
  keyword?: string;

  isLoadMore?: boolean;
  isStop?: boolean;
  isError?: boolean;
}
