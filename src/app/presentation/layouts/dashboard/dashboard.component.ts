import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {routes} from "../../../app.routes";
import { SidebarMenuItemComponent } from '@components/index';
import {Route, RouterOutlet} from "@angular/router";


/*
* About change Detection Setup:
*   - By Default it will use ZONE JS
*   - When we're working with onPush, we will need to work with SIGNALS
*   - So SIGNALS will tell Angular WHERE & WHEN to update the DOM
* */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarMenuItemComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  public routes: Route[] = routes[0].children?.filter((route) => route.data)!;
}
