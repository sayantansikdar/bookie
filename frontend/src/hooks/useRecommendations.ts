import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { getBookDetails, BookDetails } from '../utils/mockBookData';

interface RecoResponse {
  book_id: number;
  predicted_rating: number;
}

interface ApiData {
  user_id: number;
  recommendations: RecoResponse[];
}

export interface EnrichedRecommendation extends BookDetails {
  predictedRating: number;
}

// Static builds (GitHub Pages) have no API server: they read SVD predictions
// that the Pages workflow trained and exported (scripts/export_static_recommendations.py).
export const STATIC_MODE = process.env.REACT_APP_STATIC === '1';

export interface StaticMeta {
  model: string;
  rmse: number;
  mae: number;
  n_ratings: number;
  n_users: number;
  n_books: number;
  trained_at: string;
}

interface StaticData {
  meta: StaticMeta;
  fallback: [number, number][];
  users: Record<string, [number, number][]>;
}

let staticData: Promise<StaticData> | null = null;
export const loadStaticData = () => {
  if (!staticData) {
    staticData = fetch(`${process.env.PUBLIC_URL}/recommendations.json`).then(res => {
      if (!res.ok) throw new Error(`recommendations.json: ${res.status}`);
      return res.json();
    });
  }
  return staticData;
};

const fetchRecommendations = async (userId: string): Promise<ApiData> => {
  if (STATIC_MODE) {
    const data = await loadStaticData();
    const id = parseInt(userId, 10);
    const rows = data.users[String(id)] ?? data.fallback; // unknown reader -> cold-start picks
    return {
      user_id: id,
      recommendations: rows.map(([book_id, predicted_rating]) => ({ book_id, predicted_rating })),
    };
  }
  const response = await axios.post<ApiData>(`http://localhost:8000/recommend/${userId}?top_n=5`);
  return response.data;
};

export const useRecommendations = () => {
  return useMutation({
    mutationFn: async (userId: string) => {
      const data = await fetchRecommendations(userId);

      const enrichedData: EnrichedRecommendation[] = data.recommendations.map(reco => {
        const details = getBookDetails(reco.book_id);
        return {
          ...details,
          predictedRating: reco.predicted_rating
        };
      });
      
      return enrichedData;
    }
  });
};
