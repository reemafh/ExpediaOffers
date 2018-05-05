import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { ExpediaServiceService } from '../shared/expedia-service.service';
import { SearchCriteria } from '../models/data-models';
import { Router, ActivatedRoute, NavigationEnd, Params, RoutesRecognized } from '@angular/router';
import { MapsAPILoader } from '@agm/core';

@Component({
    selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ExpediaServiceService]

})

export class AppComponent implements OnInit {

  model: SearchCriteria = new SearchCriteria();
  offers: any = [];

  constructor(private mapsAPILoader: MapsAPILoader, private es: ExpediaServiceService, private activatedRoute: ActivatedRoute, private router: Router, private ngZone: NgZone) {
  }

  @ViewChild("places")
  public placesElementRef: ElementRef;

  ngOnInit() {

    this.mapsAPILoader.load().then(() => {

      let autocomplete = new google.maps.places.Autocomplete(this.placesElementRef.nativeElement, { types: ["(regions)"] })

      autocomplete.addListener("place_changed", () =>
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.model.destinationCity = place.formatted_address;
        })
      )

      this.getOffers();
    }
    )

    this.router.events.subscribe(val => {
      if (val instanceof RoutesRecognized) {
        const queryParams: Params = Object.assign({}, val.state.root.firstChild.queryParams) as Array<Params>;

        Object.keys(queryParams).forEach(key => {
          if (queryParams[key])
            this.model[key] = queryParams[key];
        })
      }
    })

  }
  search() {
    this.appendAQueryParam();
    this.getOffers();
  }

   decodeURI(url) {
      return decodeURIComponent(url);
  }
  getOffers() {

    this.es.getData(this.model).subscribe(
      data => {
        this.offers = data;
      },
      err => {
        console.log(err);
      }
    );
  }
  appendAQueryParam() {

    const queryParams: Params = Object.assign({}, this.activatedRoute.snapshot.queryParams);

    Object.keys(this.model).forEach(key => {

        let queryVal = this.model[key] != "null" ? this.model[key] : "";
        queryParams[key] = queryVal;
    })

    this.router.navigate([], { queryParams: queryParams, queryParamsHandling: "merge" });
  }


  title = 'Hotel Offers';
}
