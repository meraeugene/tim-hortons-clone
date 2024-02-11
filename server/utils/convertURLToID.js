export const convertURLToID = (url) => {
  const parts = url.split("/");
  const fileName = parts.pop();
  const imageId = fileName.split(".")[0];
  return imageId;
};
