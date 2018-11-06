import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable()
export class NotificationService {

  config = {
    duration: 1000
  };

  constructor(private snackbar: MatSnackBar) {}

  show(message: string) {
    this.snackbar.open(message, null, this.config);
  }

}
