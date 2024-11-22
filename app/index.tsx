import React, {useState} from 'react';
import {
    View, Text, TextInput, TouchableOpacity,
    StyleSheet, ScrollView, SafeAreaView, Linking,
} from 'react-native';

import { useRouter } from "expo-router"

export default function Index() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cookies, setCookies] = useState("");

    const router = useRouter();

    async function genCookies(username: string, password: string) {
        setCookies("loading...");
        const response = await fetch(
            "http://0.0.0.0:8000/genCookies",
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username: username, password: password}),
            },
        );

        if (!response.ok) {
            setCookies("Request error");
        } else {
            const data = await response.json();

            if (!data.ok) {
                setCookies(data.status);
            } else {
                // set in db
                setCookies(data.MoodleSession);
                router.push("/MainScreen");
            }
        }
    }

    const openLink = (url : string) => {
        Linking.openURL(url).catch((err) =>
            console.error("Failed to open link:", err)
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.rightPanel}>
                    <View style={styles.formContainer}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.title}>Login to your account</Text>
                            <Text style={styles.subtitle}>
                                Enter your username and password to login
                            </Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                value={username}
                                onChangeText={setUsername}
                                style={styles.input}
                                placeholder="Username"
                                placeholderTextColor="#6b7280"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                            <TextInput
                                value={password}
                                onChangeText={setPassword}
                                style={styles.input}
                                placeholder="Password"
                                placeholderTextColor="#6b7280"
                                secureTextEntry = {true}
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                            <TouchableOpacity style={styles.button}
                                              onPress={() => genCookies(username, password)}>
                                <Text style={styles.buttonText}>Login</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.termsText}>
                            By clicking continue, you agree to our{' '}

                            <Text
                                style={styles.link}
                                onPress={() => openLink("http://0.0.0.0:8000/terms/")}
                            >Terms of Service</Text> and{' '}

                            <Text style={styles.link}
                                  onPress={() => openLink("http://0.0.0.0:8000/policy/")}
                            >Privacy Policy</Text>.

                        </Text>
                        { cookies && <Text style={styles.termsText}>{cookies}</Text>}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollView: {
        flexGrow: 1,
        flexDirection: 'column',
    },
    rightPanel: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    formContainer: {
        width: '100%',
        maxWidth: 350,
        alignSelf: 'center',
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#6b7280',
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 24,
    },
    input: {
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 6,
        padding: 12,
        marginBottom: 12,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#000',
        borderRadius: 6,
        padding: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
    termsText: {
        fontSize: 12,
        color: '#6b7280',
        textAlign: 'center',
    },
    link: {
        color: '#000',
        textDecorationLine: 'underline',
    },
});

