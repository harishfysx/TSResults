import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {ResultService} from '../../shared/services/result.service';
import {AppError} from '../../shared/errors/app.error';
import {NotFoundError} from '../../shared/errors/not.found.error';
import {RefDataService} from '../../shared/services/ref-data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  studentFound = false;
  message;
  student: any;
  resultLoading = false;
  years;
  categories;
  studyYears;
  exams;
  constructor(private resultService: ResultService) {
  }

  ngOnInit() {
    this.studyYears = [{name: 'I-Year', value: 'I-Year'}, {name : 'II-Year', value: 'II-Year'}];
    this.categories = [{name: 'General', value: 'General'}, {name : 'Vocational', value: 'Vocational'}];
    this.exams = [{name: 'Regular', value: 'Regular'}, {name : 'Supplementary', value: 'Supplementary'}];
  }
  onSubmit(f: NgForm) {
    this.studentFound = !this.studentFound;
    this.resultLoading = true;
    this.resultService.getStudent(f.value.ticket).subscribe((resp: any) => {
      console.log(resp.json());
      if (resp.json != null && resp.json().length !==  0 ) {
        this.student = resp.json();
        this.message = 'result';
      }else {
        this.resultLoading = false;
        this.message = 'notFound';
      }
      },
      (error: AppError) => {
        if (error instanceof  NotFoundError) {
          console.log('its not found error');
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
