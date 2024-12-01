import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import styles from "./styles";
import { useEffect, useState, useCallback } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useAuthentication } from "../../hooks/useAuthentication";
import * as database from '../../database';
import { Timestamp } from 'firebase/firestore';

export default function EventForm({ navigation, route }) {
    const { id } = route.params || {};
    const [eventName, setEventName] = useState("");
    const [eventType, setEventType] = useState("");
    const [favourite, setFavourite] = useState(false);

    const [dateTime, setDateTime] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [pickerMode, setPickerMode] = useState('date');
    const [loading, setLoading] = useState(false);
    const { user } = useAuthentication();

    useEffect(() => {
        async function fetchEventById() {
            try {
                setLoading(true);
                const event = await database.fetchEventById(id);
                if (event) {
                    setEventName(event.name);
                    setEventType(event.eventType);
                    setDateTime(event.dateTime.toDate());
                    setFavourite(event.favourite);
                }
            } catch (error) {
                console.log("Error fetching event details", error);
            } finally {
                setLoading(false);
            }
        }
        if (id) fetchEventById();
    }, [id]);

    const openDatePicker = useCallback(() => {
        setShowPicker(true);
        setPickerMode('date');
    }, []);

    const customFormatDate = useCallback((date) => {
        const datePart = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        const timePart = `${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;
        return `${datePart} ${timePart}`;
    }, []);

    const handleDateSelection = useCallback((event, selectedDate) => {
        setShowPicker(false);
        if (selectedDate) {
            setDateTime(selectedDate);
            if (pickerMode === 'date') {
                setPickerMode('time');
                setShowPicker(true);
            }
        }
    }, [pickerMode]);

    const handleAddEventForm = async () => {
        const data = {
            name: eventName,
            eventType: eventType,
            dateTime: Timestamp.fromDate(dateTime),
            favourite: favourite,
            email: user.email
        };
        try {
            setLoading(true);
            const eventId = await database.addEvent(data);
            if (eventId) {
                navigation.goBack();
            } else {
                Alert.alert('Error adding event', 'Please try again later.');
            }
        } catch (error) {
            Alert.alert('Error adding event', 'Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#ffffff" />
                    <Text style={styles.loadingText}>Processing...</Text>
                </View>
            )}

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Event Details</Text>
                <TextInput
                    placeholder="Enter Event Name"
                    value={eventName}
                    onChangeText={setEventName}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Enter Event Type"
                    value={eventType}
                    onChangeText={setEventType}
                    style={styles.input}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Date and Time</Text>
                <TouchableOpacity onPress={openDatePicker}>
                    <Text style={styles.datePickerTrigger}>{customFormatDate(dateTime)}</Text>
                </TouchableOpacity>
                {showPicker && (
                    <DateTimePicker
                        value={dateTime}
                        mode={pickerMode}
                        is24Hour={true}
                        display="default"
                        onChange={handleDateSelection}
                    />
                )}
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, { opacity: !eventName || !eventType || !dateTime ? 0.5 : 1 }]}
                    onPress={() => (id === undefined ? handleAddEventForm() : handleEditEvent())}
                    disabled={!eventName || !eventType || !dateTime}
                >
                    <Text style={styles.buttonText}>Add the event</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
