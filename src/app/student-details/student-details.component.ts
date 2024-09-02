import { Component, Input, Output, EventEmitter } from '@angular/core';

interface Student {
  id: number;
  name: string;
  email: string;
  mobile: string;
  dob: string;
}

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent {
  @Input() student: Student | null = null;
  @Output() back = new EventEmitter<void>();

  onBack() {
    this.back.emit();
  }
}
