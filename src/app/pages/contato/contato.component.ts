import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../../services/contato.service'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'Web-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {
  enviado : String
  jogador: any
  formulario: FormGroup
  public router: Router
  constructor(router: Router,
    private formBuilder: FormBuilder,
    private contatoService: ContatoService,
    private route: ActivatedRoute,
  ) {
    this.router = router;
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      id: this.formBuilder.control('0', ),
      nome: this.formBuilder.control(sessionStorage.getItem('nome'), [Validators.required, Validators.minLength(1)]),
      email: this.formBuilder.control(sessionStorage.getItem('email'), [Validators.required, Validators.minLength(1)]),
      telefone: this.formBuilder.control('', [Validators.required, Validators.minLength(1)]),
      mensagem: this.formBuilder.control('', [Validators.required, Validators.minLength(1)]),
    })
    this.enviado = sessionStorage.getItem('contato')
    if (this.enviado == 'enviado'){
     alert('Dados Enviados com Sucesso'); 
    }
  }
  salvar(formulario: FormGroup) {
    let organizador = { 'nome': formulario.value.nome, 'email': formulario.value.email,'telefone': formulario.value.telefone, 'mensagem': formulario.value.mensagem }
      this.contatoService.save(organizador)
        .subscribe(retorno => {
          this.router.navigate(['/home'])
        }, err => {
          console.log("Erro ao Salvar Dados")
        })
        sessionStorage.setItem('contato', 'enviado')
    } 
}