import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-ui-sidebar-left',
  templateUrl: './ui-sidebar-left.component.html',
  styleUrls: []
})
export class UiSidebarLeftComponent implements OnInit {

 

  constructor(private gameService: GameService) { }

  retrieveGameStatus() {
    return this.gameService.gameover;
  }

  ngOnInit() {
  }

}
