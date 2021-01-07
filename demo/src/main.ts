import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((error: Error) => {
    // tslint:disable-next-line: no-console
    console.error(error);
  });
