import { Component, OnInit } from '@angular/core';
import { CampeonatoService } from '../../services/campeonato.service'

@Component({
  selector: 'app-campeonatos',
  templateUrl: './campeonatos.component.html',
  styleUrls: ['./campeonatos.component.css']
})
export class CampeonatosComponent implements OnInit {
  listaCampeonatos: any[] = []
  constructor(private campeonatoService: CampeonatoService) { }
 
  ngOnInit() {
    this.getList()
  }

  excluir(id: number) {
    this.campeonatoService.delete(id).subscribe(
      retorno => {
        this.getList()
      }
    )
  }
  getList() {
    this.campeonatoService.getList().subscribe(
      retorno => {
        this.listaCampeonatos = retorno
      }
    )

    function predicateBy(prop) {
      return function (a, b) {
        if (parseFloat(a[prop]) > parseFloat(b[prop])) {
          return 1;
        } else if (parseFloat(a[prop]) < parseFloat(b[prop])) {
          return -1;
        }
        return 0;
      }
    }
  }
}
