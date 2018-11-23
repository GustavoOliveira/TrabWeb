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
  fileToUpload: File = null;

  constructor(router: Router,
    private formBuilder: FormBuilder,
    private organizadorService: OrganizadorService,
    private route: ActivatedRoute,
  ) {
    this.router = router;
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  ngOnInit() {
    this.formulario = this.formBuilder.group({
      id: this.formBuilder.control('0', ),
      nome: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      sede: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      presidente: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      fundacao: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      imagem: this.formBuilder.control(''),
    })

    this.route.params.subscribe(paramsId => {
      if (paramsId['id'] != '0') {
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
        this.formulario.controls['imagem'].setValue(this.organizador.imagem);
      }, err => {
        console.log("Erro ao Pegar Dados")
      })
  }
  salvar(formulario: FormGroup) {
    const uploadData = new FormData();
    uploadData.append('nome', formulario.value.nome)
    uploadData.append('sede', formulario.value.sede)
    uploadData.append('presidente', formulario.value.presidente)
    uploadData.append('fundacao', formulario.value.fundacao)
    uploadData.append('imagem', this.fileToUpload, this.fileToUpload.name)

    if (formulario.value.id == 0) {
      this.organizadorService.save(uploadData)
        .subscribe(retorno => {
          this.router.navigate(['/organizadores'])
        }, err => {
          console.log("Erro ao Salvar Dados")
        })
    } else {
      this.organizadorService.update(formulario.value.id, uploadData)
        .subscribe(retorno => {
          this.router.navigate(['/organizadores'])
        }, err => {
          console.log("Erro ao Salvar Dados")
        })
    }
  }

}
