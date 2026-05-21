import { Injectable, signal } from '@angular/core';

export interface Prompt {
  id?: string;
  title: string;
  snippet: string;
  tags: string[];
  createdAt?: string;
}

export interface Collection {
  id: string;
  name: string;
  updatedAt: string;
  prompts: Prompt[];
}

@Injectable({
  providedIn: 'root'
})
export class PromptService {
  collections = signal<Collection[]>([]);
  prompts = signal<Prompt[]>([]);

  private defaultCollections: Collection[] = [
    { 
      id: '1', 
      name: 'UI Components', 
      updatedAt: 'Updated 2h ago',
      prompts: [
        {
          id: 'p1',
          title: 'React Button Component',
          snippet: 'export const Button = ({ children, onClick }) => (\n  <button onClick={onClick} className="btn-primary">\n    {children}\n  </button>\n);',
          tags: ['React', 'UI', 'Component'],
          createdAt: new Date().toISOString()
        },
        {
          id: 'p2',
          title: 'Tailwind Modal Layout',
          snippet: '<div className="fixed inset-0 bg-black/50 flex items-center justify-center">\n  <div className="bg-white rounded-xl p-6 shadow-xl">\n    <h2>Modal Title</h2>\n  </div>\n</div>',
          tags: ['Tailwind', 'CSS', 'Layout'],
          createdAt: new Date().toISOString()
        }
      ]
    },
    { 
      id: '2', 
      name: 'SQL Snippets', 
      updatedAt: 'Updated 1d ago',
      prompts: [
        {
          id: 'p3',
          title: 'Find Duplicate Users',
          snippet: 'SELECT email, COUNT(*)\nFROM users\nGROUP BY email\nHAVING COUNT(*) > 1;',
          tags: ['SQL', 'Postgres', 'Analytics'],
          createdAt: new Date().toISOString()
        }
      ]
    }
  ];

  private defaultPrompts: Prompt[] = [
    {
      id: 'p4',
      title: 'Generate UI Component Scaffold',
      snippet: 'Create a functional React component for a data table. Props should include: columns, data, onSort. Use Tailwind CSS for styling. Ensure it handles empty states gracefully.',
      tags: ['#UI', '#React'],
      createdAt: new Date().toISOString()
    },
    {
      id: 'p5',
      title: 'Refactor Legacy Python Script',
      snippet: 'Review the following Python script. 1. Identify performance bottlenecks. 2. Update to use modern list comprehensions. 3. Add comprehensive type hints and docstrings. [INSERT_CODE_HERE]',
      tags: ['#Refactor', '#Python'],
      createdAt: new Date().toISOString()
    },
    {
      id: 'p6',
      title: 'API Endpoint Documentation',
      snippet: 'Generate Swagger/OpenAPI 3.0 documentation for a POST /users/auth endpoint. Inputs: email, password. Outputs: 200 OK (JWT token), 401 Unauthorized, 429 Too Many Requests.',
      tags: ['#API', '#Docs'],
      createdAt: new Date().toISOString()
    }
  ];

  constructor() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage() {
    try {
      const cachedCols = localStorage.getItem('mustang_collections');
      if (cachedCols) {
        this.collections.set(JSON.parse(cachedCols));
      } else {
        this.collections.set(this.defaultCollections);
        this.syncCollections();
      }

      const cachedPrompts = localStorage.getItem('mustang_prompts');
      if (cachedPrompts) {
        this.prompts.set(JSON.parse(cachedPrompts));
      } else {
        this.prompts.set(this.defaultPrompts);
        this.syncPrompts();
      }
    } catch (e) {
      console.error('Error loading from localStorage', e);
      this.collections.set(this.defaultCollections);
      this.prompts.set(this.defaultPrompts);
    }
  }

  private syncCollections() {
    try {
      localStorage.setItem('mustang_collections', JSON.stringify(this.collections()));
    } catch (e) {
      console.error('Error saving collections to localStorage', e);
    }
  }

  private syncPrompts() {
    try {
      localStorage.setItem('mustang_prompts', JSON.stringify(this.prompts()));
    } catch (e) {
      console.error('Error saving prompts to localStorage', e);
    }
  }

  addCollection(name: string) {
    const newCollection: Collection = {
      id: Date.now().toString(),
      name,
      updatedAt: 'Updated just now',
      prompts: []
    };
    this.collections.update(cols => [newCollection, ...cols]);
    this.syncCollections();
  }

  getCollectionById(id: string): Collection | undefined {
    return this.collections().find(c => c.id === id);
  }

  addPrompt(title: string, snippet: string, tags: string[]) {
    const newPrompt: Prompt = {
      id: Date.now().toString(),
      title,
      snippet,
      tags,
      createdAt: new Date().toISOString()
    };
    this.prompts.update(pts => [newPrompt, ...pts]);
    this.syncPrompts();
  }

  addPromptToCollection(collectionId: string, prompt: Omit<Prompt, 'id' | 'createdAt'>) {
    const newPrompt: Prompt = {
      ...prompt,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    this.collections.update(cols => cols.map(c => {
      if (c.id === collectionId) {
        return {
          ...c,
          updatedAt: 'Updated just now',
          prompts: [newPrompt, ...c.prompts]
        };
      }
      return c;
    }));
    this.syncCollections();
  }
}
