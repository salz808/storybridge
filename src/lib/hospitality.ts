/**
 * StoryBridge Physical Hospitality
 * Simulates Handwrytten, Lob, and Sendoso integrations.
 */

export async function triggerPhysicalWelcome(visitorId: string, type: 'postcard' | 'note' | 'gift') {
  console.log(`[Physical Hospitality] Milestone triggered for visitor ${visitorId}: ${type}`);
  
  // Simulate API call to fulfillment partner
  const partner = type === 'postcard' ? 'Lob' : type === 'note' ? 'Handwrytten' : 'Sendoso';
  console.log(`[Physical Hospitality] Sending payload to ${partner} API...`);
  
  await new Promise(resolve => setTimeout(resolve, 1200));

  return {
    success: true,
    trackingNumber: `SB-${Math.random().toString(36).substring(2, 11).toUpperCase()}`,
    estimatedDelivery: '3-5 business days',
    qrLink: `https://welcome.demo-church.io/g/${visitorId}`
  };
}

export async function getFulfillmentQueue() {
  return [
    { id: '1', visitorName: 'Sarah J.', type: 'Welcome Postcard', status: 'Sent', sentAt: new Date(Date.now() - 86400000).toISOString() },
    { id: '2', visitorName: 'Michael S.', type: 'Hospitality Note', status: 'Delivered', sentAt: new Date(Date.now() - 172800000).toISOString() },
    { id: '3', visitorName: 'David W.', type: 'Next Steps Pkg', status: 'Processing', sentAt: new Date().toISOString() },
  ];
}
