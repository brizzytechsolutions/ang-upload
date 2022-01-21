import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MyErrorStateMatcher } from './myErrorStateMatcher';
import { Gallery } from '../models/gallery';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  files: Gallery[] = [];
  galleryForm: FormGroup;
  imageFile: File = null;
  imageTitle = '';
  imageDesc = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllFiles();
    this.galleryForm = this.formBuilder.group({
      imageFile : [null, Validators.required],
      imageTitle : [null, Validators.required],
      imageDesc : [null, Validators.required]
    });
  }

  getAllFiles() {
    this.api.getGallery().subscribe((data: any) => {
      this.files = data;
      console.log('fokol images',data);
    });
  }

  onFormSubmit(): void {
    this.api.addGallery(this.galleryForm.value, this.galleryForm.get('imageFile').value)
      .subscribe((res: any) => {
        if (res.body) {
          this.router.navigate(['/gallery-details', res.body._id]);
        }
      }, (err: any) => {
        console.log(err);
      });
  }

}
