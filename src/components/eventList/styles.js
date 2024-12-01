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
    eventType: {
        fontSize: 14,
        fontStyle: 'italic',
        color: '#273746'
    },
    eventDate: {
        fontSize: 12,
        color: '#757575',
        marginVertical: 4
    },
    editButton: {
        backgroundColor: '#6200ea',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8
    },
    deleteButton: {
        backgroundColor: '#FF6347',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center'
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
    fab: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        width: 60,
        height: 60,
        backgroundColor: '#6200ea',
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    eventHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    eventName: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        flex: 1,
        marginRight: 8,
    },
    actionIcons: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 12,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    actionText: {
        fontSize: 14,
        color: '#757575',
        marginLeft: 4,
    }
})