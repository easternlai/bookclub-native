import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import api from "../api/api";
import {navigate} from "../navigationRef";
import setAuthToken from "../components/utils/setAuthToken";

const initialState = {
    isAuthenticated: null,
    user: null,
}

const authReducer = (state, action) => {
    const {type, payload } = action;
    switch(type) {
        case 'user_loaded':
            return {...state, errorMessage:"", isAuthenticated: true, user: payload.user}
        case "add_error":
            return {...state, errorMessage: payload}
        case "signup":
        case "signin":
            return { ...state, errorMessage:"", token: payload.token, user: payload.user}
        case "signout":
            return {token: null, user: {}, errorMessage: "", isAuthenticated: false}
    }
};


const signup = (dispatch) => async ({ name, email, password}) => {
    try {

        
        const tokenResponse = await api.post("/api/users", {name,email, password });
        setAuthToken(api, tokenResponse.data.token);
        const userResponse = await api.get('api/auth');

        const userPayload = {
            token: tokenResponse.data.token,
            user: userResponse.data
        }
        await AsyncStorage.setItem("token", userPayload.token);
        dispatch({ type: "signin", payload: userPayload});
        navigate("Dashboard")
        
    }catch (err) {
        dispatch({
            type: 'add_error',
            payload: "Something went wrong with sign up"
        });
    }
};

const signin = (dispatch) => async ({ email, password }) => {
    try{
    const tokenResponse = await api.post("/api/auth", { email, password });
    setAuthToken(api, tokenResponse.data.token);
    const userResponse = await api.get('api/auth');

    const userPayload = {
        token: tokenResponse.data.token,
        user: userResponse.data
    }

    await AsyncStorage.setItem("token", userPayload.token);
    dispatch({ type: "signin", payload: userPayload});
    navigate("Dashboard");

    }catch (err){
        dispatch({
            type: 'add_error',
            payload: "Something went wrong with sign in"
        });
    }
};

const signout = (dispatch) => async () => {
    await AsyncStorage.removeItem('token');
    dispatch({type: "signout" });
    navigate('loginFlow');

}

export const { Context, Provider } = createDataContext(
    authReducer,
    { signup, signout, signin },
    {token: null, errorMessage: "",     isAuthenticated: null, user: null,}
);