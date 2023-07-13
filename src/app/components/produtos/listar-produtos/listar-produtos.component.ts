import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnerService } from '../../owners/owners.service';
import { Produto } from '../produto';

@Component({
  selector: 'app-listar-produtos',
  templateUrl: './listar-produtos.component.html',
  styleUrls: ['./listar-produtos.component.css']
})
export class ListarProdutosComponent implements OnInit {
  listaProdutos: Produto[] = [];
  pokemons: Produto[] = [];
  selectedOwner: any;
  ownerId: string | null = null;

  public paginaAtual = 1;

  constructor(
    private ownerService: OwnerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarPokemons();
  }

  carregarPokemons(): void {
    const ownerId = this.route.snapshot.paramMap.get('ownerId');

    if (ownerId) {
      this.ownerService.getPokemonsByOwner(ownerId).subscribe(
        (owner: any) => {
          this.pokemons = owner.pokemons;
          this.selectedOwner = owner;
          this.ownerId = ownerId; // Adiciona o valor de ownerId à propriedade ownerId do componente
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }
}
