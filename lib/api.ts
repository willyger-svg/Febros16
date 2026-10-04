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
    // Client-side fallback: kama hatutumii HTTP-only cookie, 
    // browser haitupi access ya kuisoma. Tutasoma tu kama sio http-only.
    const match = document.cookie.match(new RegExp('(^| )token=([^;]+)'));
    if (match) {
      token = match[2];
    } else {
      token = localStorage.getItem('token');
    }
  }

  const headers = new Headers(options.headers || {});
  
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const finalOptions: RequestInit = {
    ...options,
    headers,
    // credentials: 'include', // Un-comment hii kama Backend na Frontend zipo domain moja au CORS inaruhusu cookies
  };

  const response = await fetch(`${getApiUrl()}${endpoint}`, finalOptions);

  let data;
  const contentType = response.headers.get("content-type");
  
  try {
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      // Handle non-JSON responses gracefully (e.g. 502 Bad Gateway HTML)
      const text = await response.text();
      data = { message: response.ok ? text : "Tatizo la mtandao: API haikurudisha majibu sahihi (Not JSON)." };
    }
  } catch (error) {
    data = { message: "Tatizo la mtandao: Mfumo umeshindwa kusoma majibu ya API." };
  }

  if (!response.ok) {
    const errorMessage = data?.error?.message || data?.message || 'Kuna tatizo la mtandao, tafadhali jaribu tena.';
    throw new Error(errorMessage);
  }

  return data;
};

export const logout = () => {
  if (typeof window !== 'undefined') {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
};
