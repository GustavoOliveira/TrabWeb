import { Component, OnInit } from '@angular/core';
import { PlanetasService } from '../../services/planetas.service'

@Component({
  selector: 'Web-planetas',
  templateUrl: './planetas.component.html',
  styleUrls: ['./planetas.component.css']
})
export class PlanetasComponent implements OnInit {
  listaPlanetas: any[] = []
  constructor(private planetaService: PlanetasService) { }
 
  ngOnInit() {
    this.getList()
  }

  excluir(id: number) {
    this.planetaService.delete(id).subscribe(
      retorno => {
        this.getList()
      }
    )
  }
  getList() {
    this.planetaService.getList().subscribe(
      retorno => {
        this.listaPlanetas = retorno
        this.listaPlanetas.sort(predicateBy("diametro"));
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
