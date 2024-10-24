import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimateParticlesComponent } from './animate-particles.component';

describe('AnimateParticlesComponent', () => {
  let component: AnimateParticlesComponent;
  let fixture: ComponentFixture<AnimateParticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimateParticlesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnimateParticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
