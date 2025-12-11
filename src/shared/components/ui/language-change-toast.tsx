"use client";

import { useEffect, useState, useRef } from "react";
import { useLocale } from "next-intl";
import { useLanguageChange } from "@/shared/hooks/use-language-change";
import { Info } from "lucide-react";

/**
 * Toast notification that appears when language changes
 * Shows a warning for AI-translated languages (non es/en)
 */
export function LanguageChangeToast() {
  const locale = useLocale();
  const { hasLanguageChanged, onAnimationComplete } = useLanguageChange();
  const [isVisible, setIsVisible] = useState(false);
  const hasShownToast = useRef(false);
  const prevHasLanguageChanged = useRef(false);

  // Human-audited languages
  const humanAuditedLanguages = ["es", "en"];
  const isAiTranslated = !humanAuditedLanguages.includes(locale);

  useEffect(() => {
    // Reset flag when a new language change is detected
    if (hasLanguageChanged && !prevHasLanguageChanged.current) {
      hasShownToast.current = false;
    }
    prevHasLanguageChanged.current = hasLanguageChanged;

    // Only show toast once per language change
    if (hasLanguageChanged && isAiTranslated && !hasShownToast.current) {
      // Mark as shown for this change
      hasShownToast.current = true;

      // Show toast
      setIsVisible(true);

      // Hide after 5 seconds
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);

      // Notify parent that animation is complete
      const completeTimer = setTimeout(() => {
        onAnimationComplete();
      }, 5500);

      return () => {
        clearTimeout(hideTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [hasLanguageChanged, isAiTranslated, onAnimationComplete]);

  if (!isVisible || !isAiTranslated) {
    return null;
  }

  // Check if chatbot is visible by looking for the fab-root element
  const isChatbotVisible = typeof document !== "undefined" && !!document.getElementById("fab-root");

  const messages = {
    es: {
      message:
        "Las traducciones son generadas por IA y podrían no ser exactas. Solo español e inglés son auditados por humanos.",
      chatbotWarning:
        "Las respuestas del chatbot en idiomas diferentes al español pueden ser imprecisas.",
      close: "Cerrar notificación",
    },
    en: {
      message:
        "Translations are AI-generated and may not be accurate. Only Spanish and English are human-audited.",
      chatbotWarning: "Chatbot responses in languages other than Spanish may be inaccurate.",
      close: "Close notification",
    },
    fr: {
      message:
        "Les traductions sont générées par IA et peuvent ne pas être exactes. Seuls l'espagnol et l'anglais sont vérifiés par des humains.",
      chatbotWarning:
        "Les réponses du chatbot dans des langues autres que l'espagnol peuvent être imprécises.",
      close: "Fermer la notification",
    },
    de: {
      message:
        "Übersetzungen sind KI-generiert und möglicherweise nicht genau. Nur Spanisch und Englisch werden von Menschen überprüft.",
      chatbotWarning: "Chatbot-Antworten in anderen Sprachen als Spanisch können ungenau sein.",
      close: "Benachrichtigung schließen",
    },
    ja: {
      message:
        "翻訳はAIによって生成されており、正確でない場合があります。スペイン語と英語のみ人間が監査しています。",
      chatbotWarning: "スペイン語以外の言語でのチャットボットの回答は不正確な場合があります。",
      close: "通知を閉じる",
    },
    ko: {
      message:
        "번역은 AI로 생성되어 정확하지 않을 수 있습니다. 스페인어와 영어만 사람이 감수합니다.",
      chatbotWarning: "스페인어 이외의 언어로 된 챗봇 응답은 부정확할 수 있습니다.",
      close: "알림 닫기",
    },
    zh: {
      message: "翻译由AI生成，可能不准确。只有西班牙语和英语经过人工审核。",
      chatbotWarning: "西班牙语以外的语言的聊天机器人回复可能不准确。",
      close: "关闭通知",
    },
    hi: {
      message:
        "अनुवाद AI द्वारा उत्पन्न हैं और सटीक नहीं हो सकते। केवल स्पेनिश और अंग्रेजी मानव द्वारा ऑडिट किए गए हैं।",
      chatbotWarning: "स्पेनिश के अलावा अन्य भाषाओं में चैटबॉट प्रतिक्रियाएं गलत हो सकती हैं।",
      close: "सूचना बंद करें",
    },
  };

  const content = messages[locale as keyof typeof messages] || messages.en;

  return (
    <div
      className={`fixed bottom-6 left-6 z-50 max-w-md transform transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 shadow-lg dark:border-amber-900/50 dark:bg-amber-950/90">
        <Info
          className="h-5 w-5 flex-shrink-0 text-amber-600 dark:text-amber-500"
          aria-hidden="true"
        />
        <div className="flex-1">
          <p className="text-sm text-amber-800 dark:text-amber-200">{content.message}</p>
          {isChatbotVisible && (
            <p className="mt-1 text-sm text-amber-700 dark:text-amber-300">
              {content.chatbotWarning}
            </p>
          )}
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="flex-shrink-0 text-amber-600 transition-colors hover:text-amber-800 dark:text-amber-500 dark:hover:text-amber-300"
          aria-label={content.close}
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
