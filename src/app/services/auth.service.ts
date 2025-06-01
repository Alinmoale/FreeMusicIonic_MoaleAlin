import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public afAuth: AngularFireAuth) {}

  async login(email: string, password: string): Promise<void> {
    const userCredential = await this.afAuth.signInWithEmailAndPassword(
      email,
      password
    );
    const user = userCredential.user;
    if (user?.emailVerified) {
      return Promise.resolve();
    } else {
      return Promise.reject('Email not verified');
    }
  }

  async register(email: string, password: string): Promise<void> {
    const userCredential = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    await this.sendEmailVerification();
    return Promise.resolve();
  }

  async sendEmailVerification(): Promise<void> {
    const user = await this.afAuth.currentUser;
    if (user) {
      await user.sendEmailVerification();
    }
  }

  async logout(): Promise<void> {
    await this.afAuth.signOut();
  }

  isAuthenticated(): Observable<boolean> {
    return this.afAuth.authState.pipe(map((user) => !!user));
  }

  getUserId(): Observable<string | undefined> {
    return this.afAuth.authState.pipe(map((user) => user?.uid));
  }
}
