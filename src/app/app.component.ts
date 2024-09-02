import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

interface Student {
  id: number;
  name: string;
  email: string;
  mobile: string;
  dob: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAddStudentFormVisible = false;
  isStudentListVisible = true;
  students: Student[] = [];
  filteredStudents: Student[] = [];
  selectedStudent: Student | null = null;
  defaultStudent: Student = { id: 0, name: '', email: '', mobile: '', dob: '' };
  searchTerm: string = '';

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadStudentsFromLocalStorage();
    this.filteredStudents = this.students;
  }

  showAddStudentForm() {
    this.selectedStudent = { ...this.defaultStudent }; // Reset to default student for adding
    this.isAddStudentFormVisible = true;
    this.isStudentListVisible = false;
  }

  showStudentList() {
    this.isAddStudentFormVisible = false;
    this.isStudentListVisible = true;
    this.selectedStudent = null;
  }

  showStudentDetails(student: Student) {
    this.selectedStudent = student;
    this.isStudentListVisible = false;
  }

  addStudent(student: Student) {
    if (confirm('Are you sure you want to add/update this student?')) {
      if (student.id === 0) {
        student.id = this.getNextId();
        this.students.push(student);
      } else {
        const index = this.students.findIndex(s => s.id === student.id);
        if (index !== -1) {
          this.students[index] = student;
        }
      }
      this.isAddStudentFormVisible = false;
      this.reassignIds(); // Ensure IDs are sequential
      this.saveStudentsToLocalStorage();
      this.filterStudents(); // Update filtered list after adding
      this.cdr.detectChanges(); // Manually trigger change detection
      this.showStudentList();
    }
  }

  editStudent(student: Student) {
    this.selectedStudent = { ...student }; // Clone the student object
    this.isAddStudentFormVisible = true; // Show the form for editing
    this.isStudentListVisible = false;
  }

  deleteStudent(student: Student) {
    const confirmDelete = confirm('Are you sure you want to delete this student?');
    if (confirmDelete) {
      this.students = this.students.filter(s => s.id !== student.id);
      this.reassignIds(); // Ensure IDs are sequential after deletion
      this.saveStudentsToLocalStorage();
      this.filterStudents(); // Update filtered list after deleting
      this.cdr.detectChanges(); // Manually trigger change detection
      this.showStudentList();
    }
  }

  getNextId(): number {
    if (this.students.length === 0) {
      return 1;
    }
    return Math.max(...this.students.map(s => s.id)) + 1;
  }

  reassignIds() {
    this.students = this.students.map((student, index) => {
      student.id = index + 1;
      return student;
    });
  }

  saveStudentsToLocalStorage() {
    localStorage.setItem('students', JSON.stringify(this.students));
  }

  loadStudentsFromLocalStorage() {
    const studentsData = localStorage.getItem('students');
    if (studentsData) {
      this.students = JSON.parse(studentsData);
      this.filteredStudents = [...this.students];
    }
  }

  filterStudents() {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredStudents = this.students.filter(student => 
      student.name.toLowerCase().includes(searchTermLower) || 
      student.id.toString().includes(searchTermLower)
    );
  }

  onSearchChange(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.filterStudents();
  }
}
