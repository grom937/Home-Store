import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  template: `
    <div class="confirm-dialog">
      <div class="icon">!</div>

      <h2 class="title">Potwierdzenie usunięcia</h2>

      <p class="message">
        {{ data.message }}
      </p>

      <div class="actions">
        <button type="button" class="cancel-button" (click)="close(false)">
          Anuluj
        </button>

        <button type="button" class="delete-button" (click)="close(true)">
          Usuń
        </button>
      </div>
    </div>
  `,
  styles: [`
    .confirm-dialog {
      min-width: 320px;
      max-width: 420px;
      padding: 8px 4px 4px;
      text-align: center;
    }

    .icon {
      width: 64px;
      height: 64px;
      margin: 0 auto 16px;
      border-radius: 50%;
      background: #fee2e2;
      color: #dc2626;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      font-weight: 700;
    }

    .title {
      margin: 0 0 12px;
      font-size: 26px;
      line-height: 1.2;
      color: #111827;
    }

    .message {
      margin: 0 0 24px;
      font-size: 16px;
      line-height: 1.6;
      color: #374151;
    }

    .actions {
      display: flex;
      justify-content: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    .cancel-button,
    .delete-button {
      border: none;
      border-radius: 10px;
      padding: 12px 18px;
      min-width: 120px;
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
      transition: 0.2s ease;
    }

    .cancel-button {
      background: #e5e7eb;
      color: #111827;
    }

    .cancel-button:hover {
      background: #d1d5db;
    }

    .delete-button {
      background: #dc2626;
      color: #ffffff;
    }

    .delete-button:hover {
      background: #b91c1c;
    }
  `]
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
