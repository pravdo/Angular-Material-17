import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { Course } from "../model/course";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { openEditCourseDialog } from "../course-dialog/course-dialog.component";
import { filter } from "rxjs/operators";

@Component({
  selector: "courses-card-list",
  templateUrl: "./courses-card-list.component.html",
  styleUrls: ["./courses-card-list.component.css"],
})
export class CoursesCardListComponent implements OnInit {
  @Input()
  courses: Course[];

  constructor(private dialiog: MatDialog) {}

  ngOnInit() {}

  editCourse(course: Course) {
    openEditCourseDialog(this.dialiog, course)
      .pipe(filter((val) => !!val)) // if the user closes the dialog without passing data, the obseravable will not emit any value
      .subscribe((val) => console.log("new course value:", val));
  }
}
