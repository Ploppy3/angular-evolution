import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-ivy-progress',
  templateUrl: './ivy-progress.component.html',
  styleUrls: ['./ivy-progress.component.scss']
})
export class IvyProgressComponent implements OnInit {

  /** progress [0 - 1] */
  @Input() progress = 0;
  @ViewChild('canvas') canvas: ElementRef;

  constructor() { }

  ngOnInit() {
    this.draw();
  }

  private draw() {
    let ctx: CanvasRenderingContext2D = this.canvas.nativeElement.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = '#CFD8DC';
    ctx.arc(19, 19, 15, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.strokeStyle = '#1E88E5';
    ctx.lineWidth = 8;
    ctx.arc(19, 19, 15, - Math.PI / 2, (2 * Math.PI) * this.progress - Math.PI / 2);
    ctx.stroke();
    ctx.closePath();
  }


}
