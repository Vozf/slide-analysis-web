import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as featureActions from './actions';
import { ImageListStoreActions } from './index';
import { ImagePreviewService } from '../../components/image/image-preview.service';
import { SetImages } from './actions';

@Injectable()
export class ImageListStoreEffects {
    constructor(
        private imagePreviewService: ImagePreviewService,
        private actions$: Actions) {
    }

    @Effect()
    filterUpdate$: Observable<Action> = this.actions$.pipe(
        ofType<ImageListStoreActions.FilterUpdate>(featureActions.ActionTypes.FilterUpdate),
        map(({ filter: { search } }) => search),
        switchMap(search => this.imagePreviewService.getPreviews(search)),
        map(images => new SetImages({ images })),
    );


}
