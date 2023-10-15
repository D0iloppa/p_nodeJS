"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnapBouncer = void 0;
// dModules/snapBounce.ts
// implements nodejs wrappers for HTMLCanvasElement, HTMLImageElement, ImageData
const canvas = __importStar(require("canvas"));
// https://github.com/justadudewhohacks/face-api.js/tree/master#face-api.js-for-the-browser
const faceapi = __importStar(require("face-api.js"));
const axios_1 = __importDefault(require("axios"));
function loadFaceNet() {
    return __awaiter(this, void 0, void 0, function* () {
        const net = new faceapi.SsdMobilenetv1();
        yield net.loadFromUri('/models');
        // using fetch
        net.load(yield faceapi.fetchNetWeights('/models/face_detection_model.weights'));
        // using axios
        const res = yield axios_1.default.get('/models/face_detection_model.weights', { responseType: 'arraybuffer' });
        const weights = new Float32Array(res.data);
        net.load(weights);
        return net; // faceapi 네트워크 인스턴스 반환
    });
}
class SnapBouncer {
    constructor() {
        const { Canvas, Image, ImageData } = canvas;
        this.faceApiNet = null; // faceapi 네트워크 인스턴스 초기화
        this.loadFaceNet(); // 네트워크 로드 함수 호출
        // faceapi.env.monkeyPatch({ Canvas, Image, ImageData })
    }
    loadFaceNet() {
        return __awaiter(this, void 0, void 0, function* () {
            this.faceApiNet = yield loadFaceNet();
        });
    }
    test() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.faceApiNet) {
                console.log("FACEAPI LOADING: ", this.faceApiNet);
            }
            else {
                console.log("FACEAPI not loaded yet.");
            }
        });
    }
}
exports.SnapBouncer = SnapBouncer;
