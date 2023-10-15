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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnapBouncer = void 0;
// dModules/snapBounce.ts
// import nodejs bindings to native tensorflow,
// not required, but will speed up things drastically (python required)
require("@tensorflow/tfjs-node");
// implements nodejs wrappers for HTMLCanvasElement, HTMLImageElement, ImageData
const canvas = __importStar(require("canvas"));
const faceapi = __importStar(require("face-api.js"));
// patch nodejs environment, we need to provide an implementation of
// HTMLCanvasElement and HTMLImageElement
const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });
class SnapBouncer {
    constructor() {
    }
    test() {
        // 클래스 내에서 모듈의 함수를 정의합니다.
        console.log('snapBounce 모듈에서 실행 중');
    }
}
exports.SnapBouncer = SnapBouncer;
