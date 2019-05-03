import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable()
export class ImageListService {

    constructor(private http: HttpClient) {
    }

    recalculate(folderName: string): Observable<string> {
        return this.http.put<{ threadName: string }>('images/recalculate/', { folderName }).pipe(
            map(({ threadName }) => threadName),
        );
    }

    getProgress(threadName: string): Observable<number> {
        return this.http.get<{ percent: number }>(`images/recalculate/progress/${threadName}`).pipe(
            map(({ percent }) => percent),
        );
    }

}
