import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs';

import { fromFetch } from 'rxjs/fetch';
import { pluck } from 'rxjs/operators';

import { addResults, clearResults, search } from './utilities';

const endpoint = 'https://rxjs-api.glitch.me/api/pokemon/search/';

const search$ = fromEvent(search, 'input').pipe(
  debounceTime(300),
  map((event: any) => event.target.value),
  distinctUntilChanged(),
  switchMap((searchTerm) => {
    return fromFetch(endpoint + searchTerm + '?delay=1000&chaos=true').pipe(
      mergeMap((response) => response.json())
    );
  }),
  tap(clearResults),
  pluck('pokemon'),
  tap(addResults)
);

search$.subscribe();
