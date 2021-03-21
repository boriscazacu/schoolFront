import { Component, OnInit, Input  } from '@angular/core';
import { SecretSantaService } from '../services/secret-santa.service';
import { SecretSanta } from '../models/secret-santa';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ResultsService } from '../services/results.service';
import { LoadingService } from '../services/loading.service';
import { Results } from '../models/results';

@Component({
    selector: 'app-secret-santa',
    templateUrl: './secret-santa.component.html',
    styleUrls: ['./secret-santa.component.css']
  })
  
export class SecretSantaComponent implements OnInit {
    nameOfSanta: string;
    isVisibleButton = false;
    adminPassword = 'qazwsx'
    participantsList: SecretSanta[] = [];
    participant: SecretSanta;
    isVisible = false;
    isEditMode = false;
    isDisabled = false;
    isLoadingOne = false;
    isVisibleModal = false;
    isAdministrator = false;
    id = 1;
    editId = 0;

    
    constructor(
      private service: SecretSantaService,
      private resultService: ResultsService,
      private notification: NzNotificationService,
      private modalService: NzModalService,
      private loadingService: LoadingService
      ){
        this.nameOfSanta = this.service.nameOfSanta;
      }

    async ngOnInit() {
      await this.service.getParticipant(this.nameOfSanta).then(data => {
        this.participant = data;
      });
      if (this.participant.selected) {
        await this.getSanta();
      } else {
        await this.reloadList();
      }
      console.log(this.participantsList);
      
      if (this.nameOfSanta === 'Boris') {
        this.isAdministrator = true;
      }
    }

    async reloadList(){
      this.loadingService.changeState(true)
      await this.service.getList().then(data => {
        this.participantsList = data;
      });
      this.loadingService.changeState(false)
    }

    async getSanta() {
      let result: Results;
      await this.resultService.getBySanta(this.participant.name).then(data => {
        result = data;
      })      
      await this.service.getParticipant(result.participant).then(data => {
        this.participantsList.push(data);
      });
      
    }

    createPart(part: SecretSanta) {
      this.service.add(part)
      .then((data) => {
        this.isVisibleButton = false;
        this.notification.create(
          "success",
          'Create',
          'A-ți fost înregisrat cu succes !!'
        );
      this.reloadList();
      }).catch(() => {
        this.notification.create(
          "error",
          'Create',
          'A apărut o eroare încercați mai târziu !!'
        );
      })
    }

   editPart(part: SecretSanta) {
      this.service.edit(part)
      .then((data) => {
        this.notification.create(
          "success",
          'Update',
          'Numele a fost editat cu succes !!'
        );
      this.reloadList();
      }).catch(() => {
        this.notification.create(
          "error",
          'Update',
          'A apărut o eroare încercați mai târziu !!'
        );
      })
    }

    generate() {
      this.isLoadingOne = true;
      setTimeout(() => {
        this.isLoadingOne = false;
        this.service.generate(this.participant.id)
        .then((data) => {
          if (data.name != undefined) {
            this.showConfirm(data.name);
            this.resultService.add(new Results(0, this.nameOfSanta, data.name));
            this.participantsList = [];
            this.participantsList.push(data);
            this.isDisabled = true;
          } else {
            this.notification.create(
              "error",
              'Generate',
              'Numai sunt participanti încercați mai târziu !!'
            );
          }
        }).catch(() => {
          this.notification.create(
            "error",
            'Generate',
            'A apărut o eroare încercați mai târziu !!'
          );
        })
      }, 2000);
    }

    delete(id: number){
      this.service.delete(id).then((data) => {
        this.notification.create(
          "success",
          'Delete',
          'Înregistrarea a fost ștearsă cu succes !!'
        );
      this.reloadList();
      }).catch(() => {
        this.notification.create(
          "error",
          'Delete',
          'A apărut o eroare încercați mai târziu !!'
        );
      })
      this.reloadList();
    }

    edit(data: SecretSanta){
     if(data.name === this.nameOfSanta || this.isAdministrator) {
        this.angForm.get('name').setValue(data.name);
        this.editId = data.id;
        this.isVisible = true;
        this.isEditMode = true;
      }
    }

    showConfirm(name: string): void {
      this.modalService.confirm({
        nzTitle: 'Rezultatele Extragerii',
        nzContent: 'Felicitări ați ales persoana căruia trebuie săi faceți cadou !!\n Persoana este: <b>' + name + '<b>',
        nzOkText: 'OK',
        nzCancelText: 'Cancel'
      });
    }

    // Modal
    addModal():void{
      this.isVisible = true;
    }

    handleCancel(): void {
      this.isVisible = false;
      this.isVisibleModal = false;
    }

    addHandleOk(): void {
      this.isVisible = false;
      this.onFormSubmit();    
    }

    login(){
      this.isVisibleModal = true;
    }

    verificaParola(): void {
      if (this.password === this.adminPassword){
        this.notification.create(
          "success",
          'Password',
          'Felicitari vati logat ca Administrator !!'
        );
        this.isAdministrator = true;
      } else {
        this.notification.create(
          "error",
          'Parola',
          'Parola este incorectă !!'
        );
      }
      this.isVisibleModal = false;
    }

    angForm = new FormGroup({
      password: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
    });
  
    get name(): any {
      return this.angForm.get('name').value;
    }

    get password(): any {
      return this.angForm.get('password').value;
    }

    // Form
    onFormSubmit(): void {
        if (this.isEditMode) {
          this.editPart(new SecretSanta(this.editId, this.name, this.password))
        } else {      
          this.createPart(new SecretSanta(0, this.name, this.password));
        }
        // this.service.nameOfSanta = this.name;
        this.editId = 0;
        this.isEditMode = false;
    }
    // }
  }