import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { Course } from "../model/course";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { openEditCourseDialog } from "../course-dialog/course-dialog.component";
import { filter } from "rxjs/operators";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";

@Component({
  selector: "courses-card-list",
  templateUrl: "./courses-card-list.component.html",
  styleUrls: ["./courses-card-list.component.css"],
})
export class CoursesCardListComponent implements OnInit {
  @Input()
  courses: Course[];

  cols = 3;
  rowHeight = "500px";
  handsetPortrait = false;

  constructor(
    private dialiog: MatDialog,
    private responsive: BreakpointObserver
  ) {}

  ngOnInit() {
    this.responsive
      .observe([
        Breakpoints.TabletPortrait,
        Breakpoints.TabletLandscape,
        Breakpoints.HandsetPortrait,
        Breakpoints.HandsetLandscape,
      ]) //"(max-width: 959px)"
      .subscribe((result) => {
        const breakpoints = result.breakpoints;

        this.cols = 3;
        this.rowHeight = "500px";
        this.handsetPortrait = false;

        if (breakpoints[Breakpoints.TabletPortrait]) {
          this.cols = 1;
        } else if (breakpoints[Breakpoints.HandsetPortrait]) {
          this.cols = 1;
          this.rowHeight = "430px";
          this.handsetPortrait = true;
        } else if (breakpoints[Breakpoints.HandsetLandscape]) {
          this.cols = 1;
        } else if (breakpoints[Breakpoints.TabletLandscape]) {
          this.cols = 2;
        }
      });
  }

  editCourse(course: Course) {
    openEditCourseDialog(this.dialiog, course)
      .pipe(filter((val) => !!val)) // if the user closes the dialog without passing data, the obseravable will not emit any value
      .subscribe((val) => console.log("new course value:", val));
  }
}
