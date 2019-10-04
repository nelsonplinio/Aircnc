import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Login from "./pages/Login";
import Book from "./pages/Book";
import List from "./pages/List";

const Routes = createAppContainer(
  createSwitchNavigator({
    Login,
    Home: {
      screen: createStackNavigator({
        List: {
          screen: List,
          navigationOptions: {
            header: null
          }
        },
        Book: {
          screen: Book,
          navigationOptions: ({ navigation }) => ({
            headerTitle: `Solicitar em ${navigation.getParam("spot").company}`,
            headerTitleStyle: {
              width: "100%"
            }
          })
        }
      })
    }
  })
);

export default Routes;
