import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'Web-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  nome : String
  ngOnInit() {
    this.nome = sessionStorage.getItem('nome')
  }

  constructor() {}
}
