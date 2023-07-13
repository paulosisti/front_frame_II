import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers: [MessageService],
})
export class SigninComponent implements OnInit {

  form!: FormGroup;
  isLoggingIn = false;
  isRecoveringPassword = false;
  email!: string;
  password!: string;
  loginError: boolean = false;
  spinnerDuration: number = 3000;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    this.isLoggingIn = true;
    setTimeout(() => {
    this.authenticationService.signIn({
      email: this.form.value.email,
      password: this.form.value.password
    }).subscribe({
      next: () => this.router.navigate(['owners']),
      error: error => {
        this.loginError = true;
        this.isLoggingIn = false;

      }
    });
  }, this.spinnerDuration);
  }

  recoverPassword() {
    this.isRecoveringPassword = true;

    this.authenticationService.recoverPassword(
      this.form.value.email
    ).subscribe({
      next: () => {
        this.isRecoveringPassword = false;
        this.snackBar.open("You can recover your password in your email account.", "OK", {
          duration: 5000
        });
      },
      error: error => {
        this.isRecoveringPassword = false;
        this.snackBar.open(error.message, "OK", {
          duration: 5000
        });
      }
    })
  }

  createUser() {
    this.authenticationService.checkUserExists(this.form.value.email, this.form.value.password).subscribe(
      (exists: boolean) => {
        if (exists) {
          this.snackBar.open('Usuário já existe.', 'Fechar', {
            duration: 5000
          });
        } else {
          // Resto do código para criar o usuário...
        }
      },
      error => {
        this.snackBar.open('Erro ao verificar usuário.', 'Fechar', {
          duration: 5000
        });
      }
    );
  }


}
