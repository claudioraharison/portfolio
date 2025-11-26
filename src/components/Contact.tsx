import React, { useState } from 'react';
import { useAutoTranslatedText } from '../hooks/useAutoTranslatedText';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Textes traduits
  const title = useAutoTranslatedText('contact.title', 'Contact');
  const subtitle = useAutoTranslatedText('contact.subtitle', 'Parlons de votre projet');
  const description = useAutoTranslatedText('contact.description', 
    'Je suis toujours ouvert à discuter de nouvelles opportunités et collaborations. N\'hésitez pas à me contacter pour échanger sur vos besoins en développement.'
  );
  const emailLabel = useAutoTranslatedText('contact.email_label', 'Email');
  const phoneLabel = useAutoTranslatedText('contact.phone_label', 'Téléphone');
  const locationLabel = useAutoTranslatedText('contact.location_label', 'Localisation');
  const nameLabel = useAutoTranslatedText('contact.name_label', 'Nom');
  const emailInputLabel = useAutoTranslatedText('contact.email_input_label', 'Email');
  const messageLabel = useAutoTranslatedText('contact.message_label', 'Message');
  const namePlaceholder = useAutoTranslatedText('contact.name_placeholder', 'Votre nom complet');
  const emailPlaceholder = useAutoTranslatedText('contact.email_placeholder', 'votre@email.com');
  const messagePlaceholder = useAutoTranslatedText('contact.message_placeholder', 
    'Décrivez votre projet, vos besoins ou posez-moi vos questions...'
  );
  const sendButton = useAutoTranslatedText('contact.send_button', 'Envoyer le message');
  const sendingText = useAutoTranslatedText('contact.sending_text', 'Envoi en cours...');
  const successTitle = useAutoTranslatedText('contact.success_title', 'Message envoyé avec succès !');
  const successMessage = useAutoTranslatedText('contact.success_message', 'Je vous répondrai dans les plus brefs délais.');
  const errorTitle = useAutoTranslatedText('contact.error_title', 'Erreur lors de l\'envoi');
  const errorMessage = useAutoTranslatedText('contact.error_message', 
    'Veuillez réessayer ou me contacter directement par email.'
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation basique
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      return;
    }

    setIsLoading(true);
    setSubmitStatus('idle');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name.trim());
      formDataToSend.append('email', formData.email.trim());
      formDataToSend.append('message', formData.message.trim());
      formDataToSend.append('_subject', `🎯 Portfolio - Message de ${formData.name}`);
      formDataToSend.append('_replyto', formData.email);
      formDataToSend.append('_template', 'table');
      formDataToSend.append('_captcha', 'false');

      const response = await fetch('https://formsubmit.co/ajax/claudio.raharison@gmail.com', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        }
      });

      const data = await response.json();

      if (data.success === 'true' || response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Échec de l\'envoi');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setSubmitStatus('error');
    } finally {
      setIsLoading(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">{title}</h2>
        
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">{subtitle}</h3>
            <p className="text-gray-600 mb-6">
              {description}
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary">📧</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{emailLabel}</p>
                  <p className="text-gray-600">claudio.raharison@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary">📱</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{phoneLabel}</p>
                  <p className="text-gray-600">+261 34 41 078 69 / +261 37 68 590 47</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary">📍</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{locationLabel}</p>
                  <p className="text-gray-600">Antananarivo, Madagascar</p>
                </div>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                {nameLabel}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 transition duration-200"
                placeholder={namePlaceholder}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {emailInputLabel}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 transition duration-200"
                placeholder={emailPlaceholder}
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                {messageLabel}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={isLoading}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 transition duration-200 resize-vertical"
                placeholder={messagePlaceholder}
              />
            </div>

            {/* Messages de statut */}
            {submitStatus === 'success' && (
              <div className="p-4 bg-green-50 text-green-800 rounded-lg border border-green-200 animate-fadeIn">
                <div className="flex items-center">
                  <span className="text-lg mr-3">✅</span>
                  <div>
                    <p className="font-medium">{successTitle}</p>
                    <p className="text-sm mt-1">{successMessage}</p>
                  </div>
                </div>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="p-4 bg-red-50 text-red-800 rounded-lg border border-red-200 animate-fadeIn">
                <div className="flex items-center">
                  <span className="text-lg mr-3">❌</span>
                  <div>
                    <p className="font-medium">{errorTitle}</p>
                    <p className="text-sm mt-1">{errorMessage}</p>
                  </div>
                </div>
              </div>
            )}
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-secondary transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {sendingText}
                </>
              ) : (
                <>
                  <span className="mr-2">📨</span>
                  {sendButton}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;