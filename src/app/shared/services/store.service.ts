import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Store} from "../../controlPanel/model/Store.entity";

@Injectable({providedIn: 'root'})
export class StoreService {
  private storeSubject = new BehaviorSubject<Store | null>(null);
  store$ = this.storeSubject.asObservable();

  setStore(store: Store){
    this.storeSubject.next(store);
  }

  getStore(): Store | null {
    return this.storeSubject.value;
  }
}
