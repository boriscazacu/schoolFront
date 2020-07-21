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

  add(body: Student) {
    console.log("Yes  ",body)
    return this.http.post('/api/student/addStudent', body).toPromise();
  }

  update(body: Student) {
    return this.http.put('/api/student/update', body).toPromise();
  }

  delete(id: number) {
    return this.http.delete('/api/student/deleteById?id=' + id).toPromise();
  }

 
}