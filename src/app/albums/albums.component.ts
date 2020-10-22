import {Component, Input, OnInit, Output} from '@angular/core';
import {Album, Comment, Post, User} from '../shared/models/models';
import {FormControl, FormGroup} from '@angular/forms';
import {ApiService} from '../shared/services/api.service';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {

  public albums: Album[];
  public users: User[];

  constructor(private provider: ApiService, private authService: AuthService) {
  }

  async ngOnInit(): Promise<void> {
    await this.getListUsers()
  }


  async getListUsers() {
    await this.provider.getUsersList({}).then(
      async res => {
        this.users = res
        for (let user of this.users) {
          await this.provider.getUserAlbumsList(user).then(
            async resp => {
              user.albums = resp
              for (let album of user.albums) {
                await this.provider.getAlbumPhotosList(album).then(
                  response => {
                    album.photos = response
                  }
                )
              }
            }
          )
        }
      }
    )
  }
}
