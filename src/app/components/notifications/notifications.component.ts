import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {
  @Input() msg: string = "";
  notification: string = "";
  visible: boolean = false;
  @Input() type: string = "";

  constructor(private router: Router) { }

  ngDoCheck(): void {
    if (this.msg !== "") {
      this.notification = this.msg
      this.visible = true;
    }
  }

  close() {
    this.notification = "";
    this.visible = false;
    this.router.navigate(['/home']);
  }
}
