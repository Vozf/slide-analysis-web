import { createFeatureSelector, createSelector, MemoizedSelector, } from '@ngrx/store';


import { State } from './state';
import { ImageListItems } from '../../components/image/image.interface';

const getImages = (state: State): any => state.images;

export const selectImageListState: MemoizedSelector<object, State> =
    createFeatureSelector<State>('imageList');

export const selectImages: MemoizedSelector<object, ImageListItems> = createSelector(selectImageListState, getImages);

