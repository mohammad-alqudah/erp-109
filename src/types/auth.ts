export interface LoginResponse {
  data: {
    tokens: {
      refresh: string;
      access: string;
    };
    user: {
      id: string;
      first_name: string;
      last_name: string;
      branches: Array<{
        id: number;
        name: string;
        permissions: Array<{
          admin?: boolean;
          read?: boolean;
          write?: boolean;
          delete?: boolean;
          update?: boolean;
        }>;
      }>;
    };
  };
  status: boolean;
  detail: null | string;
}