import { HStack, Image, List, ListItem, Spinner, Text } from "@chakra-ui/react";
import useGenres from "../hooks/useGenres";
import getCroppedImageURL from "../services/imageURL";

const GenreList = () => {
  const { data, isLoading } = useGenres();
  return (
    <>
      {!isLoading ? (
        <List>
          {data.map((genre) => (
            <ListItem key={genre.id} paddingY="5px">
              <HStack>
                <Image
                  boxSize="32px"
                  borderRadius={8}
                  src={getCroppedImageURL(genre.image_background)}
                />
                <Text fontSize="lg">{genre.name}</Text>
              </HStack>
            </ListItem>
          ))}
        </List>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default GenreList;
