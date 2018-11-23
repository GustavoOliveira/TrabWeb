import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Injectable } from '@angular/core';
import { Headers } from '@angular/http'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class LoginService {
  private httpOptions: any;
  public errors: any = [];
  private url: string = `http://127.0.0.1:8000/api-token-auth/`;

  constructor(private http: Http) {
  }

  errorHandler(error: any): void {
    console.log(error)
  }

  logar(login: any): Observable<any> {
    var cabecalho = new Headers();
    cabecalho.append('Content-Type', 'application/json');
    return this.http
      .post(this.url, JSON.stringify(login), { headers: cabecalho })
      .map(response => response.json())
      .catch((error: any) => Observable.throw(this.errorHandler(error)))
  }


  private updateData(token) {
    sessionStorage.setItem('token', token)
    alert(token)
  }
}
 