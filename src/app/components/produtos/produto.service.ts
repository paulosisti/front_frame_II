import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Produto } from './produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private readonly API = 'https://api-frameworks.onrender.com/pokemons';
  private readonly POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
  constructor(private http: HttpClient) { }

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.API)
  }

  criar(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.API, produto);
  }


  editar(id: string, produto: Produto): Observable<Produto> {
    const url = `${this.API}/${id}`;
    return this.http.patch<Produto>(url, produto);
  }

  excluir(id: string): Observable<Produto> {
    const url = `${this.API}/${id}`
    return this.http.delete<Produto>(url)
  }

  buscarPorId(id: string): Observable<Produto> {
    const url = `${this.API}/${id}`
    return this.http.get<Produto>(url)
  }

  atualizarPokemon(pokemon: Produto): Observable<Produto> {
    const url = `${this.API}/${pokemon._id}`;
    return this.http.patch<Produto>(url, pokemon);
  }


  buscarImagemPokemon(nome: string): Observable<string> {
    const url = `${this.POKEAPI_BASE_URL}/${nome.toLowerCase()}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        const sprites = response.sprites;
        const imageUrl = sprites.front_default;
        return imageUrl;
      })
    );
  }

}
