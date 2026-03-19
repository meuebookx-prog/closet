import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, 
  Upload, 
  ChevronRight, 
  Heart, 
  Sparkles, 
  User as UserIcon, 
  Home, 
  ShoppingBag, 
  LayoutGrid,
  ArrowLeft,
  CheckCircle2,
  Plus,
  X,
  Info,
  Crown
} from 'lucide-react';
import { User, StyleProfile, ClothingItem, Look, ClothingCategory } from './types';

// --- Components ---

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' | 'premium' }) => {
  const variants = {
    primary: 'bg-brand-ink text-white hover:bg-brand-ink/90',
    secondary: 'border border-brand-ink text-brand-ink hover:bg-brand-ink hover:text-white',
    ghost: 'text-brand-ink hover:bg-brand-rose/20',
    premium: 'bg-gradient-to-r from-brand-gold to-yellow-600 text-white hover:opacity-90 shadow-lg'
  };

  return (
    <button 
      className={`px-8 py-4 rounded-full font-medium transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`glass-card rounded-3xl p-6 ${className}`}>
    {children}
  </div>
);

// --- Mock Data & Logic ---

const MOCK_CLOSET: ClothingItem[] = [
  { id: '1', imageUrl: 'https://picsum.photos/seed/top1/400/600', category: 'tops' },
  { id: '2', imageUrl: 'https://picsum.photos/seed/pants1/400/600', category: 'bottoms' },
  { id: '3', imageUrl: 'https://picsum.photos/seed/blazer1/400/600', category: 'outerwear' },
  { id: '4', imageUrl: 'https://picsum.photos/seed/shoes1/400/600', category: 'shoes' },
];

const MOCK_LOOKS: Look[] = [
  {
    id: 'l1',
    items: [MOCK_CLOSET[0], MOCK_CLOSET[1], MOCK_CLOSET[3]],
    occasion: 'work',
    explanation: 'Esse look funciona bem para você porque cria uma linha vertical mais elegante, valoriza a cintura e equilibra visualmente a silhueta. A combinação também conversa com uma rotina prática, sem perder sofisticação.',
    benefits: ['Alongamento visual', 'Equilíbrio de proporção', 'Praticidade']
  },
  {
    id: 'l2',
    items: [MOCK_CLOSET[0], MOCK_CLOSET[2], MOCK_CLOSET[1]],
    occasion: 'casual',
    explanation: 'Uma proposta moderna que utiliza a terceira peça para elevar o básico. Ideal para transitar entre compromissos diurnos com elegância.',
    benefits: ['Camadas estratégicas', 'Conforto sofisticado']
  }
];

// --- Main App Component ---

export default function App() {
  const [step, setStep] = React.useState<'landing' | 'onboarding' | 'body-upload' | 'closet-upload' | 'analyzing' | 'dashboard'>('landing');
  const [user, setUser] = React.useState<User>({
    id: 'u1',
    name: '',
    email: '',
    closet: [],
    isPremium: false
  });

  const handleStart = () => setStep('onboarding');
  const handleOnboardingComplete = () => setStep('body-upload');
  const handleBodyUploadComplete = () => setStep('closet-upload');
  const handleClosetUploadComplete = () => {
    setStep('analyzing');
    setTimeout(() => setStep('dashboard'), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-brand-nude shadow-2xl relative overflow-hidden">
      <AnimatePresence mode="wait">
        {step === 'landing' && <LandingPage onStart={handleStart} key="landing" />}
        {step === 'onboarding' && <Onboarding onComplete={handleOnboardingComplete} key="onboarding" />}
        {step === 'body-upload' && <BodyUpload onComplete={handleBodyUploadComplete} key="body-upload" />}
        {step === 'closet-upload' && <ClosetUpload onComplete={handleClosetUploadComplete} key="closet-upload" />}
        {step === 'analyzing' && <AnalyzingScreen key="analyzing" />}
        {step === 'dashboard' && <Dashboard user={user} key="dashboard" />}
      </AnimatePresence>
    </div>
  );
}

// --- Page Components ---

function LandingPage({ onStart }: { onStart: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col"
    >
      <div className="relative h-[40vh] overflow-hidden">
        <img 
          src="https://picsum.photos/seed/fashion-premium/800/1200" 
          alt="Fashion" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-nude via-brand-nude/20 to-transparent" />
      </div>

      <div className="flex-1 px-8 -mt-12 relative z-10">
        <motion.span 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xs uppercase tracking-widest font-semibold text-brand-gold mb-4 block"
        >
          Sua Personal Stylist Digital
        </motion.span>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl leading-tight mb-6"
        >
          Descubra como se vestir melhor com as roupas que você <span className="italic">já tem</span>.
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-base text-brand-ink/70 mb-8 leading-relaxed"
        >
          Envie sua foto, mostre suas peças e receba looks personalizados que valorizam seu corpo, seu estilo e sua rotina.
        </motion.p>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 gap-4 mb-12"
        >
          {[
            'Looks práticos',
            'Estratégia visual',
            'Economia real',
            'Autoestima'
          ].map((benefit, i) => (
            <div key={i} className="flex items-center gap-2 text-xs font-semibold bg-white/40 p-3 rounded-xl border border-white/20">
              <CheckCircle2 size={14} className="text-brand-gold" />
              {benefit}
            </div>
          ))}
        </motion.div>

        <section className="mb-12">
          <p className="text-[10px] uppercase tracking-widest text-brand-ink/40 mb-4 text-center">O que dizem nossas clientes</p>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {[
              { name: 'Mariana S.', text: 'Minha rotina mudou! Não perco mais tempo escolhendo o que vestir.' },
              { name: 'Juliana R.', text: 'Finalmente entendi o que valoriza meu corpo. App incrível!' }
            ].map((review, i) => (
              <div key={i} className="min-w-[200px] bg-white/60 p-4 rounded-2xl text-xs italic leading-relaxed border border-white/20">
                "{review.text}"
                <p className="mt-2 font-bold not-italic text-brand-gold">— {review.name}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="p-8 pt-0"
      >
        <Button onClick={onStart} className="w-full py-5 text-lg shadow-xl shadow-brand-ink/10">
          Começar minha análise
          <ChevronRight size={20} />
        </Button>
        <p className="text-center text-xs text-brand-ink/40 mt-6">
          Já tem uma conta? <span className="underline font-medium cursor-pointer">Fazer login</span>
        </p>
      </motion.div>
    </motion.div>
  );
}

function Onboarding({ onComplete }: { onComplete: () => void }) {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questions = [
    {
      title: "Qual é o seu estilo de vida predominante?",
      options: ["Corporativo/Formal", "Criativo/Casual", "Home Office", "Maternidade Ativa", "Estudante"]
    },
    {
      title: "Qual sua maior dificuldade ao se vestir?",
      options: ["Combinar cores", "Escolher o caimento certo", "Falta de tempo", "Sinto que não tenho roupas", "Me sinto básica demais"]
    },
    {
      title: "Qual seu principal objetivo de imagem?",
      options: ["Transmitir autoridade", "Parecer mais acessível", "Elevar a autoestima", "Praticidade no dia a dia", "Modernizar o visual"]
    }
  ];

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <motion.div 
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      className="flex-1 flex flex-col p-8 pt-16"
    >
      <div className="mb-12">
        <div className="flex gap-2 mb-8">
          {questions.map((_, i) => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= currentQuestion ? 'bg-brand-ink' : 'bg-brand-beige'}`} />
          ))}
        </div>
        <h2 className="text-3xl mb-4">{questions[currentQuestion].title}</h2>
        <p className="text-brand-ink/60 text-sm">Selecione a opção que mais se aproxima da sua realidade atual.</p>
      </div>

      <div className="flex-1 space-y-3">
        {questions[currentQuestion].options.map((option, i) => (
          <motion.div
            key={option}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={handleNext}
            className="p-5 rounded-2xl border border-brand-beige/50 bg-white/50 hover:border-brand-ink hover:bg-white transition-all cursor-pointer group flex justify-between items-center"
          >
            <span className="font-medium">{option}</span>
            <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 transition-all" />
          </motion.div>
        ))}
      </div>

      <Button variant="ghost" onClick={() => currentQuestion > 0 && setCurrentQuestion(prev => prev - 1)} className="mt-4">
        Voltar
      </Button>
    </motion.div>
  );
}

