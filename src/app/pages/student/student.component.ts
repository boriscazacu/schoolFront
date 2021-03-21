import { Component, OnInit  } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Grup } from '../models/grup';
import { GrupService } from '../services/grup.service';



@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})



export class StudentComponent implements OnInit {
  isVisible = false;
  addIsVisible = false;
  studentList: Student[] = [];
  grupList: Grup[] = [];
  student: Student[] = [];

  constructor(private service: StudentService, private gruService: GrupService, 
    private modal: NzModalService, private message: NzMessageService) { }


  ngOnInit(): void {
    this.service.getList().then(data => {
      this.studentList = data;
    });
    this.gruService.getList().then(data => {
      this.grupList = data;
    });
  }

  delete(id: number) {
    this.service.delete(id).then(data => console.log(data)
    ).catch(e => this.service.getList().then(r => this.studentList = r));
    this.message.create("success", `This Student has been deleted`);

  }
  adding(student: Student){
    this.service.add(student).then(data => console.log(data)
    ).catch(e => this.service.getList().then(r => this.studentList = r));
    this.message.create("success", `This Student has been added`);

  }
  updating(student: Student){
    this.service.update(student).then(data => console.log(data)
    ).catch(e => this.service.getList().then(r => this.studentList = r));
    console.log(student);
    this.message.create("success", `This Student has been edited`);

  }

  
  //------------------------------------------------- Modal
  showModal(id: number): void {
    this.isVisible = true;  
    this.studentList.forEach(element => {
      if (id == element.id){
        this.student.push(element);
      }
    });
    
  }

  addModal():void{
    this.addIsVisible = true;
    this.clearForm();
  }
  handleOk(): void {
    this.isVisible = false;
    this.submitForm();    
  }
  addHandleOk(): void{
    this.addIsVisible = false;
    this.onFormSubmit();
  }

  handleCancel(): void {
    this.isVisible = false;
    this.addIsVisible = false;
  }

  showDeleteConfirm(id: number): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this Student?',
      // nzContent: '<br><b style="color: red;">id</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => this.delete(id),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }


  //-------------------------------------------------------------- Forms
  angForm = new FormGroup({
    id: new FormControl('', Validators.required),
    fname: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
    sex: new FormControl('', Validators.required),
    idGr: new FormControl('', Validators.required),
  });

  get id(): any {
    return this.angForm.get('id');
  }
  get fname(): any {
    return this.angForm.get('fname');
  }
  get lname(): any {
    return this.angForm.get('lname');
  }
  get sex(): any {
    return this.angForm.get('sex');
  } 
  get idGr(): any {
    return this.angForm.get('idGr');
  } 
  
  clearForm(): void{
    this.angForm.reset();
  }
  submitForm(): void{
    this.updating(new Student(this.angForm.get('id').value,this.angForm.get('fname').value, 
    this.angForm.get('lname').value,this.angForm.get('sex').value, this.angForm.get('idGr').value));
  }
  onFormSubmit(): void {
    this.adding(new Student(null,this.angForm.get('fname').value, this.angForm.get('lname').value,
    this.angForm.get('sex').value,this.angForm.get('idGr').value));
  }
  
    
  }

