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
  url: any
  formulario: FormGroup
  public router: Router
  fileToUpload: File = null;
  fileToUpload2: File = null;

  constructor(router: Router,
    private formBuilder: FormBuilder,
    private clubeService: ClubeService,
    private route: ActivatedRoute,
  ) {
    this.router = router;
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  handleFileInput2(files: FileList) {
    this.fileToUpload2 = files.item(0);
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      id: this.formBuilder.control('0', ),
      nome: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      criacao: this.formBuilder.control('', [Validators.required, Validators.minLength(1)]),
      pontuacao: this.formBuilder.control('', [Validators.required, Validators.minLength(1)]),
      campeonato: this.formBuilder.control('', [Validators.required, Validators.minLength(1)]),
      escudo: this.formBuilder.control(''),
      hino: this.formBuilder.control(''),
    })

    this.route.params.subscribe(paramsId => {
      if (paramsId['id'] != '0') {
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
        this.formulario.controls['escudo'].setValue(this.clube.escudo);
        this.formulario.controls['hino'].setValue(this.clube.hino);
      }, err => {
        console.log("Erro ao Pegar Dados")
      })
  }
  salvar(formulario: FormGroup) {
    const uploadData = new FormData();
    uploadData.append('nome', formulario.value.nome)
    uploadData.append('criacao', formulario.value.criacao)
    uploadData.append('pontuacao', formulario.value.pontuacao)
    uploadData.append('campeonato', formulario.value.campeonato)
    uploadData.append('escudo', this.fileToUpload, this.fileToUpload.name)
    uploadData.append('hino', this.fileToUpload2, this.fileToUpload2.name)

    if (formulario.value.id == 0) {
      this.clubeService.save(uploadData)
        .subscribe(retorno => {
          this.router.navigate(['/clubes'])
        }, err => {
          console.log("Erro ao Salvar Dados")
        })
    } else {
      this.clubeService.update(formulario.value.id, uploadData)
        .subscribe(retorno => {
          this.router.navigate(['/clubes'])
        }, err => {
          console.log("Erro ao Salvar Dados")
        })
    }
  }
}
