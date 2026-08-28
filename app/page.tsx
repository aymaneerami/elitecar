'use client';

import { useState } from 'react';

export default function Home() {
  // Zidna had state hna bach n3rfo wesh l'menu dial mobile mhloul wla la
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    carType: '',
    carModel: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const carModels: Record<string, string[]> = {
    audi: ['A1', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q2', 'Q3', 'Q5', 'Q7', 'Q8', 'e-tron', 'TT', 'R8'],
    bmw: ['1 Series', '2 Series', '3 Series', '4 Series', '5 Series', '7 Series', '8 Series', 'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'Z4', 'i3', 'i4', 'i7', 'i8', 'M Series'],
    mercedes: ['A-Class', 'B-Class', 'C-Class', 'E-Class', 'S-Class', 'CLA', 'CLS', 'GLA', 'GLB', 'GLC', 'GLE', 'GLS', 'G-Class', 'EQC', 'EQE', 'EQS', 'AMG GT', 'SL', 'SLK'],
    volkswagen: ['Polo', 'Golf', 'Jetta', 'Passat', 'Arteon', 'Tiguan', 'Touareg', 'Atlas', 'ID.3', 'ID.4', 'ID.5', 'ID.7', 'Sharan', 'Touran'],
    toyota: ['Yaris', 'Corolla', 'Camry', 'Avalon', 'RAV4', 'Highlander', '4Runner', 'Land Cruiser', 'Prius', 'C-HR', 'Supra', 'Sienna', 'Tacoma', 'Tundra'],
    honda: ['Civic', 'Accord', 'CR-V', 'HR-V', 'Pilot', 'Passport', 'Odyssey', 'Fit', 'Insight', 'Ridgeline'],
    ford: ['Fiesta', 'Focus', 'Fusion', 'Mustang', 'Escape', 'Edge', 'Explorer', 'Expedition', 'F-150', 'Ranger', 'Bronco', 'Maverick'],
    chevrolet: ['Spark', 'Trax', 'Equinox', 'Blazer', 'Traverse', 'Malibu', 'Camaro', 'Corvette', 'Tahoe', 'Suburban', 'Silverado', 'Colorado'],
    nissan: ['Versa', 'Sentra', 'Altima', 'Maxima', 'Kicks', 'Rogue', 'Pathfinder', 'Murano', 'Armada', 'Frontier', 'Titan', '370Z', 'GT-R', 'Leaf'],
    hyundai: ['Accent', 'Elantra', 'Sonata', 'Ioniq', 'Veloster', 'Venue', 'Kona', 'Tucson', 'Santa Fe', 'Palisade', 'Genesis'],
    kia: ['Rio', 'Forte', 'K5', 'Stinger', 'Seltos', 'Sportage', 'Sorento', 'Telluride', 'Carnival', 'Soul'],
    mazda: ['Mazda2', 'Mazda3', 'Mazda6', 'CX-3', 'CX-5', 'CX-30', 'CX-7', 'CX-9', 'MX-5 Miata'],
    subaru: ['Impreza', 'Legacy', 'Outback', 'Forester', 'Crosstrek', 'Ascent', 'BRZ', 'WRX', 'WRX STI'],
    mitsubishi: ['Mirage', 'Lancer', 'Eclipse Cross', 'Outlander', 'Outlander Sport', 'Ascent'],
    lexus: ['CT', 'ES', 'GS', 'IS', 'LS', 'LC', 'NX', 'UX', 'RX', 'GX', 'LX', 'RC'],
    infiniti: ['Q50', 'Q60', 'Q70', 'QX30', 'QX50', 'QX55', 'QX60', 'QX70', 'QX80'],
    acura: ['ILX', 'TLX', 'RLX', 'NSX', 'RDX', 'MDX', 'Integra'],
    volvo: ['S40', 'S60', 'S90', 'V40', 'V60', 'V90', 'XC40', 'XC60', 'XC90'],
    jaguar: ['XE', 'XF', 'XJ', 'F-Type', 'E-Pace', 'F-Pace', 'I-Pace'],
    'land-rover': ['Evoque', 'Discovery', 'Discovery Sport', 'Range Rover Sport', 'Range Rover', 'Defender'],
    porsche: ['Macan', 'Cayenne', 'Panamera', '911', 'Taycan', 'Boxster', 'Cayman'],
    ferrari: ['Roma', 'Portofino', 'F8 Tributo', 'SF90 Stradale', '812 Superfast', 'GTC4Lusso', 'LaFerrari'],
    lamborghini: ['Huracán', 'Aventador', 'Urus', 'Revuelto'],
    maserati: ['Ghibli', 'Quattroporte', 'Levante', 'Grecale', 'MC20'],
    bugatti: ['Chiron', 'Chiron Sport', 'Divo', 'Centodieci'],
    bentley: ['Continental GT', 'Flying Spur', 'Bentayga'],
    'rolls-royce': ['Phantom', 'Ghost', 'Wraith', 'Dawn', 'Cullinan'],
    'aston-martin': ['Vantage', 'DB11', 'DBS', 'DBX'],
    mclaren: ['570S', '720S', '765LT', 'Artura', 'Speedtail', 'P1'],
    tesla: ['Model 3', 'Model Y', 'Model S', 'Model X', 'Cybertruck', 'Roadster'],
    rivian: ['R1T', 'R1S'],
    lucid: ['Air'],
    peugeot: ['108', '208', '308', '508', '2008', '3008', '5008', 'e-208', 'e-2008'],
    renault: ['Clio', 'Megane', 'Captur', 'Kadjar', 'Austral', 'Arkana', 'Talisman', 'Zoe'],
    citroen: ['C3', 'C4', 'C5 Aircross', 'C3 Aircross', 'e-C4'],
    fiat: ['500', '500X', '500L', 'Panda', 'Punto', 'Tipo'],
    'alfa-romeo': ['Giulia', 'Stelvio', 'Tonale'],
    jeep: ['Renegade', 'Compass', 'Cherokee', 'Grand Cherokee', 'Wrangler', 'Gladiator'],
    ram: ['1500', '2500', '3500'],
    dodge: ['Charger', 'Challenger', 'Durango'],
    chrysler: ['300', 'Pacifica'],
    cadillac: ['CT4', 'CT5', 'XT4', 'XT5', 'XT6', 'Escalade'],
    lincoln: ['Corsair', 'Nautilus', 'Aviator', 'Navigator'],
    buick: ['Encore', 'Envision', 'LaCrosse', 'Enclave'],
    gmc: ['Terrain', 'Acadia', 'Yukon', 'Sierra', 'Canyon'],
    mini: ['Cooper', 'Clubman', 'Countryman'],
    smart: ['Fortwo', 'Forfour'],
    skoda: ['Fabia', 'Scala', 'Octavia', 'Superb', 'Kamiq', 'Karoq', 'Kodiaq', 'Enyaq'],
    seat: ['Ibiza', 'Leon', 'Ateca', 'Arona', 'Tarraco'],
    cupra: ['Leon', 'Formentor', 'Ateca', 'Born', 'Tavascan'],
    ds: ['3 Crossback', '4 Crossback', '7 Crossback', '9'],
    mg: ['ZS', 'HS', 'MG5', 'MG GT'],
    byd: ['Atto 3', 'Han', 'Tang', 'Seal', 'Dolphin'],
    geely: ['Coolray', 'Azkarra', 'Monjaro', 'Tugella'],
    chery: ['Tiggo 7', 'Tiggo 8', 'Omoda 5'],
    'great-wall': ['Haval H6', 'Haval Jolion', 'Wey'],
    haval: ['H6', 'Jolion', 'F7'],
    suzuki: ['Swift', 'Vitara', 'S-Cross', 'Jimny', 'Ignis'],
    daihatsu: ['Sirion', 'Terios', 'Xenia'],
    isuzu: ['D-Max', 'MU-X'],
    mahindra: ['Thar', 'Scorpio', 'XUV700'],
    tata: ['Nexon', 'Harrier', 'Safari', 'Tiago'],
    other: ['Autre']
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', phone: '', email: '', service: '', carType: '', carModel: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <img src="/logo.jpeg" alt="Elitecar Logo" className="h-24" />
          
          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#services" className="hover:text-amber-400 transition-colors">Services</a>
            <a href="#testimonials" className="hover:text-amber-400 transition-colors">Avis</a>
            <a href="#gallery" className="hover:text-amber-400 transition-colors">Galerie</a>
            <a href="#contact" className="hover:text-amber-400 transition-colors">Contact</a>
          </div>
          
          <a href="#contact" className="hidden md:inline-block bg-amber-500 hover:bg-amber-600 text-black px-6 py-2 rounded-full text-sm font-semibold transition-colors">
            Réserver
          </a>

          {/* Bouton Hamburger l Mobile */}
          <button 
            className="md:hidden text-white p-2 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              // X icone fach kaykon mhloul
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger icone fach kaykon msdoud
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* L'Menu dial Mobile li kayhbt (Dropdown) */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-sm border-b border-white/10">
            <div className="flex flex-col px-6 py-6 space-y-6 text-center text-lg">
              <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-amber-400 transition-colors">Services</a>
              <a href="#testimonials" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-amber-400 transition-colors">Avis</a>
              <a href="#gallery" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-amber-400 transition-colors">Galerie</a>
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-amber-400 transition-colors">Contact</a>
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="bg-amber-500 hover:bg-amber-600 text-black px-6 py-3 rounded-full font-semibold transition-colors mx-auto inline-block mt-4">
                Réserver
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black"></div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-20">
          <div className="text-amber-400 text-sm tracking-widest mb-4">Elitecar • Casablanca</div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            La protection absolue<br />
            <span className="text-amber-400">pour votre véhicule d'exception</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            L'exigence du détail, à l'échelle du prestige
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="bg-amber-500 hover:bg-amber-600 text-black px-8 py-4 rounded-full font-semibold transition-colors">
              RÉSERVEZ UNE VISITE
            </a>
            <a href="#services" className="border border-white/30 hover:border-amber-400 px-8 py-4 rounded-full font-semibold transition-colors">
              DÉCOUVRIR LES SERVICES
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>


      {/* Services Section */}
      <section id="services" className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <meta name="kadam-verification" content="kadam97189acb83aa186e02d1eead971ab550" />
              Nos Services</h2>
            <p className="text-gray-400 text-lg">Trois métiers, une obsession : votre voiture</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 justify-center">
            {/* Covering */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-amber-400 transition-colors">
              <div className="text-amber-400 text-3xl mb-4">🎨</div>
              <h3 className="text-2xl font-bold mb-4">Covering & Wraps</h3>
               <p className="text-amber-400 font-bold text-lg mb-4">
    À partir de 5500 DH
  </p>
              <p className="text-gray-400 mb-6">Transformez l'apparence de votre véhicule avec +300 couleurs.</p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Covering économique</li>
                <li>• Covering original</li>
                <li>• Finitions mat & brillant</li>
                <li>• Couleurs sur-mesure</li>
              </ul>
            </div>

            {/* PPF */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-amber-400 transition-colors">
              <div className="text-amber-400 text-3xl mb-4">🛡️</div>
              <h3 className="text-2xl font-bold mb-4">(PPF) Paint Protection Film</h3>
              <p className="text-amber-400 font-bold text-lg mb-4">
    À partir de 17000 DH
  </p>
              <p className="text-gray-400 mb-6">Protection invisible pour votre peinture. Garantie jusqu'à 10 ans.</p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• PPF extérieur</li>
                <li>• PPF intérieur</li>
                <li>• PPF mat & satiné</li>
                <li>• PPF couleur</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-gradient-to-r from-amber-500/10 to-amber-600/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-amber-400 mb-2">5+</div>
              <div className="text-gray-300">Années d'expérience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-400 mb-2">100+</div>
              <div className="text-gray-300">Véhicules traités</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-400 mb-2">100%</div>
              <div className="text-gray-300">Satisfaction client</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Avis de nos clients</h2>
            <p className="text-gray-400 text-lg">Des propriétaires exigeants, des résultats à la hauteur</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Yassine B.", car: "BMW X6", text: "PPF intégral sur mon X6, finition irréprochable. On ne voit absolument pas le film et la peinture est parfaitement protégée." },
              { name: "Karim El Mansouri", car: "Audi A3", text: "Accueil haut de gamme et travail minutieux. Mon Audi A3 est protégée comme un bijou. Je recommande sans hésiter." },
              { name: "Omar T.", car: "VW Touareg", text: "Covering mat sur le Touareg : un rendu incroyable. Pose nette, bords parfaits, aucun défaut. Le showroom est magnifique." },
              { name: "Reda K.", car: "Audi Q3", text: "Réponse rapide sur WhatsApp, rendez-vous facile à organiser. Polissage + céramique au top, la carrosserie brille comme jamais." },
              { name: "Mehdi A.", car: "Mercedes", text: "Vitres teintées et PPF avant sur ma Mercedes. Travail propre, conseils honnêtes, prix transparents. Une vraie référence à Casablanca." },
              { name: "Sofia L.", car: "Seat", text: "Covering complet de ma Seat, couleur sur-mesure. L'aperçu envoyé avant la pose m'a permis de choisir sereinement. Résultat magnifique." }
            ].map((testimonial, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-amber-400 transition-colors">
                <div className="text-amber-400 mb-4">★★★★★</div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.car}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showroom */}
      <section className="py-24 px-6 bg-gradient-to-b from-black to-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Notre Showroom</h2>
            <p className="text-gray-400 text-lg">Un environnement pensé pour les voitures d'exception</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-amber-400">Adresse</h3>
                <p className="text-gray-300 mb-6">
                  Maroc • Casablanca<br />
                  Ain chock
                  Elite car
                </p>

                <h3 className="text-2xl font-bold mb-6 text-amber-400">Horaires</h3>
                <p className="text-gray-300 mb-6">
                  Lun – Sam<br />
                  10h00 – 21h00
                </p>

                <a 
                  href="https://maps.app.goo.gl/dAC17Zqv9E4VhDFA8" 
                  target="_blank"
                  className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-black px-6 py-3 rounded-full font-semibold transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Itinéraire
                </a>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl aspect-video overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3325.0650027756133!2d-7.5907132!3d33.5516874!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda633b55b7eba0b%3A0xa9e0ae6fbba00dd9!2sElite%20car!5e0!3m2!1sfr!2sma!4v1785431162249!5m2!1sfr!2sma"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-32 px-6 bg-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Nos Réalisations</h2>
            <p className="text-gray-400 text-lg">Un aperçu du travail réalisé sur les véhicules de nos clients</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-center">
            {[
              { img: '/audi.jpeg', name: 'Audi' },
              { img: '/bmw.jpeg', name: 'BMW' },
              { img: '/mercedes.jpeg', name: 'Mercedes' },
              { img: '/jeep.jpeg', name: 'Jeep' },
              { img: '/q3.jpeg', name: 'Audi Q3' },
              { img: '/touareg.jpeg', name: 'VW Touareg' },
              { img: '/x6.jpeg', name: 'BMW X6' },
              { img: '/audia3.jpeg', name: 'Audi A3' },
              { img: '/rofix.jpeg', name: 'Rofix' },
              { img: '/siat.jpeg', name: 'Seat' }
            ].map((car, i) => (
              <div key={i} className="aspect-square bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-amber-400 transition-colors cursor-pointer group">
                <img 
                  src={car.img} 
                  alt={car.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-xl text-gray-300 mb-4">Et si la prochaine réalisation, c'était la vôtre ?</p>
            <a href="#contact" className="inline-block bg-amber-500 hover:bg-amber-600 text-black px-8 py-4 rounded-full font-semibold transition-colors">
              Réserver maintenant
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Questions Fréquentes</h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "Comment réserver ?", a: "Contactez-nous via WhatsApp ou remplissez le formulaire de contact. Notre équipe vous rappelle pour confirmer le rendez-vous." },
              { q: "Combien de temps dure la pose ?", a: "Selon le service : PPF complet 2-3 jours, Covering 1-2 jours, Detailing 1 jour." },
              { q: "Quelle est la garantie ?", a: "Garantie jusqu'à 10 ans sur les films PPF certifiés. 1 an sur les travaux de detailing." },
              { q: "Acceptez-vous tous les véhicules ?", a: "Nous spécialisons dans les véhicules de prestige et sportifs. Contactez-nous pour discuter de votre véhicule." }
            ].map((faq, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-2 text-amber-400">{faq.q}</h3>
                <p className="text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 bg-gradient-to-b from-black to-zinc-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Réservez la visite de votre véhicule</h2>
          <p className="text-gray-400 text-lg mb-8">
            Choisissez un créneau : notre équipe vous rappelle pour confirmer et vous conseiller.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a 
              href="https://wa.me/212718457554?text=Bonjour%20Elitecar,%20je%20souhaite%20avoir%20des%20informations%20et%20prendre%20rendez-vous."
              target="_blank"
              className="inline-flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-black px-8 py-4 rounded-full font-semibold transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="grid md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Nom complet" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-amber-400 focus:outline-none" 
                  required
                />
                <input 
                  type="tel" 
                  placeholder="Téléphone" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-amber-400 focus:outline-none" 
                />
              </div>
              <input 
                type="email" 
                placeholder="Email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-amber-400 focus:outline-none" 
                required
              />
              <select 
                value={formData.service}
                onChange={(e) => setFormData({...formData, service: e.target.value})}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-gray-300 focus:border-amber-400 focus:outline-none"
                style={{ color: '#d1d5db' }}
              >
                <option value="" style={{ color: '#000' }}>Service souhaité</option>
                <option value="ppf" style={{ color: '#000' }}>Paint Protection Film (PPF)</option>
                <option value="covering" style={{ color: '#000' }}>Covering & Wraps</option>
                <option value="other" style={{ color: '#000' }}>Autre</option>
              </select>
              <select 
                value={formData.carType}
                onChange={(e) => {
                  setFormData({...formData, carType: e.target.value, carModel: ''});
                }}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-gray-300 focus:border-amber-400 focus:outline-none"
                style={{ color: '#d1d5db' }}
              >
                <option value="" style={{ color: '#000' }}>Type de véhicule</option>
                <option value="audi" style={{ color: '#000' }}>Audi</option>
                <option value="bmw" style={{ color: '#000' }}>BMW</option>
                <option value="mercedes" style={{ color: '#000' }}>Mercedes-Benz</option>
                <option value="volkswagen" style={{ color: '#000' }}>Volkswagen</option>
                <option value="toyota" style={{ color: '#000' }}>Toyota</option>
                <option value="honda" style={{ color: '#000' }}>Honda</option>
                <option value="ford" style={{ color: '#000' }}>Ford</option>
                <option value="chevrolet" style={{ color: '#000' }}>Chevrolet</option>
                <option value="nissan" style={{ color: '#000' }}>Nissan</option>
                <option value="hyundai" style={{ color: '#000' }}>Hyundai</option>
                <option value="kia" style={{ color: '#000' }}>Kia</option>
                <option value="mazda" style={{ color: '#000' }}>Mazda</option>
                <option value="subaru" style={{ color: '#000' }}>Subaru</option>
                <option value="mitsubishi" style={{ color: '#000' }}>Mitsubishi</option>
                <option value="lexus" style={{ color: '#000' }}>Lexus</option>
                <option value="infiniti" style={{ color: '#000' }}>Infiniti</option>
                <option value="acura" style={{ color: '#000' }}>Acura</option>
                <option value="volvo" style={{ color: '#000' }}>Volvo</option>
                <option value="jaguar" style={{ color: '#000' }}>Jaguar</option>
                <option value="land-rover" style={{ color: '#000' }}>Land Rover</option>
                <option value="porsche" style={{ color: '#000' }}>Porsche</option>
                <option value="ferrari" style={{ color: '#000' }}>Ferrari</option>
                <option value="lamborghini" style={{ color: '#000' }}>Lamborghini</option>
                <option value="maserati" style={{ color: '#000' }}>Maserati</option>
                <option value="bugatti" style={{ color: '#000' }}>Bugatti</option>
                <option value="bentley" style={{ color: '#000' }}>Bentley</option>
                <option value="rolls-royce" style={{ color: '#000' }}>Rolls-Royce</option>
                <option value="aston-martin" style={{ color: '#000' }}>Aston Martin</option>
                <option value="mclaren" style={{ color: '#000' }}>McLaren</option>
                <option value="tesla" style={{ color: '#000' }}>Tesla</option>
                <option value="rivian" style={{ color: '#000' }}>Rivian</option>
                <option value="lucid" style={{ color: '#000' }}>Lucid</option>
                <option value="peugeot" style={{ color: '#000' }}>Peugeot</option>
                <option value="renault" style={{ color: '#000' }}>Renault</option>
                <option value="citroen" style={{ color: '#000' }}>Citroën</option>
                <option value="fiat" style={{ color: '#000' }}>Fiat</option>
                <option value="alfa-romeo" style={{ color: '#000' }}>Alfa Romeo</option>
                <option value="ferrari" style={{ color: '#000' }}>Ferrari</option>
                <option value="jeep" style={{ color: '#000' }}>Jeep</option>
                <option value="ram" style={{ color: '#000' }}>RAM</option>
                <option value="dodge" style={{ color: '#000' }}>Dodge</option>
                <option value="chrysler" style={{ color: '#000' }}>Chrysler</option>
                <option value="cadillac" style={{ color: '#000' }}>Cadillac</option>
                <option value="lincoln" style={{ color: '#000' }}>Lincoln</option>
                <option value="buick" style={{ color: '#000' }}>Buick</option>
                <option value="gmc" style={{ color: '#000' }}>GMC</option>
                <option value="mini" style={{ color: '#000' }}>MINI</option>
                <option value="smart" style={{ color: '#000' }}>Smart</option>
                <option value="skoda" style={{ color: '#000' }}>Škoda</option>
                <option value="seat" style={{ color: '#000' }}>Seat</option>
                <option value="cupra" style={{ color: '#000' }}>Cupra</option>
                <option value="ds" style={{ color: '#000' }}>DS Automobiles</option>
                <option value="mg" style={{ color: '#000' }}>MG</option>
                <option value="byd" style={{ color: '#000' }}>BYD</option>
                <option value="geely" style={{ color: '#000' }}>Geely</option>
                <option value="chery" style={{ color: '#000' }}>Chery</option>
                <option value="great-wall" style={{ color: '#000' }}>Great Wall</option>
                <option value="haval" style={{ color: '#000' }}>Haval</option>
                <option value="suzuki" style={{ color: '#000' }}>Suzuki</option>
                <option value="daihatsu" style={{ color: '#000' }}>Daihatsu</option>
                <option value="isuzu" style={{ color: '#000' }}>Isuzu</option>
                <option value="mahindra" style={{ color: '#000' }}>Mahindra</option>
                <option value="tata" style={{ color: '#000' }}>Tata</option>
                <option value="other" style={{ color: '#000' }}>Autre</option>
              </select>
              {formData.carType && (
                <select 
                  value={formData.carModel}
                  onChange={(e) => setFormData({...formData, carModel: e.target.value})}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-gray-300 focus:border-amber-400 focus:outline-none"
                  style={{ color: '#d1d5db' }}
                >
                  <option value="" style={{ color: '#000' }}>Modèle de véhicule</option>
                  {carModels[formData.carType]?.map((model) => (
                    <option key={model} value={model} style={{ color: '#000' }}>{model}</option>
                  ))}
                </select>
              )}
              <textarea 
                placeholder="Message" 
                rows={4} 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-amber-400 focus:outline-none"
                required
              ></textarea>
              
              {submitStatus === 'success' && (
                <div className="bg-green-500/20 border border-green-500 text-green-400 px-4 py-3 rounded-lg">
                  Message envoyé avec succès !
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
                  Erreur lors de l'envoi. Veuillez réessayer.
                </div>
              )}
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-amber-500 hover:bg-amber-600 text-black py-4 rounded-full font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <img src="/logo.jpeg" alt="Elitecar Logo" className="h-24 mb-4" />
              <p className="text-gray-400 text-sm">
                Protection PPF et covering  haut de gamme pour véhicules d'exception à Casablanca.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#services" className="hover:text-amber-400 transition-colors">PPF</a></li>
                <li><a href="#services" className="hover:text-amber-400 transition-colors">Covering</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Informations</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#testimonials" className="hover:text-amber-400 transition-colors">Avis</a></li>
                <li><a href="#gallery" className="hover:text-amber-400 transition-colors">Galerie</a></li>
                <li><a href="#contact" className="hover:text-amber-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Casablanca, Maroc</li>
                <li>+212 718 457 554</li>
                <li>elitecar485@gmail.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-500">
            &copy; 2024 Elitecar. Tous droits réservés.
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/212718457554?text=Bonjour%20Elitecar,%20je%20souhaite%20avoir%20des%20informations%20et%20prendre%20rendez-vous."
        target="_blank"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 z-50"
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}