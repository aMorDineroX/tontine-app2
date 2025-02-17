export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
  }
  
  export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    success: boolean;
    data?: {
      user: {
        id: string;
        name: string;
        email: string;
        createdAt: Date;
      };
      token: string;
    };
    message?: string;
    errors?: Array<{
      field: string;
      message: string;
    }>;
  }
  