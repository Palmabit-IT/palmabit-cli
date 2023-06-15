import execCommand from "../../../utils/execCommand.js";

const DEFAULT_CONFIG = {
  platform: 'android',
  profile: 'development'
}

export default async function listBuilds(config = DEFAULT_CONFIG) {
  const outputString = await execCommand(
    `npx eas-cli build:list --buildProfile=${config.profile} --platform=${config.platform} --status=finished --json --non-interactive --limit=10`
  );
  return JSON.parse(outputString)
}
