import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnerService } from '../../owners/owners.service';
import { Produto } from '../produto';
import { ProdutoService } from './../produto.service';

@Component({
  selector: 'app-excluir-produto',
  templateUrl: './excluir-produto.component.html',
  styleUrls: ['./excluir-produto.component.css']
})
export class ExcluirProdutoComponent implements OnInit {

  produto: Produto = {
    _id: '',
    name: '',
    pokemonType: '',
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
  };
  selectedOwner: any;
  ownerId: string | null = null;
  pokemonId: string | null = null;

  constructor(
    private service: ProdutoService,
    private ownerService: OwnerService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.pokemonId = this.route.snapshot.paramMap.get('id');

    this.service.buscarPorId(this.pokemonId!).subscribe((produto) => {
      this.produto = produto;
    });
  }

  removerPokemon(): void {
      this.service.excluir(this.pokemonId!).subscribe(
        (owner: any) => {
          this.selectedOwner = owner;
          this.location.back();
          console.log('Pokémon removido do proprietário com sucesso');
          // Realize qualquer ação adicional após a remoção do Pokémon do proprietário
        },
        (error: any) => {
          console.error('Erro ao remover o Pokémon do proprietário', error);
          // Lide com o erro de remoção do Pokémon do proprietário adequadamente
        }
      );
  }

  cancelar(): void {
    this.location.back();
  }
}
