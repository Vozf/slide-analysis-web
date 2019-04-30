import { Action } from '@ngrx/store';
import { ImageListItems } from '../../components/image/image.interface';

export enum ActionTypes {
    SetImages = '[Image List] Set Images',
    FilterUpdate = '[Image List] Filter Update ',
    Recalculate = '[Image List] Recalculate',
}

export class SetImages implements Action {
    readonly type = ActionTypes.SetImages;

    constructor(public payload: { images: ImageListItems}) {}
}

export class FilterUpdate implements Action {
    readonly type = ActionTypes.FilterUpdate;
}

export class Recalculate implements Action {
    readonly type = ActionTypes.Recalculate;

}

export type Actions = SetImages | FilterUpdate | Recalculate;

