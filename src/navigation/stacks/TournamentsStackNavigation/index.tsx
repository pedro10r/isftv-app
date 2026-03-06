import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { TournamentsStackParamList } from "@navigation/types";
import { NAV } from "@navigation/routes";
import { Tournaments } from "@screens/Tournaments";
import { CreateTournament } from "@screens/CreateTournament";
import { TournamentDetails } from "@screens/TournamentDetails";

const { Navigator, Screen } =
  createNativeStackNavigator<TournamentsStackParamList>();

export function TournamentsStackNavigation() {
  const { setOptions } = useNavigation();

  return (
    <Navigator
      screenOptions={{ headerShown: false }}
      screenListeners={({ navigation: stackNav }) => ({
        focus: () => {
          setOptions({
            swipeEnabled: stackNav.getState().index === 0,
          });
        },
      })}
    >
      <Screen
        name={NAV.TOURNAMENTS_STACK.TOURNAMENTS}
        component={Tournaments}
      />
      <Screen
        name={NAV.TOURNAMENTS_STACK.CREATE_TOURNAMENT}
        component={CreateTournament}
      />
      <Screen
        name={NAV.TOURNAMENTS_STACK.TOURNAMENT_DETAILS}
        component={TournamentDetails}
      />
    </Navigator>
  );
}
