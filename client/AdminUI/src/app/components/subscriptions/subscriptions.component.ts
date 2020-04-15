import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from 'src/app/services/subscription.service';




@Component({
  selector: 'app-dashboard',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {

  activeStatus = ["prohibit", "hourglass", "pause", "play", "stop"];

  displayedColumns = ["SubscriptionName",
    "Status",
    "PrimaryContact",
    "Customer",
    "LastActionDate",
    "Active"];
  subscriptionsData = [
    { "SubscriptionName": "SC-1031.Matt-Daemon.1.1", "Status": "  Waiting on SRF", "PrimaryContact": " Matt Daemon", "Customer": "Some Company.2com", "LastActionDate": " 3/26/2020", "Active": "prohibit", },
    { "SubscriptionName": "SC-1221.Ben-Aflex.1.1", "Status": "  Waiting on SRF", "PrimaryContact": " Ben Aflex", "Customer": "Some Company.3com", "LastActionDate": " 3/26/2020", "Active": true },
    { "SubscriptionName": "SC-654.George-Clooney.1.1", "Status": "  Stopped", "PrimaryContact": " George Clooney", "Customer": "Some Company.1com", "LastActionDate": " 3/26/2020", "Active": true },
    { "SubscriptionName": "SC-654.George-Clooney.1.2", "Status": "  Stopped", "PrimaryContact": " George Clooney", "Customer": "Some Company.1com", "LastActionDate": " 3/26/2020", "Active": true },
    { "SubscriptionName": "SC-654.George-Clooney.1.3", "Status": "  Waiting for New Template", "PrimaryContact": " George Clooney", "Customer": "Some Company.1com", "LastActionDate": " 3/26/2020", "Active": true },
    { "SubscriptionName": "SC-654.George-Clooney.2.1", "Status": "  Stopped", "PrimaryContact": " George Clooney", "Customer": "Some Company.1com", "LastActionDate": " 3/26/2020", "Active": true },
    { "SubscriptionName": "SC-654.George-Clooney.2.2", "Status": "  Stopped", "PrimaryContact": " George Clooney", "Customer": "Some Company.1com", "LastActionDate": " 3/26/2020", "Active": true },
    { "SubscriptionName": "SC-654.George-Clooney.2.3", "Status": "  Running Campaign", "PrimaryContact": " George Clooney", "Customer": "Some Company.1com", "LastActionDate": "3/26/2020", "Active": true },
    { "SubscriptionName": "IDEQ-1234.Mary-Stephens.1.1", "Status": "  Waiting on ROE", "PrimaryContact": " Mary Stephens", "Customer": "Idaho DEQ State Agency", "LastActionDate": "4/2/2020", "Active": true },
    { "SubscriptionName": "DOE-1.Don-Mann.1.1", "Status": " Waiting on Domain Approval", "PrimaryContact": " Don Mann", "Customer": "DOE Federal", "LastActionDate": "4/2/2020", "Active": true },
    { "SubscriptionName": "DOE-1.Jane-Doe.1.1", "Status": "90 Day Cycle Ended", "PrimaryContact": "Jane Doe", "Customer": "DOE Federal", "LastActionDate": "4/2/2020", "Active": true },
    { "SubscriptionName": "DODLOF-1.Jane-Moore.1.1", "Status": " Waiting on Template Approval", "PrimaryContact": " Jane Moore", "Customer": "DOD Little Office Federal", "LastActionDate": "4/2/2020", "Active": true },
    { "SubscriptionName": "MDMV-1.David-Young.1.1", "Status": " Starting Campaigns", "PrimaryContact": "David Young", "Customer": "Maryland DMV State Agency", "LastActionDate": "4/2/2020", "Active": true },
    { "SubscriptionName": "STO-1.Sefina.1.1", "Status": " Waiting for New Templates", "PrimaryContact": "Sefina CISO", "Customer": "Samoa Territorial Office", "LastActionDate": "4/2/2020", "Active": true },
    { "SubscriptionName": "DEdu.Sarah-Jones.1.1", "Status": "Paused", "PrimaryContact": "Sarah Jones", "Customer": "Department of Eduation", "LastActionDate": "4/2/2020", "Active": true },
    { "SubscriptionName": "FORD-1.Jerry-Ford.1.1", "Status": "Stopped", "PrimaryContact": "Jerry Ford", "Customer": "Ford New Cars", "LastActionDate": "4/2/2020", "Active": true },
  ];

  constructor(
    private subscriptionsSvc: SubscriptionService
    ) { }

  ngOnInit(): void {
    this.subscriptionsSvc.getSubscriptionsData().subscribe((data: any) => {
      console.log(data);
      this.subscriptionsData = data;      
    });
  }

  getRandomStatusIcon(): string {
    this.subscriptionsData.forEach((s: any) => {
      s.Active = this.getRandomStatusIcon();
    });
    return this.activeStatus[Math.floor((Math.random() * this.activeStatus.length))];
  }
}