import React, { useCallback, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useAuthentication } from '../../hooks/useAuthentication';
import * as database from '../../database';
import styles from './styles';

export default function EventList() {
    const { user } = useAuthentication();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

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

    const handleFavorite = async (id) => {
        try {
            const updatedEvents = events.map(event =>
                event.id === id
                    ? { ...event, favourite: !event.favourite }
                    : event
            );
            setEvents(updatedEvents);

            const success = await database.updateEventFavourite(id, {
                favourite: !events.find(event => event.id === id)?.favourite,
            });

            if (!success) throw new Error("Database update failed.");
        } catch (error) {
            console.error("Error updating favorite:", error);
            Alert.alert("Error", "Unable to update favorite status.");
        }
    };

    const editEvent = (id) => navigation.navigate('AddEvent', { id });

    const deleteEvent = async (id) => {
        try {
            setLoading(true);
            const success = await database.deleteEvent(id);
            if (success) {
                setEvents(events.filter(event => event.id !== id));
                Alert.alert("Success", "Event deleted successfully.");
            } else {
                Alert.alert("Error", "Failed to delete event.");
            }
        } catch (error) {
            console.error("Error deleting event:", error);
            Alert.alert("Error", "Unable to delete event.");
        } finally {
            setLoading(false);
        }
    };

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
                <Text style={styles.eventType}>Event type: {item.eventType}</Text>
                <Text style={styles.eventDate}>Date: {formatDateTime(item.dateTime)}</Text>
                <View style={styles.actionIcons}>
                    <TouchableOpacity style={styles.actionButton} onPress={() => handleFavorite(item.id)}>
                        <MaterialIcons
                            name={item.favourite ? 'favorite' : 'favorite-border'}
                            size={20}
                            color={item.favourite ? '#FF6347' : '#757575'}
                        />
                        <Text style={styles.actionText}>Favorite</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton} onPress={() => editEvent(item.id)}>
                        <MaterialIcons name="edit" size={20} color="#4a235a" />
                        <Text style={styles.actionText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton} onPress={() => deleteEvent(item.id)}>
                        <MaterialIcons name="delete" size={20} color="#FF6347" />
                        <Text style={styles.actionText}>Delete</Text>
                    </TouchableOpacity>
                </View>
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
            <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AddEvent')}>
                <MaterialIcons name="add" size={35} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}
