export const objectKeys = <Obj>(obj: Obj): Array<keyof Obj> => {
  return Object.keys(obj) as Array<keyof Obj>;
};
