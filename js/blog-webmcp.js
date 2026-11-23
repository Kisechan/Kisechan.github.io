'use strict';

(() => {
  const modelContext = document.modelContext?.registerTool ? document.modelContext : navigator.modelContext;
  if (typeof modelContext?.registerTool !== 'function') return;

  const normalize = text => text.normalize('NFKC').toLowerCase();
  const indexUrl = new URL('../api/v1/articles.json', document.currentScript.src);

  modelContext.registerTool({
    name: 'search_blog_articles',
    description: 'Search public Κομήτης blog articles by title and description. Returns canonical URLs and Markdown reading links.',
    inputSchema: {
      type: 'object', properties: { query: { type: 'string', minLength: 1, maxLength: 200 } },
      required: ['query'], additionalProperties: false
    },
    annotations: { readOnlyHint: true, untrustedContentHint: true },
    async execute({ query }) {
      if (typeof query !== 'string' || !query.trim() || query.length > 200) {
        throw new Error('Provide a search query between 1 and 200 characters.');
      }
      const words = normalize(query).trim().split(/\s+/u);
      const response = await fetch(indexUrl);
      if (!response.ok) throw new Error('The public article index is unavailable.');
      const { articles } = await response.json();
      const matches = articles.filter(article => {
        const text = normalize(`${article.title} ${article.description}`);
        return words.every(word => text.includes(word));
      }).slice(0, 10);
      return { content: [{ type: 'text', text: JSON.stringify({ articles: matches }) }] };
    }
  });
})();
