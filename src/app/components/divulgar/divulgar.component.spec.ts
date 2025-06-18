import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Divulgar } from './divulgar.component';

describe('Divulgar', () => {
  let component: Divulgar;
  let fixture: ComponentFixture<Divulgar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Divulgar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Divulgar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
