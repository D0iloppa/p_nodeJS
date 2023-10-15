// dModules/snapBounce.ts
// implements nodejs wrappers for HTMLCanvasElement, HTMLImageElement, ImageData
import * as canvas from 'canvas';
// https://github.com/justadudewhohacks/face-api.js/tree/master#face-api.js-for-the-browser
import * as faceapi from 'face-api.js';
import axios from 'axios';

async function loadFaceNet() {
  const net = new faceapi.SsdMobilenetv1();
  await net.loadFromUri('/models');

  // using fetch
  net.load(await faceapi.fetchNetWeights('/models/face_detection_model.weights'));

  // using axios
  const res = await axios.get('/models/face_detection_model.weights', { responseType: 'arraybuffer' });
  const weights = new Float32Array(res.data);
  net.load(weights);

  return net; // faceapi 네트워크 인스턴스 반환
}

export class SnapBouncer {
  faceApiNet: any;

  
  constructor() {
      const { Canvas, Image, ImageData } = canvas;

      this.faceApiNet = null; // faceapi 네트워크 인스턴스 초기화
      this.loadFaceNet(); // 네트워크 로드 함수 호출
      // faceapi.env.monkeyPatch({ Canvas, Image, ImageData })
  }
  

  async loadFaceNet() {
      this.faceApiNet = await loadFaceNet();
  }

  async test() {
      if (this.faceApiNet) {
          console.log("FACEAPI LOADING: ", this.faceApiNet);
      } else {
          console.log("FACEAPI not loaded yet.");
      }
  }
}