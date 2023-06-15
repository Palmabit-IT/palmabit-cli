import execCommand from "../../../utils/execCommand.js";
import extractFilenameAndExtension from "../../../utils/extractFilenameAndExtension.js";

export default async function downloadBuild(config) {
  const {buildUrl, basePath, filePrefix = ""} = config || {}

  const { filename, extension } = extractFilenameAndExtension(buildUrl);
  const downloadPath = `${basePath}/${filePrefix}${filename}${extension}`;

  await execCommand(`curl --create-dirs -o ${downloadPath} -L ${buildUrl}`);

  if (extension === ".gz") {
    const extractPath = `${basePath}/${filePrefix}${filename.replace('.tar', '')}`
    await execCommand(`mkdir -p ${extractPath}`)
    await execCommand(`tar -xzvf ${downloadPath} -C ${extractPath}`);
    await execCommand(`rm ${downloadPath}`);
  }
}
