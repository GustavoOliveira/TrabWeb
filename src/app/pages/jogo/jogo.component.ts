import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JogoService } from '../../services/jogo.service'


@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.css']
})
export class JogoComponent implements OnInit {
  jogo: any
  formulario: FormGroup
  public router: Router
  constructor(router: Router,
    private formBuilder: FormBuilder,
    private jogoService: JogoService,
    private route: ActivatedRoute,
  ) {
    this.router = router;
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      id: this.formBuilder.control('0', ),
      time_casa: this.formBuilder.control('', [Validators.required, Validators.minLength(1)]),
      time_fora: this.formBuilder.control('', [Validators.required, Validators.minLength(1)]),
      gol_tm_casa: this.formBuilder.control('', [Validators.required, Validators.minLength(1)]),
      gol_tm_fora: this.formBuilder.control('', [Validators.required, Validators.minLength(1)]),
      campeonato: this.formBuilder.control('', [Validators.required, Validators.minLength(1)]),
      data: this.formBuilder.control('', [Validators.required, Validators.minLength(1)]),      
    })

    this.route.params.subscribe(paramsId => {
      if (paramsId['id']) {
        this.get(paramsId['id'])
      }
    })
  }

  get(id: number) {
    this.jogoService.get(id)
      .subscribe(retorno => {
        this.jogo = retorno
        this.formulario.controls['id'].setValue(this.jogo.id);
        this.formulario.controls['time_casa'].setValue(this.jogo.time_casa);
        this.formulario.controls['time_fora'].setValue(this.jogo.time_fora);
        this.formulario.controls['gol_tm_casa'].setValue(this.jogo.gol_tm_casa);
        this.formulario.controls['gol_tm_fora'].setValue(this.jogo.gol_tm_fora);
        this.formulario.controls['campeonato'].setValue(this.jogo.campeonato);
        this.formulario.controls['data'].setValue(this.jogo.data);
      }, err => {
        console.log("Erro ao Pegar Dados")
      })
  }
  salvar(formulario: FormGroup) {
    let jogo = { 'time_casa': formulario.value.time_casa, 'time_fora': formulario.value.time_fora,'gol_tm_casa': formulario.value.gol_tm_casa, 
    'gol_tm_fora': formulario.value.gol_tm_fora, 'campeonato': formulario.value.campeonato, 'data': formulario.value.data}
    if (formulario.value.id == 0) {
      this.jogoService.save(jogo)
        .subscribe(retorno => {
          this.router.navigate(['/jogos'])
        }, err => {
          console.log("Erro ao Salvar Dados")
        })
    } else {
      this.jogoService.update(formulario.value.id, jogo)
        .subscribe(retorno => {
          this.router.navigate(['/jogos'])
        }, err => {
          console.log("Erro ao Salvar Dados")
        })
    }
  }

}