function BodyUpload({ onComplete }: { onComplete: () => void }) {
  const [isUploading, setIsUploading] = React.useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      onComplete();
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      className="flex-1 flex flex-col p-8 pt-16"
    >
      <h2 className="text-3xl mb-4">Análise de Biotipo</h2>
      <p className="text-brand-ink/60 mb-12">
        Para sugerirmos os melhores caimentos, precisamos entender suas proporções. 
        Tire uma foto de corpo inteiro em um ambiente iluminado.
      </p>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full aspect-[3/4] rounded-3xl border-2 border-dashed border-brand-beige flex flex-col items-center justify-center gap-4 bg-white/30 relative overflow-hidden group cursor-pointer">
          {isUploading ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-brand-rose border-t-brand-ink rounded-full animate-spin" />
              <p className="text-sm font-medium">Analisando proporções...</p>
            </div>
          ) : (
            <>
              <div className="w-16 h-16 rounded-full bg-brand-rose/30 flex items-center justify-center text-brand-ink group-hover:scale-110 transition-transform">
                <Camera size={32} />
              </div>
              <div className="text-center">
                <p className="font-medium">Tirar foto agora</p>
                <p className="text-xs text-brand-ink/40">ou clique para escolher da galeria</p>
              </div>
            </>
          )}
          <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleUpload} />
        </div>

        <div className="mt-8 p-4 rounded-2xl bg-brand-rose/20 flex gap-3">
          <Info size={20} className="text-brand-ink shrink-0" />
          <p className="text-xs leading-relaxed text-brand-ink/70">
            Sua privacidade é nossa prioridade. Esta foto será usada apenas para análise visual de proporções e nunca será compartilhada.
          </p>
        </div>
      </div>

      <Button onClick={onComplete} variant="ghost" className="mt-8">
        Pular por enquanto
      </Button>
    </motion.div>
  );
}

