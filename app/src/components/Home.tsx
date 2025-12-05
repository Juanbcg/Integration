import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ChevronLeft, ChevronRight, Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const sliderImages = [
  {
    url: "https://images.unsplash.com/photo-1731311980517-6da77a29f7a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwb2ZmaWNlJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzU3MjUxODIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Tecnología de Vanguardia",
    description: "Soluciones innovadoras para tu empresa"
  },
  {
    url: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwdGVhbXxlbnwxfHx8fDE3NTcyNDU4Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Desarrollo Profesional",
    description: "Equipo experto en desarrollo de software"
  },
  {
    url: "https://images.unsplash.com/photo-1667984390538-3dea7a3fe33d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMGNvbXB1dGluZ3xlbnwxfHx8fDE3NTcyMzk5MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Computación en la Nube",
    description: "Infraestructura escalable y segura"
  }
];

export function Home({ navigation }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-lg border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary">ORBITECH SAS</h1>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={navigation.home} className="text-foreground hover:text-primary transition-colors">
                Inicio
              </button>
              <button onClick={navigation.services} className="text-foreground hover:text-primary transition-colors">
                Servicios
              </button>
              <button onClick={navigation.login} className="text-foreground hover:text-primary transition-colors">
                Admin
              </button>
              <Button onClick={navigation.services}>Contacto</Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-foreground hover:text-primary"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button onClick={() => { navigation.home(); setIsMenuOpen(false); }} className="block px-3 py-2 text-foreground hover:text-primary">
                  Inicio
                </button>
                <button onClick={() => { navigation.services(); setIsMenuOpen(false); }} className="block px-3 py-2 text-foreground hover:text-primary">
                  Servicios
                </button>
                <button onClick={() => { navigation.login(); setIsMenuOpen(false); }} className="block px-3 py-2 text-foreground hover:text-primary">
                  Admin
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Slider */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        {sliderImages.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <ImageWithFallback
              src={slide.url}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h2 className="text-4xl md:text-6xl mb-4">{slide.title}</h2>
                <p className="text-xl md:text-2xl mb-8">{slide.description}</p>
                <Button 
                  size="lg" 
                  onClick={navigation.services}
                  className="bg-primary hover:bg-primary/90"
                >
                  Ver Servicios
                </Button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 text-white transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 text-white transition-colors"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Slider Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {sliderImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Company Description */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl mb-8">ORBITECH SAS</h2>
            <p className="text-lg leading-relaxed mb-8">
              Somos una empresa de servicios tecnológicos líder en Colombia, especializada en brindar 
              soluciones innovadoras y de alta calidad para empresas de todos los tamaños. Con más de 
              10 años de experiencia en el mercado, nos dedicamos al desarrollo de software, 
              ciberseguridad, computación en la nube y consultoría tecnológica.
            </p>
            <p className="text-lg leading-relaxed mb-8">
              Nuestro equipo de profesionales altamente capacitados está comprometido con la excelencia 
              y la satisfacción del cliente, ofreciendo servicios personalizados que impulsan el 
              crecimiento y la transformación digital de su organización.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl mb-4">Innovación</h3>
                  <p>Utilizamos las últimas tecnologías para crear soluciones vanguardistas</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl mb-4">Calidad</h3>
                  <p>Garantizamos la más alta calidad en todos nuestros proyectos</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl mb-4">Soporte</h3>
                  <p>Ofrecemos soporte 24/7 para asegurar el éxito de su proyecto</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl mb-4">ORBITECH SAS</h3>
              <p className="mb-4">
                Empresa líder en servicios tecnológicos y desarrollo de software
              </p>
              <p className="text-sm">NIT 850.523.965-1</p>
            </div>
            
            <div>
              <h4 className="text-lg mb-4">Contacto</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-sm">Av 80 #150-32</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-sm">Bogotá DC</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span className="text-sm">+57 (1) 234 5678</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <span className="text-sm">info@orbitech.com</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg mb-4">Servicios</h4>
              <ul className="space-y-2 text-sm">
                <li>Desarrollo de Software</li>
                <li>Ciberseguridad</li>
                <li>Computación en la Nube</li>
                <li>Consultoría Tecnológica</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button className="hover:underline">Política de Privacidad</button>
                </li>
                <li>
                  <button className="hover:underline">Términos y Condiciones</button>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2024 ORBITECH SAS. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}