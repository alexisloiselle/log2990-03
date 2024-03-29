import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { PasswordFormComponent } from "./password-form.component";
import { AuthService } from "../auth.service";

describe("PasswordFormComponent", () => {
    let component: PasswordFormComponent;
    let fixture: ComponentFixture<PasswordFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            declarations: [PasswordFormComponent],
            providers: [AuthService]
        })
        .compileComponents()
        .catch((err) => {});
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PasswordFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    describe("Valid Password", () => {

         it("should be false", async () => {
            component.password = "password";
            await component.validatePassword("passfake");
            expect(component.validPassword).toBeFalsy();
         });

         it("should be true", async () => {
            component.password = "password";
            await component.validatePassword("password");
            expect(component.validPassword).toBeTruthy();
         });

    });
    describe("Valid Password", () => {

        it("should be true", async () => {
            component.password = "password";
            await component.validatePassword("password");
            expect(component.error).toBeFalsy();
        });

        it("should be true", async () => {
            component.password = "password";
            await component.validatePassword("passfake");
            expect(component.error).toBeTruthy();
        });
    });
});
