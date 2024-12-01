import React, { useCallback, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useAuthentication } from '../../hooks/useAuthentication';
import * as database from '../../database';
import styles from './styles';

export default function EventList() {
    const { user } = useAuthentication();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchEvents = useCallback(async () => {
        if (user?.email) {
            try {
                setLoading(true);
                const eventList = await database.fetchEvents(user.email);
                setEvents(eventList);
            } catch (error) {
                console.error("Error fetching events:", error);
                Alert.alert("Error", "Failed to load events.");
            } finally {
                setLoading(false);
            }
        }
    }, [user]);

    useFocusEffect(
        useCallback(() => {
            fetchEvents();
        }, [fetchEvents])
    );

    const formatDateTime = (date) =>
        date.toDate().toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });

    const renderItem = ({ item }) => (
        <View style={styles.eventCard}>
            <TouchableOpacity
                style={styles.eventContainer}
            >
                <View style={styles.eventHeader}>
                    <Text style={styles.eventName}>{item.name}</Text>
                   
                </View>
                <Text style={styles.eventLocation}>Location: {item.location}</Text>
                <Text style={styles.eventDate}>Date: {formatDateTime(item.dateTime)}</Text>
            </TouchableOpacity>
        </View>
    );
    

    return (
        <View style={styles.container}>
            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#6200ea" />
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            )}
            <FlatList
                data={events}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                ListEmptyComponent={
                    <View style={styles.emptyView}>
                        <Text style={styles.emptyText}>
                            No events available. Tap the + icon to add an event.
                        </Text>
                    </View>
                }
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}
