import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  getList() {
    return this.http.get('/api/student/list').toPromise().then(data => data as Student[]);
  }

  add(body: string) {
    return this.http.post('/api/student/add', body).toPromise();
  }

  delete(id: number) {
    return this.http.delete('/api/student/deleteById?id=' + id).toPromise();
  }

 
}