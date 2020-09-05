import React, { Component, useEffect, useState } from "react";
import { FlatList, Text, View, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { searchProperty } from '../services/searchProperty';

export default function NodeListScreen({navigation}) {
  const DATA = global.node_list; 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if(isLoading == true) {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  const handleSubmit = id => async () => {
    var url = global.base_url;
    await searchProperty(url, id);
    navigation.navigate('PropertyList');
  }

  return (
    <View>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <View style={{ flex: 1, flexDirection: 'column'}}>
            <TouchableOpacity onPress={handleSubmit(item.id)}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <Image style={styles.avatar}
                     source={{ uri: '' }} />
                <View style={{ flex: 1, flexDirection: 'column' }}>
                  <Text style={styles.flatListItem}> Name: {item.name} </Text>
                  <Text style={styles.flatListItem}> ID: {item.id} </Text>
                </View>
                <Icon name='angle-right' size={20} style={{padding: 12}} />
              </View>
            </TouchableOpacity>
            <View style={styles.seperator}></View>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 100 / 2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "white"
  },
  flatListItem: {
    fontSize: 14,
    padding: 5,
  },
  seperator: {
    height: 1, 
    backgroundColor: 'grey'
  }
})   
