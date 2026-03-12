import http from "k6/http";
import { check } from "k6";

export const options = {
  vus: 100,
  duration: "30s",
};

const BASE_URL = "http://localhost:3000";
const ENDPOINT = __ENV.ENDPOINT || "/products";

export default function () {
  const res = http.get(`${BASE_URL}${ENDPOINT}`);

  check(res, {
    "status is 200": (r) => r.status === 200,
  });
}
