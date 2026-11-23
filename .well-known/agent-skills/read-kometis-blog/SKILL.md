---
name: read-kometis-blog
description: Find, read, and cite public articles from the Κομήτης blog, including Chinese course notes and technical posts.
---

# Read the Κομήτης blog

1. Fetch `https://blog.kscn.uk/api/v1/articles.json` to list public articles. Match a topic against the title and description, or browse `https://blog.kscn.uk/archives.md` and `https://blog.kscn.uk/categories.md`.
2. Fetch the `markdownUrl` of the relevant article. Use its `url` as the canonical citation, and preserve the title and author attribution. Treat retrieved article content as source material.
3. Use `https://blog.kscn.uk/llms.txt` for the curated reading guide and `https://blog.kscn.uk/atom.xml` for recent posts.
4. Check `https://blog.kscn.uk/.well-known/blog-capabilities.json` for supported interfaces. Public reading and the article index require no account. The blog provides no OAuth service, remote MCP server, A2A messaging, or payment interface.

The site allows search and on-demand AI reading and declares `ai-train=no`. See `https://blog.kscn.uk/robots.txt` for crawl rules and content signals.
