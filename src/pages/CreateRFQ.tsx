import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { X, Info, Calendar, MapPin, DollarSign, Package, Cpu, HardDrive, Monitor, FileText } from 'lucide-react';
import { enforceBuyerRole } from '../utils/auth';

export default function CreateRFQ() {
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    enforceBuyerRole();
  }, []);
  const [visibilityType, setVisibilityType] = useState<'public' | 'panel'>('public');
  const [smmePreference, setSmmePreference] = useState(false);
  const [status, setStatus] = useState<'active' | 'draft'>('active');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Laptops',
    organization: 'TechNova Solutions',
    processor: '',
    ram: '',
    storage: '',
    displaySize: '',
    quantity: '',
    deliveryLocation: '',
    minBudget: '',
    closingDate: '',
    smmePercentage: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 2000);
  };

  const handleSaveDraft = () => {
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-soft-white flex">
      <Sidebar activePage="create" />

      <div className="flex-1 ml-64">
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-poppins font-semibold text-dark-gray">
                Create New Laptop RFQ
              </h1>
              <p className="text-gray-600 font-inter mt-1">
                Provide details for the laptops you need — verified vendors will respond with bids
              </p>
            </div>

            <a
              href="/dashboard"
              className="text-coral hover:text-coral/80 font-inter font-medium flex items-center gap-2"
            >
              <X className="w-5 h-5" />
              Cancel
            </a>
          </div>
        </div>

        <div className="p-8">
          <form onSubmit={handlePublish} className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-md p-8 space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1 h-8 bg-coral rounded-full"></div>
                  <h2 className="text-2xl font-poppins font-semibold text-dark-gray">
                    Basic Information
                  </h2>
                </div>

                <div className="space-y-5">
                  <div>
                    <label htmlFor="title" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                      RFQ Title <span className="text-coral">*</span>
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="e.g., HP EliteBook 840 G10 – 25 Units"
                        className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                      Description <span className="text-coral">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Provide detailed information about your laptop requirements, intended use, or any specific needs..."
                      rows={4}
                      className="w-full px-4 py-3.5 border border-gray-200 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all resize-none"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="category" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3.5 border border-gray-200 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all bg-white"
                        disabled
                      >
                        <option value="Laptops">Laptops</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="organization" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                        Organization
                      </label>
                      <input
                        type="text"
                        id="organization"
                        name="organization"
                        value={formData.organization}
                        className="w-full px-4 py-3.5 border border-gray-200 rounded-xl font-inter bg-gray-50 text-gray-600 cursor-not-allowed"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1 h-8 bg-coral rounded-full"></div>
                  <h2 className="text-2xl font-poppins font-semibold text-dark-gray">
                    Specifications
                  </h2>
                </div>

                <div className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="processor" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                        Processor <span className="text-coral">*</span>
                      </label>
                      <div className="relative">
                        <Cpu className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select
                          id="processor"
                          name="processor"
                          value={formData.processor}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all bg-white"
                          required
                        >
                          <option value="">Select processor</option>
                          <option value="Intel Core i3">Intel Core i3</option>
                          <option value="Intel Core i5">Intel Core i5</option>
                          <option value="Intel Core i7">Intel Core i7</option>
                          <option value="Intel Core i9">Intel Core i9</option>
                          <option value="AMD Ryzen 5">AMD Ryzen 5</option>
                          <option value="AMD Ryzen 7">AMD Ryzen 7</option>
                          <option value="AMD Ryzen 9">AMD Ryzen 9</option>
                          <option value="Apple M1">Apple M1</option>
                          <option value="Apple M2">Apple M2</option>
                          <option value="Apple M3">Apple M3</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="ram" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                        RAM <span className="text-coral">*</span>
                      </label>
                      <select
                        id="ram"
                        name="ram"
                        value={formData.ram}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3.5 border border-gray-200 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all bg-white"
                        required
                      >
                        <option value="">Select RAM</option>
                        <option value="8GB">8GB</option>
                        <option value="16GB">16GB</option>
                        <option value="32GB">32GB</option>
                        <option value="64GB">64GB</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="storage" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                        Storage <span className="text-coral">*</span>
                      </label>
                      <div className="relative">
                        <HardDrive className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select
                          id="storage"
                          name="storage"
                          value={formData.storage}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all bg-white"
                          required
                        >
                          <option value="">Select storage</option>
                          <option value="256GB SSD">256GB SSD</option>
                          <option value="512GB SSD">512GB SSD</option>
                          <option value="1TB SSD">1TB SSD</option>
                          <option value="2TB SSD">2TB SSD</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="displaySize" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                        Display Size <span className="text-coral">*</span>
                      </label>
                      <div className="relative">
                        <Monitor className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select
                          id="displaySize"
                          name="displaySize"
                          value={formData.displaySize}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all bg-white"
                          required
                        >
                          <option value="">Select display size</option>
                          <option value='13"'>13"</option>
                          <option value='14"'>14"</option>
                          <option value='15.6"'>15.6"</option>
                          <option value='17"'>17"</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="quantity" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                        Quantity <span className="text-coral">*</span>
                      </label>
                      <div className="relative">
                        <Package className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          id="quantity"
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleInputChange}
                          placeholder="e.g., 25"
                          min="1"
                          className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="deliveryLocation" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                        Delivery Location <span className="text-coral">*</span>
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          id="deliveryLocation"
                          name="deliveryLocation"
                          value={formData.deliveryLocation}
                          onChange={handleInputChange}
                          placeholder="e.g., Cape Town, Western Cape"
                          className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1 h-8 bg-coral rounded-full"></div>
                  <h2 className="text-2xl font-poppins font-semibold text-dark-gray">
                    Budget & Dates
                  </h2>
                </div>

                <div className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="minBudget" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                        Estimated Budget (ZAR) <span className="text-coral">*</span>
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          id="minBudget"
                          name="minBudget"
                          value={formData.minBudget}
                          onChange={handleInputChange}
                          placeholder="e.g., 500000"
                          min="1"
                          className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                          required
                        />
                      </div>
                      <p className="text-xs text-gray-500 font-inter mt-1">
                        Total budget for all units
                      </p>
                    </div>

                    <div>
                      <label htmlFor="closingDate" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                        Closing Date <span className="text-coral">*</span>
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="date"
                          id="closingDate"
                          name="closingDate"
                          value={formData.closingDate}
                          onChange={handleInputChange}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-inter font-medium text-gray-700 mb-3">
                      Status
                    </label>
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setStatus('active')}
                        className={`flex-1 px-4 py-3 rounded-xl border-2 font-inter font-medium transition-all ${
                          status === 'active'
                            ? 'border-coral bg-coral/5 text-coral'
                            : 'border-gray-200 text-gray-700 hover:border-coral/50'
                        }`}
                      >
                        Active (Publish Now)
                      </button>
                      <button
                        type="button"
                        onClick={() => setStatus('draft')}
                        className={`flex-1 px-4 py-3 rounded-xl border-2 font-inter font-medium transition-all ${
                          status === 'draft'
                            ? 'border-coral bg-coral/5 text-coral'
                            : 'border-gray-200 text-gray-700 hover:border-coral/50'
                        }`}
                      >
                        Save as Draft
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1 h-8 bg-coral rounded-full"></div>
                  <h2 className="text-2xl font-poppins font-semibold text-dark-gray">
                    Visibility & Preferences
                  </h2>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-inter font-medium text-gray-700 mb-3">
                      Visibility Type
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-coral/50 transition-all">
                        <input
                          type="radio"
                          name="visibility"
                          value="public"
                          checked={visibilityType === 'public'}
                          onChange={() => setVisibilityType('public')}
                          className="mt-1 w-4 h-4 text-coral focus:ring-coral"
                        />
                        <div>
                          <p className="font-inter font-medium text-dark-gray">Public</p>
                          <p className="text-sm text-gray-600 font-inter">
                            Any verified vendor on ProcureLink can view and bid on this RFQ
                          </p>
                        </div>
                      </label>

                      <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-coral/50 transition-all">
                        <input
                          type="radio"
                          name="visibility"
                          value="panel"
                          checked={visibilityType === 'panel'}
                          onChange={() => setVisibilityType('panel')}
                          className="mt-1 w-4 h-4 text-coral focus:ring-coral"
                        />
                        <div>
                          <p className="font-inter font-medium text-dark-gray">Panel Only</p>
                          <p className="text-sm text-gray-600 font-inter">
                            Only vendors in your approved panel can view and bid on this RFQ
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="bg-soft-white rounded-xl p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <label className="font-inter font-medium text-dark-gray">
                          SMME Preference
                        </label>
                        <p className="text-sm text-gray-600 font-inter mt-1">
                          Enable evaluation discounts for certified SMME vendors
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={smmePreference}
                          onChange={(e) => setSmmePreference(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-coral/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral"></div>
                      </label>
                    </div>

                    {smmePreference && (
                      <div className="mt-4">
                        <label htmlFor="smmePercentage" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                          Preference Percentage
                        </label>
                        <input
                          type="number"
                          id="smmePercentage"
                          name="smmePercentage"
                          value={formData.smmePercentage}
                          onChange={handleInputChange}
                          placeholder="e.g., 10"
                          min="0"
                          max="100"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                        />
                        <div className="flex items-start gap-2 mt-3 p-3 bg-coral/10 rounded-lg">
                          <Info className="w-5 h-5 text-coral flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-gray-700 font-inter">
                            SMME vendors will receive evaluation discounts based on your set percentage
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-8">
              <a
                href="/dashboard"
                className="text-gray-600 hover:text-dark-gray font-inter font-medium"
              >
                Cancel
              </a>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="px-6 py-3 border-2 border-coral text-coral rounded-xl font-poppins font-medium hover:bg-coral hover:text-white transition-all"
                >
                  Save as Draft
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-coral text-white rounded-xl font-poppins font-medium hover:bg-coral/90 transition-all shadow-md hover:shadow-lg"
                >
                  Publish RFQ
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="border-t border-gray-200 px-8 py-6 mt-8">
          <p className="text-center text-sm text-gray-500 font-inter">
            © 2025 ProcureLink | All rights reserved
          </p>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full animate-fade-in">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-poppins font-semibold text-dark-gray text-center mb-2">
              Success!
            </h3>
            <p className="text-gray-600 font-inter text-center mb-6">
              Your RFQ has been successfully posted! Vendors will start submitting bids shortly.
            </p>
            <a href="/dashboard" className="block">
              <button className="w-full px-6 py-3 bg-coral text-white rounded-xl font-poppins font-medium hover:bg-coral/90 transition-all">
                Go to Dashboard
              </button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
