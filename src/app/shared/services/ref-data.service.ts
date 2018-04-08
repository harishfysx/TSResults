import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {AppError} from '../errors/app.error';
import {NotFoundError} from '../errors/not.found.error';
import {awsBieApiUrl} from '../../../../config/config';



@Injectable()
export class RefDataService {
  private refDataUrl = awsBieApiUrl + '/refs/drop-downs';

  constructor(private http: Http) { }

  getYears () {
    const url = this.refDataUrl + '/?label=year&sortOrder=desc'
    return this.http.get(url)
      .map(response => response.json())
      .catch(this.errorHanlder);
  }
  getStates () {
    const url = this.refDataUrl + '/?label=state&sortOrder=asc'
    return this.http.get(url)
      .map(response => response.json())
      .catch(this.errorHanlder);
  }
  getExams () {
    const url = this.refDataUrl + '/?label=exam&sortOrder=asc'
    return this.http.get(url)
      .map(response => response.json())
      .catch(this.errorHanlder);
  }
  getStudyYears () {
    const url = this.refDataUrl + '/?label=study-year&sortOrder=asc'
    return this.http.get(url)
      .map(response => response.json())
      .catch(this.errorHanlder);
  }
  getCategories () {
    const url = this.refDataUrl + '/?label=category&sortOrder=asc'
    return this.http.get(url)
      .map(response => response.json())
      .catch(this.errorHanlder);
  }
  private errorHanlder(error: Response) {
    console.log('called errorHandler')
    if (error.status === 404) {
      return Observable.throw(new NotFoundError());
    }
    return Observable.throw(new AppError(error));
  }

}
