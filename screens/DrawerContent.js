import React from "react";
import { 
    StyleSheet,
    View
} from "react-native";
import {
    Avatar,
    Title,
    Caption,
    Drawer,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { AuthContext } from '../components/Context';
import { getVersion } from "../services/getVersion";

export default function DrawerContent(props) {
    const { signOut } = React.useContext(AuthContext);

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection: 'row', marginTop: 15}}>
                            <Avatar.Image 
                            source={{
                                uri: ''
                            }}
                            size={50}
                            />
                            <View style={{marginLeft: 15, flexDirection: 'column'}}>
                                <Title style={styles.title}>{global.username}</Title>
                                <Caption style={styles.caption}>@{global.username}</Caption>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                        icon={() => (
                            <Icon name='home-outline' />
                        )}
                        label='Home'
                        onPress={() => {props.navigation.navigate('Home')}}
                        ></DrawerItem>
                        <DrawerItem
                        icon={() => (
                            <Icon name='cog-outline' />
                        )}
                        label='Settings'
                        onPress={() => {props.navigation.navigate('Settings')}}
                        ></DrawerItem>
                        <DrawerItem
                        icon={() => (
                            <Icon name='account-check-outline' />
                        )}
                        label='About'
                        onPress={async () => {
                            var url = global.base_url;
                            await getVersion(url);
                            props.navigation.navigate('AboutScreen');
                        }}
                        ></DrawerItem>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                icon={() => (
                    <Icon name='exit-to-app' />
                )}
                label='Sign Out'
                onPress={() => {signOut()}}
                ></DrawerItem>
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
      },
      userInfoSection: {
        paddingLeft: 20,
      },
      title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
      },
      caption: {
        fontSize: 14,
        lineHeight: 14,
      },
      row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
      },
      section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
      },
      paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
      },
      drawerSection: {
        marginTop: 15,
      },
      bottomDrawerSection: {
          marginBottom: 15,
          borderTopColor: '#f4f4f4',
          borderTopWidth: 1
      },
      preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
      },
});