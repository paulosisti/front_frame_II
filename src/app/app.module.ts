import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { ButtonModule } from 'primeng/button';
import { ChipsModule } from 'primeng/chips';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { OwnersComponent } from './components/owners/owners.component';
import { CriarProdutoComponent } from './components/produtos/criar-produto/criar-produto.component';
import { EditarProdutoComponent } from './components/produtos/editar-produto/editar-produto.component';
import { ExcluirProdutoComponent } from './components/produtos/excluir-produto/excluir-produto.component';
import { ListarProdutosComponent } from './components/produtos/listar-produtos/listar-produtos.component';
import { ProdutoComponent } from './components/produtos/produto/produto.component';
import { SigninModule } from './components/signin/signin.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CriarProdutoComponent,
    ListarProdutosComponent,
    ProdutoComponent,
    ExcluirProdutoComponent,
    EditarProdutoComponent,
    OwnersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ButtonModule,
    DropdownModule,
    ChipsModule,
    SigninModule,
    ProgressSpinnerModule,
    MatSnackBarModule,
    TableModule,
    DialogModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDK5M8jLAWfCVek-7PIuwZZ5vm8baoy2qY",
      authDomain: "fdwpokeapp.firebaseapp.com",
      projectId: "fdwpokeapp",
      storageBucket: "fdwpokeapp.appspot.com",
      messagingSenderId: "1052915794899",
      appId: "1:1052915794899:web:01568250180c6f8e9a6526"

    }),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
