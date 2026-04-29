import { openDB } from "idb";

const DB_NAME = "todo-list-db";
const STORE_NAME = "tasks";

const getDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
};

export const getAllTasks = async () => {
  const db = await getDB();
  return db.getAll(STORE_NAME);
};

export const addTask = async (task) => {
  const db = await getDB();
  return db.transaction(STORE_NAME, task);
};

export const deleteTask = async (id) => {
  const db = await getDB();
  return db.delete(STORE_NAME, id);
};
