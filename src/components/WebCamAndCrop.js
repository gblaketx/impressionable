import ReactDOM from "react-dom";
import React, { PureComponent } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Webcam from "react-webcam";
import Popup from "reactjs-popup";

// import "./App.css";

import firebase from 'firebase';

export default class WebCamAndCrop extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      webcamEnabled: false,
      croppedBlob: null,
    };
    this.storageRef = null;

    var config = {
      apiKey: 'AIzaSyDQa22Mo0GWowVAgRyuVuxhv-op07n0u8k',
      authDomain: 'impressions-ef38e.firebaseapp.com',
      databaseURL: 'https://impressions-ef38e.firebaseio.com',
      storageBucket: 'gs://impressions-ef38e.appspot.com/'
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
  
    // Get a reference to the storage service, which is used to create references in your storage bucket
    var storage = firebase.storage();
    this.storageRef = storage.ref();
  }

  enableWebcam = () => this.setState({ webcamEnabled: !this.state.webcamEnabled });


  setRef = webcam => {
    this.webcam = webcam;
  };
 
  capture = () => {
    // const imageSrc = this.webcam.getScreenshot();
    // this.imageRef = imageSrc;
    const screenshot = this.webcam.getScreenshot();
    this.setState({ screenshot });
    // this.state.src = imageSrc;
  };


  state = {
    src: null,
    crop: {
      width: 200,
      x: 0,
      y: 0
    }
  };

  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  onImageLoaded = (image, crop) => {
    this.imageRef = image;
  };

  onCropComplete = crop => {
    this.makeClientCrop(crop);
    
  };

  onCropChange = crop => {
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;

        this.setState({
          croppedBlob: blob,
        }, () => {
          var imagesRef = this.storageRef.child('images/' + fileName);
          imagesRef.put(this.state.croppedBlob).then(function(snapshot) {
            console.log('Uploaded a blob or file!');

            fetch('https://firebasestorage.googleapis.com/v0/b/impressions-ef38e.appspot.com/o/images%2FnewFile.jpeg')
              .then(function(response) {
                return response.json();
              })
              .then(function(myJson) {
                var insertedImageUrl = myJson['downloadTokens'];
                console.log(JSON.stringify(insertedImageUrl));
                localStorage.setItem('insertedImageUrl', insertedImageUrl);
              });
          });
        }); // use the Blob or File API

        window.URL.revokeObjectURL(this.fileUrl); //overwrite the file
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, "image/jpeg");
    });
  }

  render() {
    const { crop, croppedImageUrl, src } = this.state;

    return (
      // <Popup trigger={<button>Take screenshot</button>} position="right center">
        <div className="App">
          <div>
            {this.state.webcamEnabled ? (
            <Webcam
              audio={false}
              height={600}
              ref={this.setRef}
              screenshotFormat="image/jpeg"
              width={900}
              /> ) : null
          } 
          </div>

          <button type="button" onClick={this.enableWebcam}>
            Enable webcam
          </button>
            

          <div>
            <h2>Screenshots</h2>
            <div className='screenshots'>
              <div className='controls'>
                <button onClick={this.capture}>capture</button>
              </div>
               <ReactCrop
                src={this.state.screenshot}
                crop={crop}
                onImageLoaded={this.onImageLoaded}
                onComplete={this.onCropComplete}
                onChange={this.onCropChange}
              />
            </div>
          </div>
          <div>
          {croppedImageUrl && (
            <img alt="Crop" style={{ maxWidth: "100%" }} src={croppedImageUrl} />
          )}
        </div>
        </div>
      // </Popup>

    );
  }
}

// ReactDOM.render(<App />, document.getElementById("root"));
