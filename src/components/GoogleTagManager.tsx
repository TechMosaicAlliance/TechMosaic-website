import { getTursoClient, ensureInitialized } from '@/lib/db-turso';
import Script from 'next/script';

async function getGtmSettings() {
  try {
    await ensureInitialized();
    const db = getTursoClient();
    
    const gtmIdResult = await db.execute({
      sql: 'SELECT value FROM settings WHERE key = ?',
      args: ['gtm_id']
    });

    const injectionMethodResult = await db.execute({
      sql: 'SELECT value FROM settings WHERE key = ?',
      args: ['gtm_injection_method']
    });

    const gtmId = gtmIdResult.rows.length > 0 && gtmIdResult.rows[0].value 
      ? (gtmIdResult.rows[0].value as string).trim() 
      : null;

    const injectionMethod = injectionMethodResult.rows.length > 0 && injectionMethodResult.rows[0].value
      ? (injectionMethodResult.rows[0].value as string)
      : 'nextjs'; // Default to Next.js Script component

    return { gtmId, injectionMethod };
  } catch (error) {
    console.error('Error loading GTM settings:', error);
    return { gtmId: null, injectionMethod: 'nextjs' };
  }
}

export async function GoogleTagManagerScript() {
  const { gtmId, injectionMethod } = await getGtmSettings();

  if (!gtmId || gtmId === '') {
    return null;
  }

  const scriptContent = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`;

  // Option 1: Next.js Script component (recommended for Next.js)
  // Uses afterInteractive strategy for optimal performance
  if (injectionMethod === 'nextjs') {
    return (
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: scriptContent,
        }}
      />
    );
  }

  // Option 2: Raw script tag format (exact HTML format)
  // Uses beforeInteractive strategy to inject in <head> matching Google's exact format
  return (
    <Script
      id="google-tag-manager"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: scriptContent,
      }}
    />
  );
}

export async function GoogleTagManagerNoscript() {
  const { gtmId } = await getGtmSettings();

  if (!gtmId || gtmId === '') {
    return null;
  }

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
}

