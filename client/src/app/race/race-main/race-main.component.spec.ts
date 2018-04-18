import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RaceMainComponent } from "./race-main.component";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthService } from "../../admin/auth/auth.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("RaceMainComponent", () => {
    let component: RaceMainComponent;
    let fixture: ComponentFixture<RaceMainComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            declarations: [RaceMainComponent],
            providers: [AuthService]
        })
        .compileComponents()
        .catch((err) => {});
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RaceMainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
