import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  stages: [
    { duration: "30s", target: 50 }, // 先漸增到 50
    { duration: "30s", target: 200 }, // 再增加到 200
    { duration: "30s", target: 500 }, // 最後增加到 1000
  ],
  // vus: 10, // 模擬 10 個使用者同時上線
  // duration: "30s", // 測試持續 30 秒
};

export default function () {
  const res = http.get("https://conduit.bondaracademy.com/"); // 寫你要測的 URL
  check(res, {
    "status is 200": (r) => r.status === 200,
  });
  sleep(1); // 每個虛擬使用者等 1 秒再下一次請求
}
