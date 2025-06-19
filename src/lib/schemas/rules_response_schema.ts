export const rules_response_schema = {
  200: {
    type: 'object',
    properties: {
      data: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            rules: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  title: { type: 'string' },
                  content: { type: 'string' },
                  toc: {
                    type: 'object',
                    properties: {
                      h2: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            id: { type: 'string' },
                            text: { type: 'string' },
                            h3: {
                              type: 'array',
                              items: {
                                type: 'object',
                                properties: {
                                  id: { type: 'string' },
                                  text: { type: 'string' }
                                },
                                required: ['id', 'text']
                              }
                            }
                          },
                          required: ['id', 'text']
                        }
                      }
                    },
                    required: ['h2']
                  }
                },
                required: ['id', 'title', 'content', 'toc']
              }
            }
          },
          required: ['title', 'rules']
        }
      },
      total: { type: 'number' }
    },
    required: ['data', 'total']
  }
} as const;
