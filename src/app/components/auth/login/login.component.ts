import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  protected signInForm: FormGroup = new FormGroup({});

  // Constructor
  constructor(private _formBuilder: FormBuilder, private _authService: AuthService, private _router: Router) {
    this.signInForm = _formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    })
  }

  // Event listeners
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
      });
  }

  // Form fields
  get email() {
    return this.signInForm.get('email');
  }

  get password() {
    return this.signInForm.get('password');
  }
}
