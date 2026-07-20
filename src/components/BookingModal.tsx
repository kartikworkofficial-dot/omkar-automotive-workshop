import { useState } from "react";
import { useForm } from "react-hook-form";
import { X, Calendar, Clock, Car, Wrench, CheckCircle } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/src/firebase";
import { handleFirestoreError, OperationType } from "@/src/lib/firestore-errors";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const path = 'bookings';
      await addDoc(collection(db, path), {
        ...data,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        reset();
        onClose();
      }, 3000);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'bookings');
      alert("Failed to submit booking request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-darker/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white border border-steel/20 rounded-2xl shadow-2xl z-[101] overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-steel/20 bg-light">
              <h3 className="text-2xl font-display font-bold text-darker">Book a Service</h3>
              <button onClick={onClose} className="text-steel hover:text-secondary transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {isSuccess ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-secondary/20 text-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-display font-bold text-darker mb-2">Booking Confirmed!</h4>
                  <p className="text-dark">We have received your request and will contact you shortly to confirm the appointment.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-steel">First Name</label>
                      <input
                        {...register("firstName", { required: true })}
                        className="w-full bg-light border border-steel/30 rounded-lg px-4 py-2.5 text-darker focus:outline-none focus:border-secondary transition-colors"
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-steel">Last Name</label>
                      <input
                        {...register("lastName", { required: true })}
                        className="w-full bg-light border border-steel/30 rounded-lg px-4 py-2.5 text-darker focus:outline-none focus:border-secondary transition-colors"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-steel">Phone Number</label>
                    <input
                      {...register("phone", { required: true })}
                      type="tel"
                      className="w-full bg-light border border-steel/30 rounded-lg px-4 py-2.5 text-darker focus:outline-none focus:border-secondary transition-colors"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-steel flex items-center gap-2">
                        <Car className="w-4 h-4 text-secondary" /> Vehicle Type
                      </label>
                      <select
                        {...register("vehicleType", { required: true })}
                        className="w-full bg-light border border-steel/30 rounded-lg px-4 py-2.5 text-darker focus:outline-none focus:border-secondary transition-colors appearance-none"
                      >
                        <option value="">Select Type</option>
                        <option value="car">Car / SUV</option>
                        <option value="bike">Two Wheeler</option>
                        <option value="commercial">Commercial Vehicle</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-steel flex items-center gap-2">
                        <Wrench className="w-4 h-4 text-secondary" /> Service Needed
                      </label>
                      <select
                        {...register("service", { required: true })}
                        className="w-full bg-light border border-steel/30 rounded-lg px-4 py-2.5 text-darker focus:outline-none focus:border-secondary transition-colors appearance-none"
                      >
                        <option value="">Select Service</option>
                        <option value="general">General Servicing</option>
                        <option value="engine">Engine Repair</option>
                        <option value="oil">Oil Change</option>
                        <option value="brakes">Brake Repair</option>
                        <option value="other">Other / Inspection</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-steel flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-secondary" /> Preferred Date
                      </label>
                      <input
                        {...register("date", { required: true })}
                        type="date"
                        className="w-full bg-light border border-steel/30 rounded-lg px-4 py-2.5 text-darker focus:outline-none focus:border-secondary transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-steel flex items-center gap-2">
                        <Clock className="w-4 h-4 text-secondary" /> Preferred Time
                      </label>
                      <select
                        {...register("time", { required: true })}
                        className="w-full bg-light border border-steel/30 rounded-lg px-4 py-2.5 text-darker focus:outline-none focus:border-secondary transition-colors appearance-none"
                      >
                        <option value="">Select Time</option>
                        <option value="morning">Morning (9AM - 12PM)</option>
                        <option value="afternoon">Afternoon (12PM - 4PM)</option>
                        <option value="evening">Evening (4PM - 7PM)</option>
                      </select>
                    </div>
                  </div>

                  <Button type="submit" className="w-full h-12 text-base mt-4 bg-secondary hover:bg-secondary-dark text-lighter" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Confirm Booking Request"}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
