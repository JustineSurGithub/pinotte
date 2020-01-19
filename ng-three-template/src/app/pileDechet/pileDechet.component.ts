import { Component, OnInit, OnDestroy } from '@angular/core';
import { Dechet } from '../classes/dechet';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-pile-dechet',
  templateUrl: './pileDechet.component.html',
  styleUrls: ['./pileDechet.component.scss']
})
export class PileDechetComponent implements OnInit, OnDestroy {
  public pile: Dechet[];
  constructor(private gameService: GameService) {
  }

  idToUrlImage(id: number) {
    // TODO change back. Thx.
    return `/assets/0.png`;
    return `/assets/${id}.png`;
  }
  ngOnInit(): void {
    this.gameService.pile.subscribe((dechets) => {
      this.pile = dechets.slice().reverse();
    });
  }
  ngOnDestroy(): void {
    // Do nothing for now
  }
}
