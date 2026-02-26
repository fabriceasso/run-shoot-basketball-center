import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Dribbble, Mail, Phone, MapPin, Instagram, Facebook, Award, Target, Users, Zap, X } from 'lucide-react'
import confetti from 'canvas-confetti'

// Composants
// Note: Je diviserai ces composants en fichiers séparés plus tard s'ils deviennent trop volumineux.
// Pour l'instant, je commence par une mise en page principale.

function App() {
    const [loading, setLoading] = useState(true)
    const [scrollProgress, setScrollProgress] = useState(0)

    const [shots, setShots] = useState([])
    const handleShoot = () => {
        const id = Date.now()
        setShots(prev => [...prev, id])
        setTimeout(() => {
            setShots(prev => prev.filter(shotId => shotId !== id))
        }, 2000)
    }

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2500)

        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight
            const progress = (window.scrollY / totalHeight) * 100
            setScrollProgress(progress)
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            clearTimeout(timer)
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <div className="relative min-h-screen font-poppins selection:bg-rsbc-orange selection:text-white">
            {/* Barre de progression du défilement */}
            <div
                className="fixed top-0 left-0 h-1 bg-rsbc-orange z-[100] transition-all duration-100"
                style={{ width: `${scrollProgress}%` }}
            ></div>

            <AnimatePresence>
                {loading && <Loader />}
            </AnimatePresence>

            {!loading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <AnimatePresence>
                        {shots.map(id => (
                            <BasketballShot key={id} />
                        ))}
                    </AnimatePresence>
                    <Navbar onConfetti={handleShoot} />
                    <Hero onConfetti={handleShoot} />
                    <About />
                    <Coach />
                    <Programs />
                    <USAOpportunities onConfetti={handleShoot} />
                    <Gallery onConfetti={handleShoot} />
                    <Contact onConfetti={handleShoot} />
                    <Footer />
                </motion.div>
            )}
        </div>
    )
}

const Loader = () => (
    <motion.div
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-rsbc-black flex flex-col items-center justify-center"
    >
        <motion.div
            animate={{
                y: [0, -100, 0],
                rotate: [0, 360]
            }}
            transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        >
            <img src="/ressources/images/favicon.png" alt="Loading" className="w-20 h-20" />
        </motion.div>
        <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 text-4xl font-black text-white tracking-widest"
        >
            Temps-mort terminé <span className="text-rsbc-orange">...place au jeu...</span>
        </motion.h1>
    </motion.div>
)

