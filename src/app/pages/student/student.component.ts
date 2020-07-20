import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Person {
  id: string;
  firstName: string;
  lastName: string;
  sex: string;
  grupa: string;
}

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  isVisible = false;
  studentList: Student[] = [];

  listOfData: Person[] = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Brown',
      sex:'M',
      grupa: 'New York'
    },
    {
      id: '2',
      firstName: 'Jim ',
      lastName: 'Green',
      sex:'M',
      grupa: 'London'
    },
    {
      id: '3',
      firstName: 'Joe ',
      lastName: 'Black',
      sex:'M',
      grupa: 'Sidney '
    }
  ];

  constructor(private service: StudentService) { }

  ngOnInit(): void {
    this.service.getList().then(data => {this.studentList = data; console.log(this.studentList); }
    );
  }

  delete(id: number) {
    this.service.delete(id).then(data => console.log(data)
    ).catch(e => this.service.getList().then(r => this.studentList = r));
  }


  
  // Modal
  showModal(): void {
    this.isVisible = true;    
  }
  value?: string;
  handleOk(): void {
    console.log('Button ok clicked!'+this.value);
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

}