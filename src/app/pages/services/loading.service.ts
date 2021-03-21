import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class LoadingService {

  private isLoading = new BehaviorSubject(false);
  currentState = this.isLoading.asObservable();

  constructor() { }

  public changeState(isLoading: boolean) {
    setTimeout(()=>{
      this.isLoading.next(isLoading)
    },1000)
  }

  public getState(): boolean {
    return this.isLoading.getValue();
  }
}
