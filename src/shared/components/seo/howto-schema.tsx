/**
 * HowTo JSON-LD structured data component
 * For step-by-step instructions that can appear as rich results
 * Perfect for "How to..." content and FAQs
 */

interface HowToStep {
  name: string;
  text: string;
  image?: string;
  url?: string;
}

interface HowToSchemaProps {
  name: string;
  description: string;
  steps: HowToStep[];
  totalTime?: string; // ISO 8601 duration format (e.g., "PT30M")
  estimatedCost?: {
    currency: string;
    value: string;
  };
  supply?: string[];
  tool?: string[];
  locale?: string;
  imageUrl?: string;
}

export function HowToSchema({
  name,
  description,
  steps,
  totalTime,
  estimatedCost,
  supply,
  tool,
  locale = "es",
  imageUrl,
}: HowToSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    ...(imageUrl && { image: imageUrl }),
    ...(totalTime && { totalTime }),
    ...(estimatedCost && {
      estimatedCost: {
        "@type": "MonetaryAmount",
        currency: estimatedCost.currency,
        value: estimatedCost.value,
      },
    }),
    ...(supply &&
      supply.length > 0 && {
        supply: supply.map((item) => ({
          "@type": "HowToSupply",
          name: item,
        })),
      }),
    ...(tool &&
      tool.length > 0 && {
        tool: tool.map((item) => ({
          "@type": "HowToTool",
          name: item,
        })),
      }),
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      itemListElement: [
        {
          "@type": "HowToDirection",
          text: step.text,
        },
      ],
      ...(step.image && { image: step.image }),
      ...(step.url && { url: step.url }),
    })),
    inLanguage: locale,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Helper function to convert FAQ questions to HowTo steps
 * For FAQ items that start with "Cómo" or "How to"
 */
export function faqToHowToSteps(question: string, answer: string): HowToStep[] {
  // Simple implementation: split answer by numbered lists or new paragraphs
  // Can be enhanced based on actual content structure
  const paragraphs = answer
    .split(/\n\n|\. (?=[A-Z])/)
    .filter((p) => p.trim().length > 0)
    .slice(0, 10); // Limit to 10 steps

  if (paragraphs.length === 0) {
    return [
      {
        name: question,
        text: answer,
      },
    ];
  }

  return paragraphs.map((paragraph, index) => {
    // Try to extract step name from numbered list (e.g., "1. Step name: description")
    const numberedMatch = paragraph.match(/^\d+[\.)]\s*([^:]+):\s*(.+)/);
    if (numberedMatch) {
      return {
        name: numberedMatch[1].trim(),
        text: numberedMatch[2].trim(),
      };
    }

    // Use first sentence as name, rest as text
    const sentences = paragraph.split(/\. /);
    if (sentences.length > 1) {
      return {
        name: sentences[0],
        text: sentences.slice(1).join(". "),
      };
    }

    return {
      name: `Paso ${index + 1}`,
      text: paragraph.trim(),
    };
  });
}

/**
 * Simplified HowTo component for single-answer FAQs
 */
interface SimpleHowToSchemaProps {
  question: string;
  answer: string;
  locale?: string;
  imageUrl?: string;
}

export function SimpleHowToSchema({
  question,
  answer,
  locale = "es",
  imageUrl,
}: SimpleHowToSchemaProps) {
  // Check if this is actually a "How to" question
  const isHowTo =
    /^(c[oó]mo|how\s+to|how\s+can|how\s+do)/i.test(question) ||
    /^(qu[eé]\s+pasos|what\s+steps|what\s+are\s+the\s+steps)/i.test(question);

  if (!isHowTo) {
    return null; // Return null if not a "how to" question
  }

  const steps = faqToHowToSteps(question, answer);

  return (
    <HowToSchema
      name={question}
      description={answer.substring(0, 200)}
      steps={steps}
      locale={locale}
      imageUrl={imageUrl}
    />
  );
}
