import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface Progress {
    percent: number;
    current: number;
    total: number;
    date: Date;
}

@Injectable()
export class ImageListService {

    constructor(private http: HttpClient) {
    }

    recalculate(folderName: string): Observable<string> {
        return this.http.put<{ threadName: string }>('images/recalculate/', { folderName }).pipe(
            map(({ threadName }) => threadName),
        );
    }

    getProgress(threadName: string): Observable<Progress> {
        return this.http.get<Progress>(`images/recalculate/progress/${threadName}`).pipe(
            map(obj => ({ date: new Date(), ...obj })),
        );
    }

}
