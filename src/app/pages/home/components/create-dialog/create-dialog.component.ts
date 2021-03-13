import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ErrorService } from 'src/app/shared/services/error.service';
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
  public metrics = [];

  constructor(private mainService: MainService, public dialog: MatDialog, private errorService: ErrorService) {
    this.metrics = this.mainService.metrics;
    console.log(this.metrics);
    
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      id: new FormControl('', [Validators.required, Validators.minLength(5)]),
      count: new FormControl('2', [Validators.required, Validators.max(10), Validators.min(1)]),
    });

  }

  ngAfterViewInit(): void {
    document.querySelector('mat-button-toggle:first-child').dispatchEvent(new Event('click'));
  }

  public onSubmit(): void {

    this.mainService.checkIfExist(this.form.value.id.trim()).subscribe(exist => {
      if (!exist) {
        this.data = {
          name: this.form.value.name.trim(),
          count: this.form.value.count,
          id: this.form.value.id.trim(),
          type: this.selectedMetric,
          alternatives: [],
          votes: []
        };

        this.alternativesForm = new FormGroup({});
        for (let i = 0; i < this.data.count; i++) {
          this.alternativesForm.addControl(`${i}`, new FormControl(`Альтернатива ${i + 1}`, Validators.required));
          this.data.alternatives.push('');
        }
      } else {
        this.errorService.showCreateError();
      }
    });

    
  }

  public onSubmitAlternatives(): void {
    // tslint:disable: forin
    for (const i in this.alternativesForm?.value) {
      this.data.alternatives[i] = this.alternativesForm?.value[i];
    }

    this.mainService.create(this.data);
    this.dialog.closeAll();
  }


  public close() {
    this.dialog.closeAll();
  }
}
