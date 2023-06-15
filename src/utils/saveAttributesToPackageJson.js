import fs from 'fs';

export default function saveAttributesToPackageJson({ path = '.', name, description, author, license }) {
  const packageJson = JSON.parse(fs.readFileSync(`${path}/package.json`, 'utf-8'));

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

  // Scrivi le modifiche nel file package.json
  fs.writeFileSync(`${path}/package.json`, JSON.stringify(packageJson, null, 2));
}
