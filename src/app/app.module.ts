import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { WebRoutingModule } from './/web-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ContatoComponent } from './pages/contato/contato.component';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
//Organizador
import { OrganizadorComponent } from './pages/organizador/organizador.component';
import { OrganizadoresComponent } from './pages/organizadores/organizadores.component';
import { OrganizadorService } from './services/organizador.service';
//Campeonato
import { CampeonatosComponent } from './pages/campeonatos/campeonatos.component';
import { CampeonatoComponent } from './pages/campeonato/campeonato.component';
import { CampeonatoService } from './services/campeonato.service';
//Clube
import { ClubesComponent } from './pages/clubes/clubes.component';
import { ClubeComponent } from './pages/clube/clube.component';
import { ClubeService } from './services/clube.service';
//jogador
import { JogadoresComponent } from './pages/jogadores/jogadores.component';
import { JogadorComponent } from './pages/jogador/jogador.component';
import { JogadorService } from './services/jogador.service';
//jogo
import { JogosComponent } from './pages/jogos/jogos.component';
import { JogoComponent } from './pages/jogo/jogo.component';
import { JogoService } from './services/jogo.service';

import { FilterPipe, FilterPipeJogo} from './filter.pipe';
import { ContatoService } from './services/contato.service';
import { NgxLoadingModule } from 'ngx-loading';
import { LoginService } from './services/login.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContatoComponent,
    LoginComponent,
    MenuComponent,
    OrganizadorComponent,
    OrganizadoresComponent,
    CampeonatosComponent,
    CampeonatoComponent,
    ClubesComponent,
    ClubeComponent,
    JogadoresComponent,
    JogadorComponent,
    JogosComponent,
    JogoComponent,
    FilterPipe,
    FilterPipeJogo 
  ],
  imports: [
    BrowserModule,
    WebRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [OrganizadorService, CampeonatoService, ClubeService, JogadorService, JogoService,ContatoService,LoginService],

  bootstrap: [AppComponent]
})
export class AppModule { }
