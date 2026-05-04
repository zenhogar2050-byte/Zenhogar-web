export const onRequestGet: PagesFunction = async () => {
  const firebaseConfig = {
    projectId: "gen-lang-client-0672500796",
    databaseId: "ai-studio-46279a17-9caa-4819-b2d9-023c3691a10a",
    apiKey: "AIzaSyBvvxXWXRBQLtpsl07tx-v3YEphMw_jpJs"
  };

  try {
    const url = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/${firebaseConfig.databaseId}/documents:runQuery?key=${firebaseConfig.apiKey}`;
    const queryBody = {
      structuredQuery: {
        from: [{ collectionId: "webhook_logs" }],
        orderBy: [{ 
          field: { fieldPath: "receivedAt" }, 
          direction: "DESCENDING" 
        }],
        limit: 50
      }
    };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(queryBody)
    });

    const data: any = await res.json();
    
    // Normalizar la respuesta de Firestore REST
    const logs = (Array.isArray(data) ? data : [])
      .map((item: any) => {
        if (!item.document) return null;
        const fields = item.document.fields;
        return {
          receivedAt: fields.receivedAt?.timestampValue || new Date().toISOString(),
          payload: JSON.parse(fields.payload?.stringValue || '{}'),
          orderId: fields.orderId?.stringValue || 'N/A',
          status: fields.status?.stringValue || 'received'
        };
      })
      .filter(Boolean);

    return new Response(JSON.stringify(logs), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify([]), {
      headers: { "Content-Type": "application/json" }
    });
  }
};
