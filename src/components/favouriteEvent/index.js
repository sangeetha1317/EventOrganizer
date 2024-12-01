import { View, TouchableOpacity, Alert, FlatList, Text, ActivityIndicator } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from "@react-navigation/native";
import { useState, useRef, useCallback } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";
import * as database from '../../database';
import styles from "./styles";

export default function FavouriteEvent() {
    const { user } = useAuthentication();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const list = useRef(null);

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [user])
    );

    const fetchData = useCallback(async () => {
        if (user && user.email) {
            try {
                setLoading(true);
                const eventList = await database.getFavouriteEvents(user.email);
                setEvents(eventList);
            } catch (error) {
                Alert.alert("Error", "Error loading the events");
            } finally {
                setLoading(false);
            }
        }
    }, [user]);

    const formatDateTime = useCallback((date) => {
        const jsDate = date.toDate();
        return jsDate.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    }, []);

    const handleFavorite = async (id) => {
        try {
            const updatedEvents = events.filter(event => event.id !== id);
            setEvents(updatedEvents);

            const success = await database.updateEventFavourite(id, { favourite: false });

            if (!success) {
                setEvents(events);
                Alert.alert("Error", "Failed to update favorite status");
            }
        } catch (error) {
            console.error("Error updating favorite:", error);
            Alert.alert("Error", "Unable to update favorite status.");
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                <View style={styles.cardInfo}>
                    <Text style={styles.eventName}>{item.name}</Text>
                    <Text style={styles.eventType}>Event type: {item.eventType}</Text>
                    <Text style={styles.eventDate}>Date: {formatDateTime(item.dateTime)}</Text>
                    </View>
                <TouchableOpacity onPress={() => handleFavorite(item.id)} style={styles.favoriteIcon}>
                    <MaterialIcons
                        name={item.favourite ? "favorite" : "favorite-border"}
                        size={28}
                        color={item.favourite ? "red" : "gray"}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#2856ad" />
                    <Text style={styles.loadingText}>Loading your favorite events...</Text>
                </View>
            )}
            {events.length === 0 ? (
                <View style={styles.noDataContainer}>
                    <Text style={styles.noDataText}>No favorite events found</Text>
                </View>
            ) : (
                <FlatList
                    ref={list}
                    keyExtractor={(item) => item.id}
                    data={events}
                    renderItem={renderItem}
                    contentContainerStyle={styles.flatListContent}
                />
            )}
        </View>
    );
}
