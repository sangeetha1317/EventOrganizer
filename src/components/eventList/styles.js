import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f6f6f6'
    },
    eventCard: {
        marginBottom: 16,
        borderRadius: 12,
    },
    eventContainer: {
        padding: 16,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { 
            width: 0,
            height: 20
        },
        shadowOpacity: 0.3,
        shadowRadius: 9
    },
    eventLocation: {
        fontSize: 14,
        color: '#757575'
    },
    eventDate: {
        fontSize: 12,
        color: '#9e9e9e',
        marginVertical: 4
    },
    loadingOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        zIndex: 999
    },
    loadingText: {
        marginTop: 10,
        fontSize: 18,
        color: '#6200ea'
    },
    emptyView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyText: {
        fontSize: 18,
        color: '#757575'
    },
    eventHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    eventName: {
        fontSize: 20,
        fontWeight: '600',
        fontStyle: 'italic',
        color: '#333',
        flex: 1,
        marginRight: 8,
    }
})