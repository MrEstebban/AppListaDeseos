import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  listas: Lista [] = [];
  
  constructor() {

    this.cargarStorage();
    // const lista1 = new Lista('Recolectar piedras del infinito');
    // const lista2 = new Lista('Heroes a desaparecer');

    // this.listas.push(lista1, lista2);

  }

  crearLista(titulo: string){
    const nuevaLista = new Lista(titulo);
    this.listas.push(nuevaLista);
    this.guardarStorage();

    return nuevaLista.id;
  }

  obtenerLista(idLista: string | number): Lista{
    idLista = Number(idLista);

    return this.listas.find(listaData => listaData.id === idLista);
  }

  guardarStorage(){
    localStorage.setItem('data', JSON.stringify(this.listas));
  }

  cargarStorage(){

    this.listas = JSON.parse(localStorage.getItem('data')) ? JSON.parse(localStorage.getItem('data')) : [] ;
  }

  borrarLista(lista: Lista){
    console.log('EN borrar lista servicio: Id lista a borrar ' + lista.id);

    this.listas = this.listas.filter(listaData => listaData.id !== lista.id);

    this.guardarStorage();
  }

}
