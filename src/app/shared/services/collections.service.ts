import { Injectable } from '@angular/core';
import {Headers, Http, Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {AppError} from '../errors/app.error';
import {NotFoundError} from '../errors/not.found.error';
import {awsBieApiUrl} from '../../../../config/config';
import {CollectionModel} from '../models/collection.model';
import {AuthService} from './auth.service';
import {CollectionStudent} from '../models/col-student.model';



@Injectable()
export class CollectionsService {
  private collectionsUrl = awsBieApiUrl + '/collections';
  private colStudUrl = awsBieApiUrl + '/col-stdnts';

  constructor(private http: Http,
              private authService: AuthService ) {
  }
  private getJWT (): string {
     let jwt = '';
    this.authService.getJWTtoken().subscribe((val) => {
      jwt = val;
    });
    return jwt;
  }
  getCollections () {
    const url = this.collectionsUrl;
    const headersVar = new Headers({'Authorization': this.getJWT() });
    return this.http.get(url + '?sortOrder=asc',  {headers: headersVar})
      .map(response => response.json())
      .catch(this.errorHanlder);
  }
  getCollectionDetails (colName: string) {
    const url = `${this.collectionsUrl}/${colName}`;
    const headersVar = new Headers({'Authorization': this.getJWT() });
    return this.http.get(url + '?sortOrder=asc',  {headers: headersVar})
      .map(response => {
        const item = response.json().Item;
          const collection: CollectionModel = new CollectionModel();
          collection.userName =  item.userName.S;
          collection.className =  item.className.S;
          collection.exam =  item.exam.S;
          collection.state =  item.state.S;
          collection.studyYear =  item.studyYear.S;
          collection.year =  item.year.S;
          collection.category =  item.category.S;
        return collection;
      })
      .catch(this.errorHanlder);
  }

  getStudentsInCollection (className: string, sortField: string, sortOrder: string) {
    const params: URLSearchParams = new URLSearchParams();
    params.set('sortField', sortField );
    params.set('sortOrder', sortOrder );
    const url = this.colStudUrl + '/' + className;
    const headersVar = new Headers({'Authorization': this.getJWT() });
    return this.http.get(url,  {search: params, headers: headersVar})
      .map(response => response.json())
      .catch(this.errorHanlder);
  }
  saveCollection (collection: CollectionModel) {
    const headersVar = new Headers({'Authorization': this.getJWT() });
    return this.http.post(this.collectionsUrl, collection,  {headers: headersVar})
      .map(response => response.json())
      .catch(this.errorHanlder);
  }
  saveColStudent (colStudent: CollectionStudent) {
    const headersVar = new Headers({'Authorization': this.getJWT() });
    const url = this.colStudUrl;
    return this.http.post(url, colStudent,  {headers: headersVar})
      .map(response => response.json())
      .catch(this.errorHanlder);
  }
  private errorHanlder(error: Response) {
    console.log('called errorHandler');
    if (error.status === 404) {
      return Observable.throw(new NotFoundError());
    }
    return Observable.throw(new AppError(error));
  }

}
