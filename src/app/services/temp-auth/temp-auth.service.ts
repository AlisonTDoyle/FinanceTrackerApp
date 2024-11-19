import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TempAuthService {
  // Properties
  public signedIn: boolean = false;

  // Constructor
  constructor() { }

  // Methods
  public SignIn(userId: string): void {
    sessionStorage.setItem("userId", userId);
    this.signedIn = true;
  }

  public SignOut(): void {
    sessionStorage.removeItem("userId");
    this.signedIn = false;
  }

  public FetchSignedInUser() : string | null{
    let loggedInUserId:string | null = sessionStorage.getItem("userId");

    return loggedInUserId;
  }
}
