import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login : any
  formulario: FormGroup
  public router: Router
  constructor(
    router: Router,
    private formBuilder: FormBuilder,
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
    sessionStorage.setItem('nome', login.nome)
    sessionStorage.setItem('email', login.email)
    sessionStorage.setItem('login', login.login)
    sessionStorage.setItem('senha', login.senha)
    this.router.navigate(['/home'])
  }
}
