import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnersComponent } from './components/owners/owners.component';
import { CriarProdutoComponent } from './components/produtos/criar-produto/criar-produto.component';
import { EditarProdutoComponent } from './components/produtos/editar-produto/editar-produto.component';
import { ExcluirProdutoComponent } from './components/produtos/excluir-produto/excluir-produto.component';
import { ListarProdutosComponent } from './components/produtos/listar-produtos/listar-produtos.component';

const routes: Routes = [
  {
    path: 'criarProduto/:ownerId',
    component: CriarProdutoComponent
  },
  {
    path: 'listarPokemons/:ownerId',
    component: ListarProdutosComponent
  },
  {
    path: 'owners',
    component: OwnersComponent
  },
  {
    path: 'listarPokemons',
    component: ListarProdutosComponent
  },
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full',
  },
  {
    path: 'produtos/excluirProduto/:id',
    component: ExcluirProdutoComponent
  },
  {
    path: 'produtos/editarProduto/:id',
    component: EditarProdutoComponent
  },
  {
    path: 'signin',
    loadChildren: () => import('./components/signin/signin.module')
      .then(m => m.SigninModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
