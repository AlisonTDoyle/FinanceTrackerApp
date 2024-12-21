import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../services/auth/auth.service';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  // Properties
  protected signInForm: FormGroup = new FormGroup({});
  protected returnUrl: string = '';

  // Constructor
  constructor(private _formBuilder: FormBuilder, private _activitedRoute: ActivatedRoute, private _authService: AuthService, private _router: Router) {
    this.signInForm = _formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    })
  }

  // Event listeners
  ngOnInit(): void {
    // Get return url
    this.returnUrl = this._activitedRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  protected onSubmit(): void {
    this.SignInWithPassword(this.signInForm);
  }

  // Methods
  protected SignInWithPassword(form: FormGroup) {
    console.info(`Email: ${form.value.email}, Password: ${form.value.password}`);

    // Sign in user
    this._authService.SignInWithEmailAndPassword(form.value.email, form.value.password).subscribe((res) => {
      // Check if user was signed in successfully
      if (res.error) {
        console.error(res.error)
      }
      else {
        console.info('User signed in successfully');
        this._router.navigateByUrl(this.returnUrl);
      }
    });
  }

  protected NavigateToSignUp(): void {
    this._router.createUrlTree(['/auth/signup'], { queryParams: { returnUrl: this.returnUrl } })
  }

  // Form fields
  get email() {
    return this.signInForm.get('email');
  }

  get password() {
    return this.signInForm.get('password');
  }
}
