import { useHomeNavigation } from "@navigation/appNavigation";
import { NAV } from "@navigation/routes";
import { useFeedStore } from "@store/feedStore";

export const useHome = () => {
  const { navigate } = useHomeNavigation();
  const feed = useFeedStore((s) => s.feed);

  const handleCreatePostPress = () => navigate(NAV.HOME_STACK.CREATE_POST);

  return { feed, handleCreatePostPress };
};
