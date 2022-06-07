import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemitonesComponent } from './semitones.component';

describe('SemitonesComponent', () => {
  let component: SemitonesComponent;
  let fixture: ComponentFixture<SemitonesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemitonesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemitonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
