import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { ChangePasswordComponent } from "./change-password.component";
import { AuthService } from "../auth/auth.service";

describe("ChangePasswordComponent", () => {
    let component: ChangePasswordComponent;
    let fixture: ComponentFixture<ChangePasswordComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            declarations: [ChangePasswordComponent],
            providers: [AuthService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChangePasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    describe("Error", () => {

        it("should be equal to Erreur de modification du mot de passe", async () => {
            component.onSuccess(false);
            expect(component.error).toMatch("Erreur de modification du mot de passe");
        });

        it("should be undefinied", async () => {
            await component.changePassword("1234", "1234");
            expect(component.error).toBeUndefined();
        });

        it("should be undefinied", async () => {
            await component.changePassword("1232", "1234");
            expect(component.error).toMatch("Les mots de passe ne sont pas les memes");
        });

    });

});
