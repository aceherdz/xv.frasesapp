import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Repositories } from '../interfaces/services';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  baseUrl: string = '/api';

  constructor(private http: HttpClient) { 

  }

  public listRepositories() :Observable<Repositories[]>{
    return this.http.get(this.baseUrl + '/repositories').pipe(map((respuesta:any) => {
      return respuesta.repositorios;
    }));
  }

  public deleteRepository(herokuid:string): Observable<boolean> {
    return this.http.delete(this.baseUrl + `/repository/${herokuid}`).pipe(map(()=>{
      return true;
    }));
  }

  public addRepository(idheroku:string,author:string):Observable<boolean> {
    return this.http.post(this.baseUrl + '/repository',{idheroku,author}).pipe(map(()=>{
      return true;
    }));
  }
}
