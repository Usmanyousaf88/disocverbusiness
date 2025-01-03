import { StraicoUser, StraicoRagBase, StraicoResponse } from '@/types/straico';

export const getUserInfo = async (token: string): Promise<StraicoResponse<StraicoUser>> => {
  console.log('Fetching user info from Straico');
  const response = await fetch('https://api.straico.com/v0/user', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch user info');
  }
  
  return response.json();
};

export const getUserRags = async (token: string): Promise<StraicoResponse<StraicoRagBase[]>> => {
  console.log('Fetching user RAGs from Straico');
  const response = await fetch('https://api.straico.com/v0/rag/user', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch user RAGs');
  }
  
  return response.json();
};

export const getRagById = async (ragId: string, token: string): Promise<StraicoResponse<StraicoRagBase>> => {
  console.log('Fetching RAG by ID:', ragId);
  const response = await fetch(`https://api.straico.com/v0/rag/${ragId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch RAG');
  }
  
  return response.json();
};