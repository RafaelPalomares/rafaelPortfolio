import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { timeout, tap, map, catchError, shareReplay } from 'rxjs/operators';
import { DynamicFields } from '../models/dynamic-fields.model';

@Injectable({ providedIn: 'root' })
export class TextGenerationService {
  private dynamicFields$ = new BehaviorSubject<DynamicFields | null>(null);
  private request$: Observable<void> | null = null;

  constructor(private http: HttpClient) {}

  /** Observable that emits null until the response is received, then emits the parsed DynamicFields */
  getDynamicFields(): Observable<DynamicFields | null> {
    return this.dynamicFields$.asObservable();
  }

  /** Called once during APP_INITIALIZER — returns Observable<void> that completes even on failure */
  initialize(): Observable<void> {
    if (this.request$) {
      return this.request$;
    }

    this.request$ = this.http.get<DynamicFields>('/api/generate-text').pipe(
      timeout(15_000),
      tap((fields) => this.dynamicFields$.next(fields)),
      map(() => undefined as void),
      catchError(() => {
        this.dynamicFields$.next(null);
        return of(undefined as void);
      }),
      shareReplay(1),
    );

    return this.request$;
  }
}
