My next-js boilerplate script

PROJECT_NAME=plug-cms-web
yarn create next-app --typescript $PROJECT_NAME
cd $PROJECT_NAME
yarn add react-query react-with-native react-with-native-date-input react-with-native-form react-with-native-number-input react-with-native-password-input react-with-native-phone-input react-with-native-select-input react-with-native-store react-with-native-text-input react-with-native-textarea-input react-with-native-toggle-input react-with-native-notification react-with-native-router next-transpile-linked-modules next-transpile-modules @badrap/bar-of-progress
yarn add -D tailwindcss postcss autoprefixer
mkdir src
mv styles src/styles
mv pages src/pages
touch src/types.ts
touch src/constants.ts
touch src/store.ts

npx tailwindcss init -p
set the content of src/styles/globals.css to

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

set content of file tailwind.config.js to:

```
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

in \_app.tsx, add this:

```
import ProgressBar from '@badrap/bar-of-progress';
import Router from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { StoreProvider } from '../store';

const progress = new ProgressBar();

//Binding events.
Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      structuralSharing: false,
    },
  },
});
```

Wrappers around your app:

```
<QueryClientProvider client={queryClient}>
<StoreProvider>
<Component {...pageProps} />
</StoreProvider>
</QueryClientProvider>
```

Put this in `src/store.ts`:

```
import { createStoreProvider, createUseStore } from 'react-with-native-store';

type StoreType = {
  key1: YourType | null;
  key2: string | null;
};

export const initialValues: StoreType = {
  key1: null,
  key2: null,
};

export const StoreProvider = createStoreProvider({ initialValues });
export const useStore = createUseStore(initialValues);
export default useStore;
```
