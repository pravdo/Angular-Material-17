import { Component } from "@angular/core";
import { UntypedFormBuilder, Validators } from "@angular/forms";
import { MatCalendarCellClassFunction } from "@angular/material/datepicker";

const SAMPLE_TEXT =
  "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which do";

@Component({
  selector: "create-course-step-1",
  templateUrl: "create-course-step-1.component.html",
  styleUrls: ["create-course-step-1.component.scss"],
})
export class CreateCourseStep1Component {
  form = this.fb.group({
    title: [
      "",
      [Validators.required, Validators.minLength(5), Validators.maxLength(60)],
    ],
    releasedAt: [new Date(), Validators.required],
    category: ["BEGINNER", Validators.required],
    courseType: ["premium", Validators.required],
    downloadsAllowed: [false, Validators.requiredTrue],
    longDescription: [
      `${SAMPLE_TEXT}`,
      [Validators.required, Validators.minLength(3)],
    ],
  });

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    const date = cellDate.getDate();
    if (view == "month") {
      return date == 1 ? "highlight-date" : "";
    }
    return "";
  };

  constructor(private fb: UntypedFormBuilder) {}

  get courseTitle() {
    return this.form.controls["title"];
  }
}
