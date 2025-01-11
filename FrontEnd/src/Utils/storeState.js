import store from "../store/store";
export const getState = state => {
  try {
    const data = store.getState();
    return data[state];
  } catch (error) {
    return undefined;
  }
};

export const isAllowed = permission => {
  const auth = getState("auth");
  const permissions = auth?.permissions || [];
  return permissions.includes(permission);
};
