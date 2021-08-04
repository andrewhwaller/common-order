import { defineStore } from 'pinia';

const useDocumentsStore = defineStore('documents', {
  state: () => ({
    searchTerm: '',
    currentDocument: null,
    documents: [],
  }),
  actions: {
    async getAllDocuments() {
      try {
        const resp = await fetch('/api/documents');
        const data = await resp.json();
        this.documents = [...data];
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
