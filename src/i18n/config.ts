import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          title: "Discover Your Passion-Driven Income",
          subtitle: "Select 3 or more interests to explore unique business opportunities",
          apiKeyTitle: "Enter your OpenAI API Key",
          apiKeyDescription: "Your API key is required to generate AI-powered business ideas",
          selectInterests: "Select Your Interests",
          exploreButton: "Explore potential combinations",
          generating: "Generating...",
          generatingDescription: "This may take up to 30 seconds",
          diveDeeper: "Dive deeper",
          analyzing: "Analyzing...",
          detailedAnalysis: "Detailed Analysis:",
          minimumInterests: "Please select at least 3 interests",
          moreInterests: "More interests create more interesting combinations!",
          apiKeyRequired: "API Key Required",
          enterApiKey: "Please enter your OpenAI API key to generate combinations",
          success: "Success!",
          generatedOpportunities: "Generated business opportunities based on your interests",
          error: "Error",
          failedGenerate: "Failed to generate AI responses. Please check your API key and try again.",
          failedAnalysis: "Failed to generate deep dive analysis. Please try again.",
          deepDiveComplete: "Deep dive analysis complete",
          scrollDown: "Scroll down to see the detailed information"
        }
      },
      es: {
        translation: {
          title: "Descubre Tu Ingreso Basado en la Pasión",
          subtitle: "Selecciona 3 o más intereses para explorar oportunidades de negocio únicas",
          apiKeyTitle: "Ingresa tu Clave API de OpenAI",
          apiKeyDescription: "Tu clave API es necesaria para generar ideas de negocio con IA",
          selectInterests: "Selecciona Tus Intereses",
          exploreButton: "Explorar combinaciones potenciales",
          generating: "Generando...",
          generatingDescription: "Esto puede tomar hasta 30 segundos",
          diveDeeper: "Profundizar",
          analyzing: "Analizando...",
          detailedAnalysis: "Análisis Detallado:",
          minimumInterests: "Por favor selecciona al menos 3 intereses",
          moreInterests: "¡Más intereses crean combinaciones más interesantes!",
          apiKeyRequired: "Clave API Requerida",
          enterApiKey: "Por favor ingresa tu clave API de OpenAI para generar combinaciones",
          success: "¡Éxito!",
          generatedOpportunities: "Oportunidades de negocio generadas basadas en tus intereses",
          error: "Error",
          failedGenerate: "Error al generar respuestas de IA. Por favor verifica tu clave API e intenta de nuevo.",
          failedAnalysis: "Error al generar análisis profundo. Por favor intenta de nuevo.",
          deepDiveComplete: "Análisis profundo completado",
          scrollDown: "Desplázate hacia abajo para ver la información detallada"
        }
      },
      nl: {
        translation: {
          title: "Ontdek Je Passie-Gedreven Inkomen",
          subtitle: "Selecteer 3 of meer interesses om unieke zakelijke kansen te verkennen",
          apiKeyTitle: "Voer je OpenAI API-sleutel in",
          apiKeyDescription: "Je API-sleutel is nodig om AI-aangedreven bedrijfsideeën te genereren",
          selectInterests: "Selecteer Je Interesses",
          exploreButton: "Verken potentiële combinaties",
          generating: "Genereren...",
          generatingDescription: "Dit kan tot 30 seconden duren",
          diveDeeper: "Verder uitdiepen",
          analyzing: "Analyseren...",
          detailedAnalysis: "Gedetailleerde Analyse:",
          minimumInterests: "Selecteer minimaal 3 interesses",
          moreInterests: "Meer interesses creëren interessantere combinaties!",
          apiKeyRequired: "API-sleutel Vereist",
          enterApiKey: "Voer je OpenAI API-sleutel in om combinaties te genereren",
          success: "Succes!",
          generatedOpportunities: "Gegenereerde zakelijke kansen gebaseerd op je interesses",
          error: "Fout",
          failedGenerate: "Genereren van AI-responses mislukt. Controleer je API-sleutel en probeer opnieuw.",
          failedAnalysis: "Genereren van diepgaande analyse mislukt. Probeer opnieuw.",
          deepDiveComplete: "Diepgaande analyse voltooid",
          scrollDown: "Scroll naar beneden om de gedetailleerde informatie te bekijken"
        }
      },
      de: {
        translation: {
          title: "Entdecke Dein Passionsgetriebenes Einkommen",
          subtitle: "Wähle 3 oder mehr Interessen, um einzigartige Geschäftsmöglichkeiten zu erkunden",
          apiKeyTitle: "Gib deinen OpenAI API-Schlüssel ein",
          apiKeyDescription: "Dein API-Schlüssel wird benötigt, um KI-gestützte Geschäftsideen zu generieren",
          selectInterests: "Wähle Deine Interessen",
          exploreButton: "Potenzielle Kombinationen erkunden",
          generating: "Generiere...",
          generatingDescription: "Dies kann bis zu 30 Sekunden dauern",
          diveDeeper: "Tiefer eintauchen",
          analyzing: "Analysiere...",
          detailedAnalysis: "Detaillierte Analyse:",
          minimumInterests: "Bitte wähle mindestens 3 Interessen",
          moreInterests: "Mehr Interessen schaffen interessantere Kombinationen!",
          apiKeyRequired: "API-Schlüssel Erforderlich",
          enterApiKey: "Bitte gib deinen OpenAI API-Schlüssel ein, um Kombinationen zu generieren",
          success: "Erfolg!",
          generatedOpportunities: "Generierte Geschäftsmöglichkeiten basierend auf deinen Interessen",
          error: "Fehler",
          failedGenerate: "KI-Antworten konnten nicht generiert werden. Bitte überprüfe deinen API-Schlüssel und versuche es erneut.",
          failedAnalysis: "Detailanalyse konnte nicht generiert werden. Bitte versuche es erneut.",
          deepDiveComplete: "Detailanalyse abgeschlossen",
          scrollDown: "Scrolle nach unten, um die detaillierten Informationen zu sehen"
        }
      },
      fr: {
        translation: {
          title: "Découvrez Votre Revenu Basé sur la Passion",
          subtitle: "Sélectionnez 3 intérêts ou plus pour explorer des opportunités commerciales uniques",
          apiKeyTitle: "Entrez votre Clé API OpenAI",
          apiKeyDescription: "Votre clé API est nécessaire pour générer des idées commerciales alimentées par l'IA",
          selectInterests: "Sélectionnez Vos Intérêts",
          exploreButton: "Explorer les combinaisons potentielles",
          generating: "Génération en cours...",
          generatingDescription: "Cela peut prendre jusqu'à 30 secondes",
          diveDeeper: "Approfondir",
          analyzing: "Analyse en cours...",
          detailedAnalysis: "Analyse Détaillée :",
          minimumInterests: "Veuillez sélectionner au moins 3 intérêts",
          moreInterests: "Plus d'intérêts créent des combinaisons plus intéressantes !",
          apiKeyRequired: "Clé API Requise",
          enterApiKey: "Veuillez entrer votre clé API OpenAI pour générer des combinaisons",
          success: "Succès !",
          generatedOpportunities: "Opportunités commerciales générées basées sur vos intérêts",
          error: "Erreur",
          failedGenerate: "Échec de la génération des réponses IA. Veuillez vérifier votre clé API et réessayer.",
          failedAnalysis: "Échec de la génération de l'analyse approfondie. Veuillez réessayer.",
          deepDiveComplete: "Analyse approfondie terminée",
          scrollDown: "Faites défiler vers le bas pour voir les informations détaillées"
        }
      }
    }
  });

export default i18n;