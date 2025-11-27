const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-100 py-16 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-lg shadow-md p-8 sm:p-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          Privacy Policy
        </h1>
        <p className="text-base text-gray-500 mb-10">
          Last updated: 30 June 2025
        </p>

        <div className="prose max-w-none">
          <p>
            <strong>About 9jaSchoolsHub:</strong> 9jaSchoolsHub is an online
            information portal for Nigerian students, parents, educators, and
            anyone interested in verified details about universities, courses,
            admissions and related educational resources.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-3">
            Information We Collect
          </h2>
          <p>
            <strong>Personal Information:</strong>
          </p>
          <ul className="list-disc ml-6">
            <li>
              We may collect basic personal details (such as your name and
              email) if you choose to contact us through a form or email.
            </li>
            <li>
              This information is used only to respond to your request or
              inquiry.
            </li>
          </ul>

          <p>
            <strong>Automatic & Technical Information:</strong>
          </p>
          <ul className="list-disc ml-6">
            <li>
              Like most websites, we collect non-personally-identifiable data
              such as IP address, browser type, pages viewed, and general usage
              data.
            </li>
            <li>
              This helps us maintain and improve the site, analyze traffic, and
              keep the platform secure.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-3">
            Cookies & Third-Party Advertising
          </h2>
          <p>
            9jaSchoolsHub uses cookies and similar tracking technologies to:
          </p>
          <ul className="list-disc ml-6">
            <li>Understand how visitors use our site</li>
            <li>Show relevant content and ads</li>
            <li>Improve user experience</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-3">
            External Links
          </h2>
          <p>
            Our site may include links to external websites (e.g., official
            university pages). We are not responsible for the privacy practices
            or content of other websites. We encourage you to read their privacy
            policies.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-3">
            How We Use Information
          </h2>
          <p>We may use collected information to:</p>
          <ul className="list-disc ml-6">
            <li>Operate, maintain, and improve the website</li>
            <li>Communicate with you if you reach out to us</li>
            <li>Show relevant content and ads</li>
            <li>Comply with applicable laws and protect our rights</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-3">
            Security
          </h2>
          <p>
            We take reasonable measures to protect the information we collect.
            However, no website or internet transmission is completely secure,
            so we cannot guarantee absolute security.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-3">
            Sharing of Information
          </h2>
          <p>We do not share personal info except:</p>
          <ul className="list-disc ml-6">
            <li>
              When required by law, legal process, or to protect our rights
            </li>
            <li>
              With trusted partners who help us operate the site (such as
              analytics or ad providers)
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-3">
            Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy occasionally. Any changes will be
            posted on this page with an updated “Last Modified” date. By
            continuing to use the site, you accept the revised policy.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-3">
            Contact Us
          </h2>
          <p>
            For any questions about this policy, please contact us at:{" "}
            <a
              href="mailto:9jaschoolshub@gmail.com"
              className="text-blue-600 hover:underline"
            >
              9jaschoolshub@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
export default PrivacyPolicy;
