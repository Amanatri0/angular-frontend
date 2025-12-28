import { Component, inject, signal } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {
  MatFormField,
  MatFormFieldModule,
  MatPrefix,
  MatSuffix,
} from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-sign-in-dialog',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatButton,
    MatDialogClose,
    MatInputModule,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatPrefix,
  ],
  templateUrl: './sign-in-dialog.html',
  styleUrl: './sign-in-dialog.scss',
})
export class SignInDialog {
  private fb = inject(NonNullableFormBuilder);
  private http = inject(HttpClient);
  private dialogRef = inject(MatDialogRef<SignInDialog>);

  signInForm = this.fb.group({
    Username: ['', [Validators.required]],
    Email: ['', [Validators.required, Validators.email]],
    Password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.signInForm.valid) {
      const payload = this.signInForm.value;
      const apiUrl = 'http://localhost:5198/api/auth/register';

      this.http.post(apiUrl, payload).subscribe({
        next: (response) => {
          console.log('Registration successful!', response);
          this.dialogRef.close();
        },
        error: (error) => {
          console.error('Registration failed', error);
        },
      });
    }
  }
}
