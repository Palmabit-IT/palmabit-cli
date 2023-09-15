import fs from 'fs';

export default function saveAttributesToPackageJson({ path = '.', attributes = {} }) {
  const packageJson = JSON.parse(fs.readFileSync(`${path}/package.json`, 'utf-8'));
  const { name, description, author, license, ...others } = attributes;

  // Modify the properties
  if (name) {
    packageJson.name = name;
  }
  if (description) {
    packageJson.description = description;
  }
  if (author) {
    packageJson.author = author;
  }

  // Remove license attribute
  packageJson.license = undefined;


  packageJson.version = '0.1.0';
  delete packageJson.repository;

  for (const key in others) {
    if (others.hasOwnProperty(key)) {
      if (typeof others[key] === 'object') {
        packageJson[key] = JSON.parse(JSON.stringify(others[key]));
      } else {
        packageJson[key] = others[key];
      }
    }
  }

  // Write modifications to package.json
  fs.writeFileSync(`${path}/package.json`, JSON.stringify(packageJson, null, 2));
}
