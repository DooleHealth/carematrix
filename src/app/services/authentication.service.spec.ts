// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { AuthenticationService, User } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { ApiEndpointsService } from './api-endpoints.service';
import { Constants } from '../config/constants';
import { Provider, SpecialtiesRequest, SpecialtiesResponse } from '../shared/classes/credential-data';
import { RouterModule, UrlSerializer } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AppRoutingModule } from '../app-routing.module';


fdescribe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let api: ApiEndpointsService;
  let constants : Constants;
  let user : User;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [User, UrlSerializer, SpecialtiesRequest, SpecialtiesResponse],
      imports: [IonicModule, FormsModule, HttpClientTestingModule, TranslateModule.forRoot(), RouterModule.forRoot([]), AppRoutingModule]
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    constants = TestBed.inject(Constants);
    service = TestBed.inject(AuthenticationService);
    api = TestBed.inject(ApiEndpointsService);
  });

  afterEach(inject([HttpTestingController], (httpTestingController: HttpTestingController) => {
    httpTestingController.verify();
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  

});
