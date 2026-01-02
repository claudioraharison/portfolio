import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Map, Code, Image, Palette, 
  BarChart, Users, CheckCircle, 
  ArrowRight, Globe, 
  Shield, Star, Sparkles, Target, Mail, Briefcase
} from 'lucide-react';
import { useAutoTranslatedText } from '../hooks/useAutoTranslatedText';
import Header from '../components/Header';
import SnowfallEffect from '../components/SnowfallEffect';

const ServicesPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Textes traduits
  const pageTitle = useAutoTranslatedText('services.title', 'Mes Services');
  const pageSubtitle = useAutoTranslatedText('services.subtitle', 'Expertises pluridisciplinaires pour vos projets innovants');
  const backButtonText = useAutoTranslatedText('services.back_home', 'Retour à l\'accueil');
  const contactMeText = useAutoTranslatedText('services.contact_me', 'Me contacter');
  const geomaticsTitle = useAutoTranslatedText('services.geomatics', 'Géomatique & Cartographie');
  const webDevTitle = useAutoTranslatedText('services.web_development', 'Développement Web & Mobile');
  const imageProcessingTitle = useAutoTranslatedText('services.image_processing', 'Traitement d\'Images & 3D');
  const designTitle = useAutoTranslatedText('services.design', 'Design & Création Graphique');
  const dataAnalysisTitle = useAutoTranslatedText('services.data_analysis', 'Analyse de Données & SIG');
  const consultingTitle = useAutoTranslatedText('services.consulting', 'Consulting & Formation');

  const handleBackClick = () => {
    navigate('/');
  };

  const handleContactClick = () => {
    window.location.href = 'mailto:claudio.raharison@gmail.com';
  };

  const services = [
    {
      id: 1,
      category: geomaticsTitle,
      icon: <Map className="w-8 h-8" />,
      items: [
        {
          title: useAutoTranslatedText('services.cartography', 'Cartographie numérique'),
          description: useAutoTranslatedText('services.cartography_desc', 'Création de cartes thématiques, topographiques et interactives'),
          features: ['QGIS/ArcGIS', 'Web mapping', 'Systèmes de coordonnées', 'Géoréférencement']
        },
        {
          title: useAutoTranslatedText('services.sig', 'Systèmes d\'Information Géographique'),
          description: useAutoTranslatedText('services.sig_desc', 'Analyse spatiale et gestion de données géolocalisées'),
          features: ['Analyse spatiale', 'Bases de données spatiales', 'Modélisation 3D', 'Géostatistique']
        },
        {
          title: useAutoTranslatedText('services.geodata', 'Traitement de données géospatiales'),
          description: useAutoTranslatedText('services.geodata_desc', 'Collecte, traitement et analyse de données géoréférencées'),
          features: ['Télédétection', 'Lidar', 'Photogrammétrie', 'Données satellitaires']
        }
      ]
    },
    {
      id: 2,
      category: webDevTitle,
      icon: <Code className="w-8 h-8" />,
      items: [
        {
          title: useAutoTranslatedText('services.web_app', 'Applications Web sur mesure'),
          description: useAutoTranslatedText('services.web_app_desc', 'Développement d\'applications web modernes et performantes'),
          features: ['React/TypeScript', 'Node.js/NestJS', 'API REST', 'Bases de données']
        },
        {
          title: useAutoTranslatedText('services.mobile_app', 'Applications Mobiles'),
          description: useAutoTranslatedText('services.mobile_app_desc', 'Applications natives et cross-platform pour iOS et Android'),
          features: ['React Native', 'Applications hybrides', 'UI/UX mobile', 'Publication stores']
        },
        {
          title: useAutoTranslatedText('services.geoweb', 'Applications Géoweb'),
          description: useAutoTranslatedText('services.geoweb_desc', 'Applications web spécialisées en géomatique et cartographie interactive'),
          features: ['Mapbox/Leaflet', 'Visualisation spatiale', 'APIs géospatiales', 'Dashboard carto']
        }
      ]
    },
    {
      id: 3,
      category: imageProcessingTitle,
      icon: <Image className="w-8 h-8" />,
      items: [
        {
          title: useAutoTranslatedText('services.image_2d', 'Traitement d\'images 2D'),
          description: useAutoTranslatedText('services.image_2d_desc', 'Analyse et traitement d\'images numériques et satellitaires'),
          features: ['ENVI/ERDAS', 'Classification', 'Filtrage', 'Amélioration d\'image']
        },
        {
          title: useAutoTranslatedText('services.modeling_3d', 'Modélisation 3D'),
          description: useAutoTranslatedText('services.modeling_3d_desc', 'Création de modèles 3D et visualisations réalistes'),
          features: ['Blender/AutoCAD', 'Rendu 3D', 'Texturing', 'Animation 3D']
        },
        {
          title: useAutoTranslatedText('services.photogrammetry', 'Photogrammétrie'),
          description: useAutoTranslatedText('services.photogrammetry_desc', 'Création de modèles 3D à partir de photographies'),
          features: ['Reconstruction 3D', 'Nuages de points', 'MDS/MNT', 'Orthophotos']
        }
      ]
    },
    {
      id: 4,
      category: designTitle,
      icon: <Palette className="w-8 h-8" />,
      items: [
        {
          title: useAutoTranslatedText('services.logo_design', 'Création de Logo & Identité visuelle'),
          description: useAutoTranslatedText('services.logo_design_desc', 'Design d\'identité visuelle et logos professionnels'),
          features: ['Logo design', 'Charte graphique', 'Branding', 'Typographie']
        },
        {
          title: useAutoTranslatedText('services.ui_ux', 'UI/UX Design'),
          description: useAutoTranslatedText('services.ui_ux_desc', 'Design d\'interfaces utilisateur intuitives et expériences optimisées'),
          features: ['Wireframing', 'Prototypage', 'Design System', 'Tests utilisateurs']
        },
        {
          title: useAutoTranslatedText('services.graphic_design', 'Design Graphique'),
          description: useAutoTranslatedText('services.graphic_design_desc', 'Création de supports visuels print et digital'),
          features: ['Adobe Creative Suite', 'Infographie', 'Brochures', 'Supports marketing']
        }
      ]
    },
    {
      id: 5,
      category: dataAnalysisTitle,
      icon: <BarChart className="w-8 h-8" />,
      items: [
        {
          title: useAutoTranslatedText('services.data_viz', 'Visualisation de Données'),
          description: useAutoTranslatedText('services.data_viz_desc', 'Création de dashboards et visualisations interactives'),
          features: ['Tableau/Power BI', 'D3.js', 'Graphiques dynamiques', 'Reporting']
        },
        {
          title: useAutoTranslatedText('services.big_data', 'Analyse de Big Data'),
          description: useAutoTranslatedText('services.big_data_desc', 'Traitement et analyse de volumes de données importants'),
          features: ['Python/R', 'Machine Learning', 'Statistiques', 'Data mining']
        },
        {
          title: useAutoTranslatedText('services.geo_analysis', 'Analyse Géospatiale Avancée'),
          description: useAutoTranslatedText('services.geo_analysis_desc', 'Modélisation et simulation de phénomènes spatiaux'),
          features: ['Modélisation prédictive', 'Risk assessment', 'Optimisation spatiale', 'Simulations']
        }
      ]
    },
    {
      id: 6,
      category: consultingTitle,
      icon: <Users className="w-8 h-8" />,
      items: [
        {
          title: useAutoTranslatedText('services.tech_consulting', 'Consulting Technologique'),
          description: useAutoTranslatedText('services.tech_consulting_desc', 'Conseil en choix technologiques et architecture solution'),
          features: ['Audit technique', 'Roadmap', 'Architecture', 'Best practices']
        },
        {
          title: useAutoTranslatedText('services.geo_training', 'Formation Géomatique'),
          description: useAutoTranslatedText('services.geo_training_desc', 'Formations sur les outils SIG et traitement d\'images'),
          features: ['QGIS/ArcGIS', 'Télédétection', 'Cartographie', 'Ateliers pratiques']
        },
        {
          title: useAutoTranslatedText('services.dev_training', 'Formation Développement'),
          description: useAutoTranslatedText('services.dev_training_desc', 'Formations en développement web et programmation'),
          features: ['JavaScript/TypeScript', 'React', 'Node.js', 'Bases de données']
        }
      ]
    }
  ];

  return (
    <>
      <SnowfallEffect />
      <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/10 to-white">
        
        {/* Header */}
        <Header hideMenu={false} />
        
        <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header avec bouton retour */}
            <div className="mb-16">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center mb-4">
                  <div className="w-16 h-1 bg-gradient-to-r from-blue-900 to-blue-700 mr-4"></div>
                  <Sparkles className="w-6 h-6 text-blue-700" />
                  <div className="w-16 h-1 bg-gradient-to-r from-blue-700 to-blue-900 ml-4"></div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  {pageTitle}
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {pageSubtitle}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                <button
                  onClick={handleBackClick}
                  className="flex items-center justify-center gap-2 px-6 py-3 text-gray-700 hover:text-gray-900 font-medium transition-all rounded-lg hover:bg-gray-100 border border-gray-300"
                >
                  <ArrowRight className="w-5 h-5 rotate-180" />
                  {backButtonText}
                </button>
                
                <button
                  onClick={handleContactClick}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
                >
                  <Mail className="w-5 h-5" />
                  {contactMeText}
                </button>
              </div>
            </div>

            {/* Introduction */}
            <div className="bg-white rounded-2xl p-8 mb-16 border border-gray-200 shadow-sm">
              <div className="flex flex-col lg:flex-row items-start gap-10">
                <div className="lg:w-2/3">
                  <div className="flex items-center gap-3 mb-6">
                    <Briefcase className="w-8 h-8 text-blue-800" />
                    <h2 className="text-2xl font-bold text-gray-900">
                      {useAutoTranslatedText('services.expertise_title', 'Double Expertise Unique')}
                    </h2>
                  </div>
                  <p className="text-gray-700 mb-8 leading-relaxed">
                    {useAutoTranslatedText('services.expertise_desc', 'Je combine des compétences avancées en développement web avec une expertise approfondie en géomatique et géosciences. Cette double compétence me permet de proposer des solutions innovantes qui intègrent parfaitement les aspects techniques et scientifiques.')}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      useAutoTranslatedText('services.tech_dev', 'Développement web & mobile fullstack'),
                      useAutoTranslatedText('services.geo_expert', 'Expertise géomatique & SIG avancé'),
                      useAutoTranslatedText('services.data_viz_expert', 'Visualisation de données & 3D'),
                      useAutoTranslatedText('services.design_expert', 'Design graphique & UI/UX')
                    ].map((text, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 border border-blue-100">
                        <CheckCircle className="w-5 h-5 text-blue-700 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-800">{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="lg:w-1/3 w-full">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-6 rounded-xl border border-blue-200">
                    <div className="flex items-center gap-3 mb-6">
                      <Star className="w-6 h-6 text-blue-800" />
                      <h3 className="text-xl font-bold text-gray-900">
                        {useAutoTranslatedText('services.availability', 'Disponibilité')}
                      </h3>
                    </div>
                    <div className="space-y-5">
                      {[
                        {
                          icon: Target,
                          title: useAutoTranslatedText('services.freelance', 'Freelance & Missions'),
                          subtitle: useAutoTranslatedText('services.immediate', 'Disponibilité immédiate')
                        },
                        {
                          icon: Globe,
                          title: useAutoTranslatedText('services.remote', 'Travail à distance'),
                          subtitle: useAutoTranslatedText('services.worldwide', 'Projets internationaux')
                        },
                        {
                          icon: Shield,
                          title: useAutoTranslatedText('services.quality', 'Garantie qualité'),
                          subtitle: useAutoTranslatedText('services.support', 'Support & Maintenance inclus')
                        }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-white/80">
                          <item.icon className="w-5 h-5 text-blue-700 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-gray-900">
                              {item.title}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              {item.subtitle}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Services Grid - Nouveau design clair */}
            <div className="space-y-12 mb-20">
              {services.map((service) => (
                <div 
                  key={service.id}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm"
                >
                  {/* Service Header avec numéro */}
                  <div className="bg-gradient-to-r from-blue-900 to-blue-800 p-6 relative">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
                            <div className="text-white">
                              {service.icon}
                            </div>
                          </div>
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                            <span className="text-blue-900 font-bold text-sm">{service.id}</span>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">
                            {service.category}
                          </h3>
                          <div className="w-24 h-1 bg-white/50 rounded-full mt-2"></div>
                        </div>
                      </div>
                      
                      <div className="flex md:flex-col items-center md:items-end gap-2">
                        <span className="text-white/80 text-sm">Services inclus:</span>
                        <span className="text-white font-bold text-xl">{service.items.length}</span>
                      </div>
                    </div>
                  </div>

                  {/* Service Items - Layout horizontal */}
                  <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {service.items.map((item, itemIndex) => (
                        <div 
                          key={itemIndex} 
                          className="bg-gray-50 rounded-xl p-5 border border-gray-200 hover:border-blue-300 transition-colors group"
                        >
                          <div className="flex items-start gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                              <div className="text-blue-700 font-bold text-sm">{itemIndex + 1}</div>
                            </div>
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-800 transition-colors">
                                {item.title}
                              </h4>
                              <div className="w-12 h-0.5 bg-blue-200 rounded-full mt-2"></div>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                            {item.description}
                          </p>
                          
                          <div className="space-y-2">
                            <div className="text-sm font-medium text-gray-700">Technologies & Compétences:</div>
                            <div className="flex flex-wrap gap-2">
                              {item.features.map((feature, featureIndex) => (
                                <span
                                  key={featureIndex}
                                  className="px-3 py-1 bg-white text-blue-800 text-xs font-medium rounded-full border border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                                >
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Call to Action pour ce service */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-gray-700">
                          <span className="font-medium">Intéressé par ce domaine ?</span>
                          <span className="text-gray-600 ml-2">Discutons de votre projet spécifique</span>
                        </div>
                        <button
                          onClick={handleContactClick}
                          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg whitespace-nowrap"
                        >
                          <span>Contactez-moi pour {service.category.toLowerCase()}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action Final */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-10 text-center">
              <div className="max-w-3xl mx-auto">
                <div className="inline-block p-3 rounded-xl bg-white/20 backdrop-blur-sm mb-6">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-6">
                  {useAutoTranslatedText('services.ready_title', 'Prêt à concrétiser votre projet ?')}
                </h2>
                <p className="text-blue-100 mb-8 text-lg">
                  {useAutoTranslatedText('services.ready_desc', 'Que vous ayez besoin d\'une application web, d\'une analyse géospatiale, d\'un design ou d\'une formation, je suis là pour vous accompagner.')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleContactClick}
                    className="px-8 py-4 bg-white text-blue-900 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl"
                  >
                    {useAutoTranslatedText('services.start_project', 'Commencer mon projet')}
                  </button>
                  <button
                    onClick={handleBackClick}
                    className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all"
                  >
                    {useAutoTranslatedText('services.view_portfolio', 'Voir mon portfolio')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicesPage;