import { ImageListItems } from '../../components/image/image.interface';

export interface State {
    images: ImageListItems;
}

export const initialState: State = {
    images: [],
};
