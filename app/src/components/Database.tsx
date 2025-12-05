import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Search, Users, Database as DatabaseIcon, Package, Download, Filter } from 'lucide-react';
import { clientsData, usersData } from '../App';

export function Database({ navigation }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('clients');

  // Get services from parent component context (mock data for now)
  const servicesData = [
    { id: 1, name: "Desarrollo de Software", category: "Desarrollo", status: "Activo", clients: 12 },
    { id: 2, name: "Computación en la Nube", category: "Infraestructura", status: "Activo", clients: 8 },
    { id: 3, name: "Ciberseguridad", category: "Seguridad", status: "Activo", clients: 15 },
    { id: 4, name: "Diseño Web", category: "Desarrollo", status: "Activo", clients: 20 },
    { id: 5, name: "Desarrollo Móvil", category: "Desarrollo", status: "Activo", clients: 10 },
    { id: 6, name: "Gestión de Bases de Datos", category: "Infraestructura", status: "Activo", clients: 6 },
    { id: 7, name: "Marketing Digital", category: "Marketing", status: "Activo", clients: 25 },
    { id: 8, name: "Consultoría Tecnológica", category: "Consultoría", status: "Activo", clients: 18 },
    { id: 9, name: "Soporte IT", category: "Soporte", status: "Activo", clients: 30 },
    { id: 10, name: "Automatización de Procesos", category: "Automatización", status: "Activo", clients: 5 }
  ];

  const filteredClients = clientsData.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = usersData.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredServices = servicesData.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl flex items-center">
              <DatabaseIcon className="h-8 w-8 mr-3" />
              Base de Datos
            </h1>
            <p className="text-muted-foreground mt-2">
              Consulta la información de clientes, usuarios y servicios
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => window.print()}>
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Database Tables */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-fit">
            <TabsTrigger value="clients">Clientes</TabsTrigger>
            <TabsTrigger value="users">Usuarios</TabsTrigger>
            <TabsTrigger value="services">Servicios</TabsTrigger>
          </TabsList>

          {/* Clients Table */}
          <TabsContent value="clients">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Clientes ({filteredClients.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Teléfono</TableHead>
                        <TableHead>Servicios Contratados</TableHead>
                        <TableHead>Estado</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredClients.map((client) => (
                        <TableRow key={client.id}>
                          <TableCell className="font-medium">{client.id}</TableCell>
                          <TableCell>{client.name}</TableCell>
                          <TableCell>{client.email}</TableCell>
                          <TableCell>{client.phone}</TableCell>
                          <TableCell>
                            <div className="max-w-[200px] truncate">
                              {client.services}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="default">Activo</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Table */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Usuarios del Sistema ({filteredUsers.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Rol</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Última Conexión</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.id}</TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant={user.role === 'Administrador' ? 'default' : 'secondary'}>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={user.active ? 'default' : 'destructive'}>
                              {user.active ? 'Activo' : 'Inactivo'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {user.active ? 'Hace 2 horas' : 'Hace 3 días'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Table */}
          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Servicios ({filteredServices.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nombre del Servicio</TableHead>
                        <TableHead>Categoría</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Clientes</TableHead>
                        <TableHead>Fecha Creación</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredServices.map((service) => (
                        <TableRow key={service.id}>
                          <TableCell className="font-medium">{service.id}</TableCell>
                          <TableCell>{service.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{service.category}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="default">{service.status}</Badge>
                          </TableCell>
                          <TableCell>{service.clients}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            2024-01-15
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl">{clientsData.length}</div>
                  <p className="text-sm text-muted-foreground">Total Clientes</p>
                </div>
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl">{usersData.filter(u => u.active).length}</div>
                  <p className="text-sm text-muted-foreground">Usuarios Activos</p>
                </div>
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl">{servicesData.length}</div>
                  <p className="text-sm text-muted-foreground">Servicios Disponibles</p>
                </div>
                <Package className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl">
                    {servicesData.reduce((total, service) => total + service.clients, 0)}
                  </div>
                  <p className="text-sm text-muted-foreground">Contratos Activos</p>
                </div>
                <DatabaseIcon className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Database Schema Info */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Información del Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-lg mb-2">Tabla Clientes</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• ID (Primary Key)</li>
                  <li>• Nombre</li>
                  <li>• Email</li>
                  <li>• Teléfono</li>
                  <li>• Servicios Contratados</li>
                  <li>• Fecha de Registro</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg mb-2">Tabla Usuarios</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• ID (Primary Key)</li>
                  <li>• Nombre</li>
                  <li>• Email</li>
                  <li>• Rol</li>
                  <li>• Estado</li>
                  <li>• Última Conexión</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg mb-2">Tabla Servicios</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• ID (Primary Key)</li>
                  <li>• Nombre</li>
                  <li>• Categoría</li>
                  <li>• Precio</li>
                  <li>• Descripción</li>
                  <li>• Fecha de Creación</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}