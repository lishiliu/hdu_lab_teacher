import {Injectable} from '@angular/core';
import {SessionStorageService} from 'app/core/storage/storage.module';
import {Headers, Http, RequestOptions} from '@angular/http';
const host = 'http://www.mrzhao14.cn/LabManager/';


@Injectable()
export class AddCourseService {
    constructor(private _storage: SessionStorageService, private http:Http) {
    }
    executeGET(curl: any) {
        let headers = new Headers({'Content-Type': 'application/json', 'charset': 'utf-8'});
        let options = new RequestOptions({headers: headers});
        return new Promise((resolve, reject) => {
            this.http.get(host + curl)
                .subscribe(result => {
                    resolve(result);
                });
        });
    }
    executeHttp( curl: any, data: any) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        let content = JSON.stringify(data);
        return new Promise((resolve, reject) => {
            this.http.post(host + curl, content, options)
                .subscribe(result => {
                    resolve(result);
                });
        });
    }
}
