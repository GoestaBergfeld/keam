import { environment } from './../../environments/environment';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatSelectModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTabsModule,
  MatSnackBarModule
} from '@angular/material';
import { NgHttpLoaderModule } from 'ng-http-loader';

import { EnumToArrayPipe } from './pipes/enumarray.pipe';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpHeadersInterceptor } from './http-interceptor';
import { NodeService } from './entities/nodes/node.service';
import { NotificationService } from './notification.service';
import { AttributeService } from './entities/attributes/attribute.service';
import { RelationTypeService, RelationService } from './entities';
import { NodeTypeService } from './entities/node-types/node-type.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    NgHttpLoaderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatSnackBarModule
  ],
  declarations: [
    ConfirmationModalComponent,
    EnumToArrayPipe,
    TopbarComponent
  ],
  entryComponents: [
    ConfirmationModalComponent
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    NgHttpLoaderModule,
    TopbarComponent,
    EnumToArrayPipe,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatSnackBarModule
  ],
  providers: []
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        {
          provide: 'environment',
          useValue: environment
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpHeadersInterceptor,
          multi: true
        },
        NodeService,
        AttributeService,
        NotificationService,
        NodeTypeService,
        RelationService,
        RelationTypeService
      ]
    };
  }
}
