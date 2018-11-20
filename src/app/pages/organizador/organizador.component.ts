import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganizadorService } from '../../services/organizador.service'

@Component({
  selector: 'app-organizador',
  templateUrl: './organizador.component.html',
  styleUrls: ['./organizador.component.css']
})
export class OrganizadorComponent implements OnInit {
  organizador: any
  formulario: FormGroup
  public router: Router
  constructor(router: Router,
    private formBuilder: FormBuilder,
    private organizadorService: OrganizadorService,
    private route: ActivatedRoute,
  ) {
    this.router = router;
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      id: this.formBuilder.control('0', ),
      nome: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      sede: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      presidente: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      fundacao: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
    })

    this.route.params.subscribe(paramsId => {
      if (paramsId['id']) {
        this.get(paramsId['id'])
      }
    })
  }

  get(id: number) {
    this.organizadorService.get(id)
      .subscribe(retorno => {
        this.organizador = retorno
        this.formulario.controls['id'].setValue(this.organizador.id);
        this.formulario.controls['nome'].setValue(this.organizador.nome);
        this.formulario.controls['sede'].setValue(this.organizador.sede);
        this.formulario.controls['presidente'].setValue(this.organizador.presidente);
        this.formulario.controls['fundacao'].setValue(this.organizador.fundacao);
      }, err => {
        console.log("Erro ao Pegar Dados")
      })
  }
  salvar(formulario: FormGroup) {
    let organizador = { 'nome': formulario.value.nome, 'sede': formulario.value.sede,'presidente': formulario.value.presidente, 'fundacao': formulario.value.fundacao }
    if (formulario.value.id == 0) {
      this.organizadorService.save(organizador)
        .subscribe(retorno => {
          this.router.navigate(['/organizadores'])
        }, err => {
          console.log("Erro ao Salvar Dados")
        })
    } else {
      this.organizadorService.update(formulario.value.id, organizador)
        .subscribe(retorno => {
          this.router.navigate(['/organizadores'])
        }, err => {
          console.log("Erro ao Salvar Dados")
        })
    }
  }

}
