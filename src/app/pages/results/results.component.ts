import { Component, OnInit  } from '@angular/core';
import { Results } from '../models/results';
import { ResultsService } from '../services/results.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.css']
  })
  
export class ResultsComponent implements OnInit {
  resultsList: Results[] = []
  isVisible = false;
  editId: number;

  constructor(
      private service: ResultsService,

        ){}

  ngOnInit(): void {
    this.service.getList().then(data => {
        this.resultsList = data;
    });
  }
  reloadList() {
    this.service.getList().then(data => {
      this.resultsList = data;
    });
  }

  async delete(id: number) {
    await this.service.delete(id);
    this.reloadList();
  }

  async edit() {
    this.isVisible = false;
    await this.service.edit(new Results(this.editId, this.santaName, this.partName));
    this.reloadList();
  }

  editData(data: Results) {
    this.editId = data.id;
    this.resultForm.get('santa').setValue(data.secretSanta);
    this.resultForm.get('participant').setValue(data.participant);
    this.isVisible = true
  }

  handleCancel() {
    this.isVisible = false;
  }

  onFormSubmit() {

  }

  resultForm = new FormGroup({
    santa: new FormControl('', Validators.required),
    participant: new FormControl('', Validators.required),
  });

  get santaName(): any {
    return this.resultForm.get('santa').value;
  }

  get partName(): any {
    return this.resultForm.get('participant').value;
  }
}