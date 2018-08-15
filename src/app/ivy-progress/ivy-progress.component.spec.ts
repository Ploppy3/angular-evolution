import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvyProgressComponent } from './ivy-progress.component';

describe('IvyProgressComponent', () => {
  let component: IvyProgressComponent;
  let fixture: ComponentFixture<IvyProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IvyProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvyProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
