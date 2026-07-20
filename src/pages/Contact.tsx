import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/src/firebase";
import { handleFirestoreError, OperationType } from "@/src/lib/firestore-errors";

export function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const path = 'messages';
      await addDoc(collection(db, path), {
        ...data,
        createdAt: serverTimestamp(),
      });
      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'messages');
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-32 pb-24 min-h-screen bg-light">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-darker mb-6">Contact Us</h1>
          <p className="text-xl text-dark">We're here to help. Reach out to us for any inquiries or to book a service.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="bg-white border border-steel/20 p-8 rounded-2xl shadow-sm">
              <h3 className="text-2xl font-display font-bold text-darker mb-6">Our Location</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="text-darker font-medium mb-1">Address</h4>
                    <p className="text-dark text-sm leading-relaxed">
                      100 Feet Rd, Ekta Chowk, Sangli,<br />
                      Sangli Miraj Kupwad, Maharashtra 416416
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="text-darker font-medium mb-1">Phone</h4>
                    <a href="tel:+919422410051" className="text-dark text-sm leading-relaxed hover:text-secondary transition-colors">+91 9422410051</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="text-darker font-medium mb-1">Email</h4>
                    <p className="text-dark text-sm leading-relaxed">info@omkarautomotive.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="text-darker font-medium mb-1">Working Hours</h4>
                    <p className="text-dark text-sm leading-relaxed">
                      Monday - Saturday: 9:00 AM - 8:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white border border-steel/20 p-8 rounded-2xl shadow-sm"
          >
            <h3 className="text-2xl font-display font-bold text-darker mb-6">Send us a Message</h3>
            
            {isSuccess ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-secondary/20 text-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-display font-bold text-darker mb-2">Message Sent!</h4>
                <p className="text-dark">Thank you for reaching out. We'll get back to you as soon as possible.</p>
                <Button onClick={() => setIsSuccess(false)} variant="outline" className="mt-6">
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-steel">First Name</label>
                    <input
                      {...register("firstName", { required: true })}
                      type="text"
                      className="w-full bg-light border border-steel/30 rounded-lg px-4 py-3 text-darker focus:outline-none focus:border-secondary transition-colors"
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-steel">Last Name</label>
                    <input
                      {...register("lastName", { required: true })}
                      type="text"
                      className="w-full bg-light border border-steel/30 rounded-lg px-4 py-3 text-darker focus:outline-none focus:border-secondary transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-steel">Email Address</label>
                  <input
                    {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                    type="email"
                    className="w-full bg-light border border-steel/30 rounded-lg px-4 py-3 text-darker focus:outline-none focus:border-secondary transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-steel">Message</label>
                  <textarea
                    {...register("message", { required: true })}
                    rows={4}
                    className="w-full bg-light border border-steel/30 rounded-lg px-4 py-3 text-darker focus:outline-none focus:border-secondary transition-colors resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                <Button type="submit" className="w-full h-12 text-base mt-4" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : "Send Message"}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
