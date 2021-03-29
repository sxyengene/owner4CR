#!/usr/bin/env node
import WriteFile from "./writeFile";
import Line from "./Line";
import qs from "./questions";
import getMembers from "./members";

const filename = "OWNERS";

const reviewers = [];
const watchers = [];
const defaultConfig = {
  reviewers,
  watchers,
  threshold: 3,
};

async function init() {
  const answers = await qs();
  const memberObject = await getMembers();
  console.log("answers", answers);

  if (answers.old) {
    await setParamsToDefaultConfigFromOldOwnerFile();
  }
  if (answers.member) {
    answers.member.map(
      (x) =>
        (defaultConfig.reviewers = [
          ...defaultConfig.reviewers,
          ...memberObject[x],
        ])
    );

    // defaultConfig.reviewers = defaultConfig.reviewers.concat(
    //   memberObject[answers.member]
    // );
    defaultConfig.reviewers = Array.from(new Set(defaultConfig.reviewers));
    WriteFile(defaultConfig);
  }
}

init();

async function setParamsToDefaultConfigFromOldOwnerFile() {
  // 读取现有文件中的每一行
  const lineArr = await Line(filename);
  // 过滤注释
  const effectLines = lineArr.filter((x) => !/^#/.test(x));
  // 解析出 reviewers,watchers,threshold等字段
  effectLines.map((x) => parseStr(x));
}

function parseStr(str) {
  const arr = str.split(":");
  if (arr.length == 2) {
    switch (arr[0]) {
      case "reviewers":
        defaultConfig.reviewers = JSON.parse(arr[1]);
        break;
      case "watchers":
        defaultConfig.watchers = JSON.parse(arr[1]);
        break;
      case "threshold":
        defaultConfig.threshold = +arr[1];
        break;
      default:
        break;
    }
    return true;
  }
  return false;
}
