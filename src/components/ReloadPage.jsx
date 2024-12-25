import React, { useState, useEffect } from 'react';

const ReloadPage = ({offlineStatus}) => {
    const [isOffline, setIsOffline] = useState(offlineStatus);

    useEffect(() => {
        const handleOnline = () => {
            setIsOffline(false);
            reloadPage()
        };
        const handleOffline = () => setIsOffline(true);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    const reloadPage = () => {
        window.location.reload();
    };

    if (!isOffline) {
        return null;
    }

    return (
        <div style={styles.container}>
            <p style={styles.message}>Network connection lost. Please check your connection.</p>
            <button style={styles.button} onClick={reloadPage}>Reload Page</button>
        </div>
    );
};

const styles = {
    container: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        zIndex: 1000,
    },
    message: {
        marginBottom: '20px',
        fontSize: '18px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
    },
};

export default ReloadPage;