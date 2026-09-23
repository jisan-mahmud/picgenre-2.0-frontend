import React from 'react'
import Reveal from '../components/ui/Reveal'

export default function PrivacyPolicy() {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white">
            <section className="pt-20 pb-12 px-6">
                <div className="max-w-3xl mx-auto">
                    <Reveal>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-6">
                            LAST UPDATED: MAY 24, 2024
                        </div>
                    </Reveal>
                    <Reveal delay={100}>
                        <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4 text-slate-900 dark:text-white">
                            Privacy Policy
                        </h1>
                    </Reveal>
                    <Reveal delay={200}>
                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                            Your privacy is fundamental to our mission at Picgenre. This policy outlines how we handle your data with transparency and security.
                        </p>
                    </Reveal>
                </div>
            </section>
            <section className="pb-24 px-6">
                <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
                    <Reveal>
                    <p className="text-slate-700 dark:text-slate-300">
                        At Picgenre, we are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us at privacy@picgenre.com.
                    </p>
                    </Reveal>
                    <Reveal>
                    <h2 id="data-collection" className="text-slate-900 dark:text-white">1. Data Collection</h2>
                    <p className="text-slate-700 dark:text-slate-300">
                        We collect information that you provide directly to us when you register for an account, use our services, or communicate with us.
                    </p>
                    <h3 className="text-slate-900 dark:text-white">Service-Specific Data</h3>
                    <ul className="text-slate-700 dark:text-slate-300">
                        <li><strong>Account Information:</strong> Name, email address, and authentication credentials.</li>
                        <li><strong>Usage Data:</strong> Information about how you use our metadata generation tools.</li>
                        <li><strong>API Keys:</strong> If you choose to "Bring Your Own Key" (BYOK), we require your API credentials for third-party providers.</li>
                    </ul>
                    <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-xl p-6 my-8">
                        <div className="flex gap-4">
                            <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">shield</span>
                            <div>
                                <h4 className="text-blue-900 dark:text-blue-200 font-bold mb-1">Security Note on API Keys</h4>
                                <p className="text-sm text-blue-800 dark:text-blue-200/70 mb-0">
                                    We take your security seriously. All API keys provided by users are <strong>never stored in plain text</strong>. They are encrypted at rest using industry-standard AES-256 encryption and are only decrypted in volatile memory during the execution of your requests.
                                </p>
                            </div>
                        </div>
                    </div>
                    </Reveal>
                    <Reveal>
                    <h2 id="usage-information" className="text-slate-900 dark:text-white">2. Usage of Information</h2>
                    <p className="text-slate-700 dark:text-slate-300">
                        We use the information we collect to operate, maintain, and provide the features and functionality of the Service, as well as to communicate directly with you.
                    </p>
                    <ul className="text-slate-700 dark:text-slate-300">
                        <li>To provide and maintain our Service, including to monitor the usage of our Service.</li>
                        <li>To manage Your Account: to manage Your registration as a user of the Service.</li>
                        <li>To provide you with news, special offers and general information about other goods, services and events which we offer.</li>
                        <li>To detect, prevent and address technical issues or security breaches.</li>
                    </ul>
                    </Reveal>
                    <Reveal>
                    <h2 id="third-party" className="text-slate-900 dark:text-white">3. Third Party Services</h2>
                    <p className="text-slate-700 dark:text-slate-300">
                        To provide high-performance AI features, we partner with specialized third-party infrastructure providers. These services are vetted for their privacy standards.
                    </p>
                    <h3 className="text-slate-900 dark:text-white">AI Processing Partners</h3>
                    <p className="text-slate-700 dark:text-slate-300">
                        Our core inference engine utilizes <strong>Groq AI</strong> for high-speed metadata generation. When you process a file, limited data necessary for generation is transmitted to Groq. This data is processed according to their enterprise privacy standards and is not used to train global models without your explicit consent.
                    </p>
                    <h3 className="text-slate-900 dark:text-white">Analytics & Infrastructure</h3>
                    <ul className="text-slate-700 dark:text-slate-300">
                        <li>Cloud hosting via industry-leading secure providers.</li>
                        <li>Usage analytics to improve performance and user experience.</li>
                        <li>Payment processing through secure, PCI-compliant gateways.</li>
                    </ul>
                    </Reveal>
                    <Reveal>
                    <h2 id="retention" className="text-slate-900 dark:text-white">4. Data Retention</h2>
                    <p className="text-slate-700 dark:text-slate-300">
                        We will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our legal agreements and policies.
                    </p>
                    </Reveal>
                    <Reveal>
                    <h2 id="rights" className="text-slate-900 dark:text-white">5. Your Privacy Rights</h2>
                    <p className="text-slate-700 dark:text-slate-300">
                        Depending on your location, you may have the following rights regarding your personal data:
                    </p>
                    <ul className="text-slate-700 dark:text-slate-300">
                        <li>The right to access, update or delete the information we have on you.</li>
                        <li>The right of rectification.</li>
                        <li>The right to object to processing.</li>
                        <li>The right of restriction.</li>
                        <li>The right to data portability.</li>
                    </ul>
                    </Reveal>
                    <Reveal>
                    <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
                        <p className="text-sm text-slate-500 italic">
                            If you have questions about this Privacy Policy, please contact us at <a className="text-primary hover:underline" href="mailto:support@picgenre.com">support@picgenre.com</a>.
                        </p>
                    </div>
                    </Reveal>
                </div>
            </section>
        </div>
    )
}
