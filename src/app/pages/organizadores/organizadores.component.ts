import { Component, OnInit } from '@angular/core';
import { OrganizadorService } from '../../services/organizador.service'

@Component({
  selector: 'Web-organizadores',
  templateUrl: './organizadores.component.html',
  styleUrls: ['./organizadores.component.css']
})
export class OrganizadoresComponent implements OnInit {
  listaOrganizadores: any[] = []
  constructor(private organizadorService: OrganizadorService) { }
 
  ngOnInit() {
    this.getList()
  }

  excluir(id: number) {
    this.organizadorService.delete(id).subscribe(
      retorno => {
        this.getList()
      }
    )
  }
  getList() {
    this.organizadorService.getList().subscribe(
      retorno => {
        this.listaOrganizadores = retorno
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
