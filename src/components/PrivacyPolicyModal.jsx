import { X } from 'lucide-react';

const PrivacyPolicyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 bg-opacity-50 ">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] overflow-y-auto p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 hover:text-red-500 cursor-pointer"
        >
          <X />
        </button>
        <h2 className="text-xl font-bold mb-4">Privacy Policy</h2>
        <p className="text-sm mb-2"><strong>Effective Date:</strong> 30 June 2025</p>
        <p className="text-sm mb-4"><strong>About 9jaSchoolsHub:</strong> 9jaSchoolsHub is an online information portal for Nigerian students, parents, educators, and anyone interested in verified details about universities, courses, admissions and related educational resources.
</p>
        <p className="text-sm mb-2"><strong>Information We Collect</strong></p>
        <ul className="list-disc ml-5 text-sm">
          <li>Personal Information:
            <ul>
              <li>We may collect basic personal details (such as your name and email) if you choose to contact us through a form or email.</li>
              <li>This information is used only to respond to your request or inquiry.</li>
            </ul>
            </li>
          <li>Automatic & Technical Information:
            <ul>
              <li>Like most websites, we collect non-personally-identifiable data such as IP address, browser type, pages viewed, and general usage data.</li>
<li>This helps us maintain and improve the site, analyze traffic, and keep the platform secure.</li>
</ul>
.</li>
        </ul>
        <p className="mt-4 text-sm font-semibold">Cookies & Third-Party Advertising</p>
        <p className="text-sm mb-2">9jaSchoolsHub uses cookies and similar tracking technologies to
          <ul>
            <li>Understand how visitors use our site</li>
            <li>Show relevant content and ads</li>
            <li>Improve user experience</li>
          </ul>
        </p>
        <p className="mt-4 text-sm font-semibold">External Links</p>
        <p className="text-sm mb-2">Our site may include links to external websites (e.g., official university pages). We are not responsible for the privacy practices or content of other websites. We encourage you to read their privacy policies.
</p>
        <p className="mt-4 text-sm font-semibold">How We Use Information</p>
        <p className="text-sm mb-2">We may use collected information to:
          <ul>
            <li>Operate, maintain, and improve the website</li>
            <li>Communicate with you if you reach out to us</li>
            <li>Show relevant content and ads</li>
             <li>Comply with applicable laws and protect our rights</li>
          </ul>
        </p>
        <p className="mt-4 text-sm font-semibold">Security</p>
        <p className="text-sm mb-2">We take reasonable measures to protect the information we collect. However, no website or internet transmission is completely secure, so we cannot guarantee absolute security.</p>
        <p className="mt-4 text-sm font-semibold">Sharing of Information</p>
        <p className="text-sm mb-2">We do not share personal info except :
          <ul>
            <li>When required by law, legal process, or to protect our rights</li>
            <li>With trusted partners who help us operate the site (such as analytics or ad providers)</li>
          </ul>
        </p>
        <p className="mt-4 text-sm font-semibold">Changes to This Policy</p>
        <p className="text-sm mb-2">We may update this Privacy Policy occasionally. Any changes will be posted on this page with an updated “Last Modified” date. By continuing to use the site, you accept the revised policy.
</p>
        <p className="mt-4 text-sm font-semibold">Contact Us</p>
        <p className="text-sm">📧 9jaschoolshub@gmail.com</p>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;