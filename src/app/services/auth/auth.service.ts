import { Injectable } from '@angular/core';
import { AuthError, AuthResponse, createClient, OAuthResponse } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Properties
  private _supabaseUrl: string = 'https://hexfuwevpzbgmqqhtltr.supabase.co';
  private _supabaseKey: string = environment.SUPABASE_KEY;
  public supabase = createClient(this._supabaseUrl, this._supabaseKey);

  // Constructor
  constructor(private _httpClient: HttpClient) { }

  // Methods
  public SignUpWithEmailAndPassword(email: string, password: string): Observable<any> {
    let authPromise = this.supabase.auth.signUp({
      email: email,
      password: password
    })

    return from(authPromise);
  }

  public SignInWithEmailAndPassword(email: string, password: string): Observable<AuthResponse> {
    let promise = this.supabase.auth.signInWithPassword({
      email: email,
      password: password
    })

    return from(promise);
  }

  public SignOut(): Observable<{ error: AuthError | null; }> {
    let promise = this.supabase.auth.signOut()
    return from(promise);
  }
}
