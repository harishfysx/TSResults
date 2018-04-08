import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  AuthenticationDetails, CognitoUserSession
} from 'amazon-cognito-identity-js';
import { User } from './user.model';
import { UserPoolId } from '../../../../config/config';
import { ClientId } from '../../../../config/config';
import {observable} from 'rxjs/symbol/observable';
const poolData = {
  UserPoolId : UserPoolId, // Your user pool id here
  ClientId : ClientId // Your client id here
};

const userPool = new CognitoUserPool(poolData);

@Injectable()
export class AuthService {
  authIsLoading = new BehaviorSubject<boolean>(false);
  authDidFail = new BehaviorSubject<boolean>(false);
  authStatusChanged = new Subject<boolean>();
  registeredUser: CognitoUser;
  constructor(private router: Router) {}
  // signUp Observable
  signUp = (username: string, email: string, password: string): Observable<User> => {
    return Observable.create(observer => {
      this.authIsLoading.next(true);
      const user: User = {
        username: username,
        email: email,
        password: password
      };
      const attributeList: CognitoUserAttribute[] = [];
      const emailAttribute = {
        Name: 'email',
        Value: user.email
      };
      attributeList.push(new CognitoUserAttribute(emailAttribute));
      userPool.signUp(user.username, user.password, attributeList, null, (err, result) => {
        if (err) {
          // console.log(err);
          this.authDidFail.next(true);
          this.authIsLoading.next(false);
          observer.error(err);
        }
        this.authDidFail.next(false);
        this.authIsLoading.next(false);
        this.registeredUser = result.user;
        observer.next(user);
      });
    });
  }
  // SignInObs
  signIn = (username: string, password: string): Observable<CognitoUserSession> => {
    return Observable.create(observer => {
      this.authIsLoading.next(true);
      const authenticationData = {
        Username: username,
        Password: password
      };
      const authenticationDetails = new AuthenticationDetails(authenticationData);
      const userData = {
        Username : username,
        Pool : userPool
      };
      const cognitoUser = new CognitoUser(userData);
      const __this = this;
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result: CognitoUserSession) {
          __this.authStatusChanged.next(true);
          __this.authDidFail.next(false);
          __this.authIsLoading.next(false);
          observer.next(result);
        },
        onFailure: function(err) {
          __this.authDidFail.next(true);
          __this.authIsLoading.next(false);
          observer.error(err);
        },

      });
    });
  }
  getAuthenticatedUser = (): CognitoUser => {
    return userPool.getCurrentUser();
  }
  getJWTtoken = (): Observable<string> => {
    return Observable.create( (obs) => {
     const cognitoUser = userPool.getCurrentUser();
     if (cognitoUser != null) {
          cognitoUser.getSession((err, session) => {
            obs.next(session.getIdToken().getJwtToken());
            obs.complete();
          });
     } else {
       obs.error('something happened');
     }
    });
  }
  logOut = () => {
      return Observable.create((observer) => {
        this.getAuthenticatedUser().signOut();
        this.authStatusChanged.next(false);
        observer.complete();
      });
  }
  isAuthenticated(): Observable<boolean> {
    const user = this.getAuthenticatedUser();
    const obs = Observable.create((observer) => {
      if (!user) {
        observer.next(false);
      } else {
        user.getSession((err, session) => {
          if (err) {
            observer.next(false);
          } else {
            if (session.isValid()) {
              observer.next(true);
            }else {
              observer.next(false);
            }
          }
        });
      }
      observer.complete();
    });
    return obs;
  }
  initAuth() {
    this.isAuthenticated().subscribe(
      (auth) => this.authStatusChanged.next(auth)
    );
  }
}
