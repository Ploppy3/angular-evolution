import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../ivy/ivy.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategoryComponent implements OnInit {

  @Input() category: Category;

  constructor() { }

  ngOnInit() {
  }
}
