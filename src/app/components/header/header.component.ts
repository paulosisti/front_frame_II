import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  spinnerDuration: number = 3000;
  loading: boolean = false;
  isLoggedIn: boolean = false;
  constructor(private afAuth: AngularFireAuth,
    private router: Router,) { }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      this.isLoggedIn = !!user;
    });
}

  signOut() {
    this.isLoggedIn = true;
    this.loading = true;
    setTimeout(() => {
      this.afAuth.signOut()
        .then(() => {
          this.router.navigate(['signin']);
          // Faça algo após o usuário sair, se necessário
        })
        .catch((error) => {
          console.log('Erro ao desconectar o usuário:', error);
          // Trate o erro, se necessário
        })
        .finally(() => {
          this.isLoggedIn = false; // Defina isLoggedIn como false após o logout
          this.loading = false;
        });
    }, this.spinnerDuration);
  }

}
