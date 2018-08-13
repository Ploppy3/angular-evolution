import { Component, OnInit, Input } from '@angular/core';
import { Implementation, STATUS } from '../ivy/ivy.component';

@Component({
  selector: 'app-implementation',
  templateUrl: './implementation.component.html',
  styleUrls: ['./implementation.component.scss']
})
export class ImplementationComponent implements OnInit {

  @Input() implementation: Implementation;

  public status = STATUS;

  constructor() { }

  ngOnInit() {
  }

}
