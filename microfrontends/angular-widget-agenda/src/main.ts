import {createCustomElement} from '@angular/elements';
import {createApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {HttpClientModule} from "@angular/common/http";
import {importProvidersFrom} from "@angular/core";
import 'tailwindcss/base.css';
import 'tailwindcss/components.css';
import 'tailwindcss/utilities.css';

(async () => {
  const app = await createApplication({
    providers: [
      importProvidersFrom(HttpClientModule)
    ]
  });

  const element = createCustomElement(AppComponent, {
    injector: app.injector,
  });

  customElements.define('angular-widget-agenda', element);


})();


