import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { NotificationService } from '../notification.service';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { ConfirmationModalComponent } from '../components/confirmation-modal/confirmation-modal.component';
import { EntityTableStruct } from './entity-table.model';

export abstract class BaseEntityService<T> {

  private collection: BehaviorSubject<T[]> = new BehaviorSubject<T[]>(null);
  public readonly collection$: Observable<T[]> = this.collection.asObservable();

  private loaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly loaded$ = this.loaded.asObservable();

  private loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this.loading.asObservable();

  private error: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public readonly error$ = this.error.asObservable();

  constructor(
    public endpoint: string,
    private http: HttpClient,
    private notificationService: NotificationService) {
  }

  getAll(force?: boolean, query?: string): void {
    if (!this.collection.value || force) {
      let url = this.endpoint;
      if (query) {
        url += '?' + query;
      }
      this.loading.next(true);
      this.http.get<T[]>(url).subscribe(collection => {
        this.loading.next(false);
        this.loaded.next(true);
        this.collection.next(collection);
      }, error => {
        this.notificationService.show('Error loading data');
        this.loading.next(false);
        this.loaded.next(false);
        this.error.next(error);
      });
    } else {
      this.collection.next(this.collection.value);
    }
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.endpoint}(${id})`);
  }

  insert(obj: T, query?: string): void {
    // if (query) {
    //   query = '?' + query;
    // } else {
    //   query = '';
    // }
    // query = '';
    this.http.post<T>(`${this.endpoint}`, obj).subscribe(insertedObj => {
      // const currentValue = this.collection.value;
      // currentValue.push(insertedObj);
      // this.collection.next(currentValue);
      this.getAll(true, query);
      this.notificationService.show('Successfully added');
    }, error => {
      this.notificationService.show('Error inserting item');
    });
  }

  update(obj: T, query?: string): void {
    // if (query) {
    //   query = '?' + query;
    // } else {
    //   query = '';
    // }
    // query = '';
    this.http.put<T>(`${this.endpoint}(${obj['Id']})`, obj).subscribe(updatedObj => {
      // const currentValue = this.collection.value;
      // const index = currentValue.findIndex(p => p['Id'] === obj['Id']);
      // if (index > -1) {
      //   currentValue[index] = updatedObj;
      //   this.collection.next(currentValue);
      // }
      this.getAll(true, query);
      this.notificationService.show('Successfully updated');
    }, error => {
      this.notificationService.show('Error updating item');
      console.log('error', error);
    });
  }

  upsert(obj: T, query?: string): void {
    if (obj['Id']) {
      return this.update(obj, query);
    }
    return this.insert(obj, query);
  }

  delete(id: number, query?: string): void {
    this.http.delete<T>(`${this.endpoint}(${id})`).subscribe((deletedObj: any) => {
      // const currentValue = this.collection.value;
      // const index = currentValue.findIndex(p => p['Id'] === deletedObj.value);
      // if (index > -1) {
      //   currentValue.splice(index, 1);
      //   this.collection.next(currentValue);
      // }
      this.getAll(true, query);
      this.notificationService.show('Successfully deleted');
    }, error => {
      this.notificationService.show('Error deleting item');
    });
  }

}

