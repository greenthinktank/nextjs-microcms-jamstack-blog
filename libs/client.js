// microCMSを使うための設定ファイル
import { createClient } from "microcms-js-sdk";
// サーバードメインとAPIkeyを設定
export const client = createClient({
  serviceDomain: "blog-jam-nextjs",
  // セキュリティーのために.envから呼び出す
  apiKey: process.env.API_KEY,
});


// 参考動画：https://youtu.be/dNpONz4Yi04