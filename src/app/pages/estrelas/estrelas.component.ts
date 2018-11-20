import { Component, OnInit } from '@angular/core';
import { EstrelasService } from '../../services/estrelas.service'

@Component({
  selector: 'Web-estrelas',
  templateUrl: './estrelas.component.html',
  styleUrls: ['./estrelas.component.css']
})
export class EstrelasComponent implements OnInit {
  listaEstrelas: any[] = []
  constructor(private estrelaService: EstrelasService) { }
  ngOnInit() {
    this.getList()
  }

  excluir(id: number) {
    this.estrelaService.delete(id).subscribe(
      retorno => {
        this.getList()
      }
    )
  }
  getList() {
    this.estrelaService.getList().subscribe(
      retorno => {
        this.listaEstrelas = retorno
      }
    )
  }
}
