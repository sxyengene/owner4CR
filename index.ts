#!/usr/bin/env node
import WriteFile from "./writeFile";
import Line from "./Line";
import qs from "./questions";
import getMembers from "./members";
import * as chalk from "chalk";

const filename = "OWNERS";

const reviewers = [];
const watchers = [];
const defaultConfig = {
  reviewers,
  watchers,
  threshold: 1,
};

async function init() {
  const answers = await qs();
  const memberObject = await getMembers();
  // console.log("memberObject", JSON.stringify(memberObject));

  if (answers.old) {
    await setParamsToDefaultConfigFromOldOwnerFile();
  }
  answers.member = answers.member.length ? answers.member : ["all"];
  answers.member.map(
    (x) =>
      (defaultConfig.reviewers = [
        ...defaultConfig.reviewers,
        ...memberObject[x],
      ])
  );
  console.log("answers", answers);

  // defaultConfig.reviewers = defaultConfig.reviewers.concat(
  //   memberObject[answers.member]
  // );
  defaultConfig.reviewers = Array.from(new Set(defaultConfig.reviewers));

  if (answers.threshold) {
    defaultConfig.threshold = answers.threshold;
  }
  WriteFile(defaultConfig);
  console.log(chalk.yellow(`OWNERS写入成功！`));
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
