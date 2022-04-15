import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  mergeMap,
  switchMap,
  tap,
  of,
  merge,
  from,
  filter,
  catchError,
  concat,
  take,
  EMPTY,
} from 'rxjs';

import { fromFetch } from 'rxjs/fetch';
import { pluck } from 'rxjs/operators';

import {
  addResults,
  addResult,
  clearResults,
  endpointFor,
  search,
  form,
} from './utilities';

const endpoint = 'https://rxjs-api.glitch.me/api/pokemon/search/';

const search$ = fromEvent(search, 'input').pipe(
  debounceTime(300),
  map((event: any) => event.target.value + '?delay=1000&chaos=true'),
  switchMap((searchTerm) => {
    return fromFetch(endpoint + searchTerm).pipe(
      mergeMap((response) => response.json())
    );
  }),
  tap(clearResults),
  pluck('pokemon'),
  tap(addResults)
);

search$.subscribe();
