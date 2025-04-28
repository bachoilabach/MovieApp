import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HeaderButton, Text } from "@react-navigation/elements";
import {
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image } from "react-native";
import bell from "../assets/bell.png";
import { Home } from "./screens/Home";
import { Profile } from "./screens/Profile";
import { Settings } from "./screens/Settings";
import { Updates } from "./screens/Updates";
import { NotFound } from "./screens/NotFound";
import { HomeIcon, PaginationIcon, SettingIcon, SwipIcon } from "../assets/svgIcons";
import MovieDetail from "./screens/MovieDetail";
import { Pagination } from "./screens/Pagination";
import EditMovieModal from "@/modals/EditMovieModal";
import Login from "./screens/Login";
import SwiperScreen from "./screens/Swiper";
import SurveyForm from "@/modals/SurveyForm";

const HomeTabs = createBottomTabNavigator({
  screens: {
    Home: {
      screen: Home,
      options: {
        title: "Home",
        tabBarIcon: ({ color }) => <HomeIcon color={color} />,
      },
    },
    Updates: {
      screen: Updates,
      options: {
        tabBarIcon: ({ color, size }) => (
          <Image
            source={bell}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
    // Pagination: {
    //   screen: Pagination,
    //   options: {
    //     title: "Pagination",
    //     tabBarIcon: ({ color }) => <PaginationIcon color={color} />,
    //   },
    // },
    Setting: {
      screen: Settings,
      options: {
        title: "Profile",
        tabBarIcon: ({ color }) => <SettingIcon color={color} />,
      },
    },
    Swiper: {
      screen: SwiperScreen,
      options: {
        title: "Swiper",
        tabBarIcon: ({ color }) => <SwipIcon color={color} />,
      },
    },
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    HomeTabs: {
      screen: HomeTabs,
      options: {
        title: "Home",
        headerShown: false,
      },
    },
    Profile: {
      screen: Profile,
      linking: {
        path: ":user(@[a-zA-Z0-9-_]+)",
        parse: {
          user: (value) => value.replace(/^@/, ""),
        },
        stringify: {
          user: (value) => `@${value}`,
        },
      },
    },
    Settings: {
      screen: Settings,
      options: ({ navigation }) => ({
        presentation: "modal",
        headerRight: () => (
          <HeaderButton onPress={navigation.goBack}>
            <Text>Close</Text>
          </HeaderButton>
        ),
      }),
    },
    NotFound: {
      screen: NotFound,
      options: {
        title: "404",
      },
      linking: {
        path: "*",
      },
    },
    MovieDetail: {
      screen: MovieDetail,
      options: {
        headerShown: true,
      },
      linking: {
        path: "movie/:id",
        parse: {
          id: (id) => Number(id),
        },
        stringify: {
          id: (id: number) => `${id}`,
        },
      },
    },
    EditMovieModal: {
      screen: EditMovieModal,
      options: ({ navigation }) => ({
        presentation: "modal",
        headerRight: () => (
          <HeaderButton onPress={navigation.goBack}>
            <Text>Close</Text>
          </HeaderButton>
        ),
      }),
    },
    Login: {
      screen: Login,
      options: ({ navigation }) => ({
        presentation: "modal",
        headerRight: () => (
          <HeaderButton onPress={navigation.goBack}>
            <Text>Close</Text>
          </HeaderButton>
        ),
      }),
    },
    Swiper: {
      screen: SwiperScreen,
      options: {
        headerShown: true,
      },
    },
    SurveyForm: {
      screen: SurveyForm,
      options: ({ navigation }) => ({
        headerShown: true,
        title: "Survey Form",
        presentation: "modal",
        headerRight: () => (
          <HeaderButton onPress={navigation.goBack}>
            <Text>Close</Text>
          </HeaderButton>
        ),
      }),
    }
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
