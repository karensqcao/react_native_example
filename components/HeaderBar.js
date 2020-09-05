import * as React from 'react';
import { StyleSheet } from "react-native";
import { Appbar, Button, Text } from 'react-native-paper';

const ContentTitle = ({ title, style }) => (
  <Appbar.Content
    title={<Text style={style}> {title} </Text>}
    style={{ alignItems: 'center' }}
  />
);

const HeaderBar = ({title, onPress}) => (
  <Appbar.Header style={styles.header}> 
    <Appbar.BackAction onPress={onPress} />
    <ContentTitle title={title} style={{color:'white', fontWeight: 'bold'}} />
  </Appbar.Header>
);

export default HeaderBar;

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#c42c2c",
    },
})