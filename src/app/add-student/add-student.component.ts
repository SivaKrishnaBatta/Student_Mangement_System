import { Component, Input, Output, EventEmitter } from '@angular/core';

interface Student {
  id: number;
  name: string;
  email: string;
  mobile: string;
  dob: string;
}

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {
  @Input() student: Student = { id: 0, name: '', email: '', mobile: '', dob: '' };
  @Output() studentAdded = new EventEmitter<Student>();
  @Output() cancel = new EventEmitter<void>();

  addStudent() {
    if (this.student.name && this.student.email && this.student.mobile && this.student.dob) {
      this.studentAdded.emit(this.student);
    } else {
      alert('Please fill out all fields correctly before submitting.');
    }
  }

  cancelForm() {
    this.cancel.emit();
  }
}
