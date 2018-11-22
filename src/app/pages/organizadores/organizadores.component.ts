import { Component, OnInit } from '@angular/core';
import { OrganizadorService } from '../../services/organizador.service'
import { FilterPipe }from '../../filter.pipe';


@Component({
  selector: 'Web-organizadores',
  templateUrl: './organizadores.component.html',
  styleUrls: ['./organizadores.component.css']
})

export class OrganizadoresComponent implements OnInit {
  name = 'Angular';
  query:string = '';
  listaOrganizadores: any[] = []
  public loading = false;

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
    this.loading = true;
    this.organizadorService.getList().subscribe(
      retorno => {
        this.listaOrganizadores = retorno
        this.loading = false;
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
