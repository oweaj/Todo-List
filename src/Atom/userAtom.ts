import { atom } from "recoil";

interface userInfo {
  email: string | null;
  uid: string | null;
}

export const user = atom<userInfo>({
  key: "user",
  default: { email: null, uid: null },
});

export const checkPW = atom<boolean>({
  key: "checkPW",
  default: false,
});
