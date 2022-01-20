import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Gallery } from './../models/gallery';

@Component({
  selector: 'app-gallery-details',
  templateUrl: './gallery-details.component.html',
  styleUrls: ['./gallery-details.component.scss'],
})
export class GalleryDetailsComponent implements OnInit {
  gallery: Gallery = {
    _id: '',
    imageUrl: '',
    imageTitle: '',
    imageDesc: '',
    uploaded: null,
  };

  isLoadingResults = true;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  ngOnInit(): void {}
}
