/**
  * WebService
  * Joe Booth:  Angular 2 Succinctly
  *
  * Sample HTTP calls:  
 */
import { Injectable }    from '@angular/core';
import { Http,Response}  from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable }    from 'rxjs/Rx';
import 'rxjs/Rx';

 
@Injectable()
export class WebService {

    constructor(private _http: Http) {
    }

    private _IPURL  : string = "http://ip.jsontest.com";

    public getIP (): Observable<string> {
        return  this._http.get(this._IPURL)
                        .map(this.extractIP)
                        .catch(this.handleError);
    }

    private _MD5URL : string = "http://md5.jsontest.com?text=";
    public getMD5( str: string) : Observable<string> {
        let finalUrl = this._MD5URL + encodeURI(str);    
        return  this._http.get(finalUrl)
                        .map(this.extractMD5);
    }


    /* Private methods to support http calls */
    private extractIP(res: Response) :string {
        let body = res.json();
        return body.ip || { };
    }

    private extractMD5(res: Response) :string {
        let body = res.json();
        return body.md5 || { };
    }
    
    private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
        errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
    }
}
