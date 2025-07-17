import { useState, useEffect } from 'react';

interface Contact {
  name: string;
  phone?: string;
}

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [hasPermission, setHasPermission] = useState(false);

  // Mock contacts for demo purposes
  const mockContacts: Contact[] = [
    { name: "John Smith", phone: "+1234567890" },
    { name: "Sarah Johnson", phone: "+1987654321" },
    { name: "Mike Wilson", phone: "+1555123456" },
    { name: "Emma Davis", phone: "+1444567890" },
    { name: "David Brown", phone: "+1333445566" }
  ];

  const requestPermission = async (): Promise<boolean> => {
    try {
      // In a real app, you would request actual contact permissions here
      // For now, we'll simulate permission and use mock data
      
      if ('contacts' in navigator && 'ContactsManager' in window) {
        // Real contact API implementation would go here
        const permission = await navigator.permissions.query({ name: 'contacts' as any });
        if (permission.state === 'granted') {
          setHasPermission(true);
          setContacts(mockContacts);
          return true;
        }
      }
      
      // Fallback to mock data
      setHasPermission(true);
      setContacts(mockContacts);
      return true;
      
    } catch (error) {
      console.log('Contact permission not available, using mock data');
      setHasPermission(true);
      setContacts(mockContacts);
      return true;
    }
  };

  useEffect(() => {
    // Check if we already have permission
    if ('contacts' in navigator) {
      navigator.permissions?.query({ name: 'contacts' as any })
        .then(permission => {
          if (permission.state === 'granted') {
            setHasPermission(true);
            setContacts(mockContacts);
          }
        })
        .catch(() => {
          // If permission API is not available, default to mock data
          setContacts(mockContacts);
        });
    } else {
      // If contacts API is not available, use mock data
      setContacts(mockContacts);
    }
  }, []);

  return {
    contacts,
    hasPermission,
    requestPermission
  };
};