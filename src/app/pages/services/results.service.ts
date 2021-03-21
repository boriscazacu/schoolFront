import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Results } from '../models/results';

@Injectable({
  providedIn: 'root'
})

export class ResultsService {
    constructor(private http: HttpClient) { }

    getList(): Promise<Results[]>  {
      return this.http.get('/api/results/list').toPromise()
        .then(data => data as Results[]);
    }

    add(body: Results): Promise<Results>  {   
      return this.http.post('/api/results/add', body).toPromise()
        .then(data => data as Results);
    }

    async getBySanta(name: string): Promise<Results>  {
      return await this.http.get('/api/results/getSanta?name=' + name).toPromise()
      .then(data => data as Results);
    }

    async edit(body: Results): Promise<Results> {
      return await this.http.put('/api/results/edit', body).toPromise()
      .then(data => data as Results);
    }

    async delete(id: number): Promise<boolean> {
      return await this.http.delete('/api/results/delete?id=' + id).toPromise()
      .then(data => data as boolean);
    }
}