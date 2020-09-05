import React from "react";
import { 
    StyleSheet,
    Text,
    View,
} from "react-native";

import { AuthContext } from '../components/Context';
import FilledButton from "../components/FilledButton";
import "../Global";

export default function SettingsScreen({navigation}) {
    const { signOut } = React.useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Text style={styles.title}><Text style={styles.bold}>Server URL<Text>:</Text>  </Text>{global.base_url}</Text>
            <Text style={styles.content}><Text style={styles.bold}>Last Handshake<Text>:</Text>  </Text>{global.last_handshake_date_time}</Text>
            <FilledButton title={'Reset Server'} style={styles.loginButton}
            onPress={() => {signOut()}} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 120,
    },
    title: {
        marginTop: 60,
    },
    bold: {
        fontWeight: '700',
    },
    content: {
        margin: 20
    },
    loginButton: {
        marginVertical: 10,
    },
  })   