const SectionBackground = ({ src }) => (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.15] grayscale mix-blend-overlay"
            style={{ backgroundImage: `url('${src}')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-rsbc-black via-transparent to-rsbc-black opacity-60"></div>
    </div>
)

const BasketballShot = () => {
    // Détection du côté de départ
    const startX = Math.random() < 0.5 ? -100 : window.innerWidth + 100
    const endX = startX < 0 ? window.innerWidth * 0.8 : window.innerWidth * 0.2

    return (
        <motion.div
            initial={{
                x: startX,
                y: window.innerHeight * 0.9,
                rotate: 0,
                scale: 1,
                opacity: 1
            }}
            animate={{
                x: endX,
                y: [window.innerHeight * 0.9, window.innerHeight * 0.1, window.innerHeight * 0.6],
                rotate: 1080,
                scale: [1, 1.4, 0.9],
                opacity: [1, 1, 0]
            }}
            transition={{
                duration: 1.8,
                ease: "easeOut"
            }}
            className="fixed inset-0 z-[2000] pointer-events-none w-16 h-16"
        >
            <img
                src="/ressources/images/favicon.png"
                alt="Basketball"
                className="w-full h-full drop-shadow-[0_15px_30px_rgba(255,102,0,0.6)]"
            />
        </motion.div>
    )
}

const Navbar = ({ onConfetti }) => {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <img src="/ressources/images/logo_new.jpg" alt="RSBC Logo" className="h-12 w-auto rounded-full" />
                    <span className="text-2xl font-black tracking-tighter">RS<span className="text-rsbc-orange">BC</span></span>
                </div>
                <div className="hidden md:flex gap-8 font-semibold">
                    <a href="#about" className="hover:text-rsbc-orange transition-colors">À Propos</a>
                    <a href="#coach" className="hover:text-rsbc-orange transition-colors">Staff</a>
                    <a href="#programs" className="hover:text-rsbc-orange transition-colors">Programmes</a>
                    <a href="#usa" className="hover:text-rsbc-orange transition-colors">Opportunités de bourses</a>
                    <a href="#contact" className="hover:text-rsbc-orange transition-colors">Contact</a>
                </div>
                <button onClick={onConfetti} className="btn-primary py-2 px-6 text-sm">S'INSCRIRE</button>
            </div>
        </nav>
    )
}

const Hero = ({ onConfetti }) => {
    const images = [
        "/ressources/images/carrousel/featue-bg.jpg",
        "/ressources/images/carrousel/pexels-chuck-3002981.jpg",
        "/ressources/images/carrousel/pexels-dapo-abideen-1908900-5170498.jpg",
        "/ressources/images/carrousel/pexels-ketut-subiyanto-4719821.jpg",
        "/ressources/images/carrousel/heungsoon-basketball-3571730_1920.jpg",
        "/ressources/images/carrousel/tortugamediaservices-basketball-2258651_1920.jpg",
        "/ressources/images/carrousel/zdaschorsch-ball-7610545_1920.jpg",
        "/ressources/images/carrousel/Google_AI_Studio_2025-11-12T18_13_25.172Z.png",
        "/ressources/images/carrousel/Google_AI_Studio_2025-11-12T18_09_42.200Z.png"
    ]
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length)
        }, 6000)
        return () => clearInterval(timer)
    }, [])

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Éléments d'arrière-plan */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-rsbc-black/60 to-rsbc-black z-10"></div>
                <AnimatePresence mode="wait">
                    <motion.img
                        key={current}
                        src={images[current]}
                        alt="Basketball Carousel"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </AnimatePresence>
            </div>

            {/* Particules/Ballons flottants */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -40, 0],
                            x: [0, 20, 0],
                            rotate: 360
                        }}
                        transition={{
                            duration: 5 + i,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute text-rsbc-orange/20"
                        style={{
                            top: `${Math.random() * 80}%`,
                            left: `${Math.random() * 80}%`
                        }}
                    >
                        <Dribbble size={20 + Math.random() * 40} />
                    </motion.div>
                ))}
            </div>

            <div className="container mx-auto px-6 text-center relative z-20">
                <motion.h2
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-rsbc-orange font-bold tracking-widest text-xl mb-4"
                >
                    BIENVENUE A RUN & SHOOT BASKETBALL CENTER
                </motion.h2>
                <motion.h1
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-6xl md:text-8xl font-black mb-6 leading-tight"
                >
                    DEVENEZ LA PROCHAINE <br />
                    <span className="neon-text-orange italic">STAR DU BASKET !</span>
                </motion.h1>
                <motion.p
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10"
                >
                    Initiation, développent et  perfectionnement. Formez-vous auprès des meilleurs au Lycée Classique d'Abidjan.
                </motion.p>
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="flex flex-col md:flex-row gap-6 justify-center"
                >
                    <a href="#contact" onClick={onConfetti} className="btn-primary text-xl inline-block">
                        REJOIGNEZ-NOUS
                    </a>
                    <a href="#usa" onClick={onConfetti} className="btn-neon text-xl inline-block">
                        OPPORTUNITES DE BOURSES USA
                    </a>
                </motion.div>

                {/* Indicateurs du carrousel */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.3 }}
                    className="mt-12 flex justify-center gap-3"
                >
                    {images.map((_, i) => (
                        <div
                            key={i}
                            className={`h-2 transition-all duration-500 rounded-full ${i === current ? 'w-12 bg-rsbc-orange' : 'w-2 bg-white/20'}`}
                        ></div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

const About = () => (
    <section id="about" className="py-32 bg-rsbc-black relative overflow-hidden">
        <SectionBackground src="/ressources/images/featue-bg.jpg" />
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
            <motion.div
                whileInView={{ x: 0, opacity: 1 }}
                initial={{ x: -100, opacity: 0 }}
                className="relative"
            >
                <div className="absolute -inset-4 bg-rsbc-orange/20 rounded-3xl blur-2xl"></div>
                <img
                    src="/ressources/images/logo_new.jpg"
                    alt="RSBC Training"
                    className="relative rounded-3xl w-full h-[500px] object-cover border-2 border-rsbc-orange/30 shadow-2xl"
                />
                <div className="absolute -bottom-10 -right-10 glass p-8 rounded-2xl hidden md:block">
                    <Zap className="text-rsbc-orange mb-2" size={40} />
                    <p className="text-3xl font-black">100%</p>
                    <p className="text-sm font-semibold text-gray-400">DÉVOUEMENT</p>
                </div>
            </motion.div>
            <motion.div
                whileInView={{ x: 0, opacity: 1 }}
                initial={{ x: 100, opacity: 0 }}
            >
                <h2 className="text-rsbc-orange font-bold tracking-widest mb-4">NOTRE MISSION</h2>
                <h3 className="text-5xl font-black mb-6">Former les Champions de Demain</h3>
                <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                    Le Run & Shoot Basketball Center (RSBC), basé au Lycée Classique d'Abidjan, est bien plus qu'une simple académie. C'est un centre d'excellence où les jeunes de 8 à 20 ans apprennent les fondamentaux du basket, développent leur capacité dans la discipline.
                </p>
                <ul className="space-y-4">
                    {[
                        { icon: <Target />, text: "Focus sur les fondamentaux techniques" },
                        { icon: <Award />, text: "Discipline et mental de gagnant" },
                        { icon: <Users />, text: "Encadrement par des experts internationaux" }
                    ].map((item, i) => (
                        <li key={i} className="flex items-center gap-4 text-xl font-bold">
                            <span className="text-rsbc-orange">{item.icon}</span>
                            {item.text}
                        </li>
                    ))}
                </ul>
            </motion.div>
        </div>
    </section>
)

// Composants pour le reste de la page
const Coach = () => (
    <section id="coach" className="py-32 bg-rsbc-black relative overflow-hidden">
        <SectionBackground src="/ressources/images/oleksii-s-O2kqxbix4Mw-unsplash.jpg" />
        <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-16">
                <motion.div
                    whileInView={{ scale: [0.9, 1.05, 1], opacity: 1 }}
                    initial={{ opacity: 0 }}
                    className="md:w-1/2 relative"
                >
                    <div className="absolute -inset-10 bg-rsbc-neonBlue/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="relative border-4 border-rsbc-neonBlue/30 rounded-[2rem] overflow-hidden group">
                        <img
                            src="/ressources/images/alphamane.jpg"
                            alt="Coach Alpha Mané"
                            className="w-full h-[600px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-rsbc-black via-transparent to-transparent"></div>
                        <div className="absolute bottom-8 left-8">
                            <h3 className="text-4xl font-black text-white">ALPHA <span className="text-rsbc-neonBlue underline decoration-rsbc-orange">MANÉ</span></h3>
                            <p className="text-rsbc-orange font-bold tracking-widest">COACH PRINCIPAL & FONDATEUR</p>
                        </div>
                    </div>
                </motion.div>

                <div className="md:w-1/2">
                    <motion.h2
                        whileInView={{ x: 0, opacity: 1 }}
                        initial={{ x: 50, opacity: 0 }}
                        className="text-rsbc-orange font-bold tracking-[0.3em] mb-4"
                    >
                        ANCIENNE GLOIRE DU BASKET IVOIRIEN
                    </motion.h2>
                    <motion.h3
                        whileInView={{ x: 0, opacity: 1 }}
                        initial={{ x: 50, opacity: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl font-black mb-8 leading-tight"
                    >
                        Plus qu'un coach, <br /> un <span className="italic neon-text-blue">Mentor</span>.
                    </motion.h3>
                    <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                        Ancien international ivoirien et ex-sélectionneur de l'Équipe Nationale Dames, Alpha Mané a consacré sa vie au basketball. Sa vision pour RSBC est de détecter et polir les diamants bruts du basket ivoirien.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                            { label: "Expérience", val: "25+ ans" },
                            { label: "Palmarès", val: "Elite Coach" },
                            { label: "Focus", val: "Fondamentaux" },
                            { label: "Réseau", val: "Afrique & USA" }
                        ].map((stat, i) => (
                            <div key={i} className="glass p-6 rounded-2xl border-l-4 border-rsbc-neonBlue">
                                <p className="text-sm text-gray-500 font-bold uppercase">{stat.label}</p>
                                <p className="text-2xl font-black">{stat.val}</p>
                            </div>
                        ))}
                    </div>

                    <motion.div
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 30 }}
                        className="mt-10 p-8 glass rounded-[2rem] border-l-8 border-rsbc-orange relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                            <Users size={120} />
                        </div>
                        <p className="relative z-10 text-xl font-bold leading-relaxed text-gray-300 italic">
                            "La présence d'autres entraîneurs expérimentés et d'experts internationaux qui travaillent à RSBC garantit un encadrement complet et moderne pour chaque joueur."
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    </section>
)
const ProgramCard = ({ p, i }) => {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <motion.div
            layout
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: i * 0.1 }}
            className={`glass p-10 rounded-[2.5rem] border-b-8 shadow-2xl transition-all duration-300 h-fit ${p.color === 'rsbc-orange' ? 'border-rsbc-orange' :
                p.color === 'rsbc-neonBlue' ? 'border-rsbc-neonBlue' : 'border-rsbc-gold'
                }`}
        >
            <motion.div layout="position" className={`mb-6 ${p.color === 'rsbc-orange' ? 'text-rsbc-orange' :
                p.color === 'rsbc-neonBlue' ? 'text-rsbc-neonBlue' : 'text-rsbc-gold'
                }`}>
                {p.icon}
            </motion.div>
            <motion.p layout="position" className="text-sm font-black tracking-widest text-gray-400 mb-2">{p.age}</motion.p>
            <motion.h4 layout="position" className="text-3xl font-black mb-6">{p.title}</motion.h4>
            <motion.p layout="position" className="text-gray-400 text-lg leading-relaxed mb-8">{p.desc}</motion.p>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <p className="text-gray-300 bg-white/5 p-6 rounded-2xl mb-8 border-l-2 border-white/10 italic">
                            {p.details}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 font-bold text-rsbc-orange hover:gap-4 transition-all"
            >
                {isExpanded ? "VOIR MOINS" : "EN SAVOIR PLUS"}
                <ChevronRight size={20} className={`transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
            </button>
        </motion.div>
    )
}

