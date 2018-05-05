import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { SearchCriteria } from '../models/data-models';

@Injectable()
export class ExpediaServiceService {

  private apiUrl = 'api/Expedia';
  constructor(private http: Http) { }
  getData(criteria: SearchCriteria): Observable<any> {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let myParams = new URLSearchParams();
  
    Object.keys(criteria).forEach(key => {
        let queryVal = criteria[key] != "null" ? criteria[key].toString() : "";
        myParams.append(key, queryVal);
    })

    let options = new RequestOptions();
    options.headers = myHeaders;
    options.params = myParams;
    return this.http.get(this.apiUrl, options).map((res: Response) => res.json());
  }

}
