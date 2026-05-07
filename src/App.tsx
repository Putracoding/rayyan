/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Globe, 
  History, 
  Flag, 
  FlagOff, 
  Users, 
  GraduationCap, 
  Briefcase, 
  ChevronRight, 
  Search, 
  Menu, 
  X,
  Target,
  Shield,
  Zap,
  Globe2,
  BookOpen,
  ArrowRight
} from 'lucide-react';

// Types
interface Country {
  name: string;
  code: string;
  flag: string;
  capital: string;
}

interface Conflict {
  title: string;
  year: string;
  description: string;
  details: string;
}

interface Organization {
  name: string;
  abbr: string;
  founded: string;
  description: string;
  icon: React.JSX.Element;
}

// Data
const COUNTRIES: Country[] = [
  { name: "Indonesia", code: "ID", flag: "🇮🇩", capital: "Jakarta" },
  { name: "United States", code: "US", flag: "🇺🇸", capital: "Washington, D.C." },
  { name: "China", code: "CN", flag: "🇨🇳", capital: "Beijing" },
  { name: "Russia", code: "RU", flag: "🇷🇺", capital: "Moscow" },
  { name: "Japan", code: "JP", flag: "🇯🇵", capital: "Tokyo" },
  { name: "Germany", code: "DE", flag: "🇩🇪", capital: "Berlin" },
  { name: "United Kingdom", code: "GB", flag: "🇬🇧", capital: "London" },
  { name: "France", code: "FR", flag: "🇫🇷", capital: "Paris" },
  { name: "India", code: "IN", flag: "🇮🇳", capital: "New Delhi" },
  { name: "Brazil", code: "BR", flag: "🇧🇷", capital: "Brasília" },
  { name: "Australia", code: "AU", flag: "🇦🇺", capital: "Canberra" },
  { name: "South Africa", code: "ZA", flag: "🇿🇦", capital: "Pretoria" },
  { name: "Turkey", code: "TR", flag: "🇹🇷", capital: "Ankara" },
  { name: "Saudi Arabia", code: "SA", flag: "🇸🇦", capital: "Riyadh" },
  { name: "South Korea", code: "KR", flag: "🇰🇷", capital: "Seoul" },
];

const CONFLICTS: Conflict[] = [
  {
    title: "Perang Dunia I",
    year: "1914 - 1918",
    description: "Konflik global yang mengubah peta politik dunia dan mengakhiri era kekaisaran besar.",
    details: "Dipicu oleh pembunuhan Archduke Franz Ferdinand, melibatkan Sekutu (Inggris, Perancis, Rusia) melawan Blok Sentral (Jerman, Austria-Hongaria, Ottoman)."
  },
  {
    title: "Perang Dunia II",
    year: "1939 - 1945",
    description: "Perang paling mematikan dalam sejarah manusia, melibatkan hampir setiap negara di dunia.",
    details: "Pertempuran antara Blok Poros (Jerman, Italia, Jepang) dan Sekutu. Berakhir dengan kekalahan total fasisme dan terbentuknya PBB."
  },
  {
    title: "Perang Dingin",
    year: "1947 - 1991",
    description: "Ketegangan geopolitik antara Amerika Serikat dan Uni Soviet beserta sekutu masing-masing.",
    details: "Ditandai dengan persaingan ideologi, perlombaan senjata nuklir, dan perang proksi tanpa konflik militer langsung antar kekuatan besar."
  },
  {
    title: "Konflik Modern Internasional",
    year: "Abad 21",
    description: "Ketegangan baru yang melibatkan keamanan siber, perdagangan, dan kedaulatan wilayah.",
    details: "Termasuk konflik Rusia-Ukraina, ketegangan di Laut Cina Selatan, dan pergeseran kekuatan ekonomi global menuju multipolaritas."
  }
];

