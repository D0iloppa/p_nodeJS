import express, { Router, Request, Response } from 'express';
import path from "path";
import { SnapBouncer } from './dModules/snapBouncer';



interface ServerConfig {
  protocol: string;
  domain: string;
  port: number;
  oPort: number;
  ssl_Port: number;
  context_root: string;
}

const d_Conf:ServerConfig = {
  // @ Protocol
  "protocol" : "http",
  // @ domain
  "domain" : "doiloppa.iptime.org",
  // @ http port
  "port" : 13939,
  // @ outter port
  "oPort" : 80,
  // @ https port (secure)
  "ssl_Port" : 443,
  // @ 해당 app의 context path
  "context_root" : "p_nodeJS"
};

const router: Router = express.Router();

router.get(`/`, (req: Request, res: Response) => {
  res.render("index");
});

// catchall
router.get("/*", (req: Request, res: Response) => 
    res.redirect("/")
);

const snapBouncer = new SnapBouncer(); 

const d_Server = express();
// EJS 뷰 엔진 설정
d_Server.set("view engine", "ejs");
d_Server.set("views", path.join(__dirname, "public")); // "public" 디렉토리에 뷰 파일들을 저장

d_Server.use(`/${d_Conf.context_root}`, router);


snapBouncer.test();


////////////////////* routing section end */

// listen handler
const handleListen = (): void => {

  const startTime = new Date();
  const startTimeStr:string = startTime.toLocaleDateString("ko-kr", {
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



d_Server.listen(d_Conf["port"] , "0.0.0.0", handleListen);
