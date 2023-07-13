import { Produto } from "../produtos/produto";

export interface Owner{
  _id?: string;
  name: string;
  pokemons: Produto[];
}
