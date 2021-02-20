import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IData, MainService } from 'src/app/shared/services/main.service';


@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements AfterViewInit {

  public form: FormGroup;
  public alternativesForm: FormGroup | undefined;
  public data: IData | undefined;

  public selectedMetric = 0;
  public metrics = [
    ['Дуже добре', 'Добре', 'Байдуже', 'Погано', 'Дуже погано'],
    ['Категорично за', 'За', 'Байдуже', 'Проти', 'Категорично проти'],
    ['5', '4', '3', '2', '1']
  ];

  constructor(private mainService: MainService, public dialog: MatDialog) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      count: new FormControl('2', Validators.required),
    });

  }

  ngAfterViewInit(): void {
    document.querySelector('mat-button-toggle:first-child').dispatchEvent(new Event('click'));
  }

  public onSubmit(): void {
    this.data = {
      name: this.form.value.name,
      count: this.form.value.count,
      type: this.selectedMetric,
      alternatives: []
    };


    this.alternativesForm = new FormGroup({});
    for (let i = 0; i < this.data.count; i++) {
      this.alternativesForm.addControl(`${i}`, new FormControl(`Альтернатива ${i + 1}`, Validators.required));
      this.data.alternatives.push('');
    }
  }

  public onSubmitAlternatives(): void {
    // tslint:disable: forin
    for (const i in this.alternativesForm?.value) {
      this.data.alternatives[i] = this.alternativesForm?.value[i];
    }

    this.mainService.create(this.data);
    this.dialog.closeAll();
  }

}
