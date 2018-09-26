import { Component, OnInit, Input, HostBinding, SimpleChanges, OnChanges } from '@angular/core';
import { Category } from '../ivy/ivy.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategoryComponent implements OnInit, OnChanges {

  @HostBinding('class.showBorder')
  public showBorder = true;

  @Input() category: Category;

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['category']) {
      this.showBorder = this.category.depth === 1;
    }
  }
}
