const DIR_REGEX = /^^(\/[a-zA-Z0-9_-]+)*$$/;

import path from 'path'
export default function isValidDirectoryPath(p) {
	return DIR_REGEX.test(path.resolve(p));
}
