import { Component, Input, OnInit } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { AlertController } from '@ionic/angular';
import { Lista } from '../../models/lista.model';
import { Router } from '@angular/router';



@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @Input() terminada = true;

  constructor(public deseosService: DeseosService,
              private router: Router,
              private alertCtrl: AlertController) { }

  ngOnInit() {}

  listaSeleccionada(lista: Lista){

    if (this.terminada){
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    }else{
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }
  }

  borrarLista(lista: Lista){

    this.deseosService.borrarLista(lista);
  }

  async editarNombreLista(lista: Lista){
    const alert = await this.alertCtrl.create({
      header: 'Editar nombre lista',
      inputs: [
        {
          name: 'Titulo',
          type: 'text',
          value: lista.titulo,
          placeholder: 'Nuevo nombre de la lista'
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
        text: 'Actualizar',
        handler: (data) => {
          console.log(lista);
          if (data.Titulo.length === 0){
            return;
          }

          lista.titulo = data.Titulo;
          this.deseosService.guardarStorage();
        }
      }]
    });

    await alert.present();
  }

}
