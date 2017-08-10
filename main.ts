import 'zone.js';

import 'core-js/es6/reflect';
import 'core-js/es7/reflect';

// JiT启动模式
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
