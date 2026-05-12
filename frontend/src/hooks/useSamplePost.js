import { useQuery } from '@tanstack/react-query';
import { fetchPostById } from '../api/posts';

export const useSamplePost = (id = 1) =>
  useQuery({
    queryKey: ['sample-post', id],
    queryFn: () => fetchPostById(id),
  });
