import React, { useContext} from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from "../context/authContext";


const DashboardScreen = () => {
    const { state, signout } = useContext(AuthContext);
    return <SafeAreaView forceInset={{ top: 'always'}}>
        <Text style={{fontSize:48}}>DashBoard</Text>
        <Text sytle={{fontSize:32}}>Welcome {state.user.name}</Text>
        
        
        <Spacer>
            <Button title="Sign Out" onPress={signout} />
        </Spacer>
    </SafeAreaView>
};

const styles = StyleSheet.create({});

export default DashboardScreen;