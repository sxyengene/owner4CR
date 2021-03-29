import * as inquirer from "inquirer";
inquirer;
type qsType =
  | "input"
  | "number"
  | "confirm"
  | "list"
  | "rawlist"
  | "expand"
  | "checkbox"
  | "password"
  | "editor";

type choices = {
  name: string;
  value: string;
  checked?: boolean;
};

type question = {
  name: string;
  type: qsType;
  message: string;
  default?: any;
  choices?: choices[];
};
const questions: question[] = [
  {
    message: "是否保留原有OWNERS中的配置？",
    name: "old",
    type: "confirm",
    default: false,
  },
  {
    message: "请选择该项目CR需要的成员",
    name: "member",
    type: "checkbox",
    choices: [
      {
        name: "整组",
        value: "all",
        checked: true,
      },
      {
        name: "个人",
        value: "self",
      },
      {
        name: "商业",
        value: "business",
      },
      {
        name: "企业",
        value: "company",
      },
    ],
  },
];

function qs() {
  return inquirer.prompt(questions);
}
export default qs;
