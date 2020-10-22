import {Component, OnInit} from '@angular/core';
import {ApiService} from '../shared/services/api.service';
import {Album, Comment, IAuthResponse, Photo, Post, User} from '../shared/models/models';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../shared/services/auth.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})


export class MainComponent implements OnInit {

  public posts: Post[];
  public comments: Comment[];
  public selectedPost: number | null = null;

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    body: new FormControl('')
  });

  postForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    body: new FormControl('')
  });

  searchText: string = ''

  constructor(private provider: ApiService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getListPosts();
  }

  handleChange() {
    var params = {}
    if (this.searchText == ""){
      this.getListPosts()
    }else{
      this.provider.getUsersList({name: this.searchText}).then(
        res => {
          for (let user of res) {
            this.provider.getPostsList({userId: user.id}).then(
              resp => {
                this.posts = resp
                for(let post of this.posts){
                  this.provider.getUser(post.userId).then(respp => {
                    post.user = respp
                  })
                }
              }
            )
          }
        }
      )
    }
  }

  addPost() {
    var body = this.postForm.value.body;
    var title = this.postForm.value.title;
    this.provider.createPost({
      id: 0,
      title: title,
      body: body,
      userId: this.authService.currentUser.id,
      user: null
    }).then(
      res => {
        this.posts.push(res);
      }
    );
    this.postForm.reset();
  }

  addComment() {
    var body = this.form.value.body;
    var email = this.form.value.email;
    var name = this.form.value.name;
    this.provider.createComment(this.selectedPost, {
      id: 0,
      postId: this.selectedPost,
      email: email,
      name: name,
      body: body
    }).then(
      res => {
        this.comments.push(res);
      }
    );
    this.form.reset();
  }

  closeComments() {
    this.selectedPost = null;
  }

  showComment(postId: number): boolean {
    return postId == this.selectedPost;
  }

  getComments(post: Post) {
    this.selectedPost = post.id;
    this.provider.getPostComments(post).then(
      res => {
        this.comments = res;
      }
    );
  }

  getListPosts(): void {
    this.provider.getPostsList({}).then(res => {
      this.posts = res;
      for (let post of this.posts) {
        this.provider.getUser(post.userId).then(
          resp => {
            post.user = resp;
          }
        );
      }
    });
  }
}
