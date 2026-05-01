import { Component } from '@angular/core';
import { PromptDashboardComponent } from './prompt-dashboard/prompt-dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PromptDashboardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'prompt-library-app';
}
