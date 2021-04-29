import { Component, OnInit } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';


@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent  {

  public termino: string = "";
  public hayError: boolean = false;
  public capitales: Country[] = [];

  

  buscar ( termino: string ){
    this.termino = termino;

    this.hayError = false;
    //Validacion del campo
    if( !this.termino.trim().length )
      return;

    console.log(termino);
    
    //Se hace la peticion pasando por el servicio
    this.paisService.buscarCapital( termino )
    .subscribe( 
      (capitales => this.capitales = capitales),
      (error => {
                this.hayError = true;
                this.capitales = [];
      })
    );
  }

  sugerencias( termino: string ){
    this.hayError = false;
    //TODO: crear sugerencias
  }

  constructor( private paisService: PaisService ){}

}
