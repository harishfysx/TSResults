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
  getPieData (queryObject: any) {
    const params: URLSearchParams = new URLSearchParams();
    const url = 'https://4nzxjoldk8.execute-api.ap-south-1.amazonaws.com/DEV/pieData';
    params.set('inddb', queryObject.inddb);
    params.set('subName', queryObject.subName);
    params.set('marks', queryObject.marks);
    return this.http.get(url, { search: params }).catch(this.errorHanlder);
  }
  getStudentUnsecured (queryObj: TicketQueryModel) {
    let url = '';
    const params: URLSearchParams = new URLSearchParams();
    if (queryObj.year === '2017' && queryObj.exam === 'S' && queryObj.state === 'TS' &&
      queryObj.category === 'G' && queryObj.studyYear === 'I') {
      params.set('maindb', '17_G_I_S_MAIN');
      params.set('inddb', '17_G_I_S_IND');
      url = `${this.studentsUrl}/${queryObj.ticket}`;
    } else if (queryObj.year === '2017' && queryObj.exam === 'S' && queryObj.state === 'TS' &&
      queryObj.category === 'G' && queryObj.studyYear === 'II') {
      params.set('maindb', '17_G_II_S_MAIN');
      params.set('inddb', '17_G_II_S_IND');
      url = `${this.studentsUrl}/${queryObj.ticket}`;
    } else if (queryObj.year === '2017' && queryObj.exam === 'S' && queryObj.state === 'TS' &&
      queryObj.category === 'V' && queryObj.studyYear === 'I') {
      params.set('maindb', '17_V_I_S_MAIN');
      params.set('inddb', '17_V_I_S_IND');
      url = `${this.studentsUrl}/${queryObj.ticket}`;
    }else if (queryObj.year === '2017' && queryObj.exam === 'S' && queryObj.state === 'TS' &&
      queryObj.category === 'V' && queryObj.studyYear === 'II') {
      params.set('maindb', '17_V_II_S_MAIN');
      params.set('inddb', '17_V_II_S_IND');
      url = `${this.studentsUrl}/${queryObj.ticket}`;
    }  else if (queryObj.year === '2018' && queryObj.exam === 'R' && queryObj.state === 'TS' &&
      queryObj.category === 'G' && queryObj.studyYear === 'I') {
      params.set('maindb', '18_G_I_R_MAIN');
      params.set('inddb', '18_G_I_R_IND');
      url = `${this.studentsUrl}/${queryObj.ticket}`;
    } else if (queryObj.year === '2018' && queryObj.exam === 'R' && queryObj.state === 'TS' &&
      queryObj.category === 'G' && queryObj.studyYear === 'II') {
      params.set('maindb', '18_G_II_R_MAIN');
      params.set('inddb', '18_G_II_R_IND');
      url = `${this.studentsUrl}/${queryObj.ticket}`;
    } else if (queryObj.year === '2018' && queryObj.exam === 'R' && queryObj.state === 'TS' &&
      queryObj.category === 'V' && queryObj.studyYear === 'I') {
      params.set('maindb', '18_V_I_R_MAIN');
      params.set('inddb', '18_V_I_R_IND');
      url = `${this.studentsUrl}/${queryObj.ticket}`;
    }else if (queryObj.year === '2018' && queryObj.exam === 'R' && queryObj.state === 'TS' &&
      queryObj.category === 'V' && queryObj.studyYear === 'II') {
      params.set('maindb', '18_V_II_R_MAIN');
      params.set('inddb', '18_V_II_R_IND');
      url = `${this.studentsUrl}/${queryObj.ticket}`;
    }else {
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
    // console.log('pring url', url);
    // const url = `${this.studentsUrl}/${queryObj.ticket}`;
    return this.http.get(url, { search: params }).catch(this.errorHanlder);
  }
  private errorHanlder(error: Response) {
    console.log('called errorHandler');
    if (error.status === 404) {
      return Observable.throw(new NotFoundError());
    }
    return Observable.throw(new AppError(error));
  }

}
