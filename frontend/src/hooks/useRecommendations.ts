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

export const useRecommendations = () => {
  return useMutation({
    mutationFn: async (userId: string) => {
      const response = await axios.post<ApiData>(`http://localhost:8000/recommend/${userId}?top_n=5`);
      
      const enrichedData: EnrichedRecommendation[] = response.data.recommendations.map(reco => {
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
