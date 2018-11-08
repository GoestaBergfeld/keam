import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable()
export class NotificationService {

  config: MatSnackBarConfig = {
    duration: 1000,
    verticalPosition: 'top'
  };

  constructor(private snackbar: MatSnackBar) {}

  show(message: string) {
    this.snackbar.open(message, null, this.config);
  }

}
