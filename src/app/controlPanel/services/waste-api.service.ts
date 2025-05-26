import {BaseService} from "../../shared/services/base.service";
import {environment} from "../../../environments/environment";
import {Waste} from "../model/waste.entity";
import {Injectable} from "@angular/core";

const wasteEndPointPath = environment.wasteEndPointPath;

@Injectable({
  providedIn: 'root'
})

export class WasteApiService extends BaseService<Waste>{
  constructor() {
    super();
    this.resourceEndPoint = wasteEndPointPath;
  }
}
