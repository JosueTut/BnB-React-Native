import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, FlatList } from 'react-native';
import { Modal, Portal, TextInput, Button, Provider as PaperProvider, Card } from 'react-native-paper';

const Insumos = () => {
    const [visible, setVisible] = useState(false);
    const [areaName, setAreaName] = useState('');
    const [insumosVisible, setInsumosVisible] = useState(false);
    const [selectedArea, setSelectedArea] = useState(null);
    const [insumoName, setInsumoName] = useState('');
    const [insumos, setInsumos] = useState([]);

    const sections = [
        { name: 'Cocina', image: 'https://source.unsplash.com/featured/?kitchen', insumos: ['Sartén', 'Cuchillo', 'Plato'] },
        { name: 'Baño', image: 'https://source.unsplash.com/featured/?bathroom', insumos: ['Toalla', 'Jabón', 'Shampoo'] },
        { name: 'Lavandería', image: 'https://source.unsplash.com/featured/?laundry', insumos: ['Detergente', 'Suavizante'] },
        { name: 'Dormitorio', image: 'https://source.unsplash.com/featured/?bedroom', insumos: ['Sábanas', 'Almohada'] },
        { name: 'Sala de estar', image: 'https://source.unsplash.com/featured/?livingroom', insumos: ['Control remoto', 'Manta'] },
        { name: 'Comedor', image: 'https://source.unsplash.com/featured/?diningroom', insumos: ['Mantel', 'Vajilla'] },
        { name: 'Entrada / Pasillo', image: 'https://source.unsplash.com/featured/?hallway', insumos: ['Espejo', 'Zapatera'] },
        { name: 'Estudio', image: 'https://source.unsplash.com/featured/?study', insumos: ['Escritorio', 'Lámpara'] },
        { name: 'Jardín', image: 'https://source.unsplash.com/featured/?garden', insumos: ['Regadera', 'Maceta'] },
        { name: 'Bodega', image: 'https://source.unsplash.com/featured/?storageroom', insumos: ['Caja', 'Estantería'] },
    ];

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const showInsumosModal = (area) => {
        setSelectedArea(area);
        setInsumos(area.insumos);
        setInsumosVisible(true);
    };

    const hideInsumosModal = () => {
        setInsumosVisible(false);
        setInsumoName('');
    };

    const handleCreateInsumo = () => {
        if (insumoName.trim() === '') {
            alert('Por favor, ingrese el nombre del insumo');
            return;
        }
        setInsumos([...insumos, insumoName]);
        setInsumoName('');
    };

    const handleCreateArea = () => {
        if (areaName.trim() === '') {
            alert('Por favor, ingrese el nombre del área');
            return;
        }
        alert(`Área de insumos "${areaName}" creada`);
        setAreaName('');
        hideModal();
    };

    return (
        <PaperProvider>
            <View style={styles.container}>
                <Text style={styles.header}>
                    INSUMOS
                </Text>
                <Button mode="contained" onPress={showModal} style={styles.createButton}>
                    Crear Área de Insumos
                </Button>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {sections.map((section, index) => (
                        <TouchableOpacity key={index} style={styles.layout} onPress={() => showInsumosModal(section)}>
                            <ImageBackground source={{ uri: section.image }} style={styles.image}>
                                <View style={styles.overlay}>
                                    <Text style={styles.info}>{section.name}</Text>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Crear Nueva Área de Insumos</Text>
                        <TextInput
                            label="Nombre del Área"
                            value={areaName}
                            onChangeText={setAreaName}
                            style={styles.input}
                        />
                        <Button mode="contained" onPress={handleCreateArea} style={styles.buttonSave}>
                            Crear
                        </Button>
                        <Button onPress={hideModal} style={styles.buttonCancel}>
                            Cancelar
                        </Button>
                    </Modal>

                    <Modal visible={insumosVisible} onDismiss={hideInsumosModal} contentContainerStyle={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Insumos de {selectedArea?.name}</Text>
                        <FlatList
                            data={insumos}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <Card style={styles.insumoCard}>
                                    <Card.Content>
                                        <Text>{item}</Text>
                                    </Card.Content>
                                </Card>
                            )}
                        />
                        <TextInput
                            label="Nombre del Insumo"
                            value={insumoName}
                            onChangeText={setInsumoName}
                            style={styles.input}
                        />
                        <Button mode="contained" onPress={handleCreateInsumo} style={styles.buttonSave}>
                            Agregar Insumo
                        </Button>
                        <Button onPress={hideInsumosModal} style={styles.buttonCancel}>
                            Cancelar
                        </Button>
                    </Modal>
                </Portal>
            </View>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        paddingTop: 35,
        alignItems: 'center',
    },
    header: {
        fontSize: 30,
        textAlign: 'center',
        width: '100%',
        paddingVertical: 10,
        fontWeight: 'bold',
        backgroundColor: '#2B3A67',
        color: '#fff',
        marginBottom: 10,
    },
    createButton: {
        marginVertical: 20,
        backgroundColor: '#2B3A67',
    },
    layout: {
        width: 350,
        height: 150,
        marginTop: 15,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#e5e7eb',
    },
    image: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    info: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#fff',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        marginBottom: 20,
    },
    buttonSave: {
        backgroundColor: '#2B3A67',
        marginBottom: 10,
    },
    buttonCancel: {
        backgroundColor: '#e0e0e0',
    },
    insumoCard: {
        marginBottom: 10,
    },
});

export default Insumos;
