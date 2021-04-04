import { Component, OnInit } from '@angular/core';
import { FrasesService } from 'src/app/services/frases.service'

@Component({
  selector: 'app-random-frase',
  templateUrl: './random-frase.component.html',
  styleUrls: ['./random-frase.component.css']
})
export class RandomFraseComponent implements OnInit {

  repo:string = ""
  frase:string = ""
  consultando:boolean = false;
  constructor(private frasesService: FrasesService) { }

  ngOnInit(): void {
    this.otraFrase();
  }

  otraFrase(){
    this.consultando = true;
    this.frasesService.getRandomQuote().subscribe(frase => {
      this.frase = frase.frase;
      this.consultando = false;
    });
  }

}
