import React, { useContext } from 'react';
import { View, StyleSheet, Text, FlatList} from 'react-native';
import { Button, ListItem, Image } from 'react-native-elements';
import Spacer from '../components/Spacer';
import {Context as BookContext} from '../context/BookContext';
import {Context as AuthContext} from '../context/authContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationEvents } from 'react-navigation';

const BooksScreen = ({navigation}) => {

    const {state: bookState, getBooks, addLike, removeLike, deleteBook} = useContext(BookContext);
    const {state: authState, signout} = useContext(AuthContext);

    return (
        <>
        <NavigationEvents onWillFocus={getBooks} />
        <FlatList
            data={bookState.books}
            keyExtractor={item => item._id}
            renderItem={({item })=> {
                return (
                    <>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('Book', {_id: item._id})
                        }
                    >
                        <Text>{item.title} by {item.author}</Text>
                        <Text>Recommended by {item.name}</Text>
                        <Image
                            style={{width: 50, height: 50}}
                            source={{url: item.image}}
                        />
                        <Spacer />
                        <Spacer />
                        <Spacer />
                    </TouchableOpacity>
                    <Button onPress={() => addLike(item._id)} 
                    title={item.likes.length > 0 ? item.likes.length: "like"}>
                    </Button>
                    <Button onPress={() => removeLike(item._id)} 
                    title="unlike">
                    </Button>
                    {item.user === authState.user._id && (
                        <Button
                            title="delete"
                            onPress={() => deleteBook(item._id)}
                        />
                    )}
                    </>
                )
            }

            }
        />
        </>
    )
};

const styles = StyleSheet.create({
    button:{color: "white"}
});

export default BooksScreen;