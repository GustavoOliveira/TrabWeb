import { Component, OnInit } from '@angular/core';
import { JogadorService } from '../../services/jogador.service'

@Component({
  selector: 'app-jogador',
  templateUrl: './jogadores.component.html',
  styleUrls: ['./jogadores.component.css']
})
export class JogadoresComponent implements OnInit {
  listaJogadores: any[] = []
  constructor(private jogadorService: JogadorService) { }
 
  ngOnInit() {
    this.getList()
  }

  excluir(id: number) {
    this.jogadorService.delete(id).subscribe(
      retorno => {
        this.getList()
      }
    )
  }
  getList() {
    this.jogadorService.getList().subscribe(
      retorno => {
        this.listaJogadores = retorno
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
