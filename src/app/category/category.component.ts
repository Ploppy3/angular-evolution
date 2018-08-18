import { Component, OnInit, Input, HostBinding, SimpleChanges } from '@angular/core';
import { Category } from '../ivy/ivy.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategoryComponent implements OnInit {

  @HostBinding('class.showBorder')
  public showBorder = true;

  @Input() category: Category;

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['category']) {
      this.showBorder = this.category.depth == 1;
    }
  }
}
