import {Injectable, EventEmitter} from '@angular/core';
import {MainService} from './main.service';
import {HttpClient} from '@angular/common/http';
import {Album, Comment, IAuthResponse, Photo, Post, User} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService extends MainService {

  constructor(http: HttpClient) {
    super(http);
  }

  register(user: User): Promise<User> {
    return this.post(`http://127.0.0.1:3000/users`, user);
  }

  getUser(userId: number): Promise<User> {
    return this.get(`http://127.0.0.1:3000/users/${userId}`, {});
  }

  getUsersList(params): Promise<User[]> {
    return this.get(`http://127.0.0.1:3000/users`, params);
  }

  getPostsList(params): Promise<Post[]> {
    return this.get(`http://127.0.0.1:3000/posts`, params);
  }

  getPost(postId: number): Promise<Post> {
    return this.get(`http://127.0.0.1:3000/posts/${postId}`, {});
  }

  createPost(post: Post): Promise<Post> {
    return this.post(`http://127.0.0.1:3000/posts`, post);
  }

  getPostComments(post: Post): Promise<Comment[]> {
    return this.get(`http://127.0.0.1:3000/posts/${post.id}/comments`, {});
  }

  createComment(postId: number, comment: Comment): Promise<Comment> {
    return this.post(`http://127.0.0.1:3000/posts/${postId}/comments`, {
      postId: comment.postId,
      name: comment.name,
      email: comment.email,
      body: comment.body
    });
  }

  getUserAlbumsList(user: User): Promise<Album[]> {
    return this.get(`http://127.0.0.1:3000/albums?userId=${user.id}`, {});
  }

  getAlbumPhotosList(album: Album): Promise<Photo[]> {
    return this.get(`http://127.0.0.1:3000/albums/${album.id}/photos`, {});
  }
}
