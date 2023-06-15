# Palmabit Expo CLI

The CLI allows to manage expo projects.

## Commands

### Download development build

Allows you to rapidly download the development build for the device you prefer.

You will be asked the device which you want to download the development build for and the path where to download the build

N.B. The CLI will search on expo servers for builds having profile: `development` in case of android device/emulator or ios physical device develpment builds and it will search for profile: `development-simulator` in case of ios simulator develpment builds.
**Make sure to respect this naming for your eas development build profiles otherwise the command won't work.**

## Author

Palmabit
