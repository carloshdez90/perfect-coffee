import React, { useState, useEffect } from 'react';
import { Coffee, Droplets, Calculator, Timer, BookOpen, Settings, Users, Thermometer, Zap, Plus, Minus, RotateCcw, ChevronDown, Star, Waves, Power, Crown, Sparkles } from 'lucide-react';

const CoffeeRatioCalculator = () => {
  const [coffeeAmount, setCoffeeAmount] = useState(20);
  const [waterAmount, setWaterAmount] = useState(300);
  const [selectedMethod, setSelectedMethod] = useState('v60');
  const [calculationMode, setCalculationMode] = useState('coffee');
  const [customRatio, setCustomRatio] = useState(15);
  const [cups, setCups] = useState(1);
  const [activeTab, setActiveTab] = useState('calculator');
  const [beanNotes, setBeanNotes] = useState('');
  const [savedBeans, setSavedBeans] = useState([]);
  const [sliderMode, setSliderMode] = useState('water');
  const [showMethodDetails, setShowMethodDetails] = useState(false);

  const brewMethods = {
    v60: { 
      name: 'V60', 
      ratio: 15, 
      time: '2:30-3:00',
      grind: 'Medio-fino',
      temp: '92-96°C',
      description: 'Filtro cónico con surcos espirales',
      icon: Waves,
      color: 'from-amber-400 to-orange-500'
    },
    chemex: { 
      name: 'Chemex', 
      ratio: 16, 
      time: '4:00-5:00',
      grind: 'Medio-grueso',
      temp: '93-96°C',
      description: 'Filtro grueso, cuerpo limpio',
      icon: Crown,
      color: 'from-blue-400 to-cyan-500'
    },
    frenchpress: { 
      name: 'French Press', 
      ratio: 12, 
      time: '4:00',
      grind: 'Grueso',
      temp: '93-96°C',
      description: 'Inmersión completa',
      icon: Timer,
      color: 'from-red-400 to-pink-500'
    },
    aeropress: { 
      name: 'AeroPress', 
      ratio: 14, 
      time: '1:30-2:30',
      grind: 'Fino-medio',
      temp: '80-92°C',
      description: 'Presión y filtro micro',
      icon: Star,
      color: 'from-purple-400 to-violet-500'
    },
    pourover: { 
      name: 'Pour Over', 
      ratio: 15, 
      time: '3:00-4:00',
      grind: 'Medio',
      temp: '92-96°C',
      description: 'Vertido manual controlado',
      icon: Droplets,
      color: 'from-teal-400 to-emerald-500'
    },
    espresso: { 
      name: 'Espresso', 
      ratio: 2, 
      time: '25-30s',
      grind: 'Muy fino',
      temp: '90-94°C',
      description: 'Presión alta concentrada',
      icon: Zap,
      color: 'from-yellow-400 to-amber-500'
    }
  };

  const popularRecipes = {
    v60: [
      {
        name: 'James Hoffmann V60',
        author: 'James Hoffmann',
        ratio: '1:16.7',
        coffee: '30g',
        water: '500g',
        steps: ['Bloom 60g agua x 45s', 'Vertido hasta 300g', 'Vertido final hasta 500g'],
        source: 'YouTube',
        rating: 4.9
      },
      {
        name: 'Tetsu Kasuya 4:6',
        author: 'Tetsu Kasuya',
        ratio: '1:15',
        coffee: '20g',
        water: '300g',
        steps: ['40% agua en 2 vertidos', '60% agua en 3 vertidos', 'Control acidez/dulzor'],
        source: 'World Champion 2016',
        rating: 4.8
      }
    ],
    chemex: [
      {
        name: 'Chemex Clásico',
        author: 'Chemex Corp',
        ratio: '1:15',
        coffee: '42g',
        water: '630g',
        steps: ['Pre-infusión 30s', 'Vertidos circulares lentos', 'Tiempo total 5-6 min'],
        source: 'Official Guide',
        rating: 4.7
      },
      {
        name: 'Blue Bottle Chemex',
        author: 'Blue Bottle Coffee',
        ratio: '1:17',
        coffee: '50g',
        water: '850g',
        steps: ['Bloom 30s con 100g agua', 'Vertidos de 150g cada 45s', 'Total 4-5 min'],
        source: 'Blue Bottle Guide',
        rating: 4.6
      }
    ],
    frenchpress: [
      {
        name: 'Hoffmann Method',
        author: 'James Hoffmann',
        ratio: '1:15',
        coffee: '30g',
        water: '450g',
        steps: ['Inmersión 4 min', 'Romper costra', 'Esperar 5-8 min', 'Servir sin presionar'],
        source: 'YouTube',
        rating: 4.9
      },
      {
        name: 'Classic French Press',
        author: 'Counter Culture Coffee',
        ratio: '1:12',
        coffee: '56g',
        water: '680g',
        steps: ['Agua a 200°F', 'Inmersión 4 min', 'Revolver 30s', 'Presionar lentamente'],
        source: 'Counter Culture',
        rating: 4.5
      }
    ],
    aeropress: [
      {
        name: 'Inverted Method',
        author: 'Tim Wendelboe',
        ratio: '1:14',
        coffee: '18g',
        water: '250g',
        steps: ['Método invertido', 'Inmersión 1:30', 'Presión lenta 30s'],
        source: 'World Champion',
        rating: 4.6
      },
      {
        name: 'Standard AeroPress',
        author: 'AeroPress Inc',
        ratio: '1:16',
        coffee: '17g',
        water: '270g',
        steps: ['Café en cámara', 'Agua caliente', 'Revolver 10s', 'Presionar 20s'],
        source: 'Official Recipe',
        rating: 4.4
      }
    ],
    pourover: [
      {
        name: 'Kalita Wave',
        author: 'Kalita',
        ratio: '1:16',
        coffee: '22g',
        water: '350g',
        steps: ['Bloom 45s', '3 vertidos pausados', 'Mantener nivel agua'],
        source: 'Official Method',
        rating: 4.5
      },
      {
        name: 'Onyx Coffee Wave',
        author: 'Onyx Coffee Lab',
        ratio: '1:15',
        coffee: '25g',
        water: '375g',
        steps: ['Bloom 30s', 'Vertidos concéntricos', '2:30 tiempo total'],
        source: 'Onyx Coffee Lab',
        rating: 4.7
      }
    ],
    espresso: [
      {
        name: 'Modern Espresso',
        author: 'Matt Perger',
        ratio: '1:2.5',
        coffee: '20g',
        water: '50g',
        steps: ['Molienda fina', 'Distribución uniforme', 'Tamping 15kg', '25-30s extracción'],
        source: 'World Champion',
        rating: 4.8
      },
      {
        name: 'Ristretto Style',
        author: 'La Marzocco',
        ratio: '1:2',
        coffee: '18g',
        water: '36g',
        steps: ['Molienda extra fina', 'Pre-infusión 3s', 'Extracción 25s', 'Crema dorada'],
        source: 'La Marzocco',
        rating: 4.6
      }
    ]
  };

  const coffeeRecipes = {
    hot: [
      {
        name: 'Latte Vainilla',
        ingredients: ['240ml leche', '60ml espresso', '15ml jarabe vainilla'],
        steps: ['Preparar espresso doble', 'Calentar y espumar leche', 'Añadir jarabe', 'Verter leche sobre espresso'],
        temp: 'Caliente',
        difficulty: 'Fácil'
      },
      {
        name: 'Cappuccino Clásico',
        ingredients: ['180ml leche', '60ml espresso', 'Canela al gusto'],
        steps: ['Preparar espresso', 'Espumar leche hasta textura sedosa', 'Verter 1/3 leche y 2/3 espuma', 'Espolvorear canela'],
        temp: 'Caliente',
        difficulty: 'Medio'
      },
      {
        name: 'Americano',
        ingredients: ['240ml agua caliente', '60ml espresso'],
        steps: ['Preparar espresso doble', 'Añadir agua caliente', 'Servir inmediatamente'],
        temp: 'Caliente',
        difficulty: 'Fácil'
      },
      {
        name: 'Mocha',
        ingredients: ['240ml leche', '60ml espresso', '30ml chocolate', 'Crema batida'],
        steps: ['Mezclar chocolate con espresso', 'Calentar leche', 'Combinar todo', 'Decorar con crema'],
        temp: 'Caliente',
        difficulty: 'Medio'
      },
      {
        name: 'Macchiato Caramelo',
        ingredients: ['60ml espresso', '15ml jarabe caramelo', '120ml leche', 'Caramelo líquido'],
        steps: ['Preparar espresso', 'Añadir jarabe', 'Espumar poca leche', 'Decorar con caramelo'],
        temp: 'Caliente',
        difficulty: 'Difícil'
      }
    ],
    cold: [
      {
        name: 'Cold Brew',
        ingredients: ['100g café molido grueso', '1L agua fría'],
        steps: ['Mezclar café y agua', 'Dejar reposar 12-24h', 'Filtrar', 'Servir con hielo'],
        temp: 'Frío',
        difficulty: 'Fácil'
      },
      {
        name: 'Iced Latte',
        ingredients: ['240ml leche fría', '60ml espresso', 'Hielo', 'Jarabe opcional'],
        steps: ['Preparar espresso', 'Enfriar', 'Llenar vaso con hielo', 'Añadir leche y espresso'],
        temp: 'Frío',
        difficulty: 'Fácil'
      },
      {
        name: 'Frappé',
        ingredients: ['180ml café frío', '120ml leche', 'Hielo', '30ml jarabe', 'Crema batida'],
        steps: ['Licuar café, leche, hielo y jarabe', 'Servir en vaso alto', 'Decorar con crema'],
        temp: 'Frío',
        difficulty: 'Medio'
      },
      {
        name: 'Affogato',
        ingredients: ['60ml espresso caliente', '1 bola helado vainilla'],
        steps: ['Colocar helado en taza', 'Preparar espresso', 'Verter sobre helado', 'Servir inmediatamente'],
        temp: 'Frío',
        difficulty: 'Fácil'
      },
      {
        name: 'Iced Americano',
        ingredients: ['60ml espresso', '180ml agua fría', 'Hielo'],
        steps: ['Preparar espresso', 'Llenar vaso con hielo', 'Añadir agua fría', 'Verter espresso'],
        temp: 'Frío',
        difficulty: 'Fácil'
      }
    ]
  };

  const currentMethod = brewMethods[selectedMethod];

  // Simplified calculation logic
  useEffect(() => {
    const expectedWater = Math.round(coffeeAmount * customRatio);
    const expectedCoffee = Math.round(waterAmount / customRatio);
    
    if (calculationMode === 'coffee' && Math.abs(waterAmount - expectedWater) > 1) {
      setWaterAmount(expectedWater);
    } else if (calculationMode === 'water' && Math.abs(coffeeAmount - expectedCoffee) > 1) {
      setCoffeeAmount(expectedCoffee);
    } else if (calculationMode === 'ratio') {
      if (sliderMode === 'water') {
        const newWater = Math.round(coffeeAmount * customRatio);
        if (Math.abs(waterAmount - newWater) > 1) {
          setWaterAmount(newWater);
        }
      } else {
        const newCoffee = Math.round(waterAmount / customRatio);
        if (Math.abs(coffeeAmount - newCoffee) > 1) {
          setCoffeeAmount(newCoffee);
        }
      }
    }
  }, [coffeeAmount, waterAmount, customRatio, calculationMode, sliderMode]);

  const handleCoffeeChange = (value) => {
    setCoffeeAmount(value);
    setCalculationMode('coffee');
    const perCupCoffee = value / cups;
    const perCupWater = waterAmount / cups;
    const newRatio = Math.round((perCupWater / perCupCoffee) * 10) / 10;
    if (newRatio > 0 && newRatio <= 20) {
      setCustomRatio(newRatio);
    }
  };

  const handleWaterChange = (value) => {
    setWaterAmount(value);
    setCalculationMode('water');
    const perCupCoffee = coffeeAmount / cups;
    const perCupWater = value / cups;
    const newRatio = Math.round((perCupWater / perCupCoffee) * 10) / 10;
    if (newRatio > 0 && newRatio <= 20) {
      setCustomRatio(newRatio);
    }
  };

  const handleMethodChange = (methodKey) => {
    setSelectedMethod(methodKey);
    setCustomRatio(brewMethods[methodKey].ratio);
    setCalculationMode('ratio');
  };

  const handleRatioChange = (ratio) => {
    setCustomRatio(ratio);
    setCalculationMode('ratio');
  };

  const handleCupsChange = (newCups) => {
    if (newCups < 1) return;
    
    const currentCoffeePerCup = coffeeAmount / cups;
    const currentWaterPerCup = waterAmount / cups;
    
    const newCoffeeTotal = Math.round(currentCoffeePerCup * newCups);
    const newWaterTotal = Math.round(currentWaterPerCup * newCups);
    
    setCups(newCups);
    setCoffeeAmount(newCoffeeTotal);
    setWaterAmount(newWaterTotal);
  };

  const saveBeanConfig = () => {
    if (beanNotes.trim()) {
      const newBean = {
        id: Date.now(),
        name: beanNotes.trim(),
        method: selectedMethod,
        ratio: customRatio,
        coffee: coffeeAmount,
        water: waterAmount,
        cups: cups,
        date: new Date().toLocaleDateString()
      };
      setSavedBeans([...savedBeans, newBean]);
      setBeanNotes('');
    }
  };

  const loadBeanConfig = (bean) => {
    setSelectedMethod(bean.method);
    setCustomRatio(bean.ratio);
    setCoffeeAmount(bean.coffee);
    setWaterAmount(bean.water);
    setCups(bean.cups);
    setActiveTab('calculator');
  };

  const resetToDefaults = () => {
    setCoffeeAmount(20);
    setWaterAmount(300);
    setSelectedMethod('v60');
    setCustomRatio(15);
    setCups(1);
    setSliderMode('water');
    setCalculationMode('coffee');
  };

  const getRatioStrength = () => {
    if (customRatio < 12) return { text: 'Intenso', color: 'text-red-400', bg: 'bg-red-500/20' };
    if (customRatio < 14) return { text: 'Fuerte', color: 'text-orange-400', bg: 'bg-orange-500/20' };
    if (customRatio < 16) return { text: 'Equilibrado', color: 'text-green-400', bg: 'bg-green-500/20' };
    if (customRatio < 18) return { text: 'Suave', color: 'text-blue-400', bg: 'bg-blue-500/20' };
    return { text: 'Muy Suave', color: 'text-purple-400', bg: 'bg-purple-500/20' };
  };

  const strength = getRatioStrength();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-md mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-2">
            Perfect Coffee
          </h1>
          <p className="text-gray-400">Craft your ideal brew</p>
        </div>

        {/* Navigation */}
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-1.5 mb-8 shadow-2xl">
          <div className="flex">
            {[
              { id: 'calculator', icon: Calculator, label: 'Brew' },
              { id: 'recipes', icon: BookOpen, label: 'Methods' },
              { id: 'coffee-recipes', icon: Coffee, label: 'Drinks' },
              { id: 'beans', icon: Settings, label: 'Saved' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex flex-col items-center justify-center py-3 px-2 rounded-2xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <tab.icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Calculator Tab */}
        {activeTab === 'calculator' && (
          <div className="space-y-6">
            {/* Hero Ratio Display */}
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <div className="text-6xl font-bold bg-gradient-to-br from-white to-gray-300 bg-clip-text text-transparent mb-2">
                  1:{customRatio}
                </div>
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${strength.bg} ${strength.color} border border-current/20`}>
                  {strength.text}
                </div>
              </div>
              <div className="text-gray-400 text-sm mt-3">
                {coffeeAmount}g coffee • {waterAmount}ml water • {cups} cup{cups > 1 ? 's' : ''}
              </div>
            </div>

            {/* Method Selection */}
            <div className="bg-gray-800/30 backdrop-blur-xl rounded-3xl border border-gray-700/30 p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Brewing Method</h2>
                <currentMethod.icon className="w-6 h-6 text-amber-400" />
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                {Object.entries(brewMethods).map(([key, method]) => (
                  <button
                    key={key}
                    onClick={() => handleMethodChange(key)}
                    className={`relative p-4 rounded-2xl transition-all duration-300 border overflow-hidden group ${
                      selectedMethod === key
                        ? `bg-gradient-to-br ${method.color} text-white border-white/20 shadow-lg`
                        : 'bg-gray-700/30 border-gray-600/30 text-gray-300 hover:bg-gray-600/40 hover:border-gray-500/50'
                    }`}
                  >
                    <div className="relative z-10">
                      <method.icon className="w-5 h-5 mb-2" />
                      <div className="font-semibold text-sm">{method.name}</div>
                      <div className="text-xs opacity-75">1:{method.ratio}</div>
                    </div>
                    {selectedMethod === key && (
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                    )}
                  </button>
                ))}
              </div>

              {/* Method Details Toggle */}
              <button
                onClick={() => setShowMethodDetails(!showMethodDetails)}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-700/20 text-gray-300 hover:bg-gray-600/30 transition-all"
              >
                <span className="text-sm">Method Details</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showMethodDetails ? 'rotate-180' : ''}`} />
              </button>

              {showMethodDetails && (
                <div className="mt-4 p-4 bg-gray-700/20 rounded-xl">
                  <p className="text-gray-300 text-sm mb-4">{currentMethod.description}</p>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center">
                      <Zap className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
                      <div className="text-xs text-gray-400">Grind</div>
                      <div className="text-white text-sm font-medium">{currentMethod.grind}</div>
                    </div>
                    <div className="text-center">
                      <Thermometer className="w-4 h-4 text-red-400 mx-auto mb-1" />
                      <div className="text-xs text-gray-400">Temp</div>
                      <div className="text-white text-sm font-medium">{currentMethod.temp}</div>
                    </div>
                    <div className="text-center">
                      <Timer className="w-4 h-4 text-green-400 mx-auto mb-1" />
                      <div className="text-xs text-gray-400">Time</div>
                      <div className="text-white text-sm font-medium">{currentMethod.time}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Main Controls Grid */}
            <div className="grid grid-cols-3 gap-4">
              {/* Cups */}
              <div className="bg-gray-800/30 backdrop-blur-xl rounded-2xl border border-gray-700/30 p-4 shadow-xl">
                <div className="text-center">
                  <Users className="w-5 h-5 text-blue-400 mx-auto mb-3" />
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => handleCupsChange(Math.max(1, cups - 1))}
                      className="w-8 h-8 rounded-full bg-gray-700/50 flex items-center justify-center text-white hover:bg-gray-600/50 transition-all active:scale-95"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <div>
                      <div className="text-xl font-bold text-white">{cups}</div>
                      <div className="text-xs text-gray-400">cups</div>
                    </div>
                    <button
                      onClick={() => handleCupsChange(cups + 1)}
                      className="w-8 h-8 rounded-full bg-gray-700/50 flex items-center justify-center text-white hover:bg-gray-600/50 transition-all active:scale-95"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Coffee */}
              <div className="bg-gray-800/30 backdrop-blur-xl rounded-2xl border border-gray-700/30 p-4 shadow-xl">
                <div className="text-center">
                  <Coffee className="w-5 h-5 text-amber-400 mx-auto mb-3" />
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => handleCoffeeChange(Math.max(1, coffeeAmount - 1))}
                      className="w-8 h-8 rounded-full bg-gray-700/50 flex items-center justify-center text-white hover:bg-gray-600/50 transition-all active:scale-95"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <div>
                      <div className="text-xl font-bold text-white">{coffeeAmount}</div>
                      <div className="text-xs text-gray-400">grams</div>
                    </div>
                    <button
                      onClick={() => handleCoffeeChange(coffeeAmount + 1)}
                      className="w-8 h-8 rounded-full bg-gray-700/50 flex items-center justify-center text-white hover:bg-gray-600/50 transition-all active:scale-95"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Water */}
              <div className="bg-gray-800/30 backdrop-blur-xl rounded-2xl border border-gray-700/30 p-4 shadow-xl">
                <div className="text-center">
                  <Droplets className="w-5 h-5 text-blue-400 mx-auto mb-3" />
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => handleWaterChange(Math.max(1, waterAmount - 10))}
                      className="w-8 h-8 rounded-full bg-gray-700/50 flex items-center justify-center text-white hover:bg-gray-600/50 transition-all active:scale-95"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <div>
                      <div className="text-xl font-bold text-white">{waterAmount}</div>
                      <div className="text-xs text-gray-400">ml</div>
                    </div>
                    <button
                      onClick={() => handleWaterChange(waterAmount + 10)}
                      className="w-8 h-8 rounded-full bg-gray-700/50 flex items-center justify-center text-white hover:bg-gray-600/50 transition-all active:scale-95"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Ratio Slider */}
            <div className="bg-gray-800/30 backdrop-blur-xl rounded-3xl border border-gray-700/30 p-6 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-white">Fine Tune Ratio</h3>
                <div className="flex items-center space-x-3">
                  <div className="flex bg-gray-700/50 rounded-xl p-1">
                    <button
                      onClick={() => setSliderMode('water')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        sliderMode === 'water' 
                          ? 'bg-blue-500 text-white shadow-md' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Water
                    </button>
                    <button
                      onClick={() => setSliderMode('coffee')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        sliderMode === 'coffee' 
                          ? 'bg-amber-500 text-white shadow-md' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Coffee
                    </button>
                  </div>
                  <button
                    onClick={resetToDefaults}
                    className="p-2 bg-gray-700/50 rounded-xl text-gray-400 hover:text-white hover:bg-gray-600/50 transition-all active:scale-95"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-400 mb-3">
                  <span>Strong</span>
                  <span>Mild</span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="8"
                    max="20"
                    step="0.5"
                    value={customRatio}
                    onChange={(e) => handleRatioChange(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-full appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${((customRatio - 8) / (20 - 8)) * 100}%, #374151 ${((customRatio - 8) / (20 - 8)) * 100}%, #374151 100%)`
                    }}
                  />
                  <style jsx>{`
                    .slider::-webkit-slider-thumb {
                      appearance: none;
                      height: 20px;
                      width: 20px;
                      border-radius: 50%;
                      background: linear-gradient(135deg, #f59e0b, #f97316);
                      cursor: pointer;
                      border: 2px solid white;
                      box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
                    }
                    .slider::-moz-range-thumb {
                      height: 20px;
                      width: 20px;
                      border-radius: 50%;
                      background: linear-gradient(135deg, #f59e0b, #f97316);
                      cursor: pointer;
                      border: 2px solid white;
                      box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
                    }
                  `}</style>
                </div>
                <div className="text-center">
                  <span className="text-xs text-gray-400">
                    Adjusting {sliderMode === 'water' ? 'water amount' : 'coffee amount'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recipes Tab */}
        {activeTab === 'recipes' && (
          <div className="space-y-6">
            <div className="bg-gray-800/30 backdrop-blur-xl rounded-3xl border border-gray-700/30 p-6 shadow-xl">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <currentMethod.icon className="w-6 h-6 mr-3 text-amber-400" />
                {currentMethod.name} Methods
              </h2>
              
              <div className="space-y-4">
                {popularRecipes[selectedMethod]?.map((recipe, index) => (
                  <div key={index} className="bg-gray-700/20 backdrop-blur-sm rounded-2xl p-5 border border-gray-600/20">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-white text-lg">{recipe.name}</h3>
                        <div className="text-gray-400 text-sm flex items-center mt-1">
                          <span>{recipe.author}</span>
                          <span className="mx-2">•</span>
                          <div className="flex items-center">
                            <Star className="w-3 h-3 text-yellow-400 mr-1" />
                            <span>{recipe.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-lg font-bold text-amber-400">{recipe.ratio}</span>
                        <span className="text-xs text-gray-500">{recipe.source}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 mb-4 text-sm">
                      <div className="flex items-center text-gray-300">
                        <Coffee className="w-4 h-4 mr-1 text-amber-400" />
                        {recipe.coffee}
                      </div>
                      <div className="flex items-center text-gray-300">
                        <Droplets className="w-4 h-4 mr-1 text-blue-400" />
                        {recipe.water}
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      {recipe.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="text-gray-300 text-sm flex items-start">
                          <span className="inline-flex items-center justify-center w-6 h-6 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full text-white text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                            {stepIndex + 1}
                          </span>
                          {step}
                        </div>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => {
                        const ratio = parseFloat(recipe.ratio.split(':')[1]);
                        const coffee = parseInt(recipe.coffee);
                        const water = parseInt(recipe.water);
                        setCustomRatio(ratio);
                        setCoffeeAmount(coffee);
                        setWaterAmount(water);
                        setActiveTab('calculator');
                      }}
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 px-4 rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all active:scale-95 shadow-lg"
                    >
                      Use This Recipe
                    </button>
                  </div>
                ))}
              </div>
              
              {/* Method selector for recipes */}
              <div className="mt-8">
                <h3 className="text-white font-medium mb-4">Explore Other Methods</h3>
                <div className="grid grid-cols-3 gap-3">
                  {Object.entries(brewMethods).map(([key, method]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedMethod(key)}
                      className={`p-3 rounded-xl transition-all text-center ${
                        selectedMethod === key
                          ? `bg-gradient-to-br ${method.color} text-white`
                          : 'bg-gray-700/30 text-gray-400 hover:bg-gray-600/40'
                      }`}
                    >
                      <method.icon className="w-5 h-5 mx-auto mb-1" />
                      <div className="text-xs font-medium">{method.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Coffee Recipes Tab */}
        {activeTab === 'coffee-recipes' && (
          <div className="space-y-6">
            <div className="bg-gray-800/30 backdrop-blur-xl rounded-3xl border border-gray-700/30 p-6 shadow-xl">
              <h2 className="text-xl font-semibold text-white mb-6">Popular Coffee Drinks</h2>
              
              {/* Hot Drinks */}
              <div className="mb-8">
                <h3 className="text-amber-400 font-semibold mb-4 flex items-center text-lg">
                  <Thermometer className="w-5 h-5 mr-2" />
                  Hot Drinks
                </h3>
                <div className="space-y-4">
                  {coffeeRecipes.hot.map((recipe, index) => (
                    <div key={index} className="bg-gradient-to-r from-orange-500/10 to-red-500/10 backdrop-blur-sm rounded-2xl p-5 border border-orange-500/20">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-semibold text-white text-lg">{recipe.name}</h4>
                        <div className="flex flex-col items-end">
                          <span className="text-orange-400 text-xs bg-orange-500/20 px-2 py-1 rounded-full font-medium">
                            {recipe.temp}
                          </span>
                          <span className="text-xs text-gray-500 mt-1">{recipe.difficulty}</span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-gray-400 text-sm mb-2">Ingredients:</div>
                        <div className="flex flex-wrap gap-2">
                          {recipe.ingredients.map((ingredient, idx) => (
                            <span key={idx} className="text-gray-300 text-xs bg-gray-700/30 px-3 py-1 rounded-full border border-gray-600/30">
                              {ingredient}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-gray-400 text-sm mb-2">Steps:</div>
                        <div className="space-y-2">
                          {recipe.steps.map((step, stepIndex) => (
                            <div key={stepIndex} className="text-gray-300 text-sm flex items-start">
                              <span className="inline-flex items-center justify-center w-6 h-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-full text-white text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                                {stepIndex + 1}
                              </span>
                              {step}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cold Drinks */}
              <div>
                <h3 className="text-blue-400 font-semibold mb-4 flex items-center text-lg">
                  <Droplets className="w-5 h-5 mr-2" />
                  Cold Drinks
                </h3>
                <div className="space-y-4">
                  {coffeeRecipes.cold.map((recipe, index) => (
                    <div key={index} className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl p-5 border border-blue-500/20">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-semibold text-white text-lg">{recipe.name}</h4>
                        <div className="flex flex-col items-end">
                          <span className="text-blue-400 text-xs bg-blue-500/20 px-2 py-1 rounded-full font-medium">
                            {recipe.temp}
                          </span>
                          <span className="text-xs text-gray-500 mt-1">{recipe.difficulty}</span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-gray-400 text-sm mb-2">Ingredients:</div>
                        <div className="flex flex-wrap gap-2">
                          {recipe.ingredients.map((ingredient, idx) => (
                            <span key={idx} className="text-gray-300 text-xs bg-gray-700/30 px-3 py-1 rounded-full border border-gray-600/30">
                              {ingredient}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-gray-400 text-sm mb-2">Steps:</div>
                        <div className="space-y-2">
                          {recipe.steps.map((step, stepIndex) => (
                            <div key={stepIndex} className="text-gray-300 text-sm flex items-start">
                              <span className="inline-flex items-center justify-center w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full text-white text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                                {stepIndex + 1}
                              </span>
                              {step}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Beans Tab */}
        {activeTab === 'beans' && (
          <div className="space-y-6">
            {/* Save Configuration */}
            <div className="bg-gray-800/30 backdrop-blur-xl rounded-3xl border border-gray-700/30 p-6 shadow-xl">
              <h2 className="text-xl font-semibold text-white mb-6">Save Current Setup</h2>
              
              <div className="space-y-4">
                <input
                  type="text"
                  value={beanNotes}
                  onChange={(e) => setBeanNotes(e.target.value)}
                  placeholder="Bean name or notes..."
                  className="w-full p-4 bg-gray-700/30 border border-gray-600/30 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/50 focus:bg-gray-700/50 transition-all"
                />
                
                <div className="bg-gradient-to-br from-gray-700/20 to-gray-800/20 rounded-2xl p-4 border border-gray-600/20">
                  <div className="text-gray-300 text-sm">
                    <div className="flex items-center mb-2">
                      <currentMethod.icon className="w-5 h-5 mr-2 text-amber-400" />
                      <span className="font-semibold">{currentMethod.name}</span>
                      <span className="mx-2">•</span>
                      <span className="text-amber-400 font-bold">1:{customRatio}</span>
                    </div>
                    <div className="text-gray-400">
                      {coffeeAmount}g coffee + {waterAmount}ml water • {cups} cup{cups > 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={saveBeanConfig}
                  disabled={!beanNotes.trim()}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 px-4 rounded-2xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 shadow-lg"
                >
                  Save Configuration
                </button>
              </div>
            </div>

            {/* Saved Configurations */}
            <div className="bg-gray-800/30 backdrop-blur-xl rounded-3xl border border-gray-700/30 p-6 shadow-xl">
              <h2 className="text-xl font-semibold text-white mb-6">
                Saved Setups ({savedBeans.length})
              </h2>
              
              {savedBeans.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Coffee className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p className="text-lg font-medium">No saved configurations yet</p>
                  <p className="text-sm mt-1">Save your favorite recipes to access them quickly</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {savedBeans.map((bean) => {
                    const BeanMethodIcon = brewMethods[bean.method].icon;
                    return (
                      <div key={bean.id} className="bg-gray-700/20 rounded-2xl p-5 border border-gray-600/20">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-white text-lg">{bean.name}</h3>
                            <div className="text-gray-400 text-sm flex items-center mt-1">
                              <BeanMethodIcon className="w-4 h-4 mr-2 text-amber-400" />
                              <span>{brewMethods[bean.method].name}</span>
                              <span className="mx-2">•</span>
                              <span className="text-amber-400">1:{bean.ratio}</span>
                            </div>
                          </div>
                          <span className="text-xs text-gray-500">{bean.date}</span>
                        </div>
                        
                        <div className="text-gray-300 text-sm mb-4">
                          {bean.coffee}g coffee + {bean.water}ml water • {bean.cups} cup{bean.cups > 1 ? 's' : ''}
                        </div>
                        
                        <div className="flex gap-3">
                          <button
                            onClick={() => loadBeanConfig(bean)}
                            className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2.5 px-4 rounded-xl text-sm font-medium hover:from-amber-600 hover:to-orange-600 transition-all active:scale-95"
                          >
                            Load Setup
                          </button>
                          <button
                            onClick={() => setSavedBeans(savedBeans.filter(b => b.id !== bean.id))}
                            className="bg-red-500/20 text-red-400 py-2.5 px-4 rounded-xl text-sm font-medium hover:bg-red-500/30 transition-all border border-red-500/30 active:scale-95"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoffeeRatioCalculator;