import { openDB } from 'idb';

const initdb = async () =>
  openDB('text', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('text database already exists');
        return;
      }
      db.createObjectStore('text', { keyPath: 'id', autoIncrement: true });
      console.log('text database created');
    },
  });

// export const putDb = async (content) => console.error('putDb not implemented');
// Export a function PUT to the database.
export const putDb = async (content)  => {
  console.log('PUT request to the database');
  // Create a connection to the database database and version we want to use.
  const textDb = await openDB('text', 1);
  // Create a new transaction and specify the database and data privileges.
  const tx = textDb.transaction('text', 'readwrite');
  // Open up the desired object store.
  const store = tx.objectStore('text');
  // Use the .add() method on the store and pass in the content.
  const request = store.put({ id: id, content: content });
  // Get confirmation of the request.
  const result = await request;
  console.log('🚀 - Content saved to the database', result);
};
;

// Export a function we will use to GET to the database.
export const getDb = async () => {
  console.log('GET from the database');
  // Create a connection to the database database and version we want to use.
  const textDb = await openDB('text', 1);
  // Create a new transaction and specify the database and data privileges.
  const tx = textDb.transaction('text', 'readonly');
  // Open up the desired object store.
  const store = tx.objectStore('text');
  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();
  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
