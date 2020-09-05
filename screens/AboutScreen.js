import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import HeaderBar from '../components/HeaderBar';

const AboutScreen = (props) => {
    const version_text = global.sv_version;
    return (
        <View>
            <HeaderBar title={'About'} onPress={() => props.navigation.goBack() } />
            <View style={styles.container}>
            <Image 
                style={styles.img}
                source={{uri: '',}} />
                <Text style={styles.content}>{"\n\n"}Name Mobile v 1.0</Text>
                <Text style={styles.content}>Server Version: {global.sv_version} {"\n"}</Text>
                <Text style={styles.footer}>Copyright {'\u00A9'} Company Name </Text>
                <Text style={styles.footer}>Contact Info</Text>
            </View>
        </View>
    );
};

export default AboutScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 120,
    },
    content: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    footer: {
        fontSize: 16
    },
    img: {
        width: 270,
        height: 80
    }
})