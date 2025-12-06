import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { Teacher } from '../teacher/teacher';
import { Student } from '../student/student';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIf, Teacher, Student],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  // DEFAULT SECTION
  activeSection: 'home' | 'teacher' | 'student' = 'home';

  constructor(private router: Router) {}

  // Change the active content section
  setSection(section: 'home' | 'teacher' | 'student') {
    this.activeSection = section;
  }

  // Logout
  onLogout(): void {
    this.router.navigate(['/']);
  }
}
