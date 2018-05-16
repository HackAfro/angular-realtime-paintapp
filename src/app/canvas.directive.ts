import {
  Directive,
  ElementRef,
  HostListener,
  HostBinding,
  AfterViewInit,
} from '@angular/core';
import { v4 } from 'uuid';
import { HttpClient } from '@angular/common/http';
import { PusherService } from './pusher.service';

@Directive({
  selector: '[myCanvas]',
})
export class CanvasDirective implements AfterViewInit {
  constructor(
    private el: ElementRef,
    private http: HttpClient,
    private pusher: PusherService
  ) {
    this.canvas = this.el.nativeElement;
    this.canvas.width = 1000;
    this.canvas.height = 800;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = 5;
  }
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  userStrokeStyle = '#FAD8D6';
  guestStrokeStyle = '#CD5334';
  position: {
    start: {};
    stop: {};
  };
  line = [];
  userId = v4();
  prevPos = {
    offsetX: 0,
    offsetY: 0,
  };
  isPainting = false;

  @HostListener('mousedown', ['$event'])
  onMouseDown({ offsetX, offsetY }) {
    this.isPainting = true;
    this.prevPos = {
      offsetX,
      offsetY,
    };
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove({ offsetX, offsetY }) {
    if (this.isPainting) {
      const offSetData = { offsetX, offsetY };
      this.position = {
        start: { ...this.prevPos },
        stop: { ...offSetData },
      };
      this.line = this.line.concat(this.position);
      this.draw(this.prevPos, offSetData, this.userStrokeStyle);
    }
  }

  @HostListener('mouseup')
  onMouseUp() {
    this.isPainting = false;
    this.makeRequest();
  }

  @HostListener('mouseleave')
  onmouseleave() {
    this.isPainting = false;
    this.makeRequest();
  }

  @HostBinding('style.background') background = 'black';

  makeRequest() {
    this.http
      .post('http://localhost:4000/draw', {
        line: this.line,
        userId: this.userId,
      })
      .subscribe((res) => {
        this.line = [];
      });
  }

  draw({ offsetX: x, offsetY: y }, { offsetX, offsetY }, strokeStyle) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = strokeStyle;
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(offsetX, offsetY);
    this.ctx.stroke();
    this.prevPos = {
      offsetX,
      offsetY,
    };
  }

  ngAfterViewInit() {
    const channel = this.pusher.init();
    channel.bind('draw', (data) => {
      if (data.userId !== this.userId) {
        data.line.forEach((position) => {
          this.draw(position.start, position.stop, this.guestStrokeStyle);
        });
      }
    });
  }
}
