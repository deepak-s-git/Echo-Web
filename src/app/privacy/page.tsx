import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <Navbar />
      
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="flex-1 flex flex-col items-center justify-start py-32 px-6 relative z-10">
        <div className="max-w-3xl w-full">
          
          <a 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors mb-8 font-medium"
          >
            <span aria-hidden="true">&larr;</span> Back to Echo
          </a>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent pb-2">
            Privacy Policy
          </h1>
          
          <div className="space-y-6 text-text-secondary leading-relaxed text-sm md:text-base bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <p>
              At Echo, we take your privacy incredibly seriously. Our core philosophy is that your workflow data belongs to you, and it should stay on your machine.
            </p>
            
            <h2 className="text-xl font-bold text-foreground mt-8 border-b border-white/10 pb-2">1. What data we collect</h2>
            <p>
              <strong className="text-primary">Email Addresses:</strong> When you download Echo from our website, we collect your name and email address. This is used strictly to send you the download link, critical product updates, and important announcements.
            </p>
            <p>
              <strong className="text-primary">App Usage Data:</strong> We do NOT collect your app usage data. All workflow tracking, application window layouts, browser contexts, and session histories are stored locally on your Mac using a secure SQLite database. We do not have access to this data, nor do we sync it to any cloud servers.
            </p>
            
            <h2 className="text-xl font-bold text-foreground mt-8 border-b border-white/10 pb-2">2. How we use your data</h2>
            <p>
              Your email address is solely used for direct communication regarding Echo updates. We will never sell, rent, or share your personal information with third-party marketers.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8 border-b border-white/10 pb-2">3. Data Retention and Security</h2>
            <p>
              Since your workflow data never leaves your device, its security is managed by your macOS operating system. You retain full control to delete your local database or scrub your session history at any time directly through the Echo app settings.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8 border-b border-white/10 pb-2">4. Changes to this Policy</h2>
            <p>
              If we introduce optional cloud-syncing features in the future, we will update this policy and request your explicit opt-in consent before any data leaves your device.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8 border-b border-white/10 pb-2">Contact Us</h2>
            <p>
              If you have any questions or concerns about how we handle your data, please contact me directly at <a href="mailto:deepak.s.workdesk@gmail.com" className="text-secondary hover:underline font-medium">deepak.s.workdesk@gmail.com</a>.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
