import { defineStore } from 'pinia';
import faunadb, {
  Documents, Collection,
} from 'faunadb';

const secret = import.meta.env.VITE_FAUNA_DB_KEY;
const client = new faunadb.Client({
  secret,
  domain: 'db.us.fauna.com',
  scheme: 'https',
});
const q = faunadb.query;
const useDocumentsStore = defineStore('documents', {
  state: () => ({
    currentDocument: {},
    documents: [],
  }),
  actions: {
    async getAllDocuments() {
      try {
        const collection = await client.query(
          q.Map(
            q.Paginate(Documents(Collection('documents'))),
            q.Lambda((x) => q.Get(x)),
          ),
        );
        this.documents = [...collection.data];
      } catch (error) {
        console.error(error);
      }
    },
    setCurrentDocument(document) {
      this.currentDocument = document;
    },
  },
});

export default useDocumentsStore;
