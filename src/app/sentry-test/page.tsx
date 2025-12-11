"use client";

import { useState } from "react";
import * as Sentry from "@sentry/nextjs";

export default function SentryTestPage() {
  const [results, setResults] = useState<string[]>([]);

  const addResult = (message: string) => {
    setResults((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testCaptureMessage = () => {
    addResult("Sending test message to Sentry...");
    Sentry.captureMessage("Test message from SITIMM web app", "info");
    addResult("✅ Message sent! Check Sentry dashboard.");
  };

  const testCaptureError = () => {
    addResult("Sending test error to Sentry...");
    try {
      throw new Error("Test error from SITIMM - This is intentional for testing!");
    } catch (error) {
      Sentry.captureException(error);
      addResult("✅ Error sent! Check Sentry dashboard.");
    }
  };

  const testBreadcrumbs = () => {
    addResult("Adding breadcrumbs and sending error...");
    Sentry.addBreadcrumb({
      category: "test",
      message: "User clicked test button",
      level: "info",
    });
    Sentry.addBreadcrumb({
      category: "test",
      message: "Adding some context",
      level: "info",
    });
    try {
      throw new Error("Error with breadcrumbs - check Sentry for context!");
    } catch (error) {
      Sentry.captureException(error);
      addResult("✅ Error with breadcrumbs sent! Check Sentry dashboard.");
    }
  };

  const testWithUser = () => {
    addResult("Setting user context and sending error...");
    Sentry.setUser({
      id: "test-user-123",
      email: "test@sitimm.org",
      username: "test-user",
    });
    try {
      throw new Error("Error with user context!");
    } catch (error) {
      Sentry.captureException(error);
      addResult("✅ Error with user context sent! Check Sentry dashboard.");
    }
  };

  const testAPIError = async () => {
    addResult("Testing API endpoint error...");
    try {
      const response = await fetch("/api/sentry-test");
      const data = await response.json();
      addResult(`✅ ${data.message}`);
    } catch (error) {
      addResult("❌ Failed to call API");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "1rem" }}>🐛 Sentry Integration Test</h1>

      <div
        style={{
          background: "#f0f0f0",
          padding: "1rem",
          borderRadius: "8px",
          marginBottom: "2rem",
        }}
      >
        <h3>ℹ️ Información</h3>
        <ul style={{ margin: 0, paddingLeft: "1.5rem" }}>
          <li>
            <strong>Entorno:</strong> {process.env.NODE_ENV}
          </li>
          <li>
            <strong>DSN Configurado:</strong>{" "}
            {process.env.NEXT_PUBLIC_SENTRY_DSN ? "✅ Sí" : "❌ No"}
          </li>
          <li>
            <strong>Dashboard de Sentry:</strong>{" "}
            <a
              href="https://sentry.io/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#0070f3" }}
            >
              Abrir Sentry
            </a>
          </li>
        </ul>
      </div>

      <h2 style={{ marginBottom: "1rem" }}>Pruebas de Sentry</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
        <button
          onClick={testCaptureMessage}
          style={{
            padding: "1rem",
            background: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          1. Enviar Mensaje Simple
        </button>

        <button
          onClick={testCaptureError}
          style={{
            padding: "1rem",
            background: "#f5a623",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          2. Enviar Error Simple
        </button>

        <button
          onClick={testBreadcrumbs}
          style={{
            padding: "1rem",
            background: "#7928ca",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          3. Enviar Error con Breadcrumbs
        </button>

        <button
          onClick={testWithUser}
          style={{
            padding: "1rem",
            background: "#ff0080",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          4. Enviar Error con Usuario
        </button>

        <button
          onClick={testAPIError}
          style={{
            padding: "1rem",
            background: "#50e3c2",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          5. Probar Error de API (Server-side)
        </button>
      </div>

      <h3 style={{ marginBottom: "1rem" }}>📋 Resultados:</h3>
      <div
        style={{
          background: "#1e1e1e",
          color: "#0f0",
          padding: "1rem",
          borderRadius: "6px",
          fontFamily: "monospace",
          fontSize: "0.875rem",
          minHeight: "200px",
          maxHeight: "400px",
          overflow: "auto",
        }}
      >
        {results.length === 0 ? (
          <div style={{ opacity: 0.5 }}>Haz clic en un botón para probar Sentry...</div>
        ) : (
          results.map((result, i) => <div key={i}>{result}</div>)
        )}
      </div>

      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          background: "#fff3cd",
          borderRadius: "6px",
          border: "1px solid #ffc107",
        }}
      >
        <strong>⚠️ Nota Importante:</strong>
        <p style={{ margin: "0.5rem 0 0 0" }}>
          En desarrollo, los filtros de Sentry están temporalmente deshabilitados para pruebas. En
          producción, estos filtros se reactivarán automáticamente para evitar spam de errores de
          desarrollo.
        </p>
      </div>
    </div>
  );
}
