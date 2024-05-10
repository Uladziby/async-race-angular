import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';

const appConfig: ApplicationConfig = {
  providers: [provideHttpClient()],
};

export default appConfig;
