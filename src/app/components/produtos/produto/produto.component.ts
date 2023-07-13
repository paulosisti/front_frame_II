import { Component, Input, OnInit } from '@angular/core';
import { Produto } from '../produto';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  @Input() produto: Produto | undefined;
  imageUrl: string = '';
  @Input() selectedOwner: any; // Adicione esta linha

  constructor(private produtoService: ProdutoService) { }

  ngOnInit(): void {
    if (this.produto) {
      this.produtoService.buscarImagemPokemon(this.produto.name)
        .subscribe(
          (imageUrl) => {
            this.imageUrl = imageUrl;
          },
          (error) => {
            this.imageUrl = "../../../../assets/images/noexist.svg";
          }
        );
    }
  }

  larguraProduto(name: string): string {
    if (name && name.length >= 25) {
      return 'pensamento-g';
    }
    return 'pensamento-p';
  }

}