const Programs = () => (
    <section id="programs" className="py-32 bg-rsbc-black relative overflow-hidden">
        <SectionBackground src="/ressources/images/featue-bg.jpg" />
        <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
                <motion.h2
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    className="text-rsbc-orange font-bold tracking-[0.4em] mb-4"
                >
                    NOS PARCOURS
                </motion.h2>
                <motion.h3
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-black"
                >
                    Forgez votre <span className="neon-text-orange italic">Destin</span>
                </motion.h3>
            </div>

            <div className="grid md:grid-cols-3 gap-10 items-start">
                {[
                    {
                        age: "8-12 ANS",
                        title: "INITIATION",
                        desc: "Découverte ludique, maîtrise du ballon et premiers fondamentaux techniques.",
                        details: "Le programme initiation se concentre sur l'éveil sportif. Les enfants apprennent à manipuler le ballon, à coordonner leurs mouvements et à comprendre les règles de base dans un environnement fun et encourageant.",
                        icon: <Dribbble size={40} />,
                        color: "rsbc-orange"
                    },
                    {
                        age: "13-16 ANS",
                        title: "DÉVELOPPEMENT",
                        desc: "Intensification physique, tactiques de jeu et perfectionnement du tir.",
                        details: "C'est l'étape charnière. Nous insistons sur la rigueur technique : qualité de passe, mécaniques de tir précises et défense individuelle. Le travail physique commence à être intégré pour préparer le corps aux exigences de la compétition.",
                        icon: <Zap size={40} />,
                        color: "rsbc-neonBlue"
                    },
                    {
                        age: "17-20 ANS",
                        title: "ÉLITE",
                        desc: "Préparation au haut niveau, bourses USA et compétitions fédérales.",
                        details: "Préparation intensive pour le haut niveau. Analyse vidéo, tactiques avancées et conditionnement physique professionnel. Les joueurs de ce groupe sont directement suivis pour les opportunités de bourses aux USA.",
                        icon: <Award size={40} />,
                        color: "rsbc-gold"
                    }
                ].map((p, i) => (
                    <ProgramCard key={i} p={p} i={i} />
                ))}
            </div>
        </div>
    </section>
)
const USAOpportunities = ({ onConfetti }) => {
    const images = [
        "/ressources/images/pexels-pixabay-159611.jpg",
        "/ressources/images/ryan-OywyPkrDEvg-unsplash.jpg",
        "/ressources/images/mick-haupt-W2BqFB4me7k-unsplash.jpg"
    ]
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length)
        }, 4000)
        return () => clearInterval(timer)
    }, [])

    return (
        <section id="usa" className="py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-rsbc-orange"></div>
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            <SectionBackground src="/ressources/images/oleksii-s-O2kqxbix4Mw-unsplash.jpg" />
            <div className="container mx-auto px-6 relative z-10 text-rsbc-black">
                <div className="bg-rsbc-black text-white p-12 md:p-20 rounded-[3rem] shadow-2xl flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-3/5">
                        <h2 className="text-rsbc-orange font-black text-6xl md:text-7xl mb-6 tracking-tighter">Visez les <br /> <span className="text-white underline decoration-rsbc-orange">USA</span>.</h2>
                        <p className="text-xl md:text-2xl font-bold mb-8 text-gray-300">
                            Grâce à nos partenariats exclusifs avec des académies et lycées américains, nous pouvons faciliter aux meilleurs éléments de RSBC l'obtention de bourses d'études sportives.
                        </p>
                        <ul className="space-y-4 mb-10">
                            {["Placement en High School & College", "Suivi administratif personnalisé", "Préparation aux tests d'entrée"].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-lg font-bold">
                                    <div className="h-2 w-8 bg-rsbc-orange"></div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <button onClick={onConfetti} className="btn-primary text-xl px-12 py-5 shadow-[0_20px_50px_rgba(255,102,0,0.3)] hover:bg-rsbc-neonBlue hover:text-rsbc-black hover:scale-110">
                            JE POSTULE (SESSION 2026)
                        </button>
                    </div>
                    <div className="md:w-2/5 relative h-[400px]">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={current}
                                src={images[current]}
                                alt="USA Scholarship"
                                initial={{ opacity: 0, x: 20, rotate: 5 }}
                                animate={{ opacity: 1, x: 0, rotate: 3 }}
                                exit={{ opacity: 0, x: -20, rotate: 1 }}
                                transition={{ duration: 0.8 }}
                                className="absolute inset-0 w-full h-full object-cover rounded-3xl shadow-2xl border-8 border-rsbc-orange/20"
                            />
                        </AnimatePresence>
                        <div className="absolute -top-6 -right-6 bg-rsbc-orange text-white p-4 rounded-full font-black animate-bounce z-20">
                            NEW !
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const Gallery = ({ onConfetti }) => {
    const [selectedImg, setSelectedImg] = useState(null)
    const [showAll, setShowAll] = useState(false)

    const allImages = [
        { src: "/ressources/images/img_gallerie/maneph.jpg", span: "", caption: "Coach Alpha Mané en plein coaching tactique." },
        { src: "/ressources/images/img_gallerie/pexels-alexis-kiza-2149714901-32759160.jpg", span: "h-80", caption: "L'intensité d'un match sous les projecteurs." },
        { src: "/ressources/images/img_gallerie/pexels-chris-wade-ntezicimpa-564856410-32600319.jpg", span: "", caption: "Préparation physique des jeunes talents." },
        { src: "/ressources/images/img_gallerie/pexels-dapo-abideen-1908900-5170498.jpg", span: "h-96", caption: "Le focus ultime avant le tir décisif." },
        { src: "/ressources/images/img_gallerie/pexels-ketut-subiyanto-4719821.jpg", span: "", caption: "L'excellence au cœur de l'entraînement." },
        { src: "/ressources/images/img_gallerie/pexels-luanqueiros-3260939.jpg", span: "h-80", caption: "La détermination d'un futur champion." },
        { src: "/ressources/images/img_gallerie/pexels-ola-dapo-1754561-3534674.jpg", span: "", caption: "Vitesse et agilité sur le parquet." },
        { src: "/ressources/images/img_gallerie/pexels-victor-chijioke-350220031-20041461.jpg", span: "", caption: "Travail technique et maîtrise du dribble." },
        { src: "/ressources/images/img_gallerie/stephen-baker-QAX5Ylx-lKo-unsplash.jpg", span: "h-96", caption: "Puissance et ambition : l'envol." },
        { src: "/ressources/images/img_gallerie/tom-briskey-AddAnDkkovM-unsplash.jpg", span: "", caption: "Le terrain mythique du Lycée Classique d'Abidjan." },
        { src: "/ressources/images/img_gallerie/august-phlieger-CREqtqgBFcU-unsplash.jpg", span: "", caption: "Slam dunk spectaculaire en session Élite." },
        { src: "/ressources/images/img_gallerie/megashock-jordan-4657349_1920.jpg", span: "", caption: "L'héritage du basket pour la jeunesse." },
        { src: "/ressources/images/img_gallerie/Gemini_Generated_Image_r1mtn0r1mtn0r1mt.jpg", span: "", caption: "Vision moderne du centre RSBC." },
        { src: "/ressources/images/img_gallerie/Gemini_Generated_Image_tsy7jntsy7jntsy7.jpg", span: "", caption: "Esprit d'équipe et cohésion RSBC." }
    ]

    const displayedImages = showAll ? allImages : allImages.slice(0, 8)

    return (
        <section className="py-32 bg-rsbc-black relative overflow-hidden">
            <SectionBackground src="/ressources/images/featue-bg.jpg" />
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <h2 className="text-rsbc-orange font-bold tracking-widest mb-4">L'INTENSITÉ EN IMAGES</h2>
                        <h3 className="text-5xl font-black">Galerie <span className="neon-text-orange italic">RSBC</span></h3>
                    </div>
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="text-rsbc-orange font-bold flex items-center gap-2 hover:gap-4 transition-all"
                    >
                        {showAll ? "VOIR MOINS" : "VOIR TOUT"} <ChevronRight className={showAll ? "rotate-90" : ""} />
                    </button>
                </div>

                <div className="columns-1 sm:columns-2 lg:columns-4 gap-6 space-y-6">
                    {displayedImages.map((img, i) => (
                        <motion.div
                            key={i}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.02, rotate: 1 }}
                            onClick={() => {
                                setSelectedImg(img)
                                onConfetti()
                            }}
                            className="break-inside-avoid relative rounded-2xl overflow-hidden group border border-white/5 cursor-pointer bg-white/5"
                        >
                            <img src={img.src} alt={img.caption} className="w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-rsbc-orange/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Dribbble size={40} className="text-white" />
                            </div>
                            <div className="p-4 bg-black/60 backdrop-blur-md border-t border-white/10 group-hover:bg-rsbc-orange/80 transition-colors">
                                <p className="text-xs font-bold tracking-widest uppercase text-white truncate">{img.caption}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedImg && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImg(null)}
                        className="fixed inset-0 z-[200] bg-rsbc-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-4 md:p-10 cursor-zoom-out"
                    >
                        <motion.button
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-10 right-10 p-4 bg-rsbc-orange rounded-full text-white z-50 hover:rotate-90 transition-transform"
                            onClick={() => setSelectedImg(null)}
                        >
                            <X size={32} />
                        </motion.button>

                        <div className="max-w-5xl max-h-[80vh] relative group" onClick={(e) => e.stopPropagation()}>
                            <motion.img
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                src={selectedImg.src}
                                alt={selectedImg.caption}
                                className="w-full h-full rounded-3xl shadow-2xl border-4 border-white/10 object-contain"
                            />
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="absolute -bottom-16 left-0 right-0 text-center"
                            >
                                <p className="text-2xl font-black italic uppercase tracking-tighter text-white drop-shadow-lg">
                                    {selectedImg.caption}
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}
const Contact = ({ onConfetti }) => {
    const [status, setStatus] = useState(null) // null, 'sending', 'success', 'error'
    const [formData, setFormData] = useState({
        full_name: '',
        age: '',
        email: '',
        message: ''
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('sending')
        const form = e.target
        const data = new FormData(form)

        fetch(form.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                setStatus('success')
                setFormData({ full_name: '', age: '', email: '', message: '' })
                onConfetti()
            } else {
                response.json().then(data => {
                    console.error("Formspree Details:", data)
                })
                setStatus('error')
            }
        }).catch(error => {
            console.error("Fetch Error:", error)
            setStatus('error')
        })
    }

    return (
        <section id="contact" className="py-32 bg-rsbc-black relative overflow-hidden">
            <SectionBackground src="/ressources/images/oleksii-s-O2kqxbix4Mw-unsplash.jpg" />
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row gap-20">
                    <div className="lg:w-1/2">
                        <motion.h2
                            whileInView={{ opacity: 1, x: 0 }}
                            initial={{ opacity: 0, x: -30 }}
                            className="text-rsbc-orange font-bold tracking-[0.3em] mb-4"
                        >
                            RESTONS EN CONTACT
                        </motion.h2>
                        <motion.h3
                            whileInView={{ opacity: 1, x: 0 }}
                            initial={{ opacity: 0, x: -30 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-6xl font-black mb-12"
                        >
                            Prêt à relever le <br /> <span className="neon-text-blue">Défi ?</span>
                        </motion.h3>

                        <div className="space-y-10">
                            {[
                                { icon: <MapPin />, title: "Lieu d'entraînement", text: "Lycée Classique d'Abidjan, Cocody-Abiidjan, Côte d'Ivoire" },
                                { icon: <Phone />, title: "Téléphone", text: "+225 07 07 98  75 18" },
                                { icon: <Mail />, title: "Email", text: "direction@rsbc-abidjan.ci" }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-start gap-6"
                                >
                                    <div className="p-4 bg-rsbc-neonBlue/10 rounded-2xl text-rsbc-neonBlue">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-black text-xl mb-1">{item.title}</h4>
                                        <p className="text-gray-400 text-lg">{item.text}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-16 p-8 glass rounded-3xl border-l-8 border-rsbc-orange">
                            <p className="font-bold text-xl italic text-gray-300">
                                "Le basket n'est pas qu'un jeu, c'est une école de vie."
                            </p>
                            <p className="mt-2 text-rsbc-orange font-black">— Alpha Mané</p>
                        </div>

                        <div className="mt-10 rounded-[2rem] overflow-hidden border-2 border-white/5 h-64 grayscale hover:grayscale-0 transition-all duration-700">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1069.4356637043609!2d-4.0059305786107835!3d5.3312444129597925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sfr!2sci!4v1772071678542!5m2!1sfr!2sci"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>

                    <motion.div
                        whileInView={{ opacity: 1, scale: 1 }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        className="lg:w-1/2 glass p-10 md:p-16 rounded-[3rem] shadow-2xl relative"
                    >
                        <div className="absolute -top-10 -right-10 hidden md:block">
                            <Dribbble size={150} className="text-rsbc-orange opacity-5 rotate-12" />
                        </div>

                        {status === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20"
                            >
                                <div className="p-6 bg-rsbc-orange rounded-full text-white shadow-[0_0_50px_rgba(255,102,0,0.5)]">
                                    <Zap size={60} className="animate-pulse" />
                                </div>
                                <h3 className="text-4xl font-black italic">MESSAGE BIEN REÇU !</h3>
                                <p className="text-gray-300 text-lg max-w-sm">
                                    Ton shoot est allé droit au panier ! Notre staff reviendra vers toi très vite.
                                </p>
                                <button
                                    onClick={() => setStatus(null)}
                                    className="text-rsbc-orange font-bold border-b-2 border-rsbc-orange hover:pb-2 transition-all mt-4"
                                >
                                    ENVOYER UN AUTRE MESSAGE
                                </button>
                            </motion.div>
                        ) : (
                            <form
                                action="https://formspree.io/f/xnjbwrpq"
                                method="POST"
                                onSubmit={handleSubmit}
                                className="space-y-6 relative z-10"
                            >
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Nom Complet</label>
                                        <input
                                            required
                                            name="full_name"
                                            value={formData.full_name}
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="Ex: Jean Koffi"
                                            className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl focus:border-rsbc-orange outline-none transition-all placeholder:opacity-30"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Âge du Joueur</label>
                                        <input
                                            required
                                            name="age"
                                            value={formData.age}
                                            onChange={handleChange}
                                            type="number"
                                            placeholder="Ex: 14"
                                            className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl focus:border-rsbc-orange outline-none transition-all placeholder:opacity-30"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Email de contact</label>
                                    <input
                                        required
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        type="email"
                                        placeholder="Ex: jean@mail.com"
                                        className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl focus:border-rsbc-orange outline-none transition-all placeholder:opacity-30"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Message / Questions</label>
                                    <textarea
                                        required
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Parlez-nous de votre motivation..."
                                        className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl h-40 focus:border-rsbc-orange outline-none transition-all placeholder:opacity-30 resize-none"
                                    ></textarea>
                                </div>

                                {status === 'error' && (
                                    <p className="text-red-500 font-bold text-center">Une erreur est survenue. Veuillez réessayer.</p>
                                )}

                                <button
                                    disabled={status === 'sending'}
                                    type="submit"
                                    className={`btn-primary w-full py-6 text-xl shadow-2xl flex items-center justify-center gap-3 ${status === 'sending' ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {status === 'sending' ? (
                                        <>
                                            <div className="animate-spin h-6 w-6 border-4 border-white border-t-transparent rounded-full"></div>
                                            ENVOI EN COURS...
                                        </>
                                    ) : (
                                        'ENVOYER MA DEMANDE'
                                    )}
                                </button>
                                <p className="text-center text-xs text-gray-500 font-semibold uppercase tracking-widest">
                                    Réponse garantie sous 48h par notre staff technique.
                                </p>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
const Footer = () => (
    <footer className="py-20 bg-rsbc-black border-t border-white/5 relative overflow-hidden">
        {/* Ballon décoratif en arrière-plan */}
        <div className="absolute -bottom-20 -left-20 text-rsbc-orange/5 rotate-45">
            <Dribbble size={400} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
            <div className="grid md:grid-cols-4 gap-12 mb-20">
                <div className="col-span-2">
                    <div className="flex items-center gap-3 mb-8">
                        <img src="/ressources/images/logo_new.jpg" alt="RSBC Logo" className="h-16 w-auto rounded-full border-2 border-rsbc-orange" />
                        <span className="text-3xl font-black tracking-tighter uppercase">Run & Shoot <span className="text-rsbc-orange">Basketball  Center</span></span>
                    </div>
                    <p className="text-gray-500 text-lg max-w-md mb-8">
                        Centre de formation d'élite à Abidjan pour les jeunes talents de 8 à 20 ans. Discipline, Excellence et Ambition Internationale.
                    </p>
                    <div className="flex gap-4">
                        {[Instagram, Facebook, Mail, Phone].map((Icon, i) => (
                            <a key={i} href="#" className="p-3 bg-white/5 rounded-full hover:bg-rsbc-orange hover:text-white transition-all duration-300">
                                <Icon size={24} />
                            </a>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="font-black text-xl mb-8 uppercase tracking-widest text-rsbc-orange">Navigation</h4>
                    <ul className="space-y-4 text-gray-400 font-bold">
                        {["À Propos", "Staff", "Programmes", "Bourses USA", "Contact"].map((item, i) => (
                            <li key={i}><a href={`#${item.toLowerCase().replace(' ', '')}`} className="hover:text-white transition-colors">/ {item}</a></li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="font-black text-xl mb-8 uppercase tracking-widest text-rsbc-orange">Horaires</h4>
                    <ul className="space-y-4 text-gray-400 font-bold">
                        <li>Mercredi : 14h - 18h</li>
                        <li>Samedi : 8h - 12h</li>
                        <li className="pt-4 text-rsbc-neonBlue">Sessions privées sur RDV</li>
                    </ul>
                </div>
            </div>

            <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-gray-500 font-bold">© 2026 Run & Shoot Basketball Center. Powered by <a href="mailto:nivaquine@yahoo.fr" className="hover:text-rsbc-orange transition-colors underline decoration-rsbc-orange/30">nivaQuine</a>.</p>
                <div className="flex gap-8 text-sm font-bold text-gray-500">
                    <a href="#" className="hover:text-white transition-colors">MENTIONS LÉGALES</a>
                    <a href="#" className="hover:text-white transition-colors">POLITIQUE DE CONFIDENTIALITÉ</a>
                </div>
            </div>
        </div>
    </footer>
)

export default App
