import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {ResultService} from '../../shared/services/result.service';
import {AppError} from '../../shared/errors/app.error';
import {NotFoundError} from '../../shared/errors/not.found.error';
import {TicketQueryModel} from '../../shared/models/ticketQuery.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  message: string;
  studentFound = false;
  student: any;
  years;
  resultLoading = false;
  categories;
  studyYears;
  exams;
  constructor(private resultService: ResultService) {
  }

  ngOnInit() {
    this.studyYears = [{name: 'I-Year', value: 'I'}, {name : 'II-Year', value: 'II'}];
    this.categories = [{name: 'General', value: 'G'}, {name : 'Vocational', value: 'V'}];
    this.exams = [{name: 'Regular', value: 'R'}, {name : 'Supplementary', value: 'S'}];
    this.years = [{name: '2018', value: '2018'}, {name : '2017', value: '2017'}];
  }
  onSubmit(f: NgForm) {
    this.studentFound = !this.studentFound;
    this.resultLoading = true;
    const queryObj: TicketQueryModel = new TicketQueryModel;
    queryObj.state = 'TS';
    queryObj.year = f.value.year;
    queryObj.studyYear = f.value.studyYear;
    queryObj.ticket = f.value.ticket;
    queryObj.exam = f.value.exam;
    queryObj.category = f.value.category;

    this.resultService.getStudentUnsecured (queryObj).subscribe((resp: any) => {
      // console.log(resp.json());
      if (resp.json().message === '600') {
        this.resultLoading = false;
        this.message = 'not released';
      } else if (resp.json != null && resp.json().length !==  0 ) {
        this.student = resp.json();
        this.message = 'result';
      }else {
        this.resultLoading = false;
        this.message = 'notFound';
      }
      },
      (error: AppError) => {
        if (error instanceof  NotFoundError) {
          // console.log('its not found error');
          this.resultLoading = false;
        }else {
          throw error ;
        }
    });
    this.resultLoading = false;
  }
  // getClasses
  getColor(outcome) {
    if (outcome === 'FAIL') {
      return '#e24d4d';
    }
    return '#64B5F6';
  }

  testFnct(event) {
    console.log('test', event);
  }
}
