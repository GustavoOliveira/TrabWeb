import { Component, OnInit } from '@angular/core';
import { JogadorService } from '../../services/jogador.service'
import { FilterPipe }from '../../filter.pipe';

@Component({
  selector: 'app-jogador',
  templateUrl: './jogadores.component.html',
  styleUrls: ['./jogadores.component.css']
})
export class JogadoresComponent implements OnInit {
  name = 'Angular';
  query:string = '';
  listaJogadores: any[] = []
  public loading = false;
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
    this.loading = true;
    this.jogadorService.getList().subscribe(
      retorno => {
        this.listaJogadores = retorno
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
