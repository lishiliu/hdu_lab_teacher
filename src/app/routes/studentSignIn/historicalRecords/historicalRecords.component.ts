import {Component, OnInit} from '@angular/core';
import {HistoricalRecordsService} from './historicalRecords.service';
import {NzModalService} from 'ng-zorro-antd';
import {SessionStorageService} from '@core/storage/storage.module';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-HistoricalCourses',
  templateUrl: 'historicalRecords.component.html',
  styleUrls: ['./historicalRecords.component.less'],
  providers: [HistoricalRecordsService]
})

export class HistoricalRecordsComponent implements OnInit {
    constructor(private historicalRecordsService: HistoricalRecordsService, private confirmServ: NzModalService, private  router: Router,
                private _storage: SessionStorageService, private fb: FormBuilder) {
    }
    validateForm: FormGroup;
    apiUrl = [
        'http://localhost:8080/LabManager/class/semester/getclassbyusername', /*0获取课程*/
        'http://localhost:8080/LabManager/semester/getNowSemester', // 1
    ];

    WEEK = ['日', '一', '二', '三', '四', '五', '六', '日'];
    _value = ''; /*搜索内容*/
    choice = 'all';
    courses = [];
    data = [];
    // 获取学期
    searchSemester = this._storage.get('historyCourses');
    nowSemester = {
        nowSemester: '',
        maxWeek: 17
    };
    private getSemester() {
        this.historicalRecordsService.executeGET(this.apiUrl[1])
            .then((result: any) => {
                const res = JSON.parse(result['_body']);
                if (res['result'] === 'success') {
                    this.nowSemester = res['NowSemester'];
                }
            });
    }
    private getAllHours(courses: any) {
        let hours = 0;
        for (let course of courses) {
            hours += course.classNum.length * course.classWeek.length;
        }
        return hours;
    }
    private getWeekHours(courses: any) {
        let hours = 0;
        for (let course of courses) {
            hours += course.classNum.length;
        }
        return hours;
    }
    private getHours(course: any) {
        return course.classNum.length * course.classWeek.length;
    }
    // 查看学生记录
    showHistoryRecords(data: any) {
        const str = JSON.stringify(data);
        this._storage.set('signInCourse', str);
        this.router.navigate(['/studentSignIn/show']);
    }
    private _getData = () => {
        // 获取当前学期信息
        this.getSemester();
        // 获取课程
        let data = {
            userName: this._storage.get('username'),
            semester: this.searchSemester
        }
        this.historicalRecordsService.executeHttp(this.apiUrl[0], data)
            .then((result: any) => {
                this.courses = JSON.parse(result['_body'])['course'];
            });
    }
    onSearch(event: string): void {
        console.log(event);
    }
    ngOnInit(): void {

        this._getData();
    }
}
