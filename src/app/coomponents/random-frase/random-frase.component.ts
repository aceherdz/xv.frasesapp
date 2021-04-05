import { Component, OnInit } from '@angular/core';
import { FraseDTO, Repositories } from 'src/app/interfaces/services';
import { FrasesService } from 'src/app/services/frases.service'
import { RepositoryService } from 'src/app/services/repository.service';

@Component({
  selector: 'app-random-frase',
  templateUrl: './random-frase.component.html',
  styleUrls: ['./random-frase.component.css']
})
export class RandomFraseComponent implements OnInit {

  repo:string = ""
  frase:FraseDTO ;
  consultando:boolean = false;
  repos:Repositories[] = [];
  selected:Repositories;
  constructor(
    private frasesService: FrasesService,
    private repositoryService : RepositoryService) { }

  ngOnInit(): void {
    this.consultarRepositorios();
    
  }

  consultarRepositorios(){
    this.consultando = true;
    this.repos = [];
    this.repositoryService.listRepositories().subscribe(resultado => {
      resultado.forEach(repo=>{       
        this.repos.push(repo);
      })
      if(this.repos.length>0){
        this.selected= this.repos[0];
      }
      this.consultando = false;
      this.otraFrase();
      
    });
  }

  otraFrase(){
    if(this.selected){
    this.consultando = true;
    this.frasesService.getRandomQuote(this.selected.idheroku).subscribe(frase => {
      this.frase = frase;
      this.consultando = false;
    });
  }
  }

  votar(voto:number){
    console.log(voto);
    if(voto==1){
      this.frasesService.upvote(this.frase.id,this.selected.idheroku).subscribe(result=> {this.frase.votos++});
    }
    if(voto==-1){
      this.frasesService.downvote(this.frase.id,this.selected.idheroku).subscribe(result=> {this.frase.votos--});
    }
    
  }

}
