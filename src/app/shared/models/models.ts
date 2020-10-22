import {Time} from '@angular/common';


export interface IAuthResponse {
  access_token: string;
  username: string;
  userId: number;
}

export interface Post {
  user: User;
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  albums: Album[];
}

export interface Album {
  userId: number;
  id: number;
  title: string;
  photos: Photo[];
}
export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
