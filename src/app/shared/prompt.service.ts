import { Injectable, signal } from '@angular/core';

export interface Prompt {
  title: string;
  snippet: string;
  tags: string[];
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
  collections = signal<Collection[]>([
    { 
      id: '1', 
      name: 'UI Components', 
      updatedAt: 'Updated 2h ago',
      prompts: [
        {
          title: 'React Button Component',
          snippet: 'export const Button = ({ children, onClick }) => (\n  <button onClick={onClick} className="btn-primary">\n    {children}\n  </button>\n);',
          tags: ['React', 'UI', 'Component']
        },
        {
          title: 'Tailwind Modal Layout',
          snippet: '<div className="fixed inset-0 bg-black/50 flex items-center justify-center">\n  <div className="bg-white rounded-xl p-6 shadow-xl">\n    <h2>Modal Title</h2>\n  </div>\n</div>',
          tags: ['Tailwind', 'CSS', 'Layout']
        }
      ]
    },
    { 
      id: '2', 
      name: 'SQL Snippets', 
      updatedAt: 'Updated 1d ago',
      prompts: [
        {
          title: 'Find Duplicate Users',
          snippet: 'SELECT email, COUNT(*)\nFROM users\nGROUP BY email\nHAVING COUNT(*) > 1;',
          tags: ['SQL', 'Postgres', 'Analytics']
        }
      ]
    }
  ]);

  addCollection(name: string) {
    const newCollection: Collection = {
      id: Date.now().toString(),
      name,
      updatedAt: 'Updated just now',
      prompts: []
    };
    this.collections.update(cols => [newCollection, ...cols]);
  }

  getCollectionById(id: string): Collection | undefined {
    return this.collections().find(c => c.id === id);
  }
}
