import fs from 'fs';

export default function saveAttributesToPackageJson({ path = '.', attributes = {} }) {
  const packageJson = JSON.parse(fs.readFileSync(`${path}/package.json`, 'utf-8'));
  const { name, description, author, license, ...others } = attributes;

  // Modifica le proprietà se sono state specificate
  if (name) {
    packageJson.name = name;
  }
  if (description) {
    packageJson.description = description;
  }
  if (author) {
    packageJson.author = author;
  }
  if (license) {
    packageJson.license = license;
  }

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

  // Scrivi le modifiche nel file package.json
  fs.writeFileSync(`${path}/package.json`, JSON.stringify(packageJson, null, 2));
}
