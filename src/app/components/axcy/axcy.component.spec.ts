import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AxcyComponent } from './axcy.component';

describe('AxcyComponent', () => {
  let component: AxcyComponent;
  let fixture: ComponentFixture<AxcyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AxcyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AxcyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
