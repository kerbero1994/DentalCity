import { getRequestConfig } from "next-intl/server";
import { locales } from "@/shared/config/supported-locales";
import esMessages from "./messages/es.json";
import enMessages from "./messages/en.json";
import frMessages from "./messages/fr.json";
import deMessages from "./messages/de.json";
import jaMessages from "./messages/ja.json";
import koMessages from "./messages/ko.json";
import zhMessages from "./messages/zh.json";
import hiMessages from "./messages/hi.json";

const messages = {
  es: esMessages,
  en: enMessages,
  fr: frMessages,
  de: deMessages,
  ja: jaMessages,
  ko: koMessages,
  zh: zhMessages,
  hi: hiMessages,
};

export default getRequestConfig(async ({ requestLocale }) => {
  // Validate that the incoming `locale` parameter is valid
  const locale = await requestLocale;

  if (!locale || !locales.includes(locale as (typeof locales)[number])) {
    throw new Error(`Invalid locale: ${locale}`);
  }

  return {
    locale,
    messages: messages[locale as keyof typeof messages],
  };
});
