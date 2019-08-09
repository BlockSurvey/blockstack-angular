import { Component, OnInit } from '@angular/core';
import * as blockstack from 'blockstack';
import { Router } from '@angular/router';
import { parse } from 'url';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // Blockstack variable
  bs = blockstack;

  // List of images
  gallery = [];

  /**
   * Constructor
   * 
   * @param router 
   */
  constructor(private router: Router) {

    console.log(this.bs.isUserSignedIn() + " - " + this.bs.isSignInPending());

    if (!this.bs.isUserSignedIn() && this.bs.isSignInPending()) {
      this.bs.handlePendingSignIn()
        .then((userData) => {

          if (!userData.username) {
            throw new Error('This app requires a username.')
          }

          console.log(userData);
          this.router.navigate(['']);
          this.loadImages();
        })
    } else if (this.bs && this.bs.isUserSignedIn()) {
      this.loadImages();
    }

  }

  ngOnInit() {
  }

  signIn(event) {
    this.bs.redirectToSignIn();
  }

  signOut(event) {
    this.bs.signUserOut();
  }

  loadImages() {
    this.bs.getFile("gallery.json")
      .then((fileContents) => {
        if (fileContents) {
          this.gallery = JSON.parse(fileContents);
        }
      });
  }

  /**
   * Upload Logo
   */
  uploadImage(files: FileList) {

    if (files) {
      var file = files.item(0);

      if (file) {
        var reader = new FileReader();
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(file);
      }
    }

  }

  /**
   * Call back function for file convertion to base64
   * @param readerEvt 
   */
  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    let imageBase64 = 'data:image/jpg;base64,' + btoa(binaryString);
    this.gallery.unshift(imageBase64);

    // Store on Gaia storage
    this.bs.putFile("gallery.json", JSON.stringify(this.gallery));

  }

  /**
   * Deleting the selected image from gallery
   * 
   * @param index 
   */
  delete(index) {

    // Delete selected image from array
    this.gallery.splice(index, 1);

    // Update on Gaia storage
    this.bs.putFile("gallery.json", JSON.stringify(this.gallery));
  }
}
