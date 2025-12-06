// src/app/student/student.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface AttendanceRecord {
  date: string;
  status: string;
  subject: string;      // 👈 added
}

interface ClassSchedule {
  subject: string;
  time: string;
  room: string;
  teacher: string;      // 👈 added
}

interface Announcement {
  title: string;
  content: string;
  date: string;
}

interface StudentProfile {
  name: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student.html',
  styleUrls: ['./student.css']
})
export class Student {
  // flags used by *ngIf in student.html
  showAttendance = false;
  showSchedule = false;
  showProfile = false;
  showAnnouncements = false;

  // data used in *ngFor and bindings
  attendanceRecords: AttendanceRecord[] = [
    { subject: 'Math',    date: '2025-12-01', status: 'Present' },
    { subject: 'Science', date: '2025-12-02', status: 'Absent' }
  ];

  schedule: ClassSchedule[] = [
    { subject: 'Math',    time: '8:00–9:00',  room: '101', teacher: 'Mr. Cruz' },
    { subject: 'English', time: '9:00–10:00', room: '102', teacher: 'Ms. Reyes' }
  ];

  announcements: Announcement[] = [
    { title: 'Exam Week', content: 'Midterms next week.', date: '2025-12-03' }
  ];

  profile: StudentProfile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '0917 000 0000'
  };

  // methods called from (click) in student.html
  viewCourses(): void {
    console.log('View Courses clicked');
  }

  viewAttendance(): void {
    this.showAttendance = true;
    this.showSchedule = false;
    this.showProfile = false;
    this.showAnnouncements = false;
  }

  viewGrades(): void {
    console.log('View Grades clicked');
  }

  viewSchedule(): void {
    this.showSchedule = true;
    this.showAttendance = false;
    this.showProfile = false;
    this.showAnnouncements = false;
  }

  editProfile(): void {
    this.showProfile = true;
    this.showAttendance = false;
    this.showSchedule = false;
    this.showAnnouncements = false;
  }

  viewAnnouncements(): void {
    this.showAnnouncements = true;
    this.showAttendance = false;
    this.showSchedule = false;
    this.showProfile = false;
  }

  updateProfile(): void {
    console.log('Profile updated:', this.profile);
  }
}
