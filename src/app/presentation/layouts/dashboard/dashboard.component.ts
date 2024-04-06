import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Route, RouterModule} from "@angular/router";
import {SidebarMenuItemComponent} from "../../components/sidebar-menu-item/sidebar-menu-item.component";
import {routes} from "../../../app.routes";


/*
* About change Detection Setup:
*   - By Default it will use ZONE JS
*   - When we're working with onPush, we will need to work with SIGNALS
*   - So SIGNALS will tell Angular WHERE & WHEN to update the DOM
* */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarMenuItemComponent],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  public routes: Route[] = routes[0].children?.filter((route) => route.data)!;
}
