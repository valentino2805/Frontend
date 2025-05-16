import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {TipsListComponent} from "../../components/tips-list/tips-list.component";

@Component({
  selector: 'app-sustainable-actions',
  standalone: true,
  imports: [TranslateModule,TipsListComponent],
  templateUrl: './sustainable-actions.component.html',
  styleUrl: './sustainable-actions.component.css'
})
export class SustainableActionsComponent {

}
