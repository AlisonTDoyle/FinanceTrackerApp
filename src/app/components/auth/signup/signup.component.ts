import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../services/auth/auth.service';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    RouterLink,
    RouterLinkActive,
    HeaderComponent
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  // Properties
  protected signUpForm: FormGroup = new FormGroup({});
  protected returnUrl: string = '';
  protected awaitingConfirmation: boolean = false;

  // Constructor
  constructor(private _formBuilder: FormBuilder, private _activitedRoute: ActivatedRoute, private _authService: AuthService, private _router: Router) {
    this.signUpForm = _formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      username: ["", [Validators.required, Validators.minLength(3)]],
      password: ["", [Validators.required]]
    })
  }

  // Event listeners
  ngOnInit(): void {
    // Get return url
    this.returnUrl = this._activitedRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  protected onSubmit(): void {
    this.SignUpUser(this.signUpForm);
  }

  // Methods
  protected SignUpUser(form:FormGroup) : void {
    this._authService.SignUpWithEmailAndPassword(form.value.email, form.value.password, form.value.username).subscribe((res) => {
      // Check if user was signed in successfully
      if (res.error) {
        console.error(res.error)
      }
      else {
        this.awaitingConfirmation = true;
        console.info('User signed up, awaiting confirmation');        
      }
    });
  }

  protected NavigateToSignIn(): void {
    console.info('Navigating to sign in page');
    this._router.createUrlTree(['/auth/login'], { queryParams: { returnUrl: this.returnUrl } })
  }

  // Form fields
  get email() { return this.signUpForm.get('email'); }
  get password() { return this.signUpForm.get('password'); }
  get username() { return this.signUpForm.get('username'); }
}
