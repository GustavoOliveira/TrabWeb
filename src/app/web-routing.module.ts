import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { OrganizadoresComponent } from './pages/organizadores/organizadores.component';
import { OrganizadorComponent } from './pages/organizador/organizador.component';
//campeonato
import { CampeonatosComponent } from './pages/campeonatos/campeonatos.component';
import { CampeonatoComponent } from './pages/campeonato/campeonato.component';
import { ContatoComponent } from './pages/contato/contato.component';
//clube
import { ClubeComponent } from './pages/clube/clube.component';
import { ClubesComponent } from './pages/clubes/clubes.component';
// jogador
import { JogadorComponent } from './pages/jogador/jogador.component';
import { JogadoresComponent } from './pages/jogadores/jogadores.component';
// jogo
import { JogoComponent } from './pages/jogo/jogo.component';
import { JogosComponent } from './pages/jogos/jogos.component';

  const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'contato', component: ContatoComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'organizadores', component: OrganizadoresComponent },
    { path: 'organizador/:id', component: OrganizadorComponent },
    { path: 'campeonatos', component: CampeonatosComponent },
    { path: 'campeonato/:id', component: CampeonatoComponent },
    { path: 'clubes', component: ClubesComponent },
    { path: 'clube/:id', component: ClubeComponent },
    { path: 'jogadores', component: JogadoresComponent },
    { path: 'jogador/:id', component: JogadorComponent },
    { path: 'jogos', component: JogosComponent },
    { path: 'jogo/:id', component: JogoComponent },
  ];

@NgModule({
  exports: [RouterModule],
  imports: [ RouterModule.forRoot(routes) ]
})
export class WebRoutingModule { }
