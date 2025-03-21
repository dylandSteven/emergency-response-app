import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
  Dimensions,
} from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { requestLocationPermission } from '../../utils/permissions';
//  src/screens/map/MapScreen.js

// Datos de ejemplo para desarrollo
const MOCK_INCIDENTS = [
  {
    id: '1',
    title: 'Incendio en edificio',
    description: 'Incendio en el tercer piso de edificio residencial',
    type: 'fire',
    severity: 'high',
    latitude: 37.78825,
    longitude: -122.4324,
    timestamp: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Persona herida',
    description: 'Persona con posible fractura necesita atención médica',
    type: 'medical',
    severity: 'medium',
    latitude: 37.78525,
    longitude: -122.4354,
    timestamp: new Date().toISOString(),
  },
];

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapScreen = ({ navigation }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [incidents, setIncidents] = useState(MOCK_INCIDENTS);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null);

  useEffect(() => {
    async function getLocation() {
      const hasPermission = await requestLocationPermission();

      if (hasPermission) {
        Geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ latitude, longitude });
            setLoading(false);
          },
          error => {
            console.log(error.code, error.message);
            Alert.alert('Error', 'No se pudo obtener ubicación');
            setLoading(false);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } else {
        setLoading(false);
      }
    }

    getLocation();

    // Aquí normalmente configurarías la conexión a socket.io para recibir
    // actualizaciones de incidentes en tiempo real
  }, []);

  const goToUserLocation = () => {
    if (userLocation && mapRef.current) {
      mapRef.current.animateToRegion({
        ...userLocation,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
    }
  };

  const reportEmergency = () => {
    navigation.navigate('ReportEmergency', { location: userLocation });
  };

  const renderMarkers = () => {
    return incidents.map(incident => (
      <Marker
        key={incident.id}
        coordinate={{
          latitude: incident.latitude,
          longitude: incident.longitude,
        }}
        pinColor={incident.severity === 'high' ? 'red' : incident.severity === 'medium' ? 'orange' : 'yellow'}
      >
        <Callout>
          <View style={styles.callout}>
            <Text style={styles.calloutTitle}>{incident.title}</Text>
            <Text style={styles.calloutDescription}>{incident.description}</Text>
            <Text style={styles.calloutTime}>
              {new Date(incident.timestamp).toLocaleTimeString()}
            </Text>
          </View>
        </Callout>
      </Marker>
    ));
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text>Cargando mapa...</Text>
        </View>
      ) : (
        <>
          <MapView
            ref={mapRef}
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={userLocation ? {
              ...userLocation,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            } : {
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
          >
            {userLocation && (
              <Marker
                coordinate={userLocation}
                title="Tu ubicación"
                pinColor="blue"
              />
            )}
            {renderMarkers()}
          </MapView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.locationButton}
              onPress={goToUserLocation}
            >
              <Icon name="my-location" size={24} color="#FFF" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.emergencyButton}
              onPress={reportEmergency}
            >
              <Text style={styles.emergencyButtonText}>Reportar Emergencia</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  locationButton: {
    position: 'absolute',
    right: 20,
    bottom: 80,
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  emergencyButton: {
    backgroundColor: '#D32F2F',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  emergencyButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  callout: {
    width: 200,
    padding: 10,
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  calloutDescription: {
    fontSize: 14,
    marginBottom: 5,
  },
  calloutTime: {
    fontSize: 12,
    color: '#666',
  },
});

export default MapScreen;
