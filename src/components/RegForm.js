import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Text, Button, Input } from 'react-native-elements';
import Spacer from "./Spacer";

const RegForm = ({ headerText, errorMessage, onSubmit, submitButtonText}) => {
    const [name, setName] = useState("");
    const [email, setEmail ] = useState("");
    const [password, setPassword] = useState("");

    return (
        <>
            <Spacer>
                <Text h3>{headerText}</Text>
            </Spacer>

            <Input 
            autoCorrect={false}
            label="Name"
            onChangeText={setName}
            value={name}
            />

            <Spacer />
            <Input
            autoCapitalize="none"
            autoCorrect={false}
            label="Email"
            value={email}
            onChangeText={setEmail}
            />
            <Spacer />

            <Input
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry
            label="Password"
            value={password}
            onChangeText={setPassword} 
            />

            {errorMessage ? (
                <Text style={styles.errorMessage}>{errorMessage}</Text>
            ): null}
            <Spacer>
                <Button title={submitButtonText} onPress={() => onSubmit({name, email, password})} />
            </Spacer>
        </>    
    )
};

const styles = StyleSheet.create({
    errorMessage: {
        fontSize: 15,
        color: 'red',
        marginLeft: 15,
        marginTop: 15
    }
});

export default RegForm;