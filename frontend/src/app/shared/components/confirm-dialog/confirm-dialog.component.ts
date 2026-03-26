import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  template: `
    <h2>Potwierdzenie</h2>

    <p>{{ data.message }}</p>

    <div style="margin-top: 20px; display: flex; gap: 10px;">
      <button (click)="close(false)">Anuluj</button>
      <button (click)="close(true)">Usuń</button>
    </div>
  `
})
export class ConfirmDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    private dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) {}

  close(result: boolean): void {
    this.dialogRef.close(result);
  }
}
