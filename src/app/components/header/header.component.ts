import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'Web-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  nome : String
  ngOnInit() {
    this.nome = sessionStorage.getItem('nome')
  }
  constructor() {}
}
