import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Package, Clock, CheckCircle, Truck, AlertCircle, CreditCard, Printer, Scissors, Gift } from 'lucide-react';
import Button from '../components/ui/Button';

interface OrderStage {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}

interface ApiResponse {
  status?: string;
  [key: string]: any;
}

const TrackOrderPage: React.FC = () => {
  const [leadId, setLeadId] = useState('');
  const [currentStatus, setCurrentStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const orderStages: OrderStage[] = [
    {
      id: 'awaiting-confirmation',
      title: 'Awaiting Confirmation',
      description: 'Your order is being reviewed and will be confirmed within 24 hours.',
      icon: Clock
    },
    {
      id: 'order-approved',
      title: 'Order Approved',
      description: 'Your order has been approved and is ready for production.',
      icon: CheckCircle
    },
    {
      id: 'printing',
      title: 'Printing',
      description: 'Your designs are being printed onto the fabric.',
      icon: Printer
    },
    {
      id: 'pressing',
      title: 'Pressing',
      description: 'Your printed designs are being heat pressed and set.',
      icon: Scissors
    },
    {
      id: 'cleaning-packing',
      title: 'Cleaning & Packing',
      description: 'Final quality checks and packaging for delivery.',
      icon: Gift
    },
    {
      id: 'payment-pending',
      title: 'Payment Pending',
      description: 'Waiting for final payment before delivery.',
      icon: CreditCard
    },
    {
      id: 'delivered',
      title: 'Delivered to Client',
      description: 'Your order has been completed and delivered successfully.',
      icon: Truck
    }
  ];

  const mapStatusToStage = (status: string | null): string => {
    if (!status) return 'awaiting-confirmation';
    
    switch (status.toLowerCase()) {
      case 'orders':
        return 'order-approved';
      case 'packing':
        return 'cleaning-packing';
      case 'payment reminder':
        return 'payment-pending';
      case 'delivered':
        return 'delivered';
      default:
        return 'awaiting-confirmation';
    }
  };

  const getCurrentStageIndex = (status: string | null): number => {
    const stageId = mapStatusToStage(status);
    return orderStages.findIndex(stage => stage.id === stageId);
  };

  const getStageStatus = (index: number, currentIndex: number): 'completed' | 'current' | 'future' => {
    if (index < currentIndex) return 'completed';
    if (index === currentIndex) return 'current';
    return 'future';
  };

  const getStatusMessage = (status: string | null): string => {
    if (!status) return '';
    
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'Your order has been completed and delivered successfully.';
      case 'payment reminder':
        return 'Waiting for final payment before delivery.';
      default:
        return '';
    }
  };

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadId.trim()) return;

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://dockerfile-1n82.onrender.com/webhook/Track%20Order?lead_id=${encodeURIComponent(leadId.trim())}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ApiResponse = await response.json();
      setCurrentStatus(data.status || null);
    } catch (err) {
      console.error('Error fetching order status:', err);
      setError('Unable to fetch order status. Please check your Lead ID and try again.');
      setCurrentStatus(null);
    } finally {
      setIsLoading(false);
    }
  };

  const currentStageIndex = getCurrentStageIndex(currentStatus);
  const statusMessage = getStatusMessage(currentStatus);

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-rb-black texture-overlay relative">
        <div className="absolute inset-0 bg-gradient-to-b from-rb-black to-transparent opacity-80"></div>
        
        <div className="container-custom relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bebas mb-6">Track Your Order</h1>
            <p className="text-lg text-rb-gray-300">
              Enter your Lead ID to check the status of your custom sportswear order
            </p>
          </motion.div>
        </div>
      </section>

      {/* Track Order Form */}
      <section className="py-20 bg-rb-gray-900">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <motion.div
              className="bg-rb-gray-800 p-8 rounded-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <form onSubmit={handleTrackOrder} className="space-y-6">
                <div>
                  <label htmlFor="leadId" className="block text-rb-white font-bebas text-xl mb-3">
                    Lead ID
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="leadId"
                      value={leadId}
                      onChange={(e) => setLeadId(e.target.value)}
                      placeholder="Enter your Lead ID (e.g., ABC123DEF456)"
                      className="w-full px-4 py-3 bg-rb-gray-700 text-rb-white border border-rb-gray-600 rounded-md focus:border-rb-red focus:outline-none transition-colors"
                      required
                    />
                    <Search className="absolute right-3 top-3 text-rb-gray-400" size={20} />
                  </div>
                  <p className="text-rb-gray-400 text-sm mt-2">
                    Your Lead ID was provided when you submitted your quote request
                  </p>
                </div>

                <Button 
                  type="submit" 
                  variant="primary" 
                  size="lg" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Tracking...' : 'Track Order'}
                </Button>
              </form>
            </motion.div>

            {/* Error Message */}
            {error && (
              <motion.div
                className="mt-6 bg-red-900/50 border border-red-500 p-4 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center">
                  <AlertCircle className="text-red-400 mr-3" size={20} />
                  <p className="text-red-200">{error}</p>
                </div>
              </motion.div>
            )}

            {/* Order Status Display */}
            {currentStatus !== null && !error && (
              <motion.div
                className="mt-8 bg-rb-gray-800 p-8 rounded-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Status Message */}
                {statusMessage && (
                  <div className="mb-8 p-4 bg-rb-gray-700 rounded-lg">
                    <div className="flex items-center">
                      {currentStatus?.toLowerCase() === 'delivered' ? (
                        <CheckCircle className="text-green-400 mr-3" size={24} />
                      ) : currentStatus?.toLowerCase() === 'payment reminder' ? (
                        <CreditCard className="text-yellow-400 mr-3" size={24} />
                      ) : (
                        <Package className="text-blue-400 mr-3" size={24} />
                      )}
                      <p className="text-rb-white font-medium">{statusMessage}</p>
                    </div>
                  </div>
                )}

                {/* Progress Tracker */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bebas text-rb-white mb-6">Order Progress</h3>
                  
                  {/* Desktop: Horizontal Progress */}
                  <div className="hidden md:block">
                    <div className="flex items-center justify-between relative">
                      {/* Progress Line */}
                      <div className="absolute top-6 left-6 right-6 h-0.5 bg-rb-gray-600">
                        <div 
                          className="h-full bg-green-500 transition-all duration-1000 ease-out"
                          style={{ 
                            width: currentStageIndex >= 0 ? `${(currentStageIndex / (orderStages.length - 1)) * 100}%` : '0%' 
                          }}
                        />
                      </div>
                      
                      {orderStages.map((stage, index) => {
                        const status = getStageStatus(index, currentStageIndex);
                        const StageIcon = stage.icon;
                        
                        return (
                          <div key={stage.id} className="flex flex-col items-center relative z-10">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                              status === 'completed' 
                                ? 'bg-green-500 border-green-500 text-white' 
                                : status === 'current'
                                ? 'bg-rb-red border-rb-red text-white animate-pulse'
                                : 'bg-rb-gray-700 border-rb-gray-600 text-rb-gray-400'
                            }`}>
                              {status === 'completed' ? (
                                <CheckCircle size={20} />
                              ) : (
                                <StageIcon size={20} />
                              )}
                            </div>
                            <div className="mt-3 text-center max-w-24">
                              <p className={`text-sm font-medium ${
                                status === 'current' ? 'text-rb-red' : 
                                status === 'completed' ? 'text-green-400' : 'text-rb-gray-500'
                              }`}>
                                {stage.title}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Mobile: Vertical Progress */}
                  <div className="md:hidden space-y-4">
                    {orderStages.map((stage, index) => {
                      const status = getStageStatus(index, currentStageIndex);
                      const StageIcon = stage.icon;
                      
                      return (
                        <div key={stage.id} className="flex items-start">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 mr-4 flex-shrink-0 transition-all duration-500 ${
                            status === 'completed' 
                              ? 'bg-green-500 border-green-500 text-white' 
                              : status === 'current'
                              ? 'bg-rb-red border-rb-red text-white animate-pulse'
                              : 'bg-rb-gray-700 border-rb-gray-600 text-rb-gray-400'
                          }`}>
                            {status === 'completed' ? (
                              <CheckCircle size={16} />
                            ) : (
                              <StageIcon size={16} />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className={`font-medium ${
                              status === 'current' ? 'text-rb-red' : 
                              status === 'completed' ? 'text-green-400' : 'text-rb-gray-500'
                            }`}>
                              {stage.title}
                            </h4>
                            <p className="text-rb-gray-400 text-sm mt-1">{stage.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-8 p-4 bg-rb-gray-700 rounded-md">
                  <p className="text-rb-gray-300 text-sm">
                    <strong>Lead ID:</strong> {leadId}
                  </p>
                  <p className="text-rb-gray-300 text-sm mt-1">
                    <strong>Current Status:</strong> {currentStatus || 'Awaiting Confirmation'}
                  </p>
                  <p className="text-rb-gray-300 text-sm mt-1">
                    <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 bg-rb-black">
        <div className="container-custom">
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bebas mb-6">Need Help?</h2>
            <p className="text-rb-gray-400 mb-8">
              Can't find your Lead ID or have questions about your order? Our team is here to help.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button to="/contact" variant="outline" size="md">
                Contact Support
              </Button>
              <Button href="tel:+27823163330" variant="primary" size="md">
                <a href="tel:0823163330">Call Us: 082 316 3330</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default TrackOrderPage;