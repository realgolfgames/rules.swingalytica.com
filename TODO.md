# Query Parameters for /rules API

- [x] `limit` (int): Number of rules returned (min: 1, max: 25, default: 25)
- [x] `skip` (int): Number of rules to skip (min: 0, max: 25, default: 0)
- [x] `grouped` (bool): Whether to group rules by groups (default: true)

- [ ] `search` (string): Full-text search in rule titles and text
- [ ] `category` (string): Filter by rule category (e.g., "penalties")
- [ ] `sortBy` (string): Sort field (e.g., "ruleNumber", "priority", "updatedAt")
- [ ] `sortOrder` (string): Sort order ("asc" or "desc", default: "asc")
- [ ] `language` (string): Language filter (e.g., "en", "de") if multilingual

- [ ] `version` (string): Version number or date to query older rule versions
- [ ] `includeExamples` (bool): Include example texts (default: false)
- [ ] `includeReferences` (bool): Include cross-references/links (default: false)
- [x] `id` (number): Get one specific rule from the database
