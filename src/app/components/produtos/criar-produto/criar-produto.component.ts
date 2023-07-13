import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OwnerService } from '../../owners/owners.service';
import { ProdutoService } from './../produto.service';

@Component({
  selector: 'app-criar-produto',
  templateUrl: './criar-produto.component.html',
  styleUrls: ['./criar-produto.component.css']
})
export class CriarProdutoComponent implements OnInit {

  formulario!: FormGroup;
  pokemonId!: string;
  selectedOwner: any;
  ownerId: string | null = null;

  pokemonTypes: string[] = [
    'normal',
    'fire',
    'water',
    'grass',
    'flying',
    'fighting',
    'poison',
    'electric',
    'ground',
    'rock',
    'psychic',
    'ice',
    'bug',
    'ghost',
    'steel',
    'dragon',
    'dark',
    'fairy',
  ];

  constructor(
    private produtoService: ProdutoService,
    private ownerService: OwnerService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/(.|\s)*\S(.|\s)*/)
      ])],
      pokemonType: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/(.|\s)*\S(.|\s)*/)
      ])],
      hp: [null, Validators.compose([
        Validators.required,
        Validators.min(3)
      ])],
      attack: [null, Validators.compose([
        Validators.required,
        Validators.min(3)
      ])],
      defense: [null, Validators.compose([
        Validators.required,
        Validators.min(3)
      ])],
      speed: [null, Validators.compose([
        Validators.required,
        Validators.min(3)
      ])],
    });

    this.ownerId = null;

    this.selectedOwner = this.route.snapshot.data['selectedOwner'];
  }

  criarProduto(): void {
    if (this.formulario.valid) {
      this.ownerId = this.route.snapshot.paramMap.get('ownerId');
      const produtoData = this.formulario.value;

      if (this.ownerId !== null) {
        this.produtoService.criar(produtoData).subscribe(
          (produto: any) => {
            const newPokemonId = produto._id;
            console.log(newPokemonId);
            this.ownerService.addPokemonToOwner(this.ownerId!, newPokemonId).subscribe(
              () => {
                console.log('Novo Pokémon adicionado ao proprietário com sucesso');
                this.location.back();
              },
              (error: any) => {
                console.error('Erro ao adicionar o Pokémon ao proprietário', error);
              }
            );
          },
          (error: any) => {
            console.error('Erro ao criar novo Pokémon', error);
          }
        );
      } else {
        console.error('ID do proprietário inválido');
      }
    }
  }


  cancelar(): void {
    this.location.back();
  }

  habilitarBotao(): string {
    return this.formulario.valid ? 'botao' : 'botao__desabilitado';
  }
}
