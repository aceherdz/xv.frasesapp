import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Repositories } from 'src/app/interfaces/services';
import { FrasesService } from 'src/app/services/frases.service';
import { RepositoryService } from 'src/app/services/repository.service';

@Component({
  selector: 'app-add-frase',
  templateUrl: './add-frase.component.html',
  styleUrls: ['./add-frase.component.css']
})
export class AddFraseComponent implements OnInit {

  checkoutForm = this.formBuilder.group({
    frase: ''
  });
  enviando: boolean = false;
  consultando:boolean = false;
  repos: Repositories[] = [];
  selected : Repositories;


  constructor(
    private formBuilder: FormBuilder,
    private frasesService: FrasesService,
    private toastr: ToastrService,
    private repositoryService: RepositoryService) { }

  ngOnInit(): void {
    this.consultarRepositorios();
  }

  consultarRepositorios(){
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

    });
  }

  addFrase() {
    if (this.checkoutForm.valid) {
      if (this.checkoutForm.value.frase.length > 200) {
        this.toastr.error('es una frase! no un libro.' , "woo woo woo ✋")
      } else {
        this.enviando = true;
        this.frasesService.addQuote(this.checkoutForm.value.frase, this.selected.idheroku).subscribe(() => {
          this.toastr.success(`Frase Agregada en el repositorio de ${this.selected.author}.`)
          this.enviando = false;
          this.checkoutForm.reset();
        }, (error) => {
          this.toastr.error(`error : ${JSON.stringify(error)}`, "no se pudo agregar la frase")
          this.enviando = false;
        });
      }
    }

  }

}
