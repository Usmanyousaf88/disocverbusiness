interface StraicoResponse {
  success: boolean;
  data?: {
    _id: string;
    user_id: string;
    name: string;
    rag_url: string;
    original_filename: string;
    chunking_method: string;
    chunk_size: number;
    chunk_overlap: number;
    createdAt: string;
    updatedAt: string;
  };
  response?: {
    answer: string;
    references: Array<{
      page_content: string;
      page: number;
    }>;
    file_name: string;
    coins_used: number;
  };
  message?: string;
}

export const getRagById = async (ragId: string, token: string): Promise<StraicoResponse> => {
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

export const deleteRag = async (ragId: string, token: string): Promise<StraicoResponse> => {
  console.log('Deleting RAG:', ragId);
  const response = await fetch(`https://api.straico.com/v0/rag/${ragId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete RAG');
  }
  
  return response.json();
};

export const submitRagPrompt = async (
  ragId: string, 
  token: string,
  prompt: string,
  model: string = 'anthropic/claude-3.5-sonnet',
  options?: {
    search_type?: 'similarity' | 'mmr' | 'similarity_score_threshold';
    k?: number;
    fetch_k?: number;
    lambda_mult?: number;
    score_threshold?: number;
  }
): Promise<StraicoResponse> => {
  console.log('Submitting RAG prompt:', { ragId, prompt, model, options });
  
  const formData = new FormData();
  formData.append('prompt', prompt);
  formData.append('model', model);
  
  if (options) {
    Object.entries(options).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value.toString());
      }
    });
  }
  
  const response = await fetch(`https://api.straico.com/v0/rag/${ragId}/prompt`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });
  
  if (!response.ok) {
    throw new Error('Failed to submit RAG prompt');
  }
  
  return response.json();
};