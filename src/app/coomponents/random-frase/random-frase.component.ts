import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FraseDTO, Repositories } from 'src/app/interfaces/services';
import { FrasesService } from 'src/app/services/frases.service'
import { RepositoryService } from 'src/app/services/repository.service';

@Component({
  selector: 'app-random-frase',
  templateUrl: './random-frase.component.html',
  styleUrls: ['./random-frase.component.css']
})
export class RandomFraseComponent implements OnInit {

  repo: string = ""
  frase: FraseDTO;
  consultando: boolean = false;
  repos: Repositories[] = [];
  selected: Repositories;

  upcargando:boolean = false;
  downcargando:boolean = false;

  constructor(
    private frasesService: FrasesService,
    private repositoryService: RepositoryService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.consultarRepositorios();

  }

  consultarRepositorios() {
    this.consultando = true;
    this.repos = [];
    this.repositoryService.listRepositories().subscribe(resultado => {
      resultado.forEach(repo => {
        this.repos.push(repo);
      })
      if (this.repos.length > 0) {
        this.selected = this.repos[0];
      }
      this.consultando = false;
      this.otraFrase();

    });
  }

  otraFrase() {

    if (this.selected) {
      this.consultando = true;
      this.frasesService.getRandomQuote(this.selected.idheroku).subscribe(frase => {
        if (frase.frase) {
          this.frase = frase;
        } else {
          this.frase = undefined;
          this.toastr.error(`Respuesta recibida : ${frase} \n tipo dato : ${typeof frase}`, `Frase invalida [Repo:${this.selected.idheroku}]`);
        }
        this.consultando = false;
      }, error => {
        this.consultando = false;
        this.toastr.error(`Error : ${JSON.stringify(error)} `, `Error llamando el api!  [Repo:${this.selected.idheroku}]`);

      });
    }
  }

  votar(voto: number) {
    console.log(voto);
    if (voto == 1) {
      this.upcargando=true;
      this.frasesService.upvote(this.frase.id, this.selected.idheroku).subscribe(result => {  
        this.toastr.info('Voto Registrado! 👍')
        this.frase.votos++ 
        this.upcargando=false;
      },error => {        
        this.toastr.error(`Error : ${JSON.stringify(error)} `, `Error llamando el api upvote!  [Repo:${this.selected.idheroku}]`);
        this.upcargando=false;
      });
    }
    if (voto == -1) {
      this.downcargando = true;
      this.frasesService.downvote(this.frase.id, this.selected.idheroku).subscribe(result => { 
        this.toastr.warning('Voto Registrado! 🥺')
        this.frase.votos-- 
        this.downcargando = false;
      },error => {
        this.toastr.error(`Error : ${JSON.stringify(error)} `, `Error llamando el api downvote!  [Repo:${this.selected.idheroku}]`);
        this.downcargando = false;
      });
    }

  }

}
