import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Injectable } from '@angular/core';
import { Headers } from '@angular/http'

@Injectable()
export class ContatoService {
    private url: string = `http://localhost:3000/contato`;
    constructor(private http: Http) {
    }
    errorHandler(error: any): void {
        console.log(error)
    }
    save(contato: any): Observable<any> {
        var cabecalho = new Headers();
        cabecalho.append('Content-Type', 'application/json');
        return this.http
            .post(this.url, JSON.stringify(contato), { headers: cabecalho })
            .map(response => response.json())
            .catch((error: any) => Observable.throw(this.errorHandler(error)))
    }

    update(id: number, contato: any): Observable<any> {
        var cabecalho = new Headers();
        cabecalho.append('Content-Type', 'application/json');
        return this.http
            .put(this.url + "/" + id,
                JSON.stringify(contato), { headers: cabecalho })
            .map(response => response.json())
            .catch((error: any) => Observable.throw(this.errorHandler(error)))
    }

    getList(): Observable<any> {
        return this.http
            .get(this.url)
            .map(response => response.json())
            .catch((error: any) => Observable.throw(this.errorHandler(error)))
    }
    get(id: number): Observable<any> {
        return this.http
            .get(this.url + "/" + id)
            .map(response => response.json())
            .catch((error: any) => Observable.throw(this.errorHandler(error)))
    }

    delete(id: number): Observable<any> {
        return this.http
            .delete(this.url + "/" + id)
            .map(response => response.json())
            .catch((error: any) => Observable.throw(this.errorHandler(error)))
    }

}