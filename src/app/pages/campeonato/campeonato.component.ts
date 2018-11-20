import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampeonatoService } from '../../services/campeonato.service'

@Component({
  selector: 'app-campeonato',
  templateUrl: './campeonato.component.html',
  styleUrls: ['./campeonato.component.css']
})
export class CampeonatoComponent implements OnInit {
  campeonato: any
  formulario: FormGroup
  public router: Router
  constructor(router: Router,
    private formBuilder: FormBuilder,
    private campeonatoService: CampeonatoService,
    private route: ActivatedRoute,
  ) {
    this.router = router;
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      id: this.formBuilder.control('0', ),
      nome: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      numero_times: this.formBuilder.control('', [Validators.required, Validators.minLength(1)]),
      organizador: this.formBuilder.control('', [Validators.required, Validators.minLength(1)]),
    })

    this.route.params.subscribe(paramsId => {
      if (paramsId['id']) {
        this.get(paramsId['id'])
      }
    })
  }

  get(id: number) {
    this.campeonatoService.get(id)
      .subscribe(retorno => {
        this.campeonato = retorno
        this.formulario.controls['id'].setValue(this.campeonato.id);
        this.formulario.controls['nome'].setValue(this.campeonato.nome);
        this.formulario.controls['numero_times'].setValue(this.campeonato.numero_times);
        this.formulario.controls['organizador'].setValue(this.campeonato.organizador);
      }, err => {
        console.log("Erro ao Pegar Dados")
      })
  }
  salvar(formulario: FormGroup) {
    let campeonato = { 'nome': formulario.value.nome, 'numero_times': formulario.value.numero_times,'organizador': formulario.value.organizador,}
    if (formulario.value.id == 0) {
      this.campeonatoService.save(campeonato)
        .subscribe(retorno => {
          this.router.navigate(['/campeonatos'])
        }, err => {
          console.log("Erro ao Salvar Dados")
        })
    } else {
      this.campeonatoService.update(formulario.value.id, campeonato)
        .subscribe(retorno => {
          this.router.navigate(['/campeonatos'])
        }, err => {
          console.log("Erro ao Salvar Dados")
        })
    }
  }

}
