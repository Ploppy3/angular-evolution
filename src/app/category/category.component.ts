import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Category } from '../ivy/ivy.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategoryComponent implements OnInit {

  @Input() category: Category;

  @ViewChild('canvas') canvas: ElementRef;

  constructor() { }

  ngOnInit() {
    this.draw();
  }

  public draw() {
    console.log(this.category.title, this.category.total)
    if (this.category.total > 0) {
      let ctx: CanvasRenderingContext2D = this.canvas.nativeElement.getContext("2d");
      ctx.beginPath();
      ctx.fillStyle = '#CFD8DC';
      ctx.arc(19, 19, 15, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();

      ctx.beginPath();
      ctx.strokeStyle = '#1E88E5';
      ctx.lineWidth = 8;
      ctx.arc(19, 19, 15, - Math.PI / 2, (2 * Math.PI) * this.category.done / this.category.total - Math.PI / 2);
      ctx.stroke();
      ctx.closePath();
    }
  }

}
