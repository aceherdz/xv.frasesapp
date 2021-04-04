import { Component, OnInit } from '@angular/core';
import { Repositories } from 'src/app/interfaces/services';
import { FrasesService } from 'src/app/services/frases.service';

@Component({
  selector: 'app-man-repo',
  templateUrl: './man-repo.component.html',
  styleUrls: ['./man-repo.component.css']
})
export class ManRepoComponent implements OnInit {

  repos: { repo: Repositories, validando?: boolean, up?: boolean, validado:boolean }[] = [];

  constructor(private frasesService: FrasesService) {

    this.repos.push({ repo: { idheroku: "frasesxavi-back", author: "xavi" }, validado: false });
    this.repos.push({ repo: { idheroku: "frasesxavi-back", author: "xavi" },validado: false });
    this.repos.push({ repo: { idheroku: "frasesxavi-back", author: "xavi" } ,validado: false});
    this.repos.push({ repo: { idheroku: "frasesxavi-back", author: "xavi" },validado: false });
    this.repos.push({ repo: { idheroku: "frasesxavi-back", author: "xavi" } ,validado: false});
    this.repos.push({ repo: { idheroku: "frasesxavi-back", author: "xavi" },validado: false });

  }

  ngOnInit(): void {
  }

  addRepo() {

  }
  checkRepo(index) {
    this.repos[index].validando = true;
    this.repos[index].validado = true;
    this.frasesService
      .ping(this.repos[index].repo.idheroku)
      .subscribe(estado => { 
        this.repos[index].up = estado; 
        this.repos[index].validando = false;
      },(error)=>{
        this.repos[index].up = false; 
        this.repos[index].validando = false;
      });

  }

}