const ORGANIZATIONS: Organization[] = [
  {
    name: "United Nations",
    abbr: "PBB",
    founded: "1945",
    description: "Organisasi internasional terbesar yang bertujuan menjaga perdamaian dan keamanan dunia.",
    icon: <Globe className="w-6 h-6 text-blue-500" />
  },
  {
    name: "Association of Southeast Asian Nations",
    abbr: "ASEAN",
    founded: "1967",
    description: "Kerjasama regional negara-negara Asia Tenggara dalam bidang ekonomi dan geopolitik.",
    icon: <Users className="w-6 h-6 text-red-500" />
  },
  {
    name: "North Atlantic Treaty Organization",
    abbr: "NATO",
    founded: "1949",
    description: "Aliansi pertahanan militer antar negara-negara Amerika Utara dan Eropa.",
    icon: <Shield className="w-6 h-6 text-indigo-500" />
  },
  {
    name: "European Union",
    abbr: "EU",
    founded: "1993",
    description: "Kesatuan politik dan ekonomi unik dari 27 negara anggota di Eropa.",
    icon: <Zap className="w-6 h-6 text-yellow-500" />
  }
];

const CAREERS = [
  { title: "Diplomat", desc: "Mewakili kepentingan negara di luar negeri dan menegosiasikan perjanjian." },
  { title: "Analis Intelijen", desc: "Menganalisis data global untuk mengidentifikasi ancaman keamanan." },
  { title: "Konsultan Internasional", desc: "Membantu perusahaan atau NGO beroperasi melintasi batas negara." },
  { title: "Jurnalis Hubungan Luar Negeri", desc: "Melaporkan perkembangan politik dan sosial dari berbagai penjuru dunia." },
  { title: "Spesialis Organisasi Internasional", desc: "Bekerja di PBB, World Bank, atau NGO global lainnya." }
];

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('theory');
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  const filteredCountries = COUNTRIES.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.capital.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-prestige-cream font-sans text-prestige-ink overflow-x-hidden" ref={containerRef}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-prestige-cream/80 backdrop-blur-md border-b border-prestige-ink/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-prestige-ink rounded-full flex items-center justify-center">
              <Globe2 className="text-prestige-cream w-6 h-6" />
            </div>
            <span className="font-serif-display text-2xl font-bold tracking-tight">Diplomatica</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {['Teori', 'Konflik', 'Negara', 'Organisasi', 'Karir'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium uppercase tracking-widest hover:text-prestige-gold transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-prestige-cream flex flex-col items-center justify-center gap-8 md:hidden pt-20"
          >
            {['Teori', 'Konflik', 'Negara', 'Organisasi', 'Karir'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="font-serif-display text-4xl hover:text-prestige-gold transition-colors"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden pt-20">
        <motion.div 
          style={{ opacity }}
          className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,#e5e7eb_0%,transparent_50%)] opacity-30" 
        />
        
        <div className="relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1 border border-prestige-ink/20 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              Gerbang Menuju Pemahaman Global
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-9xl mb-8 leading-[0.9]">
              Memahami <br />
              <span className="italic text-prestige-gold drop-shadow-sm">Dunia Kita</span>
            </h1>
            <p className="text-lg md:text-xl text-prestige-charcoal/80 max-w-2xl mx-auto mb-10 font-serif-cormorant italic leading-relaxed">
              "Kekuatan tanpa keadilan adalah tirani; keadilan tanpa kekuatan adalah ketidakberdayaan." — Blaise Pascal
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="px-8 py-4 bg-prestige-ink text-prestige-cream flex items-center gap-2 hover:bg-prestige-gold transition-all duration-300 group">
                Mulai Eksplorasi <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 border border-prestige-ink text-prestige-ink hover:bg-prestige-ink hover:text-prestige-cream transition-all duration-300">
                Tentang HI
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Scroll Down</span>
          <div className="w-px h-16 bg-gradient-to-b from-prestige-ink to-transparent" />
        </motion.div>
      </section>

      {/* Theory Section */}
      <section id="teori" className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-prestige-gold font-bold uppercase tracking-widest text-xs">Pondasi Dasar</span>
              <h2 className="text-5xl md:text-6xl mt-4 mb-8">Apa Itu Hubungan Internasional?</h2>
              <div className="space-y-6 text-lg leading-relaxed text-prestige-charcoal">
                <p>
                  Hubungan Internasional (HI) adalah studi tentang interaksi antara negara-negara, organisasi non-pemerintah, dan aktor global lainnya. Ini mencakup segala hal mulai dari diplomasi dan konflik hingga perdagangan, hak asasi manusia, dan perubahan iklim.
                </p>
                <p>
                  Dalam jurusan ini, mahasiswa mempelajari bagaimana kekuatan didistribusikan secara global, bagaimana hukum internasional mengatur perilaku negara, dan bagaimana institusi global mencoba menyelesaikan tantangan yang tidak bisa diatasi oleh satu negara sendirian.
                </p>
              </div>
              <div className="mt-10 grid grid-cols-2 gap-8">
                {[
                  { label: "Analisis Politik", icon: <Target className="w-5 h-5" /> },
                  { label: "Hukum Global", icon: <Shield className="w-5 h-5" /> },
                  { label: "Ekonomi Dunia", icon: <Briefcase className="w-5 h-5" /> },
                  { label: "Diplomasi Budaya", icon: <Users className="w-5 h-5" /> },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="p-2 bg-prestige-cream rounded-lg">{item.icon}</div>
                    <span className="font-semibold text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square"
            >
              <div className="absolute inset-0 bg-prestige-gold/10 -rotate-3 transition-transform hover:rotate-0 duration-500 border border-prestige-gold/20" />
              <div className="absolute inset-0 bg-prestige-ink p-12 flex flex-col justify-end text-prestige-cream border border-prestige-ink/10 translate-x-4 translate-y-4 hover:translate-x-0 hover:translate-y-0 transition-transform duration-500">
                <Globe className="w-20 h-20 mb-8 text-prestige-gold" />
                <h3 className="text-4xl mb-4 italic">"Anarchy is what states make of it."</h3>
                <p className="text-sm opacity-60 uppercase tracking-widest">— Alexander Wendt</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Conflict Section */}
      <section id="konflik" className="py-32 px-6 bg-prestige-ink text-prestige-cream">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <History className="w-12 h-12 text-prestige-gold mx-auto mb-6" />
            <h2 className="text-5xl md:text-7xl mb-4">Arsip Konflik Global</h2>
            <p className="text-prestige-cream/60 max-w-2xl mx-auto font-serif-cormorant text-xl italic">
              Memahami masa lalu untuk memprediksi masa depan geopolitik.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {CONFLICTS.map((conflict, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-8 border border-white/10 hover:bg-white hover:text-prestige-ink transition-all duration-500 cursor-pointer"
              >
                <span className="text-[10px] font-bold uppercase tracking-widest text-prestige-gold mb-2 block">{conflict.year}</span>
                <h3 className="text-2xl mb-4 font-serif-display group-hover:italic">{conflict.title}</h3>
                <p className="text-sm opacity-70 group-hover:opacity-100 leading-relaxed mb-6">
                  {conflict.description}
                </p>
                <div className="h-px w-0 group-hover:w-full bg-prestige-ink/20 transition-all duration-500 mb-6" />
                <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                  Detail <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Countries Section */}
      <section id="negara" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
            <div>
              <h2 className="text-5xl md:text-7xl mb-4">Indeks Negara</h2>
              <p className="text-prestige-charcoal/60 font-serif-cormorant text-xl italic">Bendera, Ibukota, dan Hubungan Diplomatik.</p>
            </div>
            <div className="relative w-full md:w-80">
              <input 
                type="text" 
                placeholder="Cari negara atau ibukota..."
                className="w-full bg-transparent border-b-2 border-prestige-ink/10 py-3 pl-2 pr-10 focus:border-prestige-gold outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute right-3 top-3.5 w-5 h-5 text-prestige-ink/30" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country, idx) => (
                  <motion.div
                    key={country.code}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white p-6 border border-prestige-ink/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group rounded-2xl"
                  >
                    <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300 inline-block drop-shadow-md">
                      {country.flag}
                    </div>
                    <h3 className="text-xl font-bold mb-1">{country.name}</h3>
                    <p className="text-xs text-prestige-ink/40 uppercase tracking-widest font-bold mb-4">{country.capital}</p>
                    <div className="flex items-center gap-2 text-xs font-semibold text-prestige-gold uppercase tracking-tighter">
                      Diplomacy Info <ArrowRight className="w-3 h-3" />
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center flex flex-col items-center gap-4 text-prestige-ink/30">
                  <FlagOff className="w-12 h-12" />
                  <p className="font-serif-display text-2xl">Hasil tidak ditemukan</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Organizations Section */}
      <section id="organisasi" className="py-32 px-6 bg-prestige-cream border-y border-prestige-ink/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-prestige-gold font-bold uppercase tracking-widest text-[10px] mb-4 block">International Actors</span>
            <h2 className="text-5xl md:text-6xl mb-4">Organisasi Internasional</h2>
            <div className="w-20 h-1 bg-prestige-gold mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {ORGANIZATIONS.map((org, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-8 p-10 bg-white shadow-[0_4px_30px_rgba(0,0,0,0.02)] border border-white relative overflow-hidden group rounded-3xl"
              >
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                  <Globe2 className="w-32 h-32" />
                </div>
                <div className="flex-shrink-0 w-16 h-16 bg-prestige-cream rounded-2xl flex items-center justify-center border border-prestige-ink/5">
                  {org.icon}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-serif-display leading-none">{org.name}</h3>
                    <span className="px-2 py-1 bg-prestige-ink text-prestige-cream text-[10px] font-bold rounded">{org.abbr}</span>
                  </div>
                  <p className="text-[10px] font-bold text-prestige-gold uppercase tracking-widest mb-4">Didirikan: {org.founded}</p>
                  <p className="text-prestige-charcoal/70 leading-relaxed italic font-serif-cormorant text-lg">
                    {org.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section id="karir" className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <GraduationCap className="w-10 h-10 text-prestige-gold" />
                  <span className="h-px flex-grow bg-prestige-ink/10" />
                </div>
                <h2 className="text-5xl md:text-6xl mb-8">Jurusan HI di Universitas</h2>
                <p className="text-xl leading-relaxed text-prestige-charcoal/80 font-serif-cormorant italic mb-10">
                  "Menjadi sarjana HI bukan sekadar tentang menghafal nama negara, tapi tentang mengasah ketajaman analisis terhadap dinamika dunia yang terus berubah."
                </p>
                
                <div className="space-y-6">
                  <div className="bg-prestige-cream p-8 rounded-2xl border border-prestige-ink/5">
                    <h4 className="font-bold uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" /> Mata Kuliah Inti
                    </h4>
                    <ul className="grid grid-cols-2 gap-4 text-sm font-semibold opacity-70">
                      <li>• Teori Hubungan Internasional</li>
                      <li>• Diplomasi & Negosiasi</li>
                      <li>• Hukum Internasional</li>
                      <li>• Ekonomi Politik Global</li>
                      <li>• Keamanan Internasional</li>
                      <li>• Isu Lingkungan Global</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-prestige-ink p-12 text-prestige-cream relative rounded-3xl"
            >
              <Briefcase className="w-12 h-12 text-prestige-gold mb-8" />
              <h2 className="text-4xl mb-12">Prospek Karir Masa Depan</h2>
              <div className="space-y-8">
                {CAREERS.map((career, idx) => (
                  <div key={idx} className="group cursor-default">
                    <h5 className="text-xl font-serif-display mb-2 text-prestige-gold group-hover:translate-x-2 transition-transform inline-block">
                      {career.title}
                    </h5>
                    <p className="text-sm opacity-60 leading-relaxed font-serif-cormorant italic text-lg">{career.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Dan masih banyak lagi...</span>
                <button className="p-3 bg-white text-prestige-ink rounded-full hover:bg-prestige-gold transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-prestige-ink text-prestige-cream py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-16 border-b border-white/10 pb-16">
            <div className="max-w-md">
              <h1 className="text-4xl mb-6 font-serif-display italic">Diplomatica</h1>
              <p className="opacity-50 font-serif-cormorant text-lg italic">
                Edukasi Hubungan Internasional untuk generasi global yang berwawasan luas dan berintegritas.
              </p>
            </div>
            <div className="flex gap-4">
              {['Instagram', 'Twitter', 'LinkedIn'].map(social => (
                <a key={social} href="#" className="p-3 border border-white/20 rounded-full hover:bg-prestige-gold transition-colors">
                  <span className="sr-only">{social}</span>
                  <div className="w-5 h-5 bg-white/20 rounded-sm" />
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">
            <p>&copy; 2026 Diplomatica. All Rights Reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
