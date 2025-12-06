// src/app/teacher/teacher.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ClassItem {
  id: number | string;
  name: string;
}

interface StudentAttendance {
  id: number | string;
  name: string;
  present: boolean;
}

interface AttendanceRecord {
  date: string;
  className: string;
  students: StudentAttendance[];
}

interface Report {
  title: string;
  description: string;
  subject: string;
  totalStudents: number;
  present: number;
  absent: number;
  rate: number;
}

@Component({
  selector: 'app-teacher',
  standalone: true,
  // 👇 Needed for *ngIf, *ngFor, and [(ngModel)]
  imports: [CommonModule, FormsModule],
  templateUrl: './teacher.html',
  styleUrls: ['./teacher.css']   // 👈 must be styleUrls (plural)
})
export class Teacher {
  // flags used by *ngIf in teacher.html
  showAttendanceForm = false;
  showAttendanceLists = false;
  showReports = false;

  // dropdown list of classes
  classes: ClassItem[] = [
    { id: 1, name: 'Grade 1 - Section A' },
    { id: 2, name: 'Grade 2 - Section B' }
  ];

  // bound to [(ngModel)]="selectedClass"
  selectedClass: number | string | null = null;

  // students used in *ngFor="let student of students"
  students: StudentAttendance[] = [
    { id: 1, name: 'Student A', present: false },
    { id: 2, name: 'Student B', present: false },
    { id: 3, name: 'Student C', present: false }
  ];

  // attendance records used in *ngFor="let record of attendanceRecords"
  attendanceRecords: AttendanceRecord[] = [];

  // reports used in *ngFor="let report of reports"
  reports: Report[] = [];

  // methods used in (click) in teacher.html

  viewClasses(): void {
    console.log('View Classes clicked');
    // you can add navigation or logic here later
  }

  recordAttendance(): void {
    this.showAttendanceForm = true;
    this.showAttendanceLists = false;
    this.showReports = false;
  }

  viewAttendanceLists(): void {
    this.showAttendanceLists = true;
    this.showAttendanceForm = false;
    this.showReports = false;
  }

  viewClassRecords(): void {
    console.log('View Class Records clicked');
    // could switch to a specific tab / section
  }

  generateReports(): void {
    this.showReports = true;
    this.showAttendanceForm = false;
    this.showAttendanceLists = false;

    // Calculate attendance summary from records
    let totalStudents = 0;
    let totalPresent = 0;
    let totalAbsent = 0;

    this.attendanceRecords.forEach(record => {
      record.students.forEach(student => {
        totalStudents++;
        if (student.present) {
          totalPresent++;
        } else {
          totalAbsent++;
        }
      });
    });

    const attendanceRate = totalStudents > 0 ? Math.round((totalPresent / totalStudents) * 100) : 0;

    // dummy example report
    this.reports = [
      {
        title: 'Monthly Attendance Summary',
        description: 'Summary of attendance for all classes this month.',
        subject: 'All Subjects',
        totalStudents: totalStudents,
        present: totalPresent,
        absent: totalAbsent,
        rate: attendanceRate
      }
    ];
  }

  viewStudents(): void {
    console.log('View Students clicked');
  }

  submitAttendance(): void {
    if (!this.selectedClass) {
      console.warn('No class selected');
      return;
    }

    const selectedClassObj = this.classes.find(c => c.id === this.selectedClass);

    const newRecord: AttendanceRecord = {
      date: new Date().toISOString().slice(0, 10),
      className: selectedClassObj?.name ?? 'Unknown class',
      students: this.students.map(s => ({ ...s })) // copy to freeze current state
    };

    this.attendanceRecords.push(newRecord);

    console.log('Attendance submitted:', newRecord);
  }
}
