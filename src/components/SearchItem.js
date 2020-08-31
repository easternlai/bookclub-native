import React, {useState, useContext} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {Text, Button, Input, Image } from 'react-native-elements';
import Spacer from "./Spacer";
import {Context as BookContext} from '../context/BookContext';
import {Context as SearchContext} from '../context/SearchContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationEvents } from 'react-navigation';

const SearchItem = () => {

    const {state:bookState, addBook} = useContext(BookContext);
    const {state:searchState, clearSearch} = useContext(SearchContext);

    const title = searchState.searchResults[0].volumeInfo.title;
    const author = searchState.searchResults[0].volumeInfo.authors[0];
    const image = searchState.searchResults[0].volumeInfo.imageLinks ? searchState.searchResults[0].volumeInfo.imageLinks.thumbnail: './No-Image-Found.png';

    return (
        <>
           <Text>{title} by {author}</Text>
           <Image 
                style={{width: 50, height: 50}}
                source={{url: image}}
           />
           <Button 
               title="Add Book"
               onPress={() => {
                   addBook(title, author, image);
                    clearSearch();
               }}
           />
        </>
    )

};

const styles = StyleSheet.create({

});

export default SearchItem;