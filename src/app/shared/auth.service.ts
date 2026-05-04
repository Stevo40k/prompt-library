import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = signal<boolean>(false);
  currentUserEmail = signal<string | null>(null);

  constructor() {}

  async login(email: string, password: string):Promise<boolean> {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Accept any validly formatted non-empty email for testing purposes
    if (email && password) {
      this.isAuthenticated.set(true);
      this.currentUserEmail.set(email);
      return true;
    }
    
    throw new Error('Invalid email or password');
  }

  logout() {
    this.isAuthenticated.set(false);
    this.currentUserEmail.set(null);
  }
}
