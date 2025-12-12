import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import PageHeader from '@/components/ui/page-header';
import { companyInfo } from '@/data/marketingData';

const Terms: React.FC = () => {
  const lastUpdated = "December 10, 2024";

  return (
    <PageLayout
      title="Terms of Service | Vibe Tech"
      description="Terms of Service for Vibe Tech digital agency services."
    >
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 max-w-4xl">
          <PageHeader
            title="Terms of Service"
            subtitle={`Last updated: ${lastUpdated}`}
            align="center"
          />

          <div className="prose prose-invert max-w-none mt-12 space-y-8">
            <section className="glass-card p-6 md:p-8 rounded-xl">
              <h2 className="text-xl font-semibold text-foreground mb-4">1. Agreement to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing or using services provided by {companyInfo.name} ("we," "us," or "our"), 
                you agree to be bound by these Terms of Service. If you do not agree to these terms, 
                please do not use our services.
              </p>
            </section>

            <section className="glass-card p-6 md:p-8 rounded-xl">
              <h2 className="text-xl font-semibold text-foreground mb-4">2. Services Description</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {companyInfo.name} provides digital agency services including but not limited to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Web design and development</li>
                <li>AI-powered solutions and automation</li>
                <li>Digital marketing and SEO optimization</li>
                <li>Brand identity and graphic design</li>
                <li>Consulting and strategy services</li>
              </ul>
            </section>

            <section className="glass-card p-6 md:p-8 rounded-xl">
              <h2 className="text-xl font-semibold text-foreground mb-4">3. Client Responsibilities</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">As a client, you agree to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Provide accurate and complete information required for project completion</li>
                <li>Respond to communications and provide feedback in a timely manner</li>
                <li>Ensure you have the rights to any content you provide for use in projects</li>
                <li>Make payments according to agreed-upon terms</li>
                <li>Not use our services for any illegal or unauthorized purpose</li>
              </ul>
            </section>

            <section className="glass-card p-6 md:p-8 rounded-xl">
              <h2 className="text-xl font-semibold text-foreground mb-4">4. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Upon full payment, clients receive ownership of deliverables specifically created for their project. 
                However, {companyInfo.name} retains the right to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Use project work in our portfolio and marketing materials</li>
                <li>Retain ownership of pre-existing tools, frameworks, and proprietary systems</li>
                <li>Reuse general concepts, techniques, and knowledge gained during the project</li>
              </ul>
            </section>

            <section className="glass-card p-6 md:p-8 rounded-xl">
              <h2 className="text-xl font-semibold text-foreground mb-4">5. Payment Terms</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Payment terms are outlined in individual project proposals and contracts. General terms include:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>A deposit may be required before work commences</li>
                <li>Invoices are due within the timeframe specified in your contract</li>
                <li>Late payments may incur additional fees or result in work stoppage</li>
                <li>All fees are non-refundable unless otherwise agreed in writing</li>
              </ul>
            </section>

            <section className="glass-card p-6 md:p-8 rounded-xl">
              <h2 className="text-xl font-semibold text-foreground mb-4">6. Project Revisions</h2>
              <p className="text-muted-foreground leading-relaxed">
                The number of revisions included in a project will be specified in your proposal. 
                Additional revisions beyond the agreed scope may incur extra charges. 
                Major scope changes may require a new proposal and adjusted timeline.
              </p>
            </section>

            <section className="glass-card p-6 md:p-8 rounded-xl">
              <h2 className="text-xl font-semibold text-foreground mb-4">7. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                {companyInfo.name} shall not be liable for any indirect, incidental, special, consequential, 
                or punitive damages resulting from your use of our services. Our total liability shall not 
                exceed the amount paid by you for the specific services giving rise to the claim.
              </p>
            </section>

            <section className="glass-card p-6 md:p-8 rounded-xl">
              <h2 className="text-xl font-semibold text-foreground mb-4">8. Confidentiality</h2>
              <p className="text-muted-foreground leading-relaxed">
                Both parties agree to maintain the confidentiality of proprietary information shared during 
                the course of the project. This includes business strategies, technical specifications, 
                and any other sensitive information disclosed during our engagement.
              </p>
            </section>

            <section className="glass-card p-6 md:p-8 rounded-xl">
              <h2 className="text-xl font-semibold text-foreground mb-4">9. Termination</h2>
              <p className="text-muted-foreground leading-relaxed">
                Either party may terminate a project with written notice. In case of termination, 
                the client shall pay for all work completed up to the termination date. 
                We reserve the right to terminate services for breach of these terms.
              </p>
            </section>

            <section className="glass-card p-6 md:p-8 rounded-xl">
              <h2 className="text-xl font-semibold text-foreground mb-4">10. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these terms at any time. Changes will be effective 
                immediately upon posting to our website. Continued use of our services after changes 
                constitutes acceptance of the modified terms.
              </p>
            </section>

            <section className="glass-card p-6 md:p-8 rounded-xl">
              <h2 className="text-xl font-semibold text-foreground mb-4">11. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions regarding these Terms of Service, please contact us at:{' '}
                <a href={`mailto:${companyInfo.email}`} className="text-primary hover:underline">
                  {companyInfo.email}
                </a>
              </p>
            </section>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Terms;
