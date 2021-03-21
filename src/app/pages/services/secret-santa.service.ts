import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SecretSanta } from '../models/secret-santa';

@Injectable({
  providedIn: 'root'
})

export class SecretSantaService {
    public nameOfSanta: string = 'Boris';
    
    constructor(private http: HttpClient) {}

    async getList(): Promise<SecretSanta[]> {
      return await this.http.get('/api/santa/list').toPromise()
        .then(data => data as SecretSanta[]);
    }

    add(body: SecretSanta): Promise<SecretSanta> {
      return this.http.post('/api/santa/add', body).toPromise()
        .then(data => data as SecretSanta);
    }

    edit(body: SecretSanta): Promise<SecretSanta> {
      return this.http.put('/api/santa/edit', body).toPromise()
      .then(data => data as SecretSanta);
    }

    delete(id: number): Promise<boolean> {
      return this.http.delete('/api/santa/delete?id=' + id).toPromise()
      .then(data => data as boolean);
    }

    generate(id: number): Promise<SecretSanta> {
      return this.http.get('/api/santa/generate?id=' + id).toPromise()
        .then(data => data as SecretSanta);
    }

    async nameExist(name: string): Promise<boolean> {
      return await this.http.get('/api/santa/nameExist?name=' + name).toPromise()
        .then(data => data as boolean);
    }

    async getParticipant(name: string): Promise<SecretSanta> {
      return await this.http.get('/api/santa/getParticipant?name=' + name).toPromise()
        .then(data => data as SecretSanta);
    }
}