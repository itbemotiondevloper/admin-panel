const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const handle401 = () => {
  if (typeof window !== 'undefined') {
    if (window.location.pathname === '/login' || window.location.pathname === '/admin/login') {
      return;
    }
    if (window.location.pathname.startsWith('/admin')) {
      localStorage.removeItem('admin_token');
      window.location.href = '/admin/login';
    } else {
      localStorage.removeItem('user_token');
      localStorage.removeItem('user_name');
      window.location.href = `/login?required=comment&redirect=${encodeURIComponent(window.location.pathname)}`;
    }
  }
};

export const api = {
  get: async (endpoint: string, token?: string) => {
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'GET',
      headers,
      cache: 'no-store'
    });
    
    if (!res.ok) {
      if (res.status === 401) {
        handle401();
      }
      const error = await res.text();
      throw new Error(error || 'API request failed');
    }
    
    return res.json();
  },

  post: async (endpoint: string, body: any, token?: string) => {
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      if (res.status === 401) {
        handle401();
      }
      const error = await res.text();
      throw new Error(error || 'API request failed');
    }

    return res.json();
  },

  put: async (endpoint: string, body: any, token?: string) => {
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      if (res.status === 401) {
        handle401();
      }
      const error = await res.text();
      throw new Error(error || 'API request failed');
    }

    return res.json();
  },
  
  patch: async (endpoint: string, body: any, token?: string) => {
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      if (res.status === 401) {
        handle401();
      }
      const error = await res.text();
      throw new Error(error || 'API request failed');
    }

    return res.json();
  },
  
  delete: async (endpoint: string, token?: string) => {
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
      headers,
    });

    if (!res.ok) {
      if (res.status === 401) {
        handle401();
      }
      const error = await res.text();
      throw new Error(error || 'API request failed');
    }

    return res.json();
  },

  upload: async (endpoint: string, file: File, token?: string) => {
    const headers: HeadersInit = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!res.ok) {
      if (res.status === 401) {
        handle401();
      }
      const error = await res.text();
      throw new Error(error || 'API request failed');
    }

    return res.json();
  },
};
