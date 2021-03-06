import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public deseosService: DeseosService,
              private router: Router,
              private alertCtrl: AlertController) {
  }

  async agregarLista(){

    const alert = await this.alertCtrl.create({
      header: 'Nueva lista',
      inputs: [
        {
          name: 'Titulo',
          type: 'text',
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Cancelar');
        }
      },
      {
        text: 'Crear',
        handler: (data) =>{
          console.log(data);
          if (data.Titulo.length === 0){
            return;
          }

          const idLista = this.deseosService.crearLista(data.Titulo);

          this.router.navigateByUrl(`/tabs/tab1/agregar/${idLista}`);
        }
      }]
    });

    await alert.present();

  }

  listaSeleccionada(lista: Lista){
    this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
  }

}
