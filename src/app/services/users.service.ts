import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Login, SignUp,SignUp1 } from '../data-type';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider} from '@angular/fire/auth'
import { Order } from '../data-type';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  isUserLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);
  constructor(private http:HttpClient, private route:Router,private fireauth: AngularFireAuth) { }

  userSignUp(user:SignUp){
    this.http.post('http://localhost:3000/users', user, {observe:'response'})
    .subscribe((result)=>{
      if(result){
        localStorage.setItem('user', JSON.stringify(result.body))
        this.route.navigate(['/']);
      }
    })
  }
  reloadUser() {
    if (localStorage.getItem('user')) {
      // this.isUserLoggedIn.next(true);
      this.route.navigate(['/']);
    }
  }

  userLogin(data:Login){
    this.http.get<SignUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,
    {observe:'response'})
    .subscribe((result)=>{
      if(result && result.body?.length){
        this.isLoginError.emit(false);
        localStorage.setItem('user', JSON.stringify(result.body[0]));
        this.route.navigate(['/']);
      }else{
        this.isLoginError.emit(true);
      }
    })
  }

 

  

  getUserCount() {
    return this.http.get<any>('http://localhost:3000/users').pipe(
      map(users => {
        return { count: users.length };
      })
    );
  }

  googleSignInAndCheckUser() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider())
      .then(res => {
        const email = res.user?.email;
        const name = res.user?.displayName;
  
        if (email && name) {
          this.http.get<SignUp1[]>(`http://localhost:3000/users?email=${email}`,
            { observe: 'response' })
            .subscribe((result) => {
              if (result && result.body?.length) {
                // user is already registered, log them in
                this.route.navigate(['/']);
                localStorage.setItem('user', JSON.stringify(result.body[0]));
              } else {
                // user is not registered, save them in database
                const newUser: SignUp1 = { name, email };
                this.http.post<SignUp1>('http://localhost:3000/users', newUser)
                  .subscribe((newUser) => {
                    localStorage.setItem('user', JSON.stringify(newUser));
                    this.route.navigate(['/']);
                  });
              }
              localStorage.setItem('token', JSON.stringify(res.user?.uid));
            });
        } else {
          // Handle the case where name or email is null or undefined
          console.error('Failed to retrieve name or email from Google user');
        }
      }, err => {
        alert(err.message);
      });
  }
  
  
  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider()).then(res => {
      this.route.navigate(['/']);
      localStorage.setItem('token', JSON.stringify(res.user?.uid));
    }, err => {
      alert(err.message);
    });
  }


  


  
  
  
  
}
