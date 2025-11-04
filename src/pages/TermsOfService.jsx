const TermsOfService = () => {
  return (
    <div className="bg-gray-100 py-16 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-lg shadow-md p-8 sm:p-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          Terms of Service
        </h1>
        <p className="text-base text-gray-500 mb-10">
          Last updated: 30 June 2025
        </p>

        <div className="prose max-w-none">
          <p className="text-base">
            <strong>Welcome to 9jaSchoolsHub.</strong> By accessing or using our
            website, you agree to these Terms of Use. Please read them
            carefully.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-3">
            What We Do
          </h2>
          <p>
            9jaSchoolsHub is an informational platform created to help students,
            parents, and educators easily access accurate and up-to-date details
            about Nigerian universities, courses, admission requirements, and
            other education-related resources.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-3">
            Acceptable Use
          </h2>
          <p>
            You agree to use 9jaSchoolsHub only for lawful, educational, and
            informational purposes. You must not:
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>
                Attempt to damage, disrupt, or misuse the site or its data
              </li>
              <li>Copy or republish any content without permission</li>
              <li>
                Use automated tools (like bots or scrapers) to extract data
              </li>
              <li>
                Post or transmit any harmful, offensive, or unlawful content
                (if/when comments or forms are enabled)
              </li>
            </ul>
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-3">
            Intellectual Property
          </h2>
          <p>
            All content on this website—including text, graphics, logos, and
            data — is owned by 9jaSchoolsHub or its partners. You may not
            reproduce, distribute, or use any part of it without our written
            permission.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-3">
            Accuracy of Information
          </h2>
          <p>
            While we strive to provide accurate and current information, we
            cannot guarantee that all data (e.g., cut-off marks, school fees,
            course requirements) is always 100% up to date. Always verify with
            the official university websites before making any final decisions.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-3">
            External Links
          </h2>
          <p>
            Our platform may include links to third-party websites (such as
            universities, or exam bodies). We are not responsible for the
            content or reliability of these sites.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-3">
            Limitation of Liability
          </h2>
          <p>
            9jaSchoolsHub is provided "as is." We are not liable for any loss,
            decision, or inconvenience arising from the use of our content.
            Users are advised to verify critical information independently.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-3">
            Changes to These Terms
          </h2>
          <p>
            We may update these Terms of Use from time to time. Continued use of
            the platform after updates means you accept the revised terms.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-3">
            Contact Us
          </h2>
          <p>
            For any questions about these terms, please contact us at:{" "}
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
export default TermsOfService;
