import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { mapTo } from 'rxjs/operators';


@Injectable()
export class ImageListService {

    constructor(private http: HttpClient) {
    }

    recalculate(folderName: string): Observable<void> {
        return this.http.put(`images/recalculate/${folderName}`, {}).pipe(
            mapTo(null),
        );
    }

}
