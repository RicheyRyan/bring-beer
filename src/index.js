import Firebase from "@app/lib/Firebase";

import "@app/store/index.js";
import App from "@app/App.svelte";

const app = new App({
  target: document.body,
});

export default app;

if (import.meta.hot) {
  import.meta.hot.accept();

  import.meta.hot.dispose(() => {
    app.$destroy();
  });
}
