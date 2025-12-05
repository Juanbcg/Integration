import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Star } from 'lucide-react';

export function Services({ services, navigation }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={navigation.home}
              className="text-primary-foreground hover:bg-primary/80"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al Inicio
            </Button>
          </div>
          <h1 className="text-3xl md:text-4xl">Nuestros Servicios</h1>
          <p className="text-lg mt-2 opacity-90">
            Descubre nuestra amplia gama de servicios tecnológicos
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card
              key={service.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
            >
              <CardHeader className="p-0">
                {service.promotion && (
                  <Badge className="m-3 bg-destructive text-destructive-foreground inline-flex items-center">
                    <Star className="h-3 w-3 mr-1" />
                    Promoción
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="mb-3">{service.name}</CardTitle>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl text-primary">{service.price}</span>
                  <span className="text-sm text-muted-foreground">
                    {service.quantity} disponibles
                  </span>
                </div>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {service.description}
                </p>
                <Button
                  onClick={() => navigation.serviceDetail(service)}
                  className="w-full"
                >
                  Ver Detalles
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl mb-4">¿Necesitas una solución personalizada?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Nuestro equipo de expertos puede desarrollar una solución a medida para las necesidades específicas de tu empresa
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">Contactar Ahora</Button>
            <Button variant="outline" size="lg" onClick={navigation.home}>
              Volver al Inicio
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
