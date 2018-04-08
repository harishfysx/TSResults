import { Injectable } from '@angular/core';
import {Http, Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {AppError} from '../errors/app.error';
import {NotFoundError} from '../errors/not.found.error';
import {awsBieApiUrl} from '../../../../config/config';
import {TicketQueryModel} from '../models/ticketQuery.model';



@Injectable()
export class ResultService {
  private studentsUrl = awsBieApiUrl;
  constructor(private http: Http) { }
  getStudent (hallTicket: number) {
    const url = `${this.studentsUrl}/${hallTicket}`;
    return this.http.get(url).catch(this.errorHanlder);
  }
  getStudentUnsecured (queryObj: TicketQueryModel) {
    const params: URLSearchParams = new URLSearchParams();
    params.set('studyYear', queryObj.studyYear);
    params.set('year', queryObj.year);
    params.set('exam', queryObj.exam);
    params.set('state', queryObj.state);
    params.set('category', queryObj.category);
    let url = '';
    if (queryObj.year === '2018' && queryObj.exam === 'R' && queryObj.state === 'TS' &&
        queryObj.category === 'G' && queryObj.studyYear === 'I') {
       url = `${this.studentsUrl}/${queryObj.ticket}`;
    } else {
       url = 'https://w3bqv0z6y8.execute-api.ap-south-1.amazonaws.com/DEV/notreleased';
    }
    /*
    else if (queryObj.year === '2018' && queryObj.exam === 'R' && queryObj.state === 'TS' &&
      queryObj.category === 'V' && queryObj.studyYear === 'I') {
    } else if (queryObj.year === '2018' && queryObj.exam === 'R' && queryObj.state === 'TS' &&
      queryObj.category === 'G' && queryObj.studyYear === 'II') {
    } else if (queryObj.year === '2018' && queryObj.exam === 'R' && queryObj.state === 'TS' &&
      queryObj.category === 'V' && queryObj.studyYear === 'II') {
    }*/
    console.log('pring url', url);
    // const url = `${this.studentsUrl}/${queryObj.ticket}`;
    return this.http.get(url).catch(this.errorHanlder);
  }
  private errorHanlder(error: Response) {
    console.log('called errorHandler');
    if (error.status === 404) {
      return Observable.throw(new NotFoundError());
    }
    return Observable.throw(new AppError(error));
  }

}
