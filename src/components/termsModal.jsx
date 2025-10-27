import React from 'react';
import { X } from 'lucide-react';

const TermsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-60 z-50 flex items-center justify-center px-4">
      <div className="bg-white max-h-[90vh] w-full max-w-3xl rounded-2xl shadow-xl overflow-y-auto relative p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
        >
          <X />
        </button>

        <h2 className="text-2xl font-bold mb-4">Terms of Service</h2>
        <p className="text-sm text-gray-800 mb-4">Effective Date: 30 June 2025</p>

        <div className="space-y-4 text-sm text-gray-700">
          <p><strong>Welcome to 9jaSchoolsHub.</strong> By accessing or using our website, you agree to these Terms of Use. Please read them carefully.</p>

          <p><strong>What We Do</strong><br />
          9jaSchoolsHub is an informational platform created to help students, parents, and educators easily access accurate and up-to-date details about Nigerian universities, courses, admission requirements, and other education-related resources.</p>

          <p><strong>Acceptable Use</strong><br />
          You agree to use 9jaSchoolsHub only for lawful, educational, and informational purposes. You must not:
            <ul className="list-disc ml-6">
              <li>Attempt to damage, disrupt, or misuse the site or its data</li>
              <li>Copy or republish any content without permission</li>
              <li>Use automated tools (like bots or scrapers) to extract data</li>
              <li>Post or transmit any harmful, offensive, or unlawful content (if/when comments or forms are enabled)</li>
            </ul>
          </p>

          <p><strong>Intellectual Property</strong><br />
          All content on this website — including text, graphics, logos, and data — is owned by 9jaSchoolsHub or its partners. You may not reproduce, distribute, or use any part of it without our written permission.</p>

          <p><strong>Accuracy of Information</strong><br />
          While we strive to provide accurate and current information, we cannot guarantee that all data (e.g., cut-off marks, school fees, course requirements) is always 100% up to date. Always verify with the official university websites before making any final decisions.</p>

          <p><strong>External Links</strong><br />
          Our platform may include links to third-party websites (such as universities, or exam bodies). We are not responsible for the content or reliability of these sites.</p>

          <p><strong>Limitation of Liability</strong><br />
          9jaSchoolsHub is provided “as is.” We are not liable for any loss, decision, or inconvenience arising from the use of our content. Users are advised to verify critical information independently.</p>

          <p><strong>Changes to These Terms</strong><br />
          We may update these Terms of Use from time to time. Continued use of the platform after updates means you accept the revised terms.</p>

          <p><strong>Contact Us</strong><br />
          📧 9jaschoolshub@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;