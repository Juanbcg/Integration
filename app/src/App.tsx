import React, { useState } from 'react';
import { Home } from './components/Home';
import { Services } from './components/Services';
import { ServiceDetail } from './components/ServiceDetail';
import { Login } from './components/Login';
import { AdminPanel } from './components/AdminPanel';
import { Database } from './components/Database';
import { Button } from './components/ui/button';
import { LogOut, User } from 'lucide-react';

// Mock data for services
export const servicesData = [
  {
    id: 1,
    name: "Desarrollo de Software",
    price: "$2,500,000",
    image: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwdGVhbXxlbnwxfHx8fDE3NTcyNDU4Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    quantity: 25,
    description: "Desarrollo de aplicaciones web y móviles personalizadas usando tecnologías modernas",
    promotion: true
  },
  {
    id: 2,
    name: "Computación en la Nube",
    price: "$1,800,000",
    image: "https://images.unsplash.com/photo-1667984390538-3dea7a3fe33d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMGNvbXB1dGluZ3xlbnwxfHx8fDE3NTcyMzk5MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    quantity: 15,
    description: "Migración y gestión de infraestructura en la nube (AWS, Azure, Google Cloud)",
    promotion: false
  },
  {
    id: 3,
    name: "Ciberseguridad",
    price: "$3,200,000",
    image: "https://images.unsplash.com/photo-1548092372-0d1bd40894a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlciUyMHNlY3VyaXR5fGVufDF8fHx8MTc1NzI1MTgyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    quantity: 8,
    description: "Auditorías de seguridad, implementación de protocolos y monitoreo continuo",
    promotion: true
  },
  {
    id: 4,
    name: "Diseño Web",
    price: "$1,200,000",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXNpZ258ZW58MXx8fHwxNzU3MjQzNDEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    quantity: 30,
    description: "Diseño y desarrollo de sitios web responsivos y optimizados para SEO",
    promotion: false
  },
  {
    id: 5,
    name: "Desarrollo Móvil",
    price: "$2,800,000",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NTcyMjYyMzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    quantity: 12,
    description: "Aplicaciones nativas e híbridas para iOS y Android",
    promotion: true
  },
  {
    id: 6,
    name: "Gestión de Bases de Datos",
    price: "$1,500,000",
    image: "https://images.unsplash.com/photo-1741958193874-6ef299f6b053?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhYmFzZSUyMG1hbmFnZW1lbnR8ZW58MXx8fHwxNzU3MjUxODI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    quantity: 20,
    description: "Diseño, optimización y administración de bases de datos",
    promotion: false
  },
  {
    id: 7,
    name: "Marketing Digital",
    price: "$900,000",
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nfGVufDF8fHx8MTc1NzI1MTgyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    quantity: 40,
    description: "Estrategias de marketing digital, SEO, SEM y redes sociales",
    promotion: true
  },
  {
    id: 8,
    name: "Consultoría Tecnológica",
    price: "$2,000,000",
    image: "https://images.unsplash.com/photo-1582004531564-50f300aae039?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdWx0aW5nJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTcyNTE4Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    quantity: 18,
    description: "Asesoría en transformación digital y optimización de procesos",
    promotion: false
  },
  {
    id: 9,
    name: "Soporte IT",
    price: "$800,000",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdCUyMHN1cHBvcnR8ZW58MXx8fHwxNzU3MjUxODI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    quantity: 35,
    description: "Soporte técnico 24/7 y mantenimiento de infraestructura IT",
    promotion: false
  },
  {
    id: 10,
    name: "Automatización de Procesos",
    price: "$2,200,000",
    image: "https://images.unsplash.com/photo-1731311980517-6da77a29f7a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwb2ZmaWNlJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzU3MjUxODIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    quantity: 10,
    description: "Implementación de RPA y automatización de workflows empresariales",
    promotion: true
  }
];

// Mock data for clients and users
export const clientsData = [
  { id: 1, name: "Empresa ABC", email: "contacto@abc.com", phone: "+57 300 123 4567", services: "Desarrollo Web, Ciberseguridad" },
  { id: 2, name: "Corporación XYZ", email: "info@xyz.com", phone: "+57 301 987 6543", services: "Cloud Computing, Consultoría" }
];

export const usersData = [
  { id: 1, name: "Juan Pérez", email: "juan@orbitech.com", role: "Administrador", active: true },
  { id: 2, name: "María García", email: "maria@orbitech.com", role: "Desarrollador", active: true },
  { id: 3, name: "Carlos López", email: "carlos@orbitech.com", role: "Diseñador", active: false }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedService, setSelectedService] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [services, setServices] = useState(servicesData);

  const navigation = {
    home: () => setCurrentPage('home'),
    services: () => setCurrentPage('services'),
    serviceDetail: (service) => {
      setSelectedService(service);
      setCurrentPage('serviceDetail');
    },
    login: () => setCurrentPage('login'),
    admin: () => setCurrentPage('admin'),
    database: () => setCurrentPage('database'),
    logout: () => {
      setIsLoggedIn(false);
      setCurrentPage('home');
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home navigation={navigation} />;
      case 'services':
        return <Services services={services} navigation={navigation} />;
      case 'serviceDetail':
        return <ServiceDetail service={selectedService} navigation={navigation} />;
      case 'login':
        return <Login navigation={navigation} setIsLoggedIn={setIsLoggedIn} />;
      case 'admin':
        return <AdminPanel services={services} setServices={setServices} navigation={navigation} />;
      case 'database':
        return <Database navigation={navigation} />;
      default:
        return <Home navigation={navigation} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header con navegación admin */}
      {isLoggedIn && (
        <div className="bg-primary text-primary-foreground p-2">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4">
              <User className="h-4 w-4" />
              <span className="text-sm">Panel de Administrador</span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={navigation.admin}
                className="text-primary-foreground hover:bg-primary/80"
              >
                Gestión de Servicios
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={navigation.database}
                className="text-primary-foreground hover:bg-primary/80"
              >
                Base de Datos
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={navigation.logout}
                className="text-primary-foreground hover:bg-primary/80"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {renderPage()}
    </div>
  );
}