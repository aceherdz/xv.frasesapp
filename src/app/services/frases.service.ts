import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FraseDTO } from 'src/app/interfaces/services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FrasesService {

  baseUrl: string = '/proxy/api';

  constructor(private http: HttpClient) { }

  public getRandomQuote() {
    return this.http.get(this.baseUrl + '/frase').
      pipe(map((respuesta: FraseDTO) => {
        return respuesta;
      }
      ));
  }

  public ping(idheroku: string):Observable<true> {
    const options = { headers : new HttpHeaders({ 'destino': idheroku})}
    return this.http.get(this.baseUrl + '/ping',options).pipe(map((respuesta) => {
      return true;
    }, error => { return false; }));
  }

}
