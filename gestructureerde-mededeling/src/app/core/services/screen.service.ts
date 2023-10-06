import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  constructor(private breakpointObserver: BreakpointObserver) {}

  observerBreakpoints(): Observable<{ [key: string]: boolean }> {
    return this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium])
      .pipe(map((result: BreakpointState) => result.breakpoints));
  }
}
