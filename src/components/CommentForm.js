import React, { useState, useContext } from "react";
import { StyleSheet, Keyboard } from "react-native";
import { Text, Button, Input } from "react-native-elements";
import { Context as BookContext } from "../context/BookContext";
import Textarea from "react-native-textarea";
import Spacer from "./Spacer";

const CommentForm = ({ bookId, navigation }) => {
  const { state: bookState, addComment } = useContext(BookContext);
  const [comment, setComment] = useState("");

  return (
    <>
      <Spacer>
        <Text h3>Leave a Comment</Text>
        <Textarea
          style={styles.textarea}
          onChangeText={setComment}
          defaultValue={comment}
          maxLength={420}
        />
      </Spacer>
      <Spacer>
        <Button
          title={"Submit Comment"}
          onPress={() => {
            addComment(bookId, {text:comment});
            Keyboard.dismiss();
            setComment('');
          }}
        />
      </Spacer>
    </>
  );
};

const styles = StyleSheet.create({
  height: 180,
  padding: 5,
});

export default CommentForm;
