import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { OrganizadoresComponent } from './pages/organizadores/organizadores.component';
import { OrganizadorComponent } from './pages/organizador/organizador.component';
import { CampeonatosComponent } from './pages/campeonatos/campeonatos.component';
import { CampeonatoComponent } from './pages/campeonato/campeonato.component';
import { ContatoComponent } from './pages/contato/contato.component';


  const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'contato', component: ContatoComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'organizadores', component: OrganizadoresComponent },
    { path: 'organizador/:id', component: OrganizadorComponent },
    { path: 'campeonatos', component: CampeonatosComponent },
    { path: 'campeonato/:id', component: CampeonatoComponent },
  ];

@NgModule({
  exports: [RouterModule],
  imports: [ RouterModule.forRoot(routes) ]
})
export class WebRoutingModule { }
