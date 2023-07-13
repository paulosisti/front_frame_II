import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from './../produto.service';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css']
})
export class EditarProdutoComponent implements OnInit {
  formulario!: FormGroup;
  ownerId!: string | null;
  selectedOwner: any;

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
    private service: ProdutoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.ownerId = this.route.snapshot.paramMap.get('ownerId'); // Armazena o ownerId

    this.service.buscarPorId(id!).subscribe((produto) => {
      if (produto) {
        // Crie o formulário apenas se o produto estiver definido
        this.formulario = this.formBuilder.group({
          // Defina os campos do formulário com base nos dados do produto
          id: [produto._id],
          name: [produto.name, Validators.compose([
            Validators.required,
            Validators.pattern(/(.|\s)*\S(.|\s)*/)
          ])],
          pokemonType: [produto.pokemonType, Validators.compose([
            Validators.required,
            Validators.pattern(/(.|\s)*\S(.|\s)*/)
          ])],
          hp: [produto.hp, Validators.compose([
            Validators.required,
            Validators.minLength(3)
          ])],
          attack: [produto.attack, Validators.compose([
            Validators.required,
            Validators.minLength(3)
          ])],
          defense: [produto.defense, Validators.compose([
            Validators.required,
            Validators.minLength(3)
          ])],
          speed: [produto.speed, Validators.compose([
            Validators.required,
            Validators.minLength(3)
          ])],
        });
      }
    });

    // Recupere o selectedOwner da rota
    this.selectedOwner = this.route.snapshot.data['selectedOwner'];
  }

  editarProduto() {
    const id = this.route.snapshot.paramMap.get('id');
    if (this.formulario?.valid) {
      const produto = this.formulario.value;
      this.service.editar(id!, produto).subscribe(() => {
        this.location.back(); // Redirecionar para a página anterior
      });
    } else {
      console.log('O formulário é inválido. Não é possível editar o produto.');
    }
  }

  cancelar() {
    this.location.back();
  }

  habilitarBotao(): string {
    return this.formulario.valid ? 'botao' : 'botao__desabilitado';
  }
}
