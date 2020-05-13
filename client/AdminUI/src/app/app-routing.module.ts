import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutMainComponent } from './components/layout/layout-main/layout-main.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { ServiceSubscriptionComponent } from './components/service-subscription/service-subscription.component';
import { DeceptionCalculatorComponent } from './components/deception-calculator/deception-calculator.component';
import { TempalteManagerComponent } from './components/template-manager/template-manager.component';
import { SearchPanelComponent } from './components/search-panel/search-panel.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { DomainsComponent } from './components/domains/domains.component';
import { TemplatesPageComponent } from './components/templates-page/templates-page.component';
import { UserAdminComponent } from './components/user-admin/user-admin.component';
import { CustomersComponent } from './components/customers/customers.component';


const routes: Routes = [
  {
    path: 'subscription',
    component: LayoutMainComponent,
    children: [
      { path: '', component: SubscriptionsComponent },
      { path: '', component: SearchPanelComponent, outlet: 'sidebar' }
    ]
  },
  {
    path: 'servicesubscription',
    component: LayoutMainComponent,
    children: [{ path: '', component: ServiceSubscriptionComponent }]
  },
  {
    path: 'deceptioncalculator',
    component: LayoutMainComponent,
    children: [{ path: '', component: DeceptionCalculatorComponent }]
  },
  {
    path: 'deceptioncalculator/:templateId',
    component: LayoutMainComponent,
    children: [{ path: '', component: DeceptionCalculatorComponent }]
  },
  {
    path: 'templatemanager',
    component: LayoutMainComponent,
    children: [{ path: '', component: TempalteManagerComponent }]
  },
  {
    path: 'templatemanager/:templateId',
    component: LayoutMainComponent,
    children: [{ path: '', component: TempalteManagerComponent }]
  },
  {
    path:'templatespage', component: LayoutMainComponent, 
    children: [
      { path: '', component: TemplatesPageComponent}
    ]
  },
  {
    path:'contacts', component: LayoutMainComponent, 
    children: [
      { path: '', component: ContactsComponent}
    ]
  },
  {
    path:'customers', component: LayoutMainComponent,
    children: [
      { path: '', component: CustomersComponent}
    ]
  },
  {
    path:'domains', component: LayoutMainComponent, 
    children: [
      { path: '', component: DomainsComponent}
    ]
  },
  {
    path:'useradmin', component: LayoutMainComponent, 
    children: [
      { path: '', component: UserAdminComponent}
    ]
  },
  {
    path:'', component: LayoutMainComponent,
    children: [
      { path: '', component: SubscriptionsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
