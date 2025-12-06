import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],   // 👈 THIS is the important part
  templateUrl: './app.html',
})
export class App {}
