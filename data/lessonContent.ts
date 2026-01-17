
import { Lesson } from '../types';

export const COUNSELING_LESSON: Lesson = {
  id: 'pastorales-101',
  title: 'Epístolas Pastorales',
  subtitle: 'Clase 1: Sé Fiel Obrero (1 Timoteo 1)',
  totalSlides: 12,
  objectives: [
    'Definir la naturaleza y clasificación de las epístolas en el NT.',
    'Identificar el propósito específico de las Epístolas Pastorales.',
    'Analizar la defensa de la sana doctrina frente a las falsas enseñanzas.'
  ],
  duration: '45 min',
  slides: [
    {
      id: 'slide-1',
      type: 'intro',
      title: 'Sé Fiel Obrero',
      subtitle: 'Análisis de 1 Timoteo 1',
      visual: {
        type: 'image',
        source: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=2070&auto=format&fit=crop',
        position: 'background'
      },
      content: 'Un estudio profundo sobre el liderazgo, la sana doctrina y el mandato apostólico en el contexto del ministerio cristiano.'
    },
    {
      id: 'slide-2',
      type: 'hermeneutics',
      title: '¿Qué son las Epístolas?',
      subtitle: 'El Mensaje Enviado',
      visual: {
        type: 'image',
        source: 'https://images.unsplash.com/photo-1516414447565-b14be0adf13e?q=80&w=1973&auto=format&fit=crop',
        position: 'right'
      },
      content: 'Derivan del griego epistolē. Son documentos inspirados que representan el 40% del Nuevo Testamento (21 en total).',
      interaction: {
        type: 'side-reveal',
        revealItems: [
          {
            title: 'Instrucción',
            text: 'Abordan doctrina y conducta práctica.',
            icon: 'BookOpen',
            image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1973&auto=format&fit=crop'
          },
          {
            title: 'Autoridad',
            text: 'Escritas por líderes bajo inspiración divina.',
            icon: 'Shield',
            image: 'https://images.unsplash.com/photo-1589188059167-e41136d28de6?q=80&w=2070&auto=format&fit=crop'
          }
        ]
      }
    },
    {
      id: 'slide-3',
      type: 'interactive-reveal',
      title: 'Clasificación General',
      subtitle: 'Dos Categorías Principales',
      visual: {
        type: 'image',
        source: 'https://images.unsplash.com/photo-1455642300327-fe2170c51c47?q=80&w=2070&auto=format&fit=crop',
        position: 'background'
      },
      interaction: {
        type: 'grid-cards',
        revealItems: [
          {
            title: 'Paulinas (13)',
            text: 'Escritas por Pablo entre 48-67 d.C.',
            longContent: 'Se dividen en cartas a Iglesias (como Romanos o Efesios), Pastorales (1-2 Timoteo, Tito) y Personales (Filemón).',
            icon: 'PenTool',
            image: 'https://images.unsplash.com/photo-1544640808-32ca72ac7f37?q=80&w=1935&auto=format&fit=crop'
          },
          {
            title: 'Generales (8)',
            text: 'Llamadas también "Católicas" o Universales.',
            longContent: 'Dirigidas a audiencias más amplias. Incluyen Hebreos, Santiago, Pedro, Juan y Judas. Enfocadas en ética y perseverancia.',
            icon: 'Globe',
            image: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?q=80&w=2070&auto=format&fit=crop'
          },
          {
            title: 'Pastorales',
            text: 'Guía sobre liderazgo y organización.',
            longContent: 'Dirigidas a pastores jóvenes (Timoteo y Tito) para combatir herejías y establecer líderes calificados.',
            icon: 'Users',
            image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop'
          }
        ]
      }
    },
    {
      id: 'slide-4',
      type: 'stepped-overlay',
      title: 'Las Epístolas Pastorales',
      subtitle: 'Contexto de Éfeso y Creta',
      visual: {
        type: 'image',
        source: 'https://images.unsplash.com/photo-1516156008625-3a9d60677518?q=80&w=2070&auto=format&fit=crop',
        position: 'background'
      },
      interaction: {
        type: 'stepped-reveal',
        revealItems: [
          {
            title: 'Propósito',
            text: 'Combatir falsas enseñanzas.',
            longContent: 'Pablo urge a establecer líderes con carácter (obispos y diáconos) y a promover la piedad sobre mitos y genealogías.',
            image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=2070&auto=format&fit=crop',
            icon: 'Sword'
          },
          {
            title: 'Sana Doctrina',
            text: 'El núcleo del mensaje pastoral.',
            longContent: 'Enfatizan la verdad del Evangelio frente al legalismo. Pablo usa el término "doctrina sana" repetidamente en las tres cartas.',
            image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2070&auto=format&fit=crop',
            icon: 'CheckCircle'
          }
        ]
      }
    },
    {
      id: 'slide-5',
      type: 'hotspot-reveal',
      title: 'El Contexto de Timoteo',
      subtitle: 'Explora el escenario de la carta',
      visual: {
        type: 'image',
        source: 'https://images.unsplash.com/photo-1548544149-4835e62ee5b3?q=80&w=1974&auto=format&fit=crop',
        position: 'background'
      },
      interaction: {
        type: 'hotspots',
        revealItems: [
          {
            title: 'Ciudad de Éfeso',
            text: 'Centro pagano dedicado a Artemisa.',
            longContent: 'Una ciudad plagada de inmoralidad y falsas enseñanzas (Hechos 19). Un reto enorme para un pastor joven.',
            icon: 'MapPin',
            x: 40,
            y: 30
          },
          {
            title: 'Timoteo',
            text: 'Hijo en la fe de Pablo.',
            longContent: 'De herencia mixta, enfrentaba desaliento y problemas de salud. Pablo escribe para animarle como mentor.',
            icon: 'User',
            x: 60,
            y: 50
          },
          {
            title: 'Falsos Maestros',
            text: 'Mitos y fábulas interminables.',
            longContent: 'Promovían especulaciones en vez de la edificación de Dios. Posiblemente gnosticismo incipiente.',
            icon: 'AlertTriangle',
            x: 30,
            y: 70
          }
        ]
      }
    },
    {
      id: 'slide-6',
      type: 'tabs-reveal',
      title: 'Salutación y Autoridad',
      subtitle: '1 Timoteo 1:1-2',
      visual: {
        type: 'image',
        source: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?q=80&w=2070&auto=format&fit=crop',
        position: 'background'
      },
      interaction: {
        type: 'click-reveal',
        revealItems: [
          {
            title: 'Mandato Divino',
            text: 'Apóstol por mandato de Dios.',
            longContent: 'Su autoridad no es autoimpuesta, sino divina. Usa lenguaje militar para enfatizar la obediencia al llamado.',
            icon: 'Anchor',
            image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=2070&auto=format&fit=crop'
          },
          {
            title: 'Esperanza Viva',
            text: 'Cristo como nuestra única esperanza.',
            longContent: 'Contrasta con el culto al emperador romano, afirmando que el ministerio es un llamado real basado en la verdad eterna.',
            icon: 'Sun',
            image: 'https://images.unsplash.com/photo-1519791883288-dc8bd696e667?q=80&w=2070&auto=format&fit=crop'
          }
        ]
      }
    },
    {
      id: 'slide-7',
      type: 'split-slider',
      title: 'Doctrina vs. Falsedad',
      subtitle: 'El Propósito del Mandamiento',
      visual: {
        type: 'image',
        source: 'https://images.unsplash.com/photo-1491336477066-31156b5e4f35?q=80&w=2070&auto=format&fit=crop',
        position: 'background'
      },
      interaction: {
        type: 'internal-slider',
        revealItems: [
          {
            title: 'Amor de Corazón Limpio',
            text: 'El fin de la instrucción es el amor.',
            longContent: 'No se trata solo de información, sino de una transformación que produce fe no fingida y buena conciencia.',
            icon: 'Heart',
            image: 'https://images.unsplash.com/photo-1518199266791-bd373290b0b9?q=80&w=2070&auto=format&fit=crop'
          },
          {
            title: 'Advertencia sobre la Ley',
            text: 'La ley es para los injustos.',
            longContent: 'La ley no salva, sino que convence de pecado. Es un espejo que muestra la necesidad del glorioso Evangelio.',
            icon: 'FileText',
            image: 'https://images.unsplash.com/photo-1589188059167-e41136d28de6?q=80&w=2070&auto=format&fit=crop'
          }
        ]
      }
    },
    {
      id: 'slide-8',
      type: 'drag-drop',
      title: 'Clasificando las Epístolas',
      subtitle: 'Organiza los libros del NT',
      visual: { type: 'icon', source: 'Layers', position: 'top' },
      interaction: {
        type: 'drag-drop',
        dragItems: [
          { id: 'p1', label: '1 Timoteo', categoryId: 'pastoral' },
          { id: 'p2', label: 'Tito', categoryId: 'pastoral' },
          { id: 'g1', label: 'Santiago', categoryId: 'general' },
          { id: 'g2', label: '1 Pedro', categoryId: 'general' },
          { id: 'i1', label: 'Romanos', categoryId: 'iglesia' },
          { id: 'i2', label: 'Efesios', categoryId: 'iglesia' }
        ],
        dragCategories: [
          { id: 'pastoral', title: 'Ep. Pastorales' },
          { id: 'general', title: 'Ep. Generales' },
          { id: 'iglesia', title: 'Ep. a Iglesias' }
        ]
      }
    },
    {
      id: 'slide-9',
      type: 'info-menu-reveal',
      title: 'El Testimonio de Pablo',
      subtitle: 'Misericordia para el "Primero"',
      visual: {
        type: 'image',
        source: 'https://images.unsplash.com/photo-1499209974431-9dac3adaf471?q=80&w=2070&auto=format&fit=crop',
        position: 'background'
      },
      interaction: {
        type: 'menu-reveal',
        revealItems: [
          {
            title: 'Su Pasado',
            text: 'Blasfemo e injuriador.',
            longContent: 'Pablo no oculta quién era antes de Cristo. Su vida demuestra que nadie está fuera del alcance de la gracia.',
            icon: 'History',
            image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=2070&auto=format&fit=crop'
          },
          {
            title: 'Gracia Abundante',
            text: 'Fui recibido a misericordia.',
            longContent: 'La gracia no es merecida, es soberana. Dios lo puso en el ministerio considerándolo fiel.',
            icon: 'Zap',
            image: 'https://images.unsplash.com/photo-1490730141103-6ac27d020028?q=80&w=2070&auto=format&fit=crop'
          },
          {
            title: 'El Propósito',
            text: 'Ejemplo para los que han de creer.',
            longContent: 'Su transformación es una prefiguración de la paciencia de Cristo para con todos los pecadores.',
            icon: 'UserCheck',
            image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2070&auto=format&fit=crop'
          }
        ]
      }
    },
    {
      id: 'slide-10',
      type: 'timeline',
      title: 'Pelear la Buena Batalla',
      subtitle: 'Instrucciones Finales de Pablo',
      visual: {
        type: 'image',
        source: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
        position: 'background'
      },
      interaction: {
        type: 'click-reveal',
        revealItems: [
          {
            title: 'El Mandato',
            text: 'Pelear la buena batalla (v. 18).',
            longContent: 'Una metáfora militar que implica disciplina y esfuerzo continuo en la defensa de la fe.',
            icon: 'Sword',
            image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop'
          },
          {
            title: 'Las Armas',
            text: 'Fe y buena conciencia.',
            longContent: 'Sin una buena conciencia, el ministerio naufraga. Es el motor interno de la integridad ministerial.',
            icon: 'Shield',
            image: 'https://images.unsplash.com/photo-1510519133411-2adbf72750e5?q=80&w=1760&auto=format&fit=crop'
          },
          {
            title: 'La Disciplina',
            text: 'Protegiendo la Iglesia de la blasfemia.',
            longContent: 'Pablo menciona a Himeneo y Alejandro como ejemplos de disciplina para restauración y protección del cuerpo.',
            icon: 'AlertOctagon',
            image: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?q=80&w=2009&auto=format&fit=crop'
          }
        ]
      }
    },
    {
      id: 'slide-11',
      type: 'flashcards',
      title: 'Repaso Teológico',
      subtitle: 'Conceptos Clave de la Lección',
      visual: { type: 'icon', source: 'HelpCircle', position: 'top' },
      interaction: {
        type: 'flashcards',
        revealItems: [
          {
            title: 'Epistolē',
            text: 'Término griego para "carta" o "mensaje enviado".',
            icon: 'Mail',
            image: 'https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?q=80&w=2020&auto=format&fit=crop'
          },
          {
            title: 'Sana Doctrina',
            text: 'Enseñanza que produce salud espiritual y amor.',
            icon: 'Heart',
            image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=2070&auto=format&fit=crop'
          },
          {
            title: 'Fin de la Ley',
            text: 'Convencer de pecado, no para justificar al justo.',
            icon: 'Scale',
            image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop'
          }
        ]
      }
    },
    {
      id: 'slide-12',
      type: 'intro',
      title: '¡Clase Completada!',
      subtitle: 'Fidelidad en el Ministerio',
      visual: {
        type: 'image',
        source: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop',
        position: 'background'
      },
      content: 'Has completado la Introducción a las Epístolas Pastorales. Próxima clase: Organización y Liderazgo.'
    }
  ]
};
