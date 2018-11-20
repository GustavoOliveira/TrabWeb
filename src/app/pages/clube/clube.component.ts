import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClubeService } from '../../services/clube.service'


@Component({
  selector: 'app-clube',
  templateUrl: './clube.component.html',
  styleUrls: ['./clube.component.css']
})
export class ClubeComponent implements OnInit {
  clube: any
  formulario: FormGroup
  public router: Router
  constructor(router: Router,
    private formBuilder: FormBuilder,
    private clubeService: ClubeService,
    private route: ActivatedRoute,
  ) {
    this.router = router;
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      id: this.formBuilder.control('0', ),
      nome: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      criacao: this.formBuilder.control('', [Validators.required, Validators.minLength(1)]),
      pontuacao: this.formBuilder.control('', [Validators.required, Validators.minLength(1)]),
      campeonato: this.formBuilder.control('', [Validators.required, Validators.minLength(1)]),
    })

    this.route.params.subscribe(paramsId => {
      if (paramsId['id']) {
        this.get(paramsId['id'])
      }
    })
  }

  get(id: number) {
    this.clubeService.get(id)
      .subscribe(retorno => {
        this.clube = retorno
        this.formulario.controls['id'].setValue(this.clube.id);
        this.formulario.controls['nome'].setValue(this.clube.nome);
        this.formulario.controls['criacao'].setValue(this.clube.criacao);
        this.formulario.controls['pontuacao'].setValue(this.clube.pontuacao);
        this.formulario.controls['campeonato'].setValue(this.clube.campeonato);
      }, err => {
        console.log("Erro ao Pegar Dados")
      })
  }
  salvar(formulario: FormGroup) {
    let clube = { 'nome': formulario.value.nome, 'criacao': formulario.value.criacao,'pontuacao': formulario.value.pontuacao, 'campeonato': formulario.value.campeonato }
    if (formulario.value.id == 0) {
      this.clubeService.save(clube)
        .subscribe(retorno => {
          this.router.navigate(['/clubes'])
        }, err => {
          console.log("Erro ao Salvar Dados")
        })
    } else {
      this.clubeService.update(formulario.value.id, clube)
        .subscribe(retorno => {
          this.router.navigate(['/clubes'])
        }, err => {
          console.log("Erro ao Salvar Dados")
        })
    }
  }
}
