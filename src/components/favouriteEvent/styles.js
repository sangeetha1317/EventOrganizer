import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
       container: {
            flex: 1,
            backgroundColor: "#f9f9f9",
        },
        loadingOverlay: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1,
        },
        loadingText: {
            marginTop: 10,
            fontSize: 16,
            color: "#fff",
        },
        noDataContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 20,
        },
        noDataText: {
            fontSize: 18,
            color: "#666",
            textAlign: "center",
        },
        flatListContent: {
            padding: 15,
        },
        card: {
            backgroundColor: "#ffffff",
            borderRadius: 10,
            padding: 15,
            marginBottom: 15,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 5,
            elevation: 3,
        },
        cardContent: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        cardInfo: {
            flex: 1,
        },
        eventName: {
            fontSize: 20,
            fontWeight: "bold",
            color: "#333",
        },
        eventType: {
            fontSize: 15,
            fontStyle: 'italic',
            color: '#273746',
            paddingVertical: 5
        },
        eventDate: {
            fontSize: 12,
            color: '#757575',
            marginVertical: 4
        },
        favoriteIcon: {
            padding: 10,
        },
    });    