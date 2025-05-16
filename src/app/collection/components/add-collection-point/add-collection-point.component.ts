import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-add-collection-point',
  standalone: true,
  templateUrl: './add-collection-point.component.html',
  styleUrls: ['./add-collection-point.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TranslateModule,
  ]
})
export class AddCollectionPointModalComponent {
  addPointForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddCollectionPointModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.addPointForm = this.fb.group({
      name: [''],
      schedule: [''],
      phone: [''],
      materials: [''],
      lat: [0],
      lng: [0],
    });
  }

  onSubmit(): void {
    if (this.addPointForm.valid) {
      const formValue = this.addPointForm.value;

      if (typeof formValue.materials === 'string') {
        formValue.materials = formValue.materials.split(',').map((m: string) => m.trim());
      } else {
        formValue.materials = [];
      }

      this.dialogRef.close(formValue);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
