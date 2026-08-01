import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '../../../material.module';
import { AllApiService } from '../../../_service/all-api.service';
import { ApiUrl } from '../../../_core/apiUrl';

@Component({
  selector: 'app-delete-driver',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MaterialModule],
  templateUrl: './delete-driver.html',
  styleUrl: './delete-driver.scss',
})
export class DeleteDriver {

  fileId!: number;
  actionType!: 'DELETE' | 'PERMANENT';
  confirmText: string = '';

  isLoading = false;
  message = '';
  isSuccess = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: AllApiService,
    private dialogRef: MatDialogRef<DeleteDriver>
  ) {}

  ngOnInit(): void {
    this.fileId = this.data?.fileId;
    this.actionType = this.data?.actionType;
  }

  // =========================
  // 🔥 DELETE ACTION
  // =========================
confirmDelete(): void {

  if (!this.fileId) return;

  this.isLoading = true;
  this.message = '';

  const url =
    this.actionType === 'DELETE'
      ? ApiUrl.deleteFileDriver
      : ApiUrl.deleteDriverFilePermanet;

  const request =
    this.actionType === 'DELETE'
      ? this.api.deleteDriverFile(url, this.fileId)
      : this.api.deleteDriverFilePermanent(url, this.fileId);

  request.subscribe({
    next: () => this.handleSuccess(),
    error: (err) => this.handleError(err)
  });
}

  // =========================
  // ✅ SUCCESS
  // =========================
  private handleSuccess(): void {
    this.isLoading = false;

    this.isSuccess = true;
    this.message =
      this.actionType === 'DELETE'
        ? 'File marked as deleted successfully'
        : 'File permanently deleted successfully';

    // close after showing message
    setTimeout(() => {
      this.dialogRef.close(true);
    }, 1500);
  }

  // =========================
  // ❌ ERROR
  // =========================
  private handleError(err: any): void {
    console.error('Delete error:', err);

    this.isLoading = false;
    this.isSuccess = false;
    this.message = 'Something went wrong!';
  }

  // =========================
  // ❌ CLOSE
  // =========================
  close(): void {
    this.dialogRef.close(false);
  }
}