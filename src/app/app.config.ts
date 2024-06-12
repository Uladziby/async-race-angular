import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { StateService } from 'src/app/core/services/api/state.service';

const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), StateService],
};

export default appConfig;
