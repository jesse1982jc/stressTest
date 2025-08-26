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
  // // ✅ 這裡包成 {"user": {...}}，並轉成 JSON
  // const payload = JSON.stringify({
  //   user: { email: "jcjchuhu2@gmail.com", password: "abcd1234" },
  // });

  // // ✅ 設定 headers，告訴伺服器這是 JSON
  // const params = {
  //   Headers: {
  //     "content-type": "application/json",
  //   },
  // };

  const res = http.post("https://api.hiskio.com/v2/auth/login", {
    account: "jcjchuhu",
    password: "nmbooks4801",
    confirm: true,
  });

  // console.log("Response:", res.status, res.body);

  check(res, {
    "status is 200": (r) => r.status === 200,
  });

  sleep(4); // 每個虛擬使用者等 1 秒再下一次請求
}
