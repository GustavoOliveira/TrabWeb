import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EstrelasService } from '../../services/estrelas.service'

@Component({
  selector: 'Web-estrela',
  templateUrl: './estrela.component.html',
  styleUrls: ['./estrela.component.css']
})
export class EstrelaComponent implements OnInit {
  estrela: any
  formulario: FormGroup
  public router: Router
  constructor(
    router: Router,
    private formBuilder: FormBuilder,
    private estrelaService: EstrelasService,
    private route: ActivatedRoute,
  ) {
    this.router = router;
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      id: this.formBuilder.control('0', ),
      nome: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      distancia: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
    })

    this.route.params.subscribe(paramsId => {
      if (paramsId['id']) {
        this.get(paramsId['id'])
      }
    })
  }

  get(id: number) {
    this.estrelaService.get(id).subscribe(retorno => {
      this.estrela = retorno
      this.formulario.controls['id'].setValue(this.estrela.id);
      this.formulario.controls['nome'].setValue(this.estrela.nome);
      this.formulario.controls['distancia'].setValue(this.estrela.distancia);
    }, err => {
      console.log("Erro ao Pegar Dados")
    })
  }

  salvar(formulario: FormGroup) {
    let estrela = { 'nome': formulario.value.nome, 'distancia': formulario.value.distancia }
    if (formulario.value.id == 0) {
      this.estrelaService.save(estrela)
        .subscribe(retorno => {
          this.router.navigate(['/estrelas'])
        }, err => {
          console.log("Erro ao Salvar Dados")
        })
    } else {
      this.estrelaService.update(formulario.value.id, estrela)
        .subscribe(retorno => {
          this.router.navigate(['/estrelas'])
        }, err => {
          console.log("Erro ao Salvar Dados")
        })
    }
  }
}
