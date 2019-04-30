import { ActionsUnion, ActionTypes } from './image-list.actions';
import { ImageListItems } from '../../image.interface';

export interface State {
    images: ImageListItems;
}

export const initialState: State = {
    images: [],
};

export function reducer(
    state = initialState,
    action: ActionsUnion,
): State {
    switch (action.type) {
        case ActionTypes.SetImages: {
            return {
                ...state,
                ...action.payload,
            };
        }

        default: {
            return state;
        }
    }
}


