import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes,withViewTransitions(),withInMemoryScrolling({scrollPositionRestoration:'top'})), provideClientHydration(),provideHttpClient()]
};

// ,importProvidersFrom(HttpClientModule)
// ,provideHttpClient(withFetch())