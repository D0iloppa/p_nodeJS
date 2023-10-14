"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const d_Conf = {
    // @ Protocol
    "protocol": "http",
    // @ domain
    "domain": "doiloppa.iptime.org",
    // @ http port
    "port": 13939,
    // @ outter port
    "oPort": 80,
    // @ https port (secure)
    "ssl_Port": 443,
    // @ 해당 app의 context path
    "context_root": "p_nodeJS"
};
const router = express_1.default.Router();
router.get(`/`, (req, res) => {
    res.render("index");
});
// catchall
router.get("/*", (req, res) => res.redirect("/"));
const d_Server = (0, express_1.default)();
// EJS 뷰 엔진 설정
d_Server.set("view engine", "ejs");
d_Server.set("views", path_1.default.join(__dirname, "public")); // "public" 디렉토리에 뷰 파일들을 저장
d_Server.use(`/${d_Conf.context_root}`, router);
////////////////////* routing section end */
// listen handler
const handleListen = () => {
    const startTime = new Date();
    const startTimeStr = startTime.toLocaleDateString("ko-kr", {
        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    });
    switch (d_Conf.protocol) {
        case "https":
            break;
        case "http":
            console.log(`
      ##########################################################
        😎 Welcome to DOIL's dev SERVER (by express) 😎
        🐳 Server listening on local port ${d_Conf.port}  at ${startTimeStr}
        site : http://${d_Conf.domain}:${d_Conf.oPort}/${d_Conf.context_root}/
        local : http://127.0.0.1:${d_Conf.port}/${d_Conf.context_root}/
      ##########################################################
      `);
            break; // switch 문에서 'break'를 추가하여 누락된 경우 처리합니다.
        default:
            break;
    }
};
d_Server.listen(d_Conf["port"], "0.0.0.0", handleListen);
