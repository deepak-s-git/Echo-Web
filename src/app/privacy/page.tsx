import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <Navbar />
      


      <div className="flex-1 flex flex-col items-center justify-start py-32 px-6 relative z-10">
        <div className="max-w-3xl w-full">
          
          <a 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors mb-12 font-medium tracking-wide"
          >
            <span aria-hidden="true">&larr;</span> Back to Echo
          </a>

          <h1 className="text-5xl md:text-6xl font-black mb-12 bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-transparent tracking-tight">
            Privacy Policy
          </h1>
          
          <div className="space-y-12 text-zinc-400 leading-relaxed text-base md:text-lg font-light">
            <p className="text-xl md:text-2xl text-zinc-300 font-medium leading-normal">
              At Echo, we take your privacy incredibly seriously. Our core philosophy is that your workflow data belongs to you, and it should stay on your machine.
            </p>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                <span className="w-8 h-[2px] bg-primary rounded-full"></span>
                What data we collect
              </h2>
              <p>
                <strong className="text-zinc-200 font-semibold">Email Addresses:</strong> When you download Echo from our website, we collect your name and email address. This is used strictly to send you the download link, critical product updates, and important announcements.
              </p>
              <p>
                <strong className="text-zinc-200 font-semibold">App Usage Data:</strong> We do NOT collect your app usage data. All workflow tracking, application window layouts, browser contexts, and session histories are stored locally on your Mac using a secure SQLite database. We do not have access to this data, nor do we sync it to any cloud servers.
              </p>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                <span className="w-8 h-[2px] bg-secondary rounded-full"></span>
                How we use your data
              </h2>
              <p>
                Your email address is solely used for direct communication regarding Echo updates. We will never sell, rent, or share your personal information with third-party marketers.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                <span className="w-8 h-[2px] bg-primary rounded-full"></span>
                Data Retention and Security
              </h2>
              <p>
                Since your workflow data never leaves your device, its security is managed by your macOS operating system. You retain full control to delete your local database or scrub your session history at any time directly through the Echo app settings.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                <span className="w-8 h-[2px] bg-secondary rounded-full"></span>
                Changes to this Policy
              </h2>
              <p>
                If we introduce optional cloud-syncing features in the future, we will update this policy and request your explicit opt-in consent before any data leaves your device.
              </p>
            </div>

            <div className="space-y-4 pt-8 border-t border-white/10">
              <h2 className="text-2xl font-bold text-white tracking-tight">Contact Us</h2>
              <p>
                If you have any questions or concerns about how we handle your data, please contact me directly at <a href="mailto:deepak.s.workdesk@gmail.com" className="text-primary hover:text-secondary transition-colors font-medium">deepak.s.workdesk@gmail.com</a>.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
