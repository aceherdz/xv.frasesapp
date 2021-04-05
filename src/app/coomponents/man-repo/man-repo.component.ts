import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Repositories } from 'src/app/interfaces/services';
import { FrasesService } from 'src/app/services/frases.service';
import { RepositoryService } from 'src/app/services/repository.service';

@Component({
  selector: 'app-man-repo',
  templateUrl: './man-repo.component.html',
  styleUrls: ['./man-repo.component.css']
})
export class ManRepoComponent implements OnInit {

  repos: { repo: Repositories, validando?: boolean, up?: boolean, validado?:boolean }[] = [];
  consultando:boolean = false;
  adicionar:boolean=false;
  checkoutForm = this.formBuilder.group({
    idheroku: '',
    author: ''
  });

  constructor(private frasesService: FrasesService,
              private repositoryService : RepositoryService,
              private formBuilder: FormBuilder) {
    this.consultarRepositorios();
  }

  consultarRepositorios(){
    this.consultando = true;
    this.repos = [];
    this.repositoryService.listRepositories().subscribe(resultado => {
      resultado.forEach(repo=>{
        this.repos.push({repo:repo});
      })
      this.consultando = false;
      
    });
  }

  ngOnInit(): void {
  }

  addRepo() {   
    if(this.checkoutForm.valid){
      this.repositoryService
        .addRepository(this.checkoutForm.value.idheroku,this.checkoutForm.value.author)
        .subscribe(
          (resultado)=> {
            this.adicionar=false;
            this.consultarRepositorios();
          },
          ()=>console.log("error"));
    }
    
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

  borrar(idheroku){
    console.log(idheroku);
    this.repositoryService.deleteRepository(idheroku).subscribe(resultado=> this.consultarRepositorios(),()=> console.log("error"));    
  }

}

