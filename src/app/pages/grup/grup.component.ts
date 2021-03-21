import { Component, OnInit } from '@angular/core';
import { GrupService } from '../services/grup.service';
import { ReactiveFormsModule , FormGroup, NgForm, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Grup } from '../models/grup';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-grup',
  templateUrl: './grup.component.html',
  styleUrls: ['./grup.component.css']
})



export class GrupComponent implements OnInit {
  addIsVisible = false;
  iisVisible = false;
  grupList: Grup[] = [];
  grup: Grup[] = [];

 
  constructor(private service: GrupService, private modal: NzModalService,private notification: NzNotificationService) { }


  ngOnInit(): void {
    this.service.getList().then(data => {this.grupList = data; }
    );
  }
  
  adding(grup: Grup){
    this.service.add(grup).then(data => console.log(data)
    ).catch(e => this.service.getList().then(r => this.grupList = r));
    this.notification.create(
      "success",
      'CREATE',
      'This group has been created'
    );
  }

  updating(grup: Grup){
    this.service.update(grup).then(data => console.log(data)
    ).catch(e => this.service.getList().then(r => this.grupList = r));
    this.notification.create(
      "success",
      'UPDATE',
      'This group has been updating'
    );
  }

  delete(id: number) {
    this.service.delete(id).then(data => console.log(data)
    ).catch(e => this.service.getList().then(r => this.grupList = r));
    this.notification.create(
      "success",
      'DELETE',
      'This group has been deleted'
    );
  }

// ============================================================================== Modal
  showModal1(id: number): void {
    this.iisVisible = true;
    this.grupList.forEach(element => {
      if (id == element.grupId){
        this.grup.push(element);
      }
    });  
  }
  addModal():void{
    this.addIsVisible = true;
  }
  addHandleOk(): void{
    this.addIsVisible = false;
    this.onFormSubmit();
  }
  handleOk(): void {
    this.iisVisible = false;
    this.submitForm();    
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.addIsVisible = false;
    this.iisVisible = false;

  }

  showDeleteConfirm(id: number): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this Grup?',
      // nzContent: '<br><b style="color: red;">id</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => this.delete(id),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }


  // ===========================================================================

  angForm = new FormGroup({
    idGr: new FormControl('', Validators.required),
    gName: new FormControl('', Validators.required),
    mName: new FormControl('', Validators.required),
  });

  get idGr(): any {
    return this.angForm.get('idGr');
  }
  get gName(): any {
    return this.angForm.get('gName');
  }
  get mName(): any {
    return this.angForm.get('mName');
  }
  
  
  submitForm(): void{
    this.updating(new Grup(this.angForm.get('idGr').value, this.angForm.get('gName').value, this.angForm.get('mName').value));
  }
  onFormSubmit(): void {
    this.adding(new Grup(null, this.angForm.get('gName').value, this.angForm.get('mName').value));
  }
}