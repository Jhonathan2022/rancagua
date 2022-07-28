import { BrowserModule }                    from '@angular/platform-browser';
import { RouterModule }                     from '@angular/router';
import { NgModule }                         from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule }          from '@angular/platform-browser/animations';

import { routes, AppRoutingModule }         from './app-routing.module';
import { AppComponent }                     from './app.component';
import { UIModule }                         from './ui/ui.module';
import { NiComponentsModule }               from './ni-components/ni-components.module';
import { PagesModule }                      from './pages/pages.module';

import { DefaultLayoutComponent }           from './layouts/default/default.component';
// import { BoxedLayoutComponent }             from './layouts/boxed/boxed.component';
// import { DefaultCLayoutComponent }          from './layouts/default-c/default-c.component';
// import { BoxedCLayoutComponent }            from './layouts/boxed-c/boxed-c.component';
import { ExtraLayoutComponent }             from './layouts/extra/extra.component';
import { LoginModule } from './pages/login/login.module';

import { UserService } from './servicios/services/user/user.service';
import { AuthGuard } from './servicios/auth/auth-guard.service';
import { AuthGuardCall } from './servicios/auth/auth-guard-call.service';

@NgModule({
  declarations : [
    AppComponent,
    DefaultLayoutComponent,
    // BoxedLayoutComponent,
    // DefaultCLayoutComponent,
    // BoxedCLayoutComponent,
    ExtraLayoutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    // RouterModule.forRoot(routes, { useHash: true }),
    RouterModule.forRoot(routes, { useHash: false }),
    AppRoutingModule,
    UIModule,
    NiComponentsModule,
    PagesModule,
    LoginModule
  ],
  providers: [
    UserService,AuthGuard,AuthGuardCall],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
