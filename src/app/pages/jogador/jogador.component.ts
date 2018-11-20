import { Component, OnInit } from '@angular/core';
import { JogadorService } from '../../services/jogador.service'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-jogador',
  templateUrl: './jogador.component.html',
  styleUrls: ['./jogador.component.css']
})
export class JogadorComponent implements OnInit {
  jogador: any
  formulario: FormGroup
  public router: Router
  constructor(router: Router,
    private formBuilder: FormBuilder,
    private jogadorService: JogadorService,
    private route: ActivatedRoute,
  ) {
    this.router = router;
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      id: this.formBuilder.control('0', ),
      nome: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      idade: this.formBuilder.control('', [Validators.required, Validators.minLength(1)]),
      peso: this.formBuilder.control('', [Validators.required, Validators.minLength(1)]),
      clube: this.formBuilder.control('', [Validators.required, Validators.minLength(1)]),
    })

    this.route.params.subscribe(paramsId => {
      if (paramsId['id']) {
        this.get(paramsId['id'])
      }
    })
  }

  get(id: number) {
    this.jogadorService.get(id)
      .subscribe(retorno => {
        this.jogador = retorno
        this.formulario.controls['id'].setValue(this.jogador.id);
        this.formulario.controls['nome'].setValue(this.jogador.nome);
        this.formulario.controls['idade'].setValue(this.jogador.idade);
        this.formulario.controls['peso'].setValue(this.jogador.peso);
        this.formulario.controls['clube'].setValue(this.jogador.clube);
      }, err => {
        console.log("Erro ao Pegar Dados")
      })
  }
  salvar(formulario: FormGroup) {
    let organizador = { 'nome': formulario.value.nome, 'idade': formulario.value.idade,'peso': formulario.value.peso, 'clube': formulario.value.clube }
    if (formulario.value.id == 0) {
      this.jogadorService.save(organizador)
        .subscribe(retorno => {
          this.router.navigate(['/jogadores'])
        }, err => {
          console.log("Erro ao Salvar Dados")
        })
    } else {
      this.jogadorService.update(formulario.value.id, organizador)
        .subscribe(retorno => {
          this.router.navigate(['/jogadores'])
        }, err => {
          console.log("Erro ao Salvar Dados")
        })
    }
  }

}
