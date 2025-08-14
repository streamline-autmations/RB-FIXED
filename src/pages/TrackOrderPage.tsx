import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Package, CheckCircle, Truck, AlertCircle, Box, Send, Printer, Palette, LayoutTemplate, Cog, PackageCheck, Home } from 'lucide-react';
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
  const [orderId, setOrderId] = useState('');
  const [currentStatus, setCurrentStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const orderStages: OrderStage[] = [
    { id: 'designing', title: 'Designing', description: 'The design process has started.', icon: Palette },
    { id: 'layout-department', title: 'Layout Department', description: 'The design is with the layout department.', icon: LayoutTemplate },
    { id: 'print-press-department', title: 'Print & Press Dept.', description: 'The order is with the printing department.', icon: Printer },
    { id: 'manufacturing-department', title: 'Manufacturing Dept.', description: 'The order is in the manufacturing stage.', icon: Cog },
    { id: 'cleaning-packing', title: 'Cleaning & Packing', description: 'The order is being cleaned and packaged.', icon: Box },
    { id: 'ready-for-dispatch', title: 'Ready for Dispatch/Collection', description: 'The order is complete and ready for the customer.', icon: PackageCheck },
    { id: 'out-for-delivery', title: 'Out for Delivery', description: 'The order has left the facility for delivery.', icon: Truck },
    { id: 'delivered-collected', title: 'Delivered/Collected', description: 'Your order has been successfully delivered or collected.', icon: Home }
  ];

  const mapStatusToStage = (status: string | null): string => {
    if (!status) return 'designing';
    
    const lowerCaseStatus = status.toLowerCase();

    switch (lowerCaseStatus) {
      case 'designing':
        return 'designing';
      case 'layout department':
        return 'layout-department';
      case 'print & press department':
        return 'print-press-department';
      case 'manufacturing department':
        return 'manufacturing-department';
      case 'cleaning & packing':
        return 'cleaning-packing';
      case 'ready for dispatch/collection':
        return 'ready-for-dispatch';
      case 'out for delivery':
        return 'out-for-delivery';
      case 'delivered/collected':
        return 'delivered-collected';
      default:
        return 'designing';
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
    const stageId = mapStatusToStage(status);
    const stage = orderStages.find(s => s.id === stageId);
    return stage ? stage.description : 'Your order is in progress.';
  };

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://dockerfile-1n82.onrender.com/webhook/Track%20Order?lead_id=${encodeURIComponent(orderId.trim())}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data: ApiResponse = await response.json();
      setCurrentStatus(data.status || null);
    } catch (err) {
      console.error('Error fetching order status:', err);
      setError('Unable to fetch order status. Please check your Order ID and try again.');
      setCurrentStatus(null);
    } finally {
      setIsLoading(false);
    }
  };

  const currentStageIndex = getCurrentStageIndex(currentStatus);
  const statusMessage = getStatusMessage(currentStatus);

  return (
    <>
      <section className="pt-40 pb-16 bg-rb-black texture-overlay relative">
        <div className="absolute inset-0 bg-gradient-to-b from-rb-black to-transparent opacity-80"></div>
        <div className="container-custom relative z-10">
          <motion.div className="text-center max-w-3xl mx-auto" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl md:text-6xl font-bebas mb-6">Track Your Order</h1>
            <p className="text-lg text-rb-gray-300">Enter your Order ID to check the status of your custom sportswear order</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-rb-gray-900">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div className="bg-rb-gray-800 p-8 rounded-lg" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <form onSubmit={handleTrackOrder} className="space-y-6">
                <div>
                  <label htmlFor="orderId" className="block text-rb-white font-bebas text-xl mb-3">Order ID</label>
                  <div className="relative">
                    <input type="text" id="orderId" value={orderId} onChange={(e) => setOrderId(e.target.value)} placeholder="Enter your Order ID (e.g., ABC123DEF456)" className="w-full px-4 py-3 bg-rb-gray-700 text-rb-white border border-rb-gray-600 rounded-md focus:border-rb-red focus:outline-none transition-colors" required />
                    <Search className="absolute right-3 top-3 text-rb-gray-400" size={20} />
                  </div>
                  <p className="text-rb-gray-400 text-sm mt-2">Your Order ID was provided when you submitted your quote request</p>
                </div>
                <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Tracking...' : 'Track Order'}
                </Button>
              </form>
            </motion.div>

            {error && (
              <motion.div className="mt-6 bg-red-900/50 border border-red-500 p-4 rounded-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <div className="flex items-center"><AlertCircle className="text-red-400 mr-3" size={20} /><p className="text-red-200">{error}</p></div>
              </motion.div>
            )}

            {currentStatus !== null && !error && (
              <motion.div className="mt-8 bg-rb-gray-800 p-8 rounded-lg" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                {statusMessage && (
                  <div className="mb-8 p-4 bg-rb-gray-700 rounded-lg">
                    <div className="flex items-center"><Package className="text-blue-400 mr-3" size={24} /><p className="text-rb-white font-medium">{statusMessage}</p></div>
                  </div>
                )}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bebas text-rb-white mb-6">Order Progress</h3>
                  <div className="hidden md:block">
                    <div className="flex items-center justify-between relative">
                      <div className="absolute top-6 left-6 right-6 h-0.5 bg-rb-gray-600">
                        <div className="h-full bg-green-500 transition-all duration-1000 ease-out" style={{ width: currentStageIndex >= 0 ? `${(currentStageIndex / (orderStages.length - 1)) * 100}%` : '0%' }} />
                      </div>
                      {orderStages.map((stage, index) => {
                        const status = getStageStatus(index, currentStageIndex);
                        const StageIcon = stage.icon;
                        return (
                          <div key={stage.id} className="flex flex-col items-center relative z-10 w-1/8 px-2"> {/* Added w-1/8 and px-2 for flexible spacing */}
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${status === 'completed' ? 'bg-green-500 border-green-500 text-white' : status === 'current' ? 'bg-rb-red border-rb-red text-white animate-pulse' : 'bg-rb-gray-700 border-rb-gray-600 text-rb-gray-400'}`}>
                              {status === 'completed' ? <CheckCircle size={20} /> : <StageIcon size={20} />}
                            </div>
                            <div className="mt-3 text-center"><p className={`text-sm font-medium ${status === 'current' ? 'text-rb-red' : status === 'completed' ? 'text-green-400' : 'text-rb-gray-500'}`}>{stage.title}</p></div> {/* Removed fixed w-24 */}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="md:hidden space-y-4">
                    {orderStages.map((stage, index) => {
                      const status = getStageStatus(index, currentStageIndex);
                      const StageIcon = stage.icon;
                      return (
                        <div key={stage.id} className="flex items-start relative">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 mr-4 flex-shrink-0 transition-all duration-500 ${status === 'completed' ? 'bg-green-500 border-green-500 text-white' : status === 'current' ? 'bg-rb-red border-rb-red text-white animate-pulse' : 'bg-rb-gray-700 border-rb-gray-600 text-rb-gray-400'}`}>
                            {status === 'completed' ? <CheckCircle size={16} /> : <StageIcon size={16} />}
                          </div>
                          <div className="flex-1">
                            <h4 className={`font-medium ${status === 'current' ? 'text-rb-red' : status === 'completed' ? 'text-green-400' : 'text-rb-gray-500'}`}>{stage.title}</h4>
                            <p className="text-rb-gray-400 text-sm mt-1">{stage.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="mt-8 p-4 bg-rb-gray-700 rounded-md">
                  <p className="text-rb-gray-300 text-sm"><strong>Order ID:</strong> {orderId}</p>
                  <p className="text-rb-gray-300 text-sm mt-1"><strong>Current Status:</strong> {currentStatus || 'Designing'}</p>
                  <p className="text-rb-gray-300 text-sm mt-1"><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 bg-rb-black">
        <div className="container-custom">
          <motion.div className="text-center max-w-2xl mx-auto" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="text-3xl font-bebas mb-6">Need Help?</h2>
            <p className="text-rb-gray-400 mb-8">Can't find your Order ID or have questions about your order? Our team is here to help.</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button to="/contact" variant="outline" size="md">Contact Support</Button>
              <Button href="tel:0823163330" variant="primary" size="md">
                Call Us: 082 316 3330
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default TrackOrderPage;
