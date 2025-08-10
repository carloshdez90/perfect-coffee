import React, { useState, useEffect } from 'react';
import { Coffee, Droplets, Calculator, Timer, BookOpen, Settings, Users, Thermometer, Zap, Plus, Minus } from 'lucide-react';

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
  const [sliderMode, setSliderMode] = useState('water'); // 'water' or 'coffee'

  const brewMethods = {
    v60: { 
      name: 'V60', 
      ratio: 15, 
      time: '2:30-3:00',
      grind: 'Medio-fino',
      temp: '92-96°C',
      description: 'Filtro cónico con surcos espirales'
    },
    chemex: { 
      name: 'Chemex', 
      ratio: 16, 
      time: '4:00-5:00',
      grind: 'Medio-grueso',
      temp: '93-96°C',
      description: 'Filtro grueso, cuerpo limpio'
    },
    frenchpress: { 
      name: 'French Press', 
      ratio: 12, 
      time: '4:00',
      grind: 'Grueso',
      temp: '93-96°C',
      description: 'Inmersión completa'
    },
    aeropress: { 
      name: 'AeroPress', 
      ratio: 14, 
      time: '1:30-2:30',
      grind: 'Fino-medio',
      temp: '80-92°C',
      description: 'Presión y filtro micro'
    },
    pourover: { 
      name: 'Pour Over', 
      ratio: 15, 
      time: '3:00-4:00',
      grind: 'Medio',
      temp: '92-96°C',
      description: 'Vertido manual controlado'
    },
    espresso: { 
      name: 'Espresso', 
      ratio: 2, 
      time: '25-30s',
      grind: 'Muy fino',
      temp: '90-94°C',
      description: 'Presión alta concentrada'
    }
  };

  const coffeeRecipes = {
    hot: [
      {
        name: 'Latte Vainilla',
        ingredients: ['240ml leche', '60ml espresso', '15ml jarabe vainilla'],
        steps: ['Preparar espresso doble', 'Calentar y espumar leche', 'Añadir jarabe', 'Verter leche sobre espresso'],
        temp: 'Caliente'
      },
      {
        name: 'Cappuccino Clásico',
        ingredients: ['180ml leche', '60ml espresso', 'Canela al gusto'],
        steps: ['Preparar espresso', 'Espumar leche hasta textura sedosa', 'Verter 1/3 leche y 2/3 espuma', 'Espolvorear canela'],
        temp: 'Caliente'
      },
      {
        name: 'Americano',
        ingredients: ['240ml agua caliente', '60ml espresso'],
        steps: ['Preparar espresso doble', 'Añadir agua caliente', 'Servir inmediatamente'],
        temp: 'Caliente'
      },
      {
        name: 'Mocha',
        ingredients: ['240ml leche', '60ml espresso', '30ml chocolate', 'Crema batida'],
        steps: ['Mezclar chocolate con espresso', 'Calentar leche', 'Combinar todo', 'Decorar con crema'],
        temp: 'Caliente'
      },
      {
        name: 'Macchiato Caramelo',
        ingredients: ['60ml espresso', '15ml jarabe caramelo', '120ml leche', 'Caramelo líquido'],
        steps: ['Preparar espresso', 'Añadir jarabe', 'Espumar poca leche', 'Decorar con caramelo'],
        temp: 'Caliente'
      }
    ],
    cold: [
      {
        name: 'Cold Brew',
        ingredients: ['100g café molido grueso', '1L agua fría'],
        steps: ['Mezclar café y agua', 'Dejar reposar 12-24h', 'Filtrar', 'Servir con hielo'],
        temp: 'Frío'
      },
      {
        name: 'Iced Latte',
        ingredients: ['240ml leche fría', '60ml espresso', 'Hielo', 'Jarabe opcional'],
        steps: ['Preparar espresso', 'Enfriar', 'Llenar vaso con hielo', 'Añadir leche y espresso'],
        temp: 'Frío'
      },
      {
        name: 'Frappé',
        ingredients: ['180ml café frío', '120ml leche', 'Hielo', '30ml jarabe', 'Crema batida'],
        steps: ['Licuar café, leche, hielo y jarabe', 'Servir en vaso alto', 'Decorar con crema'],
        temp: 'Frío'
      },
      {
        name: 'Affogato',
        ingredients: ['60ml espresso caliente', '1 bola helado vainilla'],
        steps: ['Colocar helado en taza', 'Preparar espresso', 'Verter sobre helado', 'Servir inmediatamente'],
        temp: 'Frío'
      },
      {
        name: 'Iced Americano',
        ingredients: ['60ml espresso', '180ml agua fría', 'Hielo'],
        steps: ['Preparar espresso', 'Llenar vaso con hielo', 'Añadir agua fría', 'Verter espresso'],
        temp: 'Frío'
      }
    ]
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
        source: 'YouTube'
      },
      {
        name: 'Tetsu Kasuya 4:6',
        author: 'Tetsu Kasuya',
        ratio: '1:15',
        coffee: '20g',
        water: '300g',
        steps: ['40% agua en 2 vertidos', '60% agua en 3 vertidos', 'Control acidez/dulzor'],
        source: 'World Champion 2016'
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
        source: 'Official Guide'
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
        source: 'YouTube'
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
        source: 'World Champion'
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
        source: 'Official Method'
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
        source: 'World Champion'
      }
    ]
  };

  const currentMethod = brewMethods[selectedMethod];

  // Simplified calculation logic - always maintain consistency
  useEffect(() => {
    // Prevent infinite loops by only updating when necessary
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
    // Update ratio based on current values per cup
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
    // Update ratio based on current values per cup
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
    
    // Calculate what we currently have per cup
    const currentCoffeePerCup = coffeeAmount / cups;
    const currentWaterPerCup = waterAmount / cups;
    
    // Scale to new number of cups
    const newCoffeeTotal = Math.round(currentCoffeePerCup * newCups);
    const newWaterTotal = Math.round(currentWaterPerCup * newCups);
    
    setCups(newCups);
    setCoffeeAmount(newCoffeeTotal);
    setWaterAmount(newWaterTotal);
    // Ratio stays the same since we're scaling proportionally
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-amber-900 p-4">
      <div className="relative max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl font-light text-white mb-2">Coffee Calculator</h1>
          <p className="text-gray-400 text-sm">Perfect ratios for every method</p>
        </div>

        {/* Navigation */}
        <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-1 mb-6">
          <div className="flex">
            {[
              { id: 'calculator', icon: Calculator, label: 'Calc' },
              { id: 'recipes', icon: BookOpen, label: 'Brew' },
              { id: 'coffee-recipes', icon: Coffee, label: 'Drinks' },
              { id: 'beans', icon: Settings, label: 'Beans' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center p-3 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-amber-500/20 text-amber-300'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-1" />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Calculator Tab */}
        {activeTab === 'calculator' && (
          <div className="space-y-6">
            {/* Method Selection */}
            <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(brewMethods).map(([key, method]) => (
                  <button
                    key={key}
                    onClick={() => handleMethodChange(key)}
                    className={`p-4 rounded-xl transition-all duration-300 border ${
                      selectedMethod === key
                        ? 'bg-amber-500/20 border-amber-400/30 text-white'
                        : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="font-medium mb-1">{method.name}</div>
                    <div className="text-xs opacity-60">1:{method.ratio}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Controls */}
            <div className="grid grid-cols-2 gap-4">
              {/* Cups */}
              <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <div className="text-center">
                  <Users className="w-5 h-5 text-amber-400 mx-auto mb-3" />
                  <div className="flex items-center justify-center space-x-3">
                    <button
                      onClick={() => handleCupsChange(Math.max(1, cups - 1))}
                      className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <div>
                      <div className="text-2xl font-light text-white">{cups}</div>
                      <div className="text-xs text-gray-400">cups</div>
                    </div>
                    <button
                      onClick={() => handleCupsChange(cups + 1)}
                      className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Ratio Display */}
              <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <div className="text-center">
                  <div className="text-amber-400 text-sm mb-2">Ratio</div>
                  <div className="text-2xl font-light text-white">1:{customRatio}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {customRatio < 12 ? 'Strong' : 
                     customRatio < 16 ? 'Medium' : 'Mild'}
                  </div>
                </div>
              </div>
            </div>

            {/* Ratio Slider with Toggle */}
            <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-white text-sm">Adjust Ratio</span>
                <div className="flex items-center space-x-3">
                  <div className="flex bg-white/5 rounded-lg p-1">
                    <button
                      onClick={() => setSliderMode('water')}
                      className={`px-3 py-1 rounded text-xs transition-all ${
                        sliderMode === 'water' 
                          ? 'bg-blue-500/20 text-blue-400' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Water
                    </button>
                    <button
                      onClick={() => setSliderMode('coffee')}
                      className={`px-3 py-1 rounded text-xs transition-all ${
                        sliderMode === 'coffee' 
                          ? 'bg-amber-500/20 text-amber-400' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Coffee
                    </button>
                  </div>
                  <button
                    onClick={resetToDefaults}
                    className="text-xs text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-all duration-300"
                  >
                    Reset
                  </button>
                </div>
              </div>
              
              <div className="mb-4">
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
                    className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${((customRatio - 8) / (20 - 8)) * 100}%, #374151 ${((customRatio - 8) / (20 - 8)) * 100}%, #374151 100%)`
                    }}
                  />
                  <style jsx>{`
                    .slider::-webkit-slider-thumb {
                      appearance: none;
                      height: 16px;
                      width: 16px;
                      border-radius: 50%;
                      background: #f59e0b;
                      cursor: pointer;
                      border: none;
                      box-shadow: 0 0 10px rgba(245, 158, 11, 0.3);
                    }
                    .slider::-moz-range-thumb {
                      height: 16px;
                      width: 16px;
                      border-radius: 50%;
                      background: #f59e0b;
                      cursor: pointer;
                      border: none;
                      box-shadow: 0 0 10px rgba(245, 158, 11, 0.3);
                    }
                  `}</style>
                </div>
                <div className="text-center mt-2">
                  <span className="text-xs text-gray-400">
                    Adjusting {sliderMode === 'water' ? 'water amount' : 'coffee amount'}
                  </span>
                </div>
              </div>
            </div>

            {/* Coffee & Water Controls */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-3">
                    <Coffee className="w-4 h-4 text-amber-400 mr-2" />
                    <span className="text-white text-sm">Coffee</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <button
                      onClick={() => handleCoffeeChange(Math.max(1, coffeeAmount - 1))}
                      className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <div>
                      <div className="text-2xl font-light text-white">{coffeeAmount}</div>
                      <div className="text-xs text-gray-400">grams</div>
                    </div>
                    <button
                      onClick={() => handleCoffeeChange(coffeeAmount + 1)}
                      className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-3">
                    <Droplets className="w-4 h-4 text-blue-400 mr-2" />
                    <span className="text-white text-sm">Water</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <button
                      onClick={() => handleWaterChange(Math.max(1, waterAmount - 10))}
                      className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <div>
                      <div className="text-2xl font-light text-white">{waterAmount}</div>
                      <div className="text-xs text-gray-400">ml</div>
                    </div>
                    <button
                      onClick={() => handleWaterChange(waterAmount + 10)}
                      className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Method Info */}
            <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <h3 className="text-white font-medium mb-2">{currentMethod.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{currentMethod.description}</p>
              
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center">
                  <Zap className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
                  <div className="text-xs text-gray-400">Grind</div>
                  <div className="text-white text-sm">{currentMethod.grind}</div>
                </div>
                <div className="text-center">
                  <Thermometer className="w-4 h-4 text-red-400 mx-auto mb-1" />
                  <div className="text-xs text-gray-400">Temp</div>
                  <div className="text-white text-sm">{currentMethod.temp}</div>
                </div>
                <div className="text-center">
                  <Timer className="w-4 h-4 text-green-400 mx-auto mb-1" />
                  <div className="text-xs text-gray-400">Time</div>
                  <div className="text-white text-sm">{currentMethod.time}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recipes Tab */}
        {activeTab === 'recipes' && (
          <div className="space-y-4">
            <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <h2 className="text-white font-medium mb-4">{currentMethod.name} Brew Methods</h2>
              
              <div className="space-y-4">
                {popularRecipes[selectedMethod]?.map((recipe, index) => (
                  <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-white font-medium text-sm">{recipe.name}</h3>
                      <span className="text-amber-400 text-xs bg-amber-500/10 px-2 py-1 rounded">
                        {recipe.ratio}
                      </span>
                    </div>
                    
                    <div className="text-gray-400 text-xs mb-3">
                      {recipe.author} • {recipe.source}
                    </div>
                    
                    <div className="flex gap-4 mb-3 text-xs">
                      <span className="text-gray-300">{recipe.coffee} coffee</span>
                      <span className="text-gray-300">{recipe.water} water</span>
                    </div>
                    
                    <div className="space-y-1 mb-3">
                      {recipe.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="text-gray-400 text-xs flex items-start">
                          <span className="inline-block w-4 h-4 bg-amber-500/20 rounded-full text-center text-xs leading-4 mr-2 flex-shrink-0 text-amber-400">
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
                      className="w-full bg-amber-500/10 text-amber-400 py-2 px-4 rounded-lg text-xs font-medium hover:bg-amber-500/20 transition-all"
                    >
                      Use Recipe
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Method selector for recipes */}
            <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-4">
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(brewMethods).map(([key, method]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedMethod(key)}
                    className={`p-2 rounded-lg text-xs transition-all ${
                      selectedMethod === key
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    {method.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Coffee Recipes Tab */}
        {activeTab === 'coffee-recipes' && (
          <div className="space-y-6">
            <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <h2 className="text-white font-medium mb-4">Popular Coffee Drinks</h2>
              
              {/* Hot Drinks */}
              <div className="mb-6">
                <h3 className="text-amber-400 font-medium mb-3 flex items-center">
                  <Thermometer className="w-4 h-4 mr-2" />
                  Hot Drinks
                </h3>
                <div className="space-y-4">
                  {coffeeRecipes.hot.map((recipe, index) => (
                    <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/5">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-white font-medium text-sm">{recipe.name}</h4>
                        <span className="text-orange-400 text-xs bg-orange-500/10 px-2 py-1 rounded">
                          {recipe.temp}
                        </span>
                      </div>
                      
                      <div className="mb-3">
                        <div className="text-gray-400 text-xs mb-2">Ingredients:</div>
                        <div className="flex flex-wrap gap-1">
                          {recipe.ingredients.map((ingredient, idx) => (
                            <span key={idx} className="text-gray-300 text-xs bg-white/5 px-2 py-1 rounded">
                              {ingredient}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-gray-400 text-xs mb-2">Steps:</div>
                        <div className="space-y-1">
                          {recipe.steps.map((step, stepIndex) => (
                            <div key={stepIndex} className="text-gray-400 text-xs flex items-start">
                              <span className="inline-block w-4 h-4 bg-amber-500/20 rounded-full text-center text-xs leading-4 mr-2 flex-shrink-0 text-amber-400">
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
                <h3 className="text-blue-400 font-medium mb-3 flex items-center">
                  <Droplets className="w-4 h-4 mr-2" />
                  Cold Drinks
                </h3>
                <div className="space-y-4">
                  {coffeeRecipes.cold.map((recipe, index) => (
                    <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/5">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-white font-medium text-sm">{recipe.name}</h4>
                        <span className="text-blue-400 text-xs bg-blue-500/10 px-2 py-1 rounded">
                          {recipe.temp}
                        </span>
                      </div>
                      
                      <div className="mb-3">
                        <div className="text-gray-400 text-xs mb-2">Ingredients:</div>
                        <div className="flex flex-wrap gap-1">
                          {recipe.ingredients.map((ingredient, idx) => (
                            <span key={idx} className="text-gray-300 text-xs bg-white/5 px-2 py-1 rounded">
                              {ingredient}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-gray-400 text-xs mb-2">Steps:</div>
                        <div className="space-y-1">
                          {recipe.steps.map((step, stepIndex) => (
                            <div key={stepIndex} className="text-gray-400 text-xs flex items-start">
                              <span className="inline-block w-4 h-4 bg-blue-500/20 rounded-full text-center text-xs leading-4 mr-2 flex-shrink-0 text-blue-400">
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
            <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <h2 className="text-white font-medium mb-4">Save Current Setup</h2>
              
              <div className="space-y-4">
                <input
                  type="text"
                  value={beanNotes}
                  onChange={(e) => setBeanNotes(e.target.value)}
                  placeholder="Bean name or notes..."
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/50"
                />
                
                <div className="bg-white/5 rounded-xl p-3 text-sm text-gray-400">
                  {currentMethod.name} • 1:{customRatio} • {coffeeAmount}g + {waterAmount}ml • {cups} cup{cups > 1 ? 's' : ''}
                </div>
                
                <button
                  onClick={saveBeanConfig}
                  disabled={!beanNotes.trim()}
                  className="w-full bg-amber-500/20 text-amber-400 py-3 px-4 rounded-xl font-medium hover:bg-amber-500/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Save Configuration
                </button>
              </div>
            </div>

            {/* Saved Configurations */}
            <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <h2 className="text-white font-medium mb-4">Saved Setups ({savedBeans.length})</h2>
              
              {savedBeans.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Coffee className="w-8 h-8 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No saved configurations yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedBeans.map((bean) => (
                    <div key={bean.id} className="bg-white/5 rounded-xl p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-white font-medium text-sm">{bean.name}</h3>
                        <span className="text-xs text-gray-500">{bean.date}</span>
                      </div>
                      
                      <div className="text-gray-400 text-xs mb-3">
                        {brewMethods[bean.method].name} • 1:{bean.ratio} • {bean.coffee}g + {bean.water}ml
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => loadBeanConfig(bean)}
                          className="flex-1 bg-amber-500/10 text-amber-400 py-2 px-3 rounded-lg text-xs font-medium hover:bg-amber-500/20 transition-all"
                        >
                          Load
                        </button>
                        <button
                          onClick={() => setSavedBeans(savedBeans.filter(b => b.id !== bean.id))}
                          className="bg-red-500/10 text-red-400 py-2 px-3 rounded-lg text-xs font-medium hover:bg-red-500/20 transition-all"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
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