
import { TrackListComponent } from "./track-list.component";

// to test
// tslint:disable-next-line:no-any
const trackService: any = {};

describe("TrackListComponent", () => {
    let component: TrackListComponent;

    beforeEach(() => {
        component = new TrackListComponent(trackService);
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
