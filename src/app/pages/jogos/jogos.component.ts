import { Component, OnInit } from '@angular/core';
import { JogoService } from '../../services/jogo.service'
import { FilterPipeJogo }from '../../filter.pipe';

@Component({
  selector: 'app-jogos',
  templateUrl: './jogos.component.html',
  styleUrls: ['./jogos.component.css']
})
export class JogosComponent implements OnInit {
  name = 'Angular';
  query:string = '';
  listaJogos: any[] = []
  public loading = false;
  constructor(private jogoService: JogoService) { }
 
  ngOnInit() {
    this.getList()
  }

  excluir(id: number) {
    this.jogoService.delete(id).subscribe(
      retorno => {
        this.getList()
      }
    )
  }
  getList() {
    this.loading = true;
    this.jogoService.getList().subscribe(
      retorno => {
        this.listaJogos = retorno
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
