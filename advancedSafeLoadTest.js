import http from "k6/http";
import { sleep, check, group } from "k6";

export const options = {
  stages: [
    { duration: "10s", target: 1 }, // 開始 1 個虛擬使用者
    { duration: "20s", target: 5 }, // 漸增到 5 VUs
    { duration: "30s", target: 10 }, // 漸增到 10 VUs
    { duration: "10s", target: 0 }, // 漸減回 0
  ],
};

// 模擬不同使用者行為
export default function () {
  group("首頁操作", function () {
    const res = http.get("http://192.168.0.153:9080/");
    check(res, { "home status 200": (r) => r.status === 200 });
    sleep(Math.random() * 2 + 1); // 隨機停 1~3 秒
  });

  group("登入操作", function () {
    const res = http.post("http://192.168.0.157:9986/api/user/login", {
      email: "ceq19336@romog.com",
      password: "abcd1234",
    });
    check(res, { "login status 200": (r) => r.status === 200 });
    sleep(Math.random() * 2 + 1);
  });

  group("查詢資料操作", function () {
    const res = http.get(
      "http://192.168.0.157:9986/api/course/getlist?keyword&tag&status=1&type=0"
    );
    check(res, { "data status 200": (r) => r.status === 200 });
    sleep(Math.random() * 2 + 1);
  });
}
