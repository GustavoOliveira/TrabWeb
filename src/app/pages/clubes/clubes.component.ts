import { Component, OnInit } from '@angular/core';
import { ClubeService } from '../../services/clube.service'

@Component({
  selector: 'app-clubes',
  templateUrl: './clubes.component.html',
  styleUrls: ['./clubes.component.css']
})
export class ClubesComponent implements OnInit {
  listaClubes: any[] = []
  constructor(private clubeService: ClubeService) { }
 
  ngOnInit() {
    this.getList()
  }

  excluir(id: number) {
    this.clubeService.delete(id).subscribe(
      retorno => {
        this.getList()
      }
    )
  }
  getList() {
    this.clubeService.getList().subscribe(
      retorno => {
        this.listaClubes = retorno
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
