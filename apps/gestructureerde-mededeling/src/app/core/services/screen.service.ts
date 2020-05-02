import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

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

  isMobile(): Observable<boolean> {
    return this.breakpointObserver.observe([Breakpoints.HandsetLandscape, Breakpoints.HandsetPortrait]).pipe(
      tap(console.log),
      map((result: BreakpointState) => result.matches)
    );
  }
}
