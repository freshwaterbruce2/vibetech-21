import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import PageHeader from '@/components/ui/page-header';
import { companyInfo } from '@/data/marketingData';

const Privacy: React.FC = () => {
  const lastUpdated = "December 10, 2024";

  return (
    <PageLayout
      title="Privacy Policy | Vibe Tech"
      description="Privacy Policy and GDPR compliance information for Vibe Tech digital agency."
    >
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 max-w-4xl">
          <PageHeader
            title="Privacy Policy"
            subtitle={`Last updated: ${lastUpdated}`}
            align="center"
          />

          <div className="prose prose-invert max-w-none mt-12 space-y-8">
            <section className="glass-card p-6 md:p-8 rounded-xl">
              <h2 className="text-xl font-semibold text-foreground mb-4">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                {companyInfo.name} ("we," "us," or "our") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                when you visit our website or use our services. Please read this policy carefully.
              </p>
            </section>

            <section className="glass-card p-6 md:p-8 rounded-xl">
              <h2 className="text-xl font-semibold text-foreground mb-4">2. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">We may collect information about you in various ways:</p>
              <h3 className="text-lg font-medium text-foreground mb-2">Personal Data</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
                <li>Name and contact information (email, phone number)</li>
                <li>Company name and job title</li>
                <li>Billing and payment information</li>
                <li>Communication preferences</li>
              </ul>
              <h3 className="text-lg font-medium text-foreground mb-2">Automatically Collected Data</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>IP address and browser type</li>
                <li>Device information and operating system</li>
                <li>Pages visited and time spent on our website</li>
                <li>Referring website addresses</li>
              </ul>
            </section>

            <section className="glass-card p-6 md:p-8 rounded-xl">
              <h2 className="text-xl font-semibold text-foreground mb-4">3. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Provide, operate, and maintain our services</li>
                <li>Process transactions and send related information</li>
                <li>Send promotional communications (with your consent)</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Analyze usage patterns to improve our website and services</li>
                <li>Detect, prevent, and address technical issues</li>
              </ul>
            </section>

            <section className="glass-card p-6 md:p-8 rounded-xl">
              <h2 className="text-xl font-semibold text-foreground mb-4">4. GDPR Compliance (EU Users)</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you are located in the European Economic Area (EEA), you have certain data protection rights 
                under the General Data Protection Regulation (GDPR):
              </p>
              <h3 className="text-lg font-medium text-foreground mb-2">Your Rights</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
                <li><strong>Right to Access:</strong> Request copies of your personal data</li>
                <li><strong>Right to Rectification:</strong> Request correction of inaccurate data</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
                <li><strong>Right to Restrict Processing:</strong> Request limitation of data processing</li>
                <li><strong>Right to Data Portability:</strong> Request transfer of your data</li>
                <li><strong>Right to Object:</strong> Object to processing of your personal data</li>
                <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time</li>
              </ul>
              <h3 className="text-lg font-medium text-foreground mb-2">Legal Basis for Processing</h3>
              <p className="text-muted-foreground leading-relaxed">
                We process your personal data based on: (a) your consent, (b) performance of a contract, 
                (c) compliance with legal obligations, or (d) our legitimate business interests.
              </p>
            </section>

            <section className="glass-card p-6 md:p-8 rounded-xl">
              <h2 className="text-xl font-semibold text-foreground mb-4">5. Cookies and Tracking Technologies</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use cookies and similar tracking technologies to collect and track information about your 
                browsing activities. You can control cookies through your browser settings.
              </p>
              <h3 className="text-lg font-medium text-foreground mb-2">Types of Cookies We Use</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li><strong>Essential Cookies:</strong> Required for website functionality</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
                <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements (with consent)</li>
              </ul>
            </section>

            <section className="glass-card p-6 md:p-8 rounded-xl">
              <h2 className="text-xl font-semibold text-foreground mb-4">6. Data Sharing and Disclosure</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">We may share your information with:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Service providers who assist in our operations</li>
                <li>Legal authorities when required by law</li>
                <li>Business partners (with your explicit consent)</li>
                <li>Successors in the event of a merger or acquisition</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                We do not sell your personal information to third parties.
              </p>
            </section>

            <section className="glass-card p-6 md:p-8 rounded-xl">
              <h2 className="text-xl font-semibold text-foreground mb-4">7. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your 
                personal data against unauthorized access, alteration, disclosure, or destruction. 
                However, no method of transmission over the Internet is 100% secure, and we cannot 
                guarantee absolute security.
              </p>
            </section>

            <section className="glass-card p-6 md:p-8 rounded-xl">
              <h2 className="text-xl font-semibold text-foreground mb-4">8. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your personal data only for as long as necessary to fulfill the purposes 
                for which it was collected, including legal, accounting, or reporting requirements. 
                When data is no longer needed, it will be securely deleted or anonymized.
              </p>
            </section>

            <section className="glass-card p-6 md:p-8 rounded-xl">
              <h2 className="text-xl font-semibold text-foreground mb-4">9. International Data Transfers</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your information may be transferred to and processed in countries other than your own. 
                We ensure appropriate safeguards are in place for international transfers, including 
                Standard Contractual Clauses approved by the European Commission.
              </p>
            </section>

            <section className="glass-card p-6 md:p-8 rounded-xl">
              <h2 className="text-xl font-semibold text-foreground mb-4">10. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our services are not intended for individuals under the age of 16. We do not knowingly 
                collect personal data from children. If we become aware that we have collected data from 
                a child, we will take steps to delete that information promptly.
              </p>
            </section>

            <section className="glass-card p-6 md:p-8 rounded-xl">
              <h2 className="text-xl font-semibold text-foreground mb-4">11. Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes 
                by posting the new policy on this page and updating the "Last updated" date. We encourage 
                you to review this policy periodically.
              </p>
            </section>

            <section className="glass-card p-6 md:p-8 rounded-xl">
              <h2 className="text-xl font-semibold text-foreground mb-4">12. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have questions about this Privacy Policy or wish to exercise your data protection rights, 
                please contact us:
              </p>
              <ul className="text-muted-foreground space-y-2">
                <li>
                  <strong className="text-foreground">Email:</strong>{' '}
                  <a href={`mailto:${companyInfo.email}`} className="text-primary hover:underline">
                    {companyInfo.email}
                  </a>
                </li>
                <li>
                  <strong className="text-foreground">Phone:</strong>{' '}
                  <a href={`tel:${companyInfo.phone}`} className="text-primary hover:underline">
                    {companyInfo.phone}
                  </a>
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                For EU residents, you also have the right to lodge a complaint with your local 
                data protection authority.
              </p>
            </section>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Privacy;
