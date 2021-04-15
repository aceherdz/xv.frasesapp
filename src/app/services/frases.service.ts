import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FraseDTO } from 'src/app/interfaces/services';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FrasesService {

  baseUrl: string = '/proxy/api';

  constructor(private http: HttpClient) { }

  public getRandomQuote(idheroku: string) {
    const options = { headers: new HttpHeaders({ 'destino': idheroku }) }

    if (!environment.production) {
      options.headers = options.headers.append("dev", "true");
    }
    return this.http.get(this.baseUrl + '/frase', options).
      pipe(map((respuesta: FraseDTO) => {
        return respuesta;
      }
      ));
  }

  public ping(idheroku: string): Observable<true> {
    const options = { headers: new HttpHeaders({ 'destino': idheroku }) }

    if (!environment.production) {
      options.headers = options.headers.append("dev", "true");
    }
    return this.http.get(this.baseUrl + '/ping', options).pipe(map((respuesta) => {
      return true;
    }, () => { return false; }));
  }

  public upvote(id: number, idheroku: string) {
    const options = { headers: new HttpHeaders({ 'destino': idheroku }) }

    if (!environment.production) {
      options.headers = options.headers.append("dev", "true");
    }
    return this.http.put(this.baseUrl + '/voto/' + id, {}, options).pipe(map((respuesta) => {
      return true;
    }, () => { return false; }));
  }

  public downvote(id: number, idheroku: string) {
    const options = { headers: new HttpHeaders({ 'destino': idheroku }), body: {} }

    if (!environment.production) {
      options.headers = options.headers.append("dev", "true");
    }
    return this.http.delete(this.baseUrl + '/voto/' + id, options).pipe(map((respuesta) => {
      return true;
    }, () => { return false; }));
  }

  public addQuote(frase: string, idheroku: string) {
    const options = { headers: new HttpHeaders({ 'destino': idheroku }) }
    if (!environment.production) {
      options.headers = options.headers.append("dev", "true");
    }
    return this.http.post(this.baseUrl + '/frase', { frase }, options);
  }



}
