// src/utils/permissions.js
import { Platform, PermissionsAndroid, Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export const requestLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    const granted = await Geolocation.requestAuthorization('whenInUse');
    return granted === 'granted';
  }

  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permisos de ubicación',
          message:
            'Esta app necesita acceso a tu ubicación ' +
            'para poder reportar y visualizar emergencias cercanas.',
          buttonNeutral: 'Preguntar después',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }

  return false;
};
