import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from './navigation/StackNavigator';

import {Root as PopupRootProvider} from 'react-native-popup-confirm-toast';

const App: React.FC = () => {
	return (
		<PopupRootProvider>
		<NavigationContainer>
			<StackNavigator />
		</NavigationContainer>
		</PopupRootProvider>
	)
}
export default App
