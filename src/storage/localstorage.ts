import { LocalStorage } from "node-localstorage";
// Create storage folder
export const localStorage = new LocalStorage("./storage");
// Initialize default todo if not exists
if(!localStorage.getItem("todos")) {
    localStorage.setItem("todos", JSON.stringify([]));
}