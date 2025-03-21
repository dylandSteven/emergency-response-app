// src/screens/emergency/ReportScreen.js
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const emergencyTypes = [
  { id: 'fire', label: 'Incendio', icon: 'local-fire-department' },
  { id: 'medical', label: 'Médica', icon: 'medical-services' },
  { id: 'security', label: 'Seguridad', icon: 'security' },
  { id: 'rescue', label: 'Rescate', icon: 'support' },
  { id: 'flood', label: 'Inundación', icon: 'waves' },
  { id: 'other', label: 'Otro', icon: 'priority-high' },
];

const ReportScreen = ({ route, navigation }) => {
  const { location } = route.params || {};
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedType, setSelectedType] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Esta función sería reemplazada por una llamada API real
  const submitReport = async () => {
    // Validaciones
    if (!title.trim()) {
      Alert.alert('Error', 'Por favor ingresa un título para la emergencia');
      return;
    }

    if (!selectedType) {
      Alert.alert('Error', 'Por favor selecciona un tipo de emergencia');
      return;
    }

    try {
      setSubmitting(true);

      // Simulamos una llamada API
      await new Promise(resolve => setTimeout(resolve, 1500));

      // En una app real, aquí enviarías los datos al servidor
      const reportData = {
        title,
        description,
        type: selectedType,
        location,
        timestamp: new Date().toISOString(),
      };

      console.log('Enviando reporte:', reportData);

      // Mostramos confirmación
      Alert.alert(
        'Reporte Enviado',
        'Tu reporte de emergencia ha sido enviado. Los equipos de rescate han sido notificados.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Map'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudo enviar el reporte. Inténtalo nuevamente.');
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Reportar Emergencia</Text>
        <Text style={styles.headerSubtitle}>
          Completa la información para enviar un reporte de emergencia
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Título</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Descripción breve de la emergencia"
          value={title}
          onChangeText={setTitle}
          maxLength={50}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tipo de Emergencia</Text>
        <View style={styles.typeContainer}>
          {emergencyTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.typeButton,
                selectedType === type.id && styles.selectedType,
              ]}
              onPress={() => setSelectedType(type.id)}
            >
              <Icon
                name={type.icon}
                size={24}
                color={selectedType === type.id ? '#fff' : '#333'}
              />
              <Text
                style={[
                  styles.typeText,
                  selectedType === type.id && styles.selectedTypeText,
                ]}
              >
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Descripción</Text>
        <TextInput
          style={[styles.textInput, styles.textArea]}
          placeholder="Describe la situación con el mayor detalle posible"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ubicación</Text>
        {location ? (
          <View style={styles.locationInfo}>
            <Icon name="location-on" size={20} color="#D32F2F" />
            <Text style={styles.locationText}>
              Lat: {location.latitude.toFixed(6)}, Long: {location.longitude.toFixed(6)}
            </Text>
          </View>
        ) : (
          <Text style={styles.noLocationText}>
            No se pudo determinar tu ubicación
          </Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={submitReport}
        disabled={submitting}
      >
        {submitting ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <>
            <Icon name="send" size={20} color="#FFF" />
            <Text style={styles.submitButtonText}>Enviar Reporte</Text>
          </>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#D32F2F',
    padding: 20,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  section: {
    backgroundColor: '#FFF',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  textArea: {
    height: 100,
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  typeButton: {
    width: '30%',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#DDD',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedType: {
    backgroundColor: '#D32F2F',
    borderColor: '#D32F2F',
  },
  typeText: {
    marginTop: 5,
    fontSize: 12,
  },
  selectedTypeText: {
    color: '#FFF',
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 5,
    fontSize: 14,
  },
  noLocationText: {
    color: '#D32F2F',
    fontStyle: 'italic',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
  },
});

export default ReportScreen;
