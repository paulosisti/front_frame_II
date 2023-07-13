import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Owner } from './owners';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  private readonly APIOWNERS = 'https://api-frameworks.onrender.com/owners';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Owner[]> {
    return this.http.get<Owner[]>(this.APIOWNERS);
  }

  buscarPorId(ownerId: string): Observable<any> {
    const url = `${this.APIOWNERS}/${ownerId}`
    return this.http.get<any>(url)
  }

  getPokemonsByOwner(ownerId: string): Observable<any[]> {
    const url = `${this.APIOWNERS}/${ownerId}`;
    return this.http.get<any[]>(url);
  }

  addPokemonToOwner(ownerId: string, pokemonId: any): Observable<any> {
    const url = `${this.APIOWNERS}/${ownerId}/addPokemon`;
    const data = {
      pokemonId: {
        pokemons: [
          {
            _id: pokemonId,
          },
        ],
      },
    };

    return this.http.post(url, data).pipe(
      catchError((error) => {
        console.error('Erro ao adicionar o Pokémon ao proprietário', error);
        return throwError('Erro ao adicionar o Pokémon ao proprietário');
      })
    );
  }

  removePokemonFromOwner(ownerId: string, pokemonId: string): Observable<any> {
    const url = `${this.APIOWNERS}/${ownerId}/removePokemon`;

    return this.http.patch(url, { pokemonId }).pipe(
      catchError((error) => {
        console.error('Erro ao remover o Pokémon do proprietário', error);
        return throwError('Erro ao remover o Pokémon do proprietário');
      })
    );
  }


}
