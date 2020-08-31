import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList} from 'react-native';
import Textarea from 'react-native-textarea';
import { Button, ListItem, Image } from 'react-native-elements';
import Spacer from '../components/Spacer';
import CommentForm from '../components/CommentForm';
import {Context as BookContext} from '../context/BookContext';
import {Context as AuthContext} from '../context/authContext';
import { NavigationEvents } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';

const BookScreen = ({navigation}) => {

    const {state: bookState, getBook, addLike, removeLike, addComment, deleteComment} = useContext(BookContext);
    const {state: authState} = useContext(AuthContext);
    const _id = navigation.getParam('_id');

    useEffect(() => {
        getBook(_id);
    }, [getBook, _id])

        return (
            <>

                {bookState.book && (<>
                <Text>{bookState.book.title} by {bookState.book.author}</Text>
                        <Text>Recommended by {bookState.book.name}</Text>
                        <Image
                            style={{width: 50, height: 50}}
                            source={{url: bookState.book.image}}
                        />
                        <Spacer />
                        <Spacer />
                        <Spacer />
                <Button onPress={() => addLike(bookState.book._id)
                    } 
                    title={bookState.book.likes.length > 0 ? bookState.book.likes.length: "like"}>
                </Button>
                <Button onPress={() => removeLike(bookState.book._id)} 
                    title="unlike">
                </Button>

                <CommentForm bookId={bookState.book._id}/>
                <Spacer />
                <FlatList 
                    data={bookState.book.comments}
                    keyExtractor={item => item._id}
                    renderItem={({item}) => {
                        return (
                            <>
                                <Spacer />
                                <Spacer />
                                <Spacer />
                                <Spacer />
                                <Text>{item.name}</Text>
                                <Spacer />
                                <Text>{item.text}</Text>
                                {item.user === authState.user._id && (
                                    <Button 
                                        title="delete comment"
                                        onPress={() => deleteComment(_id, item._id)}
                                    />
                                )}
                            </>
                        )
                    }}
                />
                </>
                )}

            </>
        )
};

const styles = StyleSheet.create({});

export default BookScreen;