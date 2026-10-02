export const getApiUrl = () => {
  return process.env.NEXT_PUBLIC_API_URL || 'https://febros16-backend.onrender.com';
};

/**
 * fetchApi ni wrapper inayoshughulikia kuweka JWT Token kwenye headers 
 * kwa kila request inayoenda kwenye backend.
 */
export const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
  let token = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }

  const headers = new Headers(options.headers || {});
  
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${getApiUrl()}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    // Endapo API itarudisha kosa kwa format mpya tuliyotengeneza backend
    const errorMessage = data.error?.message || data.message || 'Kuna tatizo la mtandao, tafadhali jaribu tena.';
    throw new Error(errorMessage);
  }

  return data;
};

export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
};
