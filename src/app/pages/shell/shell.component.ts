import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { SecretSantaService } from '../services/secret-santa.service';

@Component({
    selector: 'app-shell',
    templateUrl: './shell.component.html',
    styleUrls: ['./shell.component.css']
  })
  
export class ShellComponent implements OnInit {
    isLoading: boolean;
    name: string;

    constructor(
        private loadingService: LoadingService,
        private service: SecretSantaService,
        ){
        this.loadingService.currentState.subscribe(state => this.isLoading = state);
        this.name = this.service.nameOfSanta;
    }
    
    ngOnInit() {
    }

}