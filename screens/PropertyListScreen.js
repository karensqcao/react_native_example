import React, { Component, useEffect, useState } from "react";
import { FlatList, Text, View, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';

export default function PropertyListScreen({navigation}) {
  const DATA = global.property_list;
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

  return (
    <View>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <View style={{ flex: 1, flexDirection: 'column'}}>
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <Text style={styles.flatListItem}> {item.id} </Text>
            </View>
            <View style={styles.seperator}></View>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  flatListItem: {
    fontSize: 14,
    padding: 5,
  },
  seperator: {
    height: 1, 
    backgroundColor: 'grey'
  }
})   
