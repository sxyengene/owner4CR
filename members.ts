import got from "got";

type OwnerList = {
  self?: string[];
  business?: string[];
  company?: string[];
  custAccount?: string[];
  contract?: string[];
  all?: string[];
};
const OwnerList: OwnerList = {};

async function getMembers() {
  let { body } = await got(
    "https://render.alipay.com/p/h5data/owners4cr_ownerlist-h5data.json"
  );
  body = JSON.parse(body);

  Object.keys(body).forEach((value) => {
    OwnerList[value] = body[value].map((x) => x.name);
  });
  OwnerList.all = [
    ...OwnerList.self,
    ...OwnerList.business,
    ...OwnerList.company,
    ...OwnerList.custAccount,
    ...OwnerList.contract,
  ];
  return OwnerList;
}

export default getMembers;
