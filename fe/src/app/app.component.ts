import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  template:`
  <button nz-button nzType="primary">Primary</button>`
})
export class AppComponent {
  title = 'fe';
}
