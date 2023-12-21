import { ActivityIndicator, FlatList } from 'react-native';
import {useEffect} from 'react';
import TrackListItem from '../../components/TrackListItem';
import { gql, useQuery } from '@apollo/client';
import { useIsFocused } from '@react-navigation/native';

const query = gql`
  query getFavorites($userId: String!) {
    favoritesByUserid(userid: $userId) {
      id
      trackid
      userid
      track {
        id
        name
        preview_url
        artists {
          id
          name
        }
        album {
          id
          name
          images {
            url
            width
            height
          }
        }
      }
    }
  }
`;

export default function FavoritesScreen() {
  const isFocused = useIsFocused();
  

  const { data, loading, error,refetch } = useQuery(query, {
    variables: { userId: 'igna' },
  });

  useEffect(() => {
    if (isFocused) {
      refetch(); 
    }
  }, [isFocused, refetch]);

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error) {
    console.log(error);
  }
  console.log(data);
  const tracks = (data?.favoritesByUserid || []).map((fav) => fav.track);

  return (
    <FlatList
      data={tracks}
      renderItem={({ item }) => <TrackListItem track={item} />}
      showsVerticalScrollIndicator={false}
    />
  );
}
