import {BrowserModule} from '@angular/platform-browser';
import {ClassProvider, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MainComponent} from './main/main.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import { AppRoutingModule } from './app-routing.module';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ApiService} from './shared/services/api.service';
import {AuthInterceptor} from './AuthInterceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {NavigationComponent} from './navigation/navigation.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { StartPageComponent } from './start-page/start-page.component';
import { AppRoutingModule } from './app-routing.module';
import {AuthService} from './shared/services/auth.service';
import { NotFoundComponent } from './not-found-component/not-found.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { AlbumsComponent } from './albums/albums.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavigationComponent,
    LoginComponent,
    RegisterComponent,
    StartPageComponent,
    NotFoundComponent,
    AlbumsComponent,
  ],
    imports: [
        MatButtonModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatSliderModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatGridListModule,
        MatListModule,
        MatDividerModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        AppRoutingModule,
        MatExpansionModule,
    ],
  providers: [
    ApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    } as ClassProvider,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
