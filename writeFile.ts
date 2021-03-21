import * as fs from "fs";
function WriteOWNER(defaultConfig) {
  let fileData = "";
  for (const [key, value] of Object.entries(defaultConfig)) {
    let tmp;
    if (Object.prototype.toString.call(value) == "[object Array]") {
      tmp = JSON.stringify(value);
    } else {
      tmp = value;
    }

    fileData += `${key}:${tmp}\r\n`;
  }
  console.log(fileData);

  fs.writeFileSync("OWNERS", fileData, { flag: "w" });
}
export default WriteOWNER;
