import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Grup } from '../models/grup';

@Injectable({
  providedIn: 'root'
})
export class GrupService {
    constructor(private http: HttpClient) { }

    getList() {
      return this.http.get('/api/grup/list').toPromise().then(data => data as Grup[]);
    }
    add(body: Grup) {
      console.log("Yes  ",body)
      return this.http.post('/api/grup/add', body).toPromise();
    }
    update(body: Grup) {
      console.log("Yes  ",body)
      return this.http.post('/api/grup/update', body).toPromise();
    }
    delete(id: number) {
      return this.http.delete('/api/grup/deleteById?id=' + id).toPromise();
    }
}