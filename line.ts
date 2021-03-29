import * as readline from "readline";
import * as fs from "fs";
async function Line(filename) {
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream(filename),
      crlfDelay: Infinity,
    });
    // 注意：我们使用 crlfDelay 选项将 input.txt 中的所有 CR LF 实例（'\r\n'）识别为单个换行符。

    const arr = [];
    for await (const line of rl) {
      // input.txt 中的每一行在这里将会被连续地用作 `line`。
      arr.push(line);
    }
    return arr;
  } catch (e) {
    throw Error(e);
  }
}
export default Line;
