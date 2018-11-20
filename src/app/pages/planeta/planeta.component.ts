import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlanetasService } from '../../services/planetas.service'

@Component({
  selector: 'Web-planeta',
  templateUrl: './planeta.component.html',
  styleUrls: ['./planeta.component.css']
})
export class PlanetaComponent implements OnInit {
  planeta: any
  formulario: FormGroup
  public router: Router
  constructor(router: Router,
    private formBuilder: FormBuilder,
    private planetaService: PlanetasService,
    private route: ActivatedRoute,
  ) {
    this.router = router;
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      id: this.formBuilder.control('0', ),
      nome: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      distancia: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      diametro: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      massa: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
    })

    this.route.params.subscribe(paramsId => {
      if (paramsId['id']) {
        this.get(paramsId['id'])
      }
    })
  }

  get(id: number) {
    this.planetaService.get(id)
      .subscribe(retorno => {
        this.planeta = retorno
        this.formulario.controls['id'].setValue(this.planeta.id);
        this.formulario.controls['nome'].setValue(this.planeta.nome);
        this.formulario.controls['diametro'].setValue(this.planeta.diametro);
        this.formulario.controls['distancia'].setValue(this.planeta.distancia);
        this.formulario.controls['massa'].setValue(this.planeta.massa);
      }, err => {
        console.log("Erro ao Pegar Dados")
      })
  }
  salvar(formulario: FormGroup) {
    let planeta = { 'nome': formulario.value.nome, 'diametro': formulario.value.diametro,'distancia': formulario.value.distancia, 'massa': formulario.value.massa }
    if (formulario.value.id == 0) {
      this.planetaService.save(planeta)
        .subscribe(retorno => {
          this.router.navigate(['/planetas'])
        }, err => {
          console.log("Erro ao Salvar Dados")
        })
    } else {
      this.planetaService.update(formulario.value.id, planeta)
        .subscribe(retorno => {
          this.router.navigate(['/planetas'])
        }, err => {
          console.log("Erro ao Salvar Dados")
        })
    }
  }

}
