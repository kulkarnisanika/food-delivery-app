import './App.css'
import {Provider } from "react-redux";
import appStore from "./utils/redux/appStore";
import FoodAppHome from './components/FoodAppHome'

function App() {

  /*
   
  - App 
    - MainContainer
      -Header
      -RestaurantCard List
        - RestroCard

   */

  return (
    <Provider store={appStore}>
       <FoodAppHome/>
    </Provider>
  )
}

export default App
