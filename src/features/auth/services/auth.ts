import { api } from '../../../lib/http/client';

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

export const authApi = {
  register: async (data: RegisterData): Promise<AuthResponse> => {
    try {
      const response = await api.post('/auth/register', data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Erreur lors de l\'inscription');
      }
      throw new Error('Erreur de connexion au serveur');
    }
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      console.log('Sending login request:', { email }); // Log pour debug
      
      const response = await api.post('/auth/login', { 
        email, 
        password 
      });
      
      console.log('Login response:', response.data); // Log pour debug
      return response.data;
    } catch (error: any) {
      console.error('Login API error:', error.response || error);
      
      // Gestion plus précise des erreurs
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.response?.status === 400) {
        throw new Error('Email ou mot de passe invalide');
      } else if (error.response?.status === 404) {
        throw new Error('Service non disponible');
      }
      throw new Error('Erreur de connexion au serveur');
    }
  },

  getCurrentUser: async (): Promise<AuthResponse> => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error: any) {
      console.error('Get current user error:', error.response || error);
      throw new Error('Erreur lors de la récupération du profil');
    }
  },

  // Méthode pour vérifier si le token est valide
  verifyToken: async (token: string): Promise<boolean> => {
    try {
      const response = await api.post('/auth/verify-token', { token });
      return response.data.valid;
    } catch (error) {
      return false;
    }
  },

  // Méthode pour la réinitialisation du mot de passe
  forgotPassword: async (email: string): Promise<void> => {
    try {
      await api.post('/auth/forgot-password', { email });
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Erreur lors de la demande de réinitialisation');
      }
      throw new Error('Erreur de connexion au serveur');
    }
  },

  // Méthode pour réinitialiser le mot de passe avec un token
  resetPassword: async (token: string, newPassword: string): Promise<void> => {
    try {
      await api.post('/auth/reset-password', { token, newPassword });
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Erreur lors de la réinitialisation du mot de passe');
      }
      throw new Error('Erreur de connexion au serveur');
    }
  },

  // Méthode pour mettre à jour le profil utilisateur
  updateProfile: async (data: Partial<User>): Promise<User> => {
    try {
      const response = await api.put('/auth/profile', data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Erreur lors de la mise à jour du profil');
      }
      throw new Error('Erreur de connexion au serveur');
    }
  },

  // Méthode pour changer le mot de passe
  changePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
    try {
      await api.post('/auth/change-password', {
        currentPassword,
        newPassword
      });
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Erreur lors du changement de mot de passe');
      }
      throw new Error('Erreur de connexion au serveur');
    }
  }
};

export default authApi;