function ClosetUpload({ onComplete }: { onComplete: () => void }) {
  const [items, setItems] = React.useState<string[]>([]);
  const categories: { label: string, key: ClothingCategory }[] = [
    { label: 'Blusas', key: 'tops' },
    { label: 'Calças/Saias', key: 'bottoms' },
    { label: 'Vestidos', key: 'dresses' },
    { label: 'Casacos', key: 'outerwear' },
    { label: 'Calçados', key: 'shoes' },
    { label: 'Acessórios', key: 'accessories' }
  ];

  const handleAdd = () => {
    setItems(prev => [...prev, `item-${prev.length}`]);
  };

  return (
    <motion.div 
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      className="flex-1 flex flex-col p-8 pt-16"
    >
      <div className="mb-8">
        <h2 className="text-3xl mb-2">Seu Guarda-Roupa</h2>
        <p className="text-brand-ink/60 text-sm">Adicione aproximadamente 20 peças para uma análise completa.</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-8 pr-2">
        {categories.map(cat => (
          <div key={cat.key}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-ink/40 mb-4">{cat.label}</h3>
            <div className="grid grid-cols-3 gap-3">
              <div 
                onClick={handleAdd}
                className="aspect-square rounded-2xl border-2 border-dashed border-brand-beige flex items-center justify-center bg-white/30 hover:bg-white transition-all cursor-pointer"
              >
                <Plus size={24} className="text-brand-beige" />
              </div>
              {items.slice(0, 2).map((_, i) => (
                <div key={i} className="aspect-square rounded-2xl bg-white shadow-sm overflow-hidden relative group">
                  <img src={`https://picsum.photos/seed/item${i}${cat.key}/200`} alt="Item" className="w-full h-full object-cover" />
                  <button className="absolute top-1 right-1 p-1 bg-black/20 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all">
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-6 border-t border-brand-beige/30 mt-4">
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm font-medium">{items.length + 12} de 20 peças</span>
          <div className="h-1.5 w-32 bg-brand-beige rounded-full overflow-hidden">
            <div className="h-full bg-brand-ink" style={{ width: `${((items.length + 12) / 20) * 100}%` }} />
          </div>
        </div>
        <Button onClick={onComplete} className="w-full">
          Finalizar Closet
        </Button>
      </div>
    </motion.div>
  );
}

function AnalyzingScreen() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col items-center justify-center p-12 text-center"
    >
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="w-32 h-32 rounded-full bg-brand-rose/30 flex items-center justify-center mb-8"
      >
        <Sparkles size={48} className="text-brand-ink" />
      </motion.div>
      <h2 className="text-3xl mb-4">Criando sua estratégia de estilo...</h2>
      <p className="text-brand-ink/60 leading-relaxed">
        Nossa inteligência está analisando suas peças, seu biotipo e seus objetivos para criar combinações únicas.
      </p>
      
      <div className="mt-12 space-y-4 w-full max-w-xs">
        {['Lendo tecidos e texturas', 'Equilibrando proporções', 'Organizando por ocasiões'].map((text, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.8 }}
            className="flex items-center gap-3 text-sm text-brand-ink/70"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
            {text}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function Dashboard({ user }: { user: User }) {
  const [activeTab, setActiveTab] = React.useState<'home' | 'closet' | 'looks' | 'premium'>('home');

  return (
    <div className="flex-1 flex flex-col h-full">
      <header className="p-6 flex justify-between items-center bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <h1 className="text-2xl">Closet Inteligente</h1>
        <div className="w-10 h-10 rounded-full bg-brand-rose flex items-center justify-center overflow-hidden border-2 border-white">
          <UserIcon size={20} />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 pb-24">
        {activeTab === 'home' && <HomeTab />}
        {activeTab === 'closet' && <ClosetTab />}
        {activeTab === 'looks' && <LooksTab />}
        {activeTab === 'premium' && <PremiumTab />}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-lg border-t border-brand-beige/30 p-4 flex justify-around items-center z-20">
        <NavButton active={activeTab === 'home'} onClick={() => setActiveTab('home')} icon={<Home size={20} />} label="Início" />
        <NavButton active={activeTab === 'closet'} onClick={() => setActiveTab('closet')} icon={<LayoutGrid size={20} />} label="Closet" />
        <NavButton active={activeTab === 'looks'} onClick={() => setActiveTab('looks')} icon={<Sparkles size={20} />} label="Looks" />
        <NavButton active={activeTab === 'premium'} onClick={() => setActiveTab('premium')} icon={<Crown size={20} />} label="Premium" />
      </nav>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-brand-ink scale-110' : 'text-brand-ink/40'}`}
    >
      {icon}
      <span className="text-[10px] font-semibold uppercase tracking-tighter">{label}</span>
    </button>
  );
}

function HomeTab() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-brand-gold mb-4">Seu Perfil de Estilo</h2>
        <Card className="bg-gradient-to-br from-white to-brand-rose/20">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-2xl mb-1">Elegante & Prática</h3>
              <p className="text-xs text-brand-ink/60">Biotipo: Ampulheta Suave</p>
            </div>
            <Sparkles className="text-brand-gold" size={24} />
          </div>
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-white/50 text-sm">
              <p className="font-semibold mb-1">Ponto forte a valorizar:</p>
              <p className="text-brand-ink/70">Sua cintura bem definida e ombros equilibrados.</p>
            </div>
            <div className="p-3 rounded-xl bg-white/50 text-sm">
              <p className="font-semibold mb-1">Dica de ouro:</p>
              <p className="text-brand-ink/70">Use linhas verticais para alongar e tecidos com caimento fluido.</p>
            </div>
          </div>
        </Card>
      </section>

      <section>
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-brand-gold">Looks Sugeridos</h2>
          <span className="text-xs font-medium underline">Ver todos</span>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
          {MOCK_LOOKS.map(look => (
            <div key={look.id} className="min-w-[280px] group cursor-pointer">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden mb-3 relative">
                <img src={look.items[0].imageUrl} alt="Look" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/80 mb-1">{look.occasion}</span>
                  <p className="text-white font-serif text-lg">Combinação Estratégica</p>
                </div>
                <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-brand-ink transition-all">
                  <Heart size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <Card className="bg-brand-ink text-white">
          <div className="flex gap-4 items-center">
            <div className="w-16 h-16 rounded-2xl bg-brand-gold/20 flex items-center justify-center shrink-0">
              <Crown className="text-brand-gold" size={32} />
            </div>
            <div>
              <h3 className="text-xl mb-1">Provador Virtual</h3>
              <p className="text-xs text-white/60 mb-3">Teste novas peças antes de comprar.</p>
              <button className="text-xs font-bold uppercase tracking-widest text-brand-gold">Desbloquear Premium</button>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}

function ClosetTab() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl">Meu Closet</h2>
        <button className="w-10 h-10 rounded-full bg-brand-ink text-white flex items-center justify-center">
          <Plus size={20} />
        </button>
      </div>
      
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
        {['Todos', 'Blusas', 'Calças', 'Vestidos', 'Casacos', 'Sapatos'].map((cat, i) => (
          <button key={cat} className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${i === 0 ? 'bg-brand-ink text-white' : 'bg-white text-brand-ink/60 border border-brand-beige/30'}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="aspect-[3/4] rounded-2xl bg-white shadow-sm overflow-hidden group relative">
            <img src={`https://picsum.photos/seed/closet${i}/400/600`} alt="Item" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/40 to-transparent">
              <p className="text-white text-[10px] font-bold uppercase tracking-widest">Casual</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LooksTab() {
  const [selectedLook, setSelectedLook] = React.useState<Look | null>(null);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl">Looks para Mim</h2>
      
      <div className="space-y-6">
        {MOCK_LOOKS.map(look => (
          <Card key={look.id} className="p-0 overflow-hidden">
            <div className="flex h-64">
              <div className="w-1/2 h-full">
                <img src={look.items[0].imageUrl} alt="Main" className="w-full h-full object-cover" />
              </div>
              <div className="w-1/2 flex flex-col">
                <div className="h-1/2 border-b border-brand-beige/20">
                  <img src={look.items[1].imageUrl} alt="Sub" className="w-full h-full object-cover" />
                </div>
                <div className="h-1/2">
                  <img src={look.items[2].imageUrl} alt="Sub" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">{look.occasion}</span>
                  <h3 className="text-xl">Equilíbrio & Sofisticação</h3>
                </div>
                <button className="text-brand-rose hover:text-red-400 transition-colors">
                  <Heart size={24} />
                </button>
              </div>
              <p className="text-sm text-brand-ink/70 leading-relaxed mb-6 line-clamp-2">
                {look.explanation}
              </p>
              <Button onClick={() => setSelectedLook(look)} variant="secondary" className="w-full py-3 text-sm">
                Ver detalhes do look
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <AnimatePresence>
        {selectedLook && (
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="fixed inset-0 z-50 bg-brand-nude overflow-y-auto"
          >
            <div className="p-6">
              <button onClick={() => setSelectedLook(null)} className="mb-8 flex items-center gap-2 text-sm font-semibold">
                <ArrowLeft size={20} />
                Voltar para looks
              </button>

              <div className="aspect-[3/4] rounded-3xl overflow-hidden mb-8 shadow-xl">
                <img src={selectedLook.items[0].imageUrl} alt="Look" className="w-full h-full object-cover" />
              </div>

              <h2 className="text-3xl mb-6">Por que este look funciona?</h2>
              <Card className="mb-8 bg-white">
                <p className="text-brand-ink/80 leading-relaxed mb-6">
                  {selectedLook.explanation}
                </p>
                <div className="space-y-3">
                  {selectedLook.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm font-medium text-brand-ink">
                      <div className="w-2 h-2 rounded-full bg-brand-gold" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </Card>

              <h3 className="text-sm font-semibold uppercase tracking-widest text-brand-gold mb-4">Peças utilizadas</h3>
              <div className="grid grid-cols-3 gap-3 mb-12">
                {selectedLook.items.map((item, i) => (
                  <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-white shadow-sm">
                    <img src={item.imageUrl} alt="Item" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>

              <Button className="w-full mb-12">Salvar nos Favoritos</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PremiumTab() {
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [result, setResult] = React.useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setResult(true);
    }, 3000);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/20 text-brand-gold text-[10px] font-bold uppercase tracking-widest mb-2">
          <Crown size={12} />
          Funcionalidade Premium
        </div>
        <h2 className="text-3xl">Provador de Novas Peças</h2>
        <p className="text-brand-ink/60 text-sm">Envie uma peça da internet e descubra se ela combina com você.</p>
      </div>

      <Card className="border-2 border-brand-gold/30 bg-white">
        <div className="aspect-video rounded-2xl border-2 border-dashed border-brand-beige flex flex-col items-center justify-center gap-3 bg-brand-nude/30 mb-6 group cursor-pointer overflow-hidden relative">
          {isAnalyzing ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-brand-gold/20 border-t-brand-gold rounded-full animate-spin" />
              <p className="text-sm font-medium">Analisando compatibilidade...</p>
            </div>
          ) : (
            <>
              <Upload size={32} className="text-brand-beige group-hover:text-brand-gold transition-colors" />
              <p className="text-sm font-medium">Upload da peça ou colar link</p>
            </>
          )}
          <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleAnalyze} />
        </div>

        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex gap-3">
              <CheckCircle2 className="text-emerald-500 shrink-0" size={20} />
              <div>
                <p className="text-sm font-bold text-emerald-900">Vale a pena comprar!</p>
                <p className="text-xs text-emerald-700">Esta peça combina com 85% do seu closet atual e valoriza seu biotipo.</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-widest text-brand-gold">Sugestão de Look</h4>
              <div className="flex gap-3">
                <div className="w-20 h-24 rounded-xl bg-brand-nude overflow-hidden border-2 border-brand-gold">
                  <img src="https://picsum.photos/seed/newitem/200/300" alt="New" className="w-full h-full object-cover" />
                </div>
                <Plus size={16} className="mt-8 text-brand-beige" />
                <div className="w-20 h-24 rounded-xl bg-brand-nude overflow-hidden">
                  <img src={MOCK_CLOSET[1].imageUrl} alt="Existing" className="w-full h-full object-cover" />
                </div>
                <Plus size={16} className="mt-8 text-brand-beige" />
                <div className="w-20 h-24 rounded-xl bg-brand-nude overflow-hidden">
                  <img src={MOCK_CLOSET[3].imageUrl} alt="Existing" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            <Button className="w-full">Ver Simulação no Meu Corpo</Button>
          </motion.div>
        )}

        {!result && !isAnalyzing && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-brand-ink/70">
              <CheckCircle2 size={16} className="text-brand-gold" />
              Análise de compatibilidade de estilo
            </div>
            <div className="flex items-center gap-3 text-sm text-brand-ink/70">
              <CheckCircle2 size={16} className="text-brand-gold" />
              Sugestão de looks com seu closet
            </div>
            <div className="flex items-center gap-3 text-sm text-brand-ink/70">
              <CheckCircle2 size={16} className="text-brand-gold" />
              Simulação visual aproximada
            </div>
          </div>
        )}
      </Card>

      <div className="p-6 rounded-3xl bg-brand-ink text-white text-center space-y-4">
        <h3 className="text-2xl">Torne-se Premium</h3>
        <p className="text-sm text-white/60">Acesso ilimitado ao provador virtual e consultoria personalizada via chat.</p>
        <div className="text-3xl font-serif">R$ 47,90<span className="text-sm font-sans text-white/40">/mês</span></div>
        <Button variant="premium" className="w-full">Quero ser Premium agora</Button>
      </div>
    </div>
  );
}
