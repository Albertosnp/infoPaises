import { Component, Input } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li{
        cursor: pointer;
      }
    `
  ]
})


export class PorPaisComponent {
  public termino: string = "";
  public hayError: boolean = false;
  public paises: Country[] = [];
  public paisesSugeridos: Country[] = [];
  public mostrarSugerencias: boolean = false;

  buscar ( termino: string ){
    this.termino = termino;

    this.hayError = false;
    //Validacion del campo
    if( !this.termino.trim().length )
      return;

    console.log(termino);
    
    //Se hace la peticion pasando por el servicio
    this.paisService.buscarPais( termino )
    .subscribe( 
      (paises => this.paises = paises),
      (error => {
                this.hayError = true;
                this.paises = [];
      })
    );
  }

  sugerencias( termino: string ){
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;

    this.paisService.buscarPais( termino )
      .subscribe( 
        paises => this.paisesSugeridos = paises.splice(0,5),
        err => this.paisesSugeridos = []  
      )
  }

  constructor( private paisService: PaisService ){}
}
