import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';

@Component({
  selector: 'app-animate-particles',
  standalone: true,
  imports: [],
  templateUrl: './animate-particles.component.html',
  styleUrl: './animate-particles.component.scss'
})
export class AnimateParticlesComponent implements AfterViewInit, OnDestroy{
  @ViewChild('particleCanvas') particleCanvas:
    | ElementRef<HTMLCanvasElement>
    | undefined;

  private ctx: CanvasRenderingContext2D | null = null;
  private particlesArray: Particle[] = [];
  private animationFrameId: number | null = null;

  ngAfterViewInit(): void {
    this.setupCanvas();
    if (this.ctx) {
      this.initParticles();
      this.animateParticles();
    }

    window.addEventListener('resize', this.adjustCanvasSize.bind(this));
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('resize', this.adjustCanvasSize.bind(this));
  }

  private setupCanvas(): void {
    if (this.particleCanvas && this.particleCanvas.nativeElement) {
      const canvas = this.particleCanvas.nativeElement;
      this.ctx = canvas.getContext('2d');
      if (this.ctx) {
        this.adjustCanvasSize();
      }
    }
  }

  private adjustCanvasSize = (): void => {
    if (this.particleCanvas && this.particleCanvas.nativeElement) {
      const canvas = this.particleCanvas.nativeElement;
      canvas.width = window.innerWidth - 50;
      canvas.height = window.innerHeight - 50;

      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
      }

      this.initParticles();
      this.animateParticles();
    }
  };

  private initParticles(): void {
    if (this.ctx && this.particleCanvas && this.particleCanvas.nativeElement) {
      this.particlesArray = [];
      const svgUrl = 'assets/icons/particle.svg';
      // Genera solo 5-6 particelle
      for (let i = 0; i < 10; i++) {
        // Puoi modificare questo numero come preferisci
        this.particlesArray.push(
          new Particle(this.ctx.canvas.width, this.ctx.canvas.height, svgUrl),
        );
      }
    }
  }

  private animateParticles(): void {
    if (this.ctx && this.particleCanvas && this.particleCanvas.nativeElement) {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.particlesArray.forEach((particle) => {
        particle.update();
        particle.draw(this.ctx as CanvasRenderingContext2D);
      });
      this.animationFrameId = requestAnimationFrame(
        this.animateParticles.bind(this),
      );
    }
  }
}

class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  image: HTMLImageElement;

  constructor(
    private canvasWidth: number,
    private canvasHeight: number,
    svgUrl: string,
  ) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.size = Math.random() * 20 + 5;
    this.speedX = Math.random() * 2 - 1.1;
    this.speedY = Math.random() * 2 - 1.1;
    this.image = new Image();
    this.image.src = svgUrl;
  }

  update(): void {
    this.x += this.speedX;
    this.y += this.speedY;

    // Rimbalzo sui bordi orizzontali
    if (this.x <= 0 || this.x + this.size >= this.canvasWidth) {
      this.speedX = -this.speedX;
    }

    // Rimbalzo sui bordi verticali
    if (this.y <= 0 || this.y + this.size >= this.canvasHeight) {
      this.speedY = -this.speedY;
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
  }
}
