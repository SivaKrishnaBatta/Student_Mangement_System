import { Component, Input, Output, EventEmitter } from '@angular/core';

interface Student {
  id: number;
  name: string;
  email: string;
  mobile: string;
  dob: string;
}

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent {
  @Input() students: Student[] = [];
  @Output() editStudent = new EventEmitter<Student>();
  @Output() deleteStudent = new EventEmitter<Student>();
  @Output() viewStudent = new EventEmitter<Student>();

  onEditStudent(student: Student) {
    this.editStudent.emit(student);
  }

  onDeleteStudent(student: Student) {
    this.deleteStudent.emit(student);
  }

  onViewStudent(student: Student) {
    this.viewStudent.emit(student);
  }
}
