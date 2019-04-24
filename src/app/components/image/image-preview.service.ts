import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { map, partition, switchMap, toArray } from 'rxjs/operators';
import { Image, FileApiResponse, FolderApiResponse, ImageFolder } from './image.interface';
import { ImageService } from './image.service';
import { from } from 'rxjs/internal/observable/from';
import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';


@Injectable()
export class ImagePreviewService {

    constructor(private http: HttpClient, private imageService: ImageService) {
    }

    getPreviews(): Observable<(ImageFolder | Image)[]> {
        const items = this.http.get<(FileApiResponse | FolderApiResponse)[]>('images/previews').pipe(
            switchMap(its => from(its)),
        );

        return this.getPreviewsRecursive(items).pipe(tap(it => console.log(it, -1)));
    }

    private getPreviewsRecursive(items: Observable<(FileApiResponse | FolderApiResponse)>): Observable<(ImageFolder
        | Image)[]> {
        const [folders, images] = partition(({ is_folder }) => is_folder)(items);
        const imagesPreviews = (images as Observable<FileApiResponse>).pipe(
            mergeMap(img => this.getPreview(img)),
            toArray(),
        );

        const folderPreviews = (folders as Observable<FolderApiResponse>).pipe(
            mergeMap(({ children, ...props }) => this.getPreviewsRecursive(from(children)).pipe(
                map(childrenPreviews => ({ children: childrenPreviews, ...props })),
                ),
            ),
            toArray(),
        );

        return forkJoin([folderPreviews, imagesPreviews]).pipe(
            map(([folds, imgs]) => [...folds, ...imgs]),
        );

    }

    getPreview(file: FileApiResponse): Observable<Image> {
        return this.http.get(`images/previews/${file.name}`, { responseType: 'blob' }).pipe(
            mergeMap(image => this.imageService.getBase64FromBlob(image)),
            map(base64 => ({ base64, ...file })),
        );
    }

}
