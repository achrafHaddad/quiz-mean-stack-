import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ListAnsComponent } from "./list-ans.component";

describe("ListComponent", () => {
  let component: ListAnsComponent;
  let fixture: ComponentFixture<ListAnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListAnsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
