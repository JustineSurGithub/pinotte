import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'instructions',
  templateUrl: './instructions.html',
  styleUrls: ['./instructions.scss']
})
export class UiInstructionsComponent implements OnInit {

  show = false;

  onInstructions() {
    this.show = !this.show;
  }

  constructor() { }

  ngOnInit() {
  }

}
