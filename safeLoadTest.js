import http from "k6/http";
import { sleep, check } from "k6";

// 安全的負載設置
export const options = {
  stages: [
    { duration: "10s", target: 1 }, // 開始 1 個虛擬使用者
    { duration: "20s", target: 5 }, // 漸增到 5 VUs
    { duration: "30s", target: 10 }, // 漸增到 10 VUs
    { duration: "10s", target: 0 }, // 慢慢降回 0 VUs
  ],
};

export default function () {
  const res = http.post("http://192.168.0.157:9986/api/user/login", {
    email: "ceq19336@romog.com",
    password: "abcd1234",
  }); // 寫你要測的 URL
  check(res, {
    "status is 200": (r) => r.status === 200,
  });
  sleep(4); // 每個虛擬使用者等 1 秒再下一次請求
}
