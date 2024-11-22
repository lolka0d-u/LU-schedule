import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    SafeAreaView,
    Platform,
} from 'react-native';

// Mock data for lectures
const lecturesData = [
    { id: '1', title: 'Lecture1' },
    { id: '2', title: 'Lecture2' },
    { id: '3', title: 'Lecture3' },
];

export default function MainScreen() {
    const [userName, setUserName] = useState('');
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        // fetch name
        setUserName('John Doe');

        // Set current date
        const date = new Date();
        setCurrentDate(date.toLocaleDateString('en-LV', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }));
    }, []);

    const renderLectureItem = ({ item }) => (
        <View style={styles.lectureItem}>
            <Text style={styles.lectureTitle}>{item.title}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.greeting}>Hello, {userName}</Text>
                <Text style={styles.date}>{currentDate}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.sectionTitle}>Today's Lectures</Text>
                <FlatList
                    data={lecturesData}
                    renderItem={renderLectureItem}
                    keyExtractor={(item) => item.id}
                    style={styles.lectureList}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#4a90e2',
        padding: 20,
        alignItems: 'center',
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 5,
    },
    date: {
        fontSize: 16,
        color: '#ffffff',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    lectureList: {
        flex: 1,
    },
    lectureItem: {
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    lectureTitle: {
        fontSize: 16,
        color: '#333',
    },
});

