import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
  map,
  concatMap,
  switchMap,
  withLatestFrom,
  concatAll, shareReplay, catchError, combineAll
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat, throwError, combineLatest} from 'rxjs';
import {Lesson} from '../model/lesson';
import { CoursesService } from '../services/courses.service';

interface CourseData {
  course: Course;
  lessons: Lesson[];
}

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent implements OnInit {

  data$: Observable<CourseData>;

  constructor(private route: ActivatedRoute,
    private coursesService: CoursesService) {
    const courseId = parseInt(route.snapshot.paramMap.get("courseId"));
    
    const course$ = coursesService.loadCourseById(courseId).pipe(startWith(null));
    const lessons$ = coursesService.loadAllCourseLessons(courseId).pipe(startWith([]));

    this.data$ = combineLatest([course$, lessons$])
    .pipe(
      map(([course,lessons]) =>  {
        return { 
          course,
          lessons
        }
      }),tap(console.log)
    );
  }
  ngOnInit() {}



}











