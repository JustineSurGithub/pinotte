import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-ui-infobar-top',
  templateUrl: './ui-infobar-top.component.html',
  styleUrls: [`ui-infobar-top.component.scss`]
})
export class UiInfobarTopComponent implements OnInit {

  constructor(private gameService: GameService) { }

  getPoints() {
    return this.gameService.points;
  }

  ngOnInit() {
  }

}
