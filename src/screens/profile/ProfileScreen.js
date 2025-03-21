// src/screens/profile/ProfileScreen.js
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = ({ navigation }) => {
  // Estado para las opciones de configuración
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  // Datos de usuario (normalmente se obtendrían de un contexto o API)
  const user = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    userType: 'citizen', // Alternativas: 'rescuer', 'coordinator'
    profileImage: null, // URL de imagen para un usuario real
  };

  // Historial de emergencias reportadas
  const reportHistory = [
    {
      id: '1',
      title: 'Incendio en edificio',
      date: '15 Mar 2025',
      status: 'resolved',
    },
    {
      id: '2',
      title: 'Accidente de tráfico',
      date: '2 Feb 2025',
      status: 'closed',
    },
    {
      id: '3',
      title: 'Inundación local',
      date: '28 Dec 2024',
      status: 'resolved',
    },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar Sesión',
          onPress: () => {
            // Lógica para cerrar sesión
            console.log('Usuario cerró sesión');
            // Navegar a la pantalla de login (esto dependerá de tu navegación)
            // navigation.navigate('Login');
          },
          style: 'destructive',
        },
      ]
    );
  };

  const renderStatusBadge = (status) => {
    let color;
    let text;

    switch (status) {
      case 'active':
        color = '#2196F3';
        text = 'Activo';
        break;
      case 'in_progress':
        color = '#FF9800';
        text = 'En Progreso';
        break;
      case 'resolved':
        color = '#4CAF50';
        text = 'Resuelto';
        break;
      case 'closed':
        color = '#757575';
        text = 'Cerrado';
        break;
      default:
        color = '#757575';
        text = 'Desconocido';
    }

    return (
      <View style={[styles.statusBadge, { backgroundColor: color }]}>
        <Text style={styles.statusText}>{text}</Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          {user.profileImage ? (
            <Image
              source={{ uri: user.profileImage }}
              style={styles.profileImage}
            />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <Icon name="person" size={40} color="#FFF" />
            </View>
          )}
        </View>

        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userType}>
          {user.userType === 'citizen' ? 'Ciudadano' :
           user.userType === 'rescuer' ? 'Rescatista' : 'Coordinador'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Información Personal</Text>

        <View style={styles.infoRow}>
          <Icon name="email" size={20} color="#555" />
          <Text style={styles.infoText}>{user.email}</Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name="phone" size={20} color="#555" />
          <Text style={styles.infoText}>{user.phone}</Text>
        </View>

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Editar Información</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configuración</Text>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Icon name="notifications" size={20} color="#555" />
            <Text style={styles.settingText}>Notificaciones</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#D1D1D1', true: '#81b0ff' }}
            thumbColor={notificationsEnabled ? '#2196F3' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Icon name="location-on" size={20} color="#555" />
            <Text style={styles.settingText}>Compartir Ubicación</Text>
          </View>
          <Switch
            value={locationEnabled}
            onValueChange={setLocationEnabled}
            trackColor={{ false: '#D1D1D1', true: '#81b0ff' }}
            thumbColor={locationEnabled ? '#2196F3' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Icon name="dark-mode" size={20} color="#555" />
            <Text style={styles.settingText}>Modo Oscuro</Text>
          </View>
          <Switch
            value={darkModeEnabled}
            onValueChange={setDarkModeEnabled}
            trackColor={{ false: '#D1D1D1', true: '#81b0ff' }}
            thumbColor={darkModeEnabled ? '#2196F3' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Historial de Reportes</Text>

        {reportHistory.length > 0 ? (
          reportHistory.map(report => (
            <TouchableOpacity
              key={report.id}
              style={styles.reportItem}
              onPress={() => {
                // Navegar a detalles del reporte
                // navigation.navigate('ReportDetails', { reportId: report.id });
              }}
            >
              <View style={styles.reportInfo}>
                <Text style={styles.reportTitle}>{report.title}</Text>
                <Text style={styles.reportDate}>{report.date}</Text>
              </View>
              {renderStatusBadge(report.status)}
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.emptyHistory}>No hay reportes previos</Text>
        )}

        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>Ver Todos</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Icon name="logout" size={20} color="#FFF" />
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
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
    alignItems: 'center',
  },
  profileImageContainer: {
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FFF',
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFF',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  userType: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 10,
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
    marginBottom: 15,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#555',
  },
  editButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  editButtonText: {
    color: '#2196F3',
    fontWeight: '500',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#555',
  },
  reportItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  reportInfo: {
    flex: 1,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    color: '#333',
  },
  reportDate: {
    fontSize: 14,
    color: '#757575',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '500',
  },
  emptyHistory: {
    textAlign: 'center',
    padding: 20,
    color: '#757575',
    fontStyle: 'italic',
  },
  viewAllButton: {
    alignSelf: 'center',
    marginTop: 15,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
    backgroundColor: '#EEEEEE',
  },
  viewAllText: {
    color: '#555',
    fontWeight: '500',
  },
  logoutButton: {
    margin: 20,
    backgroundColor: '#757575',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default ProfileScreen;
