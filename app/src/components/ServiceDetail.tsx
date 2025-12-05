
import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Star, Package, CheckCircle, Phone, Mail } from 'lucide-react';

export function ServiceDetail({ service, navigation }) {
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Servicio no encontrado</h2>
          <Button onClick={navigation.services}>Volver a Servicios</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={navigation.services}
              className="text-primary-foreground hover:bg-primary/80"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Servicios
            </Button>
          </div>
          <h1 className="text-3xl md:text-4xl">{service.name}</h1>
          {service.promotion && (
            <Badge className="mt-2 bg-destructive text-destructive-foreground">
              <Star className="h-3 w-3 mr-1" />
              En Promoción
            </Badge>
          )}
        </div>
      </div>

      {/* Service Detail */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Details */}
          <div>
            <div className="mb-8">
              <h2 className="text-3xl mb-4">{service.name}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Price and Availability */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg mb-2">Precio</h3>
                    <p className="text-3xl text-primary">{service.price}</p>
                    {service.promotion && (
                      <p className="text-sm text-destructive mt-1">
                        ¡Precio especial de promoción!
                      </p>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg mb-2 flex items-center">
                      <Package className="h-5 w-5 mr-2" />
                      Disponibilidad
                    </h3>
                    <p className="text-2xl">{service.quantity}</p>
                    <p className="text-sm text-muted-foreground">
                      servicios disponibles
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <h3 className="text-lg mb-4">¿Qué incluye este servicio?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Consultoría inicial y análisis de requerimientos</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Desarrollo e implementación personalizada</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Documentación técnica completa</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Capacitación del personal</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Soporte técnico durante 6 meses</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Garantía de calidad y funcionamiento</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Contact Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="flex-1">
                <Phone className="h-4 w-4 mr-2" />
                Llamar Ahora
              </Button>
              <Button variant="outline" size="lg" className="flex-1">
                <Mail className="h-4 w-4 mr-2" />
                Enviar Email
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16">
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl mb-6">Información Adicional</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg mb-3">Tiempo de Entrega</h4>
                  <p className="text-muted-foreground">
                    El tiempo de entrega depende de la complejidad del proyecto. 
                    Típicamente entre 2-8 semanas después de la firma del contrato.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg mb-3">Proceso de Trabajo</h4>
                  <p className="text-muted-foreground">
                    Seguimos metodologías ágiles con entregas incrementales 
                    y retroalimentación constante del cliente.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg mb-3">Tecnologías</h4>
                  <p className="text-muted-foreground">
                    Utilizamos las últimas tecnologías y herramientas del mercado 
                    para garantizar soluciones modernas y escalables.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg mb-3">Soporte Post-Entrega</h4>
                  <p className="text-muted-foreground">
                    Incluimos 6 meses de soporte técnico gratuito y mantenimiento 
                    básico para asegurar el correcto funcionamiento.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

