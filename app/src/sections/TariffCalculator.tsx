import { useState, useRef, useEffect } from 'react';
import { Calculator, Search, Globe, Package, DollarSign, Info, ChevronDown, ChevronUp } from 'lucide-react';

interface TariffResult {
  baseDuty: number;
  vat: number;
  totalCost: number;
  currency: string;
}

interface HSCodeItem {
  code: string;
  description: string;
}

const TariffCalculator = () => {
  const [hsCode, setHsCode] = useState('');
  const [originCountry, setOriginCountry] = useState('');
  const [destinationCountry, setDestinationCountry] = useState('');
  const [productValue, setProductValue] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<TariffResult | null>(null);
  const [error, setError] = useState('');
  const [showHSDropdown, setShowHSDropdown] = useState(false);
  const [showProductSearch, setShowProductSearch] = useState(false);
  const [productSearchTerm, setProductSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // HS Code database with descriptions
  const hsCodeDatabase: HSCodeItem[] = [
    { code: '8471.30.01', description: 'Computers' },
    { code: '8517.12.00', description: 'Phones' },
    { code: '6203.42.11', description: "Men's trousers" },
    { code: '8703.23.00', description: 'Cars' },
    { code: '0901.21.00', description: 'Coffee beans and roasted coffee' },
    { code: '3004.90.00', description: 'Medicaments' },
    { code: '3926.90.99', description: 'Plastic articles and containers' },
    { code: '7308.90.00', description: 'Iron and steel structures' },
    { code: '1905.90.00', description: 'Bread, pastries, and cakes' },
    { code: '6204.62.11', description: "Women's trousers" },
    { code: '9102.21.00', description: 'Wrist watches' },
    { code: '6403.99.90', description: 'Footwear' },
  ];

  // Sample tariff database (in real app, this would come from API)
  const tariffDatabase: Record<string, Record<string, number>> = {
    '8471.30.01': { US: 0, CA: 0, MX: 0, EU: 0, CN: 0, JP: 0 }, // Computers
    '8517.12.00': { US: 0, CA: 0, MX: 0, EU: 0, CN: 0, JP: 0 }, // Phones
    '6203.42.11': { US: 12.5, CA: 18, MX: 20, EU: 12, CN: 16, JP: 8.9 }, // Men's trousers
    '8703.23.00': { US: 2.5, CA: 6.1, MX: 20, EU: 10, CN: 25, JP: 0 }, // Cars
    '0901.21.00': { US: 0, CA: 0, MX: 0, EU: 7.5, CN: 15, JP: 12 }, // Coffee
    '3004.90.00': { US: 0, CA: 0, MX: 0, EU: 0, CN: 5, JP: 0 }, // Medicaments
    '3926.90.99': { US: 5.3, CA: 6.5, MX: 15, EU: 6.5, CN: 10, JP: 4.2 }, // Plastic articles
    '7308.90.00': { US: 0, CA: 0, MX: 0, EU: 0, CN: 8, JP: 0 }, // Iron structures
    '1905.90.00': { US: 0, CA: 0, MX: 0, EU: 0, CN: 15, JP: 10 }, // Bread
    '6204.62.11': { US: 12.5, CA: 18, MX: 20, EU: 12, CN: 16, JP: 8.9 }, // Women's trousers
    '9102.21.00': { US: 0, CA: 0, MX: 0, EU: 4.5, CN: 11, JP: 5 }, // Watches
    '6403.99.90': { US: 8.5, CA: 20, MX: 20, EU: 8, CN: 24, JP: 6.5 }, // Footwear
  };

  const vatRates: Record<string, number> = {
    US: 0, // No federal VAT
    CA: 0.05, // GST
    MX: 0.16, // IVA
    EU: 0.20, // Average EU VAT
    CN: 0.13, // VAT
    JP: 0.10, // Consumption tax
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowHSDropdown(false);
        setShowProductSearch(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter HS codes based on search term
  const filteredHSCodes = productSearchTerm.trim() === '' 
    ? [] 
    : hsCodeDatabase.filter(item => 
        item.description.toLowerCase().includes(productSearchTerm.toLowerCase()) ||
        item.code.includes(productSearchTerm)
      );

  const handleSelectHSCode = (code: string) => {
    setHsCode(code);
    setShowHSDropdown(false);
    setShowProductSearch(false);
    setProductSearchTerm('');
  };

  const handleProductSearchClick = () => {
    setShowProductSearch(!showProductSearch);
    setShowHSDropdown(false);
    if (!showProductSearch) {
      setProductSearchTerm('');
    }
  };

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);

    if (!hsCode || !originCountry || !destinationCountry || !productValue) {
      setError('Please fill in all fields');
      return;
    }

    const value = parseFloat(productValue);
    if (isNaN(value) || value <= 0) {
      setError('Please enter a valid product value');
      return;
    }

    setIsCalculating(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Look up tariff rate
    const tariffRate = tariffDatabase[hsCode]?.[destinationCountry] ?? 10; // Default 10%
    const vatRate = vatRates[destinationCountry] ?? 0.20;

    const baseDuty = value * (tariffRate / 100);
    const vat = (value + baseDuty) * vatRate;
    const totalCost = value + baseDuty + vat;

    setResult({
      baseDuty,
      vat,
      totalCost,
      currency: destinationCountry === 'US' ? 'USD' : 
                destinationCountry === 'CA' ? 'CAD' :
                destinationCountry === 'MX' ? 'MXN' :
                destinationCountry === 'CN' ? 'CNY' :
                destinationCountry === 'JP' ? 'JPY' : 'EUR'
    });

    setIsCalculating(false);
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Description */}
      <div className="mb-8 sm:mb-10">
        <p className="font-roboto text-base sm:text-lg lg:text-xl text-brand-dark-gray leading-relaxed">
          An AI-enabled tariff calculator that automatically searches and updates daily tariff rates using intelligent agents, ensuring businesses have access to the most current international trade data for accurate cost calculations.
        </p>
      </div>

      <div className="glass p-8 lg:p-12 backdrop-blur-xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-brand-text flex items-center justify-center">
            <Calculator size={24} className="text-brand-linen" />
          </div>
          <div>
            <h3 className="font-oswald text-2xl lg:text-3xl text-brand-text">Tariff Calculator</h3>
            <p className="font-roboto text-sm sm:text-base text-brand-dark-gray">Calculate import duties and taxes</p>
          </div>
        </div>

        <form onSubmit={handleCalculate} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div ref={dropdownRef}>
              <label className="block font-roboto text-sm uppercase tracking-wider text-brand-dark-gray mb-3">
                HS Code
              </label>
              <div className="relative">
                <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-light-gray z-10" />
                <input
                  type="text"
                  value={hsCode}
                  onChange={(e) => setHsCode(e.target.value)}
                  onFocus={() => {
                    setShowHSDropdown(true);
                    setShowProductSearch(false);
                  }}
                  placeholder="e.g., 8471.30.01"
                  className="w-full pl-12 pr-12 py-4 bg-transparent border border-brand-border text-brand-text placeholder:text-brand-light-gray text-base lg:text-lg focus:outline-none focus:border-brand-text transition-colors"
                />
                <button
                  type="button"
                  onClick={() => {
                    setShowHSDropdown(!showHSDropdown);
                    setShowProductSearch(false);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-light-gray hover:text-brand-text transition-colors"
                >
                  <ChevronDown size={20} className={`transform transition-transform duration-200 ${showHSDropdown ? 'rotate-180' : ''}`} />
                </button>
              </div>
              
              {/* HS Code Dropdown */}
              {showHSDropdown && !showProductSearch && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-brand-border shadow-lg max-h-60 overflow-auto">
                  <div className="py-2">
                    <div className="px-4 py-2 text-sm text-brand-light-gray border-b border-brand-border">
                      Select an HS Code
                    </div>
                    {hsCodeDatabase.map((item) => (
                      <button
                        key={item.code}
                        type="button"
                        onClick={() => handleSelectHSCode(item.code)}
                        className="w-full px-4 py-3 text-left hover:bg-brand-linen transition-colors flex items-center justify-between"
                      >
                        <span className="font-roboto text-base text-brand-text">{item.code}</span>
                        <span className="font-roboto text-sm text-brand-dark-gray">{item.description}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Look up by product name link */}
              <button
                type="button"
                onClick={handleProductSearchClick}
                className="mt-2 flex items-center gap-2 text-sm text-brand-text hover:text-brand-dark-gray transition-colors"
              >
                <Search size={14} />
                <span>Look up HS code by product name</span>
                {showProductSearch ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
              
              {/* Product Name Search */}
              {showProductSearch && (
                <div className="mt-3 bg-white border border-brand-border shadow-lg">
                  <div className="p-3 border-b border-brand-border">
                    <input
                      type="text"
                      value={productSearchTerm}
                      onChange={(e) => setProductSearchTerm(e.target.value)}
                      placeholder="Type product name..."
                      className="w-full px-3 py-2 bg-transparent border border-brand-border text-brand-text placeholder:text-brand-light-gray text-base focus:outline-none focus:border-brand-text transition-colors"
                      autoFocus
                    />
                  </div>
                  <div className="max-h-60 overflow-auto">
                    {productSearchTerm.trim() === '' ? (
                      <div className="px-4 py-3 text-sm text-brand-light-gray">
                        Start typing to search for products...
                      </div>
                    ) : filteredHSCodes.length === 0 ? (
                      <div className="px-4 py-3 text-sm text-brand-light-gray">
                        No matching products found
                      </div>
                    ) : (
                      filteredHSCodes.map((item) => (
                        <button
                          key={item.code}
                          type="button"
                          onClick={() => handleSelectHSCode(item.code)}
                          className="w-full px-4 py-3 text-left hover:bg-brand-linen transition-colors flex items-center justify-between border-b border-brand-border last:border-b-0"
                        >
                          <span className="font-roboto text-base font-medium text-brand-text">{item.code}</span>
                          <span className="font-roboto text-sm text-brand-dark-gray ml-4">{item.description}</span>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block font-roboto text-sm uppercase tracking-wider text-brand-dark-gray mb-3">
                Product Value
              </label>
              <div className="relative">
                <DollarSign size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-light-gray" />
                <input
                  type="number"
                  value={productValue}
                  onChange={(e) => setProductValue(e.target.value)}
                  placeholder="Enter value"
                  className="w-full pl-12 pr-4 py-4 bg-transparent border border-brand-border text-brand-text placeholder:text-brand-light-gray text-base lg:text-lg focus:outline-none focus:border-brand-text transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block font-roboto text-sm uppercase tracking-wider text-brand-dark-gray mb-3">
                Origin Country
              </label>
              <div className="relative">
                <Globe size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-light-gray" />
                <select
                  value={originCountry}
                  onChange={(e) => setOriginCountry(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-transparent border border-brand-border text-brand-text text-base lg:text-lg focus:outline-none focus:border-brand-text transition-colors appearance-none"
                >
                  <option value="">Select country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="MX">Mexico</option>
                  <option value="EU">European Union</option>
                  <option value="CN">China</option>
                  <option value="JP">Japan</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-roboto text-sm uppercase tracking-wider text-brand-dark-gray mb-3">
                Destination Country
              </label>
              <div className="relative">
                <Package size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-light-gray" />
                <select
                  value={destinationCountry}
                  onChange={(e) => setDestinationCountry(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-transparent border border-brand-border text-brand-text text-base lg:text-lg focus:outline-none focus:border-brand-text transition-colors appearance-none"
                >
                  <option value="">Select country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="MX">Mexico</option>
                  <option value="EU">European Union</option>
                  <option value="CN">China</option>
                  <option value="JP">Japan</option>
                </select>
              </div>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-500 text-base">
              <Info size={20} />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isCalculating}
            className="w-full px-6 py-4 bg-brand-text text-brand-linen font-roboto text-base uppercase tracking-wider hover:bg-brand-dark-gray transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isCalculating ? (
              <>
                <div className="w-5 h-5 border-2 border-brand-linen border-t-transparent rounded-full animate-spin" />
                Calculating...
              </>
            ) : (
              <>
                <Calculator size={20} />
                Calculate Tariff
              </>
            )}
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-8 border-t border-brand-border">
            <h4 className="font-oswald text-xl lg:text-2xl text-brand-text mb-6">Calculation Results</h4>
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center p-4 sm:p-6 bg-muted rounded-sm">
                <p className="font-roboto text-sm sm:text-base text-brand-dark-gray mb-2">Base Duty</p>
                <p className="font-oswald text-xl sm:text-2xl text-brand-text">
                  {formatCurrency(result.baseDuty, result.currency)}
                </p>
              </div>
              <div className="text-center p-4 sm:p-6 bg-muted rounded-sm">
                <p className="font-roboto text-sm sm:text-base text-brand-dark-gray mb-2">VAT/Tax</p>
                <p className="font-oswald text-xl sm:text-2xl text-brand-text">
                  {formatCurrency(result.vat, result.currency)}
                </p>
              </div>
              <div className="text-center p-4 sm:p-6 bg-brand-text text-white rounded-sm">
                <p className="font-roboto text-sm sm:text-base text-white/70 mb-2">Total Landed Cost</p>
                <p className="font-oswald text-xl sm:text-2xl">
                  {formatCurrency(result.totalCost, result.currency)}
                </p>
              </div>
            </div>
            <p className="mt-6 text-sm sm:text-base text-brand-light-gray">
              * This is an estimate based on current tariff rates. Actual duties may vary based on specific product classification and trade agreements.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TariffCalculator;
