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
    CampeonatoComponent
  ],
  imports: [
    BrowserModule,
    WebRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [OrganizadorService, CampeonatoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
