import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Injectable } from '@angular/core';
import { Headers } from '@angular/http'
import { HttpClient } from 'selenium-webdriver/http';

@Injectable()
export class ClubeService {
    token = sessionStorage.getItem('token')
    private url: string = `http://127.0.0.1:8000/clube/`;
    constructor(private http: Http) {
    }
    errorHandler(error: any): void {
        console.log(error)
    }
    
    save(clube : any): Observable<any> {
        var cabecalho = new Headers();
        cabecalho.append('Authorization',this.token);
        cabecalho.set('Accept', 'application/json');
        return this.http
            .post(this.url, clube, { headers: cabecalho , method: 'POST'})
            .map(response => response.json())
            .catch((error: any) => Observable.throw(this.errorHandler(error)))
    }

    update(id: number, clube: any): Observable<any> {
        var cabecalho = new Headers();
        cabecalho.append('Authorization',this.token);
        cabecalho.set('Accept', 'application/json');
        return this.http
            .put(this.url + "" + id,
                clube, { headers: cabecalho , method: 'PUT'})
            .map(response => response.json())
            .catch((error: any) => Observable.throw(this.errorHandler(error)))
    }

    getList(): Observable<any> {
        var cabecalho = new Headers();
        cabecalho.append('Authorization',this.token);
        return this.http
            .get(this.url, { headers: cabecalho })
            .map(response => response.json())
            .catch((error: any) => Observable.throw(this.errorHandler(error)))
    }

    get(id: number): Observable<any> {
        var cabecalho = new Headers();
        cabecalho.append('Authorization',this.token);
        return this.http
            .get(this.url + "" + id, { headers: cabecalho })
            .map(response => response.json())
            .catch((error: any) => Observable.throw(this.errorHandler(error)))
    }

    delete(id: number): Observable<any> {
        var cabecalho = new Headers();
        cabecalho.append('Authorization',this.token);
        return this.http
            .delete(this.url + "" + id, { headers: cabecalho })
            .map(response => response.json())
            .catch((error: any) => Observable.throw(this.errorHandler(error)))
    }

}