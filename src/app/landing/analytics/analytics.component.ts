import {Component, Input, OnInit} from '@angular/core';
import { single1, single2, multi1, multi2, multi3 } from './data';
import {AmChartsService} from '@amcharts/amcharts3-angular';
import {NgForm} from '@angular/forms';
import {ResultService} from '../../shared/services/result.service';
import {AnalyticsModel} from '../../shared/models/analytics.model';
import {AppError} from '../../shared/errors/app.error';
import {NotFoundError} from '../../shared/errors/not.found.error';
import {RefDataService} from '../../shared/services/ref-data.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  providers : [AmChartsService],
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  @Input('student') student: any;

  private chart: any;
  message: string;
  respData: any;
  resultLoading = false;
  subjects;
  databases;
  constructor(private AmCharts: AmChartsService,
              private resultService: ResultService,
              private refDataService: RefDataService) {
    // this._sharedService.emitChange(this.pageTitle);
  }

  ngOnInit() {
   // this.subjects = [{name: 'ENGLISH PAPER -I', value: 'ENGLISH PAPER -I'}, {name : 'ENGLISH PAPER-II', value: 'ENGLISH PAPER-II'}];
    this.refDataService.getGenSubjects().subscribe((value) => {
      this.subjects = value;
    });
    this.databases = [{name: '2018-GEN-I-REG', value: '18_G_I_R_IND'}, {name : '2018-GEN-II-REG', value: '18_G_II_R_IND'}];

  }

  onSubmit(f: NgForm) {
    this.resultLoading = true;
    // console.log(f.value);
    const queryObj: AnalyticsModel = new AnalyticsModel();
    queryObj.inddb = f.value.inddb;
    queryObj.marks = f.value.marks;
    queryObj.subName = f.value.subName;
    this.resultService.getPieData(queryObj).subscribe((resp: any) => {
      const data = resp.json();
         console.log(data);
         if (data != null) {
           this.resultLoading = false;
         }
         this.respData = data;
         this.message = 'Number of students who secured exactly ' + f.value.marks  + ' in ' + f.value.subName + ' = ' + data[0].value + '. ';
         this.message += 'Number of students whose marks are not equal to ' + f.value.marks  + ' in ' + f.value.subName + ' = ' + data[1].value + '.';
        this.chart = this.AmCharts.makeChart('amchart-1', {
          'type': 'pie',
          'theme': 'light',
          'dataProvider': data,
          'titleField': 'name',
          'valueField': 'value',
          'balloon': {
            'fixedPosition': true
          }
        });
      },
      (error: AppError) => {
        if (error instanceof  NotFoundError) {
          // console.log('its not found error');
        }else {
          throw error ;
        }
      });
  }
}
