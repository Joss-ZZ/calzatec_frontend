import { Action } from '../enums/action.enum';

export type DialogData = {
  id?: number;
  title: string;
  action: Action;
};
