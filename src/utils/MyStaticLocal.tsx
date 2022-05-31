import {ITokenModel} from 'models/Personal.Model';

export default class MyStaticLocal {
  static VERSION_APP: string = '';

  static USER_ID?: string;
  static USER_TOKEN?: ITokenModel;
}
