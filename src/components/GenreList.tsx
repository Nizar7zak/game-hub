import {
  Button,
  HStack,
  Image,
  List,
  ListItem,
  Spinner,
  Text,
} from "@chakra-ui/react";
import useGenres, { Genre } from "../hooks/useGenres";
import getCroppedImageURL from "../services/imageURL";

interface Props {
  onSelectGenre: (genre: Genre) => void;
}
const GenreList = ({ onSelectGenre }: Props) => {
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
                <Button
                  variant="link"
                  fontSize="lg"
                  onClick={() => onSelectGenre(genre)}
                >
                  {genre.name}
                </Button>
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
