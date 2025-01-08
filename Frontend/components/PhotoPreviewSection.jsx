import { Fontisto } from '@expo/vector-icons';
import { SafeAreaView, TouchableOpacity, Image, StyleSheet, View } from 'react-native';
import React from 'react';

const PhotoPreviewSection = ({ photo, handleRetakePhoto }) => (
    <SafeAreaView style={styles.container}>
        <View style={styles.box}>
            {photo && photo.base64 ? (
                <Image
                    style={styles.previewContainer}
                    source={{ uri: 'data:image/jpg;base64,' + photo.base64 }}
                />
            ) : (
                <View style={styles.placeholderContainer}>
                    <Text style={styles.placeholderText}>No photo available</Text>
                </View>
            )}
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleRetakePhoto}>
                <Fontisto name="trash" size={36} color="black" />
            </TouchableOpacity>
        </View>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        borderRadius: 15,
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    previewContainer: {
        width: '100%',
        height: '80%',
        
    },
    placeholderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '85%',
    },
    placeholderText: {
        color: 'white',
        fontSize: 16,
    },
    buttonContainer: {
        marginTop: '4%',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },
    button: {
     
        borderRadius: 25,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default PhotoPreviewSection;
