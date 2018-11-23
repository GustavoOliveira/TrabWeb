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
  fileToUpload: File = null;
  fileToUpload2: File = null;

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  handleFileInput2(files: FileList) {
    this.fileToUpload2 = files.item(0);
  }

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
      imagem: this.formBuilder.control(''),
      regulamento: this.formBuilder.control(''),
    })

    this.route.params.subscribe(paramsId => {
      if (paramsId['id'] != '0') {
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
        this.formulario.controls['imagem'].setValue(this.campeonato.imagem);
        this.formulario.controls['regulamento'].setValue(this.campeonato.regulamento);
      }, err => {
        console.log("Erro ao Pegar Dados")
      })
  }
  salvar(formulario: FormGroup) {
    const uploadData = new FormData();
    uploadData.append('nome', formulario.value.nome)
    uploadData.append('numero_times', formulario.value.numero_times)
    uploadData.append('organizador', formulario.value.organizador)
    uploadData.append('imagem', this.fileToUpload, this.fileToUpload.name)
    uploadData.append('regulamento', this.fileToUpload2, this.fileToUpload2.name)

    if (formulario.value.id == 0) {
      this.campeonatoService.save(uploadData)
        .subscribe(retorno => {
          this.router.navigate(['/campeonatos'])
        }, err => {
          console.log("Erro ao Salvar Dados")
        })
    } else {
      this.campeonatoService.update(formulario.value.id, uploadData)
        .subscribe(retorno => {
          this.router.navigate(['/campeonatos'])
        }, err => {
          console.log("Erro ao Salvar Dados")
        })
    }
  }

}
