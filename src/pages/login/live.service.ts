import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class LiveDataService{
    private url = 'http://121.240.130.104/mobile_apps/badminton/schedule.json';
    private headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'no-cache, no-store'});
    constructor(private http: Http) {}

    matchDetailsResponse: any = {};

    getMatchDetails () : Observable<any> {
        // let url = 'http://10.129.146.38/mobile_apps/badminton/notification.json' ;
        let url = 'http://121.240.130.104/mobile_apps/badminton/notification.json' ;
        let options = new RequestOptions({ headers: this.headers });
        return this.http.get(url, options)
                        .map(this.extractData)
                        .catch(this.handleError);
    }


    private extractData(res: Response) {
        this.matchDetailsResponse = res.json();
        return this.matchDetailsResponse || { };
    }
    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
