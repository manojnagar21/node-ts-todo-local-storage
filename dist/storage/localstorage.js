import { LocalStorage } from "node-localstorage";
// Create storage folder
export const localstorage = new LocalStorage("./storage");
// Initialize default todo if not exists
if (!localstorage.getItem("todos")) {
    localstorage.setItem("todos", JSON.stringify([]));
}
//# sourceMappingURL=localstorage.js.map