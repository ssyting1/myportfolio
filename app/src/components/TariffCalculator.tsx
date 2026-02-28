import { useState } from 'react';
import { Calculator, Search, Globe, Package, DollarSign, Info } from 'lucide-react';

interface TariffResult {
  baseDuty: number;
  vat: number;
  totalCost: number;
  currency: string;
}

const TariffCalculator = () => {
  const [hsCode, setHsCode] = useState('');
  const [originCountry, setOriginCountry] = useState('');
  const [destinationCountry, setDestinationCountry] = useState('');
  const [productValue, setProductValue] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<TariffResult | null>(null);
  const [error, setError] = useState('');

  // Sample tariff database (in real app, this would come from API)
  const tariffDatabase: Record<string, Record<string, number>> = {
    '8471.30.01': { US: 0, CA: 0, MX: 0, EU: 0, CN: 0, JP: 0 }, // Computers
    '8517.12.00': { US: 0, CA: 0, MX: 0, EU: 0, CN: 0, JP: 0 }, // Phones
    '6203.42.11': { US: 12.5, CA: 18, MX: 20, EU: 12, CN: 16, JP: 8.9 }, // Men's trousers
    '8703.23.00': { US: 2.5, CA: 6.1, MX: 20, EU: 10, CN: 25, JP: 0 }, // Cars
    '0901.21.00': { US: 0, CA: 0, MX: 0, EU: 7.5, CN: 15, JP: 12 }, // Coffee
    '3004.90.00': { US: 0, CA: 0, MX: 0, EU: 0, CN: 5, JP: 0 }, // Medicaments
  };

  const vatRates: Record<string, number> = {
    US: 0, // No federal VAT
    CA: 0.05, // GST
    MX: 0.16, // IVA
    EU: 0.20, // Average EU VAT
    CN: 0.13, // VAT
    JP: 0.10, // Consumption tax
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
    <div className="w-full max-w-4xl mx-auto">
      {/* Description */}
      <div className="mb-6 sm:mb-8">
        <p className="font-roboto text-sm sm:text-base text-brand-dark-gray leading-relaxed">
          An AI-enabled tariff calculator that automatically searches and updates daily tariff rates using intelligent agents, ensuring businesses have access to the most current international trade data for accurate cost calculations.
        </p>
      </div>

      <div className="glass p-6 lg:p-8 backdrop-blur-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-brand-text flex items-center justify-center">
            <Calculator size={20} className="text-brand-linen" />
          </div>
          <div>
            <h3 className="font-oswald text-xl text-brand-text">Tariff Calculator</h3>
            <p className="font-roboto text-xs text-brand-dark-gray">Calculate import duties and taxes</p>
          </div>
        </div>

        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-roboto text-xs uppercase tracking-wider text-brand-dark-gray mb-2">
                HS Code
              </label>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-light-gray" />
                <input
                  type="text"
                  value={hsCode}
                  onChange={(e) => setHsCode(e.target.value)}
                  placeholder="e.g., 8471.30.01"
                  className="w-full pl-10 pr-4 py-3 bg-transparent border border-brand-border text-brand-text placeholder:text-brand-light-gray text-sm focus:outline-none focus:border-brand-text transition-colors"
                />
              </div>
              <p className="mt-1 text-xs text-brand-light-gray">
                Try: 8471.30.01 (Computers), 6203.42.11 (Trousers)
              </p>
            </div>

            <div>
              <label className="block font-roboto text-xs uppercase tracking-wider text-brand-dark-gray mb-2">
                Product Value
              </label>
              <div className="relative">
                <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-light-gray" />
                <input
                  type="number"
                  value={productValue}
                  onChange={(e) => setProductValue(e.target.value)}
                  placeholder="Enter value"
                  className="w-full pl-10 pr-4 py-3 bg-transparent border border-brand-border text-brand-text placeholder:text-brand-light-gray text-sm focus:outline-none focus:border-brand-text transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block font-roboto text-xs uppercase tracking-wider text-brand-dark-gray mb-2">
                Origin Country
              </label>
              <div className="relative">
                <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-light-gray" />
                <select
                  value={originCountry}
                  onChange={(e) => setOriginCountry(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-transparent border border-brand-border text-brand-text text-sm focus:outline-none focus:border-brand-text transition-colors appearance-none"
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
              <label className="block font-roboto text-xs uppercase tracking-wider text-brand-dark-gray mb-2">
                Destination Country
              </label>
              <div className="relative">
                <Package size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-light-gray" />
                <select
                  value={destinationCountry}
                  onChange={(e) => setDestinationCountry(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-transparent border border-brand-border text-brand-text text-sm focus:outline-none focus:border-brand-text transition-colors appearance-none"
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
            <div className="flex items-center gap-2 text-red-500 text-sm">
              <Info size={16} />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isCalculating}
            className="w-full px-4 py-3 bg-brand-text text-brand-linen font-roboto text-sm uppercase tracking-wider hover:bg-brand-dark-gray transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isCalculating ? (
              <>
                <div className="w-4 h-4 border-2 border-brand-linen border-t-transparent rounded-full animate-spin" />
                Calculating...
              </>
            ) : (
              <>
                <Calculator size={16} />
                Calculate Tariff
              </>
            )}
          </button>
        </form>

        {result && (
          <div className="mt-6 pt-6 border-t border-brand-border">
            <h4 className="font-oswald text-lg text-brand-text mb-4">Calculation Results</h4>
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <div className="text-center p-3 sm:p-4 bg-muted rounded-sm">
                <p className="font-roboto text-xs text-brand-dark-gray mb-1">Base Duty</p>
                <p className="font-oswald text-lg sm:text-xl text-brand-text">
                  {formatCurrency(result.baseDuty, result.currency)}
                </p>
              </div>
              <div className="text-center p-3 sm:p-4 bg-muted rounded-sm">
                <p className="font-roboto text-xs text-brand-dark-gray mb-1">VAT/Tax</p>
                <p className="font-oswald text-lg sm:text-xl text-brand-text">
                  {formatCurrency(result.vat, result.currency)}
                </p>
              </div>
              <div className="text-center p-3 sm:p-4 bg-brand-text text-white rounded-sm">
                <p className="font-roboto text-xs text-white/70 mb-1">Total Landed Cost</p>
                <p className="font-oswald text-lg sm:text-xl">
                  {formatCurrency(result.totalCost, result.currency)}
                </p>
              </div>
            </div>
            <p className="mt-4 text-xs text-brand-light-gray">
              * This is an estimate based on current tariff rates. Actual duties may vary based on specific product classification and trade agreements.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TariffCalculator;
