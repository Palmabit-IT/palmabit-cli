export default function extractFilenameAndExtension(url) {
  const filenameWithExtension = url.substring(url.lastIndexOf("/") + 1);

  const lastDotIndex = filenameWithExtension.lastIndexOf(".");
  const filename = filenameWithExtension.substring(0, lastDotIndex);
  const extension = filenameWithExtension.substring(lastDotIndex);

  return { filename, extension };
}