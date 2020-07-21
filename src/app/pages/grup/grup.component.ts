import { Component, OnInit } from '@angular/core';
import { GrupService } from '../services/grup.service';
import { ReactiveFormsModule , FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
import { Grup } from '../models/grup';

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

 
  constructor(private service: GrupService) { }


  ngOnInit(): void {
    this.service.getList().then(data => {this.grupList = data; console.log(this.grupList); }
    );
  }
  
  adding(grup: Grup){
    this.service.add(grup).then(data => console.log(data)
    ).catch(e => this.service.getList().then(r => this.grupList = r));
  }

  updating(grup: Grup){
    this.service.update(grup).then(data => console.log(data)
    ).catch(e => this.service.getList().then(r => this.grupList = r));
  }

  delete(id: number) {
    this.service.delete(id).then(data => console.log(data)
    ).catch(e => this.service.getList().then(r => this.grupList = r));
  }

// ============================================================================== Modal
  showModal(id: number): void {
    console.log('show modall clicked!');
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