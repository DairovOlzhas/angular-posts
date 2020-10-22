import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StartPageComponent} from './start-page/start-page.component';
import {AuthGuard} from './auth-guard.service';
import {MainComponent} from './main/main.component';
import {NotFoundComponent} from './not-found-component/not-found.component';
import {AlbumsComponent} from './albums/albums.component';

const routes: Routes = [
  {
    path: 'start-page',
    component: StartPageComponent,
  },
  {
    matcher: function(url) {
      if (url.length == 0) return {consumed: url}
      if (url.length == 1) {
        var path = url[0].path;
        if(path == '' || path == '/'){
          return {consumed: url};
        }
      }
      return null;
    },
    component: MainComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'albums',
    component: AlbumsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule {
}
