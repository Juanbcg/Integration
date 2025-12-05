import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Plus, Edit, Trash2, Eye, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function AdminPanel({ services, setServices, navigation }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    quantity: '',
    description: '',
    promotion: false
  });

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      image: '',
      quantity: '',
      description: '',
      promotion: false
    });
    setEditingService(null);
  };

  const handleOpenDialog = (service = null) => {
    if (service) {
      setEditingService(service);
      setFormData({
        name: service.name,
        price: service.price,
        image: service.image,
        quantity: service.quantity.toString(),
        description: service.description,
        promotion: service.promotion
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const serviceData = {
      ...formData,
      quantity: parseInt(formData.quantity),
      id: editingService ? editingService.id : Math.max(...services.map(s => s.id)) + 1
    };

    if (editingService) {
      setServices(services.map(service => 
        service.id === editingService.id ? serviceData : service
      ));
    } else {
      setServices([...services, serviceData]);
    }

    handleCloseDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este servicio?')) {
      setServices(services.filter(service => service.id !== id));
    }
  };

  const togglePromotion = (id) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, promotion: !service.promotion } : service
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl">Gestión de Servicios</h1>
            <p className="text-muted-foreground mt-2">
              Administra los servicios de ORBITECH SAS
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Servicio
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingService ? 'Editar Servicio' : 'Nuevo Servicio'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre del Servicio</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Precio</Label>
                    <Input
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="$0,000,000"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">URL de la Imagen</Label>
                  <Input
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://..."
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Cantidad Disponible</Label>
                    <Input
                      id="quantity"
                      name="quantity"
                      type="number"
                      value={formData.quantity}
                      onChange={handleChange}
                      min="0"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="promotion">En Promoción</Label>
                    <div className="flex items-center space-x-2 mt-2">
                      <Switch
                        id="promotion"
                        name="promotion"
                        checked={formData.promotion}
                        onCheckedChange={(checked) => 
                          setFormData({ ...formData, promotion: checked })
                        }
                      />
                      <Label htmlFor="promotion" className="text-sm">
                        {formData.promotion ? 'Sí' : 'No'}
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    required
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={handleCloseDialog}>
                    Cancelar
                  </Button>
                  <Button type="submit">
                    {editingService ? 'Actualizar' : 'Crear'} Servicio
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Services Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Servicios ({services.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Imagen</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell>
                        <ImageWithFallback
                          src={service.image}
                          alt={service.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{service.name}</div>
                          <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                            {service.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{service.price}</TableCell>
                      <TableCell>
                        <Badge variant={service.quantity > 10 ? "default" : service.quantity > 0 ? "secondary" : "destructive"}>
                          {service.quantity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {service.promotion && (
                            <Badge variant="destructive" className="text-xs">
                              <Star className="h-3 w-3 mr-1" />
                              Promoción
                            </Badge>
                          )}
                          <Switch
                            checked={service.promotion}
                            onCheckedChange={() => togglePromotion(service.id)}
                            size="sm"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => navigation.serviceDetail(service)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleOpenDialog(service)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(service.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl">{services.length}</div>
              <p className="text-sm text-muted-foreground">Total Servicios</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl">
                {services.filter(s => s.promotion).length}
              </div>
              <p className="text-sm text-muted-foreground">En Promoción</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl">
                {services.reduce((total, service) => total + service.quantity, 0)}
              </div>
              <p className="text-sm text-muted-foreground">Disponibles</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl">
                {services.filter(s => s.quantity === 0).length}
              </div>
              <p className="text-sm text-muted-foreground">Agotados</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}