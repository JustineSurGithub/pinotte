import { Component, OnInit } from '@angular/core';
import { DechetsService } from '../services/dechets.service';

@Component({
  selector: 'app-pile-dechet',
  templateUrl: './pileDechet.html'
})
export class pileDechetComponent implements OnInit {


  pile: Number[] = [];

  constructor(private dechetService: DechetsService) {

  }


  ngOnInit() {
    this.pile = [1, 2, 3, 4, 5, 6, 7];

    this.dechetService.dechetAddingTimer.subscribe(() => {
      this.pile.push(this.pile[this.pile.length-1] + 1);
    });
  }

}
