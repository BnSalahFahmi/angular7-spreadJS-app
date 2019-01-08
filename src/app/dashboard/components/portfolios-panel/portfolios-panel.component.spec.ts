import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfoliosPanelComponent } from './portfolios-panel.component';

describe('PortfoliosPanelComponent', () => {
  let component: PortfoliosPanelComponent;
  let fixture: ComponentFixture<PortfoliosPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfoliosPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfoliosPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
