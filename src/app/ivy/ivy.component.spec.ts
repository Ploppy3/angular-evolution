import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvyComponent } from './ivy.component';

describe('IvyComponent', () => {
  let component: IvyComponent;
  let fixture: ComponentFixture<IvyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IvyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
