import Quill from "quill";
import "quill/dist/quill.snow.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("TextEditor", () =>
    import("~/components/TextEditor/TextEditor.vue")
  );
});
