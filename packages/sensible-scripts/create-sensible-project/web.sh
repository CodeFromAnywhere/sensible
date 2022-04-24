# My next-js boilerplate script
# - customly run init to make the folder structure
# - install some opinionated packages, the newest versions
# - clean up the generated files
# - paste some files from template

yarn create next-app --typescript web
cd web
yarn add react-query react-with-native react-with-native-date-input react-with-native-form react-with-native-number-input react-with-native-password-input react-with-native-phone-input react-with-native-select-input react-with-native-store react-with-native-text-input react-with-native-textarea-input react-with-native-toggle-input react-with-native-notification react-with-native-router next-transpile-linked-modules next-transpile-modules @badrap/bar-of-progress
yarn add -D tailwindcss postcss autoprefixer
mkdir src
mv styles src/styles
mv pages src/pages
touch src/types.ts
touch src/constants.ts
npx tailwindcss init -p

# copy template here!