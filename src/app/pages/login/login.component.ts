import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LoginService } from '../../services/login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: any
  log: any
  formulario: FormGroup
  public router: Router
  constructor(
    router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private route: ActivatedRoute,
  ) {
    this.router = router;
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      id: this.formBuilder.control('0', ),
      nome: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      email: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      login: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      senha: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
    })
  }

  salvar(formulario: FormGroup) {
    let login = { 'nome': formulario.value.nome, 'email': formulario.value.email, 'login': formulario.value.login, 'senha': formulario.value.senha }
    let log = { 'username': formulario.value.login, 'password': formulario.value.senha }
    this.loginService.logar(log)
      .subscribe(retorno => {
        sessionStorage.setItem('token','JWT ' + retorno.token)
      }, err => {
        console.log("Erro ao Salvar Dados")
      })
    sessionStorage.setItem('nome', login.nome)
    sessionStorage.setItem('email', login.email)
    sessionStorage.setItem('login', login.login)
    sessionStorage.setItem('senha', login.senha)
    this.router.navigate(['/home'])
  }
}
