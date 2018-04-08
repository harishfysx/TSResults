import { Injectable } from '@angular/core';
import {Http, Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {AppError} from '../errors/app.error';
import {NotFoundError} from '../errors/not.found.error';
import {awsBieApiUrl} from '../../../../config/config';




@Injectable()
export class MockUpService {
  private studentsUrl = awsBieApiUrl + '/students';
  private testEndPointURl = awsBieApiUrl + '/testEndPoints';

  constructor(private http: Http) { }

  getSampleStudents () {
    const url = this.studentsUrl + '/samplestudents'
    return this.http.get(url)
      .map(response => response.json())
      .catch(this.errorHanlder);
  }
  getSampleUsers () {
    const url = this.testEndPointURl + '/sampleusers';
    return this.http.get(url)
      .map(response => response.json())
      .catch(this.errorHanlder);
  }
  getSampleElements () {
    const url = this.testEndPointURl + '/sampleelements';
    return this.http.get(url).catch(this.errorHanlder);
  }
  getSampleCompanies () {
    const url = this.testEndPointURl + '/swimcompany';
    return this.http.get(url)
      .map(response => response.json())
      .catch(this.errorHanlder);
  }

  getSampleCollections () {
    const url = this.testEndPointURl + '/-samplecollections';
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